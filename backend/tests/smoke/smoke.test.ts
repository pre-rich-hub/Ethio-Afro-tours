/**
 * Real-database smoke suite (Neon).
 *
 * Runs only when SMOKE=1 is set; otherwise the suite is skipped and the run
 * exits green. It exercises the routes this backend depends on for delivery:
 *   - admin login (seeded admin from seed-admin.ts)
 *   - media round-trip: gallery upload -> /api/v1/media/:id bytes
 *   - booking create via the public form
 *   - an interactive transaction (commit + rollback on conflict)
 *
 * Prereq: `npm run seed && npm run seed:admin` against the target database.
 *
 * Run: `SMOKE=1 npm run test:smoke`
 */
import { afterAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import { randomUUID } from "node:crypto";

import "dotenv/config";
import { app } from "../../src/app.js";
import { prisma } from "../../src/config/database.js";
import { env } from "../../src/config/env.js";

// The AI provider is always mocked in smoke: the persistence round-trip below
// goes through Prisma directly and must never make a real LLM API call.
vi.mock("../../src/modules/assistant/provider.client.js", () => ({
  OpenAIProvider: class {},
  GeminiProvider: class {},
  createProvider: () => ({ streamChat: vi.fn() })
}));

const SMOKE = Boolean(process.env.SMOKE);
const marker = `smoke-${Date.now()}`;
const email = `${marker}@example.com`;

const created = {
  bookingIds: [] as number[],
  galleryIds: [] as number[],
  mediaIds: [] as string[],
  tourSlugs: [] as string[],
  contactIds: [] as number[],
  chatSessionIds: [] as string[],
  chatDailyUsageDates: [] as Date[]
};

describe.skipIf(!SMOKE)("smoke (Neon, real DB)", () => {
  afterAll(async () => {
    await prisma.booking.deleteMany({ where: { id: { in: created.bookingIds } } });
    await prisma.contact.deleteMany({ where: { id: { in: created.contactIds } } });
    await prisma.gallery.deleteMany({ where: { id: { in: created.galleryIds } } });
    for (const id of created.mediaIds) {
      await prisma.mediaAsset.delete({ where: { id } }).catch(() => undefined);
    }
    for (const slug of created.tourSlugs) {
      await prisma.tour.delete({ where: { slug } }).catch(() => undefined);
    }
    // Messages cascade with the session, but delete them explicitly to keep
    // cleanup symmetric with the other tables.
    await prisma.chatMessage.deleteMany({
      where: { sessionId: { in: created.chatSessionIds } }
    });
    await prisma.chatSession.deleteMany({ where: { id: { in: created.chatSessionIds } } });
    await prisma.chatDailyUsage.deleteMany({
      where: { date: { in: created.chatDailyUsageDates } }
    });
    await prisma.$disconnect();
  });

  async function loginAgent() {
    const agent = request.agent(app);
    const res = await agent.post("/api/v1/auth/login").send({
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD
    });
    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]?.[0]).toContain(`${env.AUTH_COOKIE_NAME}=`);
    return agent;
  }

  it("logs in with the seeded admin (cookie session)", async () => {
    const agent = request.agent(app);
    const res = await agent.post("/api/v1/auth/login").send({
      email: env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const me = await agent.get("/api/v1/auth/me");
    expect(me.status).toBe(200);
    expect(me.body.data.email).toBe(env.ADMIN_EMAIL);
  });

  it("media round-trip: upload -> store -> /api/v1/media/:id <- bytes", async () => {
    const agent = await loginAgent();
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64"
    );

    const upload = await agent
      .post("/api/v1/admin/gallery")
      .field("tourId", "")
      .attach("galleryImage", png, { filename: `${marker}.png`, contentType: "image/png" });

    expect(upload.status).toBe(201);
    const imageUrl: string = upload.body.data.imageUrl;
    expect(imageUrl).toMatch(/^\/api\/v1\/media\/[0-9a-f-]{36}$/);
    created.galleryIds.push(upload.body.data.id);
    created.mediaIds.push(imageUrl.split("/").pop()!);

    const fetched = await request(app).get(imageUrl);
    expect(fetched.status).toBe(200);
    expect(fetched.headers["content-type"]).toContain("image/png");
    expect(fetched.body).toEqual(png);
    expect(fetched.headers["content-length"]).toBe(String(png.length));
  });

  it("booking create via public route (and tour lookup)", async () => {
    const tour = await prisma.tour.create({
      data: {
        slug: `${marker}-tour`,
        tourName: `Smoke Tour ${marker}`,
        adultPrice: "120.00",
        childPrice: "60.00",
        rating: "5.0",
        noOfRates: 0,
        isFeatured: false
      }
    });
    created.tourSlugs.push(tour.slug);

    const res = await request(app).post("/api/v1/bookings").send({
      tourId: tour.id,
      fullName: "Smoke Tester",
      email: `${marker}@example.com`,
      phone: "+251911000000",
      country: "ET",
      chosenDate: "2026-10-15",
      adults: 2,
      children: 1
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tourId).toBe(tour.id);
    expect(res.body.data.status).toBe("Pending");
    created.bookingIds.push(res.body.data.id);
  });

  it("interactive transaction commits and rolls back on conflict", async () => {
    const tx = await prisma.$transaction(async (client) => {
      const booking = await client.booking.create({
        data: {
          fullName: "Tx Tester",
          email: `${marker}-tx@example.com`,
          phone: "000",
          country: "ET",
          chosenDate: new Date("2026-11-01"),
          adults: 1,
          children: 0
        }
      });
      const contact = await client.contact.create({
        data: { name: marker, email: `${marker}-tx@example.com`, message: "interactive transaction smoke" }
      });
      return { booking, contact };
    });

    expect(tx.booking.id).toBeGreaterThan(0);
    expect(tx.contact.id).toBeGreaterThan(0);
    created.bookingIds.push(tx.booking.id);
    created.contactIds.push(tx.contact.id);

    // Inner conflict: unique slug collision must roll the whole transaction back.
    const existing = await prisma.tour.create({
      data: {
        slug: `${marker}-conflict`,
        tourName: "Conflict Tour",
        adultPrice: "10.00",
        childPrice: "5.00",
        rating: "5.0"
      }
    });
    created.tourSlugs.push(existing.slug);

    await expect(
      prisma.$transaction(async (client) => {
        await client.booking.create({
          data: {
            fullName: "Rolled Back",
            email: `${marker}-rb@example.com`,
            phone: "000",
            country: "ET",
            chosenDate: new Date("2026-12-01"),
            adults: 1,
            children: 0
          }
        });
        await client.tour.create({
          data: {
            slug: existing.slug,
            tourName: "Dup",
            adultPrice: "1.00",
            childPrice: "1.00",
            rating: "5.0"
          }
        });
      })
    ).rejects.toThrow();

    const rolledBack = await prisma.booking.findFirst({
      where: { email: `${marker}-rb@example.com` }
    });
    expect(rolledBack).toBeNull();
  });

  it("assistant chat persistence round-trip (provider mocked, no LLM calls)", async () => {
    const session = await prisma.chatSession.create({
      data: { id: randomUUID(), ipHash: "smoke-hmac-ip" }
    });
    created.chatSessionIds.push(session.id);

    const userMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: "user",
        content: "What is the best time to visit Lalibela?",
        tokenCount: 12
      }
    });
    const botMessage = await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        role: "assistant",
        content: "October to March is ideal.",
        tokenCount: 9
      }
    });

    // Far-future fixed date: never collides with real per-day usage rows.
    const usageDate = new Date("2099-12-31T00:00:00.000Z");
    const usage = await prisma.chatDailyUsage.create({
      data: { date: usageDate, tokenCount: 42 }
    });
    created.chatDailyUsageDates.push(usage.date);

    const readBack = await prisma.chatSession.findUnique({
      where: { id: session.id },
      include: { messages: { orderBy: { id: "asc" } } }
    });
    expect(readBack).not.toBeNull();
    expect(readBack!.ipHash).toBe("smoke-hmac-ip");
    expect(readBack!.messages).toHaveLength(2);
    expect(readBack!.messages.map((message) => message.role)).toEqual(["user", "assistant"]);
    expect(readBack!.messages[0].id).toBe(userMessage.id);
    expect(readBack!.messages[0].content).toContain("Lalibela");
    expect(await prisma.chatMessage.count({ where: { sessionId: session.id } })).toBe(2);

    const dailyReadBack = await prisma.chatDailyUsage.findUnique({
      where: { date: usage.date }
    });
    expect(dailyReadBack?.tokenCount).toBe(42);
  });
});
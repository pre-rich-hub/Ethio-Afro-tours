import { beforeEach, describe, expect, it, vi } from "vitest";
import request from "supertest";

vi.hoisted(() => {
  process.env.ASSISTANT_ENABLED = "true";
  process.env.OPENAI_API_KEY = "dummy-key";
});

const db = vi.hoisted(() => {
  const sessionDelegate = {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    deleteMany: vi.fn(),
    findMany: vi.fn()
  };
  const messageDelegate = {
    findMany: vi.fn(),
    create: vi.fn()
  };
  const dailyDelegate = {
    findUnique: vi.fn(),
    upsert: vi.fn(),
    updateMany: vi.fn()
  };
  const prisma = {
    admin: { findFirst: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    tour: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    destination: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    tourCategory: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    tourCategoryJunction: { findMany: vi.fn(), deleteMany: vi.fn(), createMany: vi.fn() },
    tourBlockedDate: { findMany: vi.fn(), findFirst: vi.fn(), createMany: vi.fn(), delete: vi.fn(), deleteMany: vi.fn() },
    blog: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    blogCategory: { findMany: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    gallery: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), createMany: vi.fn(), delete: vi.fn(), deleteMany: vi.fn(), count: vi.fn() },
    booking: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn(), updateMany: vi.fn() },
    contact: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), delete: vi.fn(), count: vi.fn() },
    subscriber: { findMany: vi.fn(), create: vi.fn(), delete: vi.fn() },
    testimonial: { findMany: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() },
    mediaAsset: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), delete: vi.fn() },
    layoverPackage: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn(), count: vi.fn() },
    chatSession: sessionDelegate,
    chatMessage: messageDelegate,
    chatDailyUsage: dailyDelegate,
    $queryRaw: vi.fn(),
    $executeRawUnsafe: vi.fn(),
    $transaction: vi.fn(),
    $disconnect: vi.fn()
  };
  return { prisma };
});

const streamChatMock = vi.hoisted(() => vi.fn());

vi.mock("../../src/config/database.js", () => ({ prisma: db.prisma }));
vi.mock("../../src/modules/assistant/provider.client.js", () => ({
  OpenAIProvider: class {},
  GeminiProvider: class {},
  createProvider: () => ({ streamChat: streamChatMock })
}));

import { app } from "../../src/app.js";
import { resetForTests } from "../../src/modules/assistant/context-builder.js";

const SESSION_ID = "3d3d4cd1-1b6c-4c8f-9a5f-2b0e9c5f1a11";

function sessionRow(overrides: Record<string, unknown> = {}) {
  return {
    id: SESSION_ID,
    ipHash: "abc",
    messageCount: 0,
    tokenCount: 0,
    ...overrides
  };
}

function sseBody(text: string): { event: string; data: unknown }[] {
  const frames: { event: string; data: unknown }[] = [];
  const blocks = text.split("\n\n");
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const event = lines.find((line) => line.startsWith("event:"))?.slice(6).trim();
    const data = lines.find((line) => line.startsWith("data:"))?.slice(5).trim();
    if (event && data) frames.push({ event, data: JSON.parse(data) });
  }
  return frames;
}

async function chat(ip: string, body: Record<string, unknown>) {
  return request(app)
    .post("/api/v1/assistant")
    .set("X-Forwarded-For", ip)
    .send(body);
}

beforeEach(() => {
  vi.clearAllMocks();
  resetForTests();

  db.prisma.chatSession.findMany.mockResolvedValue([]);
  db.prisma.chatSession.deleteMany.mockResolvedValue({ count: 0 });
  db.prisma.chatSession.updateMany.mockResolvedValue({ count: 1 });
  db.prisma.chatSession.create.mockResolvedValue(sessionRow());
  db.prisma.chatSession.findUnique.mockResolvedValue(null);

  db.prisma.chatMessage.create.mockImplementation(async ({ data }: any) => ({
    id: data.role === "user" ? 101 : 102,
    sessionId: data.sessionId,
    role: data.role,
    content: data.content,
    tokenCount: data.tokenCount
  }));
  db.prisma.chatMessage.findMany.mockResolvedValue([]);

  db.prisma.chatDailyUsage.upsert.mockResolvedValue({ id: 7, date: new Date(), tokenCount: 0 });
  db.prisma.chatDailyUsage.updateMany.mockResolvedValue({ count: 1 });

  db.prisma.tour.findMany.mockResolvedValue([
    { tourName: "Lalibela & the Northern Circuit", overview: "6-day journey.", included: "[]", excluded: "[]", itinerary: "[]" }
  ]);
  db.prisma.destination.findMany.mockResolvedValue([{ destinationName: "Lalibela", description: "Rock churches." }]);
  db.prisma.layoverPackage.findMany.mockResolvedValue([
    { title: "The Espresso", price: "$95 per person", teaser: "A tight loop.", itinerary: "[]", includes: "[]", bestFor: "8h+" }
  ]);
  db.prisma.blog.findMany.mockResolvedValue([{ blogTitle: "Guide", description: "Tips", content: "Rent a guide." }]);

  streamChatMock.mockReset();
  streamChatMock.mockReturnValue(
    (async function* () {
      yield { text: "Welcome " };
      yield { text: "to Ethiopia" };
    })()
  );
});

describe("assistant chat (mocked prisma + provider)", () => {
  it("rejects an empty message with the 422 envelope", async () => {
    const res = await chat("10.0.0.1", { message: "   " });
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation failed");
    expect(streamChatMock).not.toHaveBeenCalled();
  });

  it("rejects an oversized message with the 422 envelope", async () => {
    const res = await chat("10.0.0.1", { message: "x".repeat(2001) });
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(db.prisma.chatSession.create).not.toHaveBeenCalled();
  });

  it("creates a session and streams meta, deltas and a done frame", async () => {
    db.prisma.chatSession.findUnique.mockResolvedValue(null);

    const res = await chat("10.0.0.2", { message: "Hello, plan my trip" });

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("text/event-stream");

    const frames = sseBody(res.text);

    const meta = frames.find((frame) => frame.event === "meta");
    expect(meta?.data).toMatchObject({
      success: true,
      data: { sessionId: SESSION_ID, resumed: false }
    });

    const deltas = frames.filter((frame) => frame.event === "delta");
    expect(deltas.map((frame) => (frame.data as { text: string }).text).join("")).toBe("Welcome to Ethiopia");

    const done = frames.find((frame) => frame.event === "done");
    expect(done?.data).toMatchObject({
      sessionId: SESSION_ID,
      handoff: { type: "none" }
    });

    expect(db.prisma.chatSession.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ ipHash: expect.any(String) }),
      select: { id: true, messageCount: true, tokenCount: true }
    });
    expect(db.prisma.chatMessage.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ sessionId: SESSION_ID, role: "user", content: "Hello, plan my trip" }),
      select: { id: true }
    });
    expect(streamChatMock).toHaveBeenCalledTimes(1);
  });

  it("resumes an existing session and reports resumed: true", async () => {
    db.prisma.chatSession.findUnique.mockResolvedValue(sessionRow({ messageCount: 2 }));

    const res = await chat("10.0.0.3", { sessionId: SESSION_ID, message: "Where is Bale?" });

    const frames = sseBody(res.text);
    const meta = frames.find((frame) => frame.event === "meta");
    expect(meta?.data).toMatchObject({ data: { sessionId: SESSION_ID, resumed: true } });
    expect(db.prisma.chatSession.findUnique).toHaveBeenCalledWith({
      where: { id: SESSION_ID },
      select: { id: true, messageCount: true, tokenCount: true }
    });
  });

  it("writes a polite limit reply and never calls the provider when the session cap is hit", async () => {
    db.prisma.chatSession.updateMany.mockResolvedValue({ count: 0 });

    const res = await chat("10.0.0.4", { message: "Another question" });

    const frames = sseBody(res.text);
    const done = frames.find((frame) => frame.event === "done");
    expect(done?.data).toMatchObject({ handoff: { type: "limit" } });
    const deltas = frames.filter((frame) => frame.event === "delta");
    expect(deltas).toHaveLength(1);
    expect((deltas[0].data as { text: string }).text).toContain("message limit");
    expect(streamChatMock).not.toHaveBeenCalled();
    expect(db.prisma.chatMessage.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ sessionId: SESSION_ID, role: "system", content: expect.stringContaining("message limit") }),
      select: { id: true }
    });
  });

  it("always returns the JSON envelope from the rate limiter", async () => {
    const ip = "10.0.0.5";
    for (let i = 0; i < 20; i += 1) {
      const res = await chat(ip, { message: `Request ${i}` });
      expect(res.status).toBe(200);
    }
    const blocked = await chat(ip, { message: "Request 21" });
    expect(blocked.status).toBe(429);
    expect(blocked.body.success).toBe(false);
    expect(blocked.body.message).toBe("Too many assistant requests. Please try again later.");
    expect(blocked.body.errors).toEqual([]);
    expect(process.env.ASSISTANT_ENABLED).toBe("true");
  });

  it("emits an SSE error event when the provider throws mid-stream", async () => {
    streamChatMock.mockReturnValue(
      (async function* () {
        yield { text: "partial " };
        throw new Error("upstream boom");
      })()
    );

    const res = await chat("10.0.0.6", { message: "Tell me more" });

    const frames = sseBody(res.text);
    const errors = frames.filter((frame) => frame.event === "error");
    expect(errors).toHaveLength(1);
    expect(errors[0].data).toMatchObject({ success: false, message: "upstream boom" });
    const done = frames.find((frame) => frame.event === "done");
    expect(done).toBeUndefined();
  });
});
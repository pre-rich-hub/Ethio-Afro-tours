import { beforeEach, describe, expect, it, vi } from "vitest";
import bcrypt from "bcryptjs";
import request from "supertest";

const db = vi.hoisted(() => {
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
    $queryRaw: vi.fn(),
    $executeRawUnsafe: vi.fn(),
    $transaction: vi.fn(),
    $disconnect: vi.fn()
  };
  return { prisma };
});

vi.mock("../../src/config/database.js", () => ({ prisma: db.prisma }));

import { app } from "../../src/app.js";

const agent = request.agent(app);

function row(overrides: Record<string, unknown> = {}) {
  return {
    id: 1,
    slug: "6-hour",
    hours: "6 Hours",
    title: "The Espresso",
    price: "$95 per person",
    imageUrl: null,
    teaser: "A tight, elegant loop of the capital.",
    itinerary: '["Meet at arrivals", "Entoto ridge"]',
    includes: '["Private vehicle", "Lunch"]',
    bestFor: "Connections of 8 hours or more",
    sortOrder: 1,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
    ...overrides
  };
}

beforeEach(async () => {
  vi.clearAllMocks();
  const passwordHash = await bcrypt.hash("correct-horse", 4);
  db.prisma.admin.findFirst.mockResolvedValue({
    id: 1,
    email: "admin@example.com",
    name: "Admin",
    passwordHash,
    tokenVersion: 0
  });
  db.prisma.admin.findUnique.mockResolvedValue({
    id: 1,
    email: "admin@example.com",
    name: "Admin",
    profilePicUrl: null,
    tokenVersion: 0
  });
});

describe("public layover packages (mocked prisma)", () => {
  it("lists packages ordered by sortOrder then id", async () => {
    db.prisma.layoverPackage.findMany.mockResolvedValue([
      row({ id: 4, slug: "48-hour", sortOrder: 4 }),
      row({ id: 1, slug: "6-hour", sortOrder: 1 }),
      row({ id: 2, slug: "12-hour", sortOrder: 2 })
    ]);

    const res = await request(app).get("/api/v1/layover-packages");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Layover packages fetched successfully");
    expect(res.body.data).toHaveLength(3);
    expect(db.prisma.layoverPackage.findMany).toHaveBeenCalledWith({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }]
    });
  });

  it("maps rows to the frontend contract (image, best, parsed arrays)", async () => {
    db.prisma.layoverPackage.findMany.mockResolvedValue([row()]);
    const res = await request(app).get("/api/v1/layover-packages");
    expect(res.body.data[0]).toEqual({
      id: 1,
      slug: "6-hour",
      hours: "6 Hours",
      title: "The Espresso",
      price: "$95 per person",
      image: null,
      teaser: "A tight, elegant loop of the capital.",
      itinerary: ["Meet at arrivals", "Entoto ridge"],
      includes: ["Private vehicle", "Lunch"],
      best: "Connections of 8 hours or more"
    });
  });
});

describe("admin layover packages (mocked prisma)", () => {
  it("requires authentication", async () => {
    const res = await request(app).get("/api/v1/admin/layover-packages");
    expect(res.status).toBe(401);
  });

  it("creates a package with a unique slug and returns 201", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    db.prisma.layoverPackage.findUnique.mockResolvedValue(null); // no slug collision
    db.prisma.layoverPackage.create.mockImplementation(async ({ data }: any) => row({ ...data, id: 5 }));

    const res = await agent.post("/api/v1/admin/layover-packages").send({
      hours: "6 Hours",
      title: "The Espresso",
      price: "$95 per person",
      teaser: "A tight loop.",
      itinerary: "Meet at arrivals\nEntoto ridge",
      includes: "Private vehicle\nLunch",
      bestFor: "Connections of 8 hours or more",
      sortOrder: "1"
    });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(db.prisma.layoverPackage.findUnique).toHaveBeenCalledWith({
      where: { slug: "the-espresso" },
      select: { id: true }
    });
    expect(db.prisma.layoverPackage.create).toHaveBeenCalledWith({
      data: {
        slug: "the-espresso",
        hours: "6 Hours",
        title: "The Espresso",
        price: "$95 per person",
        teaser: "A tight loop.",
        itinerary: '["Meet at arrivals","Entoto ridge"]',
        includes: '["Private vehicle","Lunch"]',
        bestFor: "Connections of 8 hours or more",
        sortOrder: 1
      }
    });
    expect(res.body.data).toMatchObject({ id: 5, slug: "the-espresso", title: "The Espresso" });
  });

  it("appends a numeric suffix when the slug is taken", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    db.prisma.layoverPackage.findUnique
      .mockResolvedValueOnce({ id: 3 })
      .mockResolvedValueOnce(null);
    db.prisma.layoverPackage.create.mockImplementation(async ({ data }: any) => row({ ...data, id: 6 }));

    const res = await agent.post("/api/v1/admin/layover-packages").send({
      hours: "6 Hours",
      title: "The Espresso",
      price: "$95 per person"
    });
    expect(res.status).toBe(201);
    expect(res.body.data.slug).toBe("the-espresso-2");
  });

  it("rejects a package missing required fields with 422", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    const res = await agent.post("/api/v1/admin/layover-packages").send({
      hours: "6 Hours",
      title: ""
    });
    expect(res.status).toBe(422);
    expect(db.prisma.layoverPackage.create).not.toHaveBeenCalled();
    // schema parses the bare field value, so the issue path is relative (empty)
    const messages = res.body.errors.map((e: { message: string }) => e.message);
    expect(messages).toContain("Title is required");
  });

  it("updates fields while preserving the slug and clearing a stored image", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    db.prisma.layoverPackage.findUnique.mockResolvedValue(
      row({ id: 5, imageUrl: "/assets/images/layover/LAY-1.png" })
    );
    db.prisma.layoverPackage.update.mockImplementation(async ({ where, data }: any) =>
      row({ id: where.id, ...data })
    );

    // removeImage=true with no new file -> imageUrl null; slug untouched
    const res = await agent.put("/api/v1/admin/layover-packages/5").send({
      removeImage: "true",
      hours: "12 Hours",
      title: "The Capital",
      price: "$165 per person",
      teaser: "Updated teaser.",
      itinerary: "a\nb",
      includes: "x\ny",
      bestFor: "Connections of 14 hours or more",
      sortOrder: "2"
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Layover package updated successfully");
    expect(db.prisma.layoverPackage.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: {
        hours: "12 Hours",
        title: "The Capital",
        price: "$165 per person",
        teaser: "Updated teaser.",
        itinerary: '["a","b"]',
        includes: '["x","y"]',
        bestFor: "Connections of 14 hours or more",
        sortOrder: 2,
        imageUrl: null
      }
    });
    expect(res.body.data.slug).toBe("6-hour"); // slug preserved, not regenerated
  });

  it("keeps the current image when no file and no removeImage flag", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    db.prisma.layoverPackage.findUnique.mockResolvedValue(
      row({ id: 5, imageUrl: "/assets/images/layover/LAY-7.png" })
    );
    db.prisma.layoverPackage.update.mockImplementation(async ({ where, data }: any) =>
      row({ id: where.id, ...data })
    );

    const res = await agent.put("/api/v1/admin/layover-packages/5").send({ title: "Renamed" });
    expect(res.status).toBe(200);
    expect(db.prisma.layoverPackage.update).toHaveBeenCalledWith({
      where: { id: 5 },
      data: {
        hours: "",
        title: "Renamed",
        price: "",
        teaser: "",
        itinerary: "[]",
        includes: "[]",
        bestFor: "",
        sortOrder: 0,
        imageUrl: "/assets/images/layover/LAY-7.png"
      }
    });
  });

  it("deletes a package and prunes its stored file", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    db.prisma.layoverPackage.findUnique.mockResolvedValue(
      row({ id: 5, imageUrl: "/assets/images/layover/LAY-9.png" })
    );
    db.prisma.layoverPackage.delete.mockResolvedValue(row({ id: 5 }));

    const res = await agent.delete("/api/v1/admin/layover-packages/5");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Layover package deleted successfully");
    expect(db.prisma.layoverPackage.delete).toHaveBeenCalledWith({ where: { id: 5 } });
  });

  it("404s when updating or deleting a missing package", async () => {
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    db.prisma.layoverPackage.findUnique.mockResolvedValue(null);
    const put = await agent.put("/api/v1/admin/layover-packages/999").send({});
    expect(put.status).toBe(404);

    const del = await agent.delete("/api/v1/admin/layover-packages/999");
    expect(del.status).toBe(404);
  });
});
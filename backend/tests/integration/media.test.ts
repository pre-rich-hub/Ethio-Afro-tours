import { describe, expect, it, vi } from "vitest";
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


describe("media delivery (mocked prisma)", () => {
  it("returns stored bytes with the right content type", async () => {
    const body = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    db.prisma.mediaAsset.findUnique.mockResolvedValue({
      content: body,
      mimeType: "image/png",
      size: body.length
    });

    const res = await request(app).get("/api/v1/media/11111111-1111-4111-8111-111111111111");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toContain("image/png");
    expect(res.headers["content-length"]).toBe(String(body.length));
    expect(res.body).toEqual(body);
  });

  it("returns 404 for a missing asset", async () => {
    db.prisma.mediaAsset.findUnique.mockResolvedValue(null);
    const res = await request(app).get("/api/v1/media/22222222-2222-4222-8222-222222222222");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  it("rejects malformed ids", async () => {
    const res = await request(app).get("/api/v1/media/not-a-uuid");
    expect(res.status).toBe(422);
  });
});
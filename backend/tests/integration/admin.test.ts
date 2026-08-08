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

describe("admin tours (mocked prisma)", () => {
  it("lists tours for an authenticated admin", async () => {
    db.prisma.tour.findMany.mockResolvedValue([
      {
        id: 3,
        slug: "lalibela-churches",
        tourName: "Lalibela Churches",
        adultPrice: { toNumber: () => 150 },
        childPrice: { toNumber: () => 75 },
        discount: null,
        rating: { toNumber: () => 4.8 },
        noOfRates: 10,
        isFeatured: true,
        overview: "Overview",
        itinerary: '[]',
        included: null,
        excluded: null,
        journeyMap: null,
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-01"),
        destination: null,
        destinations: [],
        categories: [],
        gallery: []
      }
    ]);

    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);

    const res = await agent.get("/api/v1/admin/tours");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0]).toMatchObject({ id: 3, name: "Lalibela Churches", adultPrice: 150 });
    expect(db.prisma.tour.findMany).toHaveBeenCalledOnce();
  });

  it("requires authentication to access admin routes", async () => {
    const res = await request(app).get("/api/v1/admin/tours");
    expect(res.status).toBe(401);
  });
});
import { describe, expect, it, vi } from "vitest";
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

async function seedAdmin() {
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
}

describe("auth (mocked prisma)", () => {
  it("logs in and sets the admin session cookie", async () => {
    await seedAdmin();
    const res = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"]?.[0]).toContain("admin_session=");
    expect(res.body.data.email).toBe("admin@example.com");
  });

  it("rejects invalid credentials", async () => {
    await seedAdmin();
    const res = await request(app).post("/api/v1/auth/login").send({ email: "admin@example.com", password: "wrong" });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("returns 401 for /me without a session", async () => {
    await seedAdmin();
    const res = await request(app).get("/api/v1/auth/me");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Authentication required");
  });

  it("returns the current admin with a valid cookie", async () => {
    await seedAdmin();
    const login = await agent.post("/api/v1/auth/login").send({ email: "admin@example.com", password: "correct-horse" });
    expect(login.status).toBe(200);
    const res = await agent.get("/api/v1/auth/me");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ id: 1, email: "admin@example.com", name: "Admin", profilePicUrl: null });
  });
});
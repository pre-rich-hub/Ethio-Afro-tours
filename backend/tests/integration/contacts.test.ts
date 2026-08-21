import { beforeEach, describe, expect, it, vi } from "vitest";
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
    subscriber: { findMany: vi.fn(), findUnique: vi.fn(), create: vi.fn(), delete: vi.fn() },
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

const email = vi.hoisted(() => ({
  sendEmail: vi.fn(async () => undefined),
  sendContactAdminEmail: vi.fn(async () => undefined),
  sendSubscriberAdminEmail: vi.fn(async () => undefined),
  sendBookingAdminEmail: vi.fn(async () => undefined),
  sendBookingCustomerEmail: vi.fn(async () => undefined),
  sendBookingStatusEmail: vi.fn(async () => undefined),
  sendPasswordChangedEmail: vi.fn(async () => undefined)
}));

vi.mock("../../src/config/database.js", () => ({ prisma: db.prisma }));
vi.mock("../../src/services/email.service.js", () => email);

import { app } from "../../src/app.js";

describe("contact form (mocked prisma)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("accepts a contact message and returns the success envelope", async () => {
    db.prisma.contact.create.mockResolvedValue({
      id: 1,
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would like to book the Lalibela tour.",
      createdAt: new Date("2026-01-01")
    });

    const res = await request(app).post("/api/v1/contact").send({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would like to book the Lalibela tour."
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, message: "Message sent successfully", data: null });
    expect(db.prisma.contact.create).toHaveBeenCalledOnce();
    expect(email.sendContactAdminEmail).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would like to book the Lalibela tour."
    });
  });

  it("rejects a message that is too short", async () => {
    const res = await request(app).post("/api/v1/contact").send({
      name: "Ada",
      email: "ada@example.com",
      message: "short"
    });
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(db.prisma.contact.create).not.toHaveBeenCalled();
    expect(email.sendContactAdminEmail).not.toHaveBeenCalled();
  });
});

describe("newsletter subscription (mocked prisma)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("subscribes a new email and sends the admin notification", async () => {
    db.prisma.subscriber.findUnique.mockResolvedValue(null);
    db.prisma.subscriber.create.mockResolvedValue({
      id: 1,
      email: "reader@example.com",
      createdAt: new Date("2026-01-01")
    });

    const res = await request(app).post("/api/v1/subscribe").send({
      email: "reader@example.com"
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "Subscribed successfully",
      data: { subscribed: true }
    });
    expect(db.prisma.subscriber.create).toHaveBeenCalledWith({
      data: { email: "reader@example.com" }
    });
    expect(email.sendSubscriberAdminEmail).toHaveBeenCalledOnce();
    expect(email.sendSubscriberAdminEmail).toHaveBeenCalledWith({
      email: "reader@example.com",
      subscribedAt: expect.any(Date)
    });
  });

  it("does not resend the notification for an existing subscriber", async () => {
    db.prisma.subscriber.findUnique.mockResolvedValue({
      id: 1,
      email: "reader@example.com",
      createdAt: new Date("2026-01-01")
    });

    const res = await request(app).post("/api/v1/subscribe").send({
      email: "reader@example.com"
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      success: true,
      message: "You are already subscribed",
      data: { subscribed: true }
    });
    expect(db.prisma.subscriber.create).not.toHaveBeenCalled();
    expect(email.sendSubscriberAdminEmail).not.toHaveBeenCalled();
  });
});

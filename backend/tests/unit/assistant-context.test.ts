import { beforeEach, describe, expect, it, vi } from "vitest";

const db = vi.hoisted(() => {
  const delegate = {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    delete: vi.fn(),
    deleteMany: vi.fn(),
    upsert: vi.fn(),
    count: vi.fn()
  };
  const prisma = {
    chatSession: { ...delegate },
    chatMessage: { ...delegate },
    chatDailyUsage: { ...delegate },
    tour: { findMany: vi.fn() },
    destination: { findMany: vi.fn() },
    layoverPackage: { findMany: vi.fn() },
    blog: { findMany: vi.fn() },
    $queryRaw: vi.fn(),
    $executeRawUnsafe: vi.fn(),
    $transaction: vi.fn(),
    $disconnect: vi.fn()
  };
  return { prisma };
});

vi.mock("../../src/config/database.js", () => ({ prisma: db.prisma }));

import { env } from "../../src/config/env.js";
import {
  CatalogContextBuilder,
  getCatalogContext,
  resetForTests
} from "../../src/modules/assistant/context-builder.js";

function tourRow(overrides: Record<string, unknown> = {}) {
  return {
    tourName: "Lalibela & the Northern Circuit",
    overview: "A 6-day journey through the rock-hewn churches.",
    included: '["Hotels", "Transport"]',
    excluded: '["Flights"]',
    itinerary: '["Day 1: Arrive Addis", "Day 2: Lalibela"]',
    ...overrides
  };
}

function destinationRow(overrides: Record<string, unknown> = {}) {
  return {
    destinationName: "Lalibela",
    description: "Home of the famous rock-hewn churches.",
    ...overrides
  };
}

function packageRow(overrides: Record<string, unknown> = {}) {
  return {
    title: "The Espresso",
    price: "$95 per person",
    teaser: "A tight loop of the capital.",
    itinerary: '["Meet at arrivals", "Entoto ridge"]',
    includes: '["Private vehicle", "Lunch"]',
    bestFor: "Connections of 8 hours or more",
    ...overrides
  };
}

function blogRow(overrides: Record<string, unknown> = {}) {
  return {
    blogTitle: "A First-Timer's Guide to Addis",
    description: "What to know before you land.",
    content: "Coffee ceremonies and mountain views...",
    ...overrides
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  resetForTests();
  db.prisma.tour.findMany.mockResolvedValue([tourRow()]);
  db.prisma.destination.findMany.mockResolvedValue([destinationRow()]);
  db.prisma.layoverPackage.findMany.mockResolvedValue([packageRow()]);
  db.prisma.blog.findMany.mockResolvedValue([blogRow()]);
});

describe("CatalogContextBuilder", () => {
  it("reads the four catalog sources with the expected selects", async () => {
    const builder = new CatalogContextBuilder(db.prisma as never);
    await builder.build();

    expect(db.prisma.tour.findMany).toHaveBeenCalledWith({
      select: { tourName: true, overview: true, included: true, excluded: true, itinerary: true },
      orderBy: { id: "asc" }
    });
    expect(db.prisma.destination.findMany).toHaveBeenCalledWith({
      select: { destinationName: true, description: true },
      orderBy: { id: "asc" }
    });
    expect(db.prisma.layoverPackage.findMany).toHaveBeenCalledWith({
      select: { title: true, price: true, teaser: true, itinerary: true, includes: true, bestFor: true },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }]
    });
    expect(db.prisma.blog.findMany).toHaveBeenCalledWith({
      select: { blogTitle: true, description: true, content: true },
      orderBy: { id: "asc" }
    });
  });

  it("returns sections containing the catalog rows, a token estimate and a build time", async () => {
    const builder = new CatalogContextBuilder(db.prisma as never);
    const context = await builder.build();

    const joined = context.sections.join("\n\n");
    expect(joined).toContain("Lalibela & the Northern Circuit");
    expect(joined).toContain("The Espresso");
    expect(joined).toContain("Lalibela");
    expect(joined).toContain("A First-Timer's Guide to Addis");
    expect(context.tokenEstimate).toBeGreaterThan(0);
    expect(context.builtAt).toBeInstanceOf(Date);
    expect(context.truncated).toBe(false);
  });

  it("trims the catalog to ASSISTANT_MAX_CONTEXT_CHARS when oversized", async () => {
    db.prisma.blog.findMany.mockResolvedValue([
      blogRow({ content: "y".repeat(env.ASSISTANT_MAX_CONTEXT_CHARS + 10000) })
    ]);
    const builder = new CatalogContextBuilder(db.prisma as never);
    const context = await builder.build();

    expect(context.truncated).toBe(true);
    expect(context.sections.join("\n").length).toBeLessThanOrEqual(env.ASSISTANT_MAX_CONTEXT_CHARS);
  });

  it("tolerates missing catalog records", async () => {
    db.prisma.tour.findMany.mockResolvedValue(undefined);
    db.prisma.destination.findMany.mockResolvedValue([]);
    const builder = new CatalogContextBuilder(db.prisma as never);
    const context = await builder.build();
    expect(context.sections.join("\n").length).toBeGreaterThan(0);
  });
});

describe("getCatalogContext memoization", () => {
  it("serves the memoized context within the TTL and rebuilds after resetForTests", async () => {
    const builder = new CatalogContextBuilder(db.prisma as never);

    const first = await getCatalogContext(builder);
    const second = await getCatalogContext(builder);
    expect(second).toBe(first);
    expect(db.prisma.tour.findMany).toHaveBeenCalledTimes(1);

    resetForTests();
    const third = await getCatalogContext(builder);
    expect(third).not.toBe(first);
    expect(db.prisma.tour.findMany).toHaveBeenCalledTimes(2);
  });
});
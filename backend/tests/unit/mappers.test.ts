import { describe, expect, it } from "vitest";
import {
  mapBlog,
  mapBooking,
  mapDestination,
  mapGalleryImage,
  mapTour
} from "../../src/utils/mappers.js";

const decimal = (value: number) => ({ toNumber: () => value });

describe("mapTour", () => {
  const tour = {
    id: 7,
    slug: "lalibela-churches",
    tourName: "Lalibela Churches",
    adultPrice: decimal(150),
    childPrice: decimal(75),
    discount: "10%",
    rating: decimal(4.8),
    noOfRates: 12,
    isFeatured: true,
    overview: "Overview text",
    included: '["guide"]',
    excluded: '["flights"]',
    itinerary: '[{"day":1}]',
    journeyMap: "https://map.example/1",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-02"),
    gallery: [{ id: 1, imageUrl: "/assets/images/gallery/IMG-1.png", tourId: 7 }],
    destination: { id: 2, slug: "lalibela", destinationName: "Lalibela", description: "churches", imageUrl: null },
    destinations: [
      { destination: { id: 2, slug: "lalibela", destinationName: "Lalibela", description: "churches", imageUrl: null } },
      { destination: { id: 3, slug: "axum", destinationName: "Axum", description: "obelisks", imageUrl: null } }
    ],
    categories: [
      { category: { id: 1, categoryName: "Historical", createdAt: null } },
      { category: { id: 2, categoryName: "Religious", createdAt: null } }
    ]
  } as any;

  it("maps core fields and deduplicates destinations", () => {
    const mapped = mapTour(tour);
    expect(mapped.id).toBe(7);
    expect(mapped.name).toBe("Lalibela Churches");
    expect(mapped.adultPrice).toBe(150);
    expect(mapped.rating).toBe(4.8);
    expect(mapped.mainImage).toBe("/assets/images/gallery/IMG-1.png");
    expect(mapped.destinations).toHaveLength(2);
    expect(mapped.durationDays).toBe(1);
    expect(mapped.categories.map((c: any) => c.name)).toEqual(["Historical", "Religious"]);
    expect(mapped.canonical).toEqual({ type: "slug", id: 7, suggestedPath: "/tours/lalibela-churches", slug: "lalibela-churches" });
  });

  it("includes detail fields only when detail is true", () => {
    const summary = mapTour(tour, false);
    expect(summary.included).toBeUndefined();
    expect(summary.itinerary).toBeUndefined();

    const detail = mapTour(tour, true);
    expect(detail.included).toEqual(["guide"]);
    expect(detail.itinerary).toEqual([{ day: 1 }]);
    expect(detail.journeyMap).toBe("https://map.example/1");
  });

  it("handles empty gallery and invalid itinerary", () => {
    const mapped = mapTour({ ...tour, gallery: [], itinerary: "not json" } as any);
    expect(mapped.gallery).toEqual([]);
    expect(mapped.mainImage).toBeNull();
    expect(mapped.durationDays).toBe(0);
  });
});

describe("mapDestination", () => {
  it("uses tourLinks count when present", () => {
    const mapped = mapDestination({ id: 1, slug: "gondar", destinationName: "Gondar", description: null, imageUrl: null, _count: { tourLinks: 3, tours: 5 } } as any);
    expect(mapped.tourCount).toBe(3);
  });

  it("falls back to tours count", () => {
    const mapped = mapDestination({ id: 2, slug: "axum", destinationName: "Axum", description: null, imageUrl: null, _count: { tours: 5 } } as any);
    expect(mapped.tourCount).toBe(5);
  });
});

describe("mapGalleryImage", () => {
  it("maps image fields", () => {
    expect(mapGalleryImage({ id: 9, imageUrl: "/x.png", tourId: 3 } as any)).toEqual({
      id: 9,
      imageUrl: "/x.png",
      tourId: 3
    });
  });
});

describe("mapBlog", () => {
  it("maps category and canonical path", () => {
    const mapped = mapBlog({
      id: 4,
      slug: "ethiopia-history",
      blogTitle: "Ethiopia History",
      description: "d",
      imageUrl: null,
      createdAt: new Date("2026-02-01"),
      category: { id: 1, name: "History", slug: "history" }
    } as any);
    expect(mapped.title).toBe("Ethiopia History");
    expect(mapped.category).toEqual({ id: 1, name: "History", slug: "history" });
    expect(mapped.canonical.suggestedPath).toBe("/blog/ethiopia-history");
  });

  it("handles missing category", () => {
    const mapped = mapBlog({ id: 5, blogTitle: "No Cat", description: null, imageUrl: null, createdAt: null, category: null } as any);
    expect(mapped.category).toBeNull();
  });
});

describe("mapBooking", () => {
  it("maps booking with tour summary", () => {
    const mapped = mapBooking({
      id: 11,
      tourId: 7,
      fullName: "Ana",
      email: "ana@example.com",
      phone: "123",
      country: "ES",
      chosenDate: new Date("2026-05-10"),
      adults: 2,
      children: 1,
      status: "Confirmed",
      createdAt: new Date("2026-04-01"),
      tour: { id: 7, tourName: "Lalibela Churches" }
    } as any);
    expect(mapped.tour).toEqual({ id: 7, name: "Lalibela Churches" });
    expect(mapped.status).toBe("Confirmed");
  });

  it("defaults status and null tour", () => {
    const mapped = mapBooking({ id: 12, tourId: null, fullName: "Bob", email: "b@e.com", phone: "9", country: "US", chosenDate: new Date(), adults: 1, children: 0, tour: null } as any);
    expect(mapped.tour).toBeNull();
    expect(mapped.status).toBe("Pending");
  });
});
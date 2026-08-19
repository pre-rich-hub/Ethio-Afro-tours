import { describe, expect, it } from "vitest";
import { destinationSeeds } from "../../scripts/data/destinations.seed.js";
import { tourSeeds } from "../../scripts/data/tours.seed.js";

const newDestinationSlugs = [
  "gheralta-mountains",
  "awash-national-park",
  "lake-langano",
  "gedeo-cultural-landscape",
  "kafa-biosphere-reserve"
];

const newTourSlugs = [
  "gheralta-rock-churches-and-aksum",
  "awash-and-harar-eastern-ethiopia",
  "rift-valley-lakes-and-langano",
  "gedeo-living-landscape",
  "kafa-forest-trekking-and-birding"
];

const cloudinaryByDestinationSlug: Record<string, string> = {
  "gheralta-mountains": "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156491/gheralta-mountains.jpg",
  "awash-national-park": "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156513/awash-national-park.png",
  "lake-langano": "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156508/lake-langano.png",
  "gedeo-cultural-landscape": "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156514/gedeo-cultural-landscape.png",
  "kafa-biosphere-reserve": "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156488/kafa-biosphere-reserve.jpg"
};

const cloudinaryByTourSlug: Record<string, string> = {
  "gheralta-rock-churches-and-aksum": cloudinaryByDestinationSlug["gheralta-mountains"],
  "awash-and-harar-eastern-ethiopia": cloudinaryByDestinationSlug["awash-national-park"],
  "rift-valley-lakes-and-langano": cloudinaryByDestinationSlug["lake-langano"],
  "gedeo-living-landscape": cloudinaryByDestinationSlug["gedeo-cultural-landscape"],
  "kafa-forest-trekking-and-birding": cloudinaryByDestinationSlug["kafa-biosphere-reserve"]
};

const supportedCategorySlugs = new Set([
  "historical-tours",
  "religious-pilgrimage-tours",
  "cultural-tours",
  "nature-adventure-tours",
  "nature-tours",
  "trekking-hiking-tours",
  "ethiopia-holiday-packages",
  "festival-tours",
  "omo-valley-tours"
]);

describe("client catalog seeds", () => {
  it("contains 25 destinations with unique slugs", () => {
    const slugs = destinationSeeds.map((destination) => destination.slug);
    expect(slugs).toHaveLength(25);
    expect(new Set(slugs).size).toBe(25);
    expect(slugs).toEqual(expect.arrayContaining(newDestinationSlugs));
  });

  it("uses the supplied Cloudinary image for each new destination", () => {
    for (const slug of newDestinationSlugs) {
      const destination = destinationSeeds.find((item) => item.slug === slug);
      expect(destination?.imageUrl).toBe(cloudinaryByDestinationSlug[slug]);
    }
  });

  it("contains 20 tours with unique slugs", () => {
    const slugs = tourSeeds.map((tour) => tour.slug);
    expect(slugs).toHaveLength(20);
    expect(new Set(slugs).size).toBe(20);
    expect(slugs).toEqual(expect.arrayContaining(newTourSlugs));
  });

  it("resolves every tour destination to a seeded destination", () => {
    const destinationSlugs = new Set(destinationSeeds.map((destination) => destination.slug));
    for (const tour of tourSeeds) {
      expect(tour.destinationSlugs.every((slug) => destinationSlugs.has(slug))).toBe(true);
    }
  });

  it("uses only categories supported by the database seed map", () => {
    for (const tour of tourSeeds) {
      expect(tour.categorySlugs.every((slug) => supportedCategorySlugs.has(slug))).toBe(true);
    }
  });

  it("gives each new tour a hero image and one itinerary entry per day", () => {
    const newTours = tourSeeds.filter((tour) => newTourSlugs.includes(tour.slug));
    expect(newTours).toHaveLength(5);
    for (const tour of newTours) {
      expect(tour.gallery).toEqual([cloudinaryByTourSlug[tour.slug]]);
      expect(tour.legacyGallery).toHaveLength(1);
      expect(tour.itinerary.map((step) => step.day)).toEqual(
        Array.from({ length: tour.itinerary.length }, (_, index) => index + 1)
      );
    }
  });
});

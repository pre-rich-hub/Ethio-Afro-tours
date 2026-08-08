import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { env } from "../src/config/env.js";
import { slugify } from "../src/utils/slug.js";
import { tourSeeds } from "./data/tours.seed.js";
import { destinationSeeds } from "./data/destinations.seed.js";

// Seeds run against the DIRECT connection: interactive transactions (tour
// upsert + junction sync) fail with P2028 over the pooled pgbouncer URL.
// The app runtime stays on the pooled DATABASE_URL; this mirrors the
// migrate-via-DIRECT_URL convention.
const prisma = new PrismaClient({
  ...(env.DIRECT_URL ? { datasourceUrl: env.DIRECT_URL } : {})
});

/**
 * Seeds the demo catalog and ops data:
 *  - blog categories (4), tour categories (5)
 *  - destinations (10 = 5 base + 5 curated from the reference destination seeds)
 *  - tours (10 curated from the client-owned tours.ts, mapped into our schema)
 *  - bookings (4, mixed statuses), contacts (4), subscribers (3)
 *  - testimonials (tops up to 3)
 *
 * Idempotent: tours upsert by slug (rows only rewritten when they drift from
 * the seed values, so the second run changes nothing), destinations upsert by
 * slug, and bookings/contacts/subscribers are guarded by row counts.
 */
async function main() {
  // ------------------------- Blog categories -------------------------
  const blogCategories = ["Culture", "Nature", "Travel Tips", "History"];
  for (const name of blogCategories) {
    await prisma.blogCategory.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) }
    });
  }
  console.log(`Blog categories: ${blogCategories.length}`);

  // ------------------------- Tour categories -------------------------
  const tourCategories = [
    "Historical Sites",
    "Nature & Wildlife",
    "Adventure",
    "Cultural Tours",
    "Religious Tours"
  ];
  for (const name of tourCategories) {
    const slug = slugify(name);
    const existing = await prisma.tourCategory.findFirst({ where: { slug } });
    if (!existing) {
      await prisma.tourCategory.create({ data: { categoryName: name, slug } });
    }
  }
  console.log(`Tour categories: ${tourCategories.length}`);

  // ------------------------- Destinations -------------------------
  const baseDestinations = [
    { name: "Addis Ababa", description: "The capital city — gateway to Ethiopia.", imageUrl: null },
    { name: "Lalibela", description: "Famous for its rock-hewn churches.", imageUrl: null },
    { name: "Gondar", description: "Known as the Camelot of Africa.", imageUrl: null },
    { name: "Bahir Dar", description: "Gateway to Lake Tana and the Blue Nile Falls.", imageUrl: null },
    { name: "Axum", description: "Home to ancient obelisks and legends of the Ark.", imageUrl: null }
  ];
  const destinationSeedsMerged = [
    ...baseDestinations,
    ...destinationSeeds.map((d) => ({
      name: d.destinationName,
      description: d.description,
      imageUrl: d.imageUrl
    }))
  ];
  for (const destination of destinationSeedsMerged) {
    await prisma.destination.upsert({
      where: { slug: slugify(destination.name) },
      update: {
        description: destination.description,
        ...(destination.imageUrl ? { imageUrl: destination.imageUrl } : {})
      },
      create: {
        slug: slugify(destination.name),
        destinationName: destination.name,
        description: destination.description,
        ...(destination.imageUrl ? { imageUrl: destination.imageUrl } : {})
      }
    });
  }
  const destinationCount = await prisma.destination.count();
  console.log(`Destinations: ${destinationCount}`);

  // ------------------------- Tours -------------------------
  // Map reference category slugs -> our seeded tour categories (by slug).
  // Slugs missing from the map (e.g. "private-customized-tours") are skipped.
  const categorySlugMap: Record<string, string> = {
    "historical-tours": "historical-sites",
    "unesco-heritage-tours": "historical-sites",
    "ethiopia-historic-route-tours": "historical-sites",
    "nature-tours": "nature-wildlife",
    "wildlife-tours": "nature-wildlife",
    "birdwatching-tours": "nature-wildlife",
    "nature-adventure-tours": "adventure",
    "nature-geological-tours": "adventure",
    "trekking-hiking-tours": "adventure",
    "cultural-tours": "cultural-tours",
    "city-tours": "cultural-tours",
    "day-tours": "cultural-tours",
    "festival-tours": "cultural-tours",
    "photography-tours": "cultural-tours",
    "omo-valley-tours": "cultural-tours",
    "southern-ethiopia-tours": "cultural-tours",
    "ethiopia-holiday-packages": "cultural-tours",
    "religious-pilgrimage-tours": "religious-tours"
  };

  // Map reference destination slugs -> our seeded destinations (by slug).
  // Slugs missing from the map are skipped (granularity of the demo catalog).
  const destinationSlugMap: Record<string, string> = {
    "addis-ababa": "addis-ababa",
    "mount-entoto": "addis-ababa",
    "national-museum-of-ethiopia": "addis-ababa",
    "ethnological-museum": "addis-ababa",
    "holy-trinity-cathedral": "addis-ababa",
    "debre-libanos-monastery": "addis-ababa",
    "portuguese-bridge": "addis-ababa",
    "jemma-river-gorge": "addis-ababa",
    lalibela: "lalibela",
    gondar: "gondar",
    aksum: "axum",
    "bahir-dar": "bahir-dar",
    "lake-tana": "bahir-dar",
    "blue-nile-falls": "bahir-dar",
    "awra-amba": "bahir-dar",
    harar: "harar",
    "dire-dawa": "harar",
    aweday: "harar",
    "omo-valley": "omo-valley",
    jinka: "omo-valley",
    "arba-minch": "omo-valley",
    "lake-chamo": "omo-valley",
    "mago-national-park": "omo-valley",
    turmi: "omo-valley",
    karo: "omo-valley",
    nyangatom: "omo-valley",
    omorate: "omo-valley",
    dassanech: "omo-valley",
    konso: "omo-valley",
    "konso-cultural-landscape": "omo-valley",
    dorze: "omo-valley",
    hawassa: "omo-valley",
    "lake-hawassa": "omo-valley",
    "lake-langano": "omo-valley",
    "lake-ziway": "omo-valley",
    tiya: "omo-valley",
    "adadi-maryam": "omo-valley",
    "melka-kunture": "omo-valley",
    "danakil-depression": "danakil-depression",
    "erta-ale": "danakil-depression",
    dallol: "danakil-depression",
    mekele: "danakil-depression",
    semera: "danakil-depression",
    "simien-mountains-national-park": "simien-mountains-national-park",
    "bale-mountains-national-park": "bale-mountains-national-park"
  };

  const tourCategoriesBySlug = await prisma.tourCategory.findMany();
  const destinationsBySlug = await prisma.destination.findMany();
  const categoryIdFor = (slug: string) =>
    tourCategoriesBySlug.find((c) => c.slug === slug)?.id;
  const destinationIdFor = (slug: string) =>
    destinationsBySlug.find((d) => d.slug === slug)?.id;

  let seededTours = 0;
  let demoPricedTours = 0;

  for (const seed of tourSeeds) {
    // Resolve categories and destinations for this tour.
    const categoryIds = [
      ...new Set(
        seed.categorySlugs
          .map((slug) => categorySlugMap[slug])
          .filter(Boolean)
          .map((slug) => categoryIdFor(slug!))
          .filter((id): id is number => id !== undefined)
      )
    ];
    const destinationIds = [
      ...new Set(
        seed.destinationSlugs
          .map((slug) => destinationSlugMap[slug])
          .filter(Boolean)
          .map((slug) => destinationIdFor(slug!))
          .filter((id): id is number => id !== undefined)
      )
    ];
    const destinationId = destinationIds[0] ?? null;

    if (seed.priceSource === "demo") {
      // DEMO PLACEHOLDER PRICE: the source document lists 0/0 for this tour;
      // a plausible demo price was assigned in tours.seed.ts.
      demoPricedTours += 1;
    }

    const fields = {
      destinationId,
      tourName: seed.tourName,
      adultPrice: seed.adultPrice,
      childPrice: seed.childPrice,
      rating: seed.rating,
      noOfRates: seed.noOfRates,
      isFeatured: seed.isFeatured,
      overview: seed.overview,
      included: JSON.stringify(seed.included),
      excluded: JSON.stringify(seed.excluded),
      itinerary: JSON.stringify(seed.itinerary),
      journeyMap: seed.journeyMap
    };

    const existing = await prisma.tour.findUnique({
      where: { slug: seed.slug },
      select: {
        id: true,
        destinationId: true,
        tourName: true,
        adultPrice: true,
        childPrice: true,
        rating: true,
        noOfRates: true,
        isFeatured: true,
        overview: true,
        included: true,
        excluded: true,
        itinerary: true,
        journeyMap: true
      }
    });

    const scalarChanged =
      !existing ||
      existing.destinationId !== fields.destinationId ||
      existing.tourName !== fields.tourName ||
      Number(existing.adultPrice) !== fields.adultPrice ||
      Number(existing.childPrice) !== fields.childPrice ||
      Number(existing.rating) !== fields.rating ||
      existing.noOfRates !== fields.noOfRates ||
      existing.isFeatured !== fields.isFeatured ||
      existing.overview !== fields.overview ||
      existing.included !== fields.included ||
      existing.excluded !== fields.excluded ||
      existing.itinerary !== fields.itinerary ||
      existing.journeyMap !== fields.journeyMap;

    if (!existing || scalarChanged) {
      await prisma.$transaction(async (tx) => {
        const tour = existing
          ? await tx.tour.update({
              where: { id: existing.id },
              data: { ...fields }
            })
          : await tx.tour.create({
              data: { slug: seed.slug, ...fields }
            });

        // Re-sync only seed-owned relation rows, so admin-added
        // categories/destinations/gallery images are left untouched.
        if (categoryIds.length) {
          await tx.tourCategoryJunction.deleteMany({
            where: { tourId: tour.id, categoryId: { in: categoryIds } }
          });
          await tx.tourCategoryJunction.createMany({
            data: categoryIds.map((categoryId) => ({ tourId: tour.id, categoryId })),
            skipDuplicates: true
          });
        }
        if (destinationIds.length) {
          await tx.tourDestinationJunction.deleteMany({
            where: { tourId: tour.id, destinationId: { in: destinationIds } }
          });
          await tx.tourDestinationJunction.createMany({
            data: destinationIds.map((destinationId) => ({ tourId: tour.id, destinationId })),
            skipDuplicates: true
          });
        }
        if (seed.gallery.length) {
          await tx.gallery.deleteMany({
            where: { tourId: tour.id, imageUrl: { in: seed.gallery } }
          });
          await tx.gallery.createMany({
            data: seed.gallery.map((imageUrl) => ({ tourId: tour.id, imageUrl }))
          });
        }
      });
    }
    seededTours += 1;
  }

  const tourCount = await prisma.tour.count();
  console.log(`Tours: ${seededTours} seeded (${tourCount} total, ${demoPricedTours} demo-priced)`);

  // ------------------------- Bookings -------------------------
  const bookingCount = await prisma.booking.count();
  if (bookingCount === 0) {
    const daysFromNow = (days: number) => {
      const date = new Date();
      date.setDate(date.getDate() + days);
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };
    const bookings = [
      {
        tourSlug: "10-day-omo-valley-bale-mountains-cultural-adventure",
        fullName: "Sarah Mitchell",
        email: "sarah.mitchell@example.com",
        phone: "+1 415 555 0134",
        country: "United States",
        chosenDate: daysFromNow(21),
        adults: 2,
        children: 1,
        status: "Pending"
      },
      {
        tourSlug: "3-day-lalibela-genna-festival-tour",
        fullName: "David Okafor",
        email: "david.okafor@example.com",
        phone: "+234 803 555 0177",
        country: "Nigeria",
        chosenDate: daysFromNow(35),
        adults: 2,
        children: 0,
        status: "Confirmed"
      },
      {
        tourSlug: "1-day-debre-libanos-portuguese-bridge-tour",
        fullName: "Hanna Tesfaye",
        email: "hanna.tesfaye@example.com",
        phone: "+251 911 555 0110",
        country: "Ethiopia",
        chosenDate: daysFromNow(7),
        adults: 1,
        children: 1,
        status: "Completed"
      },
      {
        tourSlug: "12-day-historic-north-omo-valley-tour",
        fullName: "Michael Chen",
        email: "michael.chen@example.com",
        phone: "+65 8123 4567",
        country: "Singapore",
        chosenDate: daysFromNow(60),
        adults: 4,
        children: 2,
        status: "Pending"
      }
    ];
    for (const booking of bookings) {
      const tour = await prisma.tour.findUnique({ where: { slug: booking.tourSlug } });
      if (!tour) throw new Error(`Seed booking references unknown tour: ${booking.tourSlug}`);
      await prisma.booking.create({
        data: {
          tourId: tour.id,
          fullName: booking.fullName,
          email: booking.email,
          phone: booking.phone,
          country: booking.country,
          chosenDate: booking.chosenDate,
          adults: booking.adults,
          children: booking.children,
          status: booking.status
        }
      });
    }
    console.log(`Bookings: ${bookings.length} created`);
  } else {
    console.log(`Bookings: ${bookingCount} existing, skipped (guard: count != 0)`);
  }

  // ------------------------- Contacts -------------------------
  const contactCount = await prisma.contact.count();
  if (contactCount === 0) {
    const contacts = [
      {
        name: "Amelia Hart",
        email: "amelia.hart@example.com",
        message:
          "Hi, we are planning a 10-day family trip to Ethiopia next spring. Could you share availability and pricing for the Omo Valley itinerary?"
      },
      {
        name: "Lucas Meyer",
        email: "lucas.meyer@example.com",
        message:
          "Do you organize private Danakil tours for small groups? We are two photographers looking for a custom schedule."
      },
      {
        name: "Priya Nair",
        email: "priya.nair@example.com",
        message:
          "What is the best time of year for the Lalibela Genna festival? We would like to book for a group of six."
      },
      {
        name: "Omar Farouk",
        email: "omar.farouk@example.com",
        message:
          "I would like a quote for a 12-day historic north and Omo Valley combination tour in the autumn."
      }
    ];
    await prisma.contact.createMany({ data: contacts });
    console.log(`Contacts: ${contacts.length} created`);
  } else {
    console.log(`Contacts: ${contactCount} existing, skipped (guard: count != 0)`);
  }

  // ------------------------- Subscribers -------------------------
  const subscriberEmails = [
    "reader.first@example.com",
    "reader.second@example.com",
    "reader.third@example.com"
  ];
  let subscriberCount = 0;
  for (const email of subscriberEmails) {
    await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email }
    });
    subscriberCount += 1;
  }
  console.log(`Subscribers: ${subscriberCount} ensured`);

  // ------------------------- Testimonials -------------------------
  const extraTestimonials = [
    {
      message:
        "The Danakil expedition was raw, otherworldly and flawlessly organized. Camping under the stars near Erta Ale is something I will never forget.",
      reviewerName: "Elena Kovač",
      profession: "Photographer"
    },
    {
      message:
        "Watching the Genna festival in Lalibela with this team felt like a privilege, not a tour. Every detail was handled with care and respect.",
      reviewerName: "James Whitfield",
      profession: "Travel Writer"
    }
  ];
  let testimonialsCreated = 0;
  for (const testimonial of extraTestimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { reviewerName: testimonial.reviewerName }
    });
    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
      testimonialsCreated += 1;
    }
  }
  const testimonialCount = await prisma.testimonial.count();
  console.log(
    `Testimonials: ${testimonialCount} total (${testimonialsCreated} new this run)`
  );

  console.log("Seed complete");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

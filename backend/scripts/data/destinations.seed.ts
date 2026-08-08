// ADDITIONAL DESTINATIONS CURATED FROM
// /Ethio-origins-tour/frontend/features/destinations/data/destinations.ts
// 5 more destinations on top of the 5 base ones in scripts/seed.ts
// (Addis Ababa, Lalibela, Gondar, Bahir Dar, Axum) — total 10.
// Descriptions and image URLs come from the reference destination seeds;
// two short descriptions were written locally where the reference entry
// carried none (Harar, Simien Mountains National Park).
export interface DestinationSeed {
  slug: string;
  destinationName: string;
  description: string;
  imageUrl: string | null;
}

export const destinationSeeds: DestinationSeed[] = [
  {
    slug: "omo-valley",
    destinationName: "Omo Valley",
    description:
      "A respectful, guided immersion into living cultures, market towns, river valleys, and community-led travel experiences in Southern Ethiopia.",
    imageUrl:
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782246561/Private_Omo_Valley_Tours_From_Addis_Ababa_xvpppa.jpg"
  },
  {
    slug: "danakil-depression",
    destinationName: "Danakil Depression",
    description:
      "Otherworldly salt flats, volcanic color fields, desert caravans, and one of the most dramatic geological landscapes on earth.",
    imageUrl:
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782248872/4996249580453896_lrt6x7.jpg"
  },
  {
    slug: "harar",
    destinationName: "Harar",
    description:
      "A walled UNESCO city of 99 mosques and shrines, famous for its ancient alleys, vibrant markets and the nightly hyena-feeding tradition.",
    imageUrl:
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782306410/Feeding_Wild_Hyenas_in_Harar_kciiku.jpg"
  },
  {
    slug: "simien-mountains-national-park",
    destinationName: "Simien Mountains National Park",
    description:
      "A UNESCO-listed highland plateau of dramatic escarpments, home to Gelada baboons, Walia ibex and endemic birdlife.",
    imageUrl:
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782373760/Day_trek_to_Simien_Mountain_m7u1xw.jpg"
  },
  {
    slug: "bale-mountains-national-park",
    destinationName: "Bale Mountains National Park",
    description:
      "Cloud forests, endemic wildlife, alpine plateaus, quiet lodges, and slow days in Ethiopia's wild southeast.",
    imageUrl:
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782373759/Trekking_at_Bale_Mountains_3_Days_konkwz.jpg"
  }
];

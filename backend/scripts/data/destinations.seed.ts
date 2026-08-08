// CLIENT CATALOG — EthioAfroTours frontend/lib/site.ts (destinations array).
// All 8 site destinations, mapped into the backend Destination schema.
// Slug follows the client's destination slug list; description is the
// client's `intro` (fallback `teaser`); imageUrl keeps the client's image
// path (Phase 3 swaps in /api/v1/media URLs once the media pipeline lands).
export interface DestinationSeed {
  slug: string;
  destinationName: string;
  description: string;
  imageUrl: string | null;
}

export const destinationSeeds: DestinationSeed[] = [
  {
    slug: "lalibela",
    destinationName: "Lalibela",
    description:
      "A medieval capital where an entire holy city was excavated from the mountain itself — and where, eight centuries later, the liturgy has never stopped.",
    imageUrl: "/images/lalibela.png"
  },
  {
    slug: "simien-mountains",
    destinationName: "Simien Mountains",
    description:
      "Jagged basalt pinnacles, escarpments that fall away into cloud, and the largest primate troops you will ever walk beside.",
    imageUrl: "/images/hero-simien.png"
  },
  {
    slug: "danakil-depression",
    destinationName: "Danakil Depression",
    description:
      "One hundred metres below sea level: acid springs the colour of egg yolk, a permanent lava lake, and salt caravans that have not changed in a thousand years.",
    imageUrl: "/images/danakil.png"
  },
  {
    slug: "omo-valley",
    destinationName: "Omo Valley",
    description:
      "The lower Omo is one of the most culturally dense regions on the planet — and one that demands to be travelled slowly, and with permission.",
    imageUrl: "/images/omo-valley.png"
  },
  {
    slug: "gondar",
    destinationName: "Gondar",
    description:
      "A seventeenth-century imperial capital of stone castles and cedar-scented chapels, where Timkat still fills the royal bath each January.",
    imageUrl: "/images/gondar.png"
  },
  {
    slug: "axum",
    destinationName: "Axum",
    description:
      "The seat of a trading empire that minted its own coinage while Rome was still standing, and the spiritual centre of Ethiopian Orthodoxy.",
    imageUrl: "/images/festival-timkat.png"
  },
  {
    slug: "bale-mountains",
    destinationName: "Bale Mountains",
    description:
      "The Sanetti Plateau is the largest expanse of Afro-alpine habitat in Africa, and the best place in the world to see a wild wolf hunt.",
    imageUrl: "/images/bale-gelada.png"
  },
  {
    slug: "lake-tana",
    destinationName: "Lake Tana & Blue Nile",
    description:
      "Ethiopia's largest lake hides thirty-odd monasteries on its islands, several of which have guarded illuminated manuscripts for over half a millennium.",
    imageUrl: "/images/lake-tana.png"
  }
];
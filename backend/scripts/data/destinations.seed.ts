// CLIENT CATALOG — EthioAfroTours frontend/lib/site.ts (destinations array).
// All 20 site destinations, mapped into the backend Destination schema.
// Slugs intentionally match the public routes; established `axum` and
// `lake-tana` URLs are retained even though their display names are broader.
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
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg"
  },
  {
    slug: "addis-ababa",
    destinationName: "Addis Ababa",
    description:
      "Ethiopia's highland capital brings ancient history, living culture and an ambitious contemporary city together at the beginning of almost every journey.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg"
  },
  {
    slug: "simien-mountains",
    destinationName: "Simien Mountains National Park",
    description:
      "Jagged basalt pinnacles, escarpments that fall away into cloud, and the largest primate troops you will ever walk beside.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801433/simien-mountains.jpg"
  },
  {
    slug: "danakil-depression",
    destinationName: "Danakil Depression & Erta Ale",
    description:
      "One hundred metres below sea level: acid springs the colour of egg yolk, a permanent lava lake, and salt caravans that have not changed in a thousand years.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801428/danakil-depression.jpg"
  },
  {
    slug: "omo-valley",
    destinationName: "Omo Valley",
    description:
      "The lower Omo is one of the most culturally dense regions on the planet — and one that demands to be travelled slowly, and with permission.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg"
  },
  {
    slug: "gondar",
    destinationName: "Gondar",
    description:
      "A seventeenth-century imperial capital of stone castles and cedar-scented chapels, where Timkat still fills the royal bath each January.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801385/gondar.jpg"
  },
  {
    slug: "axum",
    destinationName: "Aksum",
    description:
      "The seat of a trading empire that minted its own coinage while Rome was still standing, and the spiritual centre of Ethiopian Orthodoxy.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801243/axum.jpg"
  },
  {
    slug: "lake-tana",
    destinationName: "Bahir Dar, Lake Tana & Blue Nile Falls",
    description:
      "Ethiopia's largest lake hides historic island monasteries, while nearby Blue Nile Falls reveals the seasonal power of the river.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/lake-tana.jpg"
  },
  {
    slug: "bale-mountains",
    destinationName: "Bale Mountains National Park",
    description:
      "The Sanetti Plateau is the largest expanse of Afro-alpine habitat in Africa, and the best place in the world to see a wild Ethiopian wolf hunt.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801477/bale-mountains.png"
  },
  {
    slug: "harar",
    destinationName: "Harar Jugol",
    description:
      "Behind Harar's old gates, historic mosques, vibrant markets and distinctive Harari homes form one of Africa's most remarkable living cities.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801283/harar.jpg"
  },
  {
    slug: "arba-minch",
    destinationName: "Arba Minch",
    description:
      "Arba Minch overlooks Lakes Abaya and Chamo and serves as the natural gateway to the wildlife and cultures of southern Ethiopia.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801292/arba-minch.jpg"
  },
  {
    slug: "konso",
    destinationName: "Konso Cultural Landscape",
    description:
      "Konso's fortified villages, agricultural terraces and communal traditions reveal a cultural landscape refined over centuries.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801355/konso.jpg"
  },
  {
    slug: "sof-omar-cave",
    destinationName: "Sof Omar Cave",
    description:
      "The Web River passes through an immense limestone cave system whose echoing galleries carry geological drama and deep spiritual significance.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801283/sof-omar-cave.jpg"
  },
  {
    slug: "hawassa",
    destinationName: "Hawassa",
    description:
      "Set beside Lake Hawassa, the Sidama capital offers an easy introduction to the Rift Valley through waterfront life and nearby coffee country.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801520/hawassa.jpg"
  },
  {
    slug: "wonchi-crater-lake",
    destinationName: "Wonchi Crater Lake",
    description:
      "West of Addis Ababa, Wonchi's volcanic caldera holds a highland lake, small islands and rural trails for active day and overnight escapes.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801471/wonchi-crater-lake.jpg"
  },
  {
    slug: "dorze",
    destinationName: "Dorze Village",
    description:
      "In the hills above Arba Minch, Dorze communities are known for skilled weaving, bamboo houses and food traditions rooted in enset.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801478/dorze.jpg"
  },
  {
    slug: "tiya",
    destinationName: "Tiya Archaeological Site",
    description:
      "Tiya's field of engraved megaliths marks an important prehistoric burial landscape whose symbols continue to invite interpretation.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801289/tiya.png"
  },
  {
    slug: "debre-libanos",
    destinationName: "Debre Libanos Monastery",
    description:
      "Founded in the thirteenth century, Debre Libanos remains one of Ethiopia's most important monasteries above the dramatic Jemma River Gorge.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801363/debre-libanos.png"
  },
  {
    slug: "dire-dawa",
    destinationName: "Dire Dawa",
    description:
      "Dire Dawa grew around the historic Addis Ababa–Djibouti railway, creating an eastern city shaped by trade, migration and several architectural eras.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801349/dire-dawa.png"
  },
  {
    slug: "adadi-mariam",
    destinationName: "Adadi Mariam Rock-Hewn Church",
    description:
      "Adadi Mariam is a working monolithic church in the countryside south of Addis Ababa, traditionally associated with King Lalibela.",
    imageUrl: "https://res.cloudinary.com/q16lm8mo/image/upload/v1786801355/adadi-mariam.png"
  }
];

// CLIENT CATALOG — EthioAfroTours frontend/lib/site.ts (tours array).
// All 6 site tours, mapped into the backend Tour schema. Prices are parsed
// from the client's `from` strings (e.g. "$6,450 per person" -> 6450);
// childPrice is set equal to adultPrice as a placeholder because the client
// catalog carries a single price. Rating is a 5.0 placeholder and noOfRates
// is 0 — the client never exposes ratings. Overview uses the client's
// `teaser` (it renders as the list description). Itinerary maps the client's
// [{day, title, text}] shape onto the backend's numeric-day shape.
export interface TourSeed {
  slug: string;
  tourName: string;
  destination: string;
  overview: string;
  included: string[];
  excluded: string[];
  itinerary: Array<{ day: number; title: string; activities: string; overnight?: string; meals?: string }>;
  journeyMap: string | null;
  destinationSlugs: string[];
  categorySlugs: string[];
  adultPrice: number;
  childPrice: number;
  rating: number;
  noOfRates: number;
  isFeatured: boolean;
  priceSource: "source" | "demo";
  gallery: string[];
}

// Local place name -> client destination slug. Places that are not part of
// one of the 8 client destinations are dropped (e.g. "Bonga Forest",
// "Addis Ababa"). Regional places are folded into their parent destination
// (Erta Ale/Dallol -> danakil-depression, Turmi/Dorze -> omo-valley).
const PLACE_SLUG_MAP: Record<string, string> = {
  "Lake Tana": "lake-tana",
  Gondar: "gondar",
  "Simien Mountains": "simien-mountains",
  Lalibela: "lalibela",
  Axum: "axum",
  "Bale Mountains": "bale-mountains",
  Mekele: "danakil-depression",
  Dallol: "danakil-depression",
  "Lake Assale": "danakil-depression",
  "Erta Ale": "danakil-depression",
  Dorze: "omo-valley",
  Turmi: "omo-valley",
  Dimeka: "omo-valley",
  "Mursi Highlands": "omo-valley",
  Karo: "omo-valley"
};

function toSeedItinerary(
  itinerary: { day: string; title: string; text: string }[]
): Array<{ day: number; title: string; activities: string }> {
  return itinerary.map((step, index) => ({
    day: index + 1,
    title: step.title,
    activities: step.text
  }));
}

function toDestinationSlugs(places: string[]): string[] {
  const set = new Set<string>();
  for (const place of places) {
    const slug = PLACE_SLUG_MAP[place];
    if (slug) set.add(slug);
  }
  return [...set];
}

export const tourSeeds: TourSeed[] = [
  {
    slug: "the-historic-route",
    tourName: "The Historic Route",
    destination: "Lake Tana",
    overview:
      "Follow the pilgrimage of kings from the castles of Gondar to the rock churches of Lalibela.",
    included: [
      "All domestic flights within Ethiopia",
      "Private 4x4 with a senior driver-guide",
      "Scholar-guides at Lalibela, Axum and Gondar",
      "Boutique lodges and the best available rooms",
      "All breakfasts, most lunches and dinners",
      "24/7 travel designer support line"
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance (mandatory)",
      "Gratuities and personal spending"
    ],
    itinerary: toSeedItinerary([
      {
        day: "Day 1",
        title: "Arrive Addis Ababa",
        text: "Private transfer, a quiet room, and a first dinner of tibs and honey wine with your travel designer."
      },
      {
        day: "Days 2 – 3",
        title: "Bahir Dar & Lake Tana",
        text: "Morning flight north, then a private boat to the island monasteries before the day boats arrive. Tis Issat falls in the afternoon."
      },
      {
        day: "Days 4 – 5",
        title: "Gondar",
        text: "The royal enclosure at opening, the painted ceiling of Debre Berhan Selassie, and Kuskuam at golden hour."
      },
      {
        day: "Days 6 – 7",
        title: "Simien Mountains",
        text: "Two escarpment walks among gelada troops, with a lodge on the rim and a fire lit by the time you return."
      },
      {
        day: "Days 8 – 9",
        title: "Lalibela",
        text: "Dawn liturgy in the northern cluster, the tunnel to Bete Golgotha, and a walk up to Asheton Maryam."
      },
      {
        day: "Day 10",
        title: "Axum",
        text: "Stelae field, the Chapel of the Tablet, and the Queen of Sheba's bath with an archaeologist."
      },
      {
        day: "Day 11",
        title: "Addis & Departure",
        text: "A last coffee ceremony, a day room at the airport hotel, and an evening flight home."
      }
    ]),
    journeyMap: null,
    destinationSlugs: toDestinationSlugs(["Lake Tana", "Gondar", "Simien Mountains", "Lalibela", "Axum"]),
    categorySlugs: ["historical-tours", "cultural-tours", "religious-pilgrimage-tours"],
    adultPrice: 6450,
    childPrice: 6450,
    rating: 5.0,
    noOfRates: 0,
    isFeatured: true,
    priceSource: "source",
    gallery: []
  },
  {
    slug: "highlands-and-wildlife",
    tourName: "Highlands & Wildlife",
    destination: "Simien Mountains",
    overview:
      "Trek the Simien escarpment and track the Ethiopian wolf across the Sanetti Plateau.",
    included: [
      "Domestic flights and private 4x4 transfers",
      "Resident naturalist and endemics specialist",
      "National park fees, scouts and permits",
      "Lodges on the Simien rim and Bale escarpment",
      "Full board on trekking days",
      "Walking poles and daypack loan"
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance (mandatory)",
      "Optional Ras Dashen extension"
    ],
    itinerary: toSeedItinerary([
      {
        day: "Day 1",
        title: "Arrive Addis Ababa",
        text: "Briefing with your naturalist over dinner, kit check, and an early night."
      },
      {
        day: "Days 2 – 4",
        title: "Simien Mountains",
        text: "Three rim walks of increasing length, gelada troops at close quarters, and sunrise from Imet Gogo."
      },
      {
        day: "Day 5",
        title: "Transfer south",
        text: "Flight to Addis, then the Rift Valley road with birding stops at Lake Ziway."
      },
      {
        day: "Days 6 – 8",
        title: "Bale Mountains",
        text: "Wolf tracking at first light on Sanetti, nyala at Dinsho, and a day in the Harenna cloud forest."
      },
      {
        day: "Day 9",
        title: "Addis & Departure",
        text: "Return flight, National Museum with a curator, and an evening departure."
      }
    ]),
    journeyMap: null,
    destinationSlugs: toDestinationSlugs(["Simien Mountains", "Rift Valley Lakes", "Bale Mountains"]),
    categorySlugs: ["trekking-hiking-tours", "wildlife-tours", "nature-tours"],
    adultPrice: 5780,
    childPrice: 5780,
    rating: 5.0,
    noOfRates: 0,
    isFeatured: true,
    priceSource: "source",
    gallery: []
  },
  {
    slug: "sacred-waters-and-coffee",
    tourName: "Sacred Waters & Coffee",
    destination: "Lake Tana",
    overview:
      "Drift to island monasteries, then journey into the forests where coffee was born.",
    included: [
      "Domestic flights and private transfers",
      "Private boat charter on Lake Tana",
      "Farm-to-cup coffee immersion in Kaffa",
      "Two nights in a forest eco-lodge",
      "All breakfasts and dinners",
      "Barista-led cupping session in Addis"
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance (mandatory)",
      "Coffee purchases and shipping"
    ],
    itinerary: toSeedItinerary([
      {
        day: "Day 1",
        title: "Arrive Addis Ababa",
        text: "A cupping session in the roastery district to calibrate the palate."
      },
      {
        day: "Days 2 – 3",
        title: "Lake Tana",
        text: "Private boat to Ura Kidane Mihret at dawn, manuscripts with the monks, and a slow afternoon on the water."
      },
      {
        day: "Days 4 – 6",
        title: "Kaffa & Bonga forest",
        text: "Wild coffee under the canopy, harvest and roast with a farming family, and nights in the forest."
      },
      {
        day: "Day 7",
        title: "Addis & Departure",
        text: "Mercato with a chef, lunch, and an evening flight."
      }
    ]),
    journeyMap: null,
    destinationSlugs: toDestinationSlugs(["Lake Tana", "Kaffa", "Bonga Forest", "Addis Ababa"]),
    categorySlugs: ["cultural-tours", "nature-tours"],
    adultPrice: 4320,
    childPrice: 4320,
    rating: 5.0,
    noOfRates: 0,
    isFeatured: true,
    priceSource: "source",
    gallery: []
  },
  {
    slug: "danakil-expedition",
    tourName: "Danakil Expedition",
    destination: "Danakil Depression",
    overview:
      "Sulphur springs, a permanent lava lake, and salt caravans on the white plain.",
    included: [
      "Afar regional permits and local liaison",
      "Expedition vehicles and support truck",
      "Medic-trained guide and satellite comms",
      "Camp beds, bedding and full catering",
      "Erta Ale overnight ascent with porters",
      "Unlimited chilled water throughout"
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance with evacuation cover",
      "Sleeping bag hire"
    ],
    itinerary: toSeedItinerary([
      {
        day: "Day 1",
        title: "Arrive Addis Ababa",
        text: "Expedition briefing, kit issue and an early dinner."
      },
      {
        day: "Day 2",
        title: "Mekele to Hamed Ela",
        text: "Flight north, then the descent into the Afar depression as the temperature climbs."
      },
      {
        day: "Day 3",
        title: "Dallol & Lake Assale",
        text: "Sulphur terraces at first light, salt caravans in the afternoon, camp on the plain."
      },
      {
        day: "Day 4",
        title: "Erta Ale",
        text: "Night ascent to the caldera rim and the lava lake, sleeping on the volcano."
      },
      {
        day: "Day 5",
        title: "Return to Mekele",
        text: "Long drive out, hot shower, cold beer, and a proper bed."
      },
      {
        day: "Day 6",
        title: "Addis & Departure",
        text: "Morning flight and a day room before an evening departure."
      }
    ]),
    journeyMap: null,
    destinationSlugs: toDestinationSlugs(["Mekele", "Dallol", "Lake Assale", "Erta Ale"]),
    categorySlugs: ["nature-adventure-tours", "nature-geological-tours"],
    adultPrice: 5150,
    childPrice: 5150,
    rating: 5.0,
    noOfRates: 0,
    isFeatured: true,
    priceSource: "source",
    gallery: []
  },
  {
    slug: "omo-valley-immersion",
    tourName: "Omo Valley Immersion",
    destination: "Omo Valley",
    overview:
      "Market days, ceremony and conversation in the most culturally diverse valley on earth.",
    included: [
      "Private 4x4 and senior driver-guide",
      "Resident cultural mediator and translator",
      "Community fees paid transparently at village level",
      "Riverside tented camps and the best area lodges",
      "Full board throughout the south",
      "Photography guidance and consent protocol"
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance (mandatory)",
      "Personal gifts and purchases"
    ],
    itinerary: toSeedItinerary([
      {
        day: "Day 1",
        title: "Arrive Addis Ababa",
        text: "Context evening with an anthropologist from Addis Ababa University."
      },
      {
        day: "Days 2 – 3",
        title: "Rift Valley south",
        text: "Lakes, hot springs and the Dorze highlands with a weaving family."
      },
      {
        day: "Days 4 – 7",
        title: "Turmi, Dimeka & the Hamar",
        text: "Market days, an invited bull-jumping ceremony if the season allows, and long evenings by the river."
      },
      {
        day: "Days 8 – 9",
        title: "Mursi highlands & Karo",
        text: "A slow two days with a resident anthropologist, and the Omo escarpment at dusk."
      },
      {
        day: "Day 10",
        title: "Addis & Departure",
        text: "Flight north, a farewell lunch, and an evening departure."
      }
    ]),
    journeyMap: null,
    destinationSlugs: toDestinationSlugs(["Dorze", "Turmi", "Dimeka", "Mursi Highlands", "Karo"]),
    categorySlugs: ["cultural-tours", "omo-valley-tours"],
    adultPrice: 6980,
    childPrice: 6980,
    rating: 5.0,
    noOfRates: 0,
    isFeatured: true,
    priceSource: "source",
    gallery: []
  },
  {
    slug: "timkat-festival-journey",
    tourName: "Timkat Festival Journey",
    destination: "Gondar",
    overview:
      "Ethiopia's Epiphany — processions, white robes and the flooding of the royal bath.",
    included: [
      "Reserved viewing positions at Fasilides' Bath",
      "Domestic flights and private transfers",
      "Rooms held twelve months in advance",
      "Orthodox scholar as festival guide",
      "All breakfasts and festival-day catering",
      "Processional photography guidance"
    ],
    excluded: [
      "International flights and visa fees",
      "Travel insurance (mandatory)",
      "Gratuities"
    ],
    itinerary: toSeedItinerary([
      {
        day: "Days 1 – 2",
        title: "Addis Ababa",
        text: "Arrival, Holy Trinity Cathedral, and a briefing on the liturgical calendar."
      },
      {
        day: "Days 3 – 5",
        title: "Gondar for Timkat",
        text: "Ketera eve procession, the night vigil, and the flooding of the bath at dawn."
      },
      {
        day: "Days 6 – 7",
        title: "Lalibela",
        text: "The rock churches in festival season, with the northern cluster before sunrise."
      },
      {
        day: "Day 8",
        title: "Departure",
        text: "Return flight to Addis and an evening departure."
      }
    ]),
    journeyMap: null,
    destinationSlugs: toDestinationSlugs(["Addis Ababa", "Gondar", "Lalibela"]),
    categorySlugs: ["festival-tours", "religious-pilgrimage-tours", "historical-tours"],
    adultPrice: 5940,
    childPrice: 5940,
    rating: 5.0,
    noOfRates: 0,
    isFeatured: true,
    priceSource: "source",
    gallery: []
  }
];
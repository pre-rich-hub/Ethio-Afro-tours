export interface LayoverPackageSeed {
  slug: string;
  hours: string;
  minimumConnection: string;
  packageType: "layover" | "stopover";
  title: string;
  price: string;
  teaser: string;
  itinerary: string[];
  includes: string[];
  excludes: string[];
  bestFor: string;
  sortOrder: number;
  imageUrl: string | null;
}

const sharedIncludes = [
  "Airport pickup and return transfer",
  "Private vehicle and English-speaking guide",
  "Itinerary planning around confirmed flight times"
];

const sharedExcludes = [
  "Ethiopian visa and travel insurance",
  "Personal purchases, tips and unlisted services",
  "Meals and entrance fees unless confirmed in your quote"
];

export const layoverPackageSeeds: LayoverPackageSeed[] = [
  {
    slug: "addis-highlights-layover",
    hours: "About 4 hours",
    minimumConnection: "8–10 hours",
    packageType: "layover",
    title: "Addis Highlights Layover",
    price: "Custom quote",
    teaser: "A carefully timed introduction to Addis Ababa with a highland viewpoint, city landmarks and Ethiopian coffee.",
    itinerary: [
      "Meet after immigration and confirm the return schedule",
      "Drive to Entoto for a city panorama when conditions allow",
      "Follow a flexible landmark loop through central Addis Ababa",
      "Pause for an Ethiopian coffee experience",
      "Return to Bole with the agreed international check-in buffer"
    ],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    bestFor: "First-time visitors with a daytime connection",
    sortOrder: 1,
    imageUrl: null
  },
  {
    slug: "addis-culture-and-coffee",
    hours: "About 5–6 hours",
    minimumConnection: "10–12 hours",
    packageType: "layover",
    title: "Addis Culture & Coffee",
    price: "Custom quote",
    teaser: "A deeper look at the capital through a museum or cultural site, local craft traditions, lunch and coffee.",
    itinerary: [
      "Meet at Bole and review traffic and opening hours",
      "Visit the National Museum or the best available cultural alternative",
      "Explore a craft, textile or historic quarter with your guide",
      "Enjoy a traditional Ethiopian meal",
      "Finish with coffee before the timed airport return"
    ],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    bestFor: "Travellers who want culture, history and food in one visit",
    sortOrder: 2,
    imageUrl: null
  },
  {
    slug: "full-day-addis-experience",
    hours: "About 8–9 hours",
    minimumConnection: "14–18 hours",
    packageType: "layover",
    title: "Full-Day Addis Experience",
    price: "Custom quote",
    teaser: "A flexible full day combining Addis Ababa’s viewpoints, heritage, neighbourhoods, cuisine and coffee culture.",
    itinerary: [
      "Airport welcome and a route check based on the day’s conditions",
      "Begin at Entoto or another panoramic city viewpoint",
      "Visit selected museums, monuments or places of worship that are open",
      "Explore a market or artisan district with your private guide",
      "Take time for lunch and an Ethiopian coffee ceremony",
      "Optional day-room stop when requested and available",
      "Return to Bole with the agreed check-in buffer"
    ],
    includes: sharedIncludes,
    excludes: [...sharedExcludes, "Hotel day room unless included in the confirmed quote"],
    bestFor: "Long daytime connections with room for a relaxed city visit",
    sortOrder: 3,
    imageUrl: null
  },
  {
    slug: "addis-evening-experience",
    hours: "About 4–5 hours",
    minimumConnection: "8–12 hours",
    packageType: "layover",
    title: "Addis Evening Experience",
    price: "Custom quote",
    teaser: "An after-hours alternative built around Ethiopian food, coffee, music and Addis Ababa after dark.",
    itinerary: [
      "Meet after immigration and confirm the evening schedule",
      "Take a short illuminated city drive or viewpoint stop",
      "Enjoy an Ethiopian dinner selected for your preferences",
      "Experience coffee and an optional cultural performance when available",
      "Return to Bole with the agreed check-in buffer"
    ],
    includes: sharedIncludes,
    excludes: sharedExcludes,
    bestFor: "Evening arrivals when museums and daytime attractions are closed",
    sortOrder: 4,
    imageUrl: null
  },
  {
    slug: "overnight-addis-and-highlands",
    hours: "One night",
    minimumConnection: "24–36 hours",
    packageType: "layover",
    title: "Overnight Addis & Highlands",
    price: "Custom quote",
    teaser: "Rest overnight, then explore Addis or make a carefully timed highland excursion before returning to Bole.",
    itinerary: [
      "Airport welcome and private hotel transfer",
      "Dinner or rest according to your arrival time",
      "Choose an Addis morning or a highland excursion after a route and weather check",
      "Lunch and a flexible final stop",
      "Return to Bole with the agreed international departure buffer"
    ],
    includes: sharedIncludes,
    excludes: [...sharedExcludes, "Accommodation unless included in the confirmed quote"],
    bestFor: "Overnight connections that allow a hotel stay and a flexible second day",
    sortOrder: 5,
    imageUrl: null
  },
  {
    slug: "lalibela-stopover-extension",
    hours: "Two nights",
    minimumConnection: "60–72 hours minimum",
    packageType: "stopover",
    title: "Lalibela Stopover Extension",
    price: "Custom quote",
    teaser: "Turn a multi-day stopover into a privately guided visit to Lalibela, subject to domestic schedules and a safe onward-flight buffer.",
    itinerary: [
      "Arrive in Addis and review the confirmed domestic-flight plan",
      "Fly to Lalibela and meet your local guide",
      "Explore the rock-hewn church groups around opening and service times",
      "Stay overnight in Lalibela and continue the visit the next morning",
      "Fly back to Addis with a pre-agreed buffer before the onward journey"
    ],
    includes: sharedIncludes,
    excludes: [
      ...sharedExcludes,
      "Domestic flights and accommodation unless included in the confirmed quote"
    ],
    bestFor: "Planned stopovers of at least 60–72 hours with flexible onward travel",
    sortOrder: 6,
    imageUrl: null
  }
];

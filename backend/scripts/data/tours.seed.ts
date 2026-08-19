// CLIENT CATALOG — mirrors the 20 popularity-ordered tours in frontend/lib/site.ts.
// Public pricing is quote-only until the client supplies confirmed rates.
export interface TourSeed {
  slug: string;
  tourName: string;
  destination: string;
  overview: string;
  included: string[];
  excluded: string[];
  itinerary: Array<{ day: number; title: string; activities: string }>;
  journeyMap: string | null;
  destinationSlugs: string[];
  categorySlugs: string[];
  adultPrice: number;
  childPrice: number;
  rating: number;
  noOfRates: number;
  isFeatured: boolean;
  priceSource: "quote";
  gallery: string[];
  legacyGallery: string[];
}

const PLACE_SLUG_MAP: Record<string, string> = {
  "Addis Ababa": "addis-ababa",
  "Bahir Dar": "lake-tana",
  "Lake Tana": "lake-tana",
  Gondar: "gondar",
  "Simien Mountains National Park": "simien-mountains",
  Lalibela: "lalibela",
  Aksum: "axum",
  "Danakil Depression": "danakil-depression",
  Dallol: "danakil-depression",
  "Lake Assale": "danakil-depression",
  "Erta Ale": "danakil-depression",
  "Bale Mountains National Park": "bale-mountains",
  "Sof Omar Cave": "sof-omar-cave",
  Hawassa: "hawassa",
  "Arba Minch": "arba-minch",
  Dorze: "dorze",
  Konso: "konso",
  "Omo Valley": "omo-valley",
  "Dire Dawa": "dire-dawa",
  "Harar Jugol": "harar",
  "Debre Libanos Monastery": "debre-libanos",
  "Wonchi Crater Lake": "wonchi-crater-lake",
  "Tiya Archaeological Site": "tiya",
  "Adadi Mariam Rock-Hewn Church": "adadi-mariam",
  "Gheralta Mountains": "gheralta-mountains",
  "Awash National Park": "awash-national-park",
  "Lake Langano": "lake-langano",
  "Gedeo Cultural Landscape": "gedeo-cultural-landscape",
  "Kafa Biosphere Reserve": "kafa-biosphere-reserve",
  Kaffa: "kafa-biosphere-reserve"
};

type SeedInput = {
  slug: string;
  name: string;
  overview: string;
  places: string[];
  categorySlugs: string[];
  featured?: boolean;
  image?: string;
  legacyImage?: string;
  itinerary: Array<[string, string]>;
};

const standardIncluded = [
  "Private ground transport and airport transfers",
  "Accommodation in the best available category",
  "Specialist local guides and listed entrance fees",
  "Daily breakfast and 24/7 in-country support"
];

const standardExcluded = [
  "International flights and visa fees",
  "Travel insurance (mandatory)",
  "Gratuities and personal expenses"
];

function makeTour(input: SeedInput): TourSeed {
  const destinationSlugs = [...new Set(
    input.places.map((place) => PLACE_SLUG_MAP[place]).filter(Boolean)
  )];

  return {
    slug: input.slug,
    tourName: input.name,
    destination: input.places[0] ?? "Addis Ababa",
    overview: input.overview,
    included: standardIncluded,
    excluded: standardExcluded,
    itinerary: input.itinerary.map(([title, activities], index) => ({
      day: index + 1,
      title,
      activities
    })),
    journeyMap: null,
    destinationSlugs,
    categorySlugs: input.categorySlugs,
    adultPrice: 0,
    childPrice: 0,
    rating: 5,
    noOfRates: 0,
    isFeatured: Boolean(input.featured),
    priceSource: "quote",
    gallery: input.image ? [input.image] : [],
    legacyGallery: input.legacyImage ? [input.legacyImage] : []
  };
}

export const tourSeeds: TourSeed[] = [
  makeTour({
    slug: "the-historic-route",
    name: "Classic Historic North",
    overview: "The definitive northern circuit of island monasteries, imperial castles, mountain escarpments and living rock-hewn churches.",
    places: ["Addis Ababa", "Bahir Dar", "Lake Tana", "Gondar", "Simien Mountains National Park", "Lalibela", "Aksum"],
    categorySlugs: ["historical-tours", "religious-pilgrimage-tours", "cultural-tours"],
    featured: true,
    itinerary: [
      ["Addis Ababa", "Arrive, meet the guide and explore the capital."],
      ["Bahir Dar & Lake Tana", "Visit island monasteries and the Blue Nile Falls."],
      ["Gondar", "Explore Fasil Ghebbi, royal baths and painted churches."],
      ["Simien Mountains", "Walk the escarpment among geladas and highland scenery."],
      ["Lalibela", "Experience the rock-hewn churches around the morning liturgy."],
      ["Aksum", "Discover the stelae, tombs and sacred traditions when access permits."]
    ]
  }),
  makeTour({
    slug: "omo-valley-immersion",
    name: "Omo Valley Cultural Discovery",
    overview: "A carefully mediated southern journey built around market days, local invitations and respectful cultural encounters.",
    places: ["Addis Ababa", "Hawassa", "Arba Minch", "Dorze", "Konso", "Omo Valley"],
    categorySlugs: ["cultural-tours", "nature-adventure-tours", "omo-valley-tours"],
    featured: true,
    itinerary: [
      ["Addis Ababa", "Meet the cultural guide and review the southern route."],
      ["Hawassa", "Travel through the Rift Valley for lake life and Sidama coffee."],
      ["Arba Minch & Dorze", "Explore Lake Chamo and the Dorze highlands."],
      ["Konso", "Visit the terraced cultural landscape with a local guide."],
      ["Lower Omo", "Build several days around markets and locally arranged community visits."],
      ["Return to Addis", "Fly north for onward travel."]
    ]
  }),
  makeTour({
    slug: "danakil-expedition",
    name: "Danakil Depression & Erta Ale Expedition",
    overview: "A supported expedition into salt flats, geothermal fields and the volcanic landscapes of the Afar lowlands.",
    places: ["Danakil Depression", "Dallol", "Lake Assale", "Erta Ale"],
    categorySlugs: ["nature-adventure-tours", "nature-tours"],
    featured: true,
    itinerary: [
      ["Enter the Afar lowlands", "Meet the expedition team at the confirmed seasonal gateway."],
      ["Dallol & Lake Assale", "Visit mineral terraces, salt flats and caravan routes."],
      ["Erta Ale", "Approach the caldera with local support and camp near the volcano."],
      ["Return from the desert", "Break camp and return to the operational gateway."]
    ]
  }),
  makeTour({
    slug: "bale-mountains-and-sof-omar",
    name: "Bale Mountains & Sof Omar Adventure",
    overview: "Ethiopian-wolf country, Harenna cloud forest and the limestone chambers of Sof Omar in one southeastern adventure.",
    places: ["Addis Ababa", "Bale Mountains National Park", "Sof Omar Cave"],
    categorySlugs: ["nature-tours", "trekking-hiking-tours", "nature-adventure-tours"],
    featured: true,
    itinerary: [
      ["Addis to Dinsho", "Drive into the Bale highlands and look for mountain nyala."],
      ["Sanetti Plateau", "Track endemic wildlife with a specialist guide."],
      ["Harenna Forest", "Descend into cloud forest and wild-coffee habitat."],
      ["Sof Omar Cave", "Follow the Web River through the limestone cave system."],
      ["Bale highlands", "Choose a final wildlife walk or cultural visit."],
      ["Return to Addis", "Travel back to the capital."]
    ]
  }),
  makeTour({
    slug: "simien-mountains-trek",
    name: "Simien Mountains Trek",
    overview: "A focused trek along the Simien escarpment among geladas, waterfalls and immense highland views.",
    places: ["Gondar", "Simien Mountains National Park"],
    categorySlugs: ["trekking-hiking-tours", "nature-tours", "nature-adventure-tours"],
    featured: true,
    itinerary: [
      ["Gondar", "Meet the guide and prepare for the trek."],
      ["Sankaber", "Enter the park for a first escarpment walk."],
      ["Geech", "Walk through highland grassland and giant-lobelia country."],
      ["Imet Gogo", "Reach the great viewpoints on a full trekking day."],
      ["Return to Gondar", "Complete a final walk and drive back."]
    ]
  }),
  makeTour({
    slug: "lalibela-sacred-journey",
    name: "Lalibela Sacred Journey",
    overview: "Four unhurried days of rock-hewn churches, living liturgy and mountain monasteries.",
    places: ["Addis Ababa", "Lalibela"],
    categorySlugs: ["historical-tours", "religious-pilgrimage-tours", "cultural-tours"],
    itinerary: [
      ["Addis to Lalibela", "Fly north and settle into the Lasta highlands."],
      ["Northern churches", "Explore Bete Medhane Alem and Bete Maryam around the liturgy."],
      ["Southern churches", "Continue through the southern cluster and a mountain monastery."],
      ["Return to Addis", "Fly back to the capital."]
    ]
  }),
  makeTour({
    slug: "grand-ethiopia-highlights",
    name: "Grand Ethiopia Highlights",
    overview: "The historic north, eastern cities, southern cultures and highland wildlife in one grand journey.",
    places: ["Addis Ababa", "Bahir Dar", "Lake Tana", "Gondar", "Simien Mountains National Park", "Lalibela", "Dire Dawa", "Harar Jugol", "Bale Mountains National Park", "Arba Minch", "Dorze", "Konso", "Omo Valley"],
    categorySlugs: ["ethiopia-holiday-packages", "cultural-tours", "nature-tours", "nature-adventure-tours"],
    featured: true,
    itinerary: [
      ["Addis Ababa", "Museums, food and a route briefing."],
      ["Historic North", "Lake Tana, Gondar, the Simiens and Lalibela."],
      ["Harar & Dire Dawa", "Railway heritage, Harari homes and old-city markets."],
      ["Bale Mountains", "Sanetti wildlife and Harenna Forest."],
      ["Southern cultures", "Arba Minch, Dorze, Konso and selected Omo communities."],
      ["Addis & departure", "Return to the capital for onward travel."]
    ]
  }),
  makeTour({
    slug: "historic-north-and-danakil",
    name: "Historic North & Danakil Adventure",
    overview: "Island monasteries and ancient capitals followed by salt flats, geothermal fields and Erta Ale.",
    places: ["Addis Ababa", "Bahir Dar", "Lake Tana", "Gondar", "Simien Mountains National Park", "Lalibela", "Aksum", "Danakil Depression", "Erta Ale"],
    categorySlugs: ["historical-tours", "religious-pilgrimage-tours", "nature-adventure-tours"],
    itinerary: [
      ["Addis Ababa", "Arrival and expedition briefing."],
      ["Historic circuit", "Travel through Bahir Dar, Gondar, the Simiens and Lalibela."],
      ["Aksum", "Explore the ancient capital when access permits."],
      ["Danakil Depression", "Visit Dallol, salt flats and Erta Ale with expedition support."],
      ["Return to Addis", "Connect from the confirmed gateway to the capital."]
    ]
  }),
  makeTour({
    slug: "historic-north-and-omo-valley",
    name: "Historic North & Omo Valley",
    overview: "A sweeping cultural route from northern kingdoms to the communities and landscapes of southern Ethiopia.",
    places: ["Addis Ababa", "Bahir Dar", "Lake Tana", "Gondar", "Lalibela", "Hawassa", "Arba Minch", "Dorze", "Konso", "Omo Valley"],
    categorySlugs: ["ethiopia-holiday-packages", "historical-tours", "cultural-tours"],
    itinerary: [
      ["Addis Ababa", "Arrival and cultural orientation."],
      ["Historic North", "Lake Tana, Gondar and Lalibela."],
      ["Rift Valley", "Continue through Hawassa to Arba Minch and Dorze."],
      ["Konso & Omo", "Explore terraced landscapes and arranged community visits."],
      ["Return to Addis", "Fly north for onward travel."]
    ]
  }),
  makeTour({
    slug: "harar-and-dire-dawa",
    name: "Harar & Dire Dawa Cultural Journey",
    overview: "Railway heritage, Harari homes, old-city lanes and the trading cultures of eastern Ethiopia.",
    places: ["Addis Ababa", "Dire Dawa", "Harar Jugol"],
    categorySlugs: ["cultural-tours", "historical-tours", "religious-pilgrimage-tours"],
    itinerary: [
      ["Addis to Dire Dawa", "Explore the railway quarter and Kafira market."],
      ["Harar Jugol", "Walk the old gates, markets and traditional homes."],
      ["Harar & Aweday", "Meet artisans and visit the regional market."],
      ["Return to Addis", "Connect from Dire Dawa."]
    ]
  }),
  makeTour({
    slug: "rift-valley-southern-highlands",
    name: "Rift Valley Lakes & Southern Highlands",
    overview: "Lakeside cities, highland villages and southern landscapes at a comfortable pace.",
    places: ["Addis Ababa", "Hawassa", "Arba Minch", "Dorze", "Konso"],
    categorySlugs: ["nature-tours", "cultural-tours"],
    itinerary: [
      ["Addis to Hawassa", "Travel through the Rift Valley."],
      ["Hawassa", "Birding, lake life and Sidama coffee."],
      ["Arba Minch", "Explore Lake Chamo and Nech Sar landscapes."],
      ["Dorze", "Visit the highlands with a local host."],
      ["Konso", "Discover the terraced cultural landscape."],
      ["Southern highlands", "A flexible nature and culture day."],
      ["Return to Addis", "Fly or drive north."]
    ]
  }),
  makeTour({
    slug: "ethiopia-coffee-origins",
    name: "Ethiopia Coffee Origins Journey",
    overview: "Follow coffee from Addis roasteries to the farms and forests of Jimma, Kaffa and Sidama.",
    places: ["Addis Ababa", "Kaffa", "Hawassa"],
    categorySlugs: ["cultural-tours", "nature-tours"],
    itinerary: [
      ["Addis coffee culture", "Begin with a guided cupping."],
      ["Jimma", "Visit farms, washing stations and local roasters."],
      ["Kaffa", "Walk wild-coffee forests around Bonga."],
      ["Farm hospitality", "Join a hosted harvest or preparation experience."],
      ["Sidama", "Continue to southern coffee country."],
      ["Hawassa", "Rest by the lake and meet local producers."],
      ["Return to Addis", "Close with a final tasting."]
    ]
  }),
  makeTour({
    slug: "addis-ababa-central-highlands",
    name: "Addis Ababa & Central Highlands",
    overview: "The capital, sacred highlands, a crater lake and archaeology within one compact route.",
    places: ["Addis Ababa", "Debre Libanos Monastery", "Wonchi Crater Lake", "Tiya Archaeological Site", "Adadi Mariam Rock-Hewn Church"],
    categorySlugs: ["cultural-tours", "historical-tours", "religious-pilgrimage-tours", "nature-tours"],
    itinerary: [
      ["Addis Ababa", "Museums, Entoto and a welcome coffee ceremony."],
      ["Debre Libanos", "Monastery, Portuguese Bridge and the Jemma Gorge."],
      ["Wonchi", "Descend into the crater and cross to the island monastery."],
      ["Tiya & Adadi Mariam", "Combine megalithic stelae with the rock-hewn church."],
      ["Addis & departure", "Choose markets or galleries before the airport transfer."]
    ]
  }),
  makeTour({
    slug: "timkat-festival-journey",
    name: "Timkat Festival Journey",
    overview: "Ethiopia's Epiphany through processions, vigils and the flooding of the royal bath.",
    places: ["Addis Ababa", "Gondar", "Lalibela"],
    categorySlugs: ["festival-tours", "historical-tours", "religious-pilgrimage-tours"],
    itinerary: [
      ["Addis Ababa", "Arrival and festival orientation."],
      ["Gondar", "Experience Ketera, the vigil and Timkat morning."],
      ["Lalibela", "Continue to the rock-hewn churches in festival season."],
      ["Return to Addis", "Fly back for onward travel."]
    ]
  }),
  makeTour({
    slug: "genna-in-lalibela",
    name: "Genna in Lalibela",
    overview: "Ethiopian Christmas among candlelit processions and white-robed pilgrims in Lalibela.",
    places: ["Addis Ababa", "Lalibela"],
    categorySlugs: ["festival-tours", "historical-tours", "religious-pilgrimage-tours"],
    itinerary: [
      ["Arrive Lalibela", "Fly from Addis and review the festival calendar."],
      ["Rock-hewn churches", "Explore the clusters before the main ceremonies."],
      ["Genna vigil", "Follow the processions with a scholar-guide."],
      ["Christmas morning", "Experience the celebrations before returning to Addis."]
    ]
  }),
  makeTour({
    slug: "gheralta-rock-churches-and-aksum",
    name: "Gheralta Rock Churches & Aksum",
    overview: "A specialist northern journey balancing Gheralta's rock-hewn churches and sandstone trails with the archaeology and sacred history of Aksum.",
    places: ["Addis Ababa", "Gheralta Mountains", "Aksum"],
    categorySlugs: ["historical-tours", "religious-pilgrimage-tours", "trekking-hiking-tours", "cultural-tours"],
    image: "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156491/gheralta-mountains.jpg",
    legacyImage: "/images/tours/gheralta-rock-churches-and-aksum.png",
    itinerary: [
      ["Addis to the Tigray highlands", "Fly on the confirmed route, meet the regional team and continue to the Gheralta base."],
      ["Wukro church circuit", "Begin with accessible rock churches and the historical context of the wider sacred landscape."],
      ["Maryam Korkor ridge", "Climb with local guides to the plateau churches and wide views over the Gheralta plains."],
      ["Gheralta at your level", "Choose a demanding cliff sanctuary or a lower circuit matched to confidence and conditions."],
      ["Yeha and Aksum", "Travel through the northern highlands for Yeha before reaching Aksum."],
      ["Aksum and return", "Explore the stelae, tombs and sacred traditions before the confirmed onward connection."]
    ]
  }),
  makeTour({
    slug: "awash-and-harar-eastern-ethiopia",
    name: "Awash & Harar Eastern Ethiopia",
    overview: "A complete eastern route pairing early wildlife drives in Awash National Park with the markets, homes and Islamic heritage of Harar Jugol.",
    places: ["Addis Ababa", "Awash National Park", "Dire Dawa", "Harar Jugol"],
    categorySlugs: ["nature-tours", "cultural-tours", "nature-adventure-tours"],
    image: "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156513/awash-national-park.png",
    legacyImage: "/images/tours/awash-and-harar-eastern-ethiopia.png",
    itinerary: [
      ["Addis to Awash", "Drive east through the Rift Valley and enter the park for a late-afternoon wildlife circuit."],
      ["Awash National Park", "Use the cool hours for the plains, river gorge, falls and bird-rich woodland."],
      ["Awash to Dire Dawa", "Continue east through changing dryland landscapes to the historic railway city."],
      ["Harar Jugol", "Walk the gates, markets, traditional homes and sacred lanes with a resident guide."],
      ["Harar and Aweday", "Meet artisans, explore the regional market and leave room for unhurried old-city life."],
      ["Dire Dawa to Addis", "Take the confirmed flight or rail connection to Addis Ababa."]
    ]
  }),
  makeTour({
    slug: "rift-valley-lakes-and-langano",
    name: "Rift Valley Lakes & Langano Escape",
    overview: "A comfortable Rift Valley journey designed around birding, changing lake landscapes and time to enjoy the shore rather than rush south.",
    places: ["Addis Ababa", "Lake Langano", "Hawassa"],
    categorySlugs: ["nature-tours", "cultural-tours"],
    image: "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156508/lake-langano.png",
    legacyImage: "/images/tours/rift-valley-lakes-and-langano.png",
    itinerary: [
      ["Addis to Lake Ziway", "Travel south for wetland birding and a locally arranged lake or island visit."],
      ["Abijatta-Shalla and Langano", "Read the volcanic lake system with a naturalist before settling beside Langano."],
      ["Lake Langano", "Choose woodland birding, swimming, kayaking or an unhurried lakeside day."],
      ["Langano to Hawassa", "Continue south for Lake Hawassa's birdlife, fish-market culture and waterfront rhythm."],
      ["Return to Addis", "Use the morning by the lake before the confirmed return to the capital."]
    ]
  }),
  makeTour({
    slug: "gedeo-living-landscape",
    name: "Gedeo Living Landscape & Yirgacheffe",
    overview: "A community-led southern highlands journey focused on how Gedeo knowledge brings coffee, enset, forest and cultural heritage into one living landscape.",
    places: ["Addis Ababa", "Hawassa", "Gedeo Cultural Landscape"],
    categorySlugs: ["cultural-tours", "nature-tours"],
    image: "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156514/gedeo-cultural-landscape.png",
    legacyImage: "/images/tours/gedeo-living-landscape.png",
    itinerary: [
      ["Addis to Hawassa", "Travel into the Rift Valley and settle beside Lake Hawassa."],
      ["Sidama highlands", "Begin with coffee landscapes and hosted context before continuing toward Gedeo country."],
      ["Yirgacheffe at origin", "Walk a coffee-growing landscape and explore preparation, processing and hospitality."],
      ["Gedeo agroforestry", "Read the layered enset-and-coffee system with community guides and farmers."],
      ["Sacred forest and megaliths", "Approach cultural sites with locally agreed access and interpretation."],
      ["Return to Addis", "Drive or connect north according to the final operating schedule."]
    ]
  }),
  makeTour({
    slug: "kafa-forest-trekking-and-birding",
    name: "Kafa Forest Trekking & Birding",
    overview: "An ecology-led southwest journey using Bonga as a base for forest trekking, patient birding and community conservation encounters.",
    places: ["Addis Ababa", "Kafa Biosphere Reserve"],
    categorySlugs: ["nature-tours", "trekking-hiking-tours", "nature-adventure-tours"],
    image: "https://res.cloudinary.com/q16lm8mo/image/upload/v1787156488/kafa-biosphere-reserve.jpg",
    legacyImage: "/images/tours/kafa-forest-trekking-and-birding.png",
    itinerary: [
      ["Addis to Jimma", "Fly or drive southwest and meet the naturalist team for a route briefing."],
      ["Jimma to Bonga", "Continue into wetter highlands with roadside birding and landscape stops."],
      ["Wild-coffee forest", "Walk beneath the canopy to understand wild Arabica, forest structure and conservation."],
      ["Kafa birding day", "Use the quiet morning and late afternoon for southwest specialties."],
      ["Waterfalls and community forest", "Combine a longer forest trail with locally hosted conservation context."],
      ["Bonga to Jimma", "Return gradually with flexible wetland, forest-edge and cultural stops."],
      ["Return to Addis", "Take the confirmed connection back to the capital for onward travel."]
    ]
  })
];

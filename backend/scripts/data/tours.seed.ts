// CURATED SUBSET FROM /Ethio-origins-tour/frontend/features/tours/data/tours.ts
// 10 of 15 client tours, picked for the demo catalog. Fields mapped into the
// backend Tour schema. Records with priceSource "demo" had 0/0 prices in the
// source document; a plausible demo price was assigned (see seed.ts import +
// the tour section in scripts/seed.ts for how prices/categories/destinations
// are matched into this backend's schema).
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

export const tourSeeds: TourSeed[] = [
  {
    "slug": "1-day-debre-libanos-portuguese-bridge-tour",
    "tourName": "1-Day Debre Libanos Monastery & Portuguese Bridge Excursion",
    "destination": "Debre Libanos",
    "overview": "Escape the bustle of Addis Ababa and discover one of Ethiopia's most important religious and natural destinations on a full-day excursion to Debre Libanos Monastery and the historic Portuguese Bridge. Founded in the 13th century by Saint Tekle Haymanot, Debre Libanos remains a revered Ethiopian Orthodox pilgrimage and learning center, while the nearby Jemma River Gorge offers canyon views, waterfall viewpoints, Gelada Baboons, birds of prey and endemic Ethiopian birdlife.",
    "included": [
      "Private round-trip transportation from Addis Ababa",
      "Professional English-speaking guide",
      "All entrance fees and site visits",
      "Visit to Debre Libanos Monastery",
      "Visit to Portuguese Bridge",
      "Bottled drinking water",
      "Fuel and driver expenses",
      "Government taxes and service charges"
    ],
    "excluded": [
      "Accommodation before and after the tour",
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic and additional beverages"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa - Debre Libanos - Portuguese Bridge - Addis Ababa",
        "activities": "After breakfast, depart Addis Ababa and drive north through the Ethiopian Highlands, passing rolling hills, traditional villages, eucalyptus forests and rural life. Visit Debre Libanos Monastery, founded by Saint Tekle Haymanot in the 13th century, and explore the monastery museum, ancient religious manuscripts, sacred crosses, church treasures, beautiful church architecture and Ethiopian Orthodox heritage. Continue to the Portuguese Bridge for Jemma River Gorge canyon views, scenic walking trails, the waterfall viewpoint and wildlife observation. Look for Gelada Baboons, Verreaux's Eagles, Lammergeiers and endemic Ethiopian birds, then have lunch near the gorge before returning to Addis Ababa in the late afternoon.",
        "overnight": "Not included - full-day excursion from Addis Ababa"
      }
    ],
    "journeyMap": "Addis Ababa - Ethiopian Highlands - Debre Libanos Monastery - Portuguese Bridge - Jemma River Gorge - Waterfall Viewpoint - Addis Ababa",
    "destinationSlugs": [
      "addis-ababa",
      "debre-libanos-monastery",
      "portuguese-bridge",
      "jemma-river-gorge"
    ],
    "categorySlugs": [
      "day-tours",
      "historical-tours",
      "religious-pilgrimage-tours",
      "cultural-tours",
      "nature-tours",
      "wildlife-tours",
      "photography-tours"
    ],
    "adultPrice": 180,
    "childPrice": 120,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782305234/Debre_Libanos_anvjli.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782305237/Portuguese_bridge_in_Ethiopia_lcrpjy.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782305237/Debre_Libanos_Monastery_and_Jemma_River_Gorge_-_Day_Tour_from_Addis_Ababa_k1s5qw.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782244137/adiss_ababa_Ethiopia_wj8emk.jpg"
    ]
  },
  {
    "slug": "addis-ababa-full-day-city-tour",
    "tourName": "Addis Ababa Full-Day City Tour",
    "destination": "Addis Ababa",
    "overview": "Discover the vibrant capital of Ethiopia on a comprehensive full-day tour of Addis Ababa, where ancient traditions blend with modern African life. Founded by Emperor Menelik II in 1886, the city is Ethiopia's political, cultural and diplomatic center, and this private tour introduces its museums, historic churches, bustling markets, panoramic viewpoints and traditional food culture.",
    "included": [
      "Private transportation",
      "Professional English-speaking guide",
      "Hotel pickup and drop-off",
      "Museum and church entrance fees",
      "Bottled drinking water",
      "Government taxes and service charges"
    ],
    "excluded": [
      "Lunch and beverages",
      "Personal expenses",
      "Tips and gratuities",
      "Camera and video fees where applicable"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa Full-Day City Tour",
        "activities": "Begin with a scenic drive to Mount Entoto, located above 3,200 meters, for panoramic views of Addis Ababa and visits to Entoto St. Mary Church, Entoto Museum, Emperor Menelik II's former palace and eucalyptus forest scenery. Continue to the National Museum of Ethiopia for the Lucy fossil exhibition, archaeological discoveries, royal artifacts and Ethiopian art, then visit the Ethnological Museum inside Addis Ababa University. Explore Holy Trinity Cathedral, St. George Cathedral and its museum, then experience Merkato with spice markets, handcrafted souvenirs, coffee, local products, traditional clothing and textiles. Enjoy a traditional Ethiopian lunch experience featuring injera, shiro, tibs, optional kitfo and fresh Ethiopian coffee.",
        "overnight": "Not included - full-day city tour"
      }
    ],
    "journeyMap": "Hotel pickup - Mount Entoto - Entoto St. Mary Church - National Museum of Ethiopia - Ethnological Museum - Holy Trinity Cathedral - St. George Cathedral - Merkato - Hotel drop-off",
    "destinationSlugs": [
      "addis-ababa",
      "mount-entoto",
      "national-museum-of-ethiopia",
      "ethnological-museum",
      "holy-trinity-cathedral",
      "st-george-cathedral"
    ],
    "categorySlugs": [
      "city-tours",
      "day-tours",
      "cultural-tours",
      "historical-tours",
      "private-customized-tours"
    ],
    "adultPrice": 110,
    "childPrice": 70,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782309634/Gada_-_Mount_Entoto_Mount_Entoto_is_the_highest_peak_overlooking_the_city_of_Addis_Ababa_the_capital_of_Ethiopia_and_has_views_of_the_city__It_reaches_3_200_meters_above_sea_level_and_is_part_of_hgwuey.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782309635/Mercato_Market_-_All_You_SHOULD_Know_Before_Going_2026_Reviews_hgqtip.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782309635/Ethiopian_Museum_of_Science_ugmsqk.jpg"
    ]
  },
  {
    "slug": "3-day-lalibela-genna-festival-tour",
    "tourName": "3-Day Lalibela Christmas (Genna) Festival Tour",
    "destination": "Lalibela",
    "overview": "Experience one of the world's most unique and spiritual Christmas celebrations in Lalibela, Ethiopia's New Jerusalem. This journey combines UNESCO-listed rock-hewn churches, Ethiopian Orthodox traditions, candlelight ceremonies, pilgrim gatherings, and the Beza Kula Christmas celebration in Addis Ababa.",
    "included": [
      "Domestic flight coordination",
      "Private vehicle transfers",
      "Professional English-speaking guide",
      "Entrance fees for listed sites"
    ],
    "excluded": [
      "International flights",
      "Personal shopping and souvenirs",
      "Tips and gratuities",
      "Alcoholic drinks"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa - Lalibela | Arrival & Rock-Hewn Churches Tour",
        "activities": "Take a morning flight from Addis Ababa to Lalibela. Upon arrival at Lalibela Airport, meet your guide and transfer to your hotel. After check-in and refreshments, begin exploring the first cluster of Lalibela's rock-hewn churches, including Bete Medhane Alem, Bete Maryam, Bete Meskel, Bete Denagel, Bete Golgotha and Bete Mikael. Learn about King Lalibela and his vision of creating a New Jerusalem in Ethiopia, then admire the churches carved from solid rock and connected by tunnels, trenches and hidden passageways.",
        "overnight": "Hotel in Lalibela"
      },
      {
        "day": 2,
        "title": "Lalibela Churches & Ethiopian Christmas (Genna) Celebration",
        "activities": "Continue exploring Lalibela's remaining churches, including Bete Emanuel, Bete Gabriel-Rufael, Bete Abba Libanos and the world-famous Bete Giyorgis, carved in the shape of a Greek cross. In the afternoon and evening, experience Genna, Ethiopia's Orthodox Christmas Festival, with thousands of pilgrims in traditional white Shamma garments, Orthodox chants and hymns, candlelight ceremonies, priests carrying colorful umbrellas and sacred crosses, spiritual processions and religious blessings.",
        "overnight": "Hotel in Lalibela"
      },
      {
        "day": 3,
        "title": "Lalibela - Addis Ababa | Beza Kula Christmas Celebration",
        "activities": "Transfer early to Lalibela Airport for your flight back to Addis Ababa. Upon arrival, continue the Christmas celebrations at Beza Kula, where worshippers gather after the all-night Christmas vigil to welcome the dawn with prayers, hymns and joyful festivities. Depending on your departure schedule, enjoy free time for souvenir shopping or relaxation before transfer to Bole International Airport for international departure or onward travel.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Addis Ababa - Lalibela - Bete Medhane Alem - Bete Maryam - Bete Giyorgis - Addis Ababa - Beza Kula - Bole International Airport",
    "destinationSlugs": [
      "lalibela",
      "addis-ababa"
    ],
    "categorySlugs": [
      "religious-pilgrimage-tours",
      "historical-tours",
      "cultural-tours",
      "festival-tours"
    ],
    "adultPrice": 1850,
    "childPrice": 1450,
    "rating": 4.9,
    "noOfRates": 41,
    "isFeatured": true,
    "priceSource": "source",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247186/Bet_Giyorgis_Rock-Hewn_Church_at_Lalibela___qffnvp.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247185/Ethiopia_Axum_ytphij.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247184/Ethiopia_Gondar_castle_putyss.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247184/Ethiopia_wendogenet_jefm6x.jpg"
    ]
  },
  {
    "slug": "3-day-harar-cultural-historical-tour",
    "tourName": "3-Day Harar Cultural & Historical Tour",
    "destination": "Harar",
    "overview": "Discover Harar, one of Ethiopia's most fascinating cultural treasures and a UNESCO World Heritage Site. Known as the City of Saints and regarded as the fourth holiest city in Islam, Harar is a living museum of history, religion, architecture and tradition, with ancient city walls, traditional Harari houses, narrow alleyways, markets, mosques, shrines and the unforgettable Hyena Feeding Ceremony.",
    "included": [
      "Airport meet and greet",
      "Domestic flights between Addis Ababa and Dire Dawa",
      "Private ground transportation",
      "Professional English-speaking guide",
      "Two nights of accommodation in Harar",
      "Entrance fees to all listed sites",
      "Guided walking tour of Harar Old City",
      "Aweday Market visit",
      "Hyena Feeding experience",
      "Bottled drinking water during excursions",
      "Farewell cultural dinner",
      "Government taxes and service charges"
    ],
    "excluded": [
      "Lunches and dinners not mentioned",
      "Personal expenses",
      "Alcoholic and soft drinks",
      "Tips and gratuities",
      "Camera and video fees where applicable",
      "Optional activities not listed",
      "Additional accommodation caused by delays or personal reasons"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa - Dire Dawa - Aweday - Harar",
        "activities": "Transfer early to Addis Ababa Bole International Airport for the flight to Dire Dawa. Upon arrival, meet your guide and drive toward Harar through eastern Ethiopia, stopping at Aweday Market, Ethiopia's largest khat trading center, to observe farmers, traders and merchants. Continue to Harar, check into your hotel, then begin exploring Harar Jugol, a UNESCO World Heritage Site, including the historic city walls, traditional Harari houses, narrow alleyways, local markets, artisan shops, Arthur Rimbaud House Museum, and historic mosques and shrines.",
        "overnight": "Hotel in Harar"
      },
      {
        "day": 2,
        "title": "Harar City Tour & Hyena Feeding Ceremony",
        "activities": "Spend the day exploring Harar's cultural and historical sites. Visit vibrant markets selling spices, textiles, baskets, traditional clothing and handicrafts, then continue to Ras Mekonnen House, traditional Harari homes, Harari Cultural Museum, local craft markets, historic mosques, traditional neighborhoods, ancient city gates and colorful streets. In the evening, experience the Hyena Feeding Ceremony outside the city walls, where local Hyena Men call wild hyenas and feed them by hand under the night sky.",
        "overnight": "Hotel in Harar"
      },
      {
        "day": 3,
        "title": "Harar - Dire Dawa - Addis Ababa",
        "activities": "After breakfast, drive back to Dire Dawa. Depending on flight schedules, enjoy an optional city visit including the Historic Railway Station, traditional markets, colonial-era architecture and local commercial districts. Fly back to Addis Ababa, then enjoy souvenir shopping at Shiro Meda or other local craft markets. In the evening, attend a farewell cultural dinner with Ethiopian cuisine, music and dances before transferring to Bole International Airport for onward international departure.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Addis Ababa Bole International Airport - Dire Dawa - Aweday Market - Harar Jugol - Dire Dawa - Addis Ababa - Shiro Meda - Bole International Airport",
    "destinationSlugs": [
      "harar",
      "dire-dawa",
      "aweday",
      "addis-ababa"
    ],
    "categorySlugs": [
      "cultural-tours",
      "historical-tours",
      "city-tours",
      "unesco-heritage-tours",
      "photography-tours",
      "private-customized-tours"
    ],
    "adultPrice": 899,
    "childPrice": 649,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782306410/Dire_Dawa_train_station_-_Ethiopia_qm9bsw.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782306410/https___flic_kr_p_qdmESG___Central_Addis_Ababa_1_c3ts9e.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782306410/Feeding_Wild_Hyenas_in_Harar_kciiku.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782244137/adiss_ababa_Ethiopia_wj8emk.jpg"
    ]
  },
  {
    "slug": "4-day-danakil-depression-erta-ale-tour",
    "tourName": "4-Day Danakil Depression & Erta Ale Volcano Adventure",
    "destination": "Danakil Depression",
    "overview": "Experience one of the most extraordinary and otherworldly landscapes on Earth. Explore Dallol hydrothermal fields, sulfur and mineral formations, salt flats, camel caravans, Afar settlements and the legendary Erta Ale Volcano, home to a remarkable lava lake.",
    "included": [
      "Afar permits and local coordination",
      "4WD vehicle with driver",
      "Cook and camping support",
      "Professional guide"
    ],
    "excluded": [
      "Personal expenses",
      "Travel insurance",
      "Tips and gratuities",
      "Special camera fees if required"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Fly to Mekele - Drive to Hamed Ela",
        "activities": "Take a morning flight from Addis Ababa to Mekele. Upon arrival, begin the journey to Hamed Ela via Berhale, covering approximately 160 km through the dramatic landscapes of the Afar Region. Along the way, see scenic desert landscapes, traditional Afar settlements, camel caravans transporting salt across the Danakil Depression, and salt mining activities. In Berhale, collect permits and security escorts required for travel within the Afar Region before continuing to Hamed Ela.",
        "overnight": "Camping in Hamed Ela"
      },
      {
        "day": 2,
        "title": "Dallol & Danakil Depression Exploration",
        "activities": "Depart early for Dallol, located approximately 116 meters below sea level. Explore the Dallol hydrothermal field, colorful sulfur and mineral formations, acidic hot springs, salt terraces, salt canyons, and traditional salt extraction sites. Witness local workers cutting salt blocks by hand and loading them onto camel caravans, a centuries-old tradition that remains an essential part of life in the region.",
        "overnight": "Camping in Hamed Ela"
      },
      {
        "day": 3,
        "title": "Erta Ale Active Volcano",
        "activities": "After breakfast, drive across the lava desert toward Dodom, the base camp for Erta Ale Volcano. Cross vast lava fields, observe unique volcanic landscapes, and stop at local Afar settlements. After reaching Dodom, enjoy an early dinner before beginning the three-hour trek to Erta Ale. At the crater rim, witness the active lava lake, glowing molten lava, dramatic volcanic scenery, and night views across the Danakil Depression.",
        "overnight": "Camping near Erta Ale Volcano"
      },
      {
        "day": 4,
        "title": "Sunrise at Erta Ale & Return to Addis Ababa",
        "activities": "Wake early to experience the volcano at sunrise and enjoy a final view of the lava lake. Descend to Dodom and begin the return journey to Mekele through the dramatic landscapes of the Danakil Depression. Upon arrival in Mekele, transfer to the airport for your flight back to Addis Ababa.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Addis Ababa - Mekele - Berhale - Hamed Ela - Dallol - Danakil Depression - Dodom - Erta Ale - Mekele - Addis Ababa",
    "destinationSlugs": [
      "danakil-depression",
      "erta-ale",
      "dallol",
      "mekele"
    ],
    "categorySlugs": [
      "nature-adventure-tours",
      "photography-tours"
    ],
    "adultPrice": 1650,
    "childPrice": 1350,
    "rating": 4.7,
    "noOfRates": 19,
    "isFeatured": true,
    "priceSource": "source",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248873/Dallol_Ethiopia___%CC%97%CC%80__%E0%A9%88_z78ix6.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248872/4996249580453896_lrt6x7.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248878/Reasons_to_Visit_the_Danakil_Depression_Ethiopia_xnvaap.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248872/Crater_Lake_Erta_Ale_-_Ethiopia_ykh2lj.jpg"
    ]
  },
  {
    "slug": "5-day-lalibela-danakil-depression-tour",
    "tourName": "5-Day Lalibela & Danakil Depression Adventure",
    "destination": "Lalibela & Danakil Depression",
    "overview": "Experience two of Ethiopia's most extraordinary destinations on this unforgettable 5-day journey combining the spiritual wonders of Lalibela with the dramatic volcanic landscapes of the Danakil Depression. Explore UNESCO-listed rock-hewn churches, Ethiopian Orthodox traditions, Addis Ababa city highlights, Erta Ale Volcano, a permanent lava lake, Dallol geothermal fields, salt flats, camel caravans and Afar culture.",
    "included": [
      "Domestic flights from Addis Ababa to Lalibela, back to Addis Ababa, onward to Semera, and back to Addis Ababa",
      "All ground transportation",
      "Professional English-speaking guide",
      "Local Afar guides and support crew",
      "Hotel accommodation",
      "Camping equipment during the expedition",
      "Full-board meals during the Danakil expedition",
      "Bottled drinking water",
      "Camel support for equipment transport",
      "All entrance fees and permits",
      "Government taxes and service charges"
    ],
    "excluded": [
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic and soft drinks",
      "Camera and video fees where applicable",
      "Optional activities not mentioned in the itinerary"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa - Lalibela",
        "activities": "Transfer to Addis Ababa Bole International Airport for the morning flight to Lalibela. Upon arrival, meet your guide and transfer to your hotel before visiting the first group of Lalibela's rock-hewn churches, including Bete Medhane Alem, Bete Maryam, Bete Meskel, Bete Danaghel, Bete Mikael and Bete Golgotha. Explore the tunnels, trenches and passageways that connect the churches, then visit Bete Giyorgis, the Church of St. George.",
        "overnight": "Hotel in Lalibela"
      },
      {
        "day": 2,
        "title": "Lalibela - Addis Ababa",
        "activities": "Begin the morning by attending an Ethiopian Orthodox church service and experiencing centuries-old religious traditions. Continue exploring the second group of churches, including Bete Emanuel, Bete Merkorios, Bete Abba Libanos and Bete Gabriel-Rufael. In the afternoon, fly back to Addis Ababa and enjoy city highlights including the National Museum of Ethiopia, the Lucy Fossil Exhibition, Shiro Meda Traditional Market and Mount Entoto viewpoints.",
        "overnight": "Hotel in Addis Ababa"
      },
      {
        "day": 3,
        "title": "Addis Ababa - Semera - Erta Ale Volcano",
        "activities": "Take a morning flight to Semera, the gateway to the Danakil Depression. Begin the desert expedition through one of the hottest regions on Earth, crossing dramatic volcanic landscapes and traditional Afar settlements. Arrive at the Erta Ale Volcano base camp, then after sunset begin the approximately three-hour trek to the summit to observe the glowing lava lake under the stars.",
        "overnight": "Camping near Erta Ale Volcano"
      },
      {
        "day": 4,
        "title": "Erta Ale - Dodom - Hamed Ela",
        "activities": "Wake before sunrise for another view of the lava lake and volcanic landscape. After breakfast, descend from Erta Ale through Dodom and continue across the Danakil Depression toward Hamed Ela, passing ancient lava fields, salt plains, traditional Afar settlements and Lake Afrera when seasonal water levels allow. Observe Afar communities harvesting salt using traditional methods.",
        "overnight": "Camp at Hamed Ela"
      },
      {
        "day": 5,
        "title": "Hamed Ela - Dallol - Mekele - Addis Ababa",
        "activities": "Depart early for Dallol, one of Earth's most unique geothermal sites and the lowest point in Africa. Explore colorful sulfur formations, mineral terraces, acidic hot springs, salt canyons and geothermal pools. Visit Ragad or Asebo salt extraction site to see workers cutting salt blocks and loading them onto camel caravans, meet Afar community members, then drive to Mekele and transfer to the airport for the return flight to Addis Ababa.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Bole International Airport - Lalibela - Addis Ababa - Semera - Erta Ale Volcano - Dodom - Hamed Ela - Dallol - Mekele - Addis Ababa",
    "destinationSlugs": [
      "lalibela",
      "addis-ababa",
      "semera",
      "erta-ale",
      "danakil-depression",
      "hamed-ela",
      "dallol",
      "mekele"
    ],
    "categorySlugs": [
      "historical-tours",
      "religious-pilgrimage-tours",
      "cultural-tours",
      "nature-adventure-tours",
      "nature-geological-tours",
      "photography-tours",
      "private-customized-tours"
    ],
    "adultPrice": 1890,
    "childPrice": 1520,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248872/Crater_Lake_Erta_Ale_-_Ethiopia_ykh2lj.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248878/Reasons_to_Visit_the_Danakil_Depression_Ethiopia_xnvaap.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782247186/Bet_Giyorgis_Rock-Hewn_Church_at_Lalibela___qffnvp.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248873/Dallol_Ethiopia___%CC%97%CC%80__%E0%A9%88_z78ix6.jpg"
    ]
  },
  {
    "slug": "6-day-ethiopia-holiday-package",
    "tourName": "6-Day Ethiopia Holiday Package Tour",
    "destination": "Northern Ethiopia",
    "overview": "Discover the rich history, culture, and spiritual heritage of Northern Ethiopia on this six-day journey through Addis Ababa, Lake Tana, Blue Nile Falls, Gondar and Lalibela. Cruise to ancient island monasteries, visit medieval castles and royal sites, and explore Lalibela, the New Jerusalem of Africa, where rock-hewn churches were carved from solid volcanic rock more than 800 years ago.",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Addis Ababa & City Tour",
        "activities": "Upon arrival at Addis Ababa Bole International Airport, meet your Ethio Origins Tour representative and transfer to your hotel. Begin your city tour at Mount Entoto for panoramic views, then visit Entoto St. Mary Church, the Entoto Museum, and Emperor Menelik II's former palace. Continue to the Ethnological Museum, the National Museum of Ethiopia to see Lucy, Holy Trinity Cathedral, Ba'ata Church, the Mausoleum of Emperor Menelik II, and Merkato, Africa's largest open-air market.",
        "overnight": "Hotel in Addis Ababa"
      },
      {
        "day": 2,
        "title": "Addis Ababa - Bahir Dar | Blue Nile Falls & Lake Tana",
        "activities": "Take a morning flight to Bahir Dar, one of Ethiopia's most beautiful lakeside cities on Lake Tana. Drive to Tis Abay village to visit the Blue Nile Falls, locally known as Tis Issat, or Smoking Water. Walk through local villages and cross the historic Portuguese Bridge before a boat excursion on Lake Tana to visit Ura Kidane Mihret Monastery, Azwa Maryam Monastery, and Kibran Gabriel Monastery, which is accessible to men only.",
        "overnight": "Hotel in Bahir Dar"
      },
      {
        "day": 3,
        "title": "Bahir Dar - Awra Amba - Gondar",
        "activities": "Drive to Gondar, the former imperial capital of Ethiopia. En route, stop at the Awra Amba Community, a remarkable village known for equality, cooperation, and social harmony. In Gondar, visit the Royal Enclosure at Fasil Ghebbi, a UNESCO World Heritage Site, including Emperor Fasilides' Castle, Fasilides' Bath, the Royal Banquet Hall, Debre Birhan Selassie Church with its angel-painted ceiling, and the historic Felasha Village.",
        "overnight": "Hotel in Gondar"
      },
      {
        "day": 4,
        "title": "Gondar - Lalibela | First Group of Rock-Hewn Churches",
        "activities": "Fly to Lalibela, Ethiopia's sacred Christian pilgrimage destination and UNESCO World Heritage Site. Begin exploring the first group of Lalibela's rock-hewn churches, carved directly into solid volcanic rock during the reign of King Lalibela in the 12th and 13th centuries. Visit Bete Medhane Alem, Bete Maryam, Bete Meskel, Bete Danaghel, Bete Mikael, and Bete Golgotha, and explore the tunnels, passageways, and courtyards that connect them.",
        "overnight": "Hotel in Lalibela"
      },
      {
        "day": 5,
        "title": "Lalibela Churches & Optional Asheten Mariam Excursion",
        "activities": "Enjoy an optional hike to Asheten Mariam Monastery, set at about 3,000 meters above sea level with panoramic views of the mountains and valleys. After lunch, continue to the second group of Lalibela churches, including Bete Amanuel, Bete Merkorios, Bete Abba Libanos, and Bete Gabriel-Rufael. Conclude at the iconic Bete Giyorgis, the cross-shaped Church of St. George, then visit Nakuto La'ab Cave Church, known for holy springs and religious treasures.",
        "overnight": "Hotel in Lalibela"
      },
      {
        "day": 6,
        "title": "Lalibela - Addis Ababa - Departure",
        "activities": "Fly from Lalibela back to Addis Ababa. Depending on your international departure schedule, enjoy free time for shopping, sightseeing, or relaxation. In the evening, attend a farewell cultural dinner at a traditional restaurant with Ethiopian cuisine, music, and dances from diverse ethnic groups, then transfer to Bole International Airport for departure.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Bole International Airport - Addis Ababa - Mount Entoto - Bahir Dar - Blue Nile Falls - Lake Tana - Awra Amba - Gondar - Lalibela - Addis Ababa - Bole International Airport",
    "destinationSlugs": [
      "addis-ababa",
      "bahir-dar",
      "lake-tana",
      "blue-nile-falls",
      "awra-amba",
      "gondar",
      "lalibela"
    ],
    "categorySlugs": [
      "historical-tours",
      "cultural-tours",
      "religious-pilgrimage-tours",
      "ethiopia-holiday-packages",
      "private-customized-tours"
    ],
    "adultPrice": 1690,
    "childPrice": 1290,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247184/Ethiopia_wendogenet_jefm6x.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782248220/The_Most_Breathtaking_Geography_in_Ethiopia_wtbbpz.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247185/Ethiopia_Axum_ytphij.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_800,h_600,c_fill,g_auto/v1782247184/Ethiopia_Gondar_castle_putyss  .jpg"
    ]
  },
  {
    "slug": "8-day-omo-valley-cultural-discovery-tour",
    "tourName": "8-Day Omo Valley Cultural Discovery Tour",
    "destination": "Omo Valley",
    "overview": "Experience the extraordinary cultural diversity of Southern Ethiopia on this fascinating 8-day journey through the Omo Valley, one of Africa's most unique cultural landscapes and home to some of the continent's most remarkable indigenous communities. Travel through breathtaking Rift Valley scenery, visit UNESCO World Heritage Sites, encounter traditional cultures, and explore villages that have preserved their customs and lifestyles for generations.",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa - Arba Minch",
        "activities": "After an early breakfast, drive south through the Ethiopian Highlands toward Arba Minch. Along the way, visit Adadi Maryam, a remarkable rock-hewn church carved directly into the rock, and the Tiya Stelae Field, a UNESCO World Heritage Site with mysterious carved stone monuments believed to mark ancient burial grounds. Continue through beautiful landscapes and traditional villages before arriving in Arba Minch. If time permits, visit a traditional textile workshop where local artisans demonstrate Ethiopia's weaving traditions.",
        "overnight": "Hotel in Arba Minch",
        "meals": "Lunch and dinner"
      },
      {
        "day": 2,
        "title": "Arba Minch and Dorze Village",
        "activities": "Begin with a Lake Chamo boat excursion to see giant Nile crocodiles, hippos, fish eagles, pelicans and numerous water birds. After lunch, drive into the Guge Mountains to visit the Dorze community, known for tall beehive-shaped bamboo houses, traditional weaving, enset cultivation and rich cultural traditions. Learn about Dorze architecture and way of life before returning to Arba Minch.",
        "overnight": "Hotel in Arba Minch",
        "meals": "Breakfast, lunch and dinner"
      },
      {
        "day": 3,
        "title": "Arba Minch - Jinka",
        "activities": "Drive south into the heart of the Omo Valley, passing through regions inhabited by the Konso, Tsemai, Benna and Ari peoples. Upon arrival in Jinka, visit the Omo Valley Museum, learn about the region's many ethnic groups, and explore a nearby Ari village to experience traditional farming and village life. The Ari are known for agriculture, pottery, blacksmithing and welcoming hospitality.",
        "overnight": "Hotel in Jinka",
        "meals": "Breakfast, lunch and dinner"
      },
      {
        "day": 4,
        "title": "Jinka - Mursi Community - Turmi",
        "activities": "Make an early morning excursion into Mago National Park to visit the Mursi community, internationally known for decorative clay lip plates, traditional scarification, unique hairstyles, ornaments and rich cultural traditions. After the visit, continue toward Turmi, encountering Ari and Benna communities along the route. Arrive in Hamer territory, where the Hamer are known for red ochre hairstyles, colorful beadwork, traditional dances and ceremonies.",
        "overnight": "Hotel in Turmi",
        "meals": "Breakfast, lunch and dinner"
      },
      {
        "day": 5,
        "title": "Karo, Nyangatom and Dassanech Excursion",
        "activities": "Enjoy a full-day cultural excursion through the lower Omo Valley. Visit the Nyangatom community, known for strong oral traditions, storytelling and agricultural life. Continue to Murulle to meet the Karo community, famous for elaborate body painting, decorative scarification, artistic cultural expression and views over the Omo River. In the afternoon, visit the Dassanech community to learn about pastoral life, fishing practices, livestock-based livelihoods and social traditions before returning to Turmi.",
        "overnight": "Hotel in Turmi",
        "meals": "Breakfast, lunch and dinner"
      },
      {
        "day": 6,
        "title": "Turmi - Konso",
        "activities": "Drive north to Konso and visit the UNESCO-listed Konso Cultural Landscape. Explore a traditional Konso village and learn about ancient stone terraces, ingenious agricultural systems, organized hilltop villages, traditional wooden statues and sacred generation poles. See how generations of Konso farmers transformed the rugged landscape into one of Africa's most impressive cultural landscapes.",
        "overnight": "Hotel in Konso",
        "meals": "Breakfast, lunch and dinner"
      },
      {
        "day": 7,
        "title": "Konso - Hawassa",
        "activities": "After breakfast, drive to Hawassa, one of Ethiopia's most attractive lakeside cities. Upon arrival, relax near Lake Hawassa and enjoy the peaceful lakeside atmosphere. Optional activities include birdwatching along the lakeshore, a walk through local markets and sunset views over the lake.",
        "overnight": "Hotel in Hawassa",
        "meals": "Breakfast, lunch and dinner"
      },
      {
        "day": 8,
        "title": "Hawassa - Addis Ababa",
        "activities": "Drive back to Addis Ababa through the scenic Great Rift Valley, stopping at Rift Valley lakes where appropriate for birdlife and beautiful scenery. Upon arrival in Addis Ababa, enjoy time for souvenir shopping at local markets and artisan centers. In the evening, celebrate the journey with a farewell cultural dinner featuring traditional cuisine, music and dances from Ethiopia's many ethnic groups, then transfer to Addis Ababa Bole International Airport. End of tour.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Addis Ababa - Adadi Maryam - Tiya - Arba Minch - Lake Chamo - Dorze - Jinka - Omo Valley Museum - Mago National Park - Mursi - Turmi - Nyangatom - Murulle - Karo - Dassanech - Konso - Hawassa - Lake Hawassa - Great Rift Valley - Addis Ababa",
    "destinationSlugs": [
      "addis-ababa",
      "adadi-maryam",
      "tiya",
      "arba-minch",
      "lake-chamo",
      "dorze",
      "jinka",
      "omo-valley",
      "mago-national-park",
      "turmi",
      "karo",
      "nyangatom",
      "dassanech",
      "konso",
      "hawassa",
      "lake-hawassa"
    ],
    "categorySlugs": [
      "omo-valley-tours",
      "cultural-tours",
      "southern-ethiopia-tours",
      "unesco-heritage-tours",
      "photography-tours",
      "wildlife-tours",
      "private-customized-tours"
    ],
    "adultPrice": 1890,
    "childPrice": 1490,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782246561/Private_Omo_Valley_Tours_From_Addis_Ababa_xvpppa.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/Art_Print__Su_s_Abaya_Lake_at_sunrise_Arbaminch_Ethiopia_36x24in__kgs2br.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782375795/Dorze_Tribe_Ethiopia_ppus8s.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/v1782373033/lake_hawassa_gqzntl.jpg"
    ]
  },
  {
    "slug": "10-day-omo-valley-bale-mountains-cultural-adventure",
    "tourName": "10-Day Omo Valley & Bale Mountains Cultural Adventure",
    "destination": "Omo Valley",
    "overview": "Discover the cultural diversity, ancient traditions, dramatic landscapes and unique wildlife of Southern Ethiopia on a 10-day journey through the Great Rift Valley, Omo Valley communities, UNESCO heritage sites, Lake Chamo, Hawassa and Bale Mountains National Park. Arrival is handled separately from Day 1: guests arrive at Addis Ababa Bole International Airport, meet the Ethio Origins Tour team, transfer to their hotel, and either begin light sightseeing with a morning arrival or rest before the tour with an afternoon or evening arrival.",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa - Arba Minch",
        "activities": "After breakfast, drive south from Addis Ababa through the Ethiopian Highlands toward Arba Minch. Visit Melka Kunture, one of Ethiopia's important prehistoric archaeological sites; continue to Adadi Maryam, the southernmost rock-hewn church associated with Ethiopia's medieval church tradition; and stop at the Tiya Stelae Field, a UNESCO World Heritage Site. Continue to Arba Minch for the evening. Meals: breakfast, lunch and dinner.",
        "overnight": "Arba Minch"
      },
      {
        "day": 2,
        "title": "Arba Minch - Jinka",
        "activities": "Begin with an early Lake Chamo boat excursion to observe Nile crocodiles, hippos, fish eagles, pelicans and other aquatic birds. After the boat trip, drive toward Jinka through Konso, Tsemai, Benna and Ari areas, then visit an Ari village near Jinka to learn about local agriculture, homes and daily traditions. Meals: breakfast, lunch and dinner.",
        "overnight": "Jinka"
      },
      {
        "day": 3,
        "title": "Mago National Park & Mursi Visit",
        "activities": "Drive into Mago National Park to visit the Mursi community, known for traditions including lip plates, body painting, hairstyles, ornaments and distinctive cultural practices. Return to Jinka and visit the Omo Valley Museum to place the region's communities, landscapes and history in context. Meals: breakfast, lunch and dinner.",
        "overnight": "Jinka"
      },
      {
        "day": 4,
        "title": "Jinka - Turmi | Hamer Cultural Experience",
        "activities": "Drive from Jinka to Turmi and visit a traditional Hamer village. Learn about Hamer hairstyles, dances, ceremonies, beadwork, social customs and local traditions. When available, a Bull Jumping ceremony may be included as an optional cultural event, but it is not guaranteed. Meals: breakfast, lunch and dinner.",
        "overnight": "Turmi"
      },
      {
        "day": 5,
        "title": "Karo & Nyangatom Excursion",
        "activities": "Drive toward Murulle with a stop at Kangaton to visit the Nyangatom community. Continue to the Karo community, known for body painting, scarification, hairstyles and dramatic Omo River viewpoints. Return to Turmi after the day's cultural visits. Meals: breakfast, lunch and dinner.",
        "overnight": "Turmi"
      },
      {
        "day": 6,
        "title": "Omorate & Dassanech Excursion",
        "activities": "Travel to Omorate and cross the Omo River by dugout canoe or bridge depending on local conditions. Visit the Dassanech community to learn about daily life, cultural identity, river-based movement and traditions near the Kenya border region, then return to Turmi. Meals: breakfast, lunch and dinner.",
        "overnight": "Turmi"
      },
      {
        "day": 7,
        "title": "Turmi - Konso",
        "activities": "Drive to Konso and visit the UNESCO-listed Konso Cultural Landscape. Explore a traditional Konso village with stone terraces, family compounds, sacred forests, generation poles and local traditions that reflect the community's agricultural and social heritage. Meals: breakfast, lunch and dinner.",
        "overnight": "Konso"
      },
      {
        "day": 8,
        "title": "Konso - Dorze - Hawassa",
        "activities": "Travel into the Guge Mountains to visit a Dorze village, known for beehive-shaped houses, traditional weaving and enset cultivation. Continue north to Hawassa and spend the evening near Lake Hawassa. Meals: breakfast, lunch and dinner.",
        "overnight": "Hawassa"
      },
      {
        "day": 9,
        "title": "Hawassa - Bale Mountains National Park",
        "activities": "Drive to Bale Mountains National Park and meet a local park guide for an afternoon of exploration. Look for Mountain Nyala, Menelik's Bushbuck, Warthogs, Ethiopian Wolves in higher elevations and Giant Mole Rats where conditions allow. The park also supports endemic bird species including Blue-winged Goose, Wattled Ibis, Abyssinian Longclaw, Rouget's Rail and Black-headed Siskin. Enjoy a scenic afternoon walk through the park. Meals: breakfast, lunch and dinner.",
        "overnight": "Hotel or lodge in Bale Mountains"
      },
      {
        "day": 10,
        "title": "Bale Mountains - Addis Ababa",
        "activities": "Return to Addis Ababa through the Great Rift Valley, stopping at scenic viewpoints and lakes known for birdlife and natural beauty. Upon arrival, enjoy free time for last-minute shopping, sightseeing or relaxation, then celebrate the journey with a farewell cultural dinner featuring traditional cuisine, music and dance before transfer to Bole International Airport. End of tour.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Addis Ababa - Melka Kunture - Adadi Maryam - Tiya - Arba Minch - Lake Chamo - Jinka - Mago National Park - Turmi - Karo - Nyangatom - Omorate - Konso - Dorze - Hawassa - Bale Mountains National Park - Addis Ababa",
    "destinationSlugs": [
      "addis-ababa",
      "melka-kunture",
      "adadi-maryam",
      "tiya",
      "arba-minch",
      "lake-chamo",
      "jinka",
      "mago-national-park",
      "omo-valley",
      "turmi",
      "karo",
      "nyangatom",
      "omorate",
      "dassanech",
      "konso",
      "dorze",
      "hawassa",
      "lake-hawassa",
      "bale-mountains-national-park"
    ],
    "categorySlugs": [
      "cultural-tours",
      "omo-valley-tours",
      "wildlife-tours",
      "nature-tours",
      "nature-adventure-tours",
      "unesco-heritage-tours",
      "birdwatching-tours",
      "photography-tours",
      "southern-ethiopia-tours",
      "private-customized-tours"
    ],
    "adultPrice": 1990,
    "childPrice": 1590,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_600/v1782246561/Private_Omo_Valley_Tours_From_Addis_Ababa_xvpppa.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_600/v1782246561/Voyage_en_Ethiopie_n5xvsq.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_600/v1782246561/40462096650629206_q68ntv.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_600/v1782246561/Hawassa_Ethiopia_x7pubf.jpg"
    ]
  },
  {
    "slug": "12-day-historic-north-omo-valley-tour",
    "tourName": "12-Day Historic North & Omo Valley Cultural Adventure",
    "destination": "Historic North & Omo Valley",
    "overview": "This Ethiopian adventure begins and ends in Addis Ababa, taking you through the country's historical, natural, and cultural treasures. Discover Lake Tana monasteries, Blue Nile Falls, Gondar's royal sites, the Simien Mountains, Lalibela's rock-hewn churches, Lake Langano, Dorze Village, Lake Chamo, Mursi, Hamer, Karo and Konso communities.",
    "included": [],
    "excluded": [],
    "itinerary": [
      {
        "day": 1,
        "title": "Addis Ababa Arrival & City Tour",
        "activities": "Upon arrival at Addis Ababa Bole International Airport, meet your representative and transfer to your hotel. After a short rest, enjoy a guided city tour including Mount Entoto, the National Museum and Lucy fossil, the Ethnological Museum, Holy Trinity Cathedral, Merkato and important monuments and historical landmarks.",
        "overnight": "Hotel in Addis Ababa"
      },
      {
        "day": 2,
        "title": "Bahir Dar, Lake Tana Monasteries & Blue Nile Falls",
        "activities": "Fly to Bahir Dar and take a Lake Tana boat excursion to historic monasteries on the Zege Peninsula, including Azwa Mariam, Ura Kidane Mihret and Bete Maryam where access allows. After lunch, drive to the Blue Nile Falls, locally known as Tis Issat, then return to Bahir Dar for the evening.",
        "overnight": "Hotel in Bahir Dar"
      },
      {
        "day": 3,
        "title": "Bahir Dar - Gondar",
        "activities": "Drive from Bahir Dar to Gondar through beautiful countryside. Visit Guzara Castle, the Royal Enclosure at Fasil Ghebbi, Emperor Fasilides' Castle, Debre Birhan Selassie Church and Fasilides Bath while learning about Ethiopia's imperial history.",
        "overnight": "Hotel in Gondar"
      },
      {
        "day": 4,
        "title": "Simien Mountains Excursion",
        "activities": "Drive to Simien Mountains National Park, a UNESCO World Heritage Site known for dramatic escarpments, Gelada Baboons, Walia Ibex, endemic birdlife and highland scenery. Enjoy viewpoints and light trekking around Sankaber and Jimbar Waterfall areas before returning to Gondar.",
        "overnight": "Hotel in Gondar"
      },
      {
        "day": 5,
        "title": "Flight to Lalibela & Rock-Hewn Churches",
        "activities": "Fly to Lalibela and visit the first group of the famous rock-hewn churches, including Bete Medhane Alem, Bete Maryam, Bete Meskel, Bete Denagel, Debre Sina and Bete Golgotha. Explore these architectural masterpieces carved directly from volcanic rock.",
        "overnight": "Hotel in Lalibela"
      },
      {
        "day": 6,
        "title": "Fly to Addis Ababa & Drive to Lake Langano",
        "activities": "Fly back to Addis Ababa in the morning, then drive south through the Great Rift Valley, passing Lakes Koka, Ziway and Langano. Enjoy lake views, birdlife, rural scenery and a relaxed evening near Lake Langano.",
        "overnight": "Hotel at Lake Langano"
      },
      {
        "day": 7,
        "title": "Lake Langano, Dorze & Arba Minch",
        "activities": "Continue south toward Arba Minch, visiting the Dorze village near Chencha. Learn about beehive-shaped houses, weaving traditions and enset cultivation before arriving in Arba Minch in the evening.",
        "overnight": "Hotel in Arba Minch"
      },
      {
        "day": 8,
        "title": "Lake Chamo & Drive to Jinka",
        "activities": "Begin with a Lake Chamo boat trip to see the Crocodile Market, hippos and water birds. Continue to Jinka, visiting Konso, Ari and Tsemay communities along the way where timing and local conditions allow.",
        "overnight": "Hotel or lodge in Jinka"
      },
      {
        "day": 9,
        "title": "Mago National Park, Mursi & Turmi",
        "activities": "Visit Mago National Park to meet the Mursi people, known for distinctive lip plates and strong cultural traditions. After lunch, continue to Turmi and visit Hamer villages to learn about local customs and daily life.",
        "overnight": "Lodge in Turmi"
      },
      {
        "day": 10,
        "title": "Karo Cultural Excursion",
        "activities": "Travel to Murulle and Korcho to visit the Karo people, known for elaborate body painting and scarification traditions. Enjoy views of the Omo River and, depending on the day, visit a local market or optional cultural ceremony if available.",
        "overnight": "Lodge in Turmi"
      },
      {
        "day": 11,
        "title": "Turmi - Konso - Arba Minch",
        "activities": "Drive to Konso, a UNESCO World Heritage Site known for terraced farming systems, traditional stone-walled villages and rich cultural heritage. Continue to Arba Minch while enjoying Southern Ethiopia landscapes along the route.",
        "overnight": "Hotel in Arba Minch"
      },
      {
        "day": 12,
        "title": "Return to Addis Ababa, Farewell Dinner & Departure",
        "activities": "Drive back to Addis Ababa through the Great Rift Valley with a stop at Lake Ziway where timing allows. Upon arrival, enjoy last-minute souvenir shopping, a farewell dinner with traditional Ethiopian cuisine and cultural performance, then transfer to Bole International Airport.",
        "overnight": "Departure"
      }
    ],
    "journeyMap": "Addis Ababa - Bahir Dar - Lake Tana - Blue Nile Falls - Gondar - Simien Mountains - Lalibela - Addis Ababa - Lake Langano - Dorze - Arba Minch - Lake Chamo - Jinka - Mago National Park - Turmi - Karo - Konso - Arba Minch - Addis Ababa",
    "destinationSlugs": [
      "addis-ababa",
      "bahir-dar",
      "lake-tana",
      "blue-nile-falls",
      "gondar",
      "simien-mountains-national-park",
      "lalibela",
      "lake-langano",
      "dorze",
      "arba-minch",
      "lake-chamo",
      "jinka",
      "mago-national-park",
      "omo-valley",
      "turmi",
      "karo",
      "konso",
      "lake-ziway"
    ],
    "categorySlugs": [
      "historical-tours",
      "cultural-tours",
      "nature-adventure-tours",
      "wildlife-tours",
      "unesco-heritage-tours",
      "omo-valley-tours",
      "southern-ethiopia-tours",
      "private-customized-tours"
    ],
    "adultPrice": 2290,
    "childPrice": 1790,
    "rating": 0,
    "noOfRates": 0,
    "isFeatured": false,
    "priceSource": "demo",
    "gallery": [
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782249613/Blue_Nile_falls_-_Amhara_Region_-_Ethiopia_eii468.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782248220/The_Most_Breathtaking_Geography_in_Ethiopia_wtbbpz.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782246561/Private_Omo_Valley_Tours_From_Addis_Ababa_xvpppa.jpg",
      "https://res.cloudinary.com/divimnzxa/image/upload/f_auto,q_auto,w_400,h_300,c_fill,g_auto/v1782247186/Bet_Giyorgis_Rock-Hewn_Church_at_Lalibela___qffnvp.jpg"
    ]
  }
];

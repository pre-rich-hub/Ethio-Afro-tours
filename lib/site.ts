export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Tours', href: '/tours' },
  { label: 'Layover', href: '/layover' },
  { label: 'Journal', href: '/blog' },
] as const

export const contact = {
  phone: '+251 11 555 0192',
  whatsapp: '+251 91 234 5678',
  email: 'journeys@ethioafrotours.com',
  address: 'Bole Road, Yeka Tower, 7th Floor, Addis Ababa, Ethiopia',
  hours: 'Travel designers reply within 24 hours, seven days a week',
}

export type Destination = {
  slug: string
  name: string
  region: string
  tag: string
  image: string
  teaser: string
  intro: string
  bestTime: string
  duration: string
  altitude: string
  highlights: string[]
  paragraphs: string[]
  span?: string
}

export const destinations: Destination[] = [
  {
    slug: 'lalibela',
    name: 'Lalibela',
    region: 'Northern Highlands',
    tag: 'UNESCO Heritage',
    image: '/images/lalibela.png',
    teaser:
      'Eleven churches carved downward into living rock, still alive with prayer.',
    intro:
      'A medieval capital where an entire holy city was excavated from the mountain itself — and where, eight centuries later, the liturgy has never stopped.',
    bestTime: 'October – March',
    duration: '2 – 3 days',
    altitude: '2,500 m',
    highlights: [
      'Bete Medhane Alem, the largest monolithic church on earth',
      'Dawn liturgy at Bete Maryam with white-robed pilgrims',
      'The hidden tunnel passage to Bete Golgotha',
      'Asheton Maryam monastery on the ridge above town',
    ],
    paragraphs: [
      'Lalibela is not a ruin. It is a working sanctuary, carved downward rather than built upward, where priests still descend the same rock stairways their predecessors cut in the twelfth century. Arriving before sunrise, you hear it before you see it: chant drifting up out of the ground.',
      'We time your visit around the liturgy rather than the crowds, pairing a scholar-guide with private access at the quietest hours. Afternoons are yours — a walk to a cliff-edge monastery, or nothing at all, from a terrace above the Lasta mountains.',
    ],
    span: 'lg:col-span-7',
  },
  {
    slug: 'simien-mountains',
    name: 'Simien Mountains',
    region: 'Northern Highlands',
    tag: 'National Park',
    image: '/images/hero-simien.png',
    teaser:
      'A roof of Africa where gelada monkeys graze above a two-thousand-metre drop.',
    intro:
      'Jagged basalt pinnacles, escarpments that fall away into cloud, and the largest primate troops you will ever walk beside.',
    bestTime: 'October – April',
    duration: '3 – 5 days',
    altitude: '3,200 – 4,533 m',
    highlights: [
      'Walking among habituated gelada troops at Gich',
      'The Jinbar Falls escarpment viewpoint',
      'Sunrise from Imet Gogo, three ridges above the clouds',
      'Optional ascent of Ras Dashen, Ethiopia’s highest peak',
    ],
    paragraphs: [
      'The Simiens are less a mountain range than a broken plateau — a continent-sized slab of lava split into towers and gorges. You walk the rim, not the valleys, which means the view is constant and vertiginous the entire way.',
      'Our itineraries are day-walks with a soft landing: a lodge or a serviced camp with hot water, proper bedding and a cook, so the days are strenuous only as far as you want them to be.',
    ],
    span: 'lg:col-span-5',
  },
  {
    slug: 'danakil-depression',
    name: 'Danakil Depression',
    region: 'Afar Lowlands',
    tag: 'Expedition',
    image: '/images/danakil.png',
    teaser: 'The hottest inhabited place on earth, painted in sulphur and salt.',
    intro:
      'One hundred metres below sea level: acid springs the colour of egg yolk, a permanent lava lake, and salt caravans that have not changed in a thousand years.',
    bestTime: 'November – February',
    duration: '3 – 4 days',
    altitude: '-125 m',
    highlights: [
      'The Dallol sulphur springs at first light',
      'Overnight ascent to the Erta Ale lava lake',
      'Afar salt caravans crossing Lake Assale',
      'Night skies with no horizon glow in any direction',
    ],
    paragraphs: [
      'This is the most extreme landscape we operate in, and the one guests talk about for years. Dallol looks less like earth than a chemistry set left in the sun — mineral terraces in yellow, orange and acid green, hissing quietly.',
      'We run it as a supported expedition: hardened vehicles, a medic-trained guide, Afar liaison, iced water throughout, and camp beds under the stars. Comfort within reason, honesty about the rest.',
    ],
    span: 'lg:col-span-5',
  },
  {
    slug: 'omo-valley',
    name: 'Omo Valley',
    region: 'Southern Rift',
    tag: 'Cultural Immersion',
    image: '/images/omo-valley.png',
    teaser:
      'A living mosaic of communities who have shaped this land for millennia.',
    intro:
      'The lower Omo is one of the most culturally dense regions on the planet — and one that demands to be travelled slowly, and with permission.',
    bestTime: 'June – September, December – March',
    duration: '5 – 8 days',
    altitude: '500 – 1,400 m',
    highlights: [
      'Market days at Key Afer, Dimeka and Turmi',
      'Invited attendance at a Hamar bull-jumping ceremony',
      'Mursi highlands with a resident anthropologist',
      'Riverside camps on the banks of the Omo',
    ],
    paragraphs: [
      'We travel the Omo differently. No drive-by photography, no fee-per-frame stops. Our relationships here are decades old, which buys something money cannot: time, invitation, and the ability to simply sit with people.',
      'Journeys are built around market days and ceremonies, with a cultural mediator alongside your guide so that conversation — not the camera — leads.',
    ],
    span: 'lg:col-span-7',
  },
  {
    slug: 'gondar',
    name: 'Gondar',
    region: 'Northern Highlands',
    tag: 'Imperial City',
    image: '/images/gondar.png',
    teaser:
      'The Camelot of Africa — palaces, baths and painted ceilings of a highland empire.',
    intro:
      'A seventeenth-century imperial capital of stone castles and cedar-scented chapels, where Timkat still fills the royal bath each January.',
    bestTime: 'October – March',
    duration: '1 – 2 days',
    altitude: '2,133 m',
    highlights: [
      'The Fasil Ghebbi royal enclosure',
      'Debre Berhan Selassie and its ceiling of winged faces',
      'Fasilides’ Bath, flooded for Timkat',
      'Kuskuam palace at golden hour',
    ],
    paragraphs: [
      'Gondar is the easiest place in Ethiopia to feel the weight of empire. The royal enclosure holds six centuries of ambition in one walled compound, and the light on the basalt at the end of the day is extraordinary.',
      'A short flight from Lalibela, it pairs naturally with the Simiens — a night of comfort and cold beer either side of the mountains.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'axum',
    name: 'Axum',
    region: 'Tigray',
    tag: 'Ancient Capital',
    image: '/images/festival-timkat.png',
    teaser:
      'Granite obelisks, submerged tombs, and the claimed resting place of the Ark.',
    intro:
      'The seat of a trading empire that minted its own coinage while Rome was still standing, and the spiritual centre of Ethiopian Orthodoxy.',
    bestTime: 'October – March',
    duration: '1 – 2 days',
    altitude: '2,131 m',
    highlights: [
      'The Northern Stelae Field and the fallen Great Stele',
      'Chapel of the Tablet, from the permitted threshold',
      'Queen of Sheba’s bath and palace foundations',
      'Rock-hewn churches of the Gheralta on the drive south',
    ],
    paragraphs: [
      'Axum rewards a guide who can read stone. The obelisks are engineering as much as art — single pieces of granite, carved to imitate multi-storey towers, raised without mortar.',
      'We combine it with Tigray’s cliff churches, several of which require a genuine scramble and reward it with frescoes almost nobody sees.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'bale-mountains',
    name: 'Bale Mountains',
    region: 'Southern Highlands',
    tag: 'Wildlife',
    image: '/images/bale-gelada.png',
    teaser:
      'Afro-alpine moorland holding the rarest canid on earth — the Ethiopian wolf.',
    intro:
      'The Sanetti Plateau is the largest expanse of Afro-alpine habitat in Africa, and the best place in the world to see a wild wolf hunt.',
    bestTime: 'November – April',
    duration: '3 – 4 days',
    altitude: '2,500 – 4,377 m',
    highlights: [
      'Ethiopian wolf tracking on the Sanetti Plateau',
      'Harenna cloud forest and wild coffee understorey',
      'Endemic birding — sixteen Ethiopian endemics in a day',
      'Mountain nyala at dusk near Dinsho',
    ],
    paragraphs: [
      'Fewer than five hundred Ethiopian wolves remain, and roughly half of them live here. Mornings on the plateau are cold, clear and quiet, and the sightings — a rust-coloured wolf working a rodent burrow — are genuinely intimate.',
      'Below the escarpment, the Harenna forest is another world: moss, wild coffee, colobus and hornbills. We usually spend a night on each side.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'lake-tana',
    name: 'Lake Tana & Blue Nile',
    region: 'Amhara',
    tag: 'Slow Travel',
    image: '/images/lake-tana.png',
    teaser:
      'Island monasteries, papyrus boats, and the source of the Blue Nile.',
    intro:
      'Ethiopia’s largest lake hides thirty-odd monasteries on its islands, several of which have guarded illuminated manuscripts for six hundred years.',
    bestTime: 'September – March',
    duration: '1 – 2 days',
    altitude: '1,788 m',
    highlights: [
      'Private boat to Ura Kidane Mehret and Azwa Maryam',
      'Illuminated goatskin gospels shown by resident monks',
      'Tis Issat — the Blue Nile Falls — after the rains',
      'Sunset from the Bahir Dar shoreline with pelicans',
    ],
    paragraphs: [
      'Tana is the gentle chapter of a northern journey. The monasteries are round, thatched and painted floor to ceiling, and the monks who unwrap their manuscripts for you are usually delighted to have the company.',
      'We use a private boat and go early, before the day-trip flotilla, then take a late breakfast on the water.',
    ],
    span: 'lg:col-span-6',
  },
]

export type Tour = {
  slug: string
  title: string
  image: string
  days: string
  nights: number
  style: string
  season: string
  from: string
  group: string
  teaser: string
  summary: string
  includes: string[]
  excludes: string[]
  itinerary: { day: string; title: string; text: string }[]
  places: string[]
  featured?: boolean
}

export const tours: Tour[] = [
  {
    slug: 'the-historic-route',
    title: 'The Historic Route',
    image: '/images/gondar.png',
    days: '11 Days',
    nights: 10,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: '$6,450 per person',
    group: '2 – 8 guests',
    teaser:
      'Follow the pilgrimage of kings from the castles of Gondar to the rock churches of Lalibela.',
    summary:
      'The definitive northern circuit, flown rather than driven, with private access timed around the liturgy and the light. Four UNESCO sites, three imperial capitals, and evenings that end on a terrace rather than in a coach.',
    includes: [
      'All domestic flights within Ethiopia',
      'Private 4x4 with a senior driver-guide',
      'Scholar-guides at Lalibela, Axum and Gondar',
      'Boutique lodges and the best available rooms',
      'All breakfasts, most lunches and dinners',
      '24/7 travel designer support line',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Gratuities and personal spending',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Private transfer, a quiet room, and a first dinner of tibs and honey wine with your travel designer.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Bahir Dar & Lake Tana',
        text: 'Morning flight north, then a private boat to the island monasteries before the day boats arrive. Tis Issat falls in the afternoon.',
      },
      {
        day: 'Days 4 – 5',
        title: 'Gondar',
        text: 'The royal enclosure at opening, the painted ceiling of Debre Berhan Selassie, and Kuskuam at golden hour.',
      },
      {
        day: 'Days 6 – 7',
        title: 'Simien Mountains',
        text: 'Two escarpment walks among gelada troops, with a lodge on the rim and a fire lit by the time you return.',
      },
      {
        day: 'Days 8 – 9',
        title: 'Lalibela',
        text: 'Dawn liturgy in the northern cluster, the tunnel to Bete Golgotha, and a walk up to Asheton Maryam.',
      },
      {
        day: 'Day 10',
        title: 'Axum',
        text: 'Stelae field, the Chapel of the Tablet, and the Queen of Sheba’s bath with an archaeologist.',
      },
      {
        day: 'Day 11',
        title: 'Addis & Departure',
        text: 'A last coffee ceremony, a day room at the airport hotel, and an evening flight home.',
      },
    ],
    places: ['Lake Tana', 'Gondar', 'Simien Mountains', 'Lalibela', 'Axum'],
    featured: true,
  },
  {
    slug: 'highlands-and-wildlife',
    title: 'Highlands & Wildlife',
    image: '/images/bale-gelada.png',
    days: '9 Days',
    nights: 8,
    style: 'Expedition · Private',
    season: 'Nov – Apr',
    from: '$5,780 per person',
    group: '2 – 6 guests',
    teaser:
      'Trek the Simien escarpment and track the Ethiopian wolf across the Sanetti Plateau.',
    summary:
      'Ethiopia’s two great mountain ecosystems in one journey, with an endemics specialist throughout. Strenuous by choice, comfortable by design.',
    includes: [
      'Domestic flights and private 4x4 transfers',
      'Resident naturalist and endemics specialist',
      'National park fees, scouts and permits',
      'Lodges on the Simien rim and Bale escarpment',
      'Full board on trekking days',
      'Walking poles and daypack loan',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Optional Ras Dashen extension',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Briefing with your naturalist over dinner, kit check, and an early night.',
      },
      {
        day: 'Days 2 – 4',
        title: 'Simien Mountains',
        text: 'Three rim walks of increasing length, gelada troops at close quarters, and sunrise from Imet Gogo.',
      },
      {
        day: 'Day 5',
        title: 'Transfer south',
        text: 'Flight to Addis, then the Rift Valley road with birding stops at Lake Ziway.',
      },
      {
        day: 'Days 6 – 8',
        title: 'Bale Mountains',
        text: 'Wolf tracking at first light on Sanetti, nyala at Dinsho, and a day in the Harenna cloud forest.',
      },
      {
        day: 'Day 9',
        title: 'Addis & Departure',
        text: 'Return flight, National Museum with a curator, and an evening departure.',
      },
    ],
    places: ['Simien Mountains', 'Rift Valley Lakes', 'Bale Mountains'],
    featured: true,
  },
  {
    slug: 'sacred-waters-and-coffee',
    title: 'Sacred Waters & Coffee',
    image: '/images/lake-tana.png',
    days: '7 Days',
    nights: 6,
    style: 'Slow Travel · Private',
    season: 'Year-round',
    from: '$4,320 per person',
    group: '2 – 8 guests',
    teaser:
      'Drift to island monasteries, then journey into the forests where coffee was born.',
    summary:
      'The gentlest of our journeys, and a favourite of returning guests: water, forest, ceremony and very little driving.',
    includes: [
      'Domestic flights and private transfers',
      'Private boat charter on Lake Tana',
      'Farm-to-cup coffee immersion in Kaffa',
      'Two nights in a forest eco-lodge',
      'All breakfasts and dinners',
      'Barista-led cupping session in Addis',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Coffee purchases and shipping',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'A cupping session in the roastery district to calibrate the palate.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Lake Tana',
        text: 'Private boat to Ura Kidane Mehret at dawn, manuscripts with the monks, and a slow afternoon on the water.',
      },
      {
        day: 'Days 4 – 6',
        title: 'Kaffa & Bonga forest',
        text: 'Wild coffee under the canopy, harvest and roast with a farming family, and nights in the forest.',
      },
      {
        day: 'Day 7',
        title: 'Addis & Departure',
        text: 'Mercato with a chef, lunch, and an evening flight.',
      },
    ],
    places: ['Lake Tana', 'Kaffa', 'Bonga Forest', 'Addis Ababa'],
    featured: true,
  },
  {
    slug: 'danakil-expedition',
    title: 'Danakil Expedition',
    image: '/images/danakil.png',
    days: '6 Days',
    nights: 5,
    style: 'Expedition · Small Group',
    season: 'Nov – Feb',
    from: '$5,150 per person',
    group: '2 – 6 guests',
    teaser:
      'Sulphur springs, a permanent lava lake, and salt caravans on the white plain.',
    summary:
      'Our most demanding journey, run with a medic-trained guide, hardened vehicles and Afar liaison. Nights under stars with no horizon glow.',
    includes: [
      'Afar regional permits and local liaison',
      'Expedition vehicles and support truck',
      'Medic-trained guide and satellite comms',
      'Camp beds, bedding and full catering',
      'Erta Ale overnight ascent with porters',
      'Unlimited chilled water throughout',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance with evacuation cover',
      'Sleeping bag hire',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Expedition briefing, kit issue and an early dinner.',
      },
      {
        day: 'Day 2',
        title: 'Mekele to Hamed Ela',
        text: 'Flight north, then the descent into the Afar depression as the temperature climbs.',
      },
      {
        day: 'Day 3',
        title: 'Dallol & Lake Assale',
        text: 'Sulphur terraces at first light, salt caravans in the afternoon, camp on the plain.',
      },
      {
        day: 'Day 4',
        title: 'Erta Ale',
        text: 'Night ascent to the caldera rim and the lava lake, sleeping on the volcano.',
      },
      {
        day: 'Day 5',
        title: 'Return to Mekele',
        text: 'Long drive out, hot shower, cold beer, and a proper bed.',
      },
      {
        day: 'Day 6',
        title: 'Addis & Departure',
        text: 'Morning flight and a day room before an evening departure.',
      },
    ],
    places: ['Mekele', 'Dallol', 'Lake Assale', 'Erta Ale'],
    featured: true,
  },
  {
    slug: 'omo-valley-immersion',
    title: 'Omo Valley Immersion',
    image: '/images/omo-valley.png',
    days: '10 Days',
    nights: 9,
    style: 'Cultural · Private',
    season: 'Jun – Sep, Dec – Mar',
    from: '$6,980 per person',
    group: '2 – 6 guests',
    teaser:
      'Market days, ceremony and conversation in the most culturally dense valley on earth.',
    summary:
      'Built around market days and invitations rather than a fixed route, with a cultural mediator alongside your guide throughout.',
    includes: [
      'Private 4x4 and senior driver-guide',
      'Resident cultural mediator and translator',
      'Community fees paid transparently at village level',
      'Riverside tented camps and the best area lodges',
      'Full board throughout the south',
      'Photography guidance and consent protocol',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Personal gifts and purchases',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Context evening with an anthropologist from Addis Ababa University.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Rift Valley south',
        text: 'Lakes, hot springs and the Dorze highlands with a weaving family.',
      },
      {
        day: 'Days 4 – 7',
        title: 'Turmi, Dimeka & the Hamar',
        text: 'Market days, an invited bull-jumping ceremony if the season allows, and long evenings by the river.',
      },
      {
        day: 'Days 8 – 9',
        title: 'Mursi highlands & Karo',
        text: 'A slow two days with a resident anthropologist, and the Omo escarpment at dusk.',
      },
      {
        day: 'Day 10',
        title: 'Addis & Departure',
        text: 'Flight north, a farewell lunch, and an evening departure.',
      },
    ],
    places: ['Dorze', 'Turmi', 'Dimeka', 'Mursi Highlands', 'Karo'],
    featured: true,
  },
  {
    slug: 'timkat-festival-journey',
    title: 'Timkat Festival Journey',
    image: '/images/festival-timkat.png',
    days: '8 Days',
    nights: 7,
    style: 'Festival · Private',
    season: 'January only',
    from: '$5,940 per person',
    group: '2 – 10 guests',
    teaser:
      'Ethiopia’s Epiphany — processions, white robes and the flooding of the royal bath.',
    summary:
      'A single fixed window each January, planned a year ahead because the rooms and the vantage points go early.',
    includes: [
      'Reserved viewing positions at Fasilides’ Bath',
      'Domestic flights and private transfers',
      'Rooms held twelve months in advance',
      'Orthodox scholar as festival guide',
      'All breakfasts and festival-day catering',
      'Processional photography guidance',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Gratuities',
    ],
    itinerary: [
      {
        day: 'Days 1 – 2',
        title: 'Addis Ababa',
        text: 'Arrival, Holy Trinity Cathedral, and a briefing on the liturgical calendar.',
      },
      {
        day: 'Days 3 – 5',
        title: 'Gondar for Timkat',
        text: 'Ketera eve procession, the night vigil, and the flooding of the bath at dawn.',
      },
      {
        day: 'Days 6 – 7',
        title: 'Lalibela',
        text: 'The rock churches in festival season, with the northern cluster before sunrise.',
      },
      {
        day: 'Day 8',
        title: 'Departure',
        text: 'Return flight to Addis and an evening departure.',
      },
    ],
    places: ['Addis Ababa', 'Gondar', 'Lalibela'],
    featured: true,
  },
]

export type LayoverPackage = {
  slug: string
  hours: string
  title: string
  price: string
  image: string
  teaser: string
  itinerary: string[]
  includes: string[]
  best: string
}

export const layoverPackages: LayoverPackage[] = [
  {
    slug: '6-hour',
    hours: '6 Hours',
    title: 'The Espresso',
    price: '$95 per person',
    image: '/images/coffee-ceremony.png',
    teaser:
      'A tight, elegant loop of the capital for a short connection — city, coffee, and back with time to spare.',
    itinerary: [
      'Meet at arrivals with a name board and a cold towel',
      'Drive to Entoto ridge for the city panorama and eucalyptus air',
      'A private coffee ceremony in a family home in Shiro Meda',
      'Late lunch of injera and tibs at a designers’ favourite',
      'Return to the terminal three hours before departure',
    ],
    includes: [
      'Private air-conditioned vehicle and driver-guide',
      'All entrance fees',
      'Lunch and the coffee ceremony',
      'Airport meet-and-greet both ways',
    ],
    best: 'Connections of 8 hours or more',
  },
  {
    slug: '12-hour',
    hours: '12 Hours',
    title: 'The Capital',
    price: '$165 per person',
    image: '/images/textile.png',
    teaser:
      'The full Addis day: Lucy at the National Museum, the Mercato, Holy Trinity, and a long lunch.',
    itinerary: [
      'Arrivals meet, breakfast at a rooftop above Bole',
      'The National Museum with a curator — Lucy, in person',
      'Holy Trinity Cathedral and the imperial tombs',
      'Mercato with a chef, then a spice-market tasting',
      'Late lunch, hammam or hotel day room to reset',
      'Evening return with priority check-in assistance',
    ],
    includes: [
      'Private vehicle, driver-guide and curator access',
      'Hotel day room for showering and rest',
      'All meals and entrance fees',
      'Departure check-in assistance',
    ],
    best: 'Connections of 14 hours or more',
  },
  {
    slug: '24-hour',
    hours: '24 Hours',
    title: 'The Overnight',
    price: '$395 per person',
    image: '/images/luxury-lodge.png',
    teaser:
      'A night in a proper bed, a highland morning outside the city, and a proper dinner with live azmari music.',
    itinerary: [
      'Arrivals meet and transfer to a boutique hotel',
      'Dinner with live azmari music in Kazanchis',
      'Sunrise drive to the Debre Libanos monastery and Portuguese Bridge',
      'Gelada troops on the Jemma gorge rim',
      'Lunch on the escarpment, return to Addis',
      'Spa hour, then evening transfer to the airport',
    ],
    includes: [
      'One night in a boutique hotel with breakfast',
      'Private vehicle and driver-guide throughout',
      'All meals, park and monastery fees',
      'Spa session before departure',
    ],
    best: 'Overnight connections and stopovers',
  },
  {
    slug: '48-hour',
    hours: '48 Hours',
    title: 'The Stopover',
    price: '$890 per person',
    image: '/images/lalibela.png',
    teaser:
      'Two days is enough for Lalibela. A dawn flight north, the rock churches, and back for your onward leg.',
    itinerary: [
      'Arrivals meet, hotel, and an early night',
      'Dawn flight to Lalibela with your scholar-guide',
      'The northern and eastern church clusters, quietly',
      'Night in a lodge above the Lasta mountains',
      'Sunrise liturgy, then the flight back to Addis',
      'Day room, dinner and evening departure',
    ],
    includes: [
      'Domestic flights Addis – Lalibela – Addis',
      'Two nights accommodation with breakfast',
      'Scholar-guide and all church entrance fees',
      'All transfers and a departure day room',
    ],
    best: 'Stopovers of two nights or more',
  },
]

export type Post = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  image: string
  author: string
  authorRole: string
  excerpt: string
  body: string[]
  featured?: boolean
}

export const posts: Post[] = [
  {
    slug: 'when-to-visit-ethiopia',
    title: 'When to visit Ethiopia: a month-by-month reading of the light',
    category: 'Planning',
    date: 'June 18, 2026',
    readTime: '9 min read',
    image: '/images/hero-simien.png',
    author: 'Selam Bekele',
    authorRole: 'Head of Journey Design',
    excerpt:
      'Ethiopia has thirteen months of sunshine, but not all of them are the same. Here is how we actually choose dates for our guests.',
    body: [
      'The tourist-board line is thirteen months of sunshine, and it is not untrue — but it flattens a country that runs from 125 metres below sea level to nearly 4,600 above. What follows is how our designers actually think about dates.',
      'October and November are the finest weeks of the year. The long rains have just finished, the highlands are green, the wildflowers are out on the Sanetti Plateau and the air is so clear you can see three ridges deep in the Simiens. Everything is open, nothing is dusty.',
      'December through February brings the festival season — Ethiopian Christmas in Lalibela, then Timkat in Gondar — and the coldest highland nights. It is also the only sensible window for the Danakil, where daytime temperatures merely become extreme rather than dangerous.',
      'March to May is our quiet secret. Hot in the lowlands, occasional afternoon storms in the north, but the light is dramatic, the sites are empty and the rates are softer. If you have travelled before and want the churches to yourself, come in April.',
      'June to September is the kiremt, the long rains. We stop running the north almost entirely: roads soften, flights cancel and cloud sits on the escarpments. But the south is open and the Omo is at its most beautiful, green and full, with fewer visitors than any other month.',
    ],
    featured: true,
  },
  {
    slug: 'lalibela-at-dawn',
    title: 'Lalibela at dawn: how to see the rock churches properly',
    category: 'Destinations',
    date: 'May 30, 2026',
    readTime: '7 min read',
    image: '/images/lalibela.png',
    author: 'Yohannes Tesfaye',
    authorRole: 'Senior Guide, Northern Circuit',
    excerpt:
      'Most visitors arrive at ten in the morning and see a monument. Arrive at five and you see a living city instead.',
    body: [
      'There is a version of Lalibela that opens at eight, fills with groups by ten and empties by two. It is impressive, and it is also the wrong version.',
      'Come instead at five in the morning, in the dark, when the pilgrims are already gathered in the trenches with candles and white shawls. The chant starts underground and reaches you before the buildings do.',
      'Practically: this means a lodge within ten minutes of the site, a guide who is on good terms with the priests, and a willingness to be cold for an hour. We bring blankets and flasks. Nobody ever regrets it.',
      'By seven, when the light finally drops into the trench at Bete Maryam and lands on the north wall, you will have had two hours in a working sanctuary. The groups arriving as you leave are welcome to the monument.',
    ],
  },
  {
    slug: 'the-coffee-ceremony',
    title: 'The coffee ceremony is not a performance',
    category: 'Culture',
    date: 'May 9, 2026',
    readTime: '6 min read',
    image: '/images/coffee-ceremony.png',
    author: 'Marta Alemu',
    authorRole: 'Culture & Community Lead',
    excerpt:
      'Three rounds, an hour of your time, and a set of small courtesies that change the experience entirely.',
    body: [
      'In hotels it takes fifteen minutes and arrives with a bill. In a home it takes an hour and it is not really about the coffee.',
      'Green beans are washed and roasted in front of you, and the pan is carried around so you can take the smoke in with both hands — this is an invitation, not a flourish. Then the pounding, the jebena, and the first of three pours.',
      'The three rounds have names: abol, tona and baraka. Leaving before the third is a small rudeness, and staying for it is the entire point. Baraka means blessing.',
      'What to do: accept the popcorn, drink slowly, praise the roast rather than the room, and let the conversation wander. What not to do: photograph first. Ask on the second round, when you have earned it.',
    ],
  },
  {
    slug: 'packing-for-the-highlands',
    title: 'Packing for 4,000 metres and 45 degrees in one suitcase',
    category: 'Practical',
    date: 'April 22, 2026',
    readTime: '5 min read',
    image: '/images/danakil.png',
    author: 'Selam Bekele',
    authorRole: 'Head of Journey Design',
    excerpt:
      'Ethiopia asks you to pack for two climates at once. A short, opinionated list from eighteen years of doing it.',
    body: [
      'The Simien rim can hit freezing before dawn. The Danakil can hit forty-five by ten in the morning. Most guests overpack for one and underpack for the other.',
      'Layers, not bulk: a merino base, a light fleece, and one properly windproof shell. That combination covers every highland morning we operate in. Add a warm hat — you will use it more than you expect.',
      'For the lowlands: loose long sleeves in light cotton or linen, a wide brim, and closed shoes for the salt crust, which is sharper than it looks. Sandals are a mistake at Dallol.',
      'Everywhere: modest shoulders and knees for churches and monasteries, slip-on shoes because you will remove them often, and a headlamp. And leave 3kg for the coffee.',
    ],
  },
  {
    slug: 'responsible-travel-in-the-omo',
    title: 'What responsible travel in the Omo Valley actually requires',
    category: 'Responsible Travel',
    date: 'April 3, 2026',
    readTime: '8 min read',
    image: '/images/omo-valley.png',
    author: 'Marta Alemu',
    authorRole: 'Culture & Community Lead',
    excerpt:
      'The pay-per-photo economy is a choice, not an inevitability. Here is how we work instead, and what we ask of guests.',
    body: [
      'The Omo has a well-documented problem: an economy in which a stranger arrives, pays a few birr per frame, and leaves. It distorts everything it touches, and it is entirely avoidable.',
      'We pay community fees at village level, agreed annually with elders and published to our guests. Nothing is negotiated at the roadside, and nothing is paid per image.',
      'A cultural mediator travels with every Omo journey. Their job is not translation alone — it is to arrange the visit in advance, explain who we are, and give people a genuine ability to decline.',
      'What we ask of guests is simple: put the camera down for the first half hour, ask before every portrait, accept a no without negotiation, and send prints back with us. Half of our returning guests come back partly to deliver them.',
    ],
  },
  {
    slug: 'twelve-hours-in-addis',
    title: 'Twelve hours in Addis: a layover worth leaving the airport for',
    category: 'Layover',
    date: 'March 14, 2026',
    readTime: '6 min read',
    image: '/images/textile.png',
    author: 'Yohannes Tesfaye',
    authorRole: 'Senior Guide, Northern Circuit',
    excerpt:
      'Bole is one of Africa’s great connecting hubs. If your onward flight is more than eight hours out, the city is right there.',
    body: [
      'Half our layover guests were not planning to leave the terminal. Twelve hours later they are asking whether they can change their onward flight.',
      'The shape of a good Addis day: high ground first for the panorama and the eucalyptus air, then the National Museum before the school groups, then Mercato with somebody who knows which alley to turn down.',
      'The single best thing in the city is not a building. It is a coffee ceremony in a family home in Shiro Meda, an hour long, in a room with a corrugated roof and a bowl of popcorn.',
      'Logistics matter more than sights on a layover. Visa on arrival, a driver who tracks your inbound flight, a hotel day room for a shower, and back at the terminal three hours before departure. That is the whole trick.',
    ],
  },
]

export const testimonials = [
  {
    quote:
      'We have travelled the world, yet nothing prepared us for Ethiopia. Every detail was considered, every guide extraordinary. We did not feel like tourists — we felt like guests of an old friend.',
    name: 'Eleanor Whitmore',
    detail: 'The Historic Route · United Kingdom',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'They rebuilt our itinerary twice before we ever paid a deposit, then again in-country when the light was better in the south. That is not a package. That is a design practice.',
    name: 'Daniel Okonjo',
    detail: 'Omo Valley Cultural Odyssey · Nigeria',
    image: '/images/traveler-portrait.png',
  },
  {
    quote:
      'A fourteen-hour connection in Addis became the most memorable day of the whole trip. Met at the gate, back at check-in, and Lucy in between.',
    name: 'Marta Køhler',
    detail: 'The Capital, 12-hour layover · Denmark',
    image: '/images/traveler-portrait.png',
  },
]

export const journeyStyles = [
  'Luxury',
  'Photography',
  'Cultural',
  'Wildlife',
  'Trekking',
  'Festival',
  'Layover',
  'Family',
]

export const promises = [
  {
    title: 'Locally owned, locally guided',
    text: 'An Addis-based team of designers, scholar-guides and drivers who have worked together for years — not a franchise operating at a distance.',
  },
  {
    title: 'Designed, never packaged',
    text: 'Every itinerary is drawn from scratch around your pace, interests and appetite for altitude. Nothing on this site is fixed.',
  },
  {
    title: 'Access that cannot be booked online',
    text: 'Curators, priests, archaeologists and artisans who open doors at the hours when no one else is there.',
  },
  {
    title: 'Present before, during and after',
    text: 'One named designer from first enquiry to final departure, with a 24-hour support line for the whole of your journey.',
  },
]

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug)
}

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug)
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug)
}

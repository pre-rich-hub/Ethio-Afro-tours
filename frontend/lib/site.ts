export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Tours', href: '/tours' },
  { label: 'Layover', href: '/layover' },
  { label: 'Journal', href: '/blog' },
] as const

export const contact = {
  phone: '+1909-450-7246',
  whatsapp: '+1909-450-7246',
  email: 'info@ethioafrotours.com',
  address: 'Bole Medhaniallem, Cape Verde Street 1000, Addis Ababa, Ethiopia',
  hours: 'Monday to Saturday 8:00 AM - 5:30 PM',
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
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
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
    slug: 'addis-ababa',
    name: 'Addis Ababa',
    region: 'Central Ethiopia',
    tag: 'Capital City',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg',
    teaser:
      'Museums, markets and modern Ethiopian life at the gateway to the country.',
    intro:
      'Ethiopia’s highland capital brings ancient history, living culture and an ambitious contemporary city together at the beginning of almost every journey.',
    bestTime: 'October – May',
    duration: '1 – 2 days',
    altitude: '2,355 m',
    highlights: [
      'National Museum and the story of Lucy',
      'Mount Entoto viewpoints and historic churches',
      'Merkato with a local guide and coffee specialist',
      'Contemporary galleries, restaurants and live music',
    ],
    paragraphs: [
      'Addis Ababa is more than an arrival point. A well-paced day moves from the deep human history held in its museums to the city’s Orthodox churches, busy trading quarters and new cultural spaces.',
      'We shape the visit around your flight times and interests, with a private guide who can connect the capital’s food, art and politics to the regions you will explore next.',
    ],
    span: 'lg:col-span-5',
  },
  {
    slug: 'simien-mountains',
    name: 'Simien Mountains National Park',
    region: 'Northern Highlands',
    tag: 'National Park',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801433/simien-mountains.jpg',
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
    name: 'Danakil Depression & Erta Ale',
    region: 'Afar Lowlands',
    tag: 'Expedition',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801428/danakil-depression.jpg',
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
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
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
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801385/gondar.jpg',
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
    name: 'Aksum',
    region: 'Tigray',
    tag: 'Ancient Capital',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801243/axum.jpg',
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
      'Aksum rewards a guide who can read stone. The obelisks are engineering as much as art — single pieces of granite, carved to imitate multi-storey towers, raised without mortar.',
      'We combine it with Tigray’s cliff churches, several of which require a genuine scramble and reward it with frescoes almost nobody sees.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'lake-tana',
    name: 'Bahir Dar, Lake Tana & Blue Nile Falls',
    region: 'Amhara',
    tag: 'Slow Travel',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/lake-tana.jpg',
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
  {
    slug: 'bale-mountains',
    name: 'Bale Mountains National Park',
    region: 'Oromia Highlands',
    tag: 'Wildlife',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801477/bale-mountains.png',
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
      'Endemic birding across contrasting habitats',
      'Mountain nyala at dusk near Dinsho',
    ],
    paragraphs: [
      'Fewer than five hundred Ethiopian wolves remain, and roughly half of them live here. Mornings on the plateau are cold, clear and quiet, and the sightings — a rust-coloured wolf working a rodent burrow — are genuinely intimate.',
      'Below the escarpment, the Harenna forest is another world: moss, wild coffee, colobus and hornbills. We usually spend a night on each side.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'harar',
    name: 'Harar Jugol',
    region: 'Eastern Ethiopia',
    tag: 'UNESCO Heritage',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801283/harar.jpg',
    teaser:
      'A walled city of painted homes, narrow lanes and centuries of Islamic scholarship.',
    intro:
      'Behind Harar’s old gates, more than eighty mosques, vibrant markets and distinctive Harari homes form one of Africa’s most remarkable living historic cities.',
    bestTime: 'October – March',
    duration: '2 – 3 days',
    altitude: '1,885 m',
    highlights: [
      'Walking the lanes and gates of Harar Jugol',
      'Traditional Harari homes and cultural museums',
      'Coffee, spice and textile markets',
      'The evening hyena-feeding tradition',
    ],
    paragraphs: [
      'Harar is best discovered on foot, turning through lanes where every doorway opens onto another layer of trade, faith and domestic art. A Harari guide gives meaning to the city’s colors, courtyards and sacred spaces.',
      'We allow at least two nights, pairing the old city with its markets and surrounding landscapes rather than treating it as a quick excursion from the airport.',
    ],
    span: 'lg:col-span-7',
  },
  {
    slug: 'arba-minch',
    name: 'Arba Minch',
    region: 'Southern Ethiopia',
    tag: 'Lakes & Wildlife',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801292/arba-minch.jpg',
    teaser:
      'A green escarpment above twin Rift Valley lakes and the forests of Nech Sar.',
    intro:
      'Arba Minch is the natural gateway to southern Ethiopia, overlooking Lakes Abaya and Chamo with wildlife, wetlands and highland communities close at hand.',
    bestTime: 'October – March',
    duration: '2 – 3 days',
    altitude: '1,285 m',
    highlights: [
      'Boat journey on Lake Chamo',
      'Nech Sar National Park landscapes',
      'The forest springs known as Forty Springs',
      'Easy access to Dorze and Konso',
    ],
    paragraphs: [
      'The view from Arba Minch explains its appeal immediately: forested slopes fall toward two immense lakes divided by the Bridge of God. It is a restorative stop between the long cultural routes of the south.',
      'A private boat on Lake Chamo brings close views of hippos, waterbirds and large Nile crocodiles, while the highlands above town open the route toward Dorze.',
    ],
    span: 'lg:col-span-5',
  },
  {
    slug: 'konso',
    name: 'Konso Cultural Landscape',
    region: 'Southern Ethiopia',
    tag: 'UNESCO Heritage',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801355/konso.jpg',
    teaser:
      'Stone-walled settlements and terraced hills shaped by generations of skilled farmers.',
    intro:
      'Konso’s fortified villages, sculpted agricultural terraces and communal traditions reveal a cultural landscape refined over centuries in a demanding environment.',
    bestTime: 'June – March',
    duration: '1 – 2 days',
    altitude: '1,400 – 2,000 m',
    highlights: [
      'Terraced hillsides of the UNESCO landscape',
      'Guided visit to a traditional walled village',
      'Community gathering spaces and generation poles',
      'Carved waka memorial traditions',
    ],
    paragraphs: [
      'Konso is not a single monument but a landscape made by sustained human knowledge. Dry-stone terraces conserve soil and water, while compact hilltop settlements reflect systems of defense, community and shared work.',
      'Visits are led with local guides and arranged at the pace of the community. The value lies in understanding how the landscape functions, not simply photographing its architecture.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'sof-omar-cave',
    name: 'Sof Omar Cave',
    region: 'Oromia',
    tag: 'Geological Wonder',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801283/sof-omar-cave.jpg',
    teaser:
      'A river-cut limestone world of soaring chambers, pillars and sacred memory.',
    intro:
      'The Web River passes through an immense limestone cave system whose echoing galleries carry both geological drama and deep spiritual significance.',
    bestTime: 'October – June',
    duration: '1 day',
    altitude: '1,300 m',
    highlights: [
      'The monumental Chamber of Columns',
      'River passages and natural limestone arches',
      'Local Islamic history and pilgrimage traditions',
      'A natural pairing with the Bale Mountains',
    ],
    paragraphs: [
      'Sof Omar changes scale as you enter: daylight narrows behind you and the Web River leads into chambers held by fluted limestone pillars. The cave feels architectural even though water shaped every surface.',
      'We visit with local expertise and proper lighting, usually as part of a longer Bale journey. Seasonal river levels determine how far the safest route can extend.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'hawassa',
    name: 'Hawassa',
    region: 'Sidama',
    tag: 'Rift Valley',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801520/hawassa.jpg',
    teaser:
      'A relaxed lakeside city of fish markets, gardens and abundant birdlife.',
    intro:
      'Set beside Lake Hawassa, the Sidama capital offers an easy introduction to the Rift Valley through waterfront life, nearby coffee country and a gentler pace.',
    bestTime: 'October – May',
    duration: '1 – 2 days',
    altitude: '1,708 m',
    highlights: [
      'Sunrise birding along Lake Hawassa',
      'The lively lakeside fish market',
      'Boat excursions and hippo sightings',
      'Sidama coffee and cultural experiences',
    ],
    paragraphs: [
      'Hawassa works best as a pause rather than a checklist. Marabou storks and fish eagles gather by the water, cafés face the lake, and the city’s broad avenues make it one of southern Ethiopia’s most comfortable stops.',
      'From here we can continue into Sidama coffee country or use the city as a natural break on the road between Addis Ababa and Arba Minch.',
    ],
    span: 'lg:col-span-7',
  },
  {
    slug: 'wonchi-crater-lake',
    name: 'Wonchi Crater Lake',
    region: 'Oromia',
    tag: 'Volcanic Landscape',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801471/wonchi-crater-lake.jpg',
    teaser:
      'A blue crater lake ringed by farms, forest paths and mineral springs.',
    intro:
      'West of Addis Ababa, Wonchi’s volcanic caldera holds a highland lake, small islands and rural trails that make a rewarding active day or overnight escape.',
    bestTime: 'October – May',
    duration: '1 – 2 days',
    altitude: 'About 2,900 m',
    highlights: [
      'Caldera viewpoints above the lake',
      'Hiking or riding down through farmland',
      'Boat crossing to the island monastery',
      'Hot springs and village landscapes',
    ],
    paragraphs: [
      'The journey into Wonchi is part of the experience, descending from a wide crater rim through cultivated slopes to the water below. Weather moves quickly at this altitude, changing the light across the caldera.',
      'We arrange local guides, a boat crossing and a route matched to your preferred level of walking, with time to meet communities around the lake without rushing back to Addis.',
    ],
    span: 'lg:col-span-5',
  },
  {
    slug: 'dorze',
    name: 'Dorze Village',
    region: 'Gamo Highlands',
    tag: 'Living Culture',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801478/dorze.jpg',
    teaser:
      'Highland weaving traditions and remarkable bamboo homes above the Rift Valley.',
    intro:
      'In the cool hills above Arba Minch, Dorze communities are known for skilled weaving, towering bamboo houses and food traditions rooted in the enset plant.',
    bestTime: 'October – March',
    duration: '1 day',
    altitude: 'About 2,600 m',
    highlights: [
      'Distinctive elephant-shaped bamboo houses',
      'Weaving demonstrations with local artisans',
      'Preparation and tasting of kocho',
      'Wide views over Lakes Abaya and Chamo',
    ],
    paragraphs: [
      'Dorze’s woven houses are practical works of architecture, designed to age gradually while remaining usable for decades. The same precision appears in textiles produced in family compounds across the highlands.',
      'A thoughtful visit is conversational and locally hosted. We allow time for food, craft and questions rather than reducing the village to a roadside performance.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'tiya',
    name: 'Tiya Archaeological Site',
    region: 'Central Ethiopia',
    tag: 'UNESCO Heritage',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801289/tiya.png',
    teaser:
      'Carved standing stones preserving the symbols of a still-mysterious past.',
    intro:
      'South of Addis Ababa, Tiya’s field of engraved megaliths marks an important prehistoric burial landscape whose signs continue to invite interpretation.',
    bestTime: 'October – May',
    duration: 'Half day',
    altitude: 'About 1,900 m',
    highlights: [
      'Rows of carved megalithic stelae',
      'Symbols of swords and geometric forms',
      'Interpretation of the burial landscape',
      'Easy combination with Adadi Mariam',
    ],
    paragraphs: [
      'Tiya is compact but compelling. More than thirty standing stones carry repeated symbols, yet the people who placed them left no written explanation, making careful archaeological interpretation essential.',
      'We usually combine the site with other heritage south of Addis, giving it enough context to feel like part of a larger historical landscape rather than an isolated stop.',
    ],
    span: 'lg:col-span-6',
  },
  {
    slug: 'debre-libanos',
    name: 'Debre Libanos Monastery',
    region: 'Oromia',
    tag: 'Sacred Heritage',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801363/debre-libanos.png',
    teaser:
      'A major Orthodox monastery set above the immense gorge of the Blue Nile.',
    intro:
      'Founded in the thirteenth century, Debre Libanos remains one of Ethiopia’s most important monasteries and a rewarding excursion through the highlands north of Addis Ababa.',
    bestTime: 'October – May',
    duration: '1 day',
    altitude: 'About 2,450 m',
    highlights: [
      'The modern church and stained-glass windows',
      'Cave and spring associated with Saint Tekle Haymanot',
      'Views into the Jemma River Gorge',
      'The historic Portuguese Bridge nearby',
    ],
    paragraphs: [
      'Debre Libanos combines living faith with a dramatic natural setting. Pilgrims arrive throughout the year, and the monastery’s history reaches far beyond the buildings visible today.',
      'The day continues to viewpoints over the Jemma Gorge, where geladas and raptors are sometimes seen, creating an unusually rich cultural and landscape excursion from the capital.',
    ],
    span: 'lg:col-span-7',
  },
  {
    slug: 'dire-dawa',
    name: 'Dire Dawa',
    region: 'Eastern Ethiopia',
    tag: 'Railway City',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801349/dire-dawa.png',
    teaser:
      'Railway heritage, colorful markets and a warm lowland gateway to Harar.',
    intro:
      'Dire Dawa grew around the historic railway between Addis Ababa and Djibouti, creating a distinctive eastern city shaped by trade, migration and several architectural eras.',
    bestTime: 'October – February',
    duration: '1 day',
    altitude: '1,276 m',
    highlights: [
      'The historic railway station and old quarter',
      'Kafira market and spice trading',
      'French-influenced streets and architecture',
      'Convenient connection with Harar',
    ],
    paragraphs: [
      'Dire Dawa has a different rhythm from the highland capitals. Its broad streets, railway compounds and active markets tell the story of Ethiopia’s twentieth-century connections to the coast.',
      'Most journeys pair it with Harar, but a guided day here adds valuable context and reveals a city with an identity far beyond its airport and railway.',
    ],
    span: 'lg:col-span-5',
  },
  {
    slug: 'adadi-mariam',
    name: 'Adadi Mariam Rock-Hewn Church',
    region: 'Oromia',
    tag: 'Sacred Heritage',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801355/adadi-mariam.png',
    teaser:
      'A quietly active rock-hewn sanctuary hidden in the countryside south of Addis.',
    intro:
      'Often described as the southern counterpart to Lalibela’s churches, Adadi Mariam is a working monolithic church traditionally associated with King Lalibela.',
    bestTime: 'October – May',
    duration: 'Half day',
    altitude: 'About 1,900 m',
    highlights: [
      'Rock-cut chambers and surrounding trenches',
      'Active Ethiopian Orthodox worship',
      'Rural landscapes south of Addis Ababa',
      'Natural pairing with the Tiya stelae',
    ],
    paragraphs: [
      'Adadi Mariam is modest in scale but intimate in atmosphere. Descending into its rock-cut court reveals a church that remains woven into the religious life of the surrounding community.',
      'It works especially well alongside Tiya, connecting two very different forms of heritage on a full-day journey through the countryside south of the capital.',
    ],
    span: 'lg:col-span-6',
  },
]

export const tourCategories = [
  'Historic & Religious',
  'Cultural',
  'Nature & Wildlife',
  'Trekking',
  'Adventure',
  'Festivals',
  'Grand Journeys',
] as const

export type TourCategory = (typeof tourCategories)[number]

export type Tour = {
  popularityRank: number
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
  categories: TourCategory[]
  featured?: boolean
}

const tourCatalog: Tour[] = [
  {
    popularityRank: 1,
    slug: 'the-historic-route',
    title: 'Classic Historic North',
    image: '/images/gondar.png',
    days: '11 Days',
    nights: 10,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser:
      'Follow the pilgrimage of kings from the castles of Gondar to the rock churches of Lalibela.',
    summary:
      'The definitive northern circuit, linking island monasteries, imperial castles, mountain escarpments and living rock-hewn churches in one carefully paced journey.',
    includes: [
      'All domestic flights within Ethiopia',
      'Private 4x4 with a senior driver-guide',
      'Scholar-guides at Lalibela, Aksum and Gondar',
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
        title: 'Aksum',
        text: 'Stelae field, the Chapel of the Tablet, and the Queen of Sheba’s bath with an archaeologist.',
      },
      {
        day: 'Day 11',
        title: 'Addis & Departure',
        text: 'A last coffee ceremony, a day room at the airport hotel, and an evening flight home.',
      },
    ],
    places: [
      'Addis Ababa',
      'Bahir Dar',
      'Lake Tana',
      'Gondar',
      'Simien Mountains National Park',
      'Lalibela',
      'Aksum',
    ],
    categories: ['Historic & Religious', 'Cultural'],
    featured: true,
  },
  {
    popularityRank: 4,
    slug: 'bale-mountains-and-sof-omar',
    title: 'Bale Mountains & Sof Omar Adventure',
    image: '/images/bale-gelada.png',
    days: '6 Days',
    nights: 5,
    style: 'Adventure · Private',
    season: 'Nov – Apr',
    from: 'Custom quote',
    group: '2 – 6 guests',
    teaser:
      'Track Ethiopian wolves on the Sanetti Plateau, descend into Harenna Forest and walk the limestone chambers of Sof Omar.',
    summary:
      'A focused southeastern adventure combining Ethiopia’s richest Afro-alpine wildlife habitat with one of Africa’s most remarkable cave systems.',
    includes: [
      'Private 4x4 transport from Addis Ababa',
      'Resident naturalist and endemics specialist',
      'National park fees, scouts and permits',
      'Comfortable lodges in Dinsho and the Bale highlands',
      'Full board on trekking days',
      'Walking poles and daypack loan',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Technical caving equipment beyond the standard route',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Meet your naturalist, review the route and prepare for the highlands over dinner.',
      },
      {
        day: 'Day 2',
        title: 'Addis to Dinsho',
        text: 'Drive southeast into the Bale highlands, arriving in time to look for mountain nyala near park headquarters.',
      },
      {
        day: 'Day 5',
        title: 'Sanetti Plateau',
        text: 'Cross the Afro-alpine plateau with an endemic-wildlife specialist, watching for Ethiopian wolves and giant mole-rats.',
      },
      {
        day: 'Day 4',
        title: 'Harenna Forest',
        text: 'Descend through heather and cloud forest for coffee under the canopy, primates and forest birding.',
      },
      {
        day: 'Day 5',
        title: 'Sof Omar Cave',
        text: 'Follow the Web River through monumental limestone chambers with a local guide and proper lighting.',
      },
      {
        day: 'Day 6',
        title: 'Return to Addis Ababa',
        text: 'Travel back to the capital with lunch and landscape stops along the way.',
      },
    ],
    places: ['Addis Ababa', 'Bale Mountains National Park', 'Sof Omar Cave'],
    categories: ['Nature & Wildlife', 'Trekking', 'Adventure'],
    featured: true,
  },
  {
    popularityRank: 12,
    slug: 'ethiopia-coffee-origins',
    title: 'Ethiopia Coffee Origins Journey',
    image: '/images/coffee-ceremony.png',
    days: '7 Days',
    nights: 6,
    style: 'Slow Travel · Private',
    season: 'Year-round',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser:
      'Follow coffee from Addis roasteries to the farms and forests of Jimma, Kaffa and Sidama.',
    summary:
      'A slow journey into Ethiopia’s coffee landscapes, combining forest ecology, family hospitality, farm visits and the rituals surrounding every cup.',
    includes: [
      'Private vehicle and specialist coffee guide',
      'Farm-to-cup immersion in Jimma and Kaffa',
      'Hosted coffee ceremonies with farming families',
      'Two nights in a forest eco-lodge',
      'All breakfasts and selected hosted meals',
      'Barista-led cupping session in Addis',
    ],
    excludes: [
      'International flights and visa fees',
      'Travel insurance (mandatory)',
      'Coffee purchases and international shipping',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrive Addis Ababa',
        text: 'Begin with a guided cupping and an introduction to Ethiopia’s coffee regions and processing traditions.',
      },
      {
        day: 'Days 2 – 3',
        title: 'Jimma coffee country',
        text: 'Travel southwest for farm walks, washing-station visits and conversations with growers and roasters.',
      },
      {
        day: 'Days 4 – 6',
        title: 'Kaffa & Bonga forests',
        text: 'Wild coffee under the canopy, harvest and roast with a farming family, and nights in the forest.',
      },
      {
        day: 'Day 7',
        title: 'Sidama & departure',
        text: 'Close with a Sidama coffee experience before returning to Addis for your onward journey.',
      },
    ],
    places: ['Addis Ababa', 'Jimma', 'Kaffa', 'Bonga Forest', 'Hawassa'],
    categories: ['Cultural', 'Nature & Wildlife'],
  },
  {
    popularityRank: 3,
    slug: 'danakil-expedition',
    title: 'Danakil Depression & Erta Ale Expedition',
    image: '/images/danakil.png',
    days: '4 Days',
    nights: 3,
    style: 'Expedition · Small Group',
    season: 'Nov – Feb',
    from: 'Custom quote',
    group: '2 – 6 guests',
    teaser:
      'Sulphur springs, a permanent lava lake, and salt caravans on the white plain.',
    summary:
      'A compact supported expedition into salt flats, geothermal fields and the volcanic landscapes of the Afar lowlands.',
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
        title: 'Enter the Afar lowlands',
        text: 'Meet the expedition team at the confirmed seasonal gateway and descend toward the salt plain.',
      },
      {
        day: 'Day 2',
        title: 'Dallol & Lake Assale',
        text: 'Sulphur terraces at first light, salt caravans in the afternoon, camp on the plain.',
      },
      {
        day: 'Day 3',
        title: 'Erta Ale',
        text: 'Night ascent to the caldera rim and the lava lake, sleeping on the volcano.',
      },
      {
        day: 'Day 4',
        title: 'Return from the desert',
        text: 'Break camp and return to the operational gateway for your onward connection.',
      },
    ],
    places: ['Danakil Depression', 'Dallol', 'Lake Assale', 'Erta Ale'],
    categories: ['Adventure', 'Nature & Wildlife'],
    featured: true,
  },
  {
    popularityRank: 2,
    slug: 'omo-valley-immersion',
    title: 'Omo Valley Cultural Discovery',
    image: '/images/omo-valley.png',
    days: '10 Days',
    nights: 9,
    style: 'Cultural · Private',
    season: 'Jun – Sep, Dec – Mar',
    from: 'Custom quote',
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
    places: ['Addis Ababa', 'Hawassa', 'Arba Minch', 'Dorze', 'Konso', 'Omo Valley', 'Turmi', 'Dimeka', 'Mursi Highlands', 'Karo'],
    categories: ['Cultural', 'Adventure'],
    featured: true,
  },
  {
    popularityRank: 14,
    slug: 'timkat-festival-journey',
    title: 'Timkat Festival Journey',
    image: '/images/festival-timkat.png',
    days: '8 Days',
    nights: 7,
    style: 'Festival · Private',
    season: 'January only',
    from: 'Custom quote',
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
    categories: ['Festivals', 'Historic & Religious'],
  },
  {
    popularityRank: 5,
    slug: 'simien-mountains-trek',
    title: 'Simien Mountains Trek',
    image: '/images/hero-simien.png',
    days: '5 Days',
    nights: 4,
    style: 'Trekking · Private',
    season: 'Oct – Apr',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'Walk the escarpment among geladas, waterfalls and vast highland views.',
    summary: 'A focused trek from Gondar into Simien Mountains National Park, with flexible walking distances, park scouts and serviced camps or lodge stays.',
    includes: ['Private transport from Gondar', 'Park fees, scout and trekking guide', 'Lodge or serviced-camp accommodation', 'Full board in the national park', 'Walking poles on request'],
    excludes: ['International and domestic flights', 'Travel insurance (mandatory)', 'Optional Ras Dashen extension'],
    itinerary: [
      { day: 'Day 1', title: 'Gondar', text: 'Meet your guide, explore the royal enclosure and prepare for the mountains.' },
      { day: 'Day 2', title: 'Sankaber escarpment', text: 'Enter the park for a first rim walk, gelada encounters and views toward Jinbar Falls.' },
      { day: 'Day 3', title: 'Geech highlands', text: 'Walk through giant-lobelia country and open grasslands to the highland camp or lodge.' },
      { day: 'Day 4', title: 'Imet Gogo', text: 'Reach the great escarpment viewpoints on a full day tailored to your preferred distance.' },
      { day: 'Day 5', title: 'Return to Gondar', text: 'A final morning walk before driving back to Gondar for onward travel.' },
    ],
    places: ['Gondar', 'Simien Mountains National Park'],
    categories: ['Trekking', 'Nature & Wildlife', 'Adventure'],
    featured: true,
  },
  {
    popularityRank: 6,
    slug: 'lalibela-sacred-journey',
    title: 'Lalibela Sacred Journey',
    image: '/images/lalibela.png',
    days: '4 Days',
    nights: 3,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'Four unhurried days of rock-hewn churches, liturgy and mountain monasteries.',
    summary: 'A short, immersive Lalibela program for travelers who want depth without taking the full northern circuit.',
    includes: ['Return domestic flights from Addis', 'Private transfers and accommodation', 'Scholar-guide throughout Lalibela', 'Church and monastery entrance fees', 'Daily breakfast'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Lunches, dinners and gratuities'],
    itinerary: [
      { day: 'Day 1', title: 'Addis to Lalibela', text: 'Fly north, settle into the highlands and visit a viewpoint above the Lasta Mountains.' },
      { day: 'Day 2', title: 'Northern church cluster', text: 'Begin around the morning liturgy and explore the passages around Bete Medhane Alem and Bete Maryam.' },
      { day: 'Day 3', title: 'Southern churches & monastery', text: 'Continue through the southern cluster and choose Asheton Maryam or Yemrehanna Kristos.' },
      { day: 'Day 4', title: 'Return to Addis', text: 'A quiet morning and airport transfer for the flight back to the capital.' },
    ],
    places: ['Addis Ababa', 'Lalibela'],
    categories: ['Historic & Religious', 'Cultural'],
  },
  {
    popularityRank: 7,
    slug: 'grand-ethiopia-highlights',
    title: 'Grand Ethiopia Highlights',
    image: '/images/luxury-lodge.png',
    days: '18 Days',
    nights: 17,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'The historic north, eastern cities, southern cultures and highland wildlife in one grand journey.',
    summary: 'Our broadest introduction to Ethiopia, using domestic flights and carefully chosen road sectors to connect the country’s defining histories, cultures and landscapes.',
    includes: ['Domestic flights and private 4x4 transport', 'Specialist local guides by region', 'Boutique hotels, lodges and best available rooms', 'All breakfasts and selected meals', 'Entrance fees and community arrangements', '24/7 in-country support'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Optional Danakil extension'],
    itinerary: [
      { day: 'Days 1 – 2', title: 'Addis Ababa', text: 'Museums, Entoto, food and a route briefing in the capital.' },
      { day: 'Days 3 – 7', title: 'Historic North', text: 'Lake Tana, Gondar, the Simien escarpment and Lalibela’s rock-hewn churches.' },
      { day: 'Days 8 – 10', title: 'Harar & Dire Dawa', text: 'Fly east for railway heritage, Harari homes, markets and the lanes of Harar Jugol.' },
      { day: 'Days 11 – 13', title: 'Bale Mountains', text: 'Track Ethiopian wolves, cross Sanetti and descend into Harenna Forest.' },
      { day: 'Days 14 – 17', title: 'Southern cultures', text: 'Continue through Arba Minch, Dorze and Konso toward selected Omo Valley communities.' },
      { day: 'Day 18', title: 'Addis & departure', text: 'Return to the capital for a farewell meal and onward flight.' },
    ],
    places: ['Addis Ababa', 'Bahir Dar', 'Lake Tana', 'Gondar', 'Simien Mountains National Park', 'Lalibela', 'Dire Dawa', 'Harar Jugol', 'Bale Mountains National Park', 'Arba Minch', 'Dorze', 'Konso', 'Omo Valley'],
    categories: ['Grand Journeys', 'Cultural', 'Nature & Wildlife', 'Adventure'],
    featured: true,
  },
  {
    popularityRank: 8,
    slug: 'historic-north-and-danakil',
    title: 'Historic North & Danakil Adventure',
    image: '/images/danakil.png',
    days: '14 Days',
    nights: 13,
    style: 'Expedition · Private',
    season: 'Nov – Feb',
    from: 'Custom quote',
    group: '2 – 6 guests',
    teaser: 'From island monasteries and ancient capitals to salt flats and a living volcano.',
    summary: 'A high-contrast northern journey combining Ethiopia’s historic circuit with a fully supported Danakil expedition, subject to seasonal access.',
    includes: ['Domestic flights and private transport', 'Historic-site scholar guides', 'Afar permits and expedition support', 'Hotels, lodges and expedition camp', 'Most meals in the Danakil'],
    excludes: ['International flights and visa fees', 'Travel insurance with evacuation cover', 'Gratuities and personal expenses'],
    itinerary: [
      { day: 'Days 1 – 2', title: 'Addis Ababa', text: 'Arrival, museums and an expedition briefing.' },
      { day: 'Days 3 – 8', title: 'Historic circuit', text: 'Travel through Bahir Dar, Gondar, the Simien Mountains and Lalibela.' },
      { day: 'Days 9 – 10', title: 'Aksum', text: 'Explore the stelae, tombs and sacred traditions of the ancient capital when access permits.' },
      { day: 'Days 11 – 13', title: 'Danakil Depression', text: 'Salt flats, Dallol and an overnight approach to Erta Ale with the expedition team.' },
      { day: 'Day 14', title: 'Return to Addis', text: 'Fly or drive from the confirmed gateway to the capital for departure.' },
    ],
    places: ['Addis Ababa', 'Bahir Dar', 'Lake Tana', 'Gondar', 'Simien Mountains National Park', 'Lalibela', 'Aksum', 'Danakil Depression', 'Erta Ale'],
    categories: ['Historic & Religious', 'Adventure'],
  },
  {
    popularityRank: 9,
    slug: 'historic-north-and-omo-valley',
    title: 'Historic North & Omo Valley',
    image: '/images/gondar.png',
    days: '15 Days',
    nights: 14,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'A sweeping cultural route from northern kingdoms to the communities of southern Ethiopia.',
    summary: 'Two of Ethiopia’s essential cultural regions in one itinerary, connected by domestic flights and guided with context, consent and time.',
    includes: ['Domestic flights and private 4x4', 'Scholar and cultural-mediator guides', 'Hotels, lodges and selected tented camps', 'Community fees and entrance tickets', 'Breakfasts and full board in the south'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Personal gifts and purchases'],
    itinerary: [
      { day: 'Days 1 – 2', title: 'Addis Ababa', text: 'Arrival, museums and an introduction to Ethiopia’s cultural geography.' },
      { day: 'Days 3 – 8', title: 'Historic North', text: 'Lake Tana, Gondar and Lalibela with private guiding around the hours that matter.' },
      { day: 'Days 9 – 10', title: 'Hawassa & Arba Minch', text: 'Travel south through the Rift Valley to Lake Chamo and the Dorze highlands.' },
      { day: 'Days 11 – 14', title: 'Konso & Omo Valley', text: 'Terraced landscapes, market days and locally arranged community visits.' },
      { day: 'Day 15', title: 'Return to Addis', text: 'Fly north for a farewell meal and onward travel.' },
    ],
    places: ['Addis Ababa', 'Bahir Dar', 'Lake Tana', 'Gondar', 'Lalibela', 'Hawassa', 'Arba Minch', 'Dorze', 'Konso', 'Omo Valley'],
    categories: ['Grand Journeys', 'Historic & Religious', 'Cultural'],
  },
  {
    popularityRank: 10,
    slug: 'harar-and-dire-dawa',
    title: 'Harar & Dire Dawa Cultural Journey',
    image: '/images/textile.png',
    days: '4 Days',
    nights: 3,
    style: 'Cultural · Private',
    season: 'Oct – Mar',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'Railway heritage, Harari homes, old-city lanes and the trading cultures of the east.',
    summary: 'A short eastern journey pairing Dire Dawa’s railway story with the living Islamic heritage, markets and domestic architecture of Harar Jugol.',
    includes: ['Return flights or rail connection from Addis', 'Private vehicle and local guides', 'Three nights accommodation', 'All entrance fees', 'Daily breakfast'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Lunches, dinners and gratuities'],
    itinerary: [
      { day: 'Day 1', title: 'Addis to Dire Dawa', text: 'Arrive in the east and explore the railway quarter and Kafira market.' },
      { day: 'Day 2', title: 'Harar Jugol', text: 'Walk the old gates, markets, museums and traditional Harari homes with a resident guide.' },
      { day: 'Day 3', title: 'Harar & Aweday', text: 'Meet artisans, visit the regional market and learn the context of the evening hyena tradition.' },
      { day: 'Day 4', title: 'Return to Addis', text: 'Morning transfer to Dire Dawa for the onward connection.' },
    ],
    places: ['Addis Ababa', 'Dire Dawa', 'Harar Jugol'],
    categories: ['Cultural', 'Historic & Religious'],
  },
  {
    popularityRank: 11,
    slug: 'rift-valley-southern-highlands',
    title: 'Rift Valley Lakes & Southern Highlands',
    image: '/images/omo-valley.png',
    days: '7 Days',
    nights: 6,
    style: 'Slow Travel · Private',
    season: 'Oct – May',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'Lakeside cities, highland villages and southern landscapes at a comfortable pace.',
    summary: 'A gentler southern route through Hawassa, Arba Minch, Dorze and Konso for travelers who want nature and culture without the longer Lower Omo expedition.',
    includes: ['Private 4x4 and driver-guide', 'Six nights accommodation', 'Lake Chamo boat excursion', 'Local guides in Dorze and Konso', 'Daily breakfast'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Most lunches and dinners'],
    itinerary: [
      { day: 'Day 1', title: 'Addis to Hawassa', text: 'Drive through the Rift Valley with a lakeside afternoon in Hawassa.' },
      { day: 'Day 2', title: 'Hawassa', text: 'Birding, the fish market and a Sidama coffee experience.' },
      { day: 'Days 3 – 4', title: 'Arba Minch & Dorze', text: 'Lake Chamo wildlife, forest springs and a locally hosted Dorze visit.' },
      { day: 'Days 5 – 6', title: 'Konso', text: 'Explore the terraced cultural landscape and a traditional walled settlement.' },
      { day: 'Day 7', title: 'Return to Addis', text: 'Fly or drive north according to the final itinerary.' },
    ],
    places: ['Addis Ababa', 'Hawassa', 'Arba Minch', 'Dorze', 'Konso'],
    categories: ['Nature & Wildlife', 'Cultural'],
  },
  {
    popularityRank: 13,
    slug: 'addis-ababa-central-highlands',
    title: 'Addis Ababa & Central Highlands',
    image: '/images/addis-skyline.png',
    days: '5 Days',
    nights: 4,
    style: 'Cultural · Private',
    season: 'Oct – May',
    from: 'Custom quote',
    group: '2 – 8 guests',
    teaser: 'The capital, sacred highlands, a crater lake and archaeology within one compact route.',
    summary: 'An accessible five-day journey centered on Addis Ababa with day trips to Debre Libanos, Wonchi, Tiya and Adadi Mariam.',
    includes: ['Four nights in Addis Ababa', 'Private vehicle and specialist guides', 'All listed entrance fees', 'Wonchi local guide and boat', 'Daily breakfast'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Lunches, dinners and gratuities'],
    itinerary: [
      { day: 'Day 1', title: 'Addis Ababa', text: 'Museums, Holy Trinity Cathedral, Entoto and a welcome coffee ceremony.' },
      { day: 'Day 2', title: 'Debre Libanos', text: 'Visit the monastery, Portuguese Bridge and viewpoints over the Jemma Gorge.' },
      { day: 'Day 3', title: 'Wonchi Crater Lake', text: 'Descend into the caldera on foot or horseback and cross to the island monastery.' },
      { day: 'Day 4', title: 'Tiya & Adadi Mariam', text: 'Combine the carved stelae field with the rock-hewn church south of Addis.' },
      { day: 'Day 5', title: 'Addis & departure', text: 'Markets, galleries or a relaxed final meal before transfer to the airport.' },
    ],
    places: ['Addis Ababa', 'Debre Libanos Monastery', 'Wonchi Crater Lake', 'Tiya Archaeological Site', 'Adadi Mariam Rock-Hewn Church'],
    categories: ['Cultural', 'Historic & Religious', 'Nature & Wildlife'],
  },
  {
    popularityRank: 15,
    slug: 'genna-in-lalibela',
    title: 'Genna in Lalibela',
    image: '/images/hero-lalibela.png',
    days: '4 Days',
    nights: 3,
    style: 'Festival · Private',
    season: 'January only',
    from: 'Custom quote',
    group: '2 – 10 guests',
    teaser: 'Ethiopian Christmas among candlelit processions and white-robed pilgrims in Lalibela.',
    summary: 'A fixed-date festival journey designed around Genna’s vigils and ceremonies, with rooms and guiding reserved well in advance.',
    includes: ['Return domestic flights from Addis', 'Three nights accommodation', 'Festival scholar-guide', 'All church entrance fees', 'Daily breakfast and festival refreshments'],
    excludes: ['International flights and visa fees', 'Travel insurance (mandatory)', 'Most lunches and dinners'],
    itinerary: [
      { day: 'Day 1', title: 'Arrive Lalibela', text: 'Fly from Addis, settle in and receive an introduction to the festival calendar.' },
      { day: 'Day 2', title: 'Rock-hewn churches', text: 'Explore the church clusters before festival crowds gather.' },
      { day: 'Day 3', title: 'Genna vigil', text: 'Follow processions and ceremonies with carefully planned rest and viewing times.' },
      { day: 'Day 4', title: 'Christmas morning & return', text: 'Experience the morning celebrations before the return flight to Addis.' },
    ],
    places: ['Addis Ababa', 'Lalibela'],
    categories: ['Festivals', 'Historic & Religious'],
  },
]

export const tours = tourCatalog.slice().sort((a, b) => a.popularityRank - b.popularityRank)

export type LayoverPackage = {
  slug: string
  hours: string
  minimumConnection: string
  packageType: 'layover' | 'stopover'
  title: string
  price: string
  image: string
  teaser: string
  itinerary: string[]
  includes: string[]
  excludes: string[]
  best: string
}

export const layoverPackages: LayoverPackage[] = [
  {
    slug: 'addis-highlights-layover',
    hours: 'About 4 hours',
    minimumConnection: '8–10 hours',
    packageType: 'layover',
    title: 'Addis Highlights Layover',
    price: 'Custom quote',
    image: '/images/addis-skyline.png',
    teaser: 'A carefully timed introduction to Addis Ababa with a highland viewpoint, city landmarks and Ethiopian coffee.',
    itinerary: [
      'Meet after immigration and confirm the return schedule',
      'Drive to Entoto for a city panorama when conditions allow',
      'Follow a flexible landmark loop through central Addis Ababa',
      'Pause for an Ethiopian coffee experience',
      'Return to Bole with the agreed international check-in buffer',
    ],
    includes: [
      'Airport pickup and return transfer',
      'Private vehicle and English-speaking guide',
      'Itinerary planning around confirmed flight times',
    ],
    excludes: ['Ethiopian visa and travel insurance', 'Personal purchases, tips and unlisted services', 'Meals and entrance fees unless confirmed in your quote'],
    best: 'First-time visitors with a daytime connection',
  },
  {
    slug: 'addis-culture-and-coffee',
    hours: 'About 5–6 hours',
    minimumConnection: '10–12 hours',
    packageType: 'layover',
    title: 'Addis Culture & Coffee',
    price: 'Custom quote',
    image: '/images/coffee-ceremony.png',
    teaser: 'A deeper look at the capital through a museum or cultural site, local craft traditions, lunch and coffee.',
    itinerary: [
      'Meet at Bole and review traffic and opening hours',
      'Visit the National Museum or the best available cultural alternative',
      'Explore a craft, textile or historic quarter with your guide',
      'Enjoy a traditional Ethiopian meal',
      'Finish with coffee before the timed airport return',
    ],
    includes: [
      'Airport pickup and return transfer',
      'Private vehicle and English-speaking guide',
      'Itinerary planning around confirmed flight times',
    ],
    excludes: ['Ethiopian visa and travel insurance', 'Personal purchases, tips and unlisted services', 'Meals and entrance fees unless confirmed in your quote'],
    best: 'Travellers who want culture, history and food in one visit',
  },
  {
    slug: 'full-day-addis-experience',
    hours: 'About 8–9 hours',
    minimumConnection: '14–18 hours',
    packageType: 'layover',
    title: 'Full-Day Addis Experience',
    price: 'Custom quote',
    image: '/images/textile.png',
    teaser: 'A flexible full day combining Addis Ababa’s viewpoints, heritage, neighbourhoods, cuisine and coffee culture.',
    itinerary: [
      'Airport welcome and a route check based on the day’s conditions',
      'Begin at Entoto or another panoramic city viewpoint',
      'Visit selected museums, monuments or places of worship that are open',
      'Explore a market or artisan district with your private guide',
      'Take time for lunch and an Ethiopian coffee ceremony',
      'Optional day-room stop when requested and available',
      'Return to Bole with the agreed check-in buffer',
    ],
    includes: [
      'Airport pickup and return transfer',
      'Private vehicle and English-speaking guide',
      'Itinerary planning around confirmed flight times',
    ],
    excludes: ['Ethiopian visa and travel insurance', 'Personal purchases, tips and unlisted services', 'Meals and entrance fees unless confirmed in your quote', 'Hotel day room unless included in the confirmed quote'],
    best: 'Long daytime connections with room for a relaxed city visit',
  },
  {
    slug: 'addis-evening-experience',
    hours: 'About 4–5 hours',
    minimumConnection: '8–12 hours',
    packageType: 'layover',
    title: 'Addis Evening Experience',
    price: 'Custom quote',
    image: '/images/addis-skyline.png',
    teaser: 'An after-hours alternative built around Ethiopian food, coffee, music and Addis Ababa after dark.',
    itinerary: [
      'Meet after immigration and confirm the evening schedule',
      'Take a short illuminated city drive or viewpoint stop',
      'Enjoy an Ethiopian dinner selected for your preferences',
      'Experience coffee and an optional cultural performance when available',
      'Return to Bole with the agreed check-in buffer',
    ],
    includes: [
      'Airport pickup and return transfer',
      'Private vehicle and English-speaking guide',
      'Itinerary planning around confirmed flight times',
    ],
    excludes: ['Ethiopian visa and travel insurance', 'Personal purchases, tips and unlisted services', 'Meals and entrance fees unless confirmed in your quote'],
    best: 'Evening arrivals when museums and daytime attractions are closed',
  },
  {
    slug: 'overnight-addis-and-highlands',
    hours: 'One night',
    minimumConnection: '24–36 hours',
    packageType: 'layover',
    title: 'Overnight Addis & Highlands',
    price: 'Custom quote',
    image: '/images/luxury-lodge.png',
    teaser: 'Rest overnight, then explore Addis or make a carefully timed highland excursion before returning to Bole.',
    itinerary: ['Airport welcome and private hotel transfer', 'Dinner or rest according to your arrival time', 'Choose an Addis morning or a highland excursion after a route and weather check', 'Lunch and a flexible final stop', 'Return to Bole with the agreed international departure buffer'],
    includes: ['Airport pickup and return transfer', 'Private vehicle and English-speaking guide', 'Itinerary planning around confirmed flight times'],
    excludes: ['Ethiopian visa and travel insurance', 'Personal purchases, tips and unlisted services', 'Meals and entrance fees unless confirmed in your quote', 'Accommodation unless included in the confirmed quote'],
    best: 'Overnight connections that allow a hotel stay and a flexible second day',
  },
  {
    slug: 'lalibela-stopover-extension',
    hours: 'Two nights',
    minimumConnection: '60–72 hours minimum',
    packageType: 'stopover',
    title: 'Lalibela Stopover Extension',
    price: 'Custom quote',
    image: '/images/lalibela.png',
    teaser: 'Turn a multi-day stopover into a privately guided visit to Lalibela, subject to domestic schedules and a safe onward-flight buffer.',
    itinerary: ['Arrive in Addis and review the confirmed domestic-flight plan', 'Fly to Lalibela and meet your local guide', 'Explore the rock-hewn church groups around opening and service times', 'Stay overnight in Lalibela and continue the visit the next morning', 'Fly back to Addis with a pre-agreed buffer before the onward journey'],
    includes: ['Airport pickup and return transfer', 'Private vehicle and English-speaking guide', 'Itinerary planning around confirmed flight times'],
    excludes: ['Ethiopian visa and travel insurance', 'Personal purchases, tips and unlisted services', 'Meals and entrance fees unless confirmed in your quote', 'Domestic flights and accommodation unless included in the confirmed quote'],
    best: 'Planned stopovers of at least 60–72 hours with flexible onward travel',
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

export type TourPlaceInsight = {
  name: string
  region: string
  status: string
  image: string
  bestMoment: string
  context: string
  experience: string
  logistics: string
}

const placeInsights: TourPlaceInsight[] = [
  {
    name: 'Addis Ababa',
    region: 'Central Highlands',
    status: 'Capital gateway',
    image: '/images/addis-skyline.png',
    bestMoment: 'Entoto light, museum mornings and a first coffee ceremony',
    context:
      'Addis Ababa is the usual point of arrival and the best place to frame Ethiopia before travelling outward. The city connects deep human history, Orthodox heritage, modern galleries, coffee culture and the working rhythm of the country.',
    experience:
      'A strong day balances the National Museum, Entoto viewpoints, a market or craft district, a traditional meal and time with a guide who can explain how the capital relates to the regions ahead.',
    logistics:
      'Traffic and opening hours shape the day. We use Addis for soft arrivals, route briefings, premium hotel stays and recovery nights between domestic flights.',
  },
  {
    name: 'Bahir Dar',
    region: 'Amhara',
    status: 'Lake Tana gateway',
    image: '/images/lake-tana.png',
    bestMoment: 'Early private boat departures before the lake traffic builds',
    context:
      'Bahir Dar is the relaxed lakeside base for Lake Tana monasteries and the Blue Nile Falls. It brings water, gardens and a gentler tempo into the northern historic circuit.',
    experience:
      'The strongest visits move by private boat to selected island monasteries, then continue to viewpoints, local restaurants or the falls when seasonal water levels make the excursion worthwhile.',
    logistics:
      'It pairs naturally with Gondar by road. Lake conditions, monastery access rules and seasonal flow at the falls are checked before the final schedule is confirmed.',
  },
  {
    name: 'Lake Tana',
    region: 'Amhara',
    status: 'Monastic lake heritage',
    image: '/images/lake-tana.png',
    bestMoment: 'Morning boat crossings to painted round churches',
    context:
      'Ethiopia’s largest lake holds island and peninsula monasteries associated with manuscripts, murals and centuries of Orthodox scholarship. It is also the source region of the Blue Nile.',
    experience:
      'Travel is by private boat, with guiding focused on church art, monastic etiquette and the lived religious setting rather than treating the lake as a simple sightseeing stop.',
    logistics:
      'Some monasteries have gender-based entry restrictions. We choose the right combination before travel and leave room for weather on the water.',
  },
  {
    name: 'Gondar',
    region: 'Amhara',
    status: 'UNESCO imperial city',
    image: '/images/gondar.png',
    bestMoment: 'Late light on Fasil Ghebbi and quiet church interiors',
    context:
      'Gondar became a permanent royal capital in the 17th century and is known for Fasil Ghebbi, a walled palace compound of castles, royal buildings and churches shaped by Ethiopian, regional and European influences.',
    experience:
      'A well-paced visit includes the royal enclosure, Debre Berhan Selassie, Fasilides’ Bath and selected viewpoints or palace remains outside the main compound.',
    logistics:
      'Gondar is the natural staging point for the Simien Mountains. During Timkat, rooms and viewing arrangements must be secured far in advance.',
  },
  {
    name: 'Simien Mountains National Park',
    region: 'Northern Highlands',
    status: 'UNESCO natural site',
    image: '/images/hero-simien.png',
    bestMoment: 'Escarpment walks with gelada troops in clear morning air',
    context:
      'The Simiens are a dramatic highland landscape of basalt escarpments, deep valleys and Afro-alpine habitat. The park is known for geladas, Walia ibex, lammergeiers and high mountain viewpoints.',
    experience:
      'Routes can be short scenic walks, lodge-based day hikes or longer supported treks. The best days protect sunrise, wildlife time and slow movement at altitude.',
    logistics:
      'Altitude, weather and road conditions matter. Park scouts and local guides are arranged, and walking distances are adjusted to fitness and acclimatization.',
  },
  {
    name: 'Lalibela',
    region: 'Lasta Highlands',
    status: 'UNESCO pilgrimage center',
    image: '/images/lalibela.png',
    bestMoment: 'Dawn liturgy and the first descent into the rock-cut passages',
    context:
      'Lalibela’s eleven medieval rock-hewn churches were carved from living stone and remain active places of worship. The site is central to Ethiopian Christianity and still draws pilgrims for major feast days.',
    experience:
      'The visit is strongest when timed around prayer, quieter church clusters, Bete Giyorgis, tunnel passages and optional mountain monasteries such as Asheton Maryam or Yemrehanna Kristos.',
    logistics:
      'Church opening patterns, services, footwear etiquette and festival crowds affect the sequence. A scholar-guide changes the quality of the visit significantly.',
  },
  {
    name: 'Aksum',
    region: 'Tigray',
    status: 'Ancient kingdom and UNESCO site',
    image: '/images/festival-timkat.png',
    bestMoment: 'A guided reading of the stelae field before the day warms',
    context:
      'Aksum marks the heart of an ancient kingdom that connected Africa, Arabia and the Greco-Roman world. Its stelae, tombs, inscriptions and sacred traditions carry enormous historical weight.',
    experience:
      'The route usually includes the Northern Stelae Field, tombs, inscriptions, Queen of Sheba traditions and the religious complex associated with St. Mary of Zion.',
    logistics:
      'Access and routing can change with regional conditions. We confirm flights, roads and site openings before including Aksum in a final itinerary.',
  },
  {
    name: 'Bale Mountains National Park',
    region: 'Oromia Highlands',
    status: 'UNESCO biodiversity landscape',
    image: '/images/bale-gelada.png',
    bestMoment: 'Sanetti Plateau wildlife watching and Harenna Forest descents',
    context:
      'Bale protects Africa’s largest Afro-alpine habitat above 3,000 meters and the Harenna Forest below. It is a key refuge for Ethiopian wolves, mountain nyala, Bale monkeys, endemic birds and wild forest coffee.',
    experience:
      'The most rewarding journeys combine Dinsho wildlife, Sanetti Plateau crossings, forest walks, birding and time to understand the park’s water, coffee and conservation value.',
    logistics:
      'The park works best with a 4x4, naturalist guiding and flexible timing for weather, altitude and wildlife movement.',
  },
  {
    name: 'Sof Omar Cave',
    region: 'Oromia',
    status: 'Limestone cave system',
    image: '/placeholder.jpg',
    bestMoment: 'Walking the Web River chambers with local cave guidance',
    context:
      'Sof Omar is a major limestone cave system cut by the Web River and valued for both geological scale and spiritual history. It is often paired with the Bale Mountains.',
    experience:
      'The visit focuses on high chambers, natural arches, river passages and local stories that explain why the site matters beyond geology.',
    logistics:
      'River levels and access conditions determine the safest route. Proper footwear, lighting and local guiding are essential.',
  },
  {
    name: 'Jimma',
    region: 'Western Highlands',
    status: 'Coffee origin region',
    image: '/images/coffee-ceremony.png',
    bestMoment: 'Farm walks, research context and private cupping sessions',
    context:
      'Jimma sits within Ethiopia’s western coffee country, where forest and smallholder systems help explain why Ethiopian Arabica is so regionally diverse.',
    experience:
      'Coffee-focused travel can include farms, cooperatives, processing discussions, drying practices, local markets and tasting sessions built around origin differences.',
    logistics:
      'Harvest timing, road conditions and meeting availability shape the route. Jimma can be reached by flight or scenic drive depending on the final design.',
  },
  {
    name: 'Kaffa',
    region: 'Southwest Ethiopia',
    status: 'Arabica heritage landscape',
    image: '/images/coffee-ceremony.png',
    bestMoment: 'Forest coffee walks and conversations on traceability',
    context:
      'Kaffa is widely associated with the birthplace story of Arabica coffee and remains important for forest coffee, biodiversity, cooperative production and cultural coffee knowledge.',
    experience:
      'A strong visit connects forest ecology, farming families, organic practices, cooperative leadership and the social meaning of coffee hospitality.',
    logistics:
      'Routes require careful driving time and realistic lodging expectations. We use Kaffa when guests want depth rather than a quick coffee demonstration.',
  },
  {
    name: 'Bonga Forest',
    region: 'Kaffa Zone',
    status: 'Forest coffee habitat',
    image: '/images/coffee-ceremony.png',
    bestMoment: 'Walking beneath the canopy where coffee grows in shade',
    context:
      'Bonga is a practical base for Kaffa forest coffee, rural hospitality and discussions around conservation, climate, livelihoods and specialty coffee value chains.',
    experience:
      'The experience is tactile: forest paths, roasting smoke, farm compounds, local meals and coffee prepared with the patience it receives at home.',
    logistics:
      'Best arranged with local contacts and a flexible vehicle plan, especially during rainy periods when roads can slow movement.',
  },
  {
    name: 'Hawassa',
    region: 'Sidama and Rift Valley',
    status: 'Lakeside city and coffee gateway',
    image: '/images/addis-skyline.png',
    bestMoment: 'Lake-edge mornings with birds, fish market life and coffee',
    context:
      'Hawassa is a comfortable Rift Valley stop and a useful gateway to Sidama coffee country, southern routes and lakeside birding.',
    experience:
      'Guests usually come for a softer travel day: lakefront walks, fish market energy, nearby coffee experiences and a pause between longer road sectors.',
    logistics:
      'It breaks the journey between Addis and Arba Minch or coffee regions. We use it to reduce fatigue and add a relaxed lakeside rhythm.',
  },
  {
    name: 'Danakil Depression',
    region: 'Afar Lowlands',
    status: 'Extreme expedition landscape',
    image: '/images/danakil.png',
    bestMoment: 'Dallol at first light and salt flats late in the day',
    context:
      'The Danakil Depression is one of Ethiopia’s most dramatic landscapes, combining salt plains, volcanic terrain, hydrothermal color fields and Afar salt-trading traditions.',
    experience:
      'It is less about conventional comfort and more about controlled expedition travel: mineral terraces, caravans, desert camps, night skies and the strange scale of a below-sea-level landscape.',
    logistics:
      'Heat, permits, security coordination and vehicle support are non-negotiable. We only run this route in suitable seasons and with experienced local teams.',
  },
  {
    name: 'Dallol',
    region: 'Afar Lowlands',
    status: 'Hydrothermal mineral field',
    image: '/images/danakil.png',
    bestMoment: 'Sunrise over sulphur, salt domes and acidic mineral pools',
    context:
      'Dallol is the Danakil’s most surreal visual landscape, with geothermal activity, salt formations and mineral color produced by an extreme volcanic environment.',
    experience:
      'The visit is slow and carefully guided, allowing time for wide landscapes, close textures, heat management and safe movement through fragile ground.',
    logistics:
      'Access depends on regional permissions, route conditions and heat. Early starts are essential for safety and photographic quality.',
  },
  {
    name: 'Lake Assale',
    region: 'Afar Lowlands',
    status: 'Salt lake and caravan plain',
    image: '/images/danakil.png',
    bestMoment: 'Late-afternoon salt workers, camel caravans and mirrored flats',
    context:
      'Lake Assale is a salt landscape where Afar extraction and caravan movement connect present-day travel to a long history of desert trade.',
    experience:
      'The strongest moments come with patience: watching salt cutting, loading, slow caravan movement and the light flattening across the white plain.',
    logistics:
      'The area is exposed, hot and remote. Water, shade planning, permits and experienced drivers matter more than speed.',
  },
  {
    name: 'Erta Ale',
    region: 'Afar Lowlands',
    status: 'Active shield volcano',
    image: '/images/danakil.png',
    bestMoment: 'Night approach to the caldera and stars over the lava field',
    context:
      'Erta Ale is an active volcanic system in the Afar region and one of the Danakil’s most demanding highlights, valued for its raw geology and night-time atmosphere.',
    experience:
      'The ascent is usually timed for cooler hours, with camp near the volcano and a guide-led approach to safe viewpoints according to current conditions.',
    logistics:
      'Volcanic activity, road access and safety restrictions change. We confirm the operating route close to departure and prepare guests honestly for basic camp conditions.',
  },
  {
    name: 'Arba Minch',
    region: 'Southern Rift',
    status: 'Lakes and escarpment base',
    image: '/images/omo-valley.png',
    bestMoment: 'Lake Chamo boat time and escarpment views over twin lakes',
    context:
      'Arba Minch overlooks Lakes Abaya and Chamo and works as the natural bridge between the Rift Valley, Dorze highlands, Konso and the Omo route.',
    experience:
      'The best stay includes a private Lake Chamo boat excursion, viewpoints, forest springs when suitable and enough rest before continuing south.',
    logistics:
      'It is a valuable overnight stop because it breaks long drives. Boat conditions and wildlife sightings are checked locally.',
  },
  {
    name: 'Dorze',
    region: 'Gamo Highlands',
    status: 'Weaving and highland culture',
    image: '/images/textile.png',
    bestMoment: 'Hosted weaving, enset food traditions and views above Arba Minch',
    context:
      'Dorze communities are known for skilled weaving, towering bamboo houses and highland agriculture centered on enset. The villages sit in cooler country above the Rift Valley lakes.',
    experience:
      'A thoughtful visit includes architecture, weaving, food preparation and conversation with local hosts rather than a brief roadside stop.',
    logistics:
      'Dorze combines naturally with Arba Minch. We arrange local guides and keep the visit paced respectfully around household availability.',
  },
  {
    name: 'Konso',
    region: 'Southern Ethiopia',
    status: 'UNESCO cultural landscape',
    image: '/placeholder.jpg',
    bestMoment: 'Walking terraced hills and walled villages with a local guide',
    context:
      'Konso is a cultural landscape of dry-stone terraces, fortified hilltop settlements, generation poles, community houses and carved waka memorial traditions.',
    experience:
      'The visit is about landscape intelligence: how agriculture, defense, water, social systems and craft shaped a remarkable lived environment.',
    logistics:
      'Village access should be locally guided. We avoid rushed stops and explain photography etiquette before arrival.',
  },
  {
    name: 'Omo Valley',
    region: 'Southern Ethiopia',
    status: 'Cultural landscape',
    image: '/images/omo-valley.png',
    bestMoment: 'Market days, translated conversations and unhurried village time',
    context:
      'The South Omo region is one of Ethiopia’s most culturally diverse areas, associated with communities including Hamar, Mursi, Karo, Dassanech, Arbore, Banna, Nyangatom and others.',
    experience:
      'The strongest journeys are built around markets, ceremonies when genuinely available, local mediators and enough time to understand context before raising a camera.',
    logistics:
      'Roads, weather, market days and permissions shape the itinerary. Responsible guiding and transparent community arrangements are essential.',
  },
  {
    name: 'Turmi',
    region: 'Lower Omo',
    status: 'Hamar country base',
    image: '/images/omo-valley.png',
    bestMoment: 'Late-day village visits and regional market connections',
    context:
      'Turmi is a practical base for Hamar country and nearby market routes, often used to reach communities, ceremonies and river landscapes in the Lower Omo.',
    experience:
      'Time here may include Hamar daily life, local markets, cattle culture and ceremonies only when they are naturally taking place and access is appropriate.',
    logistics:
      'A good Turmi stay depends on updated local information. We do not promise ceremonies; we plan around what is real during your dates.',
  },
  {
    name: 'Dimeka',
    region: 'Lower Omo',
    status: 'Market town',
    image: '/images/omo-valley.png',
    bestMoment: 'Market day movement, color, trade and conversation',
    context:
      'Dimeka is known to travelers as a market setting in Hamar country, where regional trade can bring together people, goods and visual energy from surrounding communities.',
    experience:
      'The value is not only photography but interpretation: what is being traded, who has travelled in, and how markets connect rural life across the valley.',
    logistics:
      'Market schedules can shift. We verify timing locally and keep visits respectful, especially around portrait requests.',
  },
  {
    name: 'Mursi Highlands',
    region: 'Omo and Mago area',
    status: 'Mursi cultural territory',
    image: '/images/omo-valley.png',
    bestMoment: 'Early visits with clear etiquette and a trusted local mediator',
    context:
      'Mursi communities live in the wider Lower Omo and Mago area and are widely known for distinctive body adornment traditions, cattle culture and seasonal movement between riverine and grassland settings.',
    experience:
      'A serious visit requires context around identity, adornment, livelihood and the pressures created by tourism. Translation and consent-aware photography are central.',
    logistics:
      'Access depends on roads, park routing and community readiness. We arrange visits through local channels and brief guests before arrival.',
  },
  {
    name: 'Karo',
    region: 'Lower Omo',
    status: 'Omo River community',
    image: '/images/omo-valley.png',
    bestMoment: 'River-edge landscapes and body-painting traditions with permission',
    context:
      'Karo communities are associated with the Omo River and are known for expressive body painting, river landscapes and a strong visual culture shaped by place and ceremony.',
    experience:
      'Visits work best when the group is small, the guide translates well and the pace allows exchange rather than staged photography.',
    logistics:
      'Travel times and permissions vary. We treat Karo visits as community appointments, not guaranteed stops.',
  },
  {
    name: 'Dire Dawa',
    region: 'Eastern Ethiopia',
    status: 'Railway and trade city',
    image: '/images/textile.png',
    bestMoment: 'Old railway quarter, markets and warm evening streets',
    context:
      'Dire Dawa grew with the railway connection between Addis Ababa and Djibouti, giving it a different architectural and commercial feel from the northern highland cities.',
    experience:
      'A guided visit can include railway heritage, Kafira market, old-quarter architecture and the city’s role as the gateway to Harar.',
    logistics:
      'It is usually paired with Harar. Flights, road transfers or rail schedules determine the most sensible routing.',
  },
  {
    name: 'Harar Jugol',
    region: 'Eastern Ethiopia',
    status: 'UNESCO fortified town',
    image: '/images/textile.png',
    bestMoment: 'Walking inside the old walls with a resident Harari guide',
    context:
      'Harar Jugol is a fortified historic town known for its walls, mosques, shrines, narrow lanes and distinctive Harari houses. UNESCO recognizes its African and Islamic urban heritage.',
    experience:
      'The best visits are on foot: gates, markets, house interiors, craft, bookbinding, coffee and stories that connect the city’s trade, faith and domestic life.',
    logistics:
      'A resident guide is essential. Two nights gives the old city time to open up beyond the standard highlights.',
  },
  {
    name: 'Debre Libanos Monastery',
    region: 'Oromia highlands',
    status: 'Orthodox monastery and gorge landscape',
    image: '/placeholder.jpg',
    bestMoment: 'Monastery visit paired with Jemma Gorge viewpoints',
    context:
      'Debre Libanos is one of Ethiopia’s important Orthodox monastic sites and sits within a dramatic highland landscape north of Addis Ababa.',
    experience:
      'The day can include the church, monastic history, the nearby cave and spring traditions, the Portuguese Bridge area and gorge views where geladas are sometimes seen.',
    logistics:
      'It works as a long day trip from Addis. Road timing, church access and viewpoint conditions are checked before departure.',
  },
  {
    name: 'Wonchi Crater Lake',
    region: 'Oromia highlands',
    status: 'Volcanic caldera lake',
    image: '/placeholder.jpg',
    bestMoment: 'Descending through farms to the lake and crossing by boat',
    context:
      'Wonchi is a highland crater lake west of Addis Ababa, with rural paths, islands, hot springs and changing weather across the caldera.',
    experience:
      'The visit is active but flexible: viewpoints, walking or riding, boat crossing and village landscapes shaped to your preferred pace.',
    logistics:
      'Altitude and weather can change the feel of the day. We arrange local guides and avoid overloading the schedule.',
  },
  {
    name: 'Tiya Archaeological Site',
    region: 'Central Ethiopia',
    status: 'UNESCO stelae field',
    image: '/placeholder.jpg',
    bestMoment: 'A slow guided reading of the carved standing stones',
    context:
      'Tiya is a megalithic stelae field associated with burial traditions and carved symbols, including sword-like motifs. It is one of Ethiopia’s UNESCO cultural sites.',
    experience:
      'The site rewards explanation: the number of stones, the symbolism, the wider Soddo-region megalithic tradition and what remains unknown.',
    logistics:
      'Tiya is compact and works well with Adadi Mariam on a day south of Addis Ababa. Local guiding adds needed context.',
  },
  {
    name: 'Adadi Mariam Rock-Hewn Church',
    region: 'Oromia',
    status: 'Working rock-hewn church',
    image: '/placeholder.jpg',
    bestMoment: 'Descending into the quiet rock-cut courtyard',
    context:
      'Adadi Mariam is an active rock-hewn Orthodox church south of Addis Ababa and is commonly paired with Tiya for a compact heritage day.',
    experience:
      'The visit explains rock-hewn church architecture outside Lalibela and shows how sacred heritage remains part of everyday religious life.',
    logistics:
      'Church etiquette applies. We combine it with Tiya and rural stops when road and timing conditions allow.',
  },
]

const aliases: Record<string, string> = {
  'Bonga Forest': 'Bonga Forest',
  'Mursi Highlands': 'Mursi Highlands',
  'Adadi Mariam Rock-Hewn Church': 'Adadi Mariam Rock-Hewn Church',
}

export function getTourPlaceInsights(places: string[]) {
  const byName = new Map(placeInsights.map((place) => [place.name, place]))

  return places
    .map((place) => byName.get(aliases[place] ?? place))
    .filter((place): place is TourPlaceInsight => Boolean(place))
}

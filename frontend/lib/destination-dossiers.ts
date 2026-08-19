export type DestinationDossier = {
  slug: string
  essence: string
  howToExperience: string
  planningNotes: string[]
  pairsWellWith: string[]
}

export const destinationDossiers: DestinationDossier[] = [
  {
    slug: 'lalibela',
    essence:
      'Lalibela is best understood as a living pilgrimage city, not an archaeological stop. The churches are active sanctuaries, carved downward into volcanic rock and connected by courtyards, tunnels and ceremonial paths.',
    howToExperience:
      'Arrive early, move slowly between the northern and southern church groups, and let a scholar-guide explain how architecture, liturgy and royal legend work together.',
    planningNotes: [
      'Dawn services are the most atmospheric time to visit.',
      'Festival periods such as Genna are powerful but require early room planning.',
      'Footwear etiquette, modest dress and patience around worshippers matter.',
    ],
    pairsWellWith: ['Gondar', 'Aksum', 'Simien Mountains'],
  },
  {
    slug: 'addis-ababa',
    essence:
      'Addis Ababa is Ethiopia’s political, cultural and culinary gateway: a highland capital where ancient history, Orthodox heritage, modern art, coffee culture and everyday city life meet.',
    howToExperience:
      'Use the city as orientation rather than transit. A strong private day links Entoto, key museums, a market or craft district, contemporary galleries and a serious coffee stop.',
    planningNotes: [
      'Traffic patterns shape the route more than distance on a map.',
      'Museum and church openings should be checked before confirming the day.',
      'Addis works well as a soft arrival, recovery night or final shopping day.',
    ],
    pairsWellWith: ['Debre Libanos', 'Wonchi Crater Lake', 'Tiya'],
  },
  {
    slug: 'simien-mountains',
    essence:
      'The Simiens are a high escarpment world of basalt cliffs, Afro-alpine grassland and endemic wildlife, including geladas, Walia ibex, raptors and rare Ethiopian wolf habitat.',
    howToExperience:
      'Choose the walking style first: scenic rim walks, lodge-based hikes, serviced camps or a harder trekking extension. The best days protect clear morning light and altitude comfort.',
    planningNotes: [
      'Altitude affects pacing even on moderate walks.',
      'October to April usually gives the clearest mountain conditions.',
      'Park scouts, local guides and weather flexibility are essential.',
    ],
    pairsWellWith: ['Gondar', 'Lalibela', 'Lake Tana'],
  },
  {
    slug: 'danakil-depression',
    essence:
      'The Danakil is an extreme Afar lowland landscape of salt flats, hydrothermal color fields, volcanic ground and desert trade routes below sea level.',
    howToExperience:
      'Treat it as an expedition. The reward is immense, but comfort comes from preparation: reliable vehicles, local liaison, water discipline, early starts and honest expectations.',
    planningNotes: [
      'November to February is the most sensible travel window.',
      'Permits, security coordination and current road access must be confirmed.',
      'Camp conditions are basic even when the operation is well run.',
    ],
    pairsWellWith: ['Aksum', 'Lalibela', 'Historic North'],
  },
  {
    slug: 'omo-valley',
    essence:
      'The Omo Valley is one of Ethiopia’s most culturally diverse regions, with communities, markets, river landscapes and traditions that should be approached with time and permission.',
    howToExperience:
      'Build the route around market days, trusted local mediators and respectful conversation. Photography should follow consent and context, not lead the experience.',
    planningNotes: [
      'Roads, weather and market schedules can change the best sequence.',
      'Ceremonies should never be promised unless genuinely confirmed.',
      'Small private groups create better, less intrusive visits.',
    ],
    pairsWellWith: ['Arba Minch', 'Dorze', 'Konso'],
  },
  {
    slug: 'gondar',
    essence:
      'Gondar is Ethiopia’s imperial city, known for Fasil Ghebbi, palace compounds, painted churches, royal baths and a courtly history that anchors the northern route.',
    howToExperience:
      'Begin with the royal enclosure, then move into Debre Berhan Selassie, Fasilides’ Bath and quieter palace or viewpoint stops when time allows.',
    planningNotes: [
      'Late afternoon light is excellent on the stone architecture.',
      'Timkat turns Gondar into a major festival hub and needs advance planning.',
      'It is the most practical base for entering the Simien Mountains.',
    ],
    pairsWellWith: ['Lake Tana', 'Simien Mountains', 'Lalibela'],
  },
  {
    slug: 'axum',
    essence:
      'Aksum carries the memory of an ancient trading kingdom through stelae, tombs, inscriptions, sacred traditions and stories that connect Ethiopia to the Red Sea world.',
    howToExperience:
      'A specialist guide is important here. The stelae field, tombs, inscriptions and St. Mary of Zion traditions need interpretation to feel coherent.',
    planningNotes: [
      'Regional access and flight reliability should be checked close to travel.',
      'The site is strongest when paired with wider northern historical context.',
      'Some sacred areas have restricted entry; expectations should be clear.',
    ],
    pairsWellWith: ['Lalibela', 'Danakil Depression', 'Gheralta'],
  },
  {
    slug: 'lake-tana',
    essence:
      'Lake Tana brings water, monastic scholarship, painted churches and Blue Nile geography into the northern circuit, softening the route between highland cities.',
    howToExperience:
      'Use a private boat, go early, and select monasteries carefully according to access rules, art quality and guest interests.',
    planningNotes: [
      'Some monasteries have gender-based entry restrictions.',
      'Blue Nile Falls is most rewarding when seasonal water levels are strong.',
      'Weather on the lake can shift timing, especially in the rainy season.',
    ],
    pairsWellWith: ['Bahir Dar', 'Gondar', 'Simien Mountains'],
  },
  {
    slug: 'bale-mountains',
    essence:
      'Bale is Ethiopia’s most important Afro-alpine wildlife landscape, moving from high plateau and endemic mammals to the Harenna Forest and wild coffee habitat.',
    howToExperience:
      'Combine Dinsho, Sanetti Plateau and Harenna Forest to understand the park’s full ecological range rather than treating it as a single wildlife drive.',
    planningNotes: [
      'A 4x4 and naturalist guide make a major difference.',
      'Cold plateau mornings and warm forest descents require layered packing.',
      'Wildlife sightings improve with patient early starts.',
    ],
    pairsWellWith: ['Sof Omar Cave', 'Hawassa', 'Addis Ababa'],
  },
  {
    slug: 'harar',
    essence:
      'Harar Jugol is a walled Islamic city of gates, shrines, mosques, markets and distinctive Harari homes, with a domestic culture as important as its monuments.',
    howToExperience:
      'Walk with a resident guide, entering slowly through gates, lanes, house interiors, markets, coffee spaces and craft traditions.',
    planningNotes: [
      'Two nights are better than one rushed day.',
      'Modest dress and local etiquette matter inside homes and sacred spaces.',
      'Dire Dawa is the usual access point by air, road or rail.',
    ],
    pairsWellWith: ['Dire Dawa', 'Aweday', 'Eastern Ethiopia'],
  },
  {
    slug: 'arba-minch',
    essence:
      'Arba Minch is a green southern base above Lakes Abaya and Chamo, combining Rift Valley scenery, boat excursions, birdlife and access to highland communities.',
    howToExperience:
      'Use it as a restorative stop: lake viewpoints, a private Lake Chamo boat, forest springs when suitable and an easy move into Dorze or Konso.',
    planningNotes: [
      'It breaks long southern drives intelligently.',
      'Boat timing depends on weather and local lake conditions.',
      'The best lodges are often chosen for views as much as room standard.',
    ],
    pairsWellWith: ['Dorze', 'Konso', 'Omo Valley'],
  },
  {
    slug: 'konso',
    essence:
      'Konso is a lived cultural landscape of stone terraces, fortified settlements, generation systems, communal spaces and carved memorial traditions.',
    howToExperience:
      'Walk with a local guide who can explain how agriculture, social structure, architecture and water management fit together.',
    planningNotes: [
      'Village access should be arranged locally and respectfully.',
      'It works well as a pause between Arba Minch and the Lower Omo.',
      'The value is interpretation, not only photographs of terraces.',
    ],
    pairsWellWith: ['Arba Minch', 'Dorze', 'Omo Valley'],
  },
  {
    slug: 'sof-omar-cave',
    essence:
      'Sof Omar is a limestone cave system shaped by the Web River, with immense chambers, natural arches and layers of spiritual memory.',
    howToExperience:
      'Enter with local guidance and proper lighting, moving through the accessible river passages and chambers at a pace matched to safety and water levels.',
    planningNotes: [
      'Seasonal river conditions determine how far the visit can safely extend.',
      'Footwear and lighting matter more than formal difficulty.',
      'It is strongest as part of a Bale Mountains journey.',
    ],
    pairsWellWith: ['Bale Mountains', 'Dinsho', 'Sanetti Plateau'],
  },
  {
    slug: 'hawassa',
    essence:
      'Hawassa is a relaxed Sidama lakeside city with birdlife, fish-market energy, coffee access and a useful rest rhythm on southern routes.',
    howToExperience:
      'Plan an unhurried lakeside morning, visit the fish market with context, add a coffee experience and use the city to soften the road south.',
    planningNotes: [
      'It works well between Addis and Arba Minch.',
      'Lakefront mornings are usually more rewarding than hot afternoons.',
      'Sidama coffee experiences can be added when timing allows.',
    ],
    pairsWellWith: ['Sidama coffee country', 'Arba Minch', 'Bale Mountains'],
  },
  {
    slug: 'wonchi-crater-lake',
    essence:
      'Wonchi is a highland volcanic caldera with lake views, rural paths, island crossings, farms and a cooler mountain atmosphere close to Addis.',
    howToExperience:
      'Choose the activity level: viewpoints only, a descent by foot or horse, a boat crossing, village time and a slower picnic-style day.',
    planningNotes: [
      'Weather moves quickly at this altitude.',
      'The day should not be overloaded with too many Addis-area stops.',
      'Local guides and boat timing are arranged before descent.',
    ],
    pairsWellWith: ['Addis Ababa', 'Ambo', 'Central Highlands'],
  },
  {
    slug: 'dorze',
    essence:
      'Dorze is a cool Gamo highland community known for weaving, tall bamboo houses, enset food traditions and wide views above Arba Minch.',
    howToExperience:
      'Visit as a hosted cultural encounter: architecture, weaving, kocho preparation and conversation rather than a brief roadside demonstration.',
    planningNotes: [
      'Local hosts should be arranged in advance.',
      'The altitude is cooler than Arba Minch, so layers help.',
      'It is best paired with an overnight in Arba Minch.',
    ],
    pairsWellWith: ['Arba Minch', 'Lake Chamo', 'Konso'],
  },
  {
    slug: 'tiya',
    essence:
      'Tiya is a compact but important megalithic field of carved standing stones, connected to burial traditions and still partly unresolved archaeological questions.',
    howToExperience:
      'Give the site proper explanation. The symbols, layout and wider regional stelae tradition need interpretation to avoid feeling like a quick roadside stop.',
    planningNotes: [
      'It pairs naturally with Adadi Mariam south of Addis.',
      'A half-day is enough when context is strong.',
      'The site is exposed, so morning timing is more comfortable.',
    ],
    pairsWellWith: ['Adadi Mariam', 'Addis Ababa', 'Central Highlands'],
  },
  {
    slug: 'debre-libanos',
    essence:
      'Debre Libanos combines monastic Orthodox history with the dramatic Jemma Gorge landscape north of Addis Ababa.',
    howToExperience:
      'Visit the church and monastic sites first, then continue toward the Portuguese Bridge area and gorge viewpoints for landscape and possible wildlife.',
    planningNotes: [
      'Church access and religious etiquette should be respected.',
      'The gorge section benefits from clear weather.',
      'It is one of the strongest cultural day trips from Addis.',
    ],
    pairsWellWith: ['Addis Ababa', 'Jemma Gorge', 'Central Highlands'],
  },
  {
    slug: 'dire-dawa',
    essence:
      'Dire Dawa is an eastern trade and railway city, shaped by movement between the highlands, Harar and the route toward Djibouti.',
    howToExperience:
      'Look beyond transit: railway heritage, Kafira market, older streets and trade history make the city a useful cultural chapter before Harar.',
    planningNotes: [
      'It is usually the access city for Harar.',
      'Heat and flight timing affect how much can be comfortably included.',
      'A guided market visit gives the city much stronger context.',
    ],
    pairsWellWith: ['Harar Jugol', 'Aweday', 'Eastern Ethiopia'],
  },
  {
    slug: 'adadi-mariam',
    essence:
      'Adadi Mariam is a working rock-hewn Orthodox church in the countryside south of Addis, often linked by tradition to King Lalibela.',
    howToExperience:
      'Approach it quietly, with attention to the rock-cut courtyard, active worship, rural setting and the way sacred architecture continues outside the famous northern sites.',
    planningNotes: [
      'It combines naturally with Tiya in a full-day heritage route.',
      'Modest dress and church etiquette apply.',
      'The site is best understood with a guide who can compare it to Lalibela.',
    ],
    pairsWellWith: ['Tiya', 'Addis Ababa', 'Central Highlands'],
  },
  {
    slug: 'gheralta-mountains',
    essence:
      'Gheralta is a sacred sandstone landscape where rock-hewn churches, village paths and immense escarpments form one inseparable historical setting.',
    howToExperience:
      'Match churches to confidence and fitness, combining one major ridge walk with accessible sanctuaries and enough time for local guides to explain the living religious landscape.',
    planningNotes: [
      'Some routes involve exposure and scrambling; alternatives must be agreed honestly.',
      'Church access depends on services, local custodians and current conditions.',
      'Regional advice, transport and insurance are checked before the route is offered.',
    ],
    pairsWellWith: ['Aksum', 'Yeha', 'Wukro'],
  },
  {
    slug: 'awash-national-park',
    essence:
      'Awash brings acacia savanna, volcanic plains, river gorge and dry-country wildlife together on Ethiopia’s eastern corridor.',
    howToExperience:
      'Stay overnight and protect dawn and late afternoon for wildlife, using the warmer hours for the falls, gorge, viewpoints and onward travel.',
    planningNotes: [
      'Wildlife is dispersed and sightings should never be oversold.',
      'Heat, road access and park guidance shape the daily sequence.',
      'It connects naturally with Dire Dawa and Harar when the corridor is operating.',
    ],
    pairsWellWith: ['Dire Dawa', 'Harar Jugol', 'Central Rift Valley'],
  },
  {
    slug: 'lake-langano',
    essence:
      'Langano is a restorative Rift Valley lake where woodland birding, shore time and comfortable lodging break up longer journeys south.',
    howToExperience:
      'Leave the schedule light: a naturalist walk at first light, optional time on the water and a wider lake circuit only when current conditions make it worthwhile.',
    planningNotes: [
      'Water and shoreline conditions are checked locally.',
      'Abijatta-Shalla is strongest for landscape and birds rather than big mammals.',
      'One or two nights fit naturally between Addis and Hawassa.',
    ],
    pairsWellWith: ['Lake Ziway', 'Abijatta-Shalla', 'Hawassa'],
  },
  {
    slug: 'gedeo-cultural-landscape',
    essence:
      'Gedeo is a living agroforestry landscape in which coffee, enset, mature trees, sacred places and community knowledge sustain one another.',
    howToExperience:
      'Walk with community guides and hosts, treating farms, forests and megalithic sites as parts of a lived system rather than separate attractions.',
    planningNotes: [
      'Visits depend on local invitation and should return value to hosts.',
      'Harvest and processing seasons change the coffee experience.',
      'Photography at homes and sacred places always follows consent.',
    ],
    pairsWellWith: ['Yirgacheffe', 'Hawassa', 'Sidama coffee country'],
  },
  {
    slug: 'kafa-biosphere-reserve',
    essence:
      'Kafa protects a southwest Afromontane forest landscape rich in wild Arabica, wetlands, birds and community relationships with the forest.',
    howToExperience:
      'Base around Bonga and travel slowly with local naturalists, mixing forest walks and birding with coffee ecology and community conservation.',
    planningNotes: [
      'Rain can change trail and road conditions in every season.',
      'Lodging is limited and driving times must remain conservative.',
      'Binoculars, waterproof footwear and flexible expectations are valuable.',
    ],
    pairsWellWith: ['Bonga', 'Jimma', 'Southwest coffee country'],
  },
]

export function getDestinationDossier(slug: string) {
  return destinationDossiers.find((item) => item.slug === slug)
}

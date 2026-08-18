import {
  BadgeCheck,
  Bean,
  Camera,
  CircleDot,
  Coffee,
  Compass,
  Handshake,
  Hotel,
  MapPinned,
  Mountain,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ExperiencePage = {
  slug: string
  title: string
  eyebrow: string
  lede: string
  description: string
  heroImage: string
  imageAlt: string
  meta: { label: string; value: string }[]
  overviewTitle: string
  overview: string[]
  signature: { label: string; value: string }[]
  routeTitle: string
  routeIntro: string
  route: { phase: string; title: string; text: string }[]
  highlights: { title: string; text: string; icon: LucideIcon }[]
  gallery: { image: string; title: string; text: string }[]
  inclusions: string[]
  bestFor: string[]
  related: { title: string; href: string; image: string; meta: string }[]
}

export const experiencePages: ExperiencePage[] = [
  {
    slug: 'private-coffee-journeys',
    title: 'Private Coffee Journeys',
    eyebrow: 'Coffee Origin Travel',
    lede:
      'Trace Arabica from forest habitat and smallholder farms to washing stations, cupping tables and the ceremony that anchors Ethiopian hospitality.',
    description:
      'A private origin journey for roasters, buyers, coffee professionals and curious travelers who want access, context and comfort in Ethiopia coffee country.',
    heroImage: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg',
    imageAlt: 'Traditional Ethiopian coffee ceremony with beans roasted over coals',
    meta: [
      { label: 'Duration', value: '10-14 Days' },
      { label: 'Regions', value: 'Jimma, Kaffa, Sidama' },
      { label: 'Focus', value: 'Origin, Cupping, Culture' },
      { label: 'Style', value: 'Private Executive' },
    ],
    overviewTitle: 'A considered passage through the birthplace of Arabica',
    overview: [
      'Ethiopia is the birthplace of Arabica coffee, and its coffee regions are not interchangeable. Jimma gives context to forest coffee and research. Kaffa and Bonga bring heritage forests, cooperatives and conservation into focus. Sidama and Yirgacheffe show washing stations, fermentation, drying beds and the profiles that made Ethiopian specialty coffee famous.',
      'The journey can be run as a professional sourcing program or as a refined cultural itinerary. Meetings, cuppings and farm access are balanced with premium hotels where available, scenic Rift Valley travel, traditional meals and private coffee ceremonies hosted by local families.',
      'For guests who want a shorter edition, the route can be compressed into a private 4 to 8 day coffee-focused journey around Addis Ababa, the Rift Valley and selected origin regions.',
    ],
    signature: [
      { label: 'Primary Route', value: 'Addis Ababa - Jimma - Bonga - Sidama - Yirgacheffe' },
      { label: 'Access', value: 'Farms, cooperatives, washing stations and cuppings' },
      { label: 'Hospitality', value: 'Premium hotels, lodges and private hosting' },
      { label: 'Pace', value: 'Built around harvest, meetings and road conditions' },
    ],
    routeTitle: 'How the coffee route usually unfolds',
    routeIntro:
      'The final route depends on harvest timing, meeting availability and your professional interests, but the structure below is the backbone of a serious Ethiopia coffee journey.',
    route: [
      {
        phase: 'Days 1-2',
        title: 'Addis Ababa coffee context',
        text:
          'Arrive with private airport support, settle into a premium hotel, meet your guide and begin with exporters, roasters, markets, museums and a hosted coffee ceremony.',
      },
      {
        phase: 'Days 3-4',
        title: 'Jimma forest coffee and research',
        text:
          'Fly or drive west to Jimma for forest coffee landscapes, smallholder farms, cooperatives, research context and private tasting sessions.',
      },
      {
        phase: 'Days 5-6',
        title: 'Kaffa and Bonga heritage forests',
        text:
          'Continue into Kaffa coffee country for wild and semi-forest coffee, organic production, cooperative leadership and discussions around biodiversity and traceability.',
      },
      {
        phase: 'Days 7-9',
        title: 'Sidama and Yirgacheffe washing stations',
        text:
          'Move through Sidama and Gedeo country to visit washing stations, drying beds and cooperatives, with cuppings focused on floral, citrus and highland profiles.',
      },
      {
        phase: 'Days 10-14',
        title: 'Rift Valley extension and Addis closing',
        text:
          'Add Hawassa, Arba Minch or rural sustainability visits before returning to Addis for final meetings, specialty coffee shopping and a farewell dinner.',
      },
    ],
    highlights: [
      {
        title: 'Origin Access',
        text: 'Meet farmers, cooperative teams, exporters and local coffee professionals with the right context before each visit.',
        icon: Handshake,
      },
      {
        title: 'Cupping Led By Purpose',
        text: 'Compare forest, washed and regional profiles in sessions shaped for professionals or curious travelers.',
        icon: Bean,
      },
      {
        title: 'Ceremony With Meaning',
        text: 'Experience roasting, grinding, brewing and serving as a social ritual rather than a staged performance.',
        icon: Coffee,
      },
    ],
    gallery: [
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg',
        title: 'Coffee Ceremony',
        text: 'Green beans roasted over coals, ground by hand and brewed in a jebena.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/grand-ethiopia-highlights.jpg',
        title: 'Soft Landings',
        text: 'Comfortable evenings after farm visits, cuppings and long scenic drives.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg',
        title: 'Addis Connections',
        text: 'Exporters, roasters, markets and cultural context at the start and close.',
      },
    ],
    inclusions: [
      'Private English-speaking guide and driver',
      'Airport meet-and-greet and domestic transfer coordination',
      'Selected hotels, lodges or upgraded regional accommodation',
      'Coffee farm, cooperative and washing station visit coordination',
      'Private cupping sessions where available',
      'Traditional coffee ceremony and hosted cultural meals',
      'Daily bottled water and on-route travel support',
    ],
    bestFor: [
      'Coffee roasters and buyers',
      'Specialty coffee professionals',
      'Food and culture travelers',
      'Private groups seeking rare access',
    ],
    related: [
      {
        title: 'Ethiopia Coffee Origins',
        href: '/tours/ethiopia-coffee-origins',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg',
        meta: 'Coffee, culture and origin travel',
      },
      {
        title: 'Bale Mountains and Sof Omar',
        href: '/tours/bale-mountains-and-sof-omar',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801477/bale-mountains.png',
        meta: 'Highland nature extension',
      },
    ],
  },
  {
    slug: 'photography-expeditions',
    title: 'Photography Expeditions',
    eyebrow: 'Light-Led Ethiopia',
    lede:
      'A privately guided photography journey across city streets, Omo Valley portrait settings, volcanic desert, sacred architecture and highland wildlife.',
    description:
      'A 14-day photography expedition shaped for professional and enthusiast photographers seeking cultural, landscape, wildlife and travel imagery.',
    heroImage: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786966781/danakil-expedition.jpg',
    imageAlt: 'The mineral fields and salt flats of the Danakil Depression',
    meta: [
      { label: 'Duration', value: '14 Days' },
      { label: 'Route', value: 'Addis, Omo, Danakil' },
      { label: 'Focus', value: 'Portrait, Landscape' },
      { label: 'Style', value: 'Private Expedition' },
    ],
    overviewTitle: 'Planned around light, access and the discipline of waiting',
    overview: [
      'Ethiopia offers unusual photographic range in a compact country: street and market life in Addis Ababa, environmental portraits in the Omo Valley, salt caravans and mineral fields in the Danakil Depression, low-light church interiors in Lalibela and wildlife or escarpment work in the Simien Mountains.',
      'The itinerary is paced for photographers rather than casual sightseeing. Starts are early, evenings are protected, and rest time is built in for charging, backing up images and adapting the next day to weather, ceremonies and road realities.',
      'Cultural photography is arranged with care. Local guides and community relationships matter, especially in the Omo Valley, where consent, timing and respectful access are the difference between a transaction and a meaningful image.',
    ],
    signature: [
      { label: 'Primary Route', value: 'Addis Ababa - Omo Valley - Danakil - Lalibela' },
      { label: 'Image Work', value: 'Street, portrait, landscape, ritual and wildlife' },
      { label: 'Pace', value: 'Sunrise starts, golden-hour holds and backup time' },
      { label: 'Support', value: '4x4 logistics, local guides and flexible routing' },
    ],
    routeTitle: 'A 14-day photographic arc',
    routeIntro:
      'The sequence below follows a proven expedition rhythm: warm up in Addis, slow down in the Omo, then move into the desert and sacred northern highlands.',
    route: [
      {
        phase: 'Days 1-2',
        title: 'Addis Ababa streets and museums',
        text:
          'Arrive, prepare equipment, photograph selected city scenes and build historical context through museums, markets and evening light.',
      },
      {
        phase: 'Days 3-8',
        title: 'Omo Valley portraits and cultural landscapes',
        text:
          'Fly south and work through Jinka, Mursi country, Turmi, Hamar settings, Konso terraces and Arba Minch with timing shaped around markets and permissions.',
      },
      {
        phase: 'Days 9-11',
        title: 'Danakil salt, color and night work',
        text:
          'Travel through Semera into the Afar lowlands for salt flats, camel caravans, Dallol mineral forms, Erta Ale night work and desert camping.',
      },
      {
        phase: 'Days 12-14',
        title: 'Lalibela rituals and departure',
        text:
          'Close with Lalibela at golden hour, church interiors, priests, pilgrims, sunrise viewpoints and a return to Addis for onward flights.',
      },
    ],
    highlights: [
      {
        title: 'Light Management',
        text: 'The route protects dawn, dusk and low-light interiors rather than filling every hour with transfers.',
        icon: Sun,
      },
      {
        title: 'Respectful Portraits',
        text: 'Community visits are guided by local relationships, translation and consent-aware pacing.',
        icon: Users,
      },
      {
        title: 'Expedition Logistics',
        text: 'Desert, highland and regional flight logistics are coordinated so the photography remains the focus.',
        icon: Camera,
      },
    ],
    gallery: [
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786966781/danakil-expedition.jpg',
        title: 'Danakil Color Fields',
        text: 'Mineral textures, salt geometry, caravans and stark desert horizons.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
        title: 'Omo Valley Encounters',
        text: 'Portrait settings arranged with local guides and cultural mediators.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
        title: 'Lalibela In Ritual Light',
        text: 'Stone churches, dawn prayer and low-light sacred interiors.',
      },
    ],
    inclusions: [
      'Private photography-aware guide and driver',
      '4x4 transport for regional and desert sections',
      'Domestic flight coordination where appropriate',
      'Accommodation in hotels, lodges or expedition camps',
      'Community visit coordination and local guiding',
      'Bottled water, route support and daily timing briefings',
      'Flexible adjustments for weather, ceremonies and light',
    ],
    bestFor: [
      'Professional photographers',
      'Serious enthusiast photographers',
      'Documentary and cultural travelers',
      'Private creative groups',
    ],
    related: [
      {
        title: 'Danakil Expedition',
        href: '/tours/danakil-expedition',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786966781/danakil-expedition.jpg',
        meta: 'Desert landscapes and Afar expedition travel',
      },
      {
        title: 'Omo Valley Immersion',
        href: '/tours/omo-valley-immersion',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
        meta: 'Cultural access and southern Ethiopia',
      },
    ],
  },
  {
    slug: 'luxury-cultural-immersions',
    title: 'Luxury Cultural Immersions',
    eyebrow: 'Culture With Permission',
    lede:
      "Private cultural journeys that connect Ethiopia's ancient history, living craft, cuisine, markets, festivals and Omo Valley communities with care.",
    description:
      'A premium cultural travel style for guests who want meaningful encounters, thoughtful pacing and reliable local interpretation.',
    heroImage: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
    imageAlt: 'Ethiopian textile craft and woven cultural detail',
    meta: [
      { label: 'Duration', value: '7-14 Days' },
      { label: 'Regions', value: 'North, Addis, Omo' },
      { label: 'Focus', value: 'Craft, Food, History' },
      { label: 'Style', value: 'Private Cultural' },
    ],
    overviewTitle: 'Ethiopia beyond monuments, interpreted through people',
    overview: [
      'A cultural immersion can include the northern historic circuit, Addis Ababa galleries and markets, culinary hosting, Orthodox festivals, Dorze weaving, Konso terracing and carefully arranged Omo Valley visits.',
      'Ethiopia is home to more than 80 nations and nationalities, and the strongest journeys are designed around context. We match each visit with the right guide, explain etiquette before arrival and build in enough time for conversation rather than rushed photography.',
      'Food and coffee are part of the cultural architecture. Injera, wot, fasting platters, regional spice, tej, traditional meals and the coffee ceremony become part of the itinerary rather than an evening add-on.',
    ],
    signature: [
      { label: 'Core Route', value: 'Addis Ababa - Lalibela - Gondar - Omo or Rift Valley' },
      { label: 'Encounters', value: 'Artisans, hosts, guides, markets and community visits' },
      { label: 'Access', value: 'Private guiding and locally arranged introductions' },
      { label: 'Pace', value: 'Slow enough for etiquette, translation and conversation' },
    ],
    routeTitle: 'A cultural route with several possible centers',
    routeIntro:
      'The journey can lean toward the northern churches, the Omo Valley, food and craft, or a balanced route that combines all three.',
    route: [
      {
        phase: 'Chapter 1',
        title: 'Addis Ababa as orientation',
        text:
          'Begin with museums, Merkato, contemporary galleries, cuisine and a briefing on history, etiquette and regional differences.',
      },
      {
        phase: 'Chapter 2',
        title: 'Historic north and sacred architecture',
        text:
          'Travel to Lalibela, Gondar, Axum or Lake Tana for rock-hewn churches, castles, monasteries, manuscripts and festivals when dates align.',
      },
      {
        phase: 'Chapter 3',
        title: 'Craft, food and highland life',
        text:
          'Meet weavers, coffee hosts, cooks, farmers or artists in settings where the exchange can be personal and properly translated.',
      },
      {
        phase: 'Chapter 4',
        title: 'Southern cultural landscapes',
        text:
          'Extend to Dorze, Konso and the Omo Valley for markets, village architecture, body adornment traditions and community-led visits.',
      },
    ],
    highlights: [
      {
        title: 'Guided Interpretation',
        text: 'Local specialists turn monuments, markets, cuisine and ceremonies into context, not just stops.',
        icon: Compass,
      },
      {
        title: 'Craft And Cuisine',
        text: 'Weaving, teff, injera, wot, coffee and hosted meals are treated as serious cultural experiences.',
        icon: CircleDot,
      },
      {
        title: 'Responsible Encounters',
        text: 'Community visits are paced with permission, etiquette and realistic expectations.',
        icon: Handshake,
      },
    ],
    gallery: [
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
        title: 'Master Artisans',
        text: 'Textile and craft encounters shaped around people who still carry the tradition.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/timkat-festival-journey.jpg',
        title: 'Festival Ethiopia',
        text: 'Timkat, Genna and Orthodox traditions when seasonal dates align.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
        title: 'Living History',
        text: 'Sacred architecture that still functions as worship, memory and daily life.',
      },
    ],
    inclusions: [
      'Private cultural guide and local specialists where needed',
      'Airport transfers and private ground transportation',
      'Selected hotels, lodges or boutique accommodation',
      'Museum, monument and community visit coordination',
      'Hosted coffee, food or craft experiences where available',
      'Responsible photography and etiquette briefing',
      'Flexible pacing for festivals, markets and ceremonies',
    ],
    bestFor: [
      'Culture-focused couples',
      'Families seeking meaningful learning',
      'Private heritage travelers',
      'Guests combining north and south Ethiopia',
    ],
    related: [
      {
        title: 'The Historic Route',
        href: '/tours/the-historic-route',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
        meta: 'Lalibela, Gondar, Axum and Lake Tana',
      },
      {
        title: 'Omo Valley Immersion',
        href: '/tours/omo-valley-immersion',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801395/omo-valley.jpg',
        meta: 'Southern cultural landscapes',
      },
    ],
  },
  {
    slug: 'signature-hospitality',
    title: 'Signature Hospitality',
    eyebrow: 'Comfort In Remote Ethiopia',
    lede:
      'A softer way to travel Ethiopia, pairing private logistics, selected hotels, boutique lodges, eco-lodges and carefully supported remote nights.',
    description:
      'A premium service layer for travelers who want Ethiopia handled with discretion, realistic comfort standards and reliable local support.',
    heroImage: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/grand-ethiopia-highlights.jpg',
    imageAlt: 'Luxury lodge accommodation arranged for a private Ethiopia journey',
    meta: [
      { label: 'Duration', value: 'Any Journey' },
      { label: 'Base', value: 'Addis Ababa' },
      { label: 'Focus', value: 'Comfort, Support' },
      { label: 'Style', value: 'Private Luxury' },
    ],
    overviewTitle: 'Luxury here means precision, honesty and the right room at the right time',
    overview: [
      'Ethiopia has a more selective luxury accommodation landscape than some safari destinations. Addis Ababa has the strongest five-star hotel selection, the northern circuit offers comfortable hotels and lodges, and remote regions rely on a mix of eco-lodges, boutique stays and well-supported expedition camps.',
      'Our role is to design around those realities. We choose the best available stay for each route, explain comfort levels clearly, pace long drives intelligently and keep local support close from arrival to departure.',
      'This page is not a single itinerary. It is the service layer that can be added to coffee, culture, photography, trekking, wildlife or family travel when guests want privacy, quiet logistics and stronger daily care.',
    ],
    signature: [
      { label: 'Accommodation', value: 'Premium hotels, boutique lodges and eco-lodges' },
      { label: 'Transport', value: 'Private vehicles, 4x4s and flight coordination' },
      { label: 'Support', value: 'Addis-based planning and in-country response' },
      { label: 'Expectation', value: 'Transparent comfort notes before booking' },
    ],
    routeTitle: 'What signature hospitality changes',
    routeIntro:
      'The itinerary can be historic, cultural, photographic or coffee-led. The hospitality layer changes how the journey feels day by day.',
    route: [
      {
        phase: 'Arrival',
        title: 'Met, transferred and briefed',
        text:
          'Private arrival assistance, hotel transfer, itinerary briefing and time to settle before the route begins.',
      },
      {
        phase: 'City',
        title: 'Premium Addis Ababa base',
        text:
          'Use Addis for the strongest hotel standard, excellent restaurants, galleries, markets and recovery between regional flights.',
      },
      {
        phase: 'Highlands',
        title: 'Comfortable northern circuit stays',
        text:
          'Pair Lalibela, Gondar, Lake Tana and the Simiens with the best available rooms, views and guide timing.',
      },
      {
        phase: 'Remote',
        title: 'Supported lodges and camps',
        text:
          'In Omo, Danakil or mountain regions, comfort is created through preparation: better vehicles, water, camp support, honest timing and staff who know the route.',
      },
      {
        phase: 'Close',
        title: 'Unhurried return to Addis',
        text:
          'End with final shopping, dining, coffee, day room or airport transfer coordination so the journey closes cleanly.',
      },
    ],
    highlights: [
      {
        title: 'Selected Stays',
        text: 'Hotels and lodges are chosen for route fit, service, location and realistic quality, not only category labels.',
        icon: Hotel,
      },
      {
        title: 'Private Movement',
        text: 'Vehicles, domestic flights, luggage handling and timing are coordinated around comfort and privacy.',
        icon: MapPinned,
      },
      {
        title: 'Local Assurance',
        text: 'The Addis-based team tracks the route and supports changes while you are in country.',
        icon: ShieldCheck,
      },
    ],
    gallery: [
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/grand-ethiopia-highlights.jpg',
        title: 'Lodge Evenings',
        text: 'Quiet rooms, firelight and views after demanding travel days.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786804467/simien-mountains.png',
        title: 'Highland Comfort',
        text: 'Mountain routes paced around weather, altitude and the best viewpoint hours.',
      },
      {
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg',
        title: 'Addis Recovery',
        text: 'A polished capital base for arrivals, meetings, dining and departures.',
      },
    ],
    inclusions: [
      'Private itinerary design and comfort-level consultation',
      'Selected hotels, lodges and room-category advice',
      'Private airport transfers and vehicle coordination',
      'Experienced guides, drivers and local support team',
      'Domestic flight and route timing coordination',
      'Remote-region preparation for water, permits and camp support',
      'Clear pre-trip notes on comfort standards by region',
    ],
    bestFor: [
      'Luxury private travelers',
      'Families and multigenerational groups',
      'Honeymooners and milestone trips',
      'Guests combining remote regions with comfort',
    ],
    related: [
      {
        title: 'The Historic Route',
        href: '/tours/the-historic-route',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801385/gondar.jpg',
        meta: 'Classic northern Ethiopia with strong accommodation choices',
      },
      {
        title: 'Luxury Ethiopia Journey',
        href: '/tours',
        image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/grand-ethiopia-highlights.jpg',
        meta: 'Tailor-made private travel',
      },
    ],
  },
]

export function getExperiencePage(slug: string) {
  return experiencePages.find((page) => page.slug === slug)
}

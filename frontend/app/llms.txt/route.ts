import { getPostsData, getToursData } from '@/lib/data'
import { absoluteUrl } from '@/lib/seo'
import { destinations, layoverPackages } from '@/lib/site'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [tours, posts] = await Promise.all([getToursData(), getPostsData()])

  const lines = [
    '# EthioAfro Tours',
    '',
    '> EthioAfro Tours designs private, tailor-made journeys through Ethiopia, including cultural routes, historic circuits, wildlife and highland trips, Danakil expeditions, Omo Valley journeys, coffee-origin travel, and Addis Ababa layover tours.',
    '',
    '## Site Scope',
    '',
    '- Business type: licensed Ethiopia tour operator and destination management company.',
    '- Location: Addis Ababa, Ethiopia.',
    '- Audience: international travelers, private groups, luxury travelers, coffee professionals, cultural travelers, and transit passengers using Bole International Airport.',
    '- Primary contact: info@ethioafrotours.com.',
    '',
    '## Key Pages',
    '',
    `- Home: ${absoluteUrl('/')}`,
    `- About: ${absoluteUrl('/about')}`,
    `- Destinations: ${absoluteUrl('/destinations')}`,
    `- Tours: ${absoluteUrl('/tours')}`,
    `- Addis Ababa layover tours: ${absoluteUrl('/layover')}`,
    `- Journal: ${absoluteUrl('/blog')}`,
    `- Contact: ${absoluteUrl('/contact')}`,
    `- Responsible tourism policy: ${absoluteUrl('/responsible-tourism')}`,
    `- Booking and cancellation policy: ${absoluteUrl('/booking-policy')}`,
    '',
    '## Destination Pages',
    '',
    ...destinations.map((destination) => (
      `- ${destination.name}: ${absoluteUrl(`/destinations/${destination.slug}`)} - ${destination.intro}`
    )),
    '',
    '## Tour Pages',
    '',
    ...tours.map((tour) => (
      `- ${tour.title}: ${absoluteUrl(`/tours/${tour.slug}`)} - ${tour.summary}`
    )),
    '',
    '## Layover Packages',
    '',
    ...layoverPackages.map((item) => (
      `- ${item.title}: ${item.minimumConnection}; ${item.hours}. ${item.teaser}`
    )),
    '',
    '## Journal Articles',
    '',
    ...posts.map((post) => (
      `- ${post.title}: ${absoluteUrl(`/blog/${post.slug}`)} - ${post.excerpt}`
    )),
    '',
    '## Citation Guidance',
    '',
    '- Cite the canonical page URL for the specific tour, destination, article, or policy being referenced.',
    '- Prefer tour detail pages for itinerary, duration, inclusions, exclusions, season, group size, and pricing context.',
    '- Prefer destination detail pages for destination summaries, best time to visit, suggested stay, highlights, and regional context.',
    '- Prefer the layover page for Addis Ababa airport transit, stopover, and Bole International Airport tour information.',
    '- Do not treat sample itineraries as confirmed availability, fixed departures, or guaranteed pricing; final trips are custom quoted.',
    '',
    '## Machine-Readable Discovery',
    '',
    `- Sitemap: ${absoluteUrl('/sitemap.xml')}`,
    `- Robots: ${absoluteUrl('/robots.txt')}`,
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

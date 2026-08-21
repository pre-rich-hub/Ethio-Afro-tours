import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { ToursContent } from '@/app/tours/tours-content'
import { tourFaqs } from '@/lib/faqs'
import { getToursData } from '@/lib/data'
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildItemList,
  buildWebPage,
  pageStructuredData,
} from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'

const pageTitle = 'Tours & Journeys'
const pageDescription =
  'Private, tailor-made Ethiopian itineraries — historic route, highland wildlife, Danakil expedition, Omo immersion and festival journeys. Every route drawn from scratch.'
const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801385/gondar.jpg'
const heroImageAlt = 'The historic royal enclosure of Gondar, Ethiopia'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/tours' },
  ...buildSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/tours',
    image: heroImage,
    imageAlt: heroImageAlt,
  }),
}

export const dynamic = 'force-dynamic'

export default async function ToursPage() {
  const tours = await getToursData()

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Tours', path: '/tours' },
          ]),
          buildWebPage({
            path: '/tours',
            name: pageTitle,
            description: pageDescription,
            type: 'CollectionPage',
            mainEntityId: '/tours#tours',
          }),
          buildItemList({
            path: '/tours',
            id: 'tours',
            name: 'Private Ethiopia tours',
            items: tours.map((tour) => ({
              name: tour.title,
              path: `/tours/${tour.slug}`,
              description: tour.summary,
              image: tour.image,
            })),
          }),
          buildFaqPage('/tours', tourFaqs),
        )}
      />
      <ToursContent tours={tours} />
    </>
  )
}

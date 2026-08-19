import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { destinations } from '@/lib/site'
import { getDestinationsData } from '@/lib/data'
import { buildBreadcrumbList, pageStructuredData } from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'
import { DestinationsContent } from './destinations-content'

const lalibelaImage = destinations.find((d) => d.slug === 'lalibela')?.image ?? '/placeholder.svg'
const pageTitle = 'Destinations'
const pageDescription =
  'Explore twenty of Ethiopia’s defining destinations, from rock-hewn churches and ancient cities to volcanic lowlands, highland parks and living cultural landscapes.'
const heroImageAlt = 'Bet Giyorgis rock-hewn church in Lalibela, Ethiopia'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/destinations' },
  ...buildSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/destinations',
    image: lalibelaImage,
    imageAlt: heroImageAlt,
  }),
}

export const dynamic = 'force-dynamic'

export default async function DestinationsPage() {
  const liveDestinations = await getDestinationsData()

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/destinations' },
          ]),
        )}
      />
      <DestinationsContent destinations={liveDestinations} />
    </>
  )
}

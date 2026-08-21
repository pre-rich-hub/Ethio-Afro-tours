import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { cloudinaryImageUrl } from '@/lib/cloudinary'
import { destinations } from '@/lib/site'
import { getDestinationData, getDestinationsData, getToursData } from '@/lib/data'
import { getDestinationDossier } from '@/lib/destination-dossiers'
import {
  buildBreadcrumbList,
  buildTouristDestination,
  buildWebPage,
  pageStructuredData,
} from '@/lib/structured-data'
import { DestinationDetailContent } from './destination-detail-content'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = await getDestinationData(slug)
  if (!d) return { title: 'Destination not found' }
  return {
    title: d.name,
    description: d.intro,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      title: d.name,
      description: d.intro,
      images: [cloudinaryImageUrl(d.image, { width: 1200, quality: 82 })],
    },
    twitter: {
      card: 'summary_large_image',
      title: d.name,
      description: d.intro,
      images: [cloudinaryImageUrl(d.image, { width: 1200, quality: 82 })],
    },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [d, allTours, allDestinations] = await Promise.all([
    getDestinationData(slug),
    getToursData(),
    getDestinationsData(),
  ])
  if (!d) notFound()

  const related = allTours.filter((t) => t.places.some((p) => p.includes(d.name.split(' ')[0]))).slice(0, 3)
  const fallback = related.length ? related : allTours.slice(0, 3)
  const others = allDestinations.filter((o) => o.slug !== d.slug).slice(0, 4)
  const dossier = getDestinationDossier(d.slug)

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/destinations' },
            {
              name: d.name,
              path: `/destinations/${d.slug}`,
            },
          ]),
          buildWebPage({
            path: `/destinations/${d.slug}`,
            name: d.name,
            description: d.intro,
            mainEntityId: `/destinations/${d.slug}#destination`,
          }),
          buildTouristDestination(d),
        )}
      />
      <DestinationDetailContent
        destination={d}
        relatedTours={fallback}
        otherDestinations={others}
        dossier={dossier}
      />
    </>
  )
}

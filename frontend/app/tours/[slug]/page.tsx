import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/json-ld'
import { TourDetailContent } from '@/app/tours/[slug]/tour-detail-content'
import { cloudinaryImageUrl } from '@/lib/cloudinary'
import { tours } from '@/lib/site'
import { getTourData, getToursData } from '@/lib/data'
import {
  buildBreadcrumbList,
  buildTouristTrip,
  pageStructuredData,
} from '@/lib/structured-data'

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTourData(slug)
  if (!tour) return { title: 'Journey not found' }
  return {
    title: tour.title,
    description: tour.summary,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.summary,
      images: [cloudinaryImageUrl(tour.image, { width: 1200, quality: 82 })],
    },
  }
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tour = await getTourData(slug)
  if (!tour) notFound()

  const allTours = await getToursData()
  const others = allTours.filter((other) => other.slug !== tour.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Tours', path: '/tours' },
            { name: tour.title, path: `/tours/${tour.slug}` },
          ]),
          buildTouristTrip(tour),
        )}
      />
      <TourDetailContent tour={tour} others={others} />
    </>
  )
}

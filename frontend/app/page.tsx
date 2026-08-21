import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { Hero } from '@/components/hero'
import { HomeTrustBar } from '@/components/home-trust-bar'
import { BrandIntro } from '@/components/brand-intro'
import { Destinations } from '@/components/destinations'
import { Journeys } from '@/components/journeys'
import { WhyEthiopia } from '@/components/why-ethiopia'
import { Experiences } from '@/components/experiences'
import { LayoverTeaser } from '@/components/layover-teaser'
import { Testimonial } from '@/components/testimonial'
import { Gallery } from '@/components/gallery'
import { PlanJourney } from '@/components/plan-journey'
import { getToursData } from '@/lib/data'
import { destinations } from '@/lib/site'
import { buildItemList, buildWebPage, pageStructuredData } from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'

const title = 'EthioAfro Tours — The Soul of Ethiopia, Curated'
const description =
  'Private, tailor-made luxury journeys through Ethiopia, designed around culture, heritage, landscapes and careful in-country support.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/' },
  ...buildSocialMetadata({
    title,
    description,
    path: '/',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
    imageAlt: 'Lalibela rock-hewn churches in Ethiopia',
  }),
}

export default async function Page() {
  const tours = await getToursData()

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildWebPage({ path: '/', name: title, description }),
          buildItemList({
            path: '/',
            id: 'featured-tours',
            name: 'Featured Ethiopia private tours',
            items: tours.slice(0, 6).map((tour) => ({
              name: tour.title,
              path: `/tours/${tour.slug}`,
              description: tour.summary,
              image: tour.image,
            })),
          }),
          buildItemList({
            path: '/',
            id: 'featured-destinations',
            name: 'Featured Ethiopia destinations',
            items: destinations.slice(0, 6).map((destination) => ({
              name: destination.name,
              path: `/destinations/${destination.slug}`,
              description: destination.intro,
              image: destination.image,
            })),
          }),
        )}
      />
      <Hero />
      <HomeTrustBar />
      <BrandIntro />
      <Destinations />
      <Journeys tours={tours} />
      <WhyEthiopia />
      <Experiences />
      <LayoverTeaser />
      <Testimonial />
      <Gallery />
      <PlanJourney />
    </>
  )
}

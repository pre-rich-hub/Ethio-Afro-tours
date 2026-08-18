import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function Page() {
  const tours = await getToursData()


  return (
    <>
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

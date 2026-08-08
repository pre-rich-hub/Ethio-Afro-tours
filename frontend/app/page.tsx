import { Hero } from '@/components/hero'
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

export default async function Page() {
  const tours = await getToursData()

  return (
    <>
      <Hero />
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


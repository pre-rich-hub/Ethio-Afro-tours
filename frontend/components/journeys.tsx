import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { TourCard } from '@/components/tour-card'
import { LinkButton } from '@/components/link-button'
import { tours as staticTours } from '@/lib/site'
import type { Tour } from '@/lib/site'

export function Journeys({ tours = staticTours }: { tours?: Tour[] }) {
  const featured = tours.filter((t) => t.featured)

  return (
    <section id="tours" className="shell py-20 sm:py-24 lg:py-32">
      <SectionHeading
        eyebrow="Featured Tours"
        title="Curated journeys, never packages"
        lede="A starting point for conversation. Every itinerary is reshaped around your pace, your interests, and the journey you have imagined."
      />

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {featured.map((t, i) => (
          <Reveal key={t.slug} delay={i * 120}>
            <TourCard tour={t} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center sm:mt-14">
        <LinkButton href="/tours" variant="outline">
          Explore All Tours
        </LinkButton>
      </Reveal>
    </section>
  )
}

'use client'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { DestinationCard } from '@/components/destination-card'
import { LinkButton } from '@/components/link-button'
import { destinations } from '@/lib/site'
import { useLanguage } from '@/components/language-provider'

export function Destinations() {
  const { t } = useLanguage()
  const featured = destinations.slice(0, 4)

  return (
    <section id="destinations" className="bg-muted/50 py-20 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={t('destinations.eyebrow', 'Signature Destinations')}
          title={t('destinations.title', 'A country of impossible variety')}
          aside={t('destinations.aside', "From highland cathedrals to volcanic lowlands, each region reveals a different chapter of Ethiopia's story.")}
        />

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
          {featured.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 2) * 120} className={d.span}>
              <DestinationCard destination={d} height="lg" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center sm:mt-14">
          <LinkButton href="/destinations" variant="outline">
            {t('destinations.cta', 'Explore All Destinations')}
          </LinkButton>
        </Reveal>
      </div>
    </section>
  )
}

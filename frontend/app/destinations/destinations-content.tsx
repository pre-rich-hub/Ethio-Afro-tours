'use client'

import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { DestinationCard } from '@/components/destination-card'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { useLanguage } from '@/components/language-provider'
import type { Destination } from '@/lib/site'

const heroImageAlt = 'Bet Giyorgis rock-hewn church in Lalibela, Ethiopia'

export function DestinationsContent({ destinations }: { destinations: Destination[] }) {
  const { t } = useLanguage()
  const regions = Array.from(new Set(destinations.map((d) => d.region)))
  const lalibelaImage = destinations.find((d) => d.slug === 'lalibela')?.image ?? destinations[0]?.image ?? '/placeholder.svg'
  const simienImage = destinations.find((d) => d.slug === 'simien-mountains')?.image ?? destinations[1]?.image ?? lalibelaImage

  return (
    <>
      <PageHero
        eyebrow={t('destinationsPage.hero.eyebrow', 'Where We Travel')}
        title={t('destinationsPage.hero.title', 'Twenty places, and the routes between them')}
        lede={t('destinationsPage.hero.lede', 'From churches carved downward into the rock to a lava lake burning below sea level. These are twenty places our designers connect into thoughtful journeys across Ethiopia.')}
        image={lalibelaImage}
        imageAlt={t('destinationsPage.hero.imageAlt', heroImageAlt)}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('nav.destinations', 'Destinations') },
        ]}
        meta={[
          { label: t('destinationsPage.meta.destinations', 'Destinations'), value: String(destinations.length) },
          { label: t('destinationsPage.meta.unesco', 'UNESCO Sites'), value: '9' },
          { label: t('destinationsPage.meta.altitude', 'Altitude Range'), value: '-125 – 4,533 m' },
          { label: t('destinationsPage.meta.months', 'Best Months'), value: t('destinationsPage.meta.monthsValue', 'Oct – Mar') },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={t('destinationsPage.map.eyebrow', 'The Map')}
          title={t('destinationsPage.map.title', 'Regions we build journeys around')}
          aside={t('destinationsPage.map.aside', 'Most itineraries combine three or four of these. Tell us which pull at you and we will draw the line between them.')}
        />

        <Reveal className="mb-12 flex flex-wrap gap-2 sm:mb-16">
          {regions.map((r) => (
            <span
              key={r}
              className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]"
            >
              {t(`destinationRegion.${r}`, r)}
            </span>
          ))}
        </Reveal>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-12">
          {destinations.map((d, i) => (
            <Reveal
              key={d.slug}
              delay={(i % 2) * 90}
              className={d.span ?? 'lg:col-span-6'}
            >
              <DestinationCard
                destination={d}
                height={i < 2 ? 'lg' : 'md'}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title={t('destinationsPage.cta.title', 'Not sure which Ethiopia is yours?')}
        text={t('destinationsPage.cta.text', 'Send us a sentence about the trip you have in mind — the altitude, the pace, the time of year — and a designer will come back with two or three routes worth considering.')}
        primary={{ label: t('blog.cta.primary', 'Plan Your Journey'), href: '/contact' }}
        secondary={{ label: t('blog.cta.secondary', 'Browse Tours'), href: '/tours' }}
        image={simienImage}
      />
    </>
  )
}

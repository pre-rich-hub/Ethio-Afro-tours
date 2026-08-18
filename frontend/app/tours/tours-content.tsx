'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Users } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { ToursGrid } from '@/components/tours-grid'
import { CtaBand } from '@/components/cta-band'
import { FaqSection } from '@/components/faq-section'
import { useLanguage } from '@/components/language-provider'
import { promises, type Tour } from '@/lib/site'
import { tourFaqs } from '@/lib/faqs'

const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801385/gondar.jpg'

export function ToursContent({ tours }: { tours: Tour[] }) {
  const { t } = useLanguage()
  const hero = tours.find((tour) => tour.featured) ?? tours[0]
  const heroTitle = t(`tour.${hero.slug}.title`, hero.title)
  const heroSummary = t(`tour.${hero.slug}.summary`, hero.summary)
  const heroDays = t(`tour.${hero.slug}.days`, hero.days)
  const heroSeason = t(`tour.${hero.slug}.season`, hero.season)
  const heroGroup = t(`tour.${hero.slug}.group`, hero.group)
  const heroFrom = t(`tour.${hero.slug}.from`, hero.from)

  return (
    <>
      <PageHero
        eyebrow={t('toursPage.hero.eyebrow', 'Tours & Journeys')}
        title={t('toursPage.hero.title', 'Fifteen routes, and none of them fixed')}
        lede={t('toursPage.hero.lede', 'Consider these starting points rather than packages. Each one has been run dozens of times, and each one gets redrawn around the guests travelling it.')}
        image={heroImage}
        imageAlt={t('toursPage.hero.imageAlt', 'The historic royal enclosure of Gondar, Ethiopia')}
        crumbs={[{ label: t('nav.home', 'Home'), href: '/' }, { label: t('nav.tours', 'Tours') }]}
        meta={[
          { label: t('toursPage.meta.journeys', 'Journeys'), value: '15' },
          { label: t('toursPage.meta.length', 'Length'), value: t('toursPage.meta.lengthValue', '4 – 18 Days') },
          { label: t('toursPage.meta.group', 'Group Size'), value: t('toursPage.meta.groupValue', '2 – 10 Guests') },
          { label: t('toursPage.meta.guiding', 'Guiding'), value: t('toursPage.meta.guidingValue', 'Private') },
        ]}
      />

      <section className="border-b border-border">
        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[5/4]">
              <Image
                src={hero.image || '/placeholder.svg'}
                alt={heroTitle}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute left-5 top-5 bg-accent px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                {t('toursPage.featured.badge', 'Most Requested')}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('toursPage.featured.eyebrow', 'Signature Journey')}
            </p>
            <h2 className="text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
              {heroTitle}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {heroSummary}
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                { label: t('tourDetail.meta.duration', 'Duration'), value: heroDays },
                { label: t('tourDetail.meta.season', 'Season'), value: heroSeason },
                { label: t('tourDetail.meta.group', 'Group'), value: heroGroup },
                { label: t('tourDetail.meta.pricing', 'Pricing'), value: heroFrom },
              ].map((m) => (
                <div key={m.label} className="border-t border-border pt-4">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.label}
                  </dt>
                  <dd className="mt-1.5 font-serif text-lg text-foreground sm:text-xl">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {t('tourMeta.nights', '{count} nights').replace('{count}', String(hero.nights))}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {heroGroup}
              </span>
            </div>

            <Link
              href={`/tours/${hero.slug}`}
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:px-8 sm:py-4 sm:text-xs"
            >
              {t('toursPage.featured.cta', 'View the full itinerary')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={t('toursPage.collection.eyebrow', 'The Collection')}
          title={t('toursPage.collection.title', 'Every journey we run')}
          aside={t('toursPage.collection.aside', 'Filter by the kind of travelling you want to do. Any of these can be lengthened, shortened or combined.')}
        />
        <ToursGrid tours={tours} />
      </section>

      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t('toursPage.promises.eyebrow', 'How We Work')}
            title={t('toursPage.promises.title', 'What is true of every journey on this page')}
            tone="dark"
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 90}
                className="border-t border-background/20 pt-6"
              >
                <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                  {t(`tourPromise.${i}.title`, p.title)}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-background/70">
                  {t(`tourPromise.${i}.text`, p.text)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow={t('toursPage.faq.eyebrow', 'Planning Your Journey')}
        title={t('toursPage.faq.title', 'Tour questions, answered plainly')}
        faqs={tourFaqs}
        translationPrefix="tourFaq"
      />

      <CtaBand
        title={t('toursPage.cta.title', 'Or start with a blank page')}
        text={t('toursPage.cta.text', 'Most of our guests end up somewhere between two of these routes. Describe the journey in your head and a designer will draw it properly.')}
        secondary={{ label: t('toursPage.cta.secondary', 'See Destinations'), href: '/destinations' }}
      />
    </>
  )
}

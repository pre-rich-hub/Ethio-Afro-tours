'use client'

import { Check, Plane, ShieldCheck, Clock3, BadgeCheck } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { LayoverEnquiryForm, LayoverPackageLink } from '@/components/layover-enquiry-form'
import { CtaBand } from '@/components/cta-band'
import { FaqSection } from '@/components/faq-section'
import { useLanguage } from '@/components/language-provider'
import { layoverFaqs } from '@/lib/faqs'
import type { LayoverPackage } from '@/lib/site'

const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786970122/Bole_International.jpg'
const heroImageAlt = 'Bole International Airport in Addis Ababa, Ethiopia'

const assurances = [
  {
    icon: Plane,
    title: 'We track your inbound flight',
    text: 'Share your flight number and we will monitor the arrival, then reshape the route around the usable time that remains.',
  },
  {
    icon: BadgeCheck,
    title: 'Visa guidance before arrival',
    text: 'We help you check the current official requirements for your passport. Entry approval and obtaining the correct visa remain the traveller’s responsibility.',
  },
  {
    icon: Clock3,
    title: 'A protected return buffer',
    text: 'We agree the airport return time before departure and shorten the route when traffic, immigration or flight timing requires it.',
  },
  {
    icon: ShieldCheck,
    title: 'Luggage checked case by case',
    text: 'Through-checking depends on your tickets and airlines. Tell us your baggage arrangement so we can plan collection, storage or vehicle space.',
  },
]

export function LayoverContent({ packages }: { packages: LayoverPackage[] }) {
  const { t } = useLanguage()
  const packageCount = packages.length
  const layoverCount = packages.filter((item) => item.packageType === 'layover').length
  const translatedFaqs = layoverFaqs.map((faq, index) => ({
    question: t(`layover.faq.${index}.question`, faq.question),
    answer: t(`layover.faq.${index}.answer`, faq.answer),
  }))
  const packageOptions = packages.map(({ slug, title }) => ({
    slug,
    title: t(`layover.package.${slug}.title`, title),
  }))

  return (
    <>
      <PageHero
        eyebrow={t('layover.page.hero.eyebrow', 'Addis Layover Tours')}
        title={t('layover.page.hero.title', 'A long connection is not a waiting room')}
        lede={t('layover.page.hero.lede', 'A long connection can become a private introduction to Ethiopia — planned around your confirmed flights, entry requirements and a protected return to Bole.')}
        image={heroImage}
        imageAlt={t('layover.page.hero.imageAlt', heroImageAlt)}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('nav.layover', 'Layover') },
        ]}
        meta={[
          { label: t('layover.meta.packages', 'Packages'), value: String(packageCount) },
          { label: t('layover.meta.minimum', 'Minimum'), value: packages[0]?.minimumConnection ?? '8–10 hours' },
          { label: t('layover.meta.pricing', 'Pricing'), value: t('layover.price.custom', 'Custom quote') },
          { label: t('layover.meta.airport', 'Airport'), value: 'Bole (ADD)' },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={t('layover.packages.eyebrow', 'Choose Your Window')}
          title={t('layover.packages.title', `${layoverCount} layovers and one longer stopover`)}
          aside={t('layover.packages.aside', 'Tell us both flight numbers and we will confirm honestly what fits after immigration, traffic and the required airport return buffer.')}
        />

        <div className="space-y-6 sm:space-y-8">
          {packages.map((p, i) => {
            const title = t(`layover.package.${p.slug}.title`, p.title)
            return (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                <article className="group grid gap-0 overflow-hidden border border-border bg-card lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px]">
                    <Image
                      src={p.image || '/placeholder.svg'}
                      alt={title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                    <span className="absolute left-5 top-5 flex items-center gap-2 bg-accent px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-foreground">
                      <Plane className="h-3 w-3" />
                      {p.packageType === 'stopover' ? t('layover.type.stopover', 'Stopover') : t('layover.type.layover', 'Layover')} · {p.minimumConnection}
                    </span>
                  </div>

                  <div className="flex flex-col p-7 sm:p-9 lg:p-10">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="font-serif text-2xl text-foreground sm:text-3xl">
                        {title}
                      </h3>
                      <p className="font-serif text-xl text-primary sm:text-2xl">
                        {t(`layover.package.${p.slug}.price`, p.price)}
                      </p>
                    </div>
                    <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                      {t(`layover.package.${p.slug}.teaser`, p.teaser)}
                    </p>
                    <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-4 text-sm">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t('layover.card.minimum', 'Minimum connection')}</dt>
                        <dd className="mt-1 text-foreground">{p.minimumConnection}</dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{t('layover.card.length', 'Experience length')}</dt>
                        <dd className="mt-1 text-foreground">{t(`layover.package.${p.slug}.hours`, p.hours)}</dd>
                      </div>
                    </dl>

                    <div className="mt-7 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                      <div>
                        <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                          {t('layover.card.day', 'The Day')}
                        </p>
                        <ol className="space-y-2.5">
                          {p.itinerary.map((step, n) => (
                            <li
                              key={step}
                              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                            >
                              <span className="mt-px shrink-0 font-serif text-primary">
                                {String(n + 1).padStart(2, '0')}
                              </span>
                              {t(`layover.package.${p.slug}.itinerary.${n}`, step)}
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                          {t('layover.card.included', 'Included')}
                        </p>
                        <ul className="space-y-2.5">
                          {p.includes.map((inc, n) => (
                            <li
                              key={inc}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                            >
                              <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" />
                              {t(`layover.package.${p.slug}.include.${n}`, inc)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{t('layover.card.notIncluded', 'Not Included')}</p>
                        <ul className="space-y-2.5">
                          {p.excludes.map((item, n) => (
                            <li key={item} className="text-sm leading-relaxed text-muted-foreground">{t(`layover.package.${p.slug}.exclude.${n}`, item)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-6">
                      <p className="max-w-lg text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {t('layover.card.bestFor', 'Best for:')}{' '}
                        <span className="text-foreground">{t(`layover.package.${p.slug}.best`, p.best)}</span>
                      </p>
                      <LayoverPackageLink
                        title={title}
                        label={t('layover.card.choose', 'Choose this package')}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border bg-secondary text-secondary-foreground">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t('layover.logistics.eyebrow', 'Logistics First')}
            title={t('layover.logistics.title', 'On a layover, timing is the whole product')}
            lede={t('layover.logistics.lede', 'Sights are easy. Not missing your onward flight is the part that takes experience.')}
            tone="dark"
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((a, i) => (
              <Reveal
                key={a.title}
                delay={i * 90}
                className="border-t border-background/20 pt-6"
              >
                <a.icon className="mb-4 h-5 w-5 text-accent" aria-hidden />
                <p className="mb-3 font-serif text-xl text-background sm:text-2xl">
                  {t(`layover.assurance.${i}.title`, a.title)}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-background/70">
                  {t(`layover.assurance.${i}.text`, a.text)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="layover-enquiry" className="shell grid scroll-mt-24 gap-12 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('layover.enquiry.eyebrow', 'Book a Layover')}
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {t('layover.enquiry.title', 'Send us your flight numbers')}
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t('layover.enquiry.copy', 'Send both flights and your passport nationality. We will assess the usable window, explain what still needs confirming and propose the right package.')}
          </p>
          <ul className="mt-10 space-y-4">
            {[
              'Feasibility checked before any booking is confirmed',
              'A private route built around your connection',
              'Clear inclusions, exclusions and airport return time',
            ].map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 leading-relaxed text-foreground"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {t(`layover.enquiry.point.${index}`, item)}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <LayoverEnquiryForm packages={packageOptions} />
        </Reveal>
      </section>

      <FaqSection
        eyebrow={t('layover.faq.eyebrow', 'Before You Leave the Airport')}
        title={t('layover.faq.title', 'Layover questions, answered plainly')}
        faqs={translatedFaqs}
      />

      <CtaBand
        title={t('layover.cta.title', 'Have at least 60–72 hours? Consider Lalibela.')}
        text={t('layover.cta.text', 'A longer stopover can include the rock-hewn churches when domestic schedules and a safe buffer before your onward flight line up. We confirm it only after checking both.')}
        primary={{ label: t('layover.cta.primary', 'Plan a Stopover'), href: '/contact' }}
        secondary={{ label: t('layover.cta.secondary', 'See Tours'), href: '/tours' }}
        image="/images/lalibela.png"
      />
    </>
  )
}

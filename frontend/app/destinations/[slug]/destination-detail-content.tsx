'use client'

import Link from 'next/link'
import { ArrowRight, Check, Compass, MapPinned, Mountain, Sparkles } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { TourCard } from '@/components/tour-card'
import { EnquiryForm } from '@/components/enquiry-form'
import { CtaBand } from '@/components/cta-band'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { useLanguage } from '@/components/language-provider'
import type { Destination, Tour } from '@/lib/site'
import type { DestinationDossier } from '@/lib/destination-dossiers'

export function DestinationDetailContent({
  destination,
  relatedTours,
  otherDestinations,
  dossier,
}: {
  destination: Destination
  relatedTours: Tour[]
  otherDestinations: Destination[]
  dossier?: DestinationDossier
}) {
  const { t } = useLanguage()
  const d = destination
  const name = t(`destination.${d.slug}.name`, d.name)
  const tag = t(`destination.${d.slug}.tag`, d.tag)
  const region = t(`destination.${d.slug}.region`, d.region)
  const teaser = t(`destination.${d.slug}.teaser`, d.teaser)
  const intro = t(`destination.${d.slug}.intro`, d.intro)
  const bestTime = t(`destination.${d.slug}.bestTime`, d.bestTime)
  const duration = t(`destination.${d.slug}.duration`, d.duration)

  return (
    <>
      <PageHero
        eyebrow={`${tag} · ${region}`}
        title={name}
        lede={intro}
        image={d.image}
        imageAlt={`${name}, Ethiopia`}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('nav.destinations', 'Destinations'), href: '/destinations' },
          { label: name },
        ]}
        meta={[
          { label: t('destinationDetail.meta.bestTime', 'Best Time'), value: bestTime },
          { label: t('destinationDetail.meta.stay', 'Suggested Stay'), value: duration },
          { label: t('destinationDetail.meta.altitude', 'Altitude'), value: d.altitude },
          { label: t('destinationDetail.meta.region', 'Region'), value: region },
        ]}
      />

      {d.accessNote && (
        <aside className="border-b border-amber-300/50 bg-amber-50 text-amber-950">
          <div className="shell flex items-start gap-3 py-4 text-sm leading-relaxed">
            <MapPinned className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>
              <span className="font-semibold">{t('accessNote.label', 'Current access')}:</span>{' '}
              {d.accessNote}
            </p>
          </div>
        </aside>
      )}

      <section className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('destinationDetail.why.eyebrow', 'Why We Go')}
          </p>
          <h2 className="max-w-[24ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {teaser}
          </h2>
          <div className="mt-8 space-y-6">
            {d.paragraphs.map((p, index) => (
              <p
                key={p.slice(0, 24)}
                className="text-pretty leading-relaxed text-muted-foreground sm:text-lg"
              >
                {t(`destination.${d.slug}.paragraph.${index}`, index === 0 ? intro : teaser)}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-border bg-card p-7 sm:p-9">
            <p className="eyebrow mb-6 text-primary">
              <span className="rule" />
              {t('destinationDetail.highlights', 'Highlights')}
            </p>
            <ul className="space-y-5">
              {d.highlights.map((h, index) => (
                <li key={h} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
                    {t(`destination.${d.slug}.highlight.${index}`, t(`destinationDetail.genericHighlight.${index}`, h))}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 border-t border-border pt-7">
              <Mountain className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t('destinationDetail.combined.prefix', 'Best combined with a stay of')}{' '}
                <span className="text-foreground">{duration}</span>,{' '}
                {t('destinationDetail.combined.middle', 'travelling')}{' '}
                <span className="text-foreground">{bestTime}</span>.
              </p>
            </div>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
            >
              {t('destinationDetail.enquire', 'Enquire about')} {name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {dossier && (
        <section className="border-y border-border bg-background">
          <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-28">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow mb-5 text-accent">
                <span className="rule" />
                {t('destinationDetail.dossier.eyebrow', 'Destination Dossier')}
              </p>
              <h2 className="max-w-[16ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl">
                {t('destinationDetail.dossier.title', 'A deeper read before you arrive')}
              </h2>
              <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                {t('destinationDetail.dossier.copy', 'Concise field context for how this destination works in a private itinerary: what defines it, how to experience it well and what should be planned before arrival.')}
              </p>
            </Reveal>

            <div className="border-t border-border">
              <Reveal className="grid gap-5 border-b border-border py-8 sm:grid-cols-[58px_1fr] sm:py-10">
                <Compass className="mt-1 h-5 w-5 text-accent" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t('destinationDetail.dossier.defines', 'What Defines It')}
                  </p>
                  <p className="mt-3 max-w-3xl text-pretty text-lg leading-relaxed text-foreground">
                    {t(`destinationDossier.${d.slug}.essence`, intro)}
                  </p>
                </div>
              </Reveal>

              <Reveal
                delay={80}
                className="grid gap-5 border-b border-border py-8 sm:grid-cols-[58px_1fr] sm:py-10"
              >
                <MapPinned className="mt-1 h-5 w-5 text-primary" aria-hidden />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t('destinationDetail.dossier.how', 'How To Experience It')}
                  </p>
                  <p className="mt-3 max-w-3xl text-pretty text-lg leading-relaxed text-foreground">
                    {t(`destinationDossier.${d.slug}.howToExperience`, t('destinationDetail.genericHow', dossier.howToExperience))}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120} className="border-b border-border py-8 sm:py-10">
                <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t('destinationDetail.dossier.notes', 'Planning Notes')}
                </p>
                <ul className="grid gap-x-10 gap-y-4 md:grid-cols-3">
                  {dossier.planningNotes.map((note, index) => (
                    <li key={note} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
                        {t(`destinationDossier.${d.slug}.planningNote.${index}`, t(`destinationDetail.genericNote.${index}`, note))}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={160} className="py-8 sm:py-10">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t('destinationDetail.dossier.pairs', 'Pairs Well With')}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-3">
                  {dossier.pairsWellWith.map((item, index) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 border-b border-border pb-2 text-sm font-medium text-foreground"
                    >
                      <Sparkles
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden
                      />
                      {t(`destinationDossier.${d.slug}.pairs.${index}`, t(`destinationPair.${item}`, item))}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4 text-accent sm:mb-5">
                <span className="rule" />
                {t('destinationDetail.related.eyebrow', 'Journeys Including')} {name}
              </p>
              <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
                {t('destinationDetail.related.title', 'Routes that pass through here')}
              </h2>
            </div>
            <Link
              href="/tours"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
            >
              {t('destinationDetail.related.allTours', 'All tours')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTours.map((tour, i) => (
              <Reveal key={tour.slug} delay={i * 90}>
                <TourCard tour={tour} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('destinationDetail.plan.eyebrow', 'Plan This Destination')}
          </p>
          <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {t('destinationDetail.plan.titlePrefix', 'Build')} {name}{' '}
            {t('destinationDetail.plan.titleSuffix', 'into your journey')}
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t('destinationDetail.plan.copy', 'Nothing here is fixed. Tell us how long you have and what else you want to see, and a designer will draw the route — including the flights, the guides and the hours that matter.')}
          </p>

          <div className="mt-12">
            <p className="eyebrow mb-6 text-primary">
              <span className="rule" />
              {t('destinationDetail.also', 'Also Consider')}
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {otherDestinations.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/destinations/${o.slug}`}
                    className="group flex items-center gap-4 border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={o.image || '/placeholder.svg'}
                        alt=""
                        aria-hidden
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-lg text-foreground transition-colors group-hover:text-primary">
                        {t(`destination.${o.slug}.name`, o.name)}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {t(`destination.${o.slug}.region`, o.region)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm subject={name} defaultStyles={['Luxury']} />
        </Reveal>
      </section>

      <CtaBand
        title={t('destinationDetail.cta.title', 'Speak to someone who has been there this season')}
        text={t('destinationDetail.cta.text', 'Our designers travel these routes themselves. Ask about road conditions, festival dates or which lodge has the better view — you will get a straight answer.')}
        primary={{ label: t('blog.cta.primary', 'Plan Your Journey'), href: '/contact' }}
        secondary={{ label: t('destinationDetail.cta.secondary', 'All Destinations'), href: '/destinations' }}
        image={d.image}
      />
    </>
  )
}

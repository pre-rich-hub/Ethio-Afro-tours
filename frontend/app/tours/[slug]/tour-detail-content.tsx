'use client'

import Link from 'next/link'
import { ArrowRight, Check, Clock, Compass, MapPin, X } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { TourCard } from '@/components/tour-card'
import { EnquiryForm } from '@/components/enquiry-form'
import { CtaBand } from '@/components/cta-band'
import { useLanguage } from '@/components/language-provider'
import { getTourPlaceInsights } from '@/lib/tour-place-insights'
import type { Tour } from '@/lib/site'

function insightKey(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function translatedDayLabel(label: string, translate: (key: string, fallback?: string) => string) {
  if (label.startsWith('Days ')) {
    return label.replace('Days', translate('tourDay.days', 'Days'))
  }

  if (label.startsWith('Day ')) {
    return label.replace('Day', translate('tourDay.day', 'Day'))
  }

  return translate('tourDay.stage', 'Stage')
}

export function TourDetailContent({ tour, others }: { tour: Tour; others: Tour[] }) {
  const { t } = useLanguage()
  const item = tour
  const title = t(`tour.${item.slug}.title`, item.title)
  const style = t(`tour.${item.slug}.style`, item.style)
  const teaser = t(`tour.${item.slug}.teaser`, item.teaser)
  const summary = t(`tour.${item.slug}.summary`, item.summary)
  const days = t(`tour.${item.slug}.days`, item.days)
  const season = t(`tour.${item.slug}.season`, item.season)
  const from = t(`tour.${item.slug}.from`, item.from)
  const group = t(`tour.${item.slug}.group`, item.group)
  const placeInsights = getTourPlaceInsights(item.places)

  return (
    <>
      <PageHero
        eyebrow={style}
        title={title}
        lede={teaser}
        image={item.image}
        imageAlt={title}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('nav.tours', 'Tours'), href: '/tours' },
          { label: title },
        ]}
        meta={[
          { label: t('tourDetail.meta.duration', 'Duration'), value: days },
          { label: t('tourDetail.meta.season', 'Season'), value: season },
          { label: t('tourDetail.meta.groupSize', 'Group Size'), value: group },
          { label: t('tourDetail.meta.pricing', 'Pricing'), value: from },
        ]}
      />

      {item.accessNote && (
        <aside className="border-b border-amber-300/50 bg-amber-50 text-amber-950">
          <div className="shell flex items-start gap-3 py-4 text-sm leading-relaxed">
            <Compass className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>
              <span className="font-semibold">{t('accessNote.label', 'Current access')}:</span>{' '}
              {item.accessNote}
            </p>
          </div>
        </aside>
      )}

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('tourDetail.overview.eyebrow', 'The Journey')}
          </p>
          <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {t('tourDetail.overview.title', '{nights} nights, designed around the hours that matter').replace('{nights}', String(item.nights))}
          </h2>
          <p className="mt-7 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {summary}
          </p>

          <div className="mt-10">
            <p className="eyebrow mb-5 text-primary">
              <span className="rule" />
              {t('tourDetail.places', 'Places')}
            </p>
            <ul className="flex flex-wrap gap-2">
              {item.places.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]"
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  {t(`placeName.${p}`, t(`destinationPair.${p}`, p))}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-border bg-card p-7 sm:p-9">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {t('tourDetail.price.eyebrow', 'Indicative price')}
            </p>
            <p className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">
              {from}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t('tourDetail.price.copy', 'tailored to your dates, group and room preferences')}
            </p>

            <dl className="mt-8 space-y-4 border-t border-border pt-8 text-sm">
              {[
                { k: t('tourDetail.meta.duration', 'Duration'), v: `${days} · ${t('tourMeta.nights', '{count} nights').replace('{count}', String(item.nights))}` },
                { k: t('tourDetail.meta.bestSeason', 'Best season'), v: season },
                { k: t('tourDetail.meta.groupSize', 'Group size'), v: group },
                { k: t('tourDetail.meta.style', 'Style'), v: style },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted-foreground">{row.k}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="#enquire"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:text-xs"
            >
              {t('tourDetail.price.cta', 'Enquire about this journey')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {t('tourDetail.price.note', 'Final pricing depends on season, room category and group size. No deposit is taken until the itinerary is right.')}
            </p>
          </div>
        </Reveal>
      </section>

      {placeInsights.length > 0 && (
        <section className="border-y border-border bg-background">
          <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-28">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="max-w-xl">
                <p className="eyebrow mb-5 text-accent">
                  <span className="rule" />
                  {t('tourDetail.intelligence.eyebrow', 'Route Intelligence')}
                </p>
                <h2 className="text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl">
                  {t('tourDetail.intelligence.title', 'The places, read with context')}
                </h2>
                <p className="mt-6 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                  {t('tourDetail.intelligence.copy', 'A concise field briefing for each stop: why it matters, what you experience there, and the details that shape a polished private journey.')}
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
                <div className="bg-card px-5 py-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t('tourDetail.intelligence.stops', 'Stops')}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-foreground">
                    {placeInsights.length}
                  </dd>
                </div>
                <div className="bg-card px-5 py-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t('tourDetail.meta.style', 'Style')}
                  </dt>
                  <dd className="mt-1 font-serif text-2xl text-foreground">
                    {t('tourDetail.private', 'Private')}
                  </dd>
                </div>
              </dl>
            </Reveal>

            <div className="border-t border-border">
              {placeInsights.map((place, i) => {
                const key = insightKey(place.name)
                return (
                  <Reveal
                    key={place.name}
                    delay={(i % 3) * 80}
                    className="grid gap-5 border-b border-border py-8 last:border-b-0 sm:grid-cols-[88px_1fr] sm:py-10"
                  >
                    <div className="font-serif text-3xl leading-none text-accent/80 sm:text-4xl">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <article>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" aria-hidden />
                          {t(`tourPlace.${key}.region`, t(`destinationRegion.${place.region}`, place.region))}
                        </span>
                        <span className="h-px w-5 bg-border" aria-hidden />
                        <span className="text-muted-foreground">
                          {t(`tourPlace.${key}.status`, t('tourPlace.generic.status', 'Curated stop'))}
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                        {t(`placeName.${place.name}`, t(`destinationPair.${place.name}`, place.name))}
                      </h3>
                      <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
                        {t(`tourPlace.${key}.context`, t('tourPlace.generic.context', 'A private journey stop selected for its cultural, natural or historical value, with timing shaped around local conditions.'))}
                      </p>

                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                          <Compass
                            className="mt-1 h-4 w-4 shrink-0 text-primary"
                            aria-hidden
                          />
                          <p className="text-pretty text-sm leading-relaxed text-foreground">
                            {t(`tourPlace.${key}.experience`, t('tourPlace.generic.experience', 'Expect private guiding, local context and a flexible pace that leaves room for real encounters.'))}
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock
                            className="mt-1 h-4 w-4 shrink-0 text-accent"
                            aria-hidden
                          />
                          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground">
                              {t('tourDetail.bestMoment', 'Best moment')}:
                            </span>{' '}
                            {t(`tourPlace.${key}.bestMoment`, t('tourPlace.generic.bestMoment', 'The strongest timing is confirmed close to travel, based on light, access and local advice.'))}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 max-w-3xl border-l border-accent/60 pl-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                        {t(`tourPlace.${key}.logistics`, t('tourPlace.generic.logistics', 'We confirm roads, permits, opening hours and comfort details before locking the final route.'))}
                      </p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('tourDetail.itinerary.eyebrow', 'Day by Day')}
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              {t('tourDetail.itinerary.title', 'The itinerary, as it usually runs')}
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              {t('tourDetail.itinerary.copy', 'A working draft rather than a fixed schedule. We move days around for weather, festivals and how you are feeling.')}
            </p>
          </Reveal>

          <ol className="relative border-l border-border pl-8 sm:pl-12">
            {item.itinerary.map((step, i) => (
              <Reveal
                key={`${step.day}-${step.title}`}
                delay={i * 70}
                as="li"
                className="relative pb-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[38px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-4 ring-muted sm:-left-[54px]"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[11px]">
                  {t(`tour.${item.slug}.itinerary.${i}.day`, translatedDayLabel(step.day, t))}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-[1.75rem]">
                  {t(`tour.${item.slug}.itinerary.${i}.title`, t(`tourItineraryTitle.${step.title}`, t(`placeName.${step.title}`, t('tourGeneric.itineraryTitle', 'Private stage'))))}
                </h3>
                <p className="mt-2.5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {t(`tour.${item.slug}.itinerary.${i}.text`, t(`tourGeneric.itinerary.${i}`, 'Private guiding, carefully timed movement and route details adjusted around the conditions of the day.'))}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-6 text-primary">
            <span className="rule" />
            {t('tourDetail.included', 'What Is Included')}
          </p>
          <ul className="space-y-4">
            {item.includes.map((included, i) => (
              <li key={included} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-pretty leading-relaxed text-foreground">
                  {t(`tour.${item.slug}.include.${i}`, t(`tourGeneric.include.${i}`, included))}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-6 text-muted-foreground">
            <span className="rule" />
            {t('tourDetail.notIncluded', 'Not Included')}
          </p>
          <ul className="space-y-4">
            {item.excludes.map((excluded, i) => (
              <li key={excluded} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                  <X className="h-3 w-3" />
                </span>
                <span className="text-pretty leading-relaxed text-muted-foreground">
                  {t(`tour.${item.slug}.exclude.${i}`, t(`tourGeneric.exclude.${i}`, excluded))}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section
        id="enquire"
        className="border-t border-border bg-secondary text-secondary-foreground"
      >
        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
          <Reveal>
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('tourDetail.enquire.eyebrow', 'Enquire')}
            </p>
            <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-background sm:text-4xl lg:text-5xl">
              {t('tourDetail.enquire.title', 'Make {tour} yours').replace('{tour}', title)}
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-background/70 sm:text-lg">
              {t('tourDetail.enquire.copy', 'Send us your dates and we will confirm availability, quote precisely, and suggest the two or three changes we would make if it were our own trip.')}
            </p>
            <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-background/70">
              {t('tourDetail.enquire.runs', 'Runs')} {season} · {group} ·{' '}
              <span className="text-background">{from}</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm
              subject={title}
              defaultStyles={item.style.split('·').map((s) => s.trim())}
            />
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-20 lg:py-28">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-accent sm:mb-5">
              <span className="rule" />
              {t('tourDetail.other.eyebrow', 'Other Journeys')}
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
              {t('tourDetail.other.title', 'You may also be weighing up')}
            </h2>
          </div>
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
          >
            {t('tourDetail.other.all', 'All tours')}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => (
            <Reveal key={other.slug} delay={i * 90}>
              <TourCard tour={other} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title={t('tourDetail.cta.title', 'Questions before you enquire?')}
        text={t('tourDetail.cta.text', 'Altitude, road time, how hard the walking really is, whether the children will cope. Ask us anything; a designer will answer honestly.')}
        secondary={{ label: t('tourDetail.cta.secondary', 'Layover Tours'), href: '/layover' }}
        image={item.image}
      />
    </>
  )
}

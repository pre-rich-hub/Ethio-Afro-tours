import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, MapPin, X } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { TourCard } from '@/components/tour-card'
import { EnquiryForm } from '@/components/enquiry-form'
import { CtaBand } from '@/components/cta-band'
import { getTour, tours } from '@/lib/site'

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const t = getTour(slug)
  if (!t) return { title: 'Journey not found' }
  return {
    title: t.title,
    description: t.summary,
    openGraph: { title: t.title, description: t.summary, images: [t.image] },
  }
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const t = getTour(slug)
  if (!t) notFound()

  const others = tours.filter((o) => o.slug !== t.slug).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={t.style}
        title={t.title}
        lede={t.teaser}
        image={t.image}
        imageAlt={t.title}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tours', href: '/tours' },
          { label: t.title },
        ]}
        meta={[
          { label: 'Duration', value: t.days },
          { label: 'Season', value: t.season },
          { label: 'Group Size', value: t.group },
          { label: 'From', value: t.from.split(' ')[0] },
        ]}
      />

      {/* Overview + places */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            The Journey
          </p>
          <h2 className="max-w-[22ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {t.nights} nights, designed around the hours that matter
          </h2>
          <p className="mt-7 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t.summary}
          </p>

          <div className="mt-10">
            <p className="eyebrow mb-5 text-primary">
              <span className="rule" />
              Places
            </p>
            <ul className="flex flex-wrap gap-2">
              {t.places.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px]"
                >
                  <MapPin className="h-3 w-3 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-border bg-card p-7 sm:p-9">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Indicative price
            </p>
            <p className="mt-2 font-serif text-3xl text-foreground sm:text-4xl">
              {t.from.split(' per')[0]}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              per person, twin share
            </p>

            <dl className="mt-8 space-y-4 border-t border-border pt-8 text-sm">
              {[
                { k: 'Duration', v: `${t.days} · ${t.nights} nights` },
                { k: 'Best season', v: t.season },
                { k: 'Group size', v: t.group },
                { k: 'Style', v: t.style },
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
              Enquire about this journey
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Final pricing depends on season, room category and group size. No
              deposit is taken until the itinerary is right.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Itinerary */}
      <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <Reveal className="mb-12 max-w-2xl sm:mb-16">
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              Day by Day
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
              The itinerary, as it usually runs
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
              A working draft rather than a fixed schedule — we move days around
              for weather, festivals and how you are feeling.
            </p>
          </Reveal>

          <ol className="relative border-l border-border pl-8 sm:pl-12">
            {t.itinerary.map((step, i) => (
              <Reveal
                key={step.day}
                delay={i * 70}
                as="li"
                className="relative pb-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute -left-[38px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-4 ring-muted sm:-left-[54px]"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[11px]">
                  {step.day}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-foreground sm:text-[1.75rem]">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Includes / excludes */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-6 text-primary">
            <span className="rule" />
            What Is Included
          </p>
          <ul className="space-y-4">
            {t.includes.map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-pretty leading-relaxed text-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <p className="eyebrow mb-6 text-muted-foreground">
            <span className="rule" />
            Not Included
          </p>
          <ul className="space-y-4">
            {t.excludes.map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground">
                  <X className="h-3 w-3" />
                </span>
                <span className="text-pretty leading-relaxed text-muted-foreground">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Enquire */}
      <section
        id="enquire"
        className="border-t border-border bg-secondary text-secondary-foreground"
      >
        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
          <Reveal>
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              Enquire
            </p>
            <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-background sm:text-4xl lg:text-5xl">
              Make {t.title} yours
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-background/70 sm:text-lg">
              Send us your dates and we will confirm availability, quote
              precisely, and suggest the two or three changes we would make if it
              were our own trip.
            </p>
            <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-background/70">
              Runs {t.season} · {t.group} · from{' '}
              <span className="text-background">{t.from}</span>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <EnquiryForm
              subject={t.title}
              defaultStyles={t.style.split('·').map((s) => s.trim())}
            />
          </Reveal>
        </div>
      </section>

      {/* Other journeys */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-accent sm:mb-5">
              <span className="rule" />
              Other Journeys
            </p>
            <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
              You may also be weighing up
            </h2>
          </div>
          <Link
            href="/tours"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
          >
            All tours
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 90}>
              <TourCard tour={o} />
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Questions before you enquire?"
        text="Altitude, road time, how hard the walking really is, whether the children will cope. Ask us anything — a designer will answer honestly."
        secondary={{ label: 'Layover Tours', href: '/layover' }}
        image={t.image}
      />
    </>
  )
}

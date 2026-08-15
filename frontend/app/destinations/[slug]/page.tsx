import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Mountain } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { TourCard } from '@/components/tour-card'
import { EnquiryForm } from '@/components/enquiry-form'
import { CtaBand } from '@/components/cta-band'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { cloudinaryImageUrl } from '@/lib/cloudinary'
import { destinations, getDestination, tours } from '@/lib/site'

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) return { title: 'Destination not found' }
  return {
    title: d.name,
    description: d.intro,
    openGraph: {
      title: d.name,
      description: d.intro,
      images: [cloudinaryImageUrl(d.image, { width: 1200, quality: 82 })],
    },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const d = getDestination(slug)
  if (!d) notFound()

  const related = tours.filter((t) => t.places.some((p) => p.includes(d.name.split(' ')[0]))).slice(0, 3)
  const fallback = related.length ? related : tours.slice(0, 3)
  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 4)

  return (
    <>
      <PageHero
        eyebrow={`${d.tag} · ${d.region}`}
        title={d.name}
        lede={d.intro}
        image={d.image}
        imageAlt={`${d.name}, Ethiopia`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Destinations', href: '/destinations' },
          { label: d.name },
        ]}
        meta={[
          { label: 'Best Time', value: d.bestTime },
          { label: 'Suggested Stay', value: d.duration },
          { label: 'Altitude', value: d.altitude },
          { label: 'Region', value: d.region },
        ]}
      />

      {/* Essay + highlights */}
      <section className="shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            Why We Go
          </p>
          <h2 className="max-w-[24ch] text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
            {d.teaser}
          </h2>
          <div className="mt-8 space-y-6">
            {d.paragraphs.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-pretty leading-relaxed text-muted-foreground sm:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="border border-border bg-card p-7 sm:p-9">
            <p className="eyebrow mb-6 text-primary">
              <span className="rule" />
              Highlights
            </p>
            <ul className="space-y-5">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-pretty text-sm leading-relaxed text-foreground sm:text-base">
                    {h}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 border-t border-border pt-7">
              <Mountain className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Best combined with a stay of{' '}
                <span className="text-foreground">{d.duration}</span>, travelling{' '}
                <span className="text-foreground">{d.bestTime}</span>.
              </p>
            </div>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
            >
              Enquire about {d.name}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Related tours */}
      <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4 text-accent sm:mb-5">
                <span className="rule" />
                Journeys Including {d.name}
              </p>
              <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
                Routes that pass through here
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
            {fallback.map((t, i) => (
              <Reveal key={t.slug} delay={i * 90}>
                <TourCard tour={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            Plan This Destination
          </p>
          <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            Build {d.name} into your journey
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            Nothing here is fixed. Tell us how long you have and what else you
            want to see, and a designer will draw the route — including the
            flights, the guides and the hours that matter.
          </p>

          <div className="mt-12">
            <p className="eyebrow mb-6 text-primary">
              <span className="rule" />
              Also Consider
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {others.map((o) => (
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
                        {o.name}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {o.region}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm subject={d.name} defaultStyles={['Luxury']} />
        </Reveal>
      </section>

      <CtaBand
        title="Speak to someone who has been there this season"
        text="Our designers travel these routes themselves. Ask about road conditions, festival dates or which lodge has the better view — you will get a straight answer."
        secondary={{ label: 'All Destinations', href: '/destinations' }}
        image={d.image}
      />
    </>
  )
}

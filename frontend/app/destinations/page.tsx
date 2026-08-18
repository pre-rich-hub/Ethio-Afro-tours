import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { DestinationCard } from '@/components/destination-card'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { JsonLd } from '@/components/json-ld'
import { destinations } from '@/lib/site'
import { buildBreadcrumbList, pageStructuredData } from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'

const regions = Array.from(new Set(destinations.map((d) => d.region)))
const lalibelaImage = destinations.find((d) => d.slug === 'lalibela')?.image ?? '/placeholder.svg'
const simienImage = destinations.find((d) => d.slug === 'simien-mountains')?.image ?? '/placeholder.svg'
const pageTitle = 'Destinations'
const pageDescription =
  'Explore twenty of Ethiopia’s defining destinations, from rock-hewn churches and ancient cities to volcanic lowlands, highland parks and living cultural landscapes.'
const heroImageAlt = 'Bet Giyorgis rock-hewn church in Lalibela, Ethiopia'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/destinations' },
  ...buildSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/destinations',
    image: lalibelaImage,
    imageAlt: heroImageAlt,
  }),
}

export default function DestinationsPage() {
  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Destinations', path: '/destinations' },
          ]),
        )}
      />
      <PageHero
        eyebrow="Where We Travel"
        title="Twenty places, and the routes between them"
        lede="From churches carved downward into the rock to a lava lake burning below sea level. These are twenty places our designers connect into thoughtful journeys across Ethiopia."
        image={lalibelaImage}
        imageAlt={heroImageAlt}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Destinations' }]}
        meta={[
          { label: 'Destinations', value: '20' },
          { label: 'UNESCO Sites', value: '9' },
          { label: 'Altitude Range', value: '-125 – 4,533 m' },
          { label: 'Best Months', value: 'Oct – Mar' },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Map"
          title="Regions we build journeys around"
          aside="Most itineraries combine three or four of these. Tell us which pull at you and we will draw the line between them."
        />

        <Reveal className="mb-12 flex flex-wrap gap-2 sm:mb-16">
          {regions.map((r) => (
            <span
              key={r}
              className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]"
            >
              {r}
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
        title="Not sure which Ethiopia is yours?"
        text="Send us a sentence about the trip you have in mind — the altitude, the pace, the time of year — and a designer will come back with two or three routes worth considering."
        secondary={{ label: 'Browse Tours', href: '/tours' }}
        image={simienImage}
      />
    </>
  )
}

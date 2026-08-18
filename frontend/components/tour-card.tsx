'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import type { Tour } from '@/lib/site'
import { useLanguage } from '@/components/language-provider'

export function TourCard({
  tour: t,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
}: {
  tour: Tour
  sizes?: string
}) {
  const { t: translate } = useLanguage()
  const title = translate(`tour.${t.slug}.title`, t.title)
  const style = translate(`tour.${t.slug}.style`, t.style)
  const teaser = translate(`tour.${t.slug}.teaser`, t.teaser)
  const from = translate(`tour.${t.slug}.from`, t.from)
  const season = translate(`tour.${t.slug}.season`, t.season)
  const days = translate(`tour.${t.slug}.days`, t.days)
  const group = translate(`tour.${t.slug}.group`, t.group)

  return (
    <Link
      href={`/tours/${t.slug}`}
      className="group relative block overflow-hidden rounded-sm h-[360px] sm:h-[440px] lg:h-[480px] w-full"
    >
      <Image
        src={t.image || '/placeholder.svg'}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent z-10" />

      {/* Top Left: Price & Season Details */}
      <div className="absolute left-4 top-4 flex flex-col gap-1.5 sm:left-5 sm:top-5 z-20">
        <span className="rounded-full bg-background/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur-sm shadow-sm w-fit">
          {from}
        </span>
        <span className="rounded-full bg-charcoal/70 border border-sand/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-sand backdrop-blur-sm shadow-sm w-fit">
          {season}
        </span>
      </div>

      {/* Bottom Text Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8 z-20">
        {/* Metadata tag line */}
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          {days} · {group} · {style}
        </p>

        {/* Title */}
        <h3 className="font-serif text-2xl text-background sm:text-3xl leading-tight">
          {title}
        </h3>

        {/* Teaser text on mobile (always visible) */}
        <p className="mt-2 max-w-[42ch] text-pretty text-xs leading-relaxed text-background/80 sm:hidden font-sans">
          {teaser}
        </p>

        {/* Teaser text on desktop/tablet (slides up on hover) */}
        <div className="hidden grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] sm:grid">
          <div className="overflow-hidden">
            <p className="max-w-[44ch] pt-3 text-pretty text-sm leading-relaxed text-background/85 font-sans">
              {teaser}
            </p>
          </div>
        </div>

        {/* View Itinerary link */}
        <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/90 group-hover:text-accent transition-colors duration-300">
          <span>{translate('tour.view', 'View Itinerary')}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </div>
      </div>

      {/* Top Right: Arrow indicator matching DestinationCard pattern */}
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-background/40 bg-charcoal/25 text-background backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground sm:h-10 sm:w-10 sm:right-5 sm:top-5 z-20">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  )
}

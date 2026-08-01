import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Destination } from '@/lib/site'
import { cn } from '@/lib/utils'

export function DestinationCard({
  destination: d,
  className,
  height = 'md',
  sizes = '(max-width: 1024px) 100vw, 55vw',
}: {
  destination: Destination
  className?: string
  height?: 'md' | 'lg'
  sizes?: string
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-sm',
        height === 'lg'
          ? 'h-[340px] sm:h-[420px] lg:h-[460px]'
          : 'h-[300px] sm:h-[380px] lg:h-[420px]',
        className,
      )}
    >
      <Image
        src={d.image || '/placeholder.svg'}
        alt={`${d.name}, Ethiopia`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          {d.tag} · {d.region}
        </p>
        <h3 className="font-serif text-2xl text-background sm:text-3xl lg:text-4xl">
          {d.name}
        </h3>
        <p className="mt-2 max-w-[42ch] text-pretty text-sm leading-relaxed text-background/80 sm:hidden">
          {d.teaser}
        </p>
        <div className="hidden grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr] sm:grid">
          <div className="overflow-hidden">
            <p className="max-w-[44ch] pt-3 text-pretty leading-relaxed text-background/85">
              {d.teaser}
            </p>
          </div>
        </div>
      </div>

      <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-background/40 bg-charcoal/25 text-background backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground sm:h-11 sm:w-11">
        <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>
    </Link>
  )
}

'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'

const tripadvisorUrl =
  'https://www.tripadvisor.com/Attraction_Review-g293791-d15214552-Reviews-Ethio_Afro_Tours-Addis_Ababa.html'

export function VerifiedReviewsBadge() {
  return (
    <Link
      href={tripadvisorUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read verified TripAdvisor reviews for EthioAfro Tours"
      className="fixed bottom-4 left-4 z-40 flex items-center gap-3 rounded-full border border-primary/30 bg-primary px-4 py-3 text-primary-foreground shadow-2xl shadow-charcoal/25 ring-1 ring-background/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-charcoal/35 sm:bottom-6 sm:left-6 sm:px-5"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-primary-foreground/10 text-accent shadow-inner">
        <Star className="h-5 w-5 fill-current" aria-hidden />
      </span>
      <span className="leading-none">
        <span className="block text-sm font-bold sm:text-base">4.9 Excellent</span>
        <span className="mt-1.5 block text-[11px] font-medium uppercase tracking-[0.28em] text-primary-foreground/70 sm:text-xs">
          Verified Reviews
        </span>
      </span>
    </Link>
  )
}

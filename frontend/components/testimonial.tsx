'use client'

import Link from 'next/link'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/components/language-provider'

const tripadvisorUrl =
  'https://www.tripadvisor.com/Attraction_Review-g293791-d15214552-Reviews-Ethio_Afro_Tours-Addis_Ababa.html'

const reviews = [
  {
    title: 'Unforgettable Ethiopia Adventure',
    excerpt: 'Everything was perfectly organized and exceeded our expectations.',
    author: 'Mulugeta Z',
    date: 'July 2026',
    trip: 'Two-week Northern Ethiopia and Danakil journey',
    initials: 'MZ',
  },
  {
    title: 'Wonderful Time',
    excerpt: 'I never once felt unsafe and the team was beyond caring.',
    author: 'Estibel C',
    date: 'January 2025',
    trip: 'Solo Bale, Simien and Omo Valley journey',
    initials: 'EC',
  },
  {
    title: 'Excellent Tour Operators',
    excerpt: 'A reliable and honest guide with customer satisfaction in mind.',
    author: 'Aden D',
    date: 'January 2025',
    trip: 'Southern, Danakil and Northern Ethiopia tour',
    initials: 'AD',
  },
]

function RatingDots({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = {
    sm: 'h-4 w-4 border-[2px]',
    md: 'h-5 w-5 border-[2px]',
    lg: 'h-8 w-8 border-[3px]',
  }[size]

  return (
    <div className="flex gap-1.5 text-[#00AA6C]" aria-label="5 out of 5 rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`${sizeClass} rounded-full border-current bg-transparent p-[3px]`}
          aria-hidden
        >
          <span className="block h-full w-full rounded-full bg-current" />
        </span>
      ))}
    </div>
  )
}

export function Testimonial() {
  const { t } = useLanguage()

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-center">
            <aside className="text-center lg:text-left">
              <p className="eyebrow justify-center text-accent lg:justify-start">
                <span className="rule" />
                {t('testimonial.eyebrow', 'In Their Words')}
              </p>
              <h2 className="mt-6 text-balance font-sans text-3xl font-bold uppercase leading-none tracking-normal text-foreground">
                Excellent
              </h2>
              <div className="mt-5 flex justify-center lg:justify-start">
                <RatingDots size="lg" />
              </div>
              <p className="mt-4 text-base text-foreground">
                Based on <span className="font-bold">84 reviews</span>
              </p>
              <div className="mt-5 inline-flex items-center gap-2">
                <img
                  src="/images/tripadvisor-logo.png"
                  alt="TripAdvisor"
                  className="h-6 w-auto object-contain"
                />
              </div>
              <Link
                href={tripadvisorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent"
              >
                View all reviews
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </aside>

            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <figure
                  key={`${review.author}-${review.date}`}
                  className="flex min-h-[292px] flex-col rounded-lg bg-muted/70 p-6 shadow-sm shadow-charcoal/5 transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:shadow-charcoal/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-bold text-primary ring-1 ring-border">
                        {review.initials}
                      </span>
                      <span>
                        <span className="block text-base font-bold text-foreground">{review.author}</span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </span>
                    </div>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00AA6C] text-white">
                      <img
                        src="/images/tripadvisor-logo.png"
                        alt=""
                        className="h-4 w-4 object-contain brightness-0 invert"
                        aria-hidden
                      />
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <RatingDots size="sm" />
                    <CheckCircle2 className="h-4 w-4 fill-primary text-primary" aria-hidden />
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-foreground">
                    {review.title}
                  </h3>
                  <blockquote className="mt-2 line-clamp-3 text-pretty text-base leading-relaxed text-foreground">
                    {review.excerpt}
                  </blockquote>
                  <figcaption className="mt-auto pt-5">
                    <span className="block line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {review.trip}
                    </span>
                    <Link
                      href={tripadvisorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      Read more
                    </Link>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

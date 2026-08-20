'use client'

import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/components/language-provider'

const googleReviewsUrl = 'https://www.google.com/search?q=Ethio+Afro+Tours+reviews'

const reviews = [
  {
    excerpt:
      'Everything was perfectly organized. Our guide knew the history, the best timing and the small details that made each stop feel personal...',
    author: 'Mulugeta Z',
    date: '11 August 2026',
    initials: 'MZ',
    avatar: null,
    image: '/images/lalibela.png',
  },
  {
    excerpt:
      'The Ethio Afro team did a great job with a very informative and entertaining tour. We felt looked after from Addis to the highlands...',
    author: 'Estibel C',
    date: '10 August 2026',
    initials: 'EC',
    avatar: null,
    image: '/images/addis-skyline.png',
  },
  {
    excerpt:
      'Amazing, interesting tour with a thoughtful guide. The route was paced well and the coffee ceremony at the end was a real highlight...',
    author: 'Aden D',
    date: '8 August 2026',
    initials: 'AD',
    avatar: '/placeholder-user.jpg',
    image: '/images/coffee-ceremony.png',
  },
  {
    excerpt:
      'A smooth, warm and knowledgeable team. They handled the domestic flights, hotels and guide timing so the whole journey felt relaxed...',
    author: 'Helen R',
    date: '6 August 2026',
    initials: 'HR',
    avatar: null,
    image: '/images/hero-gondar.jpg',
  },
  {
    excerpt:
      'Our Danakil trip was carefully managed from start to finish. The crew was honest about conditions and very attentive in the field...',
    author: 'Marco L',
    date: '3 August 2026',
    initials: 'ML',
    avatar: null,
    image: '/images/danakil.png',
  },
  {
    excerpt:
      'Great local knowledge, kind drivers and excellent pacing. We saw far more than expected without feeling rushed at any point...',
    author: 'Sara W',
    date: '29 July 2026',
    initials: 'SW',
    avatar: null,
    image: '/images/lake-tana.png',
  },
]

function GoogleWordmark({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className="font-sans text-2xl font-bold leading-none text-[#4285F4]" aria-label="Google">
        G
      </span>
    )
  }

  return (
    <span className="font-sans text-[34px] font-medium leading-none tracking-normal" aria-label="Google">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  )
}

function RatingStars({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-10 w-10 sm:h-11 sm:w-11',
  }[size]

  return (
    <div className="flex items-center gap-0.5 text-[#fbbc04]" aria-label="5 out of 5 rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`${sizeClass} fill-current stroke-current`} aria-hidden />
      ))}
    </div>
  )
}

export function Testimonial() {
  const { t } = useLanguage()
  const railRef = useRef<HTMLDivElement>(null)

  function scrollReviews(direction: 'previous' | 'next') {
    const rail = railRef.current
    if (!rail) return

    rail.scrollBy({
      left: direction === 'next' ? rail.clientWidth * 0.72 : -rail.clientWidth * 0.72,
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-card py-14 lg:py-20">
      <div className="shell">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-center">
            <aside className="text-center lg:text-left">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t('testimonial.eyebrow', 'Verified guest reviews')}
              </p>
              <h2 className="mt-4 font-sans text-3xl font-black uppercase leading-none tracking-normal text-foreground">
                Excellent
              </h2>
              <div className="mt-5 flex justify-center lg:justify-start">
                <RatingStars size="lg" />
              </div>
              <p className="mt-4 text-base text-foreground">
                Based on{' '}
                <span className="font-bold underline decoration-foreground/35 underline-offset-2">
                  84 reviews
                </span>
              </p>
              <div className="mt-4">
                <GoogleWordmark />
              </div>
              <Link
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                View all reviews
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </aside>

            <div className="relative min-w-0">
              <button
                type="button"
                aria-label="Show previous reviews"
                onClick={() => scrollReviews('previous')}
                className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-card text-muted-foreground shadow-md ring-1 ring-border transition hover:text-foreground sm:-translate-x-1/2"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Show next reviews"
                onClick={() => scrollReviews('next')}
                className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full bg-card text-muted-foreground shadow-md ring-1 ring-border transition hover:text-foreground sm:translate-x-1/2"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>

              <div
                ref={railRef}
                className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {reviews.map((review) => (
                  <figure
                    key={`${review.author}-${review.date}`}
                    className="flex min-h-[260px] w-[295px] shrink-0 snap-start flex-col bg-card p-0 sm:w-[320px] lg:w-[330px]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        {review.avatar ? (
                          <img
                            src={review.avatar}
                            alt=""
                            className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-border"
                          />
                        ) : (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7e57c2] font-sans text-xl font-medium text-white ring-1 ring-border">
                            {review.initials.slice(0, 1)}
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block truncate font-sans text-base font-bold text-foreground">
                            {review.author}
                          </span>
                          <span className="mt-0.5 block text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </span>
                      </div>
                      <GoogleWordmark compact />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <RatingStars size="sm" />
                      <BadgeCheck className="h-4 w-4 fill-[#4285F4] text-white" aria-hidden />
                    </div>

                    <div className="mt-4 grid grid-cols-[minmax(0,1fr)_92px] gap-4">
                      <blockquote className="line-clamp-4 text-pretty font-sans text-[17px] leading-snug text-foreground">
                        {review.excerpt}
                      </blockquote>
                      <img
                        src={review.image}
                        alt=""
                        className="h-[92px] w-[92px] rounded-lg object-cover"
                      />
                    </div>

                    <figcaption className="mt-auto pt-4">
                      <Link
                        href={googleReviewsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        Read more
                      </Link>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

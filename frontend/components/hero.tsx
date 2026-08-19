'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { useLanguage } from '@/components/language-provider'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg"
          alt={t('hero.alt', 'Bet Giyorgis (Church of St. George) in Lalibela, Ethiopia, a historic monolithic rock-hewn church')}
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/10 to-transparent" />
      </div>

      <div className="shell flex flex-1 flex-col items-center justify-center text-center pb-10 pt-32 sm:pb-14 lg:pb-16">
        <h1 className="max-w-[20ch] text-balance text-[2.6rem] font-medium leading-[1.04] text-background text-shadow-soft [animation:fade-up_1s_ease_0.1s_both] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          {t('hero.title', 'Discover the Soul of Ethiopia')}
        </h1>

        <p className="mt-5 max-w-[56ch] text-pretty leading-relaxed text-background/85 [animation:fade-up_1s_ease_0.25s_both] sm:mt-7 sm:text-lg">
          {t('hero.copy', 'Explore Ethiopia’s ancient kingdoms, landscapes, and living traditions on a private journey shaped around you.')}
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 [animation:fade-up_1s_ease_0.4s_both] sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Link
            href="/tours"
            className="group inline-flex items-center justify-center gap-2.5 rounded-sm border border-background/40 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-background/10 sm:text-xs"
          >
            {t('hero.primary', 'Explore Tours')}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 rounded-sm border border-background/40 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-background transition-colors duration-305 hover:bg-background/10 sm:text-xs"
          >
            {t('hero.secondary', 'Contact Us')}
          </Link>
        </div>
      </div>
    </section>
  )
}

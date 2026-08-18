'use client'

import { useMemo, useState } from 'react'
import { Reveal } from '@/components/reveal'
import { TourCard } from '@/components/tour-card'
import { useLanguage } from '@/components/language-provider'
import { tourCategories, type Tour } from '@/lib/site'

export function ToursGrid({ tours }: { tours: Tour[] }) {
  const { t } = useLanguage()
  const filters = useMemo(() => {
    const available = new Set(tours.flatMap((tour) => tour.categories))
    return ['All Journeys', ...tourCategories.filter((category) => available.has(category))]
  }, [tours])

  const [active, setActive] = useState('All Journeys')

  const visible =
    active === 'All Journeys'
      ? tours
      : tours.filter((t) => t.categories.includes(active as Tour['categories'][number]))

  return (
    <div>
      <div
        role="group"
        aria-label={t('toursGrid.aria', 'Filter journeys by style')}
        className="mb-12 flex flex-wrap gap-2 sm:mb-16"
      >
        {filters.map((f) => {
          const on = f === active
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f)}
              className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 sm:text-[11px] ${
                on
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {t(`tourCategory.${f}`, f)}
            </button>
          )
        })}
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 3) * 90}>
            <TourCard tour={t} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">
          {t('toursGrid.empty', 'No journeys in this style yet; but we will design one.')}
        </p>
      )}
    </div>
  )
}

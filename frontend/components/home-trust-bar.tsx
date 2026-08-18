'use client'

import {
  Car,
  Gem,
  HandHeart,
  Leaf,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useLanguage } from '@/components/language-provider'

const highlights = [
  {
    title: '16+ Years',
    label: 'Experience',
    icon: ShieldCheck,
  },
  {
    title: 'Luxury & Custom',
    label: 'Itineraries',
    icon: Gem,
  },
  {
    title: 'Authentic Local',
    label: 'Experiences',
    icon: HandHeart,
  },
  {
    title: 'Comfortable',
    label: 'Transportation',
    icon: Car,
  },
  {
    title: 'Sustainable',
    label: 'Tourism',
    icon: Leaf,
  },
  {
    title: 'Small Groups &',
    label: 'Private Tours',
    icon: Users,
  },
]

export function HomeTrustBar() {
  const { t } = useLanguage()

  return (
    <section className="relative z-20 pt-8 pb-4 lg:pt-12 lg:pb-6 bg-background">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div className="grid grid-cols-2 divide-x divide-y divide-border/60 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
                {highlights.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={`${item.title}-${item.label}`}
                      className="flex min-h-28 items-center gap-3 px-4 py-5 sm:px-5 lg:min-h-24 lg:justify-center hover:bg-neutral-50/50 transition-colors duration-300"
                    >
                      <Icon className="h-8 w-8 shrink-0 text-accent lg:h-9 lg:w-9" />
                      <p className="text-[11px] font-bold uppercase leading-snug tracking-[0.04em] text-foreground">
                        <span className="block">{t(`trust.${index}.title`, item.title)}</span>
                        <span className="block">{t(`trust.${index}.label`, item.label)}</span>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

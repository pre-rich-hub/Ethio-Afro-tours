'use client'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { useLanguage } from '@/components/language-provider'
import type { FaqItem } from '@/lib/faqs'

type FaqSectionProps = {
  eyebrow: string
  title: string
  faqs: readonly FaqItem[]
  translationPrefix?: string
}

export function FaqSection({ eyebrow, title, faqs, translationPrefix }: FaqSectionProps) {
  const { t } = useLanguage()

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="grid gap-5 lg:grid-cols-2">
          {faqs.map((item, index) => (
            <Reveal
              key={item.question}
              delay={(index % 2) * 80}
              className="border border-border bg-card p-6 sm:p-8"
            >
              <h3 className="font-serif text-xl text-foreground sm:text-2xl">
                {translationPrefix
                  ? t(`${translationPrefix}.${index}.question`, item.question)
                  : item.question}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {translationPrefix
                  ? t(`${translationPrefix}.${index}.answer`, item.answer)
                  : item.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

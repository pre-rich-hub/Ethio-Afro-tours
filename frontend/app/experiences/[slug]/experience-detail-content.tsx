'use client'

import Link from 'next/link'
import { ArrowRight, Check, MapPin, Sparkles } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { LinkButton } from '@/components/link-button'
import { EnquiryForm } from '@/components/enquiry-form'
import { useLanguage } from '@/components/language-provider'
import type { ExperiencePage } from '@/lib/experience-pages'

type ExperienceDetailPage = Omit<ExperiencePage, 'highlights'> & {
  highlights: { title: string; text: string }[]
}

const highlightIcons = [Sparkles, MapPin, Check]

export function ExperienceDetailContent({
  page,
}: {
  page: ExperienceDetailPage
}) {
  const { t } = useLanguage()
  const title = t(`experience.${page.slug}.title`, page.title)
  const lede = t(`experience.${page.slug}.detail.lede`, t(`experience.${page.slug}.text`, page.lede))

  return (
    <>
      <PageHero
        eyebrow={t(`experience.${page.slug}.detail.eyebrow`, page.eyebrow)}
        title={title}
        lede={lede}
        image={page.heroImage}
        imageAlt={t(`experience.${page.slug}.detail.imageAlt`, page.imageAlt)}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('experiences.eyebrow', 'Experiences'), href: '/#experiences' },
          { label: title },
        ]}
        meta={page.meta.map((item, index) => ({
          label: t(`experienceDetail.meta.${item.label}`, item.label),
          value: t(`experience.${page.slug}.meta.${index}`, t(`experienceDetail.metaValue.${index}`, item.value)),
        }))}
      />

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('experienceDetail.overview.eyebrow', 'The Experience')}
          </p>
          <h2 className="max-w-[21ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {t(`experience.${page.slug}.overviewTitle`, t('experienceDetail.generic.overviewTitle', 'A private experience shaped around access, pace and context'))}
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {page.overview.map((paragraph, index) => (
              <p key={paragraph.slice(0, 48)}>
                {t(`experience.${page.slug}.overview.${index}`, t(`experienceDetail.generic.overview.${index}`, lede))}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="lg:sticky lg:top-28">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              {t('experienceDetail.signature', 'Signature Details')}
            </p>
            <dl className="border-t border-border">
              {page.signature.map((item, index) => (
                <div
                  key={item.label}
                  className="grid gap-2 border-b border-border py-5 sm:grid-cols-[130px_1fr]"
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {t(`experienceDetail.signatureLabel.${item.label}`, t(`experienceDetail.signatureLabel.${index}`, item.label))}
                  </dt>
                  <dd className="text-pretty font-serif text-xl leading-snug text-foreground">
                    {t(`experience.${page.slug}.signature.${index}`, t(`experienceDetail.generic.signature.${index}`, item.value))}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex">
              <LinkButton href="/contact" variant="outline">
                {t('experienceDetail.planButton', 'Plan This Experience')}
              </LinkButton>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-muted/25">
        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-28">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('experienceDetail.route.eyebrow', 'Route Design')}
            </p>
            <h2 className="max-w-[16ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl">
              {t(`experience.${page.slug}.routeTitle`, t('experienceDetail.generic.routeTitle', 'A route designed around the experience'))}
            </h2>
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              {t(`experience.${page.slug}.routeIntro`, t('experienceDetail.generic.routeIntro', 'The final design depends on season, access and your travel style, but the rhythm is always private and carefully paced.'))}
            </p>
          </Reveal>

          <ol className="border-t border-border">
            {page.route.map((step, index) => (
              <Reveal
                key={`${step.phase}-${step.title}`}
                delay={(index % 3) * 80}
                as="li"
                className="grid gap-5 border-b border-border py-8 sm:grid-cols-[88px_1fr] sm:py-10"
              >
                <div>
                  <p className="font-serif text-3xl leading-none text-accent/80">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t(`experience.${page.slug}.route.${index}.phase`, t(`experienceDetail.generic.routePhase.${index}`, step.phase))}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                    {t(`experience.${page.slug}.route.${index}.title`, t('experienceDetail.generic.routeStepTitle', 'Private route stage'))}
                  </h3>
                  <p className="mt-4 max-w-3xl text-pretty leading-relaxed text-muted-foreground">
                    {t(`experience.${page.slug}.route.${index}.text`, t(`experienceDetail.generic.route.${index}`, 'Your guide adjusts the day around access, local timing and the pace that feels right for you.'))}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('experienceDetail.touchpoints.eyebrow', 'Premium Touchpoints')}
          </p>
          <h2 className="max-w-[16ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl">
            {t('experienceDetail.touchpoints.title', 'The details that make it feel considered')}
          </h2>
        </Reveal>

        <div className="border-t border-border">
          {page.highlights.map((item, index) => {
            const Icon = highlightIcons[index % highlightIcons.length]
            return (
              <Reveal
                key={item.title}
                delay={index * 90}
                className="grid gap-5 border-b border-border py-7 sm:grid-cols-[48px_1fr]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/8 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-foreground">
                    {t(`experience.${page.slug}.highlight.${index}.title`, t(`experienceDetail.generic.highlight.${index}.title`, item.title))}
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                    {t(`experience.${page.slug}.highlight.${index}.text`, t(`experienceDetail.generic.highlight.${index}.text`, item.text))}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-bg-dark text-background">
        <div className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:py-28">
          <Reveal className="relative min-h-[460px] overflow-hidden">
            <Image
              src={page.gallery[0]?.image ?? page.heroImage}
              alt={t(`experience.${page.slug}.gallery.0.title`, title)}
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={120} className="self-center">
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('experienceDetail.pictures.eyebrow', 'In Pictures')}
            </p>
            <h2 className="max-w-[17ch] text-balance text-3xl leading-[1.08] text-background sm:text-4xl">
              {t('experienceDetail.pictures.title', 'A visual rhythm for this style of travel')}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-background/65">
              {t('experienceDetail.pictures.copy', 'Origin, landscape, culture and hospitality scenes are selected to show the mood and terrain this journey is built around.')}
            </p>

            <div className="mt-9 border-t border-background/15">
              {page.gallery.map((item, index) => (
                <div
                  key={item.title}
                  className="border-b border-background/15 py-5"
                >
                  <p className="font-serif text-xl leading-tight text-background">
                    {t(`experience.${page.slug}.gallery.${index}.title`, t(`experienceDetail.generic.gallery.${index}.title`, item.title))}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-background/60">
                    {t(`experience.${page.slug}.gallery.${index}.text`, t(`experienceDetail.generic.gallery.${index}.text`, item.text))}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('experienceDetail.suits.eyebrow', 'Who It Suits')}
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl">
            {t('experienceDetail.suits.title', 'Designed for travelers who care how the journey is made')}
          </h2>
          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3">
            {page.bestFor.map((item, index) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 border-b border-border pb-2 text-sm font-medium text-foreground"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-accent" />
                {t(`experience.${page.slug}.bestFor.${index}`, t(`experienceDetail.generic.bestFor.${index}`, item))}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              {t('experienceDetail.included', 'Included In The Design')}
            </p>
            <ul className="grid gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
              {page.inclusions.map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {t(`experience.${page.slug}.inclusion.${index}`, t(`tourGeneric.include.${index}`, item))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-muted/25">
        <div className="shell grid gap-10 py-14 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:py-20">
          <Reveal>
            <p className="eyebrow mb-4 text-accent">
              <span className="rule" />
              {t('experienceDetail.related.eyebrow', 'Connected Journeys')}
            </p>
            <h2 className="max-w-sm text-balance text-2xl leading-[1.12] text-foreground sm:text-3xl">
              {t('experienceDetail.related.title', 'Routes that pair naturally with this experience')}
            </h2>
          </Reveal>

          <div className="border-t border-border">
            {page.related.map((item, index) => {
              const tourSlug = item.href.startsWith('/tours/') ? item.href.split('/').pop() : null
              return (
                <Reveal
                  key={item.title}
                  delay={index * 80}
                  className="border-b border-border"
                >
                  <Link
                    href={item.href}
                    className="group flex items-center justify-between gap-6 py-6"
                  >
                    <span>
                      <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        <MapPin className="h-3 w-3" aria-hidden />
                        {t(`experience.${page.slug}.related.${index}.meta`, t(`experienceDetail.generic.related.${index}`, item.meta))}
                      </span>
                      <span className="mt-2 block font-serif text-2xl leading-tight text-foreground transition-colors group-hover:text-primary">
                        {tourSlug ? t(`tour.${tourSlug}.title`, item.title) : t(`experience.${page.slug}.related.${index}.title`, item.title)}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              )
            })}
            <Reveal className="pt-6">
              <Link
                href="/tours"
                className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
              >
                {t('tourDetail.other.all', 'All tours')}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="enquire"
        className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28"
      >
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('experienceDetail.enquire.eyebrow', 'Plan This Experience')}
          </p>
          <h2 className="max-w-[20ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl">
            {t('experienceDetail.enquire.title', 'Tell us how you want {experience} to feel').replace('{experience}', title.toLowerCase())}
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t('experienceDetail.enquire.copy', 'Share your dates, interests and comfort level. We will shape the route, access, accommodations and daily pacing around you.')}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm
            subject={title}
            defaultStyles={['Luxury', 'Cultural']}
          />
        </Reveal>
      </section>
    </>
  )
}

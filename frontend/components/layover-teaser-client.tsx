'use client'

import { Plane } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { Reveal } from '@/components/reveal'
import { LinkButton } from '@/components/link-button'
import { useLanguage } from '@/components/language-provider'
import type { LayoverPackage } from '@/lib/site'

export function LayoverTeaserClient({
  packages,
}: {
  packages: LayoverPackage[]
}) {
  const { t } = useLanguage()

  return (
    <section className="border-y border-border bg-muted/40">
      <div className="shell grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-32">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow mb-6 text-primary">
            <span className="rule" />
            {t('layover.eyebrow', 'Addis Layover Tours')}
          </p>
          <h2 className="max-w-[20ch] text-balance font-serif text-[2.1rem] leading-[1.08] text-foreground sm:text-[2.6rem] lg:text-5xl">
            {t('layover.title', 'Turn a long connection into an introduction')}
          </h2>
          <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted-foreground">
            {t('layover.copy', 'Share both flights and your passport nationality. We will check the usable window and shape a private Addis visit around immigration, traffic and a protected airport return.')}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {packages.map((p) => (
              <div key={p.slug} className="border-t border-border pt-4">
                <dt className="flex items-center gap-1.5 font-serif text-xl text-primary">
                  <Plane className="h-3.5 w-3.5 text-accent" aria-hidden />
                  {p.minimumConnection}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {p.packageType === 'stopover'
                    ? t('layover.stopover', 'Stopover')
                    : t(`layover.package.${p.slug}.title`, p.title)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <LinkButton href="/layover">{t('layover.cta', 'Explore layover tours')}</LinkButton>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[5/6]">
            <Image
              src="https://res.cloudinary.com/q16lm8mo/image/upload/v1786970122/Bole_International.jpg"
              alt="Bole International Airport in Addis Ababa, Ethiopia"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6 pt-16">
              <p className="text-[11px] uppercase tracking-[0.2em] text-background/80">
                Bole International · Addis Ababa
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

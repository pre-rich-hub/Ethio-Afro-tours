'use client'

import Link from 'next/link'
import { LinkButton } from '@/components/link-button'
import { useLanguage } from '@/components/language-provider'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="shell flex min-h-[72svh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow justify-center text-accent">
        <span className="rule" />
        {t('notFound.eyebrow', 'Error 404')}
      </p>
      <h1 className="mt-6 max-w-[22ch] text-balance text-4xl leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
        {t('notFound.title', 'This road does not appear on our map')}
      </h1>
      <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
        {t('notFound.copy', 'The page you were looking for has moved or never existed. The country, happily, is still where we left it.')}
      </p>
      <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <LinkButton href="/">{t('notFound.home', 'Back to the beginning')}</LinkButton>
        <LinkButton href="/destinations" variant="outline" withArrow={false}>
          {t('toursPage.cta.secondary', 'See destinations')}
        </LinkButton>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        {t('notFound.or', 'Or')}{' '}
        <Link
          href="/contact"
          className="border-b border-accent/50 pb-0.5 text-primary transition-colors hover:border-accent hover:text-accent"
        >
          {t('notFound.write', 'write to a designer')}
        </Link>{' '}
        {t('notFound.instead', 'instead.')}
      </p>
    </section>
  )
}

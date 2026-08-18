'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { Reveal } from '@/components/reveal'
import { PostCard } from '@/components/post-card'
import { CtaBand } from '@/components/cta-band'
import { useLanguage } from '@/components/language-provider'
import type { Post } from '@/lib/site'

export function ArticleContent({
  post,
  next,
  more,
}: {
  post: Post
  next: Post
  more: Post[]
}) {
  const { t } = useLanguage()
  const title = t(`post.${post.slug}.title`, post.title)
  const excerpt = t(`post.${post.slug}.excerpt`, post.excerpt)
  const category = t(`postCategory.${post.category}`, post.category)
  const date = t(`post.${post.slug}.date`, post.date)
  const readTime = t(`post.${post.slug}.readTime`, post.readTime)
  const authorRole = t(`postAuthorRole.${post.authorRole}`, post.authorRole)
  const nextTitle = t(`post.${next.slug}.title`, next.title)

  return (
    <>
      <header className="border-b border-border">
        <div className="shell pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
          <Reveal className="mx-auto max-w-3xl">
            <nav aria-label={t('article.breadcrumb', 'Breadcrumb')} className="mb-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary sm:text-[11px]"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                {t('blog.hero.eyebrow', 'The Journal')}
              </Link>
            </nav>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="text-accent">{category}</span>
              <span className="h-3 w-px bg-border" aria-hidden />
              {date}
              <span className="h-3 w-px bg-border" aria-hidden />
              {readTime}
            </p>

            <h1 className="mt-5 text-balance text-[2rem] font-medium leading-[1.1] text-foreground sm:text-4xl lg:text-[3.25rem]">
              {title}
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {excerpt}
            </p>

            <div className="mt-9 flex items-center gap-4 border-t border-border pt-7">
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/traveler-portrait.png"
                  alt=""
                  aria-hidden
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {post.author}
                </span>
                <span className="block text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {authorRole}
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </header>

      <Reveal className="shell pt-10 sm:pt-14">
        <figure className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-sm">
          <Image
            src={post.image || '/placeholder.svg'}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </figure>
      </Reveal>

      <div className="shell py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          {post.body.map((para, i) => (
            <Reveal key={para.slice(0, 24)} delay={i * 50}>
              <p
                className={
                  i === 0
                    ? 'text-pretty text-lg leading-[1.75] text-foreground first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.82] first-letter:text-primary sm:text-xl'
                    : 'mt-7 text-pretty leading-[1.75] text-muted-foreground sm:text-lg'
                }
              >
                {t(`post.${post.slug}.body.${i}`, t(`article.generic.body.${i}`, i === 0 ? excerpt : 'A private journey is shaped by season, access, comfort and context. Our designers adjust the route so each day has enough time for the place to make sense.'))}
              </p>
            </Reveal>
          ))}

          <Reveal className="mt-14 border-t border-border pt-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t('article.writtenBy', 'Written by')}{' '}
              <span className="font-medium text-foreground">{post.author}</span>,{' '}
              {authorRole.toLowerCase()}. {t('article.questions', 'Questions about any of the above are always welcome')}{' '}
              <Link
                href="/contact"
                className="border-b border-accent/50 pb-0.5 text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {t('article.write', 'write to us')}
              </Link>
              .
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <Link
              href={`/blog/${next.slug}`}
              className="group block border border-border bg-card p-6 transition-colors hover:border-primary/40 sm:p-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                {t('article.readNext', 'Read Next')}
              </p>
              <p className="mt-3 text-balance font-serif text-xl text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                {nextTitle}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {t(`post.${next.slug}.readTime`, next.readTime)}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      <section className="border-t border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-24">
          <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-4 text-accent sm:mb-5">
                <span className="rule" />
                {t('article.more.eyebrow', 'More From The Journal')}
              </p>
              <h2 className="text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl">
                {t('article.more.title', 'Also worth your time')}
              </h2>
            </div>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-accent sm:text-xs"
            >
              {t('article.more.all', 'All writing')}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={t('article.cta.title', 'Ready to see it for yourself?')}
        text={t('article.cta.text', 'Every essay here comes out of a journey we designed for someone. Tell us what you want yours to feel like.')}
        secondary={{ label: t('toursPage.cta.secondary', 'See Destinations'), href: '/destinations' }}
        image={post.image}
      />
    </>
  )
}

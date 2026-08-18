'use client'

import Link from 'next/link'
import { OptimizedImage as Image } from '@/components/optimized-image'
import type { Post } from '@/lib/site'
import { useLanguage } from '@/components/language-provider'

export function PostCard({ post, wide }: { post: Post; wide?: boolean }) {
  const { t } = useLanguage()
  const title = t(`post.${post.slug}.title`, post.title)
  const category = t(`postCategory.${post.category}`, post.category)
  const date = t(`post.${post.slug}.date`, post.date)
  const readTime = t(`post.${post.slug}.readTime`, post.readTime)
  const excerpt = t(`post.${post.slug}.excerpt`, post.excerpt)

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div
          className={`relative overflow-hidden rounded-xl ${
            wide ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <Image
            src={post.image || '/placeholder.svg'}
            alt={title}
            fill
            sizes={wide ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="text-primary">{category}</span>
            <span className="h-3 w-px bg-border" aria-hidden />
            {date}
            <span className="h-3 w-px bg-border" aria-hidden />
            {readTime}
          </p>
          <h3
            className={`mt-3 text-balance font-serif leading-[1.15] text-foreground transition-colors duration-300 group-hover:text-primary ${
              wide ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {title}
          </h3>
          <p className="mt-3 max-w-[52ch] text-pretty text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}

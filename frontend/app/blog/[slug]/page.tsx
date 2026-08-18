import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/app/blog/[slug]/article-content'
import { JsonLd } from '@/components/json-ld'
import { cloudinaryImageUrl } from '@/lib/cloudinary'
import { getPost, posts } from '@/lib/site'
import {
  buildBlogPosting,
  buildBreadcrumbList,
  pageStructuredData,
} from '@/lib/structured-data'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = getPost(slug)
  if (!p) return { title: 'Article not found' }
  return {
    title: p.title,
    description: p.excerpt,
    authors: [{ name: p.author }],
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      type: 'article',
      images: [cloudinaryImageUrl(p.image, { width: 1200, quality: 82 })],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const index = posts.findIndex((p) => p.slug === post.slug)
  const next = posts[(index + 1) % posts.length]
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          buildBlogPosting(post),
        )}
      />
      <ArticleContent post={post} next={next} more={more} />
    </article>
  )
}

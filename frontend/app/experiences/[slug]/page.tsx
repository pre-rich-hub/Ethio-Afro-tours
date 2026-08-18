import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExperienceDetailContent } from '@/app/experiences/[slug]/experience-detail-content'
import { experiencePages, getExperiencePage } from '@/lib/experience-pages'

export function generateStaticParams() {
  return experiencePages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = getExperiencePage(slug)
  if (!page) return { title: 'Experience not found' }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      images: [page.heroImage],
    },
  }
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const page = getExperiencePage(slug)
  if (!page) notFound()

  const serializablePage = {
    ...page,
    highlights: page.highlights.map(({ title, text }) => ({ title, text })),
  }

  return <ExperienceDetailContent page={serializablePage} />
}

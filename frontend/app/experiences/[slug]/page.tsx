import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ExperienceDetailContent } from '@/app/experiences/[slug]/experience-detail-content'
import { JsonLd } from '@/components/json-ld'
import { experiencePages, getExperiencePage } from '@/lib/experience-pages'
import { absoluteUrl, buildSocialMetadata } from '@/lib/seo'
import {
  buildBreadcrumbList,
  buildWebPage,
  organizationId,
  pageStructuredData,
} from '@/lib/structured-data'

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
    alternates: { canonical: `/experiences/${page.slug}` },
    ...buildSocialMetadata({
      title: page.title,
      description: page.description,
      path: `/experiences/${page.slug}`,
      image: page.heroImage,
      imageAlt: page.imageAlt,
    }),
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

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Experiences', path: '/#experiences' },
            { name: page.title, path: `/experiences/${page.slug}` },
          ]),
          buildWebPage({
            path: `/experiences/${page.slug}`,
            name: page.title,
            description: page.description,
            mainEntityId: `/experiences/${page.slug}#service`,
          }),
          {
            '@type': 'Service',
            '@id': absoluteUrl(`/experiences/${page.slug}#service`),
            name: page.title,
            description: page.description,
            serviceType: page.eyebrow,
            provider: { '@id': organizationId },
            areaServed: {
              '@type': 'Country',
              name: 'Ethiopia',
            },
            image: page.heroImage,
            url: absoluteUrl(`/experiences/${page.slug}`),
          },
        )}
      />
      <ExperienceDetailContent page={serializablePage} />
    </>
  )
}

import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { destinations, posts, tours } from '@/lib/site'
import { experiencePages } from '@/lib/experience-pages'

const lastModified = new Date('2026-08-21')

const staticPaths = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/destinations', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/tours', priority: 0.95, changeFrequency: 'weekly' },
  { path: '/layover', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.75, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.35, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.35, changeFrequency: 'yearly' },
  { path: '/booking-policy', priority: 0.45, changeFrequency: 'yearly' },
  { path: '/responsible-tourism', priority: 0.55, changeFrequency: 'yearly' },
] as const

function postDate(value: string): Date | undefined {
  const date = new Date(`${value} 00:00:00 UTC`)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path.path),
    lastModified,
    changeFrequency: path.changeFrequency,
    priority: path.priority,
  }))

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.85,
    images: [destination.image],
  }))

  const tourPages: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: absoluteUrl(`/tours/${tour.slug}`),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
    images: [tour.image],
  }))

  const experienceDetailPages: MetadataRoute.Sitemap = experiencePages.map((page) => ({
    url: absoluteUrl(`/experiences/${page.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.75,
    images: [page.heroImage],
  }))

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: postDate(post.date) ?? lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
    images: [post.image],
  }))

  return [...staticPages, ...destinationPages, ...tourPages, ...experienceDetailPages, ...articlePages]
}

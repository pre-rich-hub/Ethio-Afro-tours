import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { destinations, posts, tours } from '@/lib/site'

const staticPaths = ['/', '/destinations', '/tours', '/layover', '/blog', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
  }))

  const destinationPages: MetadataRoute.Sitemap = destinations.map((destination) => ({
    url: absoluteUrl(`/destinations/${destination.slug}`),
    images: [destination.image],
  }))

  const tourPages: MetadataRoute.Sitemap = tours.map((tour) => ({
    url: absoluteUrl(`/tours/${tour.slug}`),
    images: [tour.image],
  }))

  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    images: [post.image],
  }))

  return [...staticPages, ...destinationPages, ...tourPages, ...articlePages]
}

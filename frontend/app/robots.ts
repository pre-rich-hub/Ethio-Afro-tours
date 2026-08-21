import type { MetadataRoute } from 'next'
import { absoluteUrl, siteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const aiUserAgents = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
  ]

  return {
    rules: [
      ...aiUserAgents.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/api'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl.origin,
  }
}

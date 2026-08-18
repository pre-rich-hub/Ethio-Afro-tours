import type { Metadata } from 'next'
import { cloudinarySocialImageUrl } from '@/lib/cloudinary'

const productionSiteUrl = 'https://ethioafrotours.com'

function resolveSiteUrl(): URL {
  const configuredUrl = process.env.SITE_URL?.trim() || productionSiteUrl
  const url = new URL(configuredUrl)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('SITE_URL must use the http or https protocol.')
  }

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an origin without a path, query, or fragment.')
  }

  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error('SITE_URL must use https in production.')
  }

  return url
}

export const siteUrl = resolveSiteUrl()

export function absoluteUrl(path = '/'): string {
  if (!path.startsWith('/')) {
    throw new Error('SEO paths must start with a forward slash.')
  }

  return new URL(path, siteUrl).toString()
}

type SocialMetadataOptions = {
  title: string
  description: string
  path: string
  image: string
  imageAlt: string
}

export function buildSocialMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: SocialMetadataOptions): Pick<Metadata, 'openGraph' | 'twitter'> {
  const brandedTitle = `${title} · EthioAfro Tours`
  const imageUrl = cloudinarySocialImageUrl(image)

  return {
    openGraph: {
      title: brandedTitle,
      description,
      url: absoluteUrl(path),
      siteName: 'EthioAfro Tours',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description,
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
  }
}

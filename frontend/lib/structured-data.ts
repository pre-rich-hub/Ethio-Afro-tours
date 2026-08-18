import { absoluteUrl } from '@/lib/seo'
import { cloudinaryImageUrl } from '@/lib/cloudinary'
import type { FaqItem } from '@/lib/faqs'
import { contact, type Post, type Tour } from '@/lib/site'

export const organizationId = absoluteUrl('/#organization')
export const websiteId = absoluteUrl('/#website')

export type BreadcrumbItem = {
  name: string
  path: string
}

export const globalStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'TravelAgency'],
      '@id': organizationId,
      name: 'EthioAfro Tours',
      url: absoluteUrl('/'),
      logo: absoluteUrl('/images/logo.png'),
      description:
        'Private, tailor-made luxury journeys through Ethiopia, designed around each traveller.',
      telephone: contact.phone,
      email: contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bole Medhaniallem, Cape Verde Street',
        postalCode: '1000',
        addressLocality: 'Addis Ababa',
        addressCountry: 'ET',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Ethiopia',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '08:00',
        closes: '17:30',
      },
      sameAs: [
        'https://www.tripadvisor.com/Attraction_Review-g293791-d15214552-Reviews-Ethio_Afro_Tours-Addis_Ababa.html',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: absoluteUrl('/'),
      name: 'EthioAfro Tours',
      inLanguage: 'en',
      publisher: {
        '@id': organizationId,
      },
    },
  ],
} as const

export function pageStructuredData(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}

export function buildBreadcrumbList(items: readonly BreadcrumbItem[]) {
  if (items.length < 2) {
    throw new Error('Breadcrumb structured data requires at least two items.')
  }

  const pageUrl = absoluteUrl(items[items.length - 1].path)

  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildTouristTrip(tour: Tour) {
  const url = absoluteUrl(`/tours/${tour.slug}`)

  return {
    '@type': 'TouristTrip',
    '@id': `${url}#tour`,
    name: tour.title,
    description: tour.summary,
    url,
    image: cloudinaryImageUrl(tour.image, { width: 1600, quality: 82 }),
    touristType: tour.categories,
    provider: {
      '@id': organizationId,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.places.map((place, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Place',
          name: place,
        },
      })),
    },
  }
}

export function buildBlogPosting(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`)
  const publishedDate = new Date(`${post.date} 00:00:00 UTC`)

  if (Number.isNaN(publishedDate.getTime())) {
    throw new Error(`Invalid publication date for blog post: ${post.slug}`)
  }

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    image: cloudinaryImageUrl(post.image, { width: 1600, quality: 82 }),
    datePublished: publishedDate.toISOString().slice(0, 10),
    articleSection: post.category,
    articleBody: post.body.join('\n\n'),
    wordCount: post.body.join(' ').trim().split(/\s+/).length,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      '@id': organizationId,
    },
    isPartOf: {
      '@id': websiteId,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function buildFaqPage(path: string, faqs: readonly FaqItem[]) {
  const url = absoluteUrl(path)

  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage: 'en',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

import { absoluteUrl } from '@/lib/seo'
import { cloudinaryImageUrl } from '@/lib/cloudinary'
import type { FaqItem } from '@/lib/faqs'
import { contact, type Destination, type LayoverPackage, type Post, type Tour } from '@/lib/site'

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
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: contact.phone,
          email: contact.email,
          contactType: 'customer service',
          areaServed: 'ET',
          availableLanguage: ['en'],
        },
      ],
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
        'https://www.instagram.com/ethioafrotours/',
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
      potentialAction: {
        '@type': 'SearchAction',
        target: `${absoluteUrl('/tours')}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
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

type WebPageOptions = {
  path: string
  name: string
  description: string
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage' | 'ContactPage'
  mainEntityId?: string
}

export function buildWebPage({
  path,
  name,
  description,
  type = 'WebPage',
  mainEntityId,
}: WebPageOptions) {
  const url = absoluteUrl(path)
  const normalizedMainEntityId = mainEntityId?.startsWith('/')
    ? absoluteUrl(mainEntityId)
    : mainEntityId

  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    ...(path === '/' ? {} : { breadcrumb: { '@id': `${url}#breadcrumb` } }),
    publisher: { '@id': organizationId },
    ...(normalizedMainEntityId ? { mainEntity: { '@id': normalizedMainEntityId } } : {}),
  }
}

export function buildItemList({
  path,
  id = 'items',
  name,
  items,
}: {
  path: string
  id?: string
  name: string
  items: readonly { name: string; path: string; description?: string; image?: string }[]
}) {
  const url = absoluteUrl(path)

  return {
    '@type': 'ItemList',
    '@id': `${url}#${id}`,
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(item.path),
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: cloudinaryImageUrl(item.image, { width: 1200, quality: 82 }) } : {}),
    })),
  }
}

export function buildTouristDestination(destination: Destination) {
  const url = absoluteUrl(`/destinations/${destination.slug}`)

  return {
    '@type': 'TouristDestination',
    '@id': `${url}#destination`,
    name: destination.name,
    description: destination.intro,
    url,
    image: cloudinaryImageUrl(destination.image, { width: 1600, quality: 82 }),
    touristType: destination.tag,
    containedInPlace: {
      '@type': 'Country',
      name: 'Ethiopia',
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: destination.region,
      addressCountry: 'ET',
    },
    mainEntityOfPage: {
      '@id': `${url}#webpage`,
    },
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
    duration: tour.days,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: tour.from,
      },
      availability: 'https://schema.org/InStock',
      url,
    },
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
  const date = Number.isNaN(publishedDate.getTime())
    ? undefined
    : publishedDate.toISOString().slice(0, 10)

  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    image: cloudinaryImageUrl(post.image, { width: 1600, quality: 82 }),
    ...(date ? { datePublished: date, dateModified: date } : {}),
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

export function buildLayoverServices(packages: readonly LayoverPackage[]) {
  const url = absoluteUrl('/layover')

  return {
    '@type': 'OfferCatalog',
    '@id': `${url}#layover-services`,
    name: 'Addis Ababa layover tour options',
    itemListElement: packages.map((item, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        '@id': `${url}#${item.slug}`,
        name: item.title,
        description: item.teaser,
        serviceType: item.packageType === 'stopover' ? 'Stopover tour' : 'Layover tour',
        provider: { '@id': organizationId },
        areaServed: {
          '@type': 'City',
          name: 'Addis Ababa',
        },
        image: item.image ? cloudinaryImageUrl(item.image, { width: 1200, quality: 82 }) : undefined,
        termsOfService: `Minimum connection: ${item.minimumConnection}. Experience length: ${item.hours}.`,
      },
      priceSpecification: {
        '@type': 'PriceSpecification',
        description: item.price,
      },
    })),
  }
}

export function buildContactPage() {
  const url = absoluteUrl('/contact')

  return buildWebPage({
    path: '/contact',
    name: 'Contact Us',
    description:
      'Speak directly with an Addis-based travel designer about your Ethiopian journey.',
    type: 'ContactPage',
    mainEntityId: organizationId,
  }) satisfies object
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

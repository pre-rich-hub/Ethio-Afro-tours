import { absoluteUrl } from '@/lib/seo'
import { contact } from '@/lib/site'

export const organizationId = absoluteUrl('/#organization')
export const websiteId = absoluteUrl('/#website')

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

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

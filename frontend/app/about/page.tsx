import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { buildSocialMetadata } from '@/lib/seo'
import {
  buildBreadcrumbList,
  buildWebPage,
  organizationId,
  pageStructuredData,
} from '@/lib/structured-data'
import { AboutContent } from './about-content'

const title = 'About Us'
const description =
  'Ethio Afro Tours is a fully licensed luxury tour operator and destination management company based in Addis Ababa, Ethiopia, creating private tailor-made journeys for more than 15 years.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  ...buildSocialMetadata({
    title,
    description,
    path: '/about',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
    imageAlt: 'Lalibela rock-hewn churches in Ethiopia',
  }),
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageStructuredData(
        buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'About Us', path: '/about' }]),
        buildWebPage({ path: '/about', name: title, description, type: 'AboutPage', mainEntityId: organizationId }),
      )} />
      <AboutContent />
    </>
  )
}

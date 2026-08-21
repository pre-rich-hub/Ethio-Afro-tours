import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { ContactContent } from '@/app/contact/contact-content'
import { buildSocialMetadata } from '@/lib/seo'
import { buildBreadcrumbList, buildContactPage, pageStructuredData } from '@/lib/structured-data'

const title = 'Contact Us'
const description =
  'Speak directly with an Addis-based travel designer about your Ethiopian journey. We are available Monday to Saturday, 8:00 AM - 5:30 PM.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  ...buildSocialMetadata({
    title,
    description,
    path: '/contact',
    image: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg',
    imageAlt: 'Addis Ababa, Ethiopia',
  }),
}

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
          buildContactPage(),
        )}
      />
      <ContactContent />
    </>
  )
}

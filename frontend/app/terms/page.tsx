import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { termsPolicy } from '@/lib/policies'
import { buildSocialMetadata } from '@/lib/seo'
import { buildBreadcrumbList, buildWebPage, pageStructuredData } from '@/lib/structured-data'
import { TermsContent } from './terms-content'

const socialImage = 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg'

export const metadata: Metadata = {
  title: termsPolicy.title,
  description: termsPolicy.description,
  alternates: { canonical: '/terms' },
  ...buildSocialMetadata({
    title: termsPolicy.title,
    description: termsPolicy.description,
    path: '/terms',
    image: socialImage,
    imageAlt: 'Lalibela rock-hewn churches in Ethiopia',
  }),
}

export default function TermsPage() {
  return (
    <>
      <JsonLd data={pageStructuredData(
        buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Terms & Conditions', path: '/terms' }]),
        buildWebPage({ path: '/terms', name: termsPolicy.title, description: termsPolicy.description }),
      )} />
      <TermsContent />
    </>
  )
}

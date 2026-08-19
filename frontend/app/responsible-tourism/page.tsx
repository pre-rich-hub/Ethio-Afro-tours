import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { PolicyPage } from '@/components/policy-page'
import { responsibleTourismPolicy } from '@/lib/policies'
import { buildSocialMetadata } from '@/lib/seo'
import { buildBreadcrumbList, buildWebPage, pageStructuredData } from '@/lib/structured-data'

const socialImage = 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg'

export const metadata: Metadata = {
  title: responsibleTourismPolicy.title,
  description: responsibleTourismPolicy.description,
  alternates: { canonical: '/responsible-tourism' },
  ...buildSocialMetadata({
    title: responsibleTourismPolicy.title,
    description: responsibleTourismPolicy.description,
    path: '/responsible-tourism',
    image: socialImage,
    imageAlt: 'Lalibela rock-hewn churches in Ethiopia',
  }),
}

export default function ResponsibleTourismPage() {
  return (
    <>
      <JsonLd data={pageStructuredData(
        buildBreadcrumbList([{ name: 'Home', path: '/' }, { name: 'Responsible Tourism', path: '/responsible-tourism' }]),
        buildWebPage({ path: '/responsible-tourism', name: responsibleTourismPolicy.title, description: responsibleTourismPolicy.description }),
      )} />
      <PolicyPage document={responsibleTourismPolicy} />
    </>
  )
}

import type { Metadata } from 'next'
import { JsonLd } from '@/components/json-ld'
import { buildBreadcrumbList, pageStructuredData } from '@/lib/structured-data'
import { buildSocialMetadata } from '@/lib/seo'
import { getPostsData } from '@/lib/data'
import { BlogContent } from './blog-content'

const pageTitle = 'The Journal'
const pageDescription =
  'Planning guidance, destination essays and dispatches from the designers and guides who run our Ethiopian journeys.'
const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg'
const heroImageAlt = 'Coffee cherries growing in Ethiopia'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/blog' },
  ...buildSocialMetadata({
    title: pageTitle,
    description: pageDescription,
    path: '/blog',
    image: heroImage,
    imageAlt: heroImageAlt,
  }),
}

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPostsData()

  return (
    <>
      <JsonLd
        data={pageStructuredData(
          buildBreadcrumbList([
            { name: 'Home', path: '/' },
            { name: 'Journal', path: '/blog' },
          ]),
        )}
      />
      <BlogContent posts={posts} />
    </>
  )
}

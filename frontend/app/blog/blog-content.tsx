'use client'

import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { PostCard } from '@/components/post-card'
import { PostsGrid } from '@/components/posts-grid'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'
import { useLanguage } from '@/components/language-provider'
import { posts } from '@/lib/site'

const heroImage =
  'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg'
const heroImageAlt = 'Coffee cherries growing in Ethiopia'

export function BlogContent() {
  const { t } = useLanguage()
  const featured = posts.find((p) => p.featured) ?? posts[0]
  const rest = posts.filter((p) => p.slug !== featured.slug)

  return (
    <>
      <PageHero
        eyebrow={t('blog.hero.eyebrow', 'The Journal')}
        title={t('blog.hero.title', 'Field notes from the highlands')}
        lede={t('blog.hero.lede', 'Written by the people who run these journeys — when to come, what to pack, how to sit through a coffee ceremony properly, and why we work the way we do.')}
        image={heroImage}
        imageAlt={t('blog.hero.imageAlt', heroImageAlt)}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('nav.journal', 'Journal') },
        ]}
      />

      <section className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="mb-8">
          <p className="eyebrow text-accent">
            <span className="rule" />
            {t('blog.latest', 'Latest Dispatch')}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <PostCard post={featured} wide />
        </Reveal>
      </section>

      <section className="border-t border-border">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t('blog.archive.eyebrow', 'Archive')}
            title={t('blog.archive.title', 'Everything we have written down')}
            aside={t('blog.archive.aside', 'Six essays and counting, filed by what they are actually useful for.')}
          />
          <PostsGrid posts={rest} />
        </div>
      </section>

      <CtaBand
        eyebrow={t('blog.cta.eyebrow', 'Speak With a Designer')}
        title={t('blog.cta.title', 'Read something that changed your mind?')}
        text={t('blog.cta.text', 'Most of these essays started as an answer to a guest question. Ask us yours and it may well become the next one.')}
        primary={{ label: t('blog.cta.primary', 'Plan Your Journey'), href: '/contact' }}
        secondary={{ label: t('blog.cta.secondary', 'Browse Tours'), href: '/tours' }}
        image="https://res.cloudinary.com/q16lm8mo/image/upload/v1786804467/simien-mountains.png"
      />
    </>
  )
}

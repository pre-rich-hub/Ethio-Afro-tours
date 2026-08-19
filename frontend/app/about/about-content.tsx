'use client'

import {
  BadgeCheck,
  Binoculars,
  BriefcaseBusiness,
  Camera,
  Check,
  Compass,
  Gem,
  HeartHandshake,
  Hotel,
  Mountain,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'
import { OptimizedImage as Image } from '@/components/optimized-image'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { LinkButton } from '@/components/link-button'
import { useLanguage } from '@/components/language-provider'

const credentials = [
  'Fully licensed luxury tour operator',
  'Destination management company based in Addis Ababa',
  'Authorized by the Ministry of Trade of Ethiopia',
  'Member of the Ethiopian Tour Operators Association',
  'Member of Tourism Ethiopia',
]

const tripStyles = [
  { label: 'Luxury vacations', icon: Gem },
  { label: 'Cultural and historical journeys', icon: Compass },
  { label: 'Wildlife adventures', icon: Binoculars },
  { label: 'Trekking expeditions', icon: Mountain },
  { label: 'Photography tours', icon: Camera },
  { label: 'Family holidays', icon: Users },
]

const whyTravel = [
  {
    title: 'More Than 15 Years of Experience',
    text: 'Our extensive local knowledge allows us to plan every journey professionally and manage every important detail with care.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Private and Luxury Tours',
    text: 'We provide carefully selected accommodations, comfortable transportation, experienced guides, flexible schedules, privacy, and personal attention.',
    icon: Hotel,
  },
  {
    title: 'Personalized Itineraries',
    text: 'Every journey is designed around your interests, available time, preferred travel pace, accommodation style, and budget.',
    icon: Sparkles,
  },
  {
    title: 'Authentic Ethiopian Experiences',
    text: 'Our tours introduce you to Ethiopia’s ancient history, diverse cultures, traditional cuisine, coffee heritage, wildlife, dramatic landscapes, and warm hospitality.',
    icon: Compass,
  },
  {
    title: 'Expert Local Guides',
    text: 'Our knowledgeable local guides provide professional, friendly, and responsible service throughout your journey.',
    icon: BadgeCheck,
  },
  {
    title: 'Responsible Tourism',
    text: 'Whenever possible, we support local guides, drivers, accommodations, restaurants, artisans, and community-based tourism providers.',
    icon: HeartHandshake,
  },
  {
    title: 'Reliable Local Support',
    text: 'Our Addis Ababa-based team carefully coordinates your tour from arrival to departure, allowing you to explore Ethiopia with comfort and confidence.',
    icon: ShieldCheck,
  },
]

const destinations = [
  'Lalibela',
  'Simien Mountains',
  'Omo Valley',
  'Danakil Depression',
  'Addis Ababa',
  'Gondar',
]

const aboutImages = {
  hero: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801491/lalibela.jpg',
  teamBase: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg',
  coffee: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967896/ethiopia-coffee-origins.jpg',
  highlands: 'https://res.cloudinary.com/q16lm8mo/image/upload/v1786967902/grand-ethiopia-highlights.jpg',
} as const

export function AboutContent() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero
        eyebrow={t('about.hero.eyebrow', 'About Ethio Afro Tours')}
        title={t('about.hero.title', 'Private journeys through Ethiopia, shaped with local expertise')}
        lede={t('about.hero.lede', 'A fully licensed Addis Ababa-based tour operator creating private, personalized and deeply authentic journeys throughout Ethiopia.')}
        image={aboutImages.hero}
        imageAlt={t('about.hero.imageAlt', 'The rock-hewn churches of Lalibela in warm evening light')}
        crumbs={[
          { label: t('nav.home', 'Home'), href: '/' },
          { label: t('nav.about', 'About Us') },
        ]}
        meta={[
          { label: t('about.meta.experience', 'Experience'), value: t('about.meta.experienceValue', '15+ Years') },
          { label: t('about.meta.base', 'Base'), value: 'Addis Ababa' },
          { label: t('about.meta.memberships', 'Memberships'), value: 'Tourism Ethiopia' },
          { label: t('about.meta.style', 'Style'), value: t('about.meta.styleValue', 'Private Luxury') },
        ]}
      />

      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('about.who.eyebrow', 'Who We Are')}
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {t('about.who.title', 'Ethiopia, designed with local authority and quiet precision')}
          </h2>
          <div className="mt-7 space-y-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            <p>{t('about.who.p1', 'Ethio Afro Tours is a fully licensed luxury tour operator and destination management company based in Addis Ababa, Ethiopia. With more than 15 years of experience, we create private, personalized, and authentic journeys throughout the country.')}</p>
            <p>{t('about.who.p2', 'The company is officially authorized in Ethiopia and is a member of the Ethiopian Tour Operators Association and Tourism Ethiopia.')}</p>
            <p>{t('about.who.p3', 'From the ancient rock-hewn churches of Lalibela and the breathtaking Simien Mountains to the diverse cultures of the Omo Valley and the extraordinary landscapes of the Danakil Depression, we help travelers experience the very best of Ethiopia.')}</p>
            <p>{t('about.who.p4', 'Every tour is carefully designed around our guests’ interests, schedule, comfort, travel style, and budget.')}</p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {destinations.map((destination, index) => (
              <span
                key={destination}
                className="border border-border bg-card px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]"
              >
                {t(`about.destination.${index}`, destination)}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:pt-10">
          <div className="relative overflow-hidden border border-border bg-card">
            <div className="relative aspect-[4/5] min-h-[460px]">
              <Image
                src={aboutImages.teamBase}
                alt={t('about.who.imageAlt', 'Addis Ababa, home of the Ethio Afro Tours team')}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {t('about.who.cardEyebrow', 'Officially Authorized')}
                </p>
                <p className="mt-3 max-w-sm font-serif text-2xl leading-tight sm:text-3xl">
                  {t('about.who.cardTitle', 'Licensed in Ethiopia and connected to the country’s leading tourism organizations')}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t('about.credentials.eyebrow', 'Credentials')}
            title={t('about.credentials.title', 'Licensed, local and professionally connected')}
            aside={t('about.credentials.aside', 'Our operation is rooted in Ethiopia, with the authorizations, memberships and local relationships needed to coordinate complex private travel with confidence.')}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential, i) => (
              <Reveal
                key={credential}
                delay={(i % 3) * 80}
                className="flex items-start gap-4 border border-border bg-card p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-4 w-4" aria-hidden />
                </span>
                <p className="text-sm font-medium leading-relaxed text-foreground">
                  {t(`about.credential.${i}`, credential)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-bg-dark text-background">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image
            src={aboutImages.coffee}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark via-bg-dark/90 to-bg-dark/55" />
        </div>

        <div className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <Reveal className="border-t border-background/20 pt-7">
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('about.vision.eyebrow', 'Our Vision')}
            </p>
            <h2 className="max-w-xl text-balance font-serif text-3xl leading-[1.1] sm:text-4xl">
              {t('about.vision.title', 'To be one of Ethiopia’s most trusted luxury tour operators.')}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-background/70 sm:text-lg">
              {t('about.vision.text', 'Recognized for exceptional service, authentic experiences, responsible tourism, and meaningful connections with local communities.')}
            </p>
          </Reveal>

          <Reveal delay={120} className="border-t border-background/20 pt-7">
            <p className="eyebrow mb-5 text-accent">
              <span className="rule" />
              {t('about.mission.eyebrow', 'Our Mission')}
            </p>
            <h2 className="max-w-xl text-balance font-serif text-3xl leading-[1.1] sm:text-4xl">
              {t('about.mission.title', 'To deliver safe, professional, personalized and high-quality tours.')}
            </h2>
            <p className="mt-6 max-w-xl text-pretty leading-relaxed text-background/70 sm:text-lg">
              {t('about.mission.text', 'We support local communities and protect Ethiopia’s cultural and natural heritage while creating journeys that feel personal, polished and honest.')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow={t('about.travel.eyebrow', 'How We Travel')}
          title={t('about.travel.title', 'Journeys shaped around the way you want to experience Ethiopia')}
          aside={t('about.travel.aside', 'We arrange luxury vacations, cultural and historical journeys, wildlife adventures, trekking expeditions, photography tours, and family holidays.')}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tripStyles.map((style, i) => {
            const Icon = style.icon
            return (
              <Reveal
                key={style.label}
                delay={(i % 3) * 80}
                className="group border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/60"
              >
                <Icon
                  className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110"
                  aria-hidden
                />
                <p className="mt-8 font-serif text-2xl leading-tight text-foreground">
                  {t(`about.tripStyle.${i}`, style.label)}
                </p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="border-y border-border bg-muted/35">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow={t('about.why.eyebrow', 'Why Travel With Ethio Afro Tours?')}
            title={t('about.why.title', 'Luxury is in the details you never have to chase')}
            align="center"
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {whyTravel.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal
                  key={item.title}
                  delay={(i % 3) * 90}
                  className={`border border-border bg-card p-6 ${
                    i === 0 || i === 6 ? 'lg:col-span-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-serif text-xl leading-tight text-foreground sm:text-2xl">
                      {t(`about.why.item.${i}.title`, item.title)}
                    </h3>
                  </div>
                  <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t(`about.why.item.${i}.text`, item.text)}
                  </p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
        <Reveal className="relative min-h-[420px] overflow-hidden">
          <Image
            src={aboutImages.highlands}
            alt={t('about.cta.imageAlt', 'The green highlands of Ethiopia')}
            fill
            sizes="(max-width: 1024px) 100vw, 44vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 to-transparent" />
        </Reveal>

        <Reveal delay={120} className="self-center">
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            {t('about.cta.eyebrow', 'Discover Ethiopia With Us')}
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            {t('about.cta.title', 'Let our local team create a private Ethiopia tour designed especially for you.')}
          </h2>
          <p className="mt-7 max-w-xl text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            {t('about.cta.text', 'From arrival to departure, our Addis Ababa-based team coordinates your route, guides, accommodations, vehicles and pacing so you can explore Ethiopia with comfort and confidence.')}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href="/contact" variant="gold">
              {t('about.cta.primary', 'Plan Your Ethiopia Tour')}
            </LinkButton>
            <LinkButton href="/tours" variant="outline" withArrow={false}>
              {t('about.cta.secondary', 'View Signature Tours')}
            </LinkButton>
          </div>
        </Reveal>
      </section>
    </>
  )
}

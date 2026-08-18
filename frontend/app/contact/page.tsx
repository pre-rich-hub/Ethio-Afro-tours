import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle, Phone, Clock } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { EnquiryForm } from '@/components/enquiry-form'
import { contact, promises } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Speak directly with an Addis-based travel designer about your Ethiopian journey. We are available Monday to Saturday, 8:00 AM - 5:30 PM.',
  alternates: { canonical: '/contact' },
}

const steps = [
  {
    n: '01',
    title: 'You write, we listen',
    text: 'A sentence is enough to start. Dates, pace, altitude tolerance and what you want the trip to feel like.',
  },
  {
    n: '02',
    title: 'We draft a route',
    text: 'Within 24 hours a named designer sends a first outline with two or three options and honest pricing.',
  },
  {
    n: '03',
    title: 'We redraw it',
    text: 'Usually twice, sometimes four times. Nothing is booked and no deposit is taken until it reads right to you.',
  },
  {
    n: '04',
    title: 'We are there',
    text: 'Met on arrival, guided throughout, and a 24-hour line to your designer for the whole of the journey.',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Speak With a Designer"
        title="Every journey begins with a conversation"
        lede="No call centres and no templates. Write to us and an Addis-based designer replies personally, usually the same day."
        image="https://res.cloudinary.com/q16lm8mo/image/upload/v1786801407/addis-ababa.jpg"
        imageAlt="Addis Ababa, home of the EthioAfro journey design team"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        meta={[
          { label: 'Reply Time', value: 'Within 24 hrs' },
          { label: 'Based In', value: 'Addis Ababa' },
          { label: 'Support', value: '24/7 In-Country' },
          { label: 'Deposit', value: 'Only When Right' },
        ]}
      />

      {/* Form + details */}
      <section className="shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            Get In Touch
          </p>
          <h2 className="max-w-[18ch] text-balance text-3xl leading-[1.08] text-foreground sm:text-4xl lg:text-5xl">
            Tell us about the journey in your head
          </h2>
          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            However rough the idea, it is enough. We will come back with
            questions, a route worth considering, and a straight answer on cost.
          </p>

          <dl className="mt-12 space-y-7">
            <Detail icon={Phone} label="Telephone">
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
                className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
              >
                {contact.phone}
              </a>
            </Detail>
            <Detail icon={MessageCircle} label="WhatsApp">
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
              >
                {contact.whatsapp}
              </a>
            </Detail>
            <Detail icon={Mail} label="Email">
              <a
                href={`mailto:${contact.email}`}
                className="break-all border-b border-accent/40 pb-0.5 transition-colors hover:border-accent hover:text-primary"
              >
                {contact.email}
              </a>
            </Detail>
            <Detail icon={MapPin} label="Office">
              {contact.address}
            </Detail>
            <Detail icon={Clock} label="Hours">
              {contact.hours}
            </Detail>
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <EnquiryForm />
        </Reveal>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-muted/40">
        <div className="shell py-16 sm:py-20 lg:py-28">
          <SectionHeading
            eyebrow="What Happens Next"
            title="How a journey gets designed"
            aside="Four steps, and no money changes hands until the third one reads right to you."
          />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 90}
                className="border-t border-border pt-6"
              >
                <p className="font-serif text-3xl text-accent">{s.n}</p>
                <p className="mt-3 font-serif text-xl text-foreground sm:text-2xl">
                  {s.title}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promises */}
      <section className="shell py-16 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Our Promise"
          title="What you get from working with us"
          align="center"
        />
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {promises.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className="border-t border-border pt-6"
            >
              <p className="mb-3 font-serif text-xl text-foreground sm:text-2xl">
                {p.title}
              </p>
              <p className="text-pretty leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </dt>
        <dd className="mt-1.5 text-pretty leading-relaxed text-foreground">
          {children}
        </dd>
      </div>
    </div>
  )
}

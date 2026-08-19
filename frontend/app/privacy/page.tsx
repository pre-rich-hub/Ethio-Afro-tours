import type { Metadata } from 'next'
import Link from 'next/link'
import { contact } from '@/lib/site'

const lastUpdated = 'August 19, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How EthioAfro Tours collects, uses, shares, and protects guest information for private Ethiopia travel planning.',
  alternates: { canonical: '/privacy' },
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We collect information you choose to send through our website, email, phone, WhatsApp, newsletter forms, enquiry forms, and booking conversations. This may include your name, email address, phone number, country, preferred destinations, travel dates, group size, budget range, accommodation preferences, dietary needs, accessibility needs, and other details needed to design your trip.',
      'If a trip is confirmed, we may request additional travel information such as passport details, flight details, emergency contact information, insurance details, and special requirements needed by hotels, airlines, guides, or local authorities.',
      'Our website may also collect technical information such as IP address, browser type, device information, pages visited, referral source, and cookie or analytics data.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use personal information to respond to enquiries, prepare private itineraries, provide quotes, arrange confirmed travel services, communicate important trip updates, process administrative records, improve our website, and protect the security of our services.',
      'If you subscribe to updates, we may send occasional travel stories or offers. You can unsubscribe at any time by using the unsubscribe link or contacting us directly.',
    ],
  },
  {
    title: 'Sharing With Travel Partners',
    body: [
      'We share only the information reasonably needed to operate your itinerary with trusted service providers such as hotels, lodges, domestic airlines, transport providers, guides, restaurants, activity providers, payment processors, technology vendors, and professional advisers.',
      'We do not sell personal information. We do not share guest information with unrelated third parties for their independent marketing.',
    ],
  },
  {
    title: 'Payments',
    body: [
      'When card or online payments are available, payment information is handled by secure payment processors. EthioAfro Tours does not intentionally store full card numbers on this website.',
    ],
  },
  {
    title: 'Cookies and Analytics',
    body: [
      'Our website may use cookies and analytics tools to keep the site working, understand visitor activity, measure performance, and improve content. You can control cookies through your browser settings, although some site features may not work as expected if cookies are disabled.',
    ],
  },
  {
    title: 'Security and Retention',
    body: [
      'We use reasonable administrative, technical, and organizational safeguards to protect personal information. No website, email system, or online service can be guaranteed to be completely secure.',
      'We keep information only as long as reasonably needed for enquiries, bookings, accounting, legal obligations, dispute handling, and service improvement. When information is no longer needed, we delete, archive, or anonymize it where practical.',
    ],
  },
  {
    title: 'International Travel Data',
    body: [
      'Because travel services often involve hotels, airlines, local operators, technology providers, and guests in different countries, your information may be processed or transferred outside your home country. We handle those transfers only as needed to provide requested travel services or operate our business.',
    ],
  },
  {
    title: 'Your Choices',
    body: [
      'You may ask us to access, correct, update, or delete personal information we hold about you, subject to legal, accounting, security, and operational limits. You may also opt out of marketing messages at any time.',
    ],
  },
  {
    title: 'Children',
    body: [
      'Our website is intended for adults planning travel. We do not knowingly collect personal information from children without appropriate involvement from a parent or guardian.',
    ],
  },
  {
    title: 'Updates',
    body: [
      'We may update this Privacy Policy from time to time. The latest version will be posted on this page with the updated date.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-border">
        <div className="shell pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            Legal
          </p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            This policy explains how EthioAfro Tours handles information shared by guests, website visitors, and travel partners.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="shell py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-pretty leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-border pt-8">
            <h2 className="font-serif text-2xl text-foreground">Contact Us</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Questions about privacy or data requests can be sent to{' '}
              <a className="text-primary hover:text-accent" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              . You can also reach us at {contact.phone} or visit our{' '}
              <Link className="text-primary hover:text-accent" href="/contact">
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

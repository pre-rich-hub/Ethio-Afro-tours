import type { Metadata } from 'next'
import Link from 'next/link'
import { contact } from '@/lib/site'

const lastUpdated = 'August 19, 2026'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description:
    'Terms for using the EthioAfro Tours website and arranging private Ethiopia travel services.',
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    title: 'Use of This Website',
    body: [
      'This website is provided for travel information, enquiry, and itinerary planning. You agree to use it lawfully and not to interfere with the security, availability, or proper operation of the site.',
      'Website content, images, branding, itineraries, copy, and design are owned by EthioAfro Tours or used with permission. You may not copy, reproduce, or commercially reuse site content without written permission.',
    ],
  },
  {
    title: 'Enquiries and Quotes',
    body: [
      'Information on this website is general and may change. Tour pages are starting points for private travel planning, not guaranteed fixed departures or final offers.',
      'A trip becomes confirmed only when we issue a written confirmation and any required deposit or payment has been received. Prices, availability, hotels, domestic flights, guide assignments, and routing remain subject to confirmation until then.',
    ],
  },
  {
    title: 'Payments',
    body: [
      'Confirmed trips may require a deposit, balance payment, or full prepayment depending on the itinerary, travel dates, supplier rules, and booking window. Payment schedule, currency, bank charges, card fees, and included services will be stated in your written proposal or invoice.',
      'You are responsible for ensuring payments arrive by the stated due dates. Late payment may result in changes, loss of reservations, or cancellation by suppliers.',
    ],
  },
  {
    title: 'Changes and Cancellations',
    body: [
      'Change and cancellation terms depend on the confirmed itinerary and the rules of hotels, airlines, transport providers, guides, and other suppliers. Your written proposal or confirmation will state the terms that apply to your booking.',
      'Some services, including domestic flights, permits, festival-period rooms, remote lodges, and special arrangements, may be non-refundable or subject to strict cancellation penalties.',
    ],
  },
  {
    title: 'Travel Documents and Guest Responsibilities',
    body: [
      'Guests are responsible for valid passports, visas, travel insurance, health requirements, vaccination advice, customs rules, and any documents required for entry, transit, or specific activities.',
      'We strongly recommend comprehensive travel insurance covering medical care, evacuation, cancellation, interruption, delays, baggage, and activities included in your itinerary.',
    ],
  },
  {
    title: 'Travel Conditions and Itinerary Changes',
    body: [
      'Travel in Ethiopia can be affected by weather, road conditions, domestic flight changes, government decisions, security updates, religious events, local access restrictions, and other circumstances beyond our control.',
      'We may adjust routing, timing, hotels, activities, guides, or transport when needed for safety, availability, operational quality, or practical conditions. We will aim to provide a comparable alternative where reasonable.',
    ],
  },
  {
    title: 'Suppliers and Third Parties',
    body: [
      'EthioAfro Tours arranges services delivered by independent suppliers, including hotels, lodges, airlines, restaurants, transport providers, guides, parks, museums, and activity operators. We select partners carefully, but we are not responsible for every act, omission, delay, or policy of independent suppliers.',
      'Third-party websites linked from our site have their own terms and privacy practices. We are not responsible for their content or handling of information.',
    ],
  },
  {
    title: 'Guest Conduct and Safety',
    body: [
      'Guests are expected to follow local laws, guide instructions, safety briefings, cultural etiquette, conservation rules, and respectful photography practices. We may refuse or end service where conduct risks safety, violates law, damages property, harms communities, or disrupts the trip for others.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by applicable law, EthioAfro Tours is not liable for indirect, incidental, special, punitive, or consequential losses arising from use of this website or from circumstances outside our reasonable control.',
      'Nothing in these Terms limits liability where it cannot legally be limited.',
    ],
  },
  {
    title: 'Privacy',
    body: [
      'Use of this website and our travel planning services is also governed by our Privacy Policy, which explains how we collect and handle personal information.',
    ],
  },
  {
    title: 'Updates to These Terms',
    body: [
      'We may update these Terms from time to time. The version posted on this page is the current website version. Confirmed bookings are governed by the written terms provided with that booking.',
    ],
  },
]

export default function TermsPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-border">
        <div className="shell pb-12 pt-32 sm:pb-16 sm:pt-36 lg:pt-40">
          <p className="eyebrow mb-5 text-accent">
            <span className="rule" />
            Legal
          </p>
          <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Terms and Conditions
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            These terms explain how this website may be used and how private travel enquiries and confirmed arrangements are handled.
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
              Questions about these Terms can be sent to{' '}
              <a className="text-primary hover:text-accent" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              . You can also reach us at {contact.phone} or through the{' '}
              <Link className="text-primary hover:text-accent" href="/contact">
                contact page
              </Link>
              .
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Please also read our{' '}
              <Link className="text-primary hover:text-accent" href="/privacy">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

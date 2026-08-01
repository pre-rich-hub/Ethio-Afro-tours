import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { contact, destinations, tours } from '@/lib/site'
import { NewsletterForm } from '@/components/newsletter-form'

const socials = ['Instagram', 'YouTube', 'LinkedIn']

const columns = [
  {
    title: 'Destinations',
    links: destinations
      .slice(0, 5)
      .map((d) => ({ label: d.name, href: `/destinations/${d.slug}` })),
  },
  {
    title: 'Tours',
    links: [
      ...tours
        .slice(0, 4)
        .map((t) => ({ label: t.title, href: `/tours/${t.slug}` })),
      { label: 'Custom Itineraries', href: '/contact' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Layover in Addis', href: '/layover' },
      { label: 'Travel Journal', href: '/blog' },
      { label: 'Responsible Tourism', href: '/blog/responsible-travel-in-the-omo' },
      { label: 'When to Visit', href: '/blog/when-to-visit-ethiopia' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-background">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="EthioAfro Tours Logo"
                className="h-14 w-14 rounded-full object-cover border border-accent/20"
              />
              <div className="flex flex-col">
                <span className="font-serif text-3xl leading-none">EthioAfro</span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent mt-1">
                  Tours
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-pretty text-sm leading-relaxed text-background/60">
              Introducing travellers to one of humanity&apos;s oldest
              civilisations — with care, knowledge, and quiet luxury.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{contact.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 transition-colors hover:text-background"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-background"
                >
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {contact.email}
                </a>
              </li>
            </ul>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {socials.map((name) => (
                <a
                  key={name}
                  href="#"
                  className="rounded-full border border-background/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-background/70 transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/65 transition-colors duration-300 hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 border-t border-background/15 pt-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <p className="font-serif text-xl text-background sm:text-2xl">
                Continue exploring Ethiopia
              </p>
              <p className="mt-1.5 text-sm text-background/60">
                Curated travel stories and seasonal inspiration from our
                designers. Four letters a year, never more.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/15 pt-8 text-xs text-background/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} EthioAfro Tours. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact" className="hover:text-background/80">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-background/80">
              Terms
            </Link>
            <Link href="/blog/responsible-travel-in-the-omo" className="hover:text-background/80">
              Responsible Tourism
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

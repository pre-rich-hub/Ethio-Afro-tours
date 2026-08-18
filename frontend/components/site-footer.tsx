'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { contact, destinations, tours } from '@/lib/site'
import { NewsletterForm } from '@/components/newsletter-form'
import { useLanguage } from '@/components/language-provider'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: '/images/instagram-icon.png' },
  { name: 'YouTube', href: 'https://youtube.com', icon: '/images/youtube-icon.png' },
  { name: 'Facebook', href: 'https://facebook.com', icon: '/images/facebook-icon.png' },
  { name: 'TikTok', href: 'https://tiktok.com', icon: '/images/tiktok-icon.png' },
  { name: 'X', href: 'https://x.com', icon: '/images/x-icon.png' },
]

export function SiteFooter() {
  const { t } = useLanguage()
  const columns = [
    {
      title: t('footer.destinations', 'Destinations'),
      links: destinations.slice(0, 5).map((d) => ({
        label: t(`destination.${d.slug}.name`, d.name),
        href: `/destinations/${d.slug}`,
      })),
    },
    {
      title: t('footer.tours', 'Tours'),
      links: [
        ...tours.slice(0, 4).map((tour) => ({
          label: t(`tour.${tour.slug}.title`, tour.title),
          href: `/tours/${tour.slug}`,
        })),
        { label: t('footer.custom', 'Custom Itineraries'), href: '/contact' },
      ],
    },
    {
      title: t('footer.explore', 'Explore'),
      links: [
        { label: t('footer.about', 'About Us'), href: '/about' },
        { label: t('footer.layover', 'Layover in Addis'), href: '/layover' },
        { label: t('footer.journal', 'Travel Journal'), href: '/blog' },
        {
          label: t('footer.responsible', 'Responsible Tourism'),
          href: '/blog/responsible-travel-in-the-omo',
        },
        { label: t('footer.when', 'When to Visit'), href: '/blog/when-to-visit-ethiopia' },
        { label: t('footer.contact', 'Contact Us'), href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="bg-bg-dark text-background">
      <div className="shell pt-16 pb-4 sm:pt-20 sm:pb-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          <div className="lg:row-span-2">
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
              {t('footer.copy', "Introducing travellers to one of humanity's oldest civilisations — with care, knowledge, and quiet luxury.")}
            </p>

            <ul className="mt-7 space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{t('contact.address', contact.address)}</span>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}
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

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  title={item.name}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="h-full w-full object-contain rounded-full shadow-md shadow-charcoal/20"
                  />
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

          <div className="lg:col-span-3 lg:col-start-2 border-t border-background/10 pt-8 mt-4 flex flex-col gap-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-serif text-lg text-background sm:text-xl">
                  {t('footer.platforms', 'Trusted Travel Platforms')}
                </p>
                <p className="mt-1 text-xs text-background/60">
                  {t('footer.platformsCopy', 'Find us where discerning travelers plan.')}
                </p>
              </div>
              <div className="flex flex-wrap md:flex-nowrap items-center gap-3 sm:gap-4">
                <a
                  href="https://www.viator.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0"
                >
                  <img
                    src="/images/viator-logo.png"
                    alt="Viator"
                    className="h-full w-full object-contain"
                  />
                </a>
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g293791-d15214552-Reviews-Ethio_Afro_Tours-Addis_Ababa.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0"
                >
                  <img
                    src="/images/tripadvisor-logo.png"
                    alt="TripAdvisor"
                    className="h-full w-full object-contain"
                  />
                </a>
                <a
                  href="https://www.safaribookings.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0"
                >
                  <img
                    src="/images/safari-bookings-logo.png"
                    alt="SafariBookings"
                    className="h-full w-full object-contain"
                  />
                </a>
                <a
                  href="https://www.getyourguide.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0"
                >
                  <img
                    src="/images/getyourguide-logo.png"
                    alt="GetYourGuide"
                    className="h-full w-full object-contain"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6 border-t border-background/10 pt-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-serif text-lg text-background sm:text-xl">
                  {t('footer.accept', 'We Accept')}
                </p>
                <p className="mt-1 text-xs text-background/60">
                  {t('footer.acceptCopy', 'Secured payment processing methods.')}
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 justify-start md:justify-end">
                <div className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0">
                  <img
                    src="/images/visa.png"
                    alt="Visa"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0">
                  <img
                    src="/images/mastercard.png"
                    alt="Mastercard"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="group flex h-12 w-[125px] sm:h-13 sm:w-[130px] items-center justify-center rounded-lg bg-[#FAF9F6]/95 p-1.5 transition-all duration-300 hover:scale-[1.03] hover:bg-white shrink-0">
                  <img
                    src="/images/paypal.png"
                    alt="PayPal"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-background/15 pt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-lg sm:text-xl md:text-2xl text-background font-serif lg:whitespace-nowrap lg:text-left text-center">
            {t('footer.newsletter', 'Subscribe to our newsletter for curated travel stories')}
          </p>
          <NewsletterForm />
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-background/15 pt-4 text-xs text-background/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} EthioAfro Tours. {t('footer.rights', 'All rights reserved.')}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/contact" className="hover:text-background/80">
              {t('footer.privacy', 'Privacy')}
            </Link>
            <Link href="/contact" className="hover:text-background/80">
              {t('footer.terms', 'Terms')}
            </Link>
            <Link href="/blog/responsible-travel-in-the-omo" className="hover:text-background/80">
              {t('footer.responsible', 'Responsible Tourism')}
            </Link>
          </div>
        </div>
      </div>
    </footer >
  )
}

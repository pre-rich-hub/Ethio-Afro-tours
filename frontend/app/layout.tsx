import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { FloatingSupportLazy } from '@/components/floating-support-lazy'
import { VerifiedReviewsBadge } from '@/components/verified-reviews-badge'
import { LanguageProvider } from '@/components/language-provider'
import { JsonLd } from '@/components/json-ld'
import { siteUrl } from '@/lib/seo'
import { globalStructuredData } from '@/lib/structured-data'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'EthioAfro Tours — The Soul of Ethiopia, Curated',
    template: '%s · EthioAfro Tours',
  },
  description:
    'Private, tailor-made luxury journeys through Ethiopia. Walk through kingdoms carved from stone, wake above the clouds, and share coffee with families who have welcomed travellers for generations.',
  generator: 'v0.app',
  keywords: [
    'Luxury Ethiopia Tours',
    'Private Ethiopia Tours',
    'Addis Ababa layover tour',
    'Lalibela',
    'Simien Mountains',
    'Danakil Depression',
    'Omo Valley',
    'Ethiopia travel',
  ],
  openGraph: {
    title: 'EthioAfro Tours — The Soul of Ethiopia, Curated',
    description:
      'Private, tailor-made luxury journeys through Ethiopia, designed around you.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#12291f',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <JsonLd data={globalStructuredData} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-[0.14em] focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <LanguageProvider>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
          <VerifiedReviewsBadge />
          <FloatingSupportLazy />
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

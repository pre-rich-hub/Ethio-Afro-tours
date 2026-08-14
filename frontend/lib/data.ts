// Tour data with static overlay.
//
// Phase 1 strategy: the API is authoritative for the fields it can supply
// (prices, featured flags), while the static catalog in lib/site.ts stays the
// source for display copy (days/nights, style, season, group, teaser,
// summary, includes/excludes, itinerary, places, images). Live tours are
// merged onto their static record by slug — when a tour is not live yet (API
// down, catalog beyond page limits) the static record is returned unchanged.
//
// The Tour type in lib/site.ts is the contract: no field additions. From the
// live payload we overlay `from` (price) and `featured`; rating exists in the
// API but has no surface on the static Tour type, so it stays unused until a
// rendering element needs it.

import type { LayoverPackage, Tour } from '@/lib/site'
import {
  layoverPackages as staticLayoverPackages,
  tours as staticTours,
  getTour as getStaticTour,
} from '@/lib/site'
import {
  getLayoverPackages,
  getTours,
  getTourBySlug,
  type ApiLayoverPackage,
  type ApiTour,
} from '@/lib/api'

function formatPrice(price: number | null): string | null {
  if (price === null || price === undefined || price <= 0) return null
  return `$${price.toLocaleString('en-US')} per person`
}

function overlayLive(staticTour: Tour, live: ApiTour): Tour {
  const price = formatPrice(live.adultPrice)
  return {
    ...staticTour,
    // Price/featured overlay only — everything else stays on the static
    // record so rendering is byte-identical with the frozen UI.
    ...(price ? { from: price } : {}),
    ...(typeof live.isFeatured === 'boolean' ? { featured: live.isFeatured } : {}),
  }
}

export async function getToursData(): Promise<Tour[]> {
  let liveTours: ApiTour[] = []
  try {
    const page = await getTours({ limit: 100 })
    liveTours = page.items ?? []
  } catch {
    liveTours = []
  }

  const bySlug = new Map(liveTours.map((t) => [t.canonical?.slug, t]))

  return staticTours.map((t) => {
    const live = bySlug.get(t.slug)
    return live ? overlayLive(t, live) : t
  })
}

export async function getTourData(slug: string): Promise<Tour | undefined> {
  const staticTour = getStaticTour(slug)
  if (!staticTour) return undefined

  try {
    const live = await getTourBySlug(slug)
    if (live && live.canonical?.slug === slug) {
      return overlayLive(staticTour, live)
    }
  } catch {
    // Fall through to the static record.
  }

  return staticTour
}

export async function getLayoverPackagesData(): Promise<LayoverPackage[]> {
  try {
    const livePackages: ApiLayoverPackage[] = await getLayoverPackages()
    const staticBySlug = new Map(staticLayoverPackages.map((p) => [p.slug, p]))

    // A successful API response is authoritative, including an intentionally
    // empty catalog. Static records only supply images for matching seed slugs.
    return livePackages.map((live) => {
      const fallback = staticBySlug.get(live.slug)
      return {
        ...live,
        image:
          live.image && live.image.startsWith('/api/v1/')
            ? live.image
            : fallback?.image ?? '/placeholder.svg',
      }
    })
  } catch {
    return staticLayoverPackages
  }
}

import { getLayoverPackagesData } from '@/lib/data'
import { LayoverTeaserClient } from '@/components/layover-teaser-client'

export async function LayoverTeaser() {
  // Homepage section: baked at build time (the homepage is statically built);
  // a failing API falls back to the static catalog, so the build never breaks.
  const packages = await getLayoverPackagesData()

  return <LayoverTeaserClient packages={packages} />
}

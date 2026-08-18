const productionSiteUrl = 'https://ethioafrotours.com'

function resolveSiteUrl(): URL {
  const configuredUrl = process.env.SITE_URL?.trim() || productionSiteUrl
  const url = new URL(configuredUrl)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('SITE_URL must use the http or https protocol.')
  }

  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an origin without a path, query, or fragment.')
  }

  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
    throw new Error('SITE_URL must use https in production.')
  }

  return url
}

export const siteUrl = resolveSiteUrl()

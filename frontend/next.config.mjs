/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // SSE (AI assistant streaming) breaks when the server gzips responses:
  // Chrome's streaming fetch stalls after the first decompressed chunk.
  // Next must not compress; Vercel's CDN handles static-asset compression.
  compress: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/tours/highlands-and-wildlife',
        destination: '/tours/bale-mountains-and-sof-omar',
        permanent: true,
      },
      {
        source: '/tours/sacred-waters-and-coffee',
        destination: '/tours/ethiopia-coffee-origins',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? 'http://localhost:5000'
    return [{ source: '/api/:path*', destination: `${apiBase}/api/:path*` }]
  },
}

export default nextConfig

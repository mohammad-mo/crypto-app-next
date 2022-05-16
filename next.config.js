/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.coingecko.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/coins',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

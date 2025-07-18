const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  reactStrictMode: true,
  images: { unoptimized: true },  // needed for `next export`
  output: 'export',               // static build for Cloudflare Pages
  eslint: {
    ignoreDuringBuilds: true,     // ← skip ESLint errors on build
  },
})

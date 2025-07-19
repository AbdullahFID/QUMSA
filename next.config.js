/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },   // needed for `next export`
  output: 'export',                // static build for Cloudflare Pages
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
/* Set NEXT_PUBLIC_BASE_PATH=/crypto-nextjs when hosting under a subpath (e.g. GitHub Pages). */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/* Static export only when running `next build`, not during `next dev`, so dev uses the normal
   server and avoids ENOENT vendor-chunks / stale chunk maps under .next.
   On Vercel (`VERCEL=1`), skip static export so the platform gets a normal `.next` build. */
const isBuild = process.argv.includes('build')
const isVercel = process.env.VERCEL === '1'

const nextConfig = {
  ...(isBuild && !isVercel ? { output: 'export' } : {}),
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  // Allow HMR / _next assets when opening the dev server from another device on your LAN
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.*.*.*', '127.0.0.1'],
  images: {
    unoptimized: true
  },
  // Dev: disable webpack cache to avoid stale chunk maps (Cannot find module './447.js',
  // 404 hot-updates) after HMR/full reload or partial .next deletes. Slightly slower compiles.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nuelink.com' },
      { protocol: 'https', hostname: 'blog.nuelink.com' },
      { protocol: 'https', hostname: 'substackcdn.com' }
    ]
  }
};

export default nextConfig;
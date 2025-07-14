/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    // This is needed to allow the Next.js dev server to accept requests from the
    // Firebase Studio preview URL.
    serverActions: {
      allowedOrigins: [
        "*.proxy.prod.unverified.cloud.goog",
        "*.us-central1.cloudshell.dev"
      ]
    }
  },
};

module.exports = nextConfig;

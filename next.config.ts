
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
  serverExternalPackages: ['firebase-admin'],
  experimental: {
    // This is needed to allow the Next.js dev server to accept requests from the
    // Firebase Studio preview URL.
    // Exclude the 'workspace' directory from being watched to prevent an infinite restart loop.
    serverComponentsExternalPackages: ["!**/workspace/**"],
  },
};

export default nextConfig;

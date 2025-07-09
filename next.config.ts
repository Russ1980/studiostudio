
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['https://*.cloudworkstations.dev'],
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
    ],
  },
   webpack: (config, { isServer }) => {
    // Suppress warnings for server-side dependencies
    if (isServer) {
      config.externals.push({
        '@opentelemetry/instrumentation': 'commonjs @opentelemetry/instrumentation',
        'handlebars': 'commonjs handlebars'
      });
    }
    
    // Ignore critical dependency warnings
    config.module = {
      ...config.module,
      exprContextCritical: false
    };
    
    return config;
  }
};

export default nextConfig;

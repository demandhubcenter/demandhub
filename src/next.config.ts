
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  /* config options here */
  experimental: {
    serverActions: {
      enabled: false,
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve 'async_hooks' on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
      }
    }
    
    // Ignore require.extensions warning from handlebars
    config.module.rules.push({
      test: /node_modules\/handlebars\/lib\/index\.js$/,
      loader: 'string-replace-loader',
      options: {
        search: 'require.extensions',
        replace: 'null',
      },
    });

    return config
  },
  allowedDevOrigins: ["6000-firebase-studio-*.cloudworkstations.dev"],
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'www.grantthornton.co.uk',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

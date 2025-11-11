import type { NextConfig } from "next";
// @ts-ignore - next-pwa types are not available
import withPWA from 'next-pwa';

interface WebpackConfig {
  resolve: {
    fallback: {
      [key: string]: boolean | string;
    };
  };
  [key: string]: any;
}

const nextConfig: NextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
  buildExcludes: [/middleware-manifest\.json$/],
})({
  // Use webpack 5 for compatibility
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      config.resolve = config.resolve || { fallback: {} };
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Output configuration
  output: 'export',
  reactStrictMode: true,
  // Image optimization
  images: {
    unoptimized: true,
  },
  // Add trailing slash for better compatibility
  trailingSlash: true,
  // React StrictMode is disabled for better compatibility
  // Enable static HTML export
  distDir: 'build',
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
});

export default nextConfig;

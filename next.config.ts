import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Disable static generation for mobile app compatibility
  output: undefined,
  trailingSlash: false,
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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    resolveAlias: {
        "canvas-confetti": "canvas-confetti"
    },
    resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json"
    ]
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Fix for canvas and other Node.js packages in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        canvas: false,
        encoding: false,
      };
    }
    
    // Ignore canvas-related modules that cause issues
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('canvas');
    }
    
    return config;
  },
};

export default nextConfig;

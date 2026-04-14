/** @type {import('next').NextConfig} */
let withBundleAnalyzer;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (e) {
  // Bundle analyzer not installed, use identity function
  withBundleAnalyzer = (config) => config;
}

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp'], // Prefer WebP format
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Image sizes for optimization
  },
  trailingSlash: true,
  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize production builds
  swcMinify: true,
  // Experimental features for better code splitting
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-intersection-observer'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);

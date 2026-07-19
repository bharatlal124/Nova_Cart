import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // experimental: {
    typedRoutes: true,
    // webpackBuildWorker: false,
  // },
  // webpack: (config) => {
  //   config.cache = false;
  //   return config;
  // },
 
};

export default nextConfig;

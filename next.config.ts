import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/:path*'
      }
    ]
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Increase the memory limit
    if (!isServer) {
      config.performance = {
        ...config.performance,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
      }
    }
    return config
  },

}

export default nextConfig;

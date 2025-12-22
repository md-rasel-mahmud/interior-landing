import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // allow images from everywhere
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // unoptimized: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "1024mb",
    },
  },

  api: {
    bodyParser: {
      sizeLimit: "1024mb",
    },
  },
};

export default nextConfig;

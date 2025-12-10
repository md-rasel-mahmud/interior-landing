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
};

export default nextConfig;

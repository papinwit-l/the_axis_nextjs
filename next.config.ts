import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.theaxis-utthayan.com",
      },
      {
        protocol: "http",
        hostname: "203.170.129.6",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wholesaler-core-develop.web.parafacc.ir",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid Turbopack traversing the automation service’s circular `file:../..` link (if present).
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    localPatterns: [
      {
        pathname: "/Industries We Serve Final/**",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.18.6",
    "192.168.18.6:3000",
    "localhost:3000",
    "*.loca.lt",
  ],
};

export default nextConfig;

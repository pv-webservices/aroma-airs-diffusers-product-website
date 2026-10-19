import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  // Preparation scripts already resize and compress the local WebP assets.
  images: { unoptimized: true },
};
export default config;

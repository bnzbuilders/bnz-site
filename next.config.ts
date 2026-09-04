import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy static marketing page (index.html + CNAME at the repo root) is
  // still what GitHub Pages serves for buildwithbnz.com. It is untouched by the
  // Next build; see README.md.
  reactStrictMode: true,
};

export default nextConfig;

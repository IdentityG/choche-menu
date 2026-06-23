import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Image Optimization ─────────────────────────────────────
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.mywebar.com",
      },
      {
        protocol: "https",
        hostname: "ar-code.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 768, 1024, 1280, 1920],
  },

  // ─── Transpile 3D packages ──────────────────────────────────
  transpilePackages: ["three"],

  // ─── Compiler Options ───────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ─── Experimental ───────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/drei",
    ],
  },
};

export default nextConfig;
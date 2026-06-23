import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ─── Image Optimization ─────────────────────────────── */
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

  /* ─── Transpile 3D packages ──────────────────────────── */
  transpilePackages: ["three"],

  /* ─── Compiler ───────────────────────────────────────── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ─── Experimental ───────────────────────────────────── */
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@react-three/drei",
    ],
  },

  /* ─── Headers ────────────────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(self), microphone=(), geolocation=(self)",
          },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },

  /* ─── Redirects ──────────────────────────────────────── */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/menu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
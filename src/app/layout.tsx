import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import GrainTexture from "@/components/ui/GrainTexture";
import "@/app/globals.css";

/* ─── Font Loading ─────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

/* ─── Full Production Metadata ─────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://choche-menu.vercel.app"
  ),
  title: {
    default: "Choche Takeaway | ጮጮ ኮፈ ሀዉስ — AR Digital Menu",
    template: "%s | Choche Takeaway",
  },
  description:
    "Scan. Explore. Order. Experience our full menu with AR dish previews — Choche Takeaway, Ethiopian cafe with fast food, breakfast, juices and more.",
  keywords: [
    "Choche Takeaway",
    "ጮጮ ኮፈ ሀዉስ",
    "Ethiopian Food",
    "Fast Food",
    "AR Menu",
    "Digital Menu",
    "QR Menu",
    "3D Food Preview",
    "Ethiopian Restaurant",
    "Burger",
    "Pizza",
    "Juice",
    "Coffee",
  ],
  authors: [{ name: "Choche Takeaway" }],
  creator: "Choche Takeaway",
  publisher: "Choche Takeaway",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Choche Takeaway | ጮጮ ኮፈ ሀዉስ",
    description:
      "Experience our full menu with AR dish previews. Scan, explore, and order your favorites.",
    siteName: "Choche Takeaway",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Choche Takeaway — AR Digital Menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Choche Takeaway | ጮጮ ኮፈ ሀዉስ",
    description: "AR-powered digital menu for Ethiopian cafe",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Choche Menu",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  category: "food",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#0A0A0A" },
  ],
};

/* ─── Root Layout ──────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to font CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for AR services */}
        <link rel="dns-prefetch" href="https://mywebar.com" />
        <link rel="dns-prefetch" href="https://ar-code.com" />
      </head>
      <body className="font-body bg-void text-primary antialiased">
        {children}
        <GrainTexture />
      </body>
    </html>
  );
}
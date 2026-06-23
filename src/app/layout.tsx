import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";

/* --- Font Loading --------------------------------------- */
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

/* --- Metadata ------------------------------------------- */
export const metadata: Metadata = {
  title: "Choche Takeaway | ጮጮ ኮፈ ሀዉስ",
  description:
    "Scan. Explore. Order. Experience our menu in AR — Choche Takeaway, your favorite cafe.",
  keywords: [
    "Choche Takeaway",
    "ጮጮ ኮፈ ሀዉስ",
    "Ethiopian Food",
    "Fast Food",
    "AR Menu",
    "Digital Menu",
  ],
  authors: [{ name: "Choche Takeaway" }],
  creator: "Choche Takeaway",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Choche Takeaway | ጮጮ ኮፈ ሀዉስ",
    description: "Experience our full menu with AR dish previews",
    siteName: "Choche Takeaway",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A0A0A",
};

/* --- Root Layout ---------------------------------------- */
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
      <body className="grain-overlay font-body bg-void text-primary antialiased">
        {children}
      </body>
    </html>
  );
}

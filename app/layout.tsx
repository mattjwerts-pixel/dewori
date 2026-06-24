import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

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
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Dewori Skin — Korean Skincare Ritual",
    template: "%s | Dewori Skin",
  },
  description:
    "Your nightly glow ritual. Premium Korean skincare tools and treatments for glowing skin every morning.",
  keywords: ["Korean skincare", "K-beauty", "Dewori Skin", "skincare ritual", "glow", "nighttime skincare"],
  metadataBase: new URL("https://dewori.store"),
  openGraph: {
    title: "Dewori Skin — Korean Skincare Ritual",
    description: "Your nightly glow ritual. Premium Korean skincare tools and treatments for glowing skin every morning.",
    type: "website",
    url: "https://dewori.store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {/* Skip to main content — ADA/keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber focus:text-midnight focus:px-4 focus:py-2 focus:rounded-full focus:font-medium focus:text-sm"
          >
            Skip to main content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

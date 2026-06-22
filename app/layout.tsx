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
    default: "Dewori Skin — Korean Collagen Night Face Mask",
    template: "%s | Dewori Skin",
  },
  description:
    "Your nightly glow ritual. Premium Korean collagen night face mask with professional brush applicator.",
  keywords: ["Korean skincare", "collagen mask", "face mask", "K-beauty", "Dewori Skin", "peel off mask"],
  openGraph: {
    title: "Dewori Skin — Korean Collagen Night Face Mask",
    description: "Your nightly glow ritual. Premium Korean collagen night face mask with professional brush applicator.",
    type: "website",
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
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

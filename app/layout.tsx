import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = localFont({
  src: "../public/fonts/DancingScript-Regular.ttf",
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Supa Store",
  description: "Boutique en ligne — atelier Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable}`}
    >
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}

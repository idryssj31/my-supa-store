import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { CartShell } from "@/components/cart/CartShell";
import { AuthSessionProvider } from "@/components/auth/AuthSessionProvider";
import { Footer } from "@/components/Footer";
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
        <AuthSessionProvider>
          <CartShell>{children}</CartShell>
        </AuthSessionProvider>
        <Footer />
      </body>
    </html>
  );
}

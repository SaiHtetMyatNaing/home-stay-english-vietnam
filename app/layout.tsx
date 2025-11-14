import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'], 
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Home Stay English Vietnam",
  description: "STAY FREE • TEACH ENGLISH • LIVE LOCAL",
  openGraph: {
    images: [
      {
        url: "/opengraph.png", 
        width: 1200,
        height: 630,
        alt: "Home Stay English Vietnam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Stay English Vietnam",
    description: "STAY FREE • TEACH ENGLISH • LIVE LOCAL",
    images: [
      {
        url: "/opengraph.png", 
        width: 1200,
        height: 630,
        alt: "Home Stay English Vietnam",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
        suppressHydrationWarning
      >
        <Navbar/>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
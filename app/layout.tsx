import type { Metadata } from "next";
import "./globals.css";
import NavigationBar from "@/components/navigation/navigation-bar";
import { Montserrat } from 'next/font/google';
import { Toaster } from "sonner";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '700'], 
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Leadership | Tiny Scholar Hub",
  description: "A place for entreprenuers to develop their skills.",
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
      >
        <NavigationBar/>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}

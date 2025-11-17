import type { Metadata } from "next";
import "./globals.css";
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
  // Basic
  title: {
    default: 'English Homestay Vietnam – Teach English, Live with Locals, Explore Real Vietnam',
    template: '%s | English Homestay Vietnam',
  },
  description:
    'Stay for free in Vietnam, teach English 15 hours/week, and immerse yourself in authentic local life. Perfect for travelers who want cultural exchange, free homestay, and meaningful connections.',

  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.englishhomestayvietnam.com',
    siteName: 'English Homestay Vietnam',
    title: 'Teach. Travel. Connect. Live with Vietnamese Learners',
    description:
      'Free homestay for international English teachers. Practice English with locals, share daily life, explore Vietnam culture. Apply now!',
    images: [
      {
        url: '/opengraph.png', 
        width: 1200,
        height: 630,
        alt: 'Foreign teachers and Vietnamese learners laughing together at homestay',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    title: 'Teach English & Live Free in Vietnam | English Homestay',
    description:
      'Free accommodation, cultural exchange, 15 hrs/week teaching. 2 weeks–3 months. Apply now!',
    images: ['/opengraph.png'],
    creator: '@EnglishHomestayVN', 
  },

  // Robots & Verification
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (add your real IDs)
  verification: {
    google: 'your-google-site-verification',
  },

  // Alternates & Manifest
  alternates: {
    canonical: 'https://www.englishhomestayvietnam.com',
  },
  manifest: '/site.webmanifest',

  // Structured Data (JSON-LD) – Organization
  other: {
    'application-ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'English Homestay Vietnam',
      url: 'https://www.englishhomestayvietnam.com',
      logo: '/logo.png',
      description:
        'Cultural exchange program offering free homestay for volunteer English teachers in Hanoi, Vietnam.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Trâu Quỳ, Gia Lâm',
        addressLocality: 'Hà Nội',
        addressCountry: 'VN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@englishhomestayvietnam.com',
        telephone: '+84 968 199 900',
        contactType: 'Customer Service',
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=61566361055605',
        'https://www.instagram.com/englishhomestayvietnam',
      ],
    }),
  },

  // Keywords (still used by some crawlers)
  keywords: [
    'english homestay vietnam',
    'teach english vietnam free',
    'volunteer teaching vietnam',
    'cultural exchange hanoi',
    'free accommodation vietnam',
    'learn vietnamese culture',
    'english teacher volunteer',
    'homestay tiếng anh việt nam',
    'dạy tiếng anh miễn phí ở việt nam',
    'tình nguyện dạy tiếng anh hà nội',
    'trao đổi văn hóa homestay',
    'ở miễn phí dạy tiếng anh',
    'trải nghiệm văn hóa việt nam',
    'giáo viên tiếng anh tình nguyện',
    'homestay gia lâm hà nội',
  ],
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
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
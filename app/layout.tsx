import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Quein Conference and Event Organization WLL | Where Every Occasion Finds Its Grandeur | Doha, Qatar",
  description: "Premier event management company in Doha, Qatar specializing in private events, exhibitions, conferences, and marriage events. Cultural sensitivity meets international excellence. 200+ successful events, 98% client satisfaction.",
  keywords: [
    "event management Qatar",
    "Doha event planning", 
    "Qatar conference organization",
    "wedding planning Qatar",
    "exhibition management Doha",
    "private events Qatar",
    "marriage events Doha",
    "cultural event planning",
    "Quein events",
    "Qatar event company"
  ],
  authors: [{ name: "Quein Conference and Event Organization WLL" }],
  creator: "Quein Conference and Event Organization WLL",
  publisher: "Quein Conference and Event Organization WLL",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Quein Conference and Event Organization WLL | Where Every Occasion Finds Its Grandeur",
    description: "Premier event management company in Doha, Qatar. Cultural sensitivity meets international excellence. 200+ successful events, 98% client satisfaction.",
    type: "website",
    locale: "en_US",
    url: "https://quein-events.com",
    siteName: "Quein Conference and Event Organization WLL",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Quein Conference and Event Organization WLL - Premier Event Management in Qatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quein Conference and Event Organization WLL | Qatar Event Management",
    description: "Premier event management in Doha, Qatar. Where every occasion finds its grandeur.",
    images: ["/images/og-image.jpg"],
  },
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
  verification: {
    google: "your-google-verification-code", // TODO: Replace with actual verification code
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://quein-events.com",
    "name": "Quein Conference and Event Organization WLL",
    "alternateName": "Quein Events",
    "description": "Premier event management company in Doha, Qatar specializing in private events, exhibitions, conferences, and marriage events with cultural sensitivity and international excellence.",
    "url": "https://quein-events.com",
    "telephone": "+974-XXXX-XXXX", // TODO: Replace with actual phone number
    "email": "info@quein-events.com", // TODO: Replace with actual email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Doha", // TODO: Replace with actual street address
      "addressLocality": "Doha",
      "addressRegion": "Doha",
      "addressCountry": "QA",
      "postalCode": "00000" // TODO: Replace with actual postal code
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2854", // Doha coordinates
      "longitude": "51.5310"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Qatar"
    },
    "serviceType": [
      "Event Management",
      "Conference Organization", 
      "Wedding Planning",
      "Exhibition Management",
      "Private Event Planning"
    ],
    "priceRange": "$$$$",
    "openingHours": "Mo-Su 08:00-18:00", // TODO: Replace with actual hours
    "sameAs": [
      "https://instagram.com/quein-events", // TODO: Replace with actual social media URLs
      "https://linkedin.com/company/quein-events",
      "https://facebook.com/quein-events"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background-primary antialiased`}>
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}

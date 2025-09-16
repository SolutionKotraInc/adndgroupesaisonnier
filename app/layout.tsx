// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import ClientWrapper from "../components/ClientWrapper";
import dynamic from "next/dynamic";

import ScrollToTopOnRouteChange from "../components/ScrollToTopOnRouteChange";
import WipeCSS from "../components/WipeCSS"; // ⬅️ use CSS wipe

const QuickDock = dynamic(() => import("../components/QuickDock"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: {
    default: "ADND Groupe Saisonnier - Aménagement paysager professionnel",
    template: "%s | ADND Groupe Saisonnier"
  },
  description: "ADND Groupe Saisonnier offre des services d'aménagement paysager professionnel : tonte de pelouse, ouverture de terrain, contrôle des mauvaises herbes, et plus. Service dans la région de Montréal.",
  keywords: [
    "aménagement paysager",
    "tonte de pelouse",
    "ouverture de terrain", 
    "contrôle mauvaises herbes",
    "paysagiste Montréal",
    "entretien pelouse",
    "aménagement extérieur",
    "jardinage professionnel",
    "ADND",
    "groupe saisonnier"
  ],
  authors: [{ name: "ADND Groupe Saisonnier" }],
  creator: "ADND Groupe Saisonnier",
  publisher: "ADND Groupe Saisonnier",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://adndgroupesaisonnier.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: "https://adndgroupesaisonnier.com",
    siteName: "ADND Groupe Saisonnier",
    title: "ADND Groupe Saisonnier - Aménagement paysager professionnel",
    description: "Services d'aménagement paysager professionnel : tonte de pelouse, ouverture de terrain, contrôle des mauvaises herbes. Service dans la région de Montréal.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "ADND Groupe Saisonnier - Aménagement paysager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADND Groupe Saisonnier - Aménagement paysager professionnel",
    description: "Services d'aménagement paysager professionnel dans la région de Montréal.",
    images: ["/og.jpg"],
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
    google: "votre-code-google-search-console",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ADND Groupe Saisonnier",
    "description": "Services d'aménagement paysager professionnel : tonte de pelouse, ouverture de terrain, contrôle des mauvaises herbes.",
    "url": "https://adndgroupesaisonnier.com",
    "telephone": "+1-438-XXX-XXXX",
    "email": "operations@adndgroupesaisonnier.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montréal",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.5017",
      "longitude": "-73.5673"
    },
    "openingHours": "Mo-Fr 08:00-17:00",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5017",
        "longitude": "-73.5673"
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'aménagement paysager",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Tonte de pelouse",
            "description": "Service professionnel de tonte de pelouse"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ouverture de terrain",
            "description": "Service d'ouverture et de préparation de terrain"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Contrôle des mauvaises herbes",
            "description": "Service de contrôle et d'élimination des mauvaises herbes"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/adndgroupesaisonnier",
      "https://www.instagram.com/adndgroupesaisonnier"
    ]
  };

  return (
    <html lang="fr" className="overflow-x-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen antialiased gradient-radial">
        <WipeCSS /> {/* green wipe (CSS-only) */}
        <ScrollToTopOnRouteChange />
        <ClientWrapper>
          <Navbar />
          <main>
            {children}
          </main>
          <QuickDock />
        </ClientWrapper>
      </body>
    </html>
  );
}

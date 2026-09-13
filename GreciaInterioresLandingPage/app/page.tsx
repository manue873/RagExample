import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Portfolio } from "@/components/portfolio"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Grecia Interiores",
    image: "https://greciaInteriores.com/images/logogrecia.png",
    "@id": "https://greciaInteriores.com",
    url: "https://greciaInteriores.com",
    telephone: "+51941397531",
    email: "arq.greciacalle@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PE",
      addressLocality: "Lima",
    },
    geo: {
      "@type": "GeoCoordinates",
      addressCountry: "PE",
    },
    sameAs: ["https://www.instagram.com/greciacalle.arq"],
    priceRange: "$$",
    description:
      "Diseño de interiores premium para espacios comerciales. Especializados en spas, salones de belleza, restaurantes, cafeterías y consultorios.",
    areaServed: ["PE", "MX", "Latinoamérica"],
    serviceType: ["Diseño de Interiores", "Diseño y Construcción", "Adquisiciones", "Renders 3D", "Diseño Comercial"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Diseño de Interiores",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diseño de Interiores",
            description: "Conceptualización y desarrollo de espacios funcionales y estéticos para comercios",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diseño y Construcción",
            description: "Servicio integral desde el concepto hasta la ejecución completa del proyecto",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Adquisiciones",
            description: "Selección y compra de mobiliario, accesorios y elementos decorativos",
          },
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export const metadata: Metadata = {
  title: "Grecia Interiores - Diseño de Interiores Comercial | Spas, Salones, Restaurantes",
  description:
    "Diseño de interiores premium para espacios comerciales en Perú. Especializados en spas, salones de belleza, restaurantes, cafeterías y consultorios. Servicio virtual y presencial.",
  keywords: [
    "diseño de interiores",
    "diseño comercial",
    "interiorismo",
    "spas",
    "salones de belleza",
    "restaurantes",
    "cafeterías",
    "consultorios",
    "diseño de interiores Perú",
    "diseño de interiores Lima",
    "arquitectura de interiores",
    "renders 3D",
    "diseño y construcción",
  ],
  authors: [{ name: "Grecia Interiores" }],
  creator: "Grecia Interiores",
  publisher: "Grecia Interiores",
  metadataBase: new URL("https://greciaInteriores.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Grecia Interiores - Diseño de Interiores Comercial",
    description:
      "Transformamos espacios comerciales en experiencias únicas. Diseño de interiores para spas, salones de belleza y restaurantes.",
    url: "https://greciaInteriores.com",
    siteName: "Grecia Interiores",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/logogrecia.png",
        width: 1200,
        height: 630,
        alt: "Grecia Interiores - Diseño de Interiores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grecia Interiores - Diseño de Interiores Comercial",
    description: "Diseño de interiores premium para espacios comerciales. Spas, salones de belleza y restaurantes.",
    images: ["/images/logogrecia.png"],
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
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.jpg",
  },
}

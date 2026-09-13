"use client"

import { Card } from "@/components/ui/card"
import { Building2, Hammer, ShoppingBag, Home } from "lucide-react"
import { useScrollAnimation } from "@/lib/use-scroll-animation"

const services = [
  {
    number: "01",
    icon: Building2,
    title: "Diseño de Interiores",
    description:
      "Conceptualización y desarrollo de espacios funcionales y estéticos. Planos técnicos, renders 3D y selección de materiales.",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Diseño y Construcción",
    description:
      "Servicio integral desde el concepto hasta la ejecución. Coordinamos y supervisamos cada etapa de la obra.",
  },
  {
    number: "03",
    icon: ShoppingBag,
    title: "Adquisiciones",
    description:
      "Selección y compra de mobiliario, accesorios y elementos decorativos. Gestión completa de proveedores.",
  },
]

const spaces = [
  {
    category: "Comercial",
    items: [
      "Spas & Wellness",
      "Salones de Belleza",
      "Restaurantes",
      "Cafeterías",
      "Clínicas Estéticas",
      "Consultorios",
    ],
  },
  {
    category: "Casas",
    items: ["Salas", "Comedores", "Dormitorios", "Cocinas", "Baños", "Espacios Exteriores"],
  },
]

export function Services() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="servicios" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-muted-foreground mb-4">SERVICIOS</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance">
            Lo que
            <br />
            <span className="italic font-light">hacemos</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 bg-background border-border hover:shadow-lg transition-all hover:-translate-y-1"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-serif text-5xl text-muted-foreground/20">{service.number}</span>
                <service.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl mb-4">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {spaces.map((space, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                {space.category === "Comercial" ? (
                  <Building2 className="h-6 w-6 text-primary" strokeWidth={1.5} />
                ) : (
                  <Home className="h-6 w-6 text-primary" strokeWidth={1.5} />
                )}
                <h3 className="font-serif text-2xl">{space.category}</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {space.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

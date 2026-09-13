"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Instagram, Mail, Phone } from "lucide-react"
import { useScrollAnimation } from "@/lib/use-scroll-animation"

export function Contact() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="contacto" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-muted-foreground mb-4">¿LISTO PARA COMENZAR?</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-balance">
            Hablemos de tu
            <br />
            <span className="italic font-light">próximo proyecto</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Agenda una reunión introductoria sin compromiso. Conoce nuestro proceso y recibe una cotización
            personalizada.
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card className="p-8 md:p-12 bg-secondary/30 border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <a
                href="https://www.instagram.com/greciacalle.arq"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center gap-4 hover:text-primary transition-colors group"
              >
                <div className="p-4 rounded-full bg-background group-hover:bg-primary/10 transition-colors">
                  <Instagram className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-serif text-lg mb-1">Instagram</p>
                  <p className="text-sm text-muted-foreground">@greciacalle.arq</p>
                </div>
              </a>

              <a
                href="mailto:arq.greciacalle@gmail.com"
                className="flex flex-col items-center text-center gap-4 hover:text-primary transition-colors group"
              >
                <div className="p-4 rounded-full bg-background group-hover:bg-primary/10 transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-serif text-lg mb-1">Email</p>
                  <p className="text-sm text-muted-foreground">arq.greciacalle@gmail.com</p>
                </div>
              </a>

              <a
                href="https://wa.me/51941397531"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center text-center gap-4 hover:text-primary transition-colors group"
              >
                <div className="p-4 rounded-full bg-background group-hover:bg-primary/10 transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-serif text-lg mb-1">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+51 941 397 531</p>
                </div>
              </a>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="w-full md:w-auto" asChild>
                <a
                  href="https://wa.me/51941397531?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20de%20diseño%20interior"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SOLICITAR COTIZACIÓN
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">Trabajamos con clientes en Perú, México y toda Latinoamérica</p>
        </div>
      </div>
    </section>
  )
}

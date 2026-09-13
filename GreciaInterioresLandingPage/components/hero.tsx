"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-32">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          <h1
            className={`font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-balance leading-[1.1] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Diseño que transforma
            <br />
            <span className="italic font-light">espacios comerciales</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Creamos ambientes únicos para spas, salones de belleza y restaurantes. Cada proyecto refleja la esencia de
            tu marca.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button size="lg" className="group" asChild>
              <a href="#contacto">
                INICIAR PROYECTO
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#portafolio">VER PORTAFOLIO</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

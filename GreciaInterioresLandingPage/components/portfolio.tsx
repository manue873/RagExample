"use client"

import { useState, useRef } from "react"
import { useScrollAnimation } from "@/lib/use-scroll-animation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const projects = [
  {
    id: 1,
    name: "PODOSALUD",
    category: "PODOLOGÍA",
    location: "CAJAMARCA",
    area: "20 MT2",
    image: "/images/projects/podosalud.png",
  },
  {
    id: 2,
    name: "3C ESTÉTICA",
    category: "CONSULTORIO ODONTOLÓGICO",
    location: "LOS OLIVOS",
    area: "100 MT2",
    image: "/images/projects/3c-estetica.png",
  },
  {
    id: 3,
    name: "CAFETERÍA DCELESTE",
    category: "CAFETERÍA",
    location: "RIMAC",
    area: "40 MT2",
    image: "/images/projects/cafeteria-dceleste.png",
  },
  {
    id: 4,
    name: "ESTÉTICA SER",
    category: "ESTÉTICA",
    location: "PUENTE PIEDRA - LIMA",
    area: "70 MT2",
    image: "/images/projects/estetica-ser.png",
  },
]

export function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const { ref, isVisible } = useScrollAnimation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -500, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 500, behavior: "smooth" })
    }
  }

  return (
    <section id="portafolio" className="py-20 px-4 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-muted-foreground mb-4">NUESTRO TRABAJO</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance">
            Proyectos que
            <br />
            <span className="italic font-light">inspiran</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
        >
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              onClick={scrollLeft}
              aria-label="Ver proyectos anteriores"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg"
              onClick={scrollRight}
              aria-label="Ver proyectos siguientes"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[32vw] aspect-[4/5] rounded-lg overflow-hidden snap-start group cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-full h-full"> {/* Contenedor para que fill funcione */}
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill // Hace que la imagen ocupe todo el espacio del padre
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 32vw" // Ayuda a Next a elegir el tamaño real
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 2} // Carga más rápido las primeras dos imágenes
                    />
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent transition-opacity duration-500 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                      <p className="text-xs tracking-widest mb-2 text-background/80">PROYECTO</p>
                      <h3 className="font-serif text-2xl md:text-3xl mb-6">{project.name}</h3>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between border-b border-background/20 pb-2">
                          <span className="text-background/80">CATEGORÍA</span>
                          <span className="font-medium text-right">{project.category}</span>
                        </div>
                        <div className="flex justify-between border-b border-background/20 pb-2">
                          <span className="text-background/80">UBICACIÓN</span>
                          <span className="font-medium text-right">{project.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-background/80">METRAJE</span>
                          <span className="font-medium">{project.area}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          <span className="md:hidden">Desliza para ver más proyectos →</span>
          <span className="hidden md:inline">Usa las flechas para navegar entre proyectos</span>
        </p>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

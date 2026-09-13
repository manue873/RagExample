"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "@/lib/use-scroll-animation"

const virtualProcess = [
  {
    number: "01",
    title: "Reunión briefing",
    description:
      "Conocemos tus necesidades, gustos y medidas del espacio mediante reunión virtual. Definimos el alcance del proyecto.",
  },
  {
    number: "02",
    title: "Primera propuesta",
    description: "Presentamos el diseño inicial con planos 2D, vistas 3D y selección de materiales y acabados.",
  },
  {
    number: "03",
    title: "Revisión y ajustes",
    description:
      "Realizamos cambios según tus sugerencias mediante reunión virtual. Refinamos cada detalle del diseño.",
  },
  {
    number: "04",
    title: "Entrega final",
    description:
      "5 días hábiles después de aprobar el diseño. Recibirás link de Drive con planos, vistas renderizadas y video recorrido.",
  },
]

const presencialProcess = [
  {
    number: "01",
    title: "Levantamiento de medidas",
    description:
      "Iremos al lugar presencialmente para poder medir el espacio a detalle y conversar sobre las necesidades y gustos para plasmarlo en el diseño.",
  },
  {
    number: "02",
    title: "Primera reunión",
    description:
      "Pasados 7 días hábiles del levantamiento de medidas. Mediante una reunión virtual revisaremos la primera propuesta de diseño para sugerencias o cambios.",
  },
  {
    number: "03",
    title: "Segunda reunión",
    description:
      "Pasados unos días de la primera reunión. Revisaremos mediante una reunión virtual los cambios y sugerencias de la primera propuesta de diseño.",
  },
  {
    number: "04",
    title: "Tercera reunión",
    description:
      "Última reunión opcional para definir últimos cambios para la entrega final del PDF con todos los entregables.",
  },
  {
    number: "05",
    title: "Entrega final",
    description:
      "5 días hábiles después de haber aprobado el diseño. Les enviaremos un link de drive con los archivos PDF con todos los planos, vistas renderizadas y video recorrido del mueble.",
  },
]

export function Process() {
  const [activeTab, setActiveTab] = useState("virtual")
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="proceso" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-muted-foreground mb-4">METODOLOGÍA</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance">
            Nuestro
            <br />
            <span className="italic font-light">proceso</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 h-12 p-1">
              <TabsTrigger value="virtual" className="font-serif text-lg h-full">
                Virtual
              </TabsTrigger>
              <TabsTrigger value="presencial" className="font-serif text-lg h-full">
                Presencial
              </TabsTrigger>
            </TabsList>

            <TabsContent value="virtual" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                {virtualProcess.map((step, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-background border-border hover:shadow-lg transition-all"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <span className="font-serif text-4xl text-muted-foreground/30">{step.number}</span>
                      </div>
                      <div className="space-y-2 pt-1">
                        <h3 className="font-serif text-xl">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12 p-8 bg-secondary/30 rounded-lg">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="font-serif text-4xl mb-2">2-3</p>
                    <p className="text-sm text-muted-foreground tracking-wide">SEMANAS DE DURACIÓN</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl mb-2">3</p>
                    <p className="text-sm text-muted-foreground tracking-wide">REUNIONES VIRTUALES</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl mb-2">100%</p>
                    <p className="text-sm text-muted-foreground tracking-wide">REMOTO</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="presencial" className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {presencialProcess.map((step, index) => (
                  <Card
                    key={index}
                    className={`p-6 bg-background border-border hover:shadow-lg transition-all ${
                      index === presencialProcess.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <span className="font-serif text-4xl text-muted-foreground/30">{step.number}</span>
                      </div>
                      <div className="space-y-2 pt-1">
                        <h3 className="font-serif text-xl">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-12 p-8 bg-secondary/30 rounded-lg">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="font-serif text-4xl mb-2">3-4</p>
                    <p className="text-sm text-muted-foreground tracking-wide">SEMANAS DE DURACIÓN</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl mb-2">1</p>
                    <p className="text-sm text-muted-foreground tracking-wide">VISITA PRESENCIAL</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl mb-2">2-3</p>
                    <p className="text-sm text-muted-foreground tracking-wide">REUNIONES VIRTUALES</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

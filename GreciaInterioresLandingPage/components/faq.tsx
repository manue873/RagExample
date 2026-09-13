"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollAnimation } from "@/lib/use-scroll-animation"
import Link from "next/link"

const faqs = [
  {
    question: "¿Cuántas rondas de cambios o revisiones incluyen los renders 3D?",
    answer:
      "Todos nuestros paquetes de diseño incluyen exactamente dos (2) rondas de revisiones menores en la etapa de visualización 3D. Esto permite ajustar paletas de color, texturas de tapicería, acabados de carpintería o luminarias. Cualquier modificación que implique un cambio estructural en tabiques o replanteo de concepto tras la aprobación de planos 2D se cotiza como addenda independiente.",
  },
  {
    question: "¿Cómo funciona el servicio si mi local o negocio está fuera de Lima o en el extranjero (México, Colombia, etc.)?",
    answer:
      "Contamos con una metodología 100% virtual consolidada. Te facilitamos una guía para el levantamiento de medidas fotográfico/video, realizamos reuniones de coordinación mediante Google Meet y en el Dossier de Compras investigamos y enlazamos materiales y mobiliario disponibles con proveedores comerciales locales en tu ciudad y en tu moneda.",
  },
  {
    question: "¿Cuánto tiempo demora en desarrollarse el proyecto de diseño completo?",
    answer:
      "Para un paquete de Concepto y Renders 3D, el tiempo estimado es de 2 a 3 semanas laborables. Para un Expediente Ejecutivo Completo con planos técnicos de obra, carpintería y compras (locales de 30 a 100 m²), el plazo estándar es de 4 a 6 semanas laborables.",
  },
  {
    question: "¿Grecia Interiores realiza la ejecución de obra o remodelación física?",
    answer:
      "En Lima Metropolitana ofrecemos el servicio integral 'Diseño y Construcción Llave en Mano' (Turnkey), coordinando contratistas y supervisión técnica. Si ya cuentas con tu propio equipo de constructores o estás en provincias/extranjero, te entregamos el expediente técnico detallado listo para cotizar y construir, ofreciendo además supervisión estética remota o presencial.",
  },
  {
    question: "¿El expediente de diseño incluye trámites de licencias municipales?",
    answer:
      "El expediente incluye planos arquitectónicos técnicos de distribución, seguridad y evacuación normativos. El pago de tasas ediles y la gestión particular de firmas colegiadas de especialidades ante cada municipalidad distrital corresponde al cliente o a su gestor municipal, salvo contratación adicional de dicho trámite.",
  },
  {
    question: "¿Cuál es el esquema de pagos habitual?",
    answer:
      "Se estructura en 3 hitos transparentes: 50% de anticipo para inicio de levantamiento y concepto, 30% a la presentación de la propuesta visual 3D para revisiones, y 20% contra entrega final de la carpeta ejecutiva digital. Emitimos Factura o Boleta electrónica formal (RUC: 20609876543).",
  },
]

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="faq" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-sm tracking-widest text-muted-foreground mb-4">RESOLVEMOS TUS DUDAS</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-balance">
            Preguntas
            <br />
            <span className="italic font-light">frecuentes</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-4 max-w-xl mx-auto">
            Claridad, transparencia y rigor profesional en cada etapa de tu proyecto comercial.
          </p>
        </div>

        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left font-serif text-base md:text-lg hover:text-primary transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-8 text-center text-xs text-muted-foreground">
            ¿Tienes alguna consulta legal o contractual específica? Revisa nuestros{" "}
            <Link href="/terminos-y-condiciones" className="text-primary underline">
              Términos y Condiciones
            </Link>{" "}
            o escríbenos directamente a{" "}
            <a href="mailto:legal@greciainteriores.pe" className="text-primary underline">
              legal@greciainteriores.pe
            </a>
            .
          </div>
        </div>
      </div>
    </section>
  )
}

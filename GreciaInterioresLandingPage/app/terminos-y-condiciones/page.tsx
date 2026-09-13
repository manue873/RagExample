import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft, ShieldCheck, FileText, Scale } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones | Grecia Interiores S.A.C.",
  description:
    "Términos y condiciones de contratación de servicios profesionales de diseño de interiores, visualización 3D y consultoría de Grecia Interiores S.A.C.",
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Header />
      
      <section className="pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb / Back button */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver al Inicio
            </Link>

            <Button variant="outline" size="sm" asChild>
              <a
                href="/docs/terminos_y_condiciones_grecia_interiores.pdf"
                download="Terminos_y_Condiciones_Grecia_Interiores.pdf"
                className="inline-flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Descargar PDF Oficial
              </a>
            </Button>
          </div>

          {/* Header Card */}
          <div className="border border-border bg-secondary/20 rounded-2xl p-8 md:p-10 mb-12">
            <div className="flex items-center gap-3 text-primary mb-3">
              <Scale className="h-6 w-6" />
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                Marco Contractual y Legal
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">
              Términos y Condiciones de Servicios
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong>GRECIA INTERIORES S.A.C.</strong> | RUC: 20609876543 | Domicilio: Av. Mariscal La Mar 1234, Of. 401, Miraflores, Lima - Perú.
              <br />
              Última actualización: Septiembre 2026.
            </p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-foreground/90 leading-relaxed text-sm md:text-base">
            
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                1. Objeto y Ámbito de Aplicación
              </h2>
              <p>
                El presente instrumento establece las condiciones generales que rigen la prestación de servicios de arquitectura de interiores, diseño conceptual comercial y residencial, visualización fotorrealista 3D (renders), especificaciones técnicas de mobiliario y consultoría ofrecidos por <strong>GRECIA INTERIORES S.A.C.</strong> (en adelante, &ldquo;EL ESTUDIO&rdquo;), bajo la dirección de la <strong>Arq. Grecia Calle</strong>, a favor de sus clientes.
              </p>
              <p>
                La aceptación de nuestras propuestas comerciales, cotizaciones o el inicio formal de los servicios implica la adhesión incondicional a los presentes términos.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                2. Política de Revisiones en Renders (Cláusula Estricta de 2 Rondas)
              </h2>
              <p>
                Para garantizar la excelencia estética y la viabilidad del cronograma pactado, todo proyecto incluye de manera transparente:
              </p>
              <div className="p-4 rounded-xl bg-secondary/30 border border-border space-y-2">
                <p className="font-medium text-foreground">
                  ✓ Se incluyen exactamente dos (2) rondas de revisiones menores en la etapa de Renders 3D.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
                  <li><strong>Alcance de revisión menor:</strong> Modificaciones en tonos cromáticos, texturas de tapicería o muros, acabados de carpintería y sustitución de elementos decorativos de catálogo.</li>
                  <li><strong>Modificaciones mayores no incluidas:</strong> Replanteo de muros validados en la fase 2D, ampliación o reducción del área a intervenir, o cambio integral del estilo rector acordado en el briefing inicial. Estas requerirán una adenda de costo y ampliación de plazo.</li>
                  <li>A partir de la tercera (3ª) ronda de revisión, se aplicará el costo por render o tarifa de hora técnica vigente.</li>
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                3. Modalidad Presencial y Virtual Internacional
              </h2>
              <p>
                EL ESTUDIO atiende proyectos bajo dos metodologías:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Presencial (Lima Metropolitana y Provincias):</strong> Incluye levantamiento arquitectónico en sitio con distanciómetro láser y muestra física de acabados.
                </li>
                <li>
                  <strong>100% Virtual (México, Colombia, Chile y toda Latinoamérica):</strong> Desarrollo remoto asistido mediante planos o croquis proporcionados por el cliente, sesiones de avance por Google Meet y Dossier de Compras con hipervínculos a tiendas y proveedores del país donde se ubica la obra.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                4. Estructura de Pagos y Facturación
              </h2>
              <p>
                Salvo acuerdo específico plasmado en el contrato de locación de servicios, los honorarios profesionales se devengan según el esquema de 3 hitos:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>50% de Anticipo:</strong> A la firma del contrato y previo al inicio del levantamiento y conceptualización.</li>
                <li><strong>30% de Hito Intermedio:</strong> A la presentación de la propuesta visual 3D para el inicio de las rondas de revisión.</li>
                <li><strong>20% Liquidación Final:</strong> Previo a la entrega de la carpeta ejecutiva digital (planos constructivos acotados, renders definitivos 4K y cuadro de especificaciones).</li>
              </ol>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                5. Propiedad Intelectual (D.L. N° 822)
              </h2>
              <p>
                De conformidad con la legislación sobre el Derecho de Autor en el Perú (Decreto Legislativo N° 822 y Decisión 351 de la Comunidad Andina), todos los planos, memorias descriptivas, croquis, esquemas, modelos 3D y renders son creaciones intelectuales exclusivas de <strong>GRECIA INTERIORES S.A.C.</strong> y de la <strong>Arq. Grecia Calle</strong>.
              </p>
              <p>
                El cliente adquiere una licencia de uso personal, no exclusiva e intransferible, para materializar la obra únicamente en el predio contratado. Queda estrictamente prohibida la comercialización, cesión a terceros o réplica del diseño para modelos de franquicia sin acuerdo previo y formal.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                6. Delimitación de Responsabilidades de Obra Civil y Licencias
              </h2>
              <p>
                Los planos emitidos por EL ESTUDIO son de carácter arquitectónico e interiorista. La ejecución material de obras de albañilería, estructuras o instalaciones complejas es responsabilidad exclusiva de los contratistas de obra designados por el cliente, salvo cuando se contrate expresamente el servicio &ldquo;Llave en Mano&rdquo;.
              </p>
              <p>
                Asimismo, las tasas administrativas y trámites para la obtención de licencias de obra o funcionamiento municipal corresponden a la gestión particular del cliente ante el municipio respectivo.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                7. Libro de Reclamaciones y Solución de Controversias
              </h2>
              <p>
                En cumplimiento del Código de Protección y Defensa del Consumidor (Ley N° 29571), ponemos a disposición de nuestros clientes nuestro <Link href="/libro-de-reclamaciones" className="text-primary underline">Libro de Reclamaciones Virtual</Link>. Cualquier controversia se resolverá preferentemente mediante trato directo o ante los tribunales competentes de la ciudad de Lima, Perú.
              </p>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 GRECIA INTERIORES S.A.C. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link href="/politica-de-privacidad" className="hover:text-foreground underline">Política de Privacidad</Link>
              <Link href="/libro-de-reclamaciones" className="hover:text-foreground underline">Libro de Reclamaciones</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

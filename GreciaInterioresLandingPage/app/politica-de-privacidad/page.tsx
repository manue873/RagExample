import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Shield, Lock, Eye, RefreshCw, XCircle } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad y Protección de Datos | Grecia Interiores S.A.C.",
  description:
    "Política de Privacidad conforme a la Ley N° 29733 de Protección de Datos Personales del Perú de Grecia Interiores S.A.C.",
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <section className="pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Volver al Inicio
            </Link>
          </div>

          {/* Header Card */}
          <div className="border border-border bg-secondary/20 rounded-2xl p-8 md:p-10 mb-12">
            <div className="flex items-center gap-3 text-primary mb-3">
              <Shield className="h-6 w-6" />
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                Ley N° 29733 - República del Perú
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl tracking-tight mb-4">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              <strong>GRECIA INTERIORES S.A.C.</strong> | RUC: 20609876543 | Domicilio: Av. Mariscal La Mar 1234, Of. 401, Miraflores, Lima - Perú.
              <br />
              Canal de atención de privacidad: <strong>legal@greciainteriores.pe</strong>
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10 text-foreground/90 leading-relaxed text-sm md:text-base">
            
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                1. Compromiso de Protección de Datos
              </h2>
              <p>
                En <strong>GRECIA INTERIORES S.A.C.</strong> (en adelante, &ldquo;EL ESTUDIO&rdquo;), valoramos y protegemos la privacidad de nuestros usuarios y clientes. Esta política informa con total transparencia cómo recopilamos, utilizamos, almacenamos y resguardamos sus datos personales, en estricto cumplimiento de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de Perú)</strong> y su Reglamento aprobado por <strong>Decreto Supremo N° 003-2013-JUS</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                2. Banco de Datos Personales
              </h2>
              <p>
                La información personal que usted nos facilita mediante nuestro formulario de contacto, botón de WhatsApp, correo electrónico o llamadas telefónicas se incorpora a nuestro banco de datos denominado <strong>&ldquo;Prospectos y Clientes Comerciales&rdquo;</strong>, de titularidad exclusiva de GRECIA INTERIORES S.A.C.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                3. Datos que Recopilamos y Finalidad
              </h2>
              <p>
                Únicamente solicitamos datos adecuados y no excesivos en relación con el servicio de diseño de interiores:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Datos de contacto:</strong> Nombres, apellidos, número de teléfono/WhatsApp, correo electrónico y ciudad.</li>
                <li><strong>Información del proyecto:</strong> Tipología del local (spa, estética, consultorio, restaurante, vivienda), metraje aproximado y estilo deseado.</li>
              </ul>
              <p>
                <strong>Finalidades exclusivas:</strong>
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Responder consultas y coordinar reuniones de diagnóstico preliminar o visitas técnicas.</li>
                <li>Elaborar y remitir propuestas técnico-económicas personalizadas.</li>
                <li>Gestión contractual, facturación ante la SUNAT y seguimiento post-entrega.</li>
                <li>Envío de novedades o artículos de inspiración (con opción de darse de baja inmediata).</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">
                4. Ejercicio de los Derechos ARCO
              </h2>
              <p>
                Como titular de sus datos personales, usted puede ejercer en cualquier momento los derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> reconocidos por la ley:
              </p>

              <div className="grid sm:grid-cols-2 gap-4 not-prose">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="flex items-center gap-2 font-medium mb-1 text-foreground">
                    <Eye className="h-4 w-4 text-primary" /> Acceso
                  </div>
                  <p className="text-xs text-muted-foreground">Conocer qué datos personales tratamos y los detalles de su almacenamiento.</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="flex items-center gap-2 font-medium mb-1 text-foreground">
                    <RefreshCw className="h-4 w-4 text-primary" /> Rectificación
                  </div>
                  <p className="text-xs text-muted-foreground">Actualizar o corregir información inexacta o desactualizada.</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="flex items-center gap-2 font-medium mb-1 text-foreground">
                    <XCircle className="h-4 w-4 text-primary" /> Cancelación
                  </div>
                  <p className="text-xs text-muted-foreground">Solicitar la supresión de sus datos cuando ya no sean requeridos.</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="flex items-center gap-2 font-medium mb-1 text-foreground">
                    <Shield className="h-4 w-4 text-primary" /> Oposición
                  </div>
                  <p className="text-xs text-muted-foreground">Oponerse al tratamiento de sus datos para fines comerciales o promocionales.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border mt-4 text-sm">
                <p>
                  <strong>Para ejercer sus derechos:</strong> Remita una solicitud por escrito al correo electrónico <strong>legal@greciainteriores.pe</strong> con el asunto <em>&ldquo;Derechos ARCO - [Su Nombre]&rdquo;</em> indicando el derecho que desea ejercer y adjuntando una copia simple de su documento de identidad para verificar la titularidad. Responderemos en los plazos máximos señalados por ley.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-foreground">
                5. Seguridad de la Información
              </h2>
              <p>
                EL ESTUDIO implementa medidas técnicas, organizativas y legales para evitar la alteración, pérdida, tratamiento o acceso no autorizado a los datos personales. Nunca vendemos ni compartimos sus datos con terceras empresas con fines comerciales o de publicidad masiva.
              </p>
            </section>

          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 GRECIA INTERIORES S.A.C. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link href="/terminos-y-condiciones" className="hover:text-foreground underline">Términos y Condiciones</Link>
              <Link href="/libro-de-reclamaciones" className="hover:text-foreground underline">Libro de Reclamaciones</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

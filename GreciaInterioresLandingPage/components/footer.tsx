"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen, FileText, Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3">
            <Link href="/">
              <Image
                src="/images/logogrecia.png"
                alt="Grecia Interiores"
                width={160}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              <strong>GRECIA INTERIORES S.A.C.</strong> | RUC: 20609876543
              <br />
              Arquitectura e interiorismo comercial y residencial de alta gama.
              <br />
              Av. Mariscal La Mar 1234, Of. 401, Miraflores, Lima - Perú.
            </p>
          </div>

          {/* Navigation & Legal Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 text-sm">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-foreground font-semibold">Navegación</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/#servicios" className="hover:text-foreground transition-colors">Servicios</Link></li>
                <li><Link href="/#proceso" className="hover:text-foreground transition-colors">Proceso</Link></li>
                <li><Link href="/#portafolio" className="hover:text-foreground transition-colors">Portafolio</Link></li>
                <li><Link href="/#faq" className="hover:text-foreground transition-colors">Preguntas Frecuentes</Link></li>
                <li><Link href="/#contacto" className="hover:text-foreground transition-colors">Contacto</Link></li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-foreground font-semibold">Legal & Compliance</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <Link href="/terminos-y-condiciones" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/politica-de-privacidad" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-primary" />
                    Política de Privacidad (Ley 29733)
                  </Link>
                </li>
                <li className="pt-2">
                  <Link
                    href="/libro-de-reclamaciones"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/80 hover:bg-secondary text-xs text-foreground font-medium transition-colors shadow-sm"
                  >
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span>Libro de Reclamaciones Virtual</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} GRECIA INTERIORES S.A.C. Todos los derechos reservados.</p>
          <p>Diseño y Arquitectura conforme a la legislación de Indecopi y Ley N° 29733.</p>
        </div>
      </div>
    </footer>
  )
}

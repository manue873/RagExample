"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, CheckCircle2, AlertCircle, Printer } from "lucide-react"
import Link from "next/link"

export default function LibroReclamacionesPage() {
  const [submitted, setSubmitted] = useState(false)
  const [claimCode, setClaimCode] = useState("")
  const [formData, setFormData] = useState({
    // Consumidor
    nombre: "",
    tipoDoc: "DNI",
    numDoc: "",
    telefono: "",
    email: "",
    domicilio: "",
    // Bien/Servicio
    tipoBien: "Servicio",
    monto: "",
    descripcionBien: "",
    // Reclamación
    tipoReclamo: "Reclamo", // "Reclamo" | "Queja"
    detalle: "",
    pedido: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generar correlativo ficticio con año
    const code = `REC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
    setClaimCode(code)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <section className="pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
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
          <div className="border border-border bg-secondary/20 rounded-2xl p-6 md:p-8 mb-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 text-primary mb-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                Indecopi - Ley N° 29571 / D.S. 011-2011-PCM
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-2">
              Libro de Reclamaciones Virtual
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              <strong>Razón Social:</strong> GRECIA INTERIORES S.A.C. | <strong>RUC:</strong> 20609876543
              <br />
              <strong>Dirección:</strong> Av. Mariscal La Mar 1234, Of. 401, Miraflores, Lima - Perú
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Información Legal previa */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground space-y-2">
                <p>
                  <strong>* RECLAMO:</strong> Disconformidad relacionada a los bienes o servicios brindados por el estudio.
                </p>
                <p>
                  <strong>* QUEJA:</strong> Malestar o descontento respecto a la atención al público o canales de comunicación.
                </p>
                <p>
                  Conforme a la Ley N° 31435, la empresa dará respuesta formal a su reclamo o queja en un plazo no mayor a <strong>quince (15) días hábiles</strong> improrrogables a la dirección de correo electrónico consignada.
                </p>
              </div>

              {/* 1. Datos del Consumidor */}
              <Card className="p-6 border-border space-y-4">
                <h2 className="font-serif text-lg text-foreground border-b border-border pb-2">
                  1. Identificación del Consumidor Reclamante
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Nombres y Apellidos / Razón Social *
                    </label>
                    <input
                      required
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Juan Pérez García"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Tipo de Documento *
                    </label>
                    <select
                      name="tipoDoc"
                      value={formData.tipoDoc}
                      onChange={handleChange}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="DNI">D.N.I.</option>
                      <option value="CE">Carné de Extranjería</option>
                      <option value="RUC">R.U.C.</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Número de Documento *
                    </label>
                    <input
                      required
                      type="text"
                      name="numDoc"
                      value={formData.numDoc}
                      onChange={handleChange}
                      placeholder="Ej. 45892310"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Teléfono / Celular *
                    </label>
                    <input
                      required
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Correo Electrónico (donde recibirá respuesta) *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Domicilio (Calle / Av., Distrito, Ciudad) *
                    </label>
                    <input
                      required
                      type="text"
                      name="domicilio"
                      value={formData.domicilio}
                      onChange={handleChange}
                      placeholder="Ej. Av. Larco 450 Dpto 301, Miraflores, Lima"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* 2. Identificación del Bien Contratado */}
              <Card className="p-6 border-border space-y-4">
                <h2 className="font-serif text-lg text-foreground border-b border-border pb-2">
                  2. Identificación del Bien o Servicio Contratado
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Tipo de Contratación *
                    </label>
                    <select
                      name="tipoBien"
                      value={formData.tipoBien}
                      onChange={handleChange}
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="Servicio">Servicio de Diseño de Interiores / Renders</option>
                      <option value="Producto">Mobiliario / Adquisición Decorativa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Monto Reclamado (S/ o USD)
                    </label>
                    <input
                      type="text"
                      name="monto"
                      value={formData.monto}
                      onChange={handleChange}
                      placeholder="Ej. S/ 2,500.00 (Opcional)"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-foreground mb-1">
                      Descripción del Servicio o Proyecto *
                    </label>
                    <input
                      required
                      type="text"
                      name="descripcionBien"
                      value={formData.descripcionBien}
                      onChange={handleChange}
                      placeholder="Ej. Diseño interior para cafetería comercial de 40m2"
                      className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </Card>

              {/* 3. Detalle de la Reclamación */}
              <Card className="p-6 border-border space-y-4">
                <h2 className="font-serif text-lg text-foreground border-b border-border pb-2">
                  3. Detalle de la Reclamación y Pedido
                </h2>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-2">
                    Tipo de Registro *
                  </label>
                  <div className="flex gap-6 text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipoReclamo"
                        value="Reclamo"
                        checked={formData.tipoReclamo === "Reclamo"}
                        onChange={handleChange}
                        className="text-primary focus:ring-primary"
                      />
                      <span><strong>Reclamo</strong> (Disconformidad con el servicio)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipoReclamo"
                        value="Queja"
                        checked={formData.tipoReclamo === "Queja"}
                        onChange={handleChange}
                        className="text-primary focus:ring-primary"
                      />
                      <span><strong>Queja</strong> (Disconformidad con la atención)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Detalle de los Hechos *
                  </label>
                  <textarea
                    required
                    rows={4}
                    name="detalle"
                    value={formData.detalle}
                    onChange={handleChange}
                    placeholder="Describa de forma clara y cronológica los hechos ocurridos..."
                    className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1">
                    Pedido Concreto del Consumidor *
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="pedido"
                    value={formData.pedido}
                    onChange={handleChange}
                    placeholder="Especifique qué solución o respuesta solicita a EL ESTUDIO..."
                    className="w-full text-sm px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </Card>

              {/* Botón Envío */}
              <div className="text-center pt-2">
                <Button type="submit" size="lg" className="w-full sm:w-auto px-10">
                  ENVIAR HOJA DE RECLAMACIÓN
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Al enviar este formulario declara bajo juramento que los datos consignados son verdaderos.
                </p>
              </div>
            </form>
          ) : (
            /* Vista de Confirmación con Hoja de Reclamación */
            <Card className="p-8 border-border bg-card shadow-lg space-y-6">
              <div className="text-center space-y-3 pb-6 border-b border-border">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-2">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  Reclamación Registrada con Éxito
                </h2>
                <p className="text-sm text-muted-foreground">
                  Hemos generado su constancia de registro oficial. Se ha remitido una copia a su correo: <strong>{formData.email}</strong>.
                </p>
                <div className="inline-block px-4 py-2 bg-secondary/50 rounded-lg text-foreground font-mono text-base font-bold tracking-wider">
                  N° DE HOJA: {claimCode}
                </div>
              </div>

              {/* Resumen del registro */}
              <div className="text-xs md:text-sm space-y-3 text-foreground/90">
                <div className="grid grid-cols-2 py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Fecha y Hora de Envío:</span>
                  <span className="font-medium">{new Date().toLocaleString("es-PE")}</span>
                </div>
                <div className="grid grid-cols-2 py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Tipo de Solicitud:</span>
                  <span className="font-medium font-bold uppercase">{formData.tipoReclamo}</span>
                </div>
                <div className="grid grid-cols-2 py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Consumidor:</span>
                  <span className="font-medium">{formData.nombre} ({formData.tipoDoc}: {formData.numDoc})</span>
                </div>
                <div className="grid grid-cols-2 py-1 border-b border-border/50">
                  <span className="text-muted-foreground">Servicio Contratado:</span>
                  <span className="font-medium">{formData.descripcionBien}</span>
                </div>
                <div className="py-2 border-b border-border/50">
                  <span className="text-muted-foreground block mb-1">Detalle del Reclamo/Queja:</span>
                  <p className="bg-secondary/20 p-3 rounded-lg text-xs leading-relaxed">{formData.detalle}</p>
                </div>
                <div className="py-2">
                  <span className="text-muted-foreground block mb-1">Pedido del Consumidor:</span>
                  <p className="bg-secondary/20 p-3 rounded-lg text-xs leading-relaxed">{formData.pedido}</p>
                </div>
              </div>

              {/* Plazo Legal */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground flex gap-3 items-start">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Plazo legal de respuesta:</strong> Conforme al Código de Protección y Defensa del Consumidor, <strong>GRECIA INTERIORES S.A.C.</strong> emitirá un pronunciamiento fundado en un plazo no mayor a 15 días hábiles a través de correo electrónico formal.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button variant="outline" onClick={() => window.print()} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Imprimir / Guardar en PDF
                </Button>
                <Button asChild>
                  <Link href="/">Volver a la Página Principal</Link>
                </Button>
              </div>
            </Card>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}

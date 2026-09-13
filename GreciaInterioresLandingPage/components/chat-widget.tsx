"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  X,
  Send,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Clock,
} from "lucide-react"

interface ActionButton {
  id: string
  label: string
  url: string
  type: "whatsapp" | "internal" | "email"
}

interface Message {
  id: string
  sender: "user" | "bot"
  text: string
  buttons?: ActionButton[]
  sources?: string[]
  isStreaming?: boolean
  isRateLimit?: boolean
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "¡Hola! Soy Grecia IA, asistente del estudio de arquitectura de la Arq. Grecia Calle. Consulto directamente la base de conocimiento oficial de la firma. ¿En qué te puedo asesorar hoy?",
      buttons: [
        {
          id: "btn-cotizar",
          label: "📲 ¿Cómo cotizar un proyecto?",
          url: "https://wa.me/51941397531?text=Hola,%20quisiera%20cotizar%20un%20proyecto",
          type: "whatsapp",
        },
        {
          id: "btn-renders",
          label: "📜 ¿Rondas de cambios en renders?",
          url: "/terminos-y-condiciones",
          type: "internal",
        },
        {
          id: "btn-portafolio",
          label: "📸 Ver Portafolio",
          url: "/#portafolio",
          type: "internal",
        },
      ],
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Enfocar automáticamente el input al abrir el chat
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Re-enfocar el input cuando el asistente termina de escribir
  useEffect(() => {
    if (!loading && isOpen) {
      inputRef.current?.focus()
    }
  }, [loading, isOpen])

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim()
    if (!q || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: q,
    }

    const botMsgId = (Date.now() + 1).toString()
    const botPlaceholder: Message = {
      id: botMsgId,
      sender: "bot",
      text: "",
      isStreaming: true,
    }

    // Insertar mensaje del usuario y mensaje bot listo para escribir
    setMessages((prev) => [...prev, userMsg, botPlaceholder])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const isLimit = res.status === 429 || errorData.isRateLimit

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? {
                ...msg,
                text: isLimit
                  ? "⏱️ Has alcanzado el límite de consultas permitidas por minuto para este servicio. Por favor, espera un momento antes de formular otra pregunta.\n\nPara asesoría inmediata o proyectos urgentes, puedes escribirnos directamente a WhatsApp:"
                  : (errorData.error || "⚠️ No se pudo obtener respuesta del servidor."),
                isStreaming: false,
                isRateLimit: isLimit,
                buttons: [
                  {
                    id: isLimit ? "wa-ratelimit-btn" : "wa-fallback",
                    label: isLimit
                      ? "📲 Continuar consulta por WhatsApp (+51 941 397 531)"
                      : "📲 Contactar por WhatsApp (+51 941 397 531)",
                    url: "https://wa.me/51941397531?text=Hola,%20quisiera%20asesor%C3%ADa%20personalizada%20para%20un%20proyecto",
                    type: "whatsapp",
                  },
                ],
              }
              : msg
          )
        )
        return
      }

      // Leer el flujo de Server-Sent Events (SSE) token a token
      if (!res.body) {
        throw new Error("No response stream")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder("utf-8")
      let buffer = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split("\n\n")
        buffer = events.pop() || ""

        for (const evt of events) {
          const trimmed = evt.trim()
          if (!trimmed.startsWith("data:")) continue

          const jsonStr = trimmed.replace(/^data:\s*/, "")
          try {
            const data = JSON.parse(jsonStr)

            if (data.type === "init") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMsgId
                    ? {
                      ...msg,
                      sources: data.sources,
                      buttons: data.buttons,
                    }
                    : msg
                )
              )
            } else if (data.type === "token") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMsgId
                    ? {
                      ...msg,
                      text: msg.text + data.token,
                    }
                    : msg
                )
              )
            } else if (data.type === "done") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMsgId
                    ? {
                      ...msg,
                      isStreaming: false,
                    }
                    : msg
                )
              )
            }
          } catch (err) {
            console.error("Error al parsear SSE:", err)
          }
        }
      }

      // Asegurar que el estado de streaming se apague al completar la lectura
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
        )
      )
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? {
              ...msg,
              text:
                msg.text ||
                "⚠️ Error de conexión: No se pudo comunicar con el servidor.",
              isStreaming: false,
            }
            : msg
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón Flotante para Abrir */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-primary text-primary-foreground shadow-2xl hover:opacity-95 hover:scale-105 transition-all duration-300 group"
          aria-label="Abrir asistente de diseño"
        >
          <div className="relative">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          </div>
          <span className="font-serif text-sm tracking-wide font-medium">
            Grecia IA • Asistente Virtual
          </span>
        </button>
      )}

      {/* Ventana Modal de Chat */}
      {isOpen && (
        <Card className="w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] flex flex-col shadow-2xl border-border bg-background/95 backdrop-blur-xl overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header del Chat */}
          <div className="p-4 border-b border-border bg-secondary/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-foreground leading-none">
                  Grecia Interiores S.A.C.
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block"></span>
                  Asistente en Vivo
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs md:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : msg.isRateLimit
                      ? "bg-amber-500/10 text-foreground border border-amber-500/40 rounded-bl-none whitespace-pre-wrap shadow-sm"
                      : "bg-secondary/40 text-foreground border border-border/70 rounded-bl-none whitespace-pre-wrap"
                    }`}
                >
                  {/* Badge de Rate Limit */}
                  {msg.isRateLimit && (
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-amber-500/20 text-[11px] font-medium text-amber-700 dark:text-amber-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Límite de frecuencia temporal</span>
                    </div>
                  )}

                  {/* Si está esperando el primer token */}
                  {msg.isStreaming && !msg.text ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce"></span>
                      <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  ) : (
                    <p>
                      {msg.text}
                      {msg.isStreaming && (
                        <span className="inline-block w-1.5 h-3.5 bg-primary/80 animate-pulse ml-0.5 align-middle rounded-sm" />
                      )}
                    </p>
                  )}


                </div>

                {/* BOTONES CONTEXTUALES */}
                {msg.buttons && msg.buttons.length > 0 && !msg.isStreaming && (
                  <div className="mt-2.5 flex flex-col gap-1.5 w-full max-w-[90%] animate-in fade-in duration-300">
                    {msg.buttons.map((btn) => (
                      <a
                        key={btn.id}
                        href={btn.url}
                        target={
                          btn.type === "whatsapp" || btn.type === "email"
                            ? "_blank"
                            : "_self"
                        }
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium transition-all shadow-sm ${btn.type === "whatsapp"
                          ? "bg-[#25D366] hover:bg-[#20ba59] text-white"
                          : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                          }`}
                      >
                        <span className="truncate">{btn.label}</span>
                        {btn.type === "whatsapp" || btn.type === "email" ? (
                          <ExternalLink className="h-3 w-3 flex-shrink-0 ml-2" />
                        ) : (
                          <ArrowRight className="h-3 w-3 flex-shrink-0 ml-2" />
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Preguntas Rápidas */}
          <div className="px-4 py-2 border-t border-border/50 bg-secondary/20 flex gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => handleSend("¿Cómo cotizo un proyecto?")}
              disabled={loading}
              className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-secondary whitespace-nowrap transition-colors disabled:opacity-50"
            >
              💰 Cotizar
            </button>
            <button
              onClick={() => handleSend("¿Cuántos cambios en renders 3D tengo derecho?")}
              disabled={loading}
              className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-secondary whitespace-nowrap transition-colors disabled:opacity-50"
            >
              🎨 Rondas de renders
            </button>
            <button
              onClick={() => handleSend("¿Hacen proyectos en México o el extranjero?")}
              disabled={loading}
              className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-secondary whitespace-nowrap transition-colors disabled:opacity-50"
            >
              🌎 ¿Servicio en el exterior?
            </button>
            <button
              onClick={() => handleSend("¿Cómo presento un reclamo en el libro?")}
              disabled={loading}
              className="px-2.5 py-1 rounded-full border border-border bg-background hover:bg-secondary whitespace-nowrap transition-colors disabled:opacity-50"
            >
              📋 Reclamos
            </button>
          </div>

          {/* Formulario de Entrada */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 border-t border-border bg-background flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregunta a la IA sobre diseño, renders o legal..."
              disabled={loading}
              className="flex-1 px-3 py-2 text-xs md:text-sm rounded-xl border border-border bg-secondary/20 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="h-9 w-9 rounded-xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      )}
    </div>
  )
}

import { NextResponse } from "next/server"

const RAG_STREAM_URL = process.env.RAG_STREAM_URL || "http://127.0.0.1:8000/api/chat/stream"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { question } = body

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "La pregunta no puede estar vacía" },
        { status: 400 }
      )
    }

    // Detectar IP real del usuario para el control de tráfico (Rate Limiting)
    const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1"

    try {
      const response = await fetch(RAG_STREAM_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": clientIp,
        },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const isRateLimit = response.status === 429
        return NextResponse.json(
          {
            error: errorData.detail || (isRateLimit ? "Has alcanzado el límite de consultas por minuto. Por favor, espera un momento." : "Error en el motor RAG."),
            isRateLimit,
          },
          { status: response.status }
        )
      }

      // Reenviar el flujo de Server-Sent Events (SSE) en tiempo real al cliente
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      })
    } catch (err: any) {
      console.error("[Chat API Route] Fallo de conexión con backend Python:", err.message)
      return NextResponse.json(
        {
          error:
            "No se pudo conectar con el servidor RAG (puerto 8000). Asegúrate de iniciar 'python app.py' en la carpeta RAGgreciaInteriores.",
          offline: true,
        },
        { status: 503 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    )
  }
}

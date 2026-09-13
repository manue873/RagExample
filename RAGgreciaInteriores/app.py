"""
Servidor API REST y Streaming SSE - GRECIA INTERIORES S.A.C.
Punto de entrada FastAPI para conectar la Landing Page con el RAG local y en la nube.
"""

import time
import json
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
import uvicorn

import rag_engine
from buttons import detect_context_buttons
from config import RATE_LIMIT_PER_MINUTE, RATE_LIMIT_PER_HOUR


def get_client_ip(request: Request) -> str:
    """Extrae la IP real del cliente considerando proxies inversos (Next.js / Docker)."""
    forwarded = request.headers.get("x-forwarded-for") or request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address(request) or "127.0.0.1"


# Inicializar el limitador de tráfico
limiter = Limiter(key_func=get_client_ip)

# Inicialización de la aplicación FastAPI
app = FastAPI(
    title="RAGModel - Grecia Interiores API",
    description="Backend RAG exclusivo con Groq Cloud y Rate Limiting para Grecia Interiores",
    version="2.1.0"
)
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    """Manejador estandarizado cuando un usuario excede la cuota de consultas."""
    return JSONResponse(
        status_code=429,
        content={
            "error": "rate_limit_exceeded",
            "detail": "Has alcanzado el límite de consultas por minuto. Por favor, espera un momento antes de enviar otra consulta o contáctanos por WhatsApp para asistencia directa.",
            "limit": str(exc.detail)
        }
    )


# Habilitar CORS para permitir llamadas desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    question: str


@app.on_event("startup")
def startup_event():
    """Precarga los componentes del RAG en memoria al encender el servidor."""
    rag_engine.get_rag_components()


@app.get("/api/health")
def health():
    """Chequeo de salud del servicio y reporte de modelo activo."""
    return {
        "status": "online",
        "service": "RAGModel Grecia Interiores",
        "provider": rag_engine.ACTIVE_PROVIDER,
        "model": rag_engine.ACTIVE_MODEL,
        "database": "ChromaDB (Local)",
        "rate_limit": RATE_LIMIT_PER_MINUTE
    }


@app.post("/api/chat")
@limiter.limit(RATE_LIMIT_PER_MINUTE)
async def chat_endpoint(request: Request, req: ChatRequest):
    """Endpoint tradicional con límite de consultas por usuario/IP."""
    if not req.question or not req.question.strip():
        raise HTTPException(status_code=400, detail="La pregunta no puede estar vacía.")

    question = req.question.strip()
    retriever, chain = rag_engine.get_rag_components()

    try:
        t0 = time.time()
        docs = retriever.invoke(question)
        context_str = "\n\n".join([f"[{doc.metadata.get('source')}]: {doc.page_content}" for doc in docs])
        sources = list(set([doc.metadata.get("source") for doc in docs if doc.metadata.get("source")]))
        buttons = detect_context_buttons(question, sources)
        answer = chain.invoke({"context": context_str, "question": question})
        total_time_ms = round((time.time() - t0) * 1000, 1)

        return {
            "answer": answer,
            "sources": sources,
            "buttons": buttons,
            "provider": rag_engine.ACTIVE_PROVIDER,
            "model": rag_engine.ACTIVE_MODEL,
            "response_time_ms": total_time_ms
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat/stream")
@limiter.limit(RATE_LIMIT_PER_MINUTE)
async def chat_stream_endpoint(request: Request, req: ChatRequest):
    """Endpoint reactivo en tiempo real con rate limiting: emite SSE token a token."""
    if not req.question or not req.question.strip():
        raise HTTPException(status_code=400, detail="La pregunta no puede estar vacía.")

    question = req.question.strip()
    retriever, chain = rag_engine.get_rag_components()

    docs = retriever.invoke(question)
    context_str = "\n\n".join([f"[{doc.metadata.get('source')}]: {doc.page_content}" for doc in docs])
    sources = list(set([doc.metadata.get("source") for doc in docs if doc.metadata.get("source")]))
    buttons = detect_context_buttons(question, sources)

    def event_stream():
        # 1. Enviar evento inicial con fuentes y botones
        init_payload = json.dumps({
            "type": "init",
            "sources": sources,
            "buttons": buttons,
            "provider": rag_engine.ACTIVE_PROVIDER,
            "model": rag_engine.ACTIVE_MODEL
        }, ensure_ascii=False)
        yield f"data: {init_payload}\n\n"

        # 2. Transmitir cada token conforme es generado
        for chunk in chain.stream({"context": context_str, "question": question}):
            text = chunk.content if hasattr(chunk, "content") else str(chunk)
            if text:
                token_payload = json.dumps({"type": "token", "token": text}, ensure_ascii=False)
                yield f"data: {token_payload}\n\n"

        # 3. Fin de la transmisión
        done_payload = json.dumps({"type": "done"}, ensure_ascii=False)
        yield f"data: {done_payload}\n\n"

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=False)

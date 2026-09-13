"""
Módulo de Configuración Centralizada - RAG GRECIA INTERIORES S.A.C.
Carga variables de entorno, rutas base y constantes de modelos.
"""

import os
from dotenv import load_dotenv

# Directorios del proyecto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
KNOWLEDGE_BASE_DIR = os.path.join(BASE_DIR, "knowledge_base")
CHROMA_DIR = os.path.join(BASE_DIR, "chroma_db")

# Cargar variables de entorno desde .env
load_dotenv(os.path.join(BASE_DIR, ".env"), override=True)

# Configuración de Embeddings y Modelo Groq Cloud
EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
GROQ_DEFAULT_MODEL = "qwen/qwen3.8-27b"

# Variables leídas desde el entorno
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "").strip()
GROQ_MODEL = os.getenv("GROQ_MODEL", GROQ_DEFAULT_MODEL).strip()

# Configuración de Rate Limiting (consultas permitidas por minuto por IP)
RATE_LIMIT_PER_MINUTE = os.getenv("RATE_LIMIT_PER_MINUTE", "5/minute").strip()
RATE_LIMIT_PER_HOUR = os.getenv("RATE_LIMIT_PER_HOUR", "30/hour").strip()

"""
Motor RAG y Gestión de Modelos - GRECIA INTERIORES S.A.C.
Maneja embeddings, persistencia en ChromaDB, proveedores LLM (Groq / Ollama) y la cadena LangChain.
"""

import os
import glob
import warnings
from typing import Tuple

warnings.filterwarnings("ignore")

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from config import (
    KNOWLEDGE_BASE_DIR,
    CHROMA_DIR,
    EMBEDDING_MODEL_NAME,
    GROQ_API_KEY,
    GROQ_MODEL,
)

# Estado de proveedor y modelo activo (Groq Cloud Exclusivo)
ACTIVE_PROVIDER = "groq_cloud"
ACTIVE_MODEL = GROQ_MODEL

# Cachés en memoria para reutilización eficiente
_CACHED_EMBEDDINGS = None
_CACHED_VECTORSTORE = None
_CACHED_LLM = None
_CACHED_CHAIN = None
_CACHED_RETRIEVER = None


def get_embeddings():
    """Inicializa o devuelve la instancia en memoria del modelo de embeddings."""
    global _CACHED_EMBEDDINGS
    if _CACHED_EMBEDDINGS is None:
        _CACHED_EMBEDDINGS = HuggingFaceEmbeddings(
            model_name=EMBEDDING_MODEL_NAME,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )
    return _CACHED_EMBEDDINGS


def get_llm():
    """
    Inicializa el LLM exclusivamente mediante Groq Cloud.
    No utiliza modelos locales. Si la clave no está presente, falla de manera explícita.
    """
    global _CACHED_LLM, ACTIVE_PROVIDER, ACTIVE_MODEL
    if _CACHED_LLM is not None:
        return _CACHED_LLM

    if not GROQ_API_KEY or not GROQ_API_KEY.startswith("gsk_"):
        raise ValueError(
            "ERROR DE CONFIGURACIÓN: 'GROQ_API_KEY' no está definida o es inválida en .env. "
            "El servicio requiere una clave de API de Groq Cloud para operar."
        )

    _CACHED_LLM = ChatGroq(
        model=GROQ_MODEL,
        api_key=GROQ_API_KEY,
        temperature=0.2,
        max_tokens=400,
    )
    ACTIVE_PROVIDER = "groq_cloud"
    ACTIVE_MODEL = GROQ_MODEL
    return _CACHED_LLM


def build_or_load_vectorstore():
    """Carga la base de datos Chroma existente o indexa los documentos markdown iniciales."""
    global _CACHED_VECTORSTORE
    if _CACHED_VECTORSTORE is not None:
        return _CACHED_VECTORSTORE

    embeddings = get_embeddings()

    if os.path.exists(CHROMA_DIR):
        _CACHED_VECTORSTORE = Chroma(
            persist_directory=CHROMA_DIR,
            embedding_function=embeddings
        )
        return _CACHED_VECTORSTORE

    # Primera indexación si chroma_db no existiera
    md_files = glob.glob(os.path.join(KNOWLEDGE_BASE_DIR, "*.md"))
    all_docs = []
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=100,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "],
    )

    for file_path in md_files:
        filename = os.path.basename(file_path)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        splits = text_splitter.create_documents(
            texts=[content],
            metadatas=[{"source": filename}],
        )
        all_docs.extend(splits)

    _CACHED_VECTORSTORE = Chroma.from_documents(
        documents=all_docs,
        embedding=embeddings,
        persist_directory=CHROMA_DIR,
    )
    return _CACHED_VECTORSTORE


def get_rag_components() -> Tuple[object, object]:
    """Retorna el retriever y la cadena de inferencia LangChain listos para consulta y streaming."""
    global _CACHED_RETRIEVER, _CACHED_CHAIN
    if _CACHED_RETRIEVER is not None and _CACHED_CHAIN is not None:
        return _CACHED_RETRIEVER, _CACHED_CHAIN

    vectorstore = build_or_load_vectorstore()
    _CACHED_RETRIEVER = vectorstore.as_retriever(search_kwargs={"k": 2})
    llm = get_llm()

    prompt_template = ChatPromptTemplate.from_messages([
        ("system", (
            "Eres el Asistente Virtual oficial de GRECIA INTERIORES S.A.C. (estudio de arquitectura e interiorismo de la Arq. Grecia Calle en Lima, Perú).\n"
            "Responde de forma concisa, cordial, elegante y profesional fundamentándote en la información oficial del estudio:\n"
            "- Renders 3D: se incluyen exactamente dos (2) rondas de revisiones menores (colores, texturas, luminarias).\n"
            "- Hitos de pago: 50% anticipo al firmar contrato, 30% con anteproyecto/renders 3D y 20% liquidación final contra entrega de planos.\n"
            "- Modalidades: Presencial en Lima y 100% Virtual para provincias de Perú y el extranjero (México, Colombia, etc.).\n"
            "- Alcance: El servicio es de diseño y expediente técnico; la ejecución de obra civil y trámites municipales son independientes.\n\n"
            "CONTEXTO OFICIAL:\n{context}\n\n"
            "Responde breve, directo y enfocado en la consulta del cliente."
        )),
        ("human", "{question}")
    ])

    _CACHED_CHAIN = prompt_template | llm | StrOutputParser()
    return _CACHED_RETRIEVER, _CACHED_CHAIN

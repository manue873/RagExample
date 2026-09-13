# Servicio de Asistente Virtual - Grecia Interiores S.A.C.

Módulo de procesamiento y búsqueda semántica para el asistente virtual de **Grecia Interiores S.A.C.** Este servicio expone una API REST y streaming en tiempo real (Server-Sent Events) para atender consultas de usuarios mediante documentación corporativa oficial.

---

## 1. Arquitectura y Componentes

* **Framework:** FastAPI con servidor Uvicorn.
* **Inferencia:** Conexión con Groq Cloud utilizando el modelo configurado en variables de entorno (`GROQ_MODEL`).
* **Base Vectorial:** ChromaDB con persistencia local en disco (`chroma_db/`).
* **Embeddings:** Modelo `sentence-transformers/all-MiniLM-L6-v2` para la vectorización de consultas y documentos.
* **Control de Frecuencia (Rate Limiting):** Limitador por dirección IP para evitar saturación de la API y garantizar disponibilidad de servicio.

---

## 2. Variables de Entorno (`.env`)

Cree un archivo `.env` en este directorio con los siguientes parámetros:

```ini
# Clave de acceso provista por Groq Console
GROQ_API_KEY=gsk_tu_clave_de_groq

# Modelo asignado para la generación de respuestas
GROQ_MODEL=qwen/qwen3.8-27b
```

---

## 3. Endpoints Principales

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Estado del servicio y modelo activo. |
| `POST` | `/api/chat` | Procesamiento tradicional con respuesta completa en formato JSON. |
| `POST` | `/api/chat/stream` | Transmisión en tiempo real token a token vía Server-Sent Events (SSE). |

---

## 4. Ejecución en Contenedor

Este servicio está diseñado para ejecutarse a través de Docker Compose junto con la aplicación web principal. Para compilarlo de forma aislada:

```bash
docker build -t rag-grecia-interiores .
docker run -p 8000:8000 --env-file .env rag-grecia-interiores
```

---

## 5. Mantenimiento Documental

Los documentos de consulta oficiales se encuentran en `knowledge_base/`:
* `catalogo_servicios_detallado.md`
* `terminos_y_condiciones.md`
* `politica_privacidad.md`
* `preguntas_frecuentes.md`

Al actualizar o agregar nuevos documentos, limpie la carpeta `chroma_db/` para que el servicio reconstruya los índices vectoriales al reiniciar.

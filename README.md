# RAGModel - Plataforma Web y Asistente Virtual

Plataforma digital para el estudio de arquitectura y diseño de interiores **Grecia Interiores S.A.C.** El sistema integra un portal institucional con un asistente de atención automatizada para resolver consultas de clientes sobre servicios, términos de contratación y procesos de diseño a partir de documentación oficial.

---

## 1. Descripción del Sistema

La solución se compone de dos módulos principales comunicados de forma desacoplada:

1. **Portal Web (Frontend):** Construido sobre Next.js con el App Router y TypeScript. Ofrece navegación fluida, diseño adaptable a dispositivos móviles y un componente de chat interactivo que consume las respuestas del asistente en tiempo real mediante streaming (Server-Sent Events).
2. **Servicio del Asistente (Backend):** Desarrollado en Python con FastAPI. Realiza búsquedas semánticas sobre la base de conocimientos de la firma (catálogo de servicios, políticas y preguntas frecuentes) y genera respuestas contextualizadas a través de la infraestructura de inferencia de Groq Cloud.

---

## 2. Medidas de Seguridad y Control de Uso

* **Protección de Credenciales:** La clave de acceso a Groq (`GROQ_API_KEY`) reside exclusivamente en las variables de entorno del backend. El cliente web nunca tiene acceso a esta credencial ni se comunica directamente con proveedores externos.
* **Proxy de Consultas:** El frontend actúa como intermediario seguro (`/api/chat`), canalizando las solicitudes hacia el servicio interno.
* **Límite de Consultas por Usuario:** Se implementó un control de frecuencia de solicitudes (Rate Limiting) basado en la dirección IP del cliente. Si un usuario supera el número permitido de mensajes en un intervalo de tiempo, el sistema devuelve un estado HTTP 429 con un mensaje explicativo y sugiere el contacto directo por WhatsApp para evitar interrupciones en la atención comercial.

---

## 3. Requisitos Previos

Para ejecutar la solución completa se requiere:

* **Docker** (versión 24.0 o superior) y **Docker Compose** (v2.0 o superior).
* Una clave de API de **Groq Cloud** con permisos de lectura.

En caso de ejecución en entorno local sin Docker:
* **Node.js** 20.x o superior con `npm`.
* **Python** 3.10 o 3.11 con `pip`.

---

## 4. Configuración de Variables de Entorno

Antes de iniciar los servicios, cree un archivo `.env` en la raíz de cada módulo tomando como referencia los ejemplos provistos:

### Backend (`RAGgreciaInteriores/.env`)
```ini
# Clave de API provista por la consola de Groq
GROQ_API_KEY=gsk_tu_clave_de_groq_aqui

# Modelo de lenguaje asignado
GROQ_MODEL=qwen/qwen3.8-27b

# Configuración de red del servidor
HOST=0.0.0.0
PORT=8000
```

### Frontend (`GreciaInterioresLandingPage/.env.local`)
```ini
# URL interna del servicio de chat (en Docker apunta al nombre del contenedor)
RAG_STREAM_URL=http://rag-backend:8000/api/chat/stream
```

---

## 5. Despliegue con Docker

El proyecto cuenta con configuración de Docker Compose para desplegar ambos servicios de forma coordinada dentro de una red privada.

### Pasos para iniciar:

1. Clonar el repositorio y situarse en el directorio principal:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>/RAGModel.git
   cd RAGModel
   ```

2. Levantar los contenedores:
   ```bash
   docker compose up --build -d
   ```

3. Verificar que los servicios estén activos:
   * **Portal Web:** `http://localhost:3000`
   * **Servicio de Asistente (Health Check):** `http://localhost:8000/api/health`

Para detener la ejecución:
```bash
docker compose down
```

---

## 6. Ejecución Manual en Desarrollo

Si requiere trabajar en cada módulo de manera independiente durante el desarrollo:

### Paso 1: Iniciar el Backend
```bash
cd RAGgreciaInteriores

# Crear y activar entorno virtual
python -m venv .venv
# En Windows:
.venv\Scripts\activate
# En macOS/Linux:
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Iniciar servidor
python app.py
```
El servicio quedará disponible en `http://127.0.0.1:8000`.

### Paso 2: Iniciar el Frontend
```bash
cd GreciaInterioresLandingPage

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```
La aplicación web estará disponible en `http://localhost:3000`.

---

## 7. Estructura del Proyecto

```text
├── GreciaInterioresLandingPage/    # Aplicación web en Next.js
│   ├── app/                       # Rutas y páginas principales del sitio
│   │   ├── api/chat/              # Endpoint proxy para transmisión de mensajes
│   │   ├── layout.tsx             # Estructura base y metadatos generales
│   │   └── page.tsx               # Página principal del portal
│   ├── components/                # Componentes reutilizables de la interfaz
│   │   ├── chat-widget.tsx        # Módulo de chat interactivo con soporte SSE
│   │   └── ui/                    # Elementos base de diseño
│   ├── public/                    # Archivos estáticos e imágenes
│   └── Dockerfile                 # Empaquetado optimizado del frontend
│
├── RAGgreciaInteriores/           # Servicio de atención automatizada
│   ├── app.py                     # API REST y endpoints de streaming con control de cuota
│   ├── rag_engine.py              # Motor de búsqueda documental e integración con Groq
│   ├── buttons.py                 # Reglas para sugerencias de botones interactivos
│   ├── config.py                  # Carga centralizada de configuraciones
│   ├── knowledge_base/            # Documentación oficial de la empresa (Markdown)
│   ├── chroma_db/                 # Base vectorial local persistida
│   ├── requirements.txt           # Dependencias de Python
│   └── Dockerfile                 # Contenedor del backend
│
└── docker-compose.yml             # Orquestación y red interna de contenedores
```

---

## 8. Actualización de la Base de Conocimientos

Para modificar o ampliar la información que maneja el asistente:

1. Edite o agregue archivos con formato Markdown (`.md`) dentro de `RAGgreciaInteriores/knowledge_base/`.
2. Para que los cambios surtan efecto en la base vectorial, elimine el contenido de la carpeta `chroma_db/` y reinicie el servicio. El sistema indexará automáticamente la documentación actualizada al arrancar.

---

## 9. Contacto y Soporte

Para consultas sobre la administración técnica o integraciones adicionales de la plataforma, contactar al equipo de desarrollo responsable del repositorio.

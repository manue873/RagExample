FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema mínimas requeridas
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copiar manifiesto de dependencias e instalarlas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente y base de conocimientos
COPY . .

# Exponer el puerto de FastAPI
EXPOSE 8000

# Health check para orquestación con Docker Compose
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:8000/api/health || exit 1

# Comando de ejecución con Uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

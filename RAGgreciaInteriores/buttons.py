"""
Módulo de Botones de Acción Contextuales - GRECIA INTERIORES S.A.C.
Analiza la intención del usuario para inyectar botones dinámicos relevantes.
"""

import urllib.parse
from typing import List, Dict


def detect_context_buttons(query: str, sources: list) -> List[Dict[str, str]]:
    """
    Detecta si la consulta del usuario amerita botones de acción específicos.
    NO devuelve botones por defecto para saludos o preguntas informativas generales.
    Solo se activan cuando el usuario pide cotizar, contactar, ver fotos o gestionar un reclamo/término.
    """
    q = query.lower()
    buttons = []

    # 1. Reclamos / Quejas / Indecopi / Libro de Reclamaciones
    if any(w in q for w in ["reclamo", "reclamaci", "queja", "libro", "indecopi", "denuncia", "disconforme", "mal servicio"]):
        buttons.append({
            "id": "complaints",
            "label": "📋 Abrir Libro de Reclamaciones Virtual",
            "type": "internal",
            "url": "/libro-de-reclamaciones"
        })
        return buttons

    # 2. Privacidad / Datos Personales / Derechos ARCO
    if any(w in q for w in ["privacidad", "datos personales", "arco", "eliminar mis datos", "borrar mis datos", "ley 29733"]):
        buttons.append({
            "id": "privacy",
            "label": "🛡️ Ver Política de Privacidad (Ley 29733)",
            "type": "internal",
            "url": "/politica-de-privacidad"
        })
        return buttons

    # 3. Revisiones / Renders / Políticas de 2 rondas
    if any(w in q for w in ["revision", "rondas de cambio", "cambios en render", "rondas de render", "ajuste de render", "cuantos cambios"]):
        buttons.append({
            "id": "terms_revisions",
            "label": "📜 Ver Política de 2 Rondas en Términos",
            "type": "internal",
            "url": "/terminos-y-condiciones"
        })
        return buttons

    # 4. Solicitud de Portafolio / Fotos / Trabajos Realizados
    if any(w in q for w in ["portafolio", "foto", "galeria", "obras", "ejemplos de trabajo", "proyectos realizados", "muestras", "ver proyectos"]):
        buttons.append({
            "id": "portfolio",
            "label": "📸 Explorar Portafolio de Obras",
            "type": "internal",
            "url": "/#portafolio"
        })
        return buttons

    # 5. Cotizaciones / Precios / Contacto / WhatsApp / Contratación
    if any(w in q for w in ["cotiz", "precio", "costo", "tarifa", "cuanto cobra", "cuanto cuesta", "presupuesto", "contacto", "contactar", "whatsapp", "telefono", "celular", "contrat", "paquete"]):
        msg = urllib.parse.quote(f"Hola Grecia Interiores, quisiera cotizar mi proyecto ({query[:40]})")
        buttons.append({
            "id": "wa_quote",
            "label": "📲 Cotizar por WhatsApp (+51 941 397 531)",
            "type": "whatsapp",
            "url": f"https://wa.me/51941397531?text={msg}"
        })
        buttons.append({
            "id": "view_services",
            "label": "📐 Ver Paquetes de Diseño",
            "type": "internal",
            "url": "/#servicios"
        })
        return buttons

    # 6. Para cualquier otra consulta general, saludo o conversación: CERO BOTONES
    return []

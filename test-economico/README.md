# ¿Cómo está tu economía?

Micro app de diagnóstico económico (sin backend, sin consejos): un test corto que termina invitando a hablar por WhatsApp sobre una fuente de ingreso extra (Atomy).

## Configuración

- **Número de WhatsApp**: `js/app.js`, constante `WHATSAPP_NUMBER`. Ahora mismo es `34635151252` (asume prefijo de España, +34, para el número `635151252`). Si el número es de otro país, cambia el prefijo.
- El test no guarda datos en ningún servidor: todo vive en memoria del navegador y se pierde al recargar.

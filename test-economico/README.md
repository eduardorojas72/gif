# ¿Cómo está tu economía?

Micro app de diagnóstico económico (sin backend, sin consejos): un test corto que termina invitando a hablar por WhatsApp sobre una fuente de ingreso extra (Atomy).

## Configuración

- **Número de WhatsApp por defecto**: `js/app.js`, constante `DEFAULT_WHATSAPP_NUMBER`. Ahora mismo es `34635151252` (asume prefijo de España, +34, para el número `635151252`). Si el número es de otro país, cambia el prefijo.
- **Compartir con un número distinto por persona**: cada miembro del equipo puede usar su propio enlace añadiendo `?wa=<su número>`, por ejemplo:
  `https://testeconomico.vercel.app/?wa=34600111222`
  Quien haga el test desde ese enlace escribirá por WhatsApp a ese número en vez de al número por defecto. No requiere ningún despliegue ni cambio de código, solo compartir el enlace con el parámetro.
- El test no guarda datos en ningún servidor: todo vive en memoria del navegador y se pierde al recargar.

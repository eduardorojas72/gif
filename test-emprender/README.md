# ¿Qué te frena para emprender?

Micro app de diagnóstico sobre miedos a emprender (sin backend, sin consejos directos): un test corto que recoge la situación, los frenos y el momento de quien responde, y termina invitando a hablar por WhatsApp para recibir un plan personalizado. Igual que test-piel, el objetivo final es que la persona envíe **todas sus respuestas** por WhatsApp, no solo un resultado genérico.

## Configuración

- **Número de WhatsApp por defecto**: `js/app.js`, constante `DEFAULT_WHATSAPP_NUMBER`. Ahora mismo es `34635151252` (cámbialo si quieres uno distinto).
- **Compartir con un número distinto por persona**: añade `?wa=<número>` al enlace, por ejemplo:
  `https://testemprender.vercel.app/?wa=34600111222`
- **Preguntas y textos**: todo vive en `js/data.js`.
- El test no guarda datos en ningún servidor: todo vive en memoria del navegador. Las respuestas solo salen del dispositivo cuando la persona pulsa el botón de WhatsApp.

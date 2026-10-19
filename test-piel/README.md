# ¿Cómo está tu piel?

Micro app de diagnóstico de piel (sin backend, sin consejos directos): un test corto que recoge el tipo de piel y los hábitos de cuidado de quien responde, y termina invitando a hablar por WhatsApp para recibir una recomendación personalizada. A diferencia del test de economía, aquí el objetivo final es que la persona envíe **todas sus respuestas** por WhatsApp, no solo un resultado genérico.

## Configuración

- **Número de WhatsApp por defecto**: `js/app.js`, constante `DEFAULT_WHATSAPP_NUMBER`. Ahora mismo es `34635151252` (mismo que el test de economía; cámbialo si quieres uno distinto).
- **Compartir con un número distinto por persona**: igual que en el test de economía, añade `?wa=<número>` al enlace, por ejemplo:
  `https://test-piel.vercel.app/?wa=34600111222`
- **Preguntas y textos**: todo vive en `js/data.js`. Las preguntas de maquillaje solo aparecen si la persona elige "Mujer" y responde que usa maquillaje (lógica en el campo `showIf` de cada pregunta).
- El test no guarda datos en ningún servidor: todo vive en memoria del navegador. Las respuestas solo salen del dispositivo cuando la persona pulsa el botón de WhatsApp.

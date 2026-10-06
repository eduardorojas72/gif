# ¿Tu lavado es tan seguro como crees?

Micro app de concienciación (sin backend): un test corto sobre el uso de
detergentes convencionales (químicos, irritación/alergias en la piel,
impacto ambiental y gasto mensual). No menciona ningún producto por su
nombre: el resultado solo muestra categorías genéricas de beneficio
(ahorro, salud, medio ambiente) y anima a pedir información por WhatsApp
sobre la alternativa.

## Configuración

- **Número de WhatsApp por defecto**: `js/app.js`, constante `DEFAULT_WHATSAPP_NUMBER`. Ahora mismo es `34635151252` (mismo que los demás tests; cámbialo si quieres uno distinto).
- **Compartir con un número distinto por persona**: añade `?wa=<número>` al enlace, por ejemplo:
  `https://test-detergente.vercel.app/?wa=34600111222`
- **Preguntas, beneficios y textos del diagnóstico**: todo vive en `js/data.js`.
- El test no guarda datos en ningún servidor: todo vive en memoria del navegador. Las respuestas solo salen del dispositivo cuando la persona pulsa el botón de WhatsApp.

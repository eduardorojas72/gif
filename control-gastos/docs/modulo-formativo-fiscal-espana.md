# Material de referencia: módulo formativo fiscal/legal (España)

> **Nota de alcance:** este documento reúne material de investigación aportado
> por el usuario durante el desarrollo de Hucha. Es contenido **específico de
> España** (impuestos, fiscalidad de inversión, seguros, becas) que **no se
> ha incorporado a la app** porque Hucha da servicio a usuarios de ~20 países
> (ver `DATA.countries` en `js/data.js`) y este material no generaliza. Se
> guarda aquí como referencia para un futuro "módulo formativo" específico
> por país/región, si en algún momento se decide construirlo. No es contenido
> verificado independientemente ni debe presentarse como asesoramiento fiscal
> o de inversión definitivo: las cifras (tramos, umbrales, tipos) cambian con
> cada ejercicio fiscal y deben confirmarse contra la fuente oficial vigente
> antes de usarse.

---

## 1. Asignación de activos por horizonte temporal

Principio general: a más años de horizonte, más volatilidad se puede asumir a
cambio de mayor rentabilidad esperada.

| Horizonte | Renta variable / Renta fija | Vehículos típicos |
| --- | --- | --- |
| Corto plazo (< 3 años) | 0% / 100% | Cuentas remuneradas, depósitos a plazo, fondos monetarios |
| Medio plazo (3-7 años) | 30-50% / 50-70% | Cartera mixta equilibrada (ej. 40% fondo indexado global / 60% bonos de alta calidad) |
| Largo plazo (7-15 años) | 70-80% / 20-30% | Cartera de crecimiento, predominio de renta variable global |
| Muy largo plazo / jubilación (> 15 años) | 90-100% / 0-10% | Fondos indexados globales de renta variable (MSCI World, S&P 500) |

Reglas clave:
1. **Regla de la transición ("desriscar"):** a medida que se acerca la fecha de uso del dinero, traspasar gradualmente de renta variable a renta fija para blindar ganancias.
2. **Ajuste por tolerancia al riesgo:** si una caída del 20% en un año malo generaría angustia o ventas en pérdidas, reducir la renta variable un 10-20% independientemente del horizonte.
3. **Rebalanceo anual:** ajustar una vez al año las proporciones objetivo si se han desviado por el movimiento del mercado.

## 2. Fiscalidad de fondos indexados en España (IRPF)

- **Exención por traspaso entre fondos:** mover dinero de un fondo a otro no tributa por las plusvalías acumuladas; el pago de impuestos se pospone hasta el reembolso definitivo a cuenta bancaria.
- **Regla FIFO (First In, First Out):** al vender, las participaciones vendidas primero son las más antiguas (ganancia calculada contra el precio de compra más antiguo).
- **Tramos del IRPF sobre la base del ahorro** (ganancias patrimoniales netas):

  | Ganancia patrimonial neta | Tipo |
  | --- | --- |
  | Hasta 6.000 € | 19% |
  | 6.000,01 € – 50.000 € | 21% |
  | 50.000,01 € – 200.000 € | 23% |
  | 200.000,01 € – 300.000 € | 27% |
  | Más de 300.000 € | 28% |

  Ejemplo dado: retirar 20.000 € con capital invertido original de 10.000 € → ganancia neta 10.000 € → 6.000 € al 19% (1.140 €) + 4.000 € al 21% (840 €) = 1.980 € (tipo efectivo ≈19,8%).

- **Retención en origen:** la entidad retiene automáticamente un 19% en el momento de la venta y lo ingresa a cuenta en Hacienda.
- **Compensación de pérdidas:** las minusvalías de venta se pueden compensar con ganancias de otros fondos/acciones, incluso hasta un 25% de rendimientos del capital mobiliario (dividendos, intereses).

## 3. Rebalanceo de cartera

**Qué es:** ajustar los porcentajes de la cartera de vuelta al objetivo cuando el mercado los desvía (ej. renta variable que sube de 80% a 88% del total).

- **Método 1 — Traspaso directo:** identificar la desviación (valorar la cartera total y comparar contra el objetivo), ordenar un "Traspaso" (nunca "Reembolso"/"Venta") entre fondos en la plataforma, indicar el importe exacto a mover. Las plusvalías acumuladas se arrastran al nuevo fondo sin tributar en ese momento.
- **Método 2 — Aportaciones periódicas dirigidas:** en fase de acumulación, destinar el 100% (o más) de las nuevas aportaciones mensuales al activo rezagado en lugar de repartirlas según el objetivo original; equilibra la cartera sin tocar el capital ya invertido.
- **Automático vs. manual:** los robo-advisors monitorizan y rebalancean solos cuando la desviación supera un umbral (típicamente 2-5%); en gestión manual basta revisar una vez al año o cuando una categoría se desvía más de un 5% — rebalancear con demasiada frecuencia genera costes y resta rentabilidad al interés compuesto.

## 4. Optimización fiscal general (IRPF)

- **Deducciones personales/familiares:** hijos a cargo, ascendientes, discapacidad, familia numerosa.
- **Vivienda:** deducción por alquiler (según región), compra de vivienda habitual (regímenes transitorios), bonificaciones por eficiencia energética/reformas.
- **Planes de pensiones:** las aportaciones reducen la base imponible del IRPF en muchos países.
- **Donaciones:** a ONG/fundaciones generan deducción directa sobre la cuota.
- **Autónomos:** deducir gastos afectos a la actividad (oficina, suministros proporcionales, herramientas, transporte); evaluar persona física (tarifa progresiva) vs. sociedad (tipo fijo) según nivel de ingresos.
- **Ganancias patrimoniales:** compensar pérdidas de inversión con ganancias del mismo ejercicio (o futuros, según límite legal); exención por reinversión en vivienda habitual si el importe se reinvierte en otra vivienda habitual dentro de plazo.

## 5. Optimización de seguros

- **Coche:** con >5-6 años, todo riesgo con franquicia en vez de sin franquicia; con >8-10 años, evaluar pasar a terceros ampliado (la indemnización por siniestro total se calcula sobre valor venal, no de nuevo).
- **Hogar:** ajustar capitales de continente y contenido — sobreasegurar sube la prima innecesariamente, el infraseguro penaliza en el siniestro.
- **Eliminar duplicidades:** revisar si el seguro del coche o de la tarjeta ya incluye asistencia en viaje/accidentes antes de pagarlo también en otra póliza.
- **Franquicia:** asumir una franquicia inicial (150-300 €) suele dar descuentos del 20-40% en la prima anual.
- **Unificación de ramos:** agrupar hogar/auto/vida en la misma aseguradora da acceso a descuentos de vinculación.
- **Ventana de cancelación:** la no renovación debe notificarse con ≥30 días de antelación a la fecha de vencimiento; comparar 40-45 días antes.
- **Seguros vinculados a la hipoteca:** ningún seguro es obligatorio contratarlo con el banco excepto el seguro de daños/hogar sobre el inmueble (Ley 5/2019). Antes de cancelar un seguro bonificado, calcular: *Ahorro neto = Ahorro en la prima − Coste por penalización en la cuota hipotecaria* (revisar la FAE/escrituras para la subida exacta del diferencial, habitualmente 0,10-0,25 puntos por póliza). Por ley, el banco no puede cobrar comisión de análisis ni empeorar condiciones si se presenta un seguro alternativo con coberturas equivalentes.
  - Proceso: revisar escrituras → pedir presupuestos alternativos (45-60 días antes del vencimiento) → comunicar la no renovación por escrito (burofax o escrito con acuse de recibo, ≥30 días antes) → verificar el ajuste de la cuota en la siguiente revisión.

## 6. Becas y ayudas al estudio (no universitario)

Gestionadas por el Ministerio de Educación, FP y Deportes (MEFD) + convocatorias autonómicas/municipales. Cubren libros, comedor, transporte, residencia y apoyo NEAE (necesidad específica de apoyo educativo).

**Convocatorias y plazos habituales:**
- Becas generales MEFD (Bachillerato, FP, enseñanzas artísticas/deportivas): marzo-mayo del curso anterior.
- Becas/ayudas autonómicas (Infantil-Bachillerato, libros tipo ACCEDE/Cheque Libro, comedor, transporte): mayo-julio o inicio de curso (septiembre).
- Ayudas NEAE: mayo-septiembre.

**Proceso:** identificación digital (Cl@ve, certificado digital o DNIe) → reunir documentación (libro de familia, DNI/NIE de mayores de 14, título de familia numerosa/monoparental o certificado de discapacidad; se autoriza consulta de renta IRPF a la Agencia Tributaria) → formulario telemático en la sede del Ministerio o la Comunidad Autónoma (incluye IBAN del titular) → guardar justificante/número de registro y hacer seguimiento (subsanación en 10 días hábiles si se requiere).

**Cuantías (becas no universitarias, fijadas anualmente por Real Decreto):**
- Fija ligada a la renta: 1.700 €
- Fija de residencia (si debe residir fuera del domicilio familiar): 2.500 €
- Fija de excelencia académica (nota media ≥8,00): 50-125 €
- Beca básica (FP Básica/ciclos específicos): 300 € (o 350 €)
- Variable: mínimo 60 €, calculada cruzando nota media y renta familiar disponible.

**Umbrales de renta familiar (ejemplo de tabla de referencia):**

| Miembros | Umbral 1 | Umbral 2 | Umbral 3 |
| --- | --- | --- | --- |
| 1 | 3.962 € | 13.258 € | 14.126 € |
| 2 | 6.706 € | 22.590 € | 24.089 € |
| 3 | 9.458 € | 30.668 € | 32.681 € |
| 4 | 12.191 € | 36.421 € | 38.831 € |
| 5 | 14.412 € | 40.708 € | 43.402 € |
| 6 | 16.633 € | 44.994 € | 47.972 € |
| 7 | 18.854 € | 49.281 € | 52.543 € |
| 8 | 21.075 € | 53.568 € | 57.114 € |
| + adicional | +2.221 € | +4.287 € | +4.571 € |

Derecho según umbral: ≤Umbral 1 → todas las cuantías (fija por renta + residencia + excelencia + variable completa); entre Umbral 1 y 2 → residencia + excelencia + variable, sin la fija por renta; entre Umbral 2 y 3 → solo beca básica/matrícula + excelencia; >Umbral 3 → denegada.

**Criterios de concesión:** económicos (renta y patrimonio de la unidad familiar) y académicos/personales (matriculación en centro autorizado, requisitos de promoción, circunstancias especiales).

**Miembros computables** (a 31 de diciembre del ejercicio fiscal de referencia): el solicitante; ambos padres/tutores si conviven (o el custodio en caso de separación); hermanos solteros <25 años que convivan; hermanos >25 con discapacidad que convivan; abuelos que convivan y estén empadronados (con acreditación).
- Custodia compartida: computan ambos progenitores, sus parejas y los hermanos que convivan con cada uno.
- Custodia no compartida: computa solo el progenitor custodio (y su nueva pareja si reside en el hogar); el no custodio no computa, pero su pensión alimenticia sí debe declararse.
- Estudiante emancipado: unidad familiar = alumno + cónyuge/pareja + hijos, si acredita ingresos propios y vivienda propia/alquilada.
- No computan: hermanos >25 sin discapacidad, tíos/primos u otros colaterales, progenitores privados de la patria potestad.

**Pensión alimenticia y compensatoria en el cálculo de renta:**
- Pensión alimenticia recibida por la unidad familiar → se suma como ingreso.
- Pensión alimenticia pagada por un miembro de la unidad (a hijos de otra relación) → se resta de la renta familiar.
- Pensión compensatoria recibida por el progenitor custodio → tributa como rendimiento del trabajo en su IRPF, se computa automáticamente.
- Pensión compensatoria pagada por el progenitor custodio → se deduce de su base imponible, reduciendo la renta computable.
- Si la pensión fijada no se cobra por impago, hay que aportar la demanda/denuncia de ejecución para que no se compute artificialmente como ingreso.

---

*Compilado a partir de mensajes del usuario durante el desarrollo de Hucha (sept. 2026). Revisar y actualizar cifras contra fuente oficial antes de cualquier uso futuro.*

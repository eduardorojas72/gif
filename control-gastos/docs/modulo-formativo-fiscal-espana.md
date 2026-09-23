# Material de referencia: módulo formativo fiscal/legal (España)

> **Nota de alcance:** este documento reúne material de investigación aportado
> por el usuario durante el desarrollo de Hucha. Es contenido **específico de
> España** (impuestos, fiscalidad de inversión, seguros, becas, mercado
> eléctrico regulado, protección al consumidor en compras online) que **no se
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

## 7. Optimización de la factura eléctrica

**Conceptos de la factura:**

| Concepto | Tipo de coste | ¿De qué depende? | Cómo optimizarlo |
| --- | --- | --- | --- |
| Término de potencia | Fijo | De los kW contratados | Ajustar los kW a las necesidades reales sin que salten los plomos |
| Término de energía | Variable | Del consumo real (kWh) | Concentrar el uso de electrodomésticos en horas valle/llana, o reducir consumo |
| Peajes y cargos | Regulado | Del marco normativo oficial | Vienen integrados en los precios del kW y kWh ofertados por la compañía |

**PVPC (mercado regulado) vs. mercado libre:**
- **PVPC:** precio del kWh cambia cada hora según el mercado mayorista, con 3 tramos horarios (Punta/caro, Llano/medio, Valle/económico — Valle: 00:00-08:00h, fines de semana y festivos). Conviene si puedes concentrar consumo en horas valle, o si cumples requisitos para el Bono Social Eléctrico (descuentos del 40-80%).
- **Mercado libre:** la comercializadora fija un precio libre (tarifa plana 24h, o con su propia discriminación horaria). Conviene si no puedes adaptar horarios y prefieres un precio bajo e independiente de la hora.
- Por perfil de hogar: flexible → PVPC (programar electrodomésticos de noche/findes); familia numerosa/vulnerable → PVPC + Bono Social; consumo repartido todo el día → mercado libre con tarifa fija sin permanencia.

**Cómo saber si pagas de más por potencia:**
- **Método preciso:** cada hogar tiene una distribuidora asignada (no confundir con la comercializadora que factura) — ej. i-DE (Iberdrola), e-distribución (Endesa), UFD (Naturgy), E-Redes, Viesgo. Se identifica por el código CUPS en la factura. En el área privada de la distribuidora (app/web), en el apartado "Potencia"/"Picos de potencia", se ve el pico máximo de kW demandado cada mes de los últimos 12 (por tramo Punta y Valle).
- **Regla de margen de seguridad:** bajar la potencia contratada al pico máximo real + 0,3-0,5 kW de margen (ej. contratada 4,6 kW, pico real 3,1 kW → bajar a 3,45 kW).
- **Método rápido de estimación** (sin acceso al portal): sumar el electrodoméstico de mayor consumo activo a la vez (vitro/inducción ~2,0-2,5 kW, horno ~1,5-2,0 kW, aire acondicionado/calefactor ~1,0-2,0 kW, lavadora en calentamiento ~1,5-2,0 kW) + base constante (frigorífico, luces, TV, router ~0,3-0,5 kW).
- **Ahorro:** bajar 1 kW de potencia contratada ahorra ~40-50 €/año (impuestos incluidos).
- **Coste del trámite:** derechos de enganche de la distribuidora ≈9,04 € + IVA (~11 €) al bajar, cobrados en la siguiente factura — se amortiza en 2-3 meses. Volver a subirla es más caro (~45 €/kW). La normativa limita a un cambio de potencia al año, así que conviene no quedarse corto.

**Cómo tramitar la bajada de potencia:**
1. Confirmar la potencia actual y la deseada en la factura más reciente (escalones estándar, ej. 4,6→3,45→2,3 kW).
2. Contactar con la comercializadora (recomendado: área de cliente/app > Contratos > Modificar potencia; o por teléfono).
3. Indicar el nuevo valor (se puede diferenciar tramo Punta y Valle).
4. Con contador digital telegestionado, el cambio se ejecuta en remoto en 1-5 días hábiles o en el siguiente ciclo de facturación.

Guión de llamada sugerido: *"Hola, llamo para solicitar una reducción de la potencia contratada en mi suministro con CUPS [número CUPS]. Actualmente tengo [ej. 4,6 kW] y quiero ajustarla a [ej. 3,45 kW] en el tramo punta [y en el tramo valle]. Ya he verificado mis picos máximos de consumo en la distribuidora y este tramo cubre perfectamente las necesidades de mi hogar. Por favor, tramiten el cambio sin incluir ningún servicio adicional de mantenimiento o asistencia."*

**Comparador oficial:** usar el Comparador de Ofertas de Energía de la CNMC (`comparador.cnmc.gob.es`) en vez de comparadores privados que cobran comisión de las comercializadoras; se puede subir la factura en PDF o introducir el CUPS.

**Vigilar servicios adicionales:** revisar que la factura no incluya mantenimiento de electrodomésticos, asistencia en el hogar o seguros vinculados no solicitados (ahorro de 3-8 €/mes al eliminarlos).

### Bono Social Eléctrico

Descuento regulado sobre la tarifa PVPC para consumidores vulnerables, del 40% al 80% (hasta 100% en riesgo de exclusión social gestionado por servicios sociales).

**Requisitos previos:** ser titular del contrato, que corresponda a la vivienda habitual (empadronamiento), y tener/cambiar a tarifa PVPC con potencia contratada ≤10 kW.

**Categorías por renta (respecto al IPREM):**
- Consumidor vulnerable (40-65%): renta anual de la unidad de convivencia ≤1,5×IPREM sin menores, ≤2×IPREM con 1 menor, ≤2,5×IPREM con 2 menores.
- Consumidor vulnerable severo (80%): renta ≤50% de los límites del vulnerable simple.
- Categorías directas: familias numerosas (derecho automático a vulnerable, y a severo si ≤2×IPREM); pensionistas con cuantía mínima y sin otros ingresos >500 €/año; beneficiarios del Ingreso Mínimo Vital (IMV).
- El límite de renta sube +0,5×IPREM si hay: discapacidad ≥33%, víctima de violencia de género/terrorismo, dependencia reconocida (Grado II o III), o familia monoparental con menor a cargo.

**Solicitud:** pedir el formulario a una comercializadora de referencia (mercado regulado) → presentar formulario firmado por mayores de 14 años + DNI/NIE de la unidad familiar + certificado de empadronamiento conjunto + libro de familia + documentación de circunstancias especiales si aplica → la comercializadora resuelve en máximo 15 días hábiles.

### Bono Social Térmico

Ayuda para calefacción, agua caliente y cocina (gas natural, butano, propano, electricidad o biomasa). **No se solicita**: se concede de oficio a quien ya sea beneficiario del Bono Social Eléctrico a 31 de diciembre del año anterior, sin necesidad de tener contrato de gas canalizado.

- **Pago:** único anual, por transferencia a la cuenta donde está domiciliada la factura de la luz. Importe entre ~35 €/año (vulnerable, zona climática cálida) y >300 €/año (vulnerable severo, zona muy fría), según:
  1. Grado de vulnerabilidad: severo cobra un 60% más que simple.
  2. Zona climática de la vivienda (Zona A, cálida/costa, a Zona E, fría/montaña o interior).
- **Gestión:** la ejecuta la Comunidad Autónoma (aunque el fondo es del Gobierno central) — en el primer trimestre del año reciben el listado de beneficiarios, notifican la concesión y piden confirmar/actualizar el IBAN (plazo habitual de 10-15 días; también se puede renunciar explícitamente).

### Alternativa para gas: Tarifa de Último Recurso (TUR)

Si no se cumplen los requisitos del Bono Social pero se usa gas natural canalizado: la TUR es la tarifa regulada para hogares con consumo <50.000 kWh/año, con precios por kWh inferiores a las tarifas fijas del mercado libre. Trámite gratuito, sin visita técnica ni corte de suministro.

- **Solo 4 comercializadoras autorizadas (CUR)** pueden ofrecerla — una filial regulada por cada gran grupo energético (Endesa, Iberdrola, Naturgy, TotalEnergies); no se puede pedir en la comercializadora del mercado libre habitual, hay que entrar en el portal específico de "Último Recurso" de cada una (online, o por teléfono a su línea gratuita).
- **Datos necesarios:** código CUPS (22 caracteres, empieza por "ES"), dirección, titular, DNI e IBAN.
- **Tramo asignado automáticamente** según el consumo anual histórico, sin que el usuario deba elegir: TUR 1 (hasta 5.000 kWh/año — agua caliente/cocina de gas, sin calefacción), TUR 2 (5.000-15.000 kWh/año — con calefacción de gas), TUR 3 (15.000-50.000 kWh/año — viviendas grandes o pymes).
- **Sin permanencia:** se puede cambiar de compañía o volver al mercado libre en cualquier momento sin penalización.
- **Plazo:** el cambio tarda 1-3 semanas; la compañía anterior emite factura de cierre y la nueva empieza a facturar en TUR desde la activación.
- **Ojo con servicios extra:** cancelar expresamente cualquier mantenimiento opcional contratado con la compañía anterior para que no lo sigan cobrando tras la baja.
- **Precios:** las tarifas TUR se actualizan oficialmente cada trimestre (enero, abril, julio, octubre).

**TUR Vecinal / TUR 4 (comunidades de propietarios):** variante para comunidades con calefacción y/o agua caliente central, pensada para calderas comunitarias.
- Requisitos: consumo anual >50.000 kWh, uso exclusivamente residencial, contadores individuales o repartidores de costes instalados en cada vivienda, e inspección técnica periódica de la instalación en regla.
- Trámite: aprobación en junta de propietarios → el administrador de fincas/presidente reúne CIF de la comunidad, DNI del responsable, CUPS de la caldera central, certificado de la mantenedora (revisión al día) y certificado de instalación de repartidores → solicitud a una de las 4 CUR por su canal específico para comunidades.
- Incentivo de eficiencia: el precio regulado cubre el consumo promedio histórico de la comunidad; el excedente sobre esa media tiene un pequeño recargo en el término de energía, para incentivar el ahorro individual por vivienda.

## 8. Protección al consumidor en compras online (España/UE)

### Chargeback (retrocesión de cargo)

Disputa financiera forzosa regulada por las redes de tarjetas (Visa/Mastercard) y amparada por PSD2 (Real Decreto-ley 19/2018 en España); el banco emisor exige al banco del comercio la devolución de fondos por fraude o incumplimiento grave.

**Cómo funciona:** (1) el titular presenta la disputa a su banco emisor con las pruebas; (2) el emisor traslada la reclamación al banco adquirente (del comercio) — en fraude claro o no entrega, suele haber abono provisional mientras se investiga; (3) el comercio tiene 30-45 días para alegar (ej. albarán de entrega firmado); (4) si no responde o las pruebas son insuficientes, el abono se hace definitivo; si hay desacuerdo, la red de pago arbitra.

**Motivos válidos:** operación no autorizada (clonación/robo), mercancía no recibida (tracking falso o inexistente), incumplimiento de contrato (producto distinto a lo comprado, o negativa a aplicar el derecho de desistimiento), duplicidad de cobro.

**Plazos:** operaciones no autorizadas (fraude directo) hasta 13 meses desde el cobro (PSD2); incumplimiento comercial (no entrega/desistimiento) hasta 120 días desde la compra o la fecha prevista de entrega (reglas de red Visa/Mastercard, no de un país concreto).

**Coste para el comercio:** cada chargeback perdido conlleva una penalización de la pasarela al comercio (habitualmente 15-30 € adicionales al importe devuelto).

**Documentación a reunir antes de contactar al banco:** extracto con fecha/importe/comercio; justificante de compra (factura o email de confirmación); prueba del fraude o incumplimiento (tracking sin entrega, fotos del producto recibido vs. oferta anunciada); prueba de haber contactado al comercio sin respuesta satisfactoria; copia de denuncia policial si hay estafa deliberada o uso no autorizado de la tarjeta (agiliza la resolución).

**Pasos con el banco:** contactar al departamento de fraude/atención al cliente y abrir la disputa → adjuntar toda la documentación → bloquear y reemplazar la tarjeta si se usó en una web sospechosa → esperar la investigación (el comercio tiene 30-45 días para responder).

### Escalado si el banco deniega el chargeback (vía administrativa española)

1. **Reclamación formal al Servicio de Atención al Cliente (SAC) o Defensor del Cliente del banco** — por escrito (oficina con sello, burofax o email certificado). Citar el Real Decreto-ley 19/2018 (operación no autorizada: reembolso obligatorio antes de fin del día hábil siguiente salvo negligencia grave probada) o la falta de diligencia en activar el chargeback (incumplimiento comercial). El banco debe responder en máximo 15 días hábiles (servicios de pago) o 1 mes (otras consultas).
2. **Banco de España (Oficina de Reclamaciones)** si el SAC deniega o no responde a tiempo: sede electrónica `clientebancario.bde.es` > Reclamaciones, adjuntando la reclamación previa, la respuesta (o su ausencia), extracto, denuncia policial y justificantes. El Banco de España emite un informe motivado; si es favorable, la mayoría de entidades pagan para evitar sanciones (el informe no es ejecutivo pero tiene fuerte peso reputacional).
3. **Vías complementarias:** Oficina Municipal de Información al Consumidor (OMIC) o Dirección General de Consumo autonómica (mediación, para comercios en España/UE); proceso monitorio judicial para importes <2.000 €, sin necesidad de abogado ni procurador, en el Juzgado de Primera Instancia.

### Derecho de desistimiento (compras a distancia, UE)

Derecho a devolver un producto o cancelar un contrato comprado por internet/teléfono/fuera de establecimiento, sin justificar motivo ni penalización (transposición de la Directiva UE 2011/83 — RDL 1/2007 en España).

- **Plazo:** mínimo 14 días naturales desde la recepción del producto (o firma del contrato para servicios); si la tienda no informó claramente de este derecho, se amplía automáticamente hasta 12 meses adicionales.
- **Cómo ejercerlo:** notificar a la empresa antes de que venza el plazo (formulario web o email con datos, número de pedido y declaración explícita de desistimiento) → devolver el producto en máximo 14 días desde la notificación (no hace falta conservar el precinto de fábrica, pero sin daños por uso más allá de comprobar que funciona) → la empresa reembolsa el importe íntegro (incluido el envío ordinario inicial) en máximo 14 días desde la comunicación, por el mismo método de pago.
- **Gastos de devolución:** los paga el comprador solo si la tienda lo advirtió explícitamente antes de la compra; si no lo indicó, los paga la empresa.
- **Penalización por retraso del reembolso:** si pasan más de 14 días desde la notificación acreditada sin que la tienda devuelva el dinero, la ley (LGDCU) permite reclamar el doble de la suma adeudada.
- **Excepciones sin derecho de desistimiento:** productos personalizados/a medida; bienes precintados por higiene/salud ya desprecintados (ropa interior, cosméticos, auriculares in-ear); prensa y publicaciones periódicas; grabaciones/software desprecintados tras la entrega; contenido digital descargado/ejecutado con consentimiento previo; billetes de avión, hotel o entradas con fecha específica.

**Si la tienda rechaza la devolución dentro de plazo** (infracción del RDL 1/2007): (1) conservar pruebas del intento de devolución (capturas, emails, justificante de envío); (2) reclamación formal a la tienda citando el artículo 71 de la Ley de Consumidores y el derecho a reclamar el doble por retraso; (3) chargeback al banco/PayPal aportando esas pruebas (vía más rápida si se pagó con tarjeta); (4) OMIC/Junta Arbitral de Consumo (tiendas en España) o Centro Europeo del Consumidor / plataforma ODR de la Comisión Europea (tiendas en otro país de la UE) — gratuitas, 1-4 meses; o proceso monitorio judicial (cualquier importe, sin abogado obligatorio si es <2.000 €, gratuito, 3-6 meses).

## 9. Derechos del pasajero aéreo (UE) y objetos en control de seguridad

### Objetos no permitidos en el control de seguridad

Los agentes no confiscan legalmente los objetos (salvo que sean ilegales): impiden su paso a la zona de embarque, y solo si el pasajero lo entrega voluntariamente para destruir se pierde. Alternativas para no perderlo (todas requieren margen de tiempo antes del vuelo, ya que implican salir y volver a pasar el filtro):
1. **Consigna del aeropuerto:** oficinas fuera de la zona de embarque donde dejarlo pagando una tarifa por día y recogerlo a la vuelta.
2. **Envío postal/mensajería en la terminal:** empaquetarlo y enviárselo uno mismo a casa desde una oficina de correos o taquilla automática de la zona pública.
3. **Facturarlo como equipaje de bodega:** volver al mostrador de la aerolínea si el objeto cumple la normativa para ir en bodega.
4. **Entregarlo a un acompañante** que siga en la zona pública.

### Reglamento (CE) 261/2004 — retrasos, cancelaciones y overbooking (vuelos UE)

- **Derecho de atención** (retraso >2h según distancia): comida, bebida, 2 llamadas/emails gratis y, si hay pernocta, hotel + transporte, todo a cargo de la aerolínea.
- **Compensación económica** (salvo "circunstancias extraordinarias" — clima extremo, huelga de controladores — que la aerolínea debe probar):
  - 250 € vuelos ≤1.500 km.
  - 400 € vuelos intracomunitarios >1.500 km y el resto de 1.500-3.500 km.
  - 600 € vuelos internacionales >3.500 km.
- Un retraso de llegada >3 horas cuenta legalmente como cancelación a efectos de la compensación.

### Equipaje facturado (perdido, dañado o retrasado)

- **PIR (Parte de Irregularidad del Equipaje):** rellenar en el mostrador de la aerolínea/handling antes de salir de la zona de equipajes, es imprescindible para reclamar.
- **Plazos del Convenio de Montreal** (tratado internacional, aplica más allá de la UE): daños, 7 días desde la recepción; retraso en la entrega, 21 días desde que se entrega la maleta; pérdida definitiva, tras 21 días sin localizarla (indemnización máxima legal ≈1.500 €/pasajero).

### Cómo reclamar a una aerolínea

1. Reclamación previa por escrito a la aerolínea (formulario web o atención al cliente) — conservar la referencia.
2. Si no responde en 1 mes o la rechaza: escalar a la autoridad reguladora — en España, la AESA (Agencia Estatal de Seguridad Aérea), gratuito, con billetes + reclamación previa + justificantes. Su resolución es vinculante para la aerolínea en el ámbito español. (Cada país de la UE tiene su propio organismo nacional equivalente bajo el mismo reglamento 261/2004).

## 10. Hoja de Reclamaciones (España, cualquier comercio u hostelería)

Vía administrativa formal cuando un establecimiento (restaurante, tienda, hotel...) se niega a corregir un error grave, cobra conceptos no anunciados, o el trato es inaceptable.

- **Obligatoriedad:** todo establecimiento comercial y de hostelería en España debe tener Hojas de Reclamaciones oficiales de su Comunidad Autónoma y entregarlas de inmediato a quien las pida.
- **Formato:** 3 copias autocopiativas — blanca/original para la Administración (Consumo), verde o rosa para el consumidor, amarilla o gris para el establecimiento.
- **Cómo rellenarla:** datos personales y del establecimiento, hechos expuestos de forma clara y objetiva, y qué se pide en concreto (ej. devolución de un importe exacto). El responsable del local debe firmarla y sellarla — su firma solo certifica la entrega, no que esté de acuerdo con lo expuesto.
- **Tramitación:** quedarse con la copia blanca y la del consumidor (nunca dejar la blanca en el local); presentar la copia blanca en la OMIC municipal o en la sede electrónica de la Comunidad Autónoma, adjuntando ticket/factura y pruebas.
- **Si el establecimiento se niega a entregarla:** es una infracción administrativa grave con multas elevadas para el local. En ese caso: no discutir, llamar a la Policía Local (112/092) indicando que el establecimiento se niega a facilitar la Hoja de Reclamaciones obligatoria — la patrulla puede levantar atestado e inspeccionar el local, lo que suele derivar en sanción directa.

## 11. Ocio cultural más barato (España)

- **Bono Cultural Joven:** 200 € para quienes cumplen 18 años, destinados a artes escénicas, cine, música, libros, etc.
- **Fiesta del Cine:** evento bianual con entradas a ≈3,50 € en la gran mayoría de salas del país.
- **Cine Senior:** entradas a 2 € en días seleccionados para mayores de 65 años, en programas impulsados por administraciones públicas.
- **Derecho a entrar con comida propia al cine:** la normativa de consumo española ampara al usuario a entrar con su propia bebida y comida compradas fuera, siempre que el propio cine venda ese mismo tipo de producto en su ambigú (el argumento habitual es que cobrar por "no dejar entrar comida externa" cuando se vende ese producto dentro se considera una práctica abusiva).
- **Redes de teatros públicos** (Centro Dramático Nacional, Teatros del Canal, teatros municipales): tarifas subvencionadas un 40-60% más baratas que la cartelera comercial.
- **Filmotecas autonómicas/nacionales** (ej. Filmoteca Española / Cine Doré en Madrid, Filmoteca de Catalunya): proyecciones en versión original y clásicos a 2-4 € la entrada.

---

*Compilado a partir de mensajes del usuario durante el desarrollo de Hucha (sept. 2026). Revisar y actualizar cifras contra fuente oficial antes de cualquier uso futuro.*

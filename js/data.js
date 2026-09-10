/* ---------------------------------------------------------------
   CONTENIDO — Cumbre Master: Plan de Compensación (Sales Master → Imperial Master)
   Fuente: documento oficial de distribución de comisiones (Colombia, en COP).
   Los valores en USD son una conversión aproximada de referencia (~4.000 COP = 1 USD),
   sujeta a la tasa de cambio (TRM) real de cada momento.
--------------------------------------------------------------- */

const DISTRIBUCION = {
  intro: "Del monto total generado por las ventas de la compañía, el 35% se reserva para comisiones e incentivos. Ese 35% se convierte en el 100% de los PV que se reparten así:",
  partes: [
    { pct: "44%", nombre: "Comisión General", detalle: "Se reparte entre todos los miembros, según su nivel de grado y puntaje.", icon: "users" },
    { pct: "20%", nombre: "Comisión de Maestría", detalle: "Se reparte entre quienes ya alcanzaron un rango de Maestría (Sales Master en adelante).", icon: "mountain-flag" },
    { pct: "6%", nombre: "Comisión de Centro de Educación", detalle: "Va al centro educativo al que perteneces, para cubrir sus gastos operativos.", icon: "book-open" },
    { pct: "30%", nombre: "Utilidad neta de la compañía", detalle: "Es la parte que queda para Atomy.", icon: "package" },
  ],
  notaPeriodo: "El período de acumulación de puntos es siempre del 1 al 15, y del 16 al fin de mes — es decir, dos quincenas por mes.",
};

const COMISION_GENERAL = [
  { nivel: "8.º", puntos: "5 puntos", condicion: "Representante de Ventas — acumulado de 10.000 a 299.999 PV personales.", piernaDebil: "≥ 300.000 PV" },
  { nivel: "7.º", puntos: "15 puntos", condicion: "Agente — mínimo 300.000 PV personales, o pierna débil con 600.000 PV acumulados el mes anterior.", piernaDebil: "≥ 300.000 PV" },
  { nivel: "6.º", puntos: "30 puntos", condicion: "Agente Especial — mínimo 700.000 PV personales, o pierna débil con 1,4M PV el mes anterior.", piernaDebil: "≥ 700.000 PV" },
  { nivel: "5.º", puntos: "60 puntos", condicion: "Distribuidor — mínimo 1,5M PV personales, o pierna débil con 3M PV el mes anterior.", piernaDebil: "≥ 1.500.000 PV" },
  { nivel: "4.º", puntos: "90 puntos", condicion: "Distribuidor Especial — mínimo 2,4M PV personales, o pierna débil con 4,8M PV el mes anterior.", piernaDebil: "≥ 2.400.000 PV" },
  { nivel: "3.º", puntos: "150 puntos", condicion: "Continúa la escala de Distribuidor Especial, con mayor volumen de pierna débil.", piernaDebil: "≥ 6.000.000 PV" },
  { nivel: "2.º", puntos: "250 puntos", condicion: "Continúa la escala de Distribuidor Especial, con mayor volumen de pierna débil.", piernaDebil: "≥ 20.000.000 PV" },
  { nivel: "1.º", puntos: "300 puntos", condicion: "Continúa la escala de Distribuidor Especial, con mayor volumen de pierna débil.", piernaDebil: "≥ 50.000.000 PV" },
];

const COMISION_GENERAL_NOTA = "Las comisiones se liquidan el martes siguiente, tomando el acumulado diario desde el miércoles hasta ese martes (la fecha exacta puede variar según el banco local). Tus PV personales siempre se suman a tu pierna débil.";

const RANGOS_MASTER = [
  {
    n: 0, nombre: "Sales Master", icon: "mountain-flag",
    prerrequisito: "Mínimo 2.500.000 PV grupales en cada pierna y 700.000 PV personales. Si el total de PV de tu pierna débil supera los 300.000 PV, los PV personales que generes durante el período pueden sumarse a esa pierna para completar la Maestría.",
    comisionMaestria: "10% del total de PV de la compañía, repartido en partes iguales entre todos los Sales Master.",
    promocion: "Bono de $1.500.000 COP (≈ $375 USD) la primera vez que alcanzas el rango, transferido directamente a tu cuenta.",
    criterio: "Sin restricciones para ascender — solo debes cumplir el prerrequisito de esta quincena.",
  },
  {
    n: 1, nombre: "Diamond Master", icon: "gem",
    prerrequisito: "Mínimo 2 Sales Master en cada pierna, y 1.500.000 PV personales.",
    comisionMaestria: "5% del total de PV, repartido entre Diamond Master y las maestrías superiores.",
    promocion: "Bono de $1.500.000 COP (≈ $375 USD) la primera vez, más un bono de ascenso de aproximadamente $3.000.000 COP (≈ $750 USD).",
    criterio: "Sin restricciones para ascender.",
  },
  {
    n: 2, nombre: "Sharon Rose Master", icon: "sparkles",
    prerrequisito: "Mínimo 2 Diamond Master en cada pierna, y 2.400.000 PV personales.",
    comisionMaestria: "2% del total de PV, repartido entre Sharon Rose Master y las maestrías superiores.",
    promocion: "Aproximadamente $7.600.000 COP (≈ $1.900 USD) transferidos a tu cuenta, más un viaje para 2 personas.",
    criterio: "Sin restricciones para ascender.",
  },
  {
    n: 3, nombre: "Star Master", icon: "star",
    prerrequisito: "Mínimo 2 Sharon Rose Master en cada pierna.",
    comisionMaestria: "1,2% del total de PV, repartido entre Star Master y las maestrías superiores.",
    promocion: "Aproximadamente $38.000.000 COP (≈ $9.500 USD) transferidos a tu cuenta, más un viaje para 4 personas.",
    criterio: "Debes haber calificado como Sharon Rose Master 3 veces antes de poder ascender a Star Master.",
  },
  {
    n: 4, nombre: "Royal Master", icon: "crown",
    prerrequisito: "Mínimo 2 Star Master en cada pierna.",
    comisionMaestria: "1% del total de PV, repartido entre Royal Master y las maestrías superiores.",
    promocion: "Aproximadamente $190.000.000 COP (≈ $47.500 USD) transferidos a tu cuenta, un viaje para 4 personas, una tarjeta débito de aproximadamente $7.600.000 COP (≈ $1.900 USD) y el alquiler de un automóvil.",
    criterio: "Debes haber calificado como Star Master 3 veces antes de poder ascender a Royal Master.",
  },
  {
    n: 5, nombre: "Crown Master", icon: "award",
    prerrequisito: "Mínimo 2 Royal Master en cada pierna.",
    comisionMaestria: "0,5% del total de PV, repartido entre Crown Master e Imperial Master.",
    promocion: "Aproximadamente $1.150.000.000 COP (≈ $287.500 USD) transferidos a tu cuenta, un viaje para 4 personas, una tarjeta débito de aproximadamente $19.000.000 COP (≈ $4.750 USD) y un automóvil de lujo propio.",
    criterio: "Debes haber calificado como Royal Master 3 veces antes de poder ascender a Crown Master.",
  },
  {
    n: 6, nombre: "Imperial Master", icon: "trophy",
    prerrequisito: "Mínimo 2 Crown Master en cada pierna.",
    comisionMaestria: "0,3% del total de PV, repartido entre los Imperial Master.",
    promocion: "Aproximadamente $3.800.000.000 COP (≈ $950.000 USD) transferidos a tu cuenta, un viaje para 4 personas, una tarjeta débito de aproximadamente $38.000.000 COP (≈ $9.500 USD), un automóvil de lujo propio con chofer, y una oficina con asistente personal.",
    criterio: "Debes haber calificado como Crown Master 3 veces antes de poder ascender a Imperial Master — el rango más alto del plan.",
  },
];

const CRITERIOS_GENERALES = [
  "Una vez alcanzas un rango de Maestría, lo conservas de forma permanente: no hay condiciones para mantenerlo.",
  "No es posible ascender dos niveles de Maestría en un solo período, salvo hasta Diamond Master; de Sharon Rose Master en adelante, el ascenso es siempre de un nivel a la vez.",
  "No hay plazo límite para avanzar — solo necesitas conservar una membresía válida.",
  "La Comisión de Maestría se paga dos veces al mes: el día 15, y también el día 7 después del cierre mensual.",
];

const NOTAS_VALORES = [
  "Viaje para Sharon Rose Master y Star Master: equivale a aprox. $3.817.000 COP (≈ $954 USD) por persona.",
  "Viaje para Royal Master, Crown Master e Imperial Master: equivale a aprox. $15.286.000 COP (≈ $3.822 USD) por persona.",
  "Alquiler del automóvil de Royal Master: equivale a aprox. $3.817.000 COP (≈ $954 USD) mensuales.",
  "Automóvil de lujo de Crown Master: equivale a aprox. $244.288.000 COP (≈ $61.072 USD).",
  "Automóvil de lujo de Imperial Master: equivale a aprox. $297.726.000 COP (≈ $74.432 USD).",
  "Oficina en renta (Imperial Master): equivale a aprox. $9.542.500 COP (≈ $2.386 USD) mensuales.",
  "Asistente personal (Imperial Master): equivale a aprox. $5.725.500 COP (≈ $1.431 USD) mensuales.",
  "Chofer (Imperial Master): equivale a aprox. $7.634.000 COP (≈ $1.909 USD) mensuales.",
  "Todos los valores en dólares son una conversión aproximada de referencia (~4.000 COP por USD) y varían según la TRM real. Los montos oficiales siempre están en pesos colombianos y antes de impuestos.",
];

const CLUBES_EXITO = [
  { nombre: "AutoSales Master", requisito: "Recalificar como Sales Master 12 veces en un año (una vez por quincena, en promedio).", nota: "Equivale a un ingreso aproximado de $8 a $12 millones COP mensuales." },
  { nombre: "Club de Líderes", requisito: "Haber logrado un ingreso anual de $350.000.000 COP.", nota: "" },
  { nombre: "Club de Líderes Royal", requisito: "Haber logrado un ingreso anual de $700.000.000 COP.", nota: "" },
  { nombre: "Club de Líderes Crown", requisito: "Haber logrado un ingreso anual de $1.500.000.000 COP.", nota: "" },
  { nombre: "Club de Líderes Imperial", requisito: "Llegar a ser Imperial Master.", nota: "" },
];

const PAISES_CATALOGO = [
  { id: "CO", label: "Colombia", moneda: "COP", simbolo: "$", locale: "es-CO" },
  { id: "EU", label: "Europa", moneda: "EUR", simbolo: "€", locale: "es-ES" },
  { id: "MX", label: "México", moneda: "MXN", simbolo: "$", locale: "es-MX" },
  { id: "BR", label: "Brasil", moneda: "BRL", simbolo: "R$", locale: "pt-BR" },
  { id: "CA", label: "Canadá", moneda: "CAD", simbolo: "$", locale: "en-CA" },
  { id: "US", label: "Estados Unidos", moneda: "USD", simbolo: "$", locale: "en-US" },
];

const CATALOGO_PRODUCTOS_POR_PAIS = {
  CO: [
  { categoria: "Cuidado de la Salud", nombre: "Hemo Him G", precio: 440000, pv: 70000 },
  { categoria: "Cuidado de la Salud", nombre: "Bióticos", precio: 290000, pv: 30000 },
  { categoria: "Cuidado de la Salud", nombre: "Omega 3", precio: 110000, pv: 10000 },
  { categoria: "Cuidado de la Salud", nombre: "Hierro", precio: 138000, pv: 15000 },
  { categoria: "Cuidado de la Salud", nombre: "Noni (24 sobres)", precio: 295000, pv: 39500 },
  { categoria: "Cuidado de la Salud", nombre: "Noni Cocentrado", precio: 270000, pv: 35000 },
  { categoria: "Cuidado de la Salud", nombre: "Espirulina", precio: 147000, pv: 17000 },
  { categoria: "Cuidado de la Salud", nombre: "Gel de manzana verde", precio: 128000, pv: 15000 },
  { categoria: "Cuidado de la Salud", nombre: "Atomy Psyllium Husk", precio: 135000, pv: 19100 },
  { categoria: "Cuidado de la Piel", nombre: "Protector Solar Essence Sunscreen", precio: 53000, pv: 5000 },
  { categoria: "Cuidado de la Piel", nombre: "Protector Solar Blanco", precio: 39800, pv: 3600 },
  { categoria: "Cuidado de la Piel", nombre: "Atomy Sun Stick", precio: 45500, pv: 4700 },
  { categoria: "Cuidado de la Piel", nombre: "Atomny Absolute Snow Tone-Up Essence", precio: 78000, pv: 9000 },
  { categoria: "Cuidado de la Piel", nombre: "Set 4 pasos", precio: 156600, pv: 14300 },
  { categoria: "Cuidado de la Piel", nombre: "Fom Cleanser (Espuma Limpiadora)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Deep Cleanser (Limpiador Profundo)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Peeling Gel (Exfoliante)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla (Set 4 Pasos)", precio: 39600, pv: 3400 },
  { categoria: "Cuidado de la Piel", nombre: "Set Cuidado THE FAME", precio: 400000, pv: 57200 },
  { categoria: "Cuidado de la Piel", nombre: "Kit de Viaje (6 Piezas)", precio: 91000, pv: 5000 },
  { categoria: "Cuidado de la Piel", nombre: "Crema Nutritiva FAME", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "Lip Glow", precio: 50700, pv: 5300 },
  { categoria: "Cuidado de la Piel", nombre: "Marine Ampoule Eye Patch", precio: 120000, pv: 18000 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla Diaria Especializada", precio: 46000, pv: 4500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Crema Nutritiva", precio: 147800, pv: 20800 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Ampolla", precio: 196000, pv: 28600 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Reset Balm", precio: 95000, pv: 11000 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Skinxare Set x 6", precio: 880000, pv: 130000 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Tóner", precio: 106000, pv: 14600 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Snow Dark-Spot Corrector", precio: 90000, pv: 12000 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Snow Serum Día Paso 2/Noche Paso 3", precio: 139000, pv: 18500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Snow Day Cream Dia Paso 3", precio: 131000, pv: 18500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Snow Night Cream Noche Paso 4", precio: 139000, pv: 19500 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Tónico", precio: 147800, pv: 20800 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Crema Nutritiva - Paso 5", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "Aceite Limpiador", precio: 79300, pv: 8100 },
  { categoria: "Cuidado de la Piel", nombre: "Absolute Suero", precio: 163500, pv: 23400 },
  { categoria: "Cuidado de la Piel", nombre: "Atomy Deep Pure Cleansing Oil", precio: 2350, pv: 10000 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Contorno de Ojos Paso 2", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "Crema BB", precio: 38500, pv: 2800 },
  { categoria: "Cuidado de la Piel", nombre: "Cream Mist", precio: 58000, pv: 8000 },
  { categoria: "Cuidado de la Piel", nombre: "Sistema Cuidado THE FAME", precio: 400000, pv: 57200 },
  { categoria: "Cuidado de la Piel", nombre: "Absolut Loción", precio: 147800, pv: 20800 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Tónico Paso 1", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Loción - Paso 4", precio: 84300, pv: 11700 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Esencia Paso 3", precio: 89400, pv: 12500 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla de Oro 24K", precio: 160000, pv: 23000 },
  { categoria: "Cuidado de la Piel", nombre: "Mascarilla Arcilla Hinoki", precio: 73000, pv: 9700 },
  { categoria: "Cuidado de la Piel", nombre: "Parche para Ojos Hidrogel (60 Parches)", precio: 82000, pv: 10000 },
  { categoria: "Cuidado de la Piel", nombre: "The FAME Trvel Kit (5 Productos)", precio: 180000, pv: 14000 },
  { categoria: "Cuidado Bucal", nombre: "Pasta de Dientes 200g x 5", precio: 71200, pv: 3600 },
  { categoria: "Cuidado Bucal", nombre: "Pasta de Dientes 50g x 4", precio: 23100, pv: 3300 },
  { categoria: "Cuidado Bucal", nombre: "Cepillo de Dientes x 8", precio: 37000, pv: 5300 },
  { categoria: "Cuidado Bucal", nombre: "Cepillo Dental Niños x 8", precio: 48300, pv: 4200 },
  { categoria: "Cuidado Bucal", nombre: "Sistema de cuidado bucal 1 set x 4", precio: 55000, pv: 6500 },
  { categoria: "Cuidado Bucal", nombre: "Spray de Propoleo", precio: 110000, pv: 9500 },
  { categoria: "Cuidado Bucal", nombre: "Pasta Dental Sensitive x 3 Unidades", precio: 48000, pv: 4800 },
  { categoria: "Maquillaje y Labios", nombre: "Adelica Mascara Long-Lash", precio: 64000, pv: 6800 },
  { categoria: "Maquillaje y Labios", nombre: "Adelica Mascara Volumen", precio: 64000, pv: 6800 },
  { categoria: "Maquillaje y Labios", nombre: "Delineador de Cejas", precio: 35000, pv: 4200 },
  { categoria: "Maquillaje y Labios", nombre: "Aceite Limpiador", precio: 79300, pv: 8100 },
  { categoria: "Maquillaje y Labios", nombre: "Desmaquillante Bifásico", precio: 48000, pv: 5000 },
  { categoria: "Maquillaje y Labios", nombre: "Crema BB", precio: 38500, pv: 2800 },
  { categoria: "Cabello y Cuerpo", nombre: "Oleo (Aceite) Esencial Para el Cabello", precio: 49200, pv: 5600 },
  { categoria: "Cabello y Cuerpo", nombre: "Champú Herbal", precio: 53800, pv: 5700 },
  { categoria: "Cabello y Cuerpo", nombre: "Acondicionador Herbal", precio: 53800, pv: 5700 },
  { categoria: "Cabello y Cuerpo", nombre: "Tónico Para el cabello", precio: 56600, pv: 5600 },
  { categoria: "Cabello y Cuerpo", nombre: "Shampoo Proteínas", precio: 80000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Tratamiento Herbal para el Cabello", precio: 29700, pv: 2900 },
  { categoria: "Cabello y Cuerpo", nombre: "Tratamiento Intensivo de Proteina", precio: 60000, pv: 6500 },
  { categoria: "Cabello y Cuerpo", nombre: "Champú Scalpare", precio: 62400, pv: 6200 },
  { categoria: "Cabello y Cuerpo", nombre: "Acondicionador Scalpare", precio: 62400, pv: 6200 },
  { categoria: "Cabello y Cuerpo", nombre: "Set de Viaje (6 cremas)", precio: 91000, pv: 5000 },
  { categoria: "Cabello y Cuerpo", nombre: "Shampoo Absolut Paso 1", precio: 78000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Absolute Tratamiento Paso 2", precio: 78000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Absolute Acondicionador Paso 3", precio: 78000, pv: 8000 },
  { categoria: "Cabello y Cuerpo", nombre: "Gel + Champú Hombres", precio: 70600, pv: 7400 },
  { categoria: "Cabello y Cuerpo", nombre: "Tratamiento Líquido Proteina", precio: 60000, pv: 6500 },
  { categoria: "Cabello y Cuerpo", nombre: "Esencia Rizos", precio: 44000, pv: 5400 },
  { categoria: "Cabello y Cuerpo", nombre: "Limpiador Herbal Para el Cuerpo", precio: 39800, pv: 3500 },
  { categoria: "Cabello y Cuerpo", nombre: "Limpiador Íntimo Unisex", precio: 25000, pv: 2000 },
  { categoria: "Cabello y Cuerpo", nombre: "Loción Corporal", precio: 42400, pv: 3520 },
  { categoria: "Cabello y Cuerpo", nombre: "Limpiador Multiacc. Hombre (Gel Afeitada)", precio: 50000, pv: 5000 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Crema de Manos", precio: 53600, pv: 7400 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Jabón de Manos", precio: 15400, pv: 1100 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Hand Balm Butter", precio: 24000, pv: 2800 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Hand Balm Pure", precio: 24000, pv: 2800 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Hand Balm Marine", precio: 24000, pv: 2800 },
  { categoria: "Cuidado de las Manos y Pies", nombre: "Terapia para manos (4 cremas)", precio: 53605, pv: 6600 },
  { categoria: "Alimentos", nombre: "Café Arabica Black (80 sobres)", precio: 95000, pv: 5200 },
  { categoria: "Alimentos", nombre: "Té Pu'er", precio: 122000, pv: 13600 },
  { categoria: "Alimentos", nombre: "Crema no Láctea (50 sobres)", precio: 53100, pv: 2200 },
  { categoria: "Hogar", nombre: "Scrubber (Esponjas) (4 unidades)", precio: 18500, pv: 1000 },
  { categoria: "Hogar", nombre: "Stainles Scrubber (Esponja alambre/2 unid)", precio: 16900, pv: 750 },
  { categoria: "Hogar", nombre: "Guantes (2 Pares)", precio: 23900, pv: 1300 },
  { categoria: "Hogar", nombre: "Detergente Lavatrastes", precio: 32700, pv: 3400 },
  { categoria: "Hogar", nombre: "Detergente en Polvo", precio: 57700, pv: 4000 },
  { categoria: "Hogar", nombre: "Detergente Líquido para Ropa", precio: 54000, pv: 4800 },
  { categoria: "Hogar", nombre: "Suavizante de Telas", precio: 46200, pv: 3700 },
  { categoria: "Otros", nombre: "Pin Metálico", precio: 46200, pv: 0 },
  { categoria: "Otros", nombre: "Gorra Oficial Atomy", precio: 34000, pv: 0 },
  { categoria: "Otros", nombre: "Bolsa Reutilizable HemoHIM", precio: 4200, pv: 0 },
  { categoria: "Otros", nombre: "Sobre Individual Marine Ampoule", precio: 13000, pv: 1200 },
  { categoria: "Otros", nombre: "Escenario de Vida", precio: 5000, pv: 0 },
  { categoria: "Otros", nombre: "Bolsa Laminada", precio: 1700, pv: 0 },
  { categoria: "Otros", nombre: "Bolsa Multiusos", precio: 2600, pv: 0 },
  ],
  EU: [],
  MX: [],
  BR: [],
  CA: [],
  US: [],
};

const CATALOGO_PRODUCTOS_NOTA = "Catálogo de referencia a partir de tu propia lista — Atomy actualiza sus productos con frecuencia y cada país tiene un catálogo distinto, así que puede estar desfasado. Edita, agrega o elimina productos aquí para mantenerlo al día.";

const CATALOGO_PRODUCTOS_NOTA_VACIO = "Aún no tenemos cargado el catálogo de este país. Toca \"+ Añadir producto\" para empezar a construirlo (o envíale a tu asistente capturas de pantalla de los precios/PV de tu país para cargarlo completo).";

const META_PV_QUINCENA = 2500000;

const MENSAJE_BIENVENIDA =
  "Ya conquistaste Sales Master — esta es tu siguiente montaña. Aquí vas a entender cómo funciona el plan de compensación completo, y a planear quincena a quincena con tu equipo para aprovechar cada punto y no perder ningún ciclaje.";

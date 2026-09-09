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

const META_PV_QUINCENA = 2500000;

const MENSAJE_BIENVENIDA =
  "Ya conquistaste Sales Master — esta es tu siguiente montaña. Aquí vas a entender cómo funciona el plan de compensación completo, y a planear quincena a quincena con tu equipo para aprovechar cada punto y no perder ningún ciclaje.";

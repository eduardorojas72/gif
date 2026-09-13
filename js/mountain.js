/* ---------------------------------------------------------------
   MEDALLONES Y DECORACIÓN — piezas visuales genéricas reutilizadas
   en las tarjetas y cabeceras de Cumbre Master.
--------------------------------------------------------------- */

function medallionHTML(iconName, size, iconColor) {
  size = size || 68;
  const decorado = size >= 40;
  const iconSize = Math.round(size * 0.42);
  const diamonds = decorado
    ? '<span class="diamond d-top"></span><span class="diamond d-bottom"></span>' +
      '<span class="diamond d-left"></span><span class="diamond d-right"></span>'
    : "";
  return (
    '<div class="medallion" style="width:' + size + 'px;height:' + size + 'px">' +
    Icon(iconName, { size: iconSize, color: iconColor || "#fff", stroke: 1.8 }) +
    diamonds +
    "</div>"
  );
}

/* ---------------------------------------------------------------
   TARJETA DE RECONOCIMIENTO — un generador SVG (800x1000) por rango de
   Maestría, reutilizado tanto para la vista en pantalla como para la
   exportación a PNG más abajo, así ambas quedan siempre idénticas.
   Un diseño distinto por cada uno de los 7 rangos (Sales Master →
   Imperial Master), con grandeza visual creciente: más ornamento, más
   brillo y bordes más elaborados a medida que sube el rango. La paleta
   reutiliza los mismos tonos de :root en css/styles.css (no son los
   colores de otra app), y el nombre se escribe con una tipografía
   script incrustada (js/fonts.js) para no depender de Google Fonts al
   exportar la imagen.
--------------------------------------------------------------- */

const CARD_BG = "#0A1B33";
const CARD_BG2 = "#0F2745";
const CARD_CARD = "#123054";
const CARD_GOLD = "#E8B94E";
const CARD_GOLD_LIGHT = "#F7DD8E";
const CARD_GOLD_DEEP = "#A9782A";
const CARD_ACCENT = "#4FA3E3";
const CARD_CREAM = "#F5EFE1";
const CARD_ROSE = "#E8A6C0";

function fontFaceDefsSVG() {
  return "<style>@font-face{font-family:'Cumbre Script';src:url(data:font/ttf;base64," + (typeof ALEX_BRUSH_TTF_B64 !== "undefined" ? ALEX_BRUSH_TTF_B64 : "") + ") format('truetype');}</style>";
}

function cardNameFontSize(nombre) {
  const len = (nombre || "Tu nombre").length;
  if (len <= 13) return 70;
  if (len <= 18) return 58;
  if (len <= 24) return 48;
  return 38;
}

function cardStarPathSVG(cx, cy, r, color) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.42;
    pts.push((cx + Math.cos(ang) * rad).toFixed(1) + "," + (cy + Math.sin(ang) * rad).toFixed(1));
  }
  return '<polygon points="' + pts.join(" ") + '" fill="' + color + '"/>';
}

function cardBokehSVG(cx, cy, rx, ry, count, seed, colors) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const ang = ((seed + i * 53) % 360) * (Math.PI / 180);
    const dist = 0.35 + ((seed + i * 17) % 65) / 100;
    const x = cx + Math.cos(ang) * rx * dist;
    const y = cy + Math.sin(ang) * ry * dist;
    const rad = 5 + (i % 4) * 5;
    const color = colors[i % colors.length];
    const op = (0.15 + (i % 3) * 0.12).toFixed(2);
    out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + rad + '" fill="' + color + '" opacity="' + op + '" filter="url(#cardBlur)"/>';
  }
  return out;
}

function cardPersonGlyphSVG(cx, cy, s, color) {
  return (
    '<circle cx="' + cx + '" cy="' + (cy - s * 0.18) + '" r="' + (s * 0.34) + '" fill="none" stroke="' + color + '" stroke-width="' + (s * 0.1) + '"/>' +
    '<path d="M' + (cx - s * 0.48) + ' ' + (cy + s * 0.55) + ' Q ' + cx + ' ' + (cy - s * 0.02) + ' ' + (cx + s * 0.48) + ' ' + (cy + s * 0.55) + '" fill="none" stroke="' + color + '" stroke-width="' + (s * 0.1) + '" stroke-linecap="round"/>'
  );
}

function cardPhotoCircleSVG(foto, cx, cy, r, ringColor, ringWidth, glow) {
  const clipId = "clipPhoto" + Math.random().toString(36).slice(2, 9);
  const inner = foto
    ? '<clipPath id="' + clipId + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + (r - ringWidth) + '"/></clipPath>' +
      '<image href="' + foto + '" x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + (r * 2) + '" height="' + (r * 2) + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + clipId + ')"/>'
    : '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - ringWidth) + '" fill="rgba(255,255,255,0.07)"/>' + cardPersonGlyphSVG(cx, cy, r * 0.62, "rgba(255,255,255,.55)");
  const glowRing = glow ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 11) + '" fill="none" stroke="' + ringColor + '" stroke-width="2" opacity="0.4"/>' : "";
  return (
    glowRing +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="rgba(255,255,255,0.04)" stroke="' + ringColor + '" stroke-width="' + ringWidth + '"/>' +
    inner
  );
}

function cardRibbonSVG(cx, cy, w, h, fillColor, strokeColor, strokeW, text, textColor, fontSize) {
  const x1 = cx - w / 2, x2 = cx + w / 2, flag = h * 0.5;
  return (
    '<path d="M' + (x1 - flag) + ' ' + (cy - h / 2) + ' L' + x1 + ' ' + cy + ' L' + (x1 - flag) + ' ' + (cy + h / 2) + ' Z" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"/>' +
    '<path d="M' + (x2 + flag) + ' ' + (cy - h / 2) + ' L' + x2 + ' ' + cy + ' L' + (x2 + flag) + ' ' + (cy + h / 2) + ' Z" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"/>' +
    '<rect x="' + x1 + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"/>' +
    '<text x="' + cx + '" y="' + (cy + fontSize * 0.32) + '" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + fontSize + '" font-weight="700" letter-spacing="1.5" fill="' + textColor + '">' + escapeHtml(text.toUpperCase()) + "</text>"
  );
}

/* Coloca un ícono del set propio (js/icons.js) centrado en (cx,cy), del
   tamaño dado. Los trazos de ICON_PATHS están definidos en un viewBox de
   24x24 — en vez de anidar un <svg> (que en Chrome no escala de forma
   fiable cuando la tarjeta completa ya viene reducida por su propio
   viewBox, dejando el ícono enorme y descuadrado), se inserta el trazo
   directamente y se reescala con transform="scale()", igual que el resto
   de la decoración de la tarjeta. */
function cardGlyphSVG(iconName, cx, cy, size, color, stroke) {
  const body = ICON_PATHS[iconName] || "";
  const s = size / 24;
  const tx = cx - 12 * s;
  const ty = cy - 12 * s;
  return (
    '<g transform="translate(' + tx.toFixed(2) + "," + ty.toFixed(2) + ") scale(" + s.toFixed(4) + ')" ' +
    'fill="none" stroke="' + color + '" stroke-width="' + (stroke || 1.6) + '" stroke-linecap="round" stroke-linejoin="round" style="color:' + color + '">' +
    body +
    "</g>"
  );
}

function cardWingedMedallionSVG(cx, cy, scale, iconName) {
  let out = "";
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 5; i++) {
      const len = (66 + i * 15) * scale;
      const y0 = cy - (i - 2) * 6 * scale;
      const x0 = cx + side * 34 * scale;
      const x1 = cx + side * (34 * scale + len * 0.55);
      const y1 = y0 - 20 * scale - i * 3 * scale;
      const x2 = cx + side * (34 * scale + len);
      const y2 = y0 - 2 * scale;
      out += '<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' Q' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" fill="none" stroke="' + CARD_GOLD + '" stroke-width="' + (3 * scale).toFixed(1) + '" stroke-linecap="round" opacity="' + (0.5 + i * 0.1).toFixed(2) + '"/>';
    }
  }
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (46 * scale) + '" fill="url(#cardMedallionGrad)" stroke="' + CARD_GOLD + '" stroke-width="' + (3 * scale) + '"/>';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (35 * scale) + '" fill="none" stroke="' + CARD_GOLD_DEEP + '" stroke-width="' + (1.4 * scale) + '"/>';
  out += cardGlyphSVG(iconName, cx, cy, 34 * scale, "#1B1338", 2.4);
  return out;
}

/* Ramas de laurel simples a cada lado (Crown / Imperial). */
function cardLaurelSVG(cx, cy, side, color) {
  let out = "";
  for (let i = 0; i < 5; i++) {
    const x = cx + side * (30 + i * 16);
    const y = cy - i * 14;
    out += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" rx="11" ry="6" transform="rotate(' + (side * (35 - i * 4)) + " " + x.toFixed(1) + " " + y.toFixed(1) + ')" fill="none" stroke="' + color + '" stroke-width="2" opacity="' + (0.9 - i * 0.12).toFixed(2) + '"/>';
  }
  return out;
}

function cardFooterSVG(cx, y) {
  return (
    '<line x1="' + (cx - 60) + '" y1="' + (y - 26) + '" x2="' + (cx + 60) + '" y2="' + (y - 26) + '" stroke="' + CARD_GOLD + '" stroke-width="1" opacity="0.45"/>' +
    '<text x="' + cx + '" y="' + y + '" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.55)">Camino de Maestría con Atomy</text>'
  );
}

function rangoCardSVGMarkup(nombre, foto, rangoIndex) {
  const rango = RANGOS_MASTER[rangoIndex] || RANGOS_MASTER[0];
  const W = 800, H = 1000, cx = 400;
  const name = nombre || "Tu nombre";
  const nameSize = cardNameFontSize(name);
  const defs =
    "<defs>" +
    fontFaceDefsSVG() +
    '<filter id="cardBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '<radialGradient id="cardMedallionGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="' + CARD_GOLD_LIGHT + '"/><stop offset="100%" stop-color="' + CARD_GOLD_DEEP + '"/></radialGradient>' +
    '<linearGradient id="cardBg0" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + CARD_BG + '"/><stop offset="100%" stop-color="' + CARD_BG2 + '"/></linearGradient>' +
    '<linearGradient id="cardBg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + CARD_BG + '"/><stop offset="55%" stop-color="#173A63"/><stop offset="100%" stop-color="#2A5F9E"/></linearGradient>' +
    '<linearGradient id="cardBg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#150E22"/><stop offset="55%" stop-color="#3C2A4A"/><stop offset="100%" stop-color="#5A3A55"/></linearGradient>' +
    '<linearGradient id="cardBg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + CARD_BG + '"/><stop offset="55%" stop-color="#173A63"/><stop offset="100%" stop-color="#3E6EA8"/></linearGradient>' +
    '<linearGradient id="cardBg4" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A0716"/><stop offset="55%" stop-color="#1E2C55"/><stop offset="100%" stop-color="#3A4E8C"/></linearGradient>' +
    '<linearGradient id="cardBg5" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#050510"/><stop offset="50%" stop-color="#1B1338"/><stop offset="100%" stop-color="#4A2E63"/></linearGradient>' +
    '<linearGradient id="cardBg6" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#040308"/><stop offset="45%" stop-color="#241736"/><stop offset="80%" stop-color="#5A3A1E"/><stop offset="100%" stop-color="#0A0716"/></linearGradient>' +
    '<radialGradient id="cardGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0.35"/><stop offset="100%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="cardGlowRose" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + CARD_ROSE + '" stop-opacity="0.4"/><stop offset="100%" stop-color="' + CARD_ROSE + '" stop-opacity="0"/></radialGradient>' +
    '<radialGradient id="cardSunburst" cx="50%" cy="38%" r="60%"><stop offset="0%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0.5"/><stop offset="100%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0"/></radialGradient>' +
    "</defs>";

  const eyebrow = '<text x="' + cx + '" y="90" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="15" letter-spacing="5" font-weight="700" fill="' + CARD_GOLD + '">CUMBRE MASTER</text>';
  const footer = cardFooterSVG(cx, 955);

  let body = "";

  if (rangoIndex === 0) {
    /* Sales Master: ingreso a la Maestría — tarjeta sobria, azul, un solo borde dorado. */
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg0)" rx="26"/>' +
      cardBokehSVG(cx, 300, 320, 220, 6, 5, [CARD_ACCENT, CARD_GOLD]) +
      '<rect x="18" y="18" width="' + (W - 36) + '" height="' + (H - 36) + '" rx="18" fill="none" stroke="' + CARD_GOLD + '" stroke-width="2"/>' +
      eyebrow +
      cardPhotoCircleSVG(foto, cx, 330, 148, CARD_ACCENT, 4, false) +
      cardGlyphSVG(rango.icon, cx, 545, 54, CARD_GOLD, 1.7) +
      '<text x="' + cx + '" y="' + 640 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 730, 380, 70, "#0D1F38", CARD_GOLD, 2, rango.nombre, CARD_GOLD_LIGHT, 24) +
      footer;
  } else if (rangoIndex === 1) {
    /* Diamond Master: brillo helado + gemas en las 4 esquinas. */
    const gems = [[70, 70], [W - 70, 70], [70, H - 70], [W - 70, H - 70]].map(function (p) {
      return '<rect x="' + (p[0] - 10) + '" y="' + (p[1] - 10) + '" width="20" height="20" rx="3" transform="rotate(45 ' + p[0] + " " + p[1] + ')" fill="' + CARD_GOLD + '" opacity="0.9"/>';
    }).join("");
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg1)" rx="26"/>' +
      cardBokehSVG(cx, 300, 340, 230, 9, 17, ["#BFE0FF", CARD_GOLD_LIGHT]) +
      '<circle cx="' + cx + '" cy="300" r="230" fill="url(#cardGlow)" opacity="0.5"/>' +
      '<rect x="16" y="16" width="' + (W - 32) + '" height="' + (H - 32) + '" rx="20" fill="none" stroke="' + CARD_GOLD + '" stroke-width="2.5"/>' +
      gems +
      eyebrow +
      cardPhotoCircleSVG(foto, cx, 330, 150, "#BFE0FF", 5, true) +
      cardGlyphSVG(rango.icon, cx, 550, 58, "#BFE0FF", 1.7) +
      '<text x="' + cx + '" y="' + 648 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 745, 400, 76, "#0D1F38", CARD_GOLD_LIGHT, 2.5, rango.nombre, CARD_GOLD_LIGHT, 26) +
      footer;
  } else if (rangoIndex === 2) {
    /* Sharon Rose Master: oro + rosa, destellos. */
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg2)" rx="28"/>' +
      '<circle cx="' + cx + '" cy="300" r="250" fill="url(#cardGlowRose)"/>' +
      cardBokehSVG(cx, 300, 340, 240, 11, 23, [CARD_ROSE, CARD_GOLD_LIGHT]) +
      '<rect x="17" y="17" width="' + (W - 34) + '" height="' + (H - 34) + '" rx="22" fill="none" stroke="' + CARD_ROSE + '" stroke-width="2.5"/>' +
      '<rect x="27" y="27" width="' + (W - 54) + '" height="' + (H - 54) + '" rx="18" fill="none" stroke="' + CARD_GOLD + '" stroke-width="1.2" opacity="0.6"/>' +
      eyebrow +
      cardStarPathSVG(cx - 170, 250, 12, CARD_GOLD_LIGHT) +
      cardStarPathSVG(cx + 175, 420, 9, CARD_ROSE) +
      cardPhotoCircleSVG(foto, cx, 340, 152, CARD_ROSE, 5, true) +
      cardGlyphSVG(rango.icon, cx, 562, 58, CARD_GOLD_LIGHT, 1.7) +
      '<text x="' + cx + '" y="' + 660 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 758, 420, 80, "#2A1830", CARD_ROSE, 2.5, rango.nombre, CARD_GOLD_LIGHT, 27) +
      footer;
  } else if (rangoIndex === 3) {
    /* Star Master: medallón estrella grande + rayos dorados. */
    let rayos = "";
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      rayos += '<line x1="' + cx + '" y1="330" x2="' + (cx + Math.cos(a) * 340).toFixed(1) + '" y2="' + (330 + Math.sin(a) * 340).toFixed(1) + '" stroke="' + CARD_GOLD + '" stroke-width="1.4" opacity="0.18"/>';
    }
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg3)" rx="28"/>' +
      rayos +
      cardBokehSVG(cx, 300, 340, 240, 12, 31, [CARD_GOLD, CARD_GOLD_LIGHT]) +
      '<circle cx="' + cx + '" cy="330" r="260" fill="url(#cardGlow)" opacity="0.55"/>' +
      '<rect x="16" y="16" width="' + (W - 32) + '" height="' + (H - 32) + '" rx="20" fill="none" stroke="' + CARD_GOLD + '" stroke-width="3"/>' +
      '<rect x="30" y="30" width="' + (W - 60) + '" height="' + (H - 60) + '" rx="16" fill="none" stroke="' + CARD_GOLD_LIGHT + '" stroke-width="1" opacity="0.55"/>' +
      eyebrow +
      cardPhotoCircleSVG(foto, cx, 340, 152, CARD_GOLD, 5, true) +
      cardStarPathSVG(cx, 570, 36, CARD_GOLD) +
      cardGlyphSVG(rango.icon, cx, 570, 34, "#241736", 2.2) +
      '<text x="' + cx + '" y="' + 675 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 770, 440, 84, "#0D1526", CARD_GOLD_LIGHT, 3, rango.nombre, CARD_GOLD_LIGHT, 28) +
      footer;
  } else if (rangoIndex === 4) {
    /* Royal Master: medallón corona sobre el nombre + doble borde. */
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg4)" rx="30"/>' +
      cardBokehSVG(cx, 300, 340, 240, 12, 41, [CARD_GOLD, "#8FB3E6"]) +
      '<circle cx="' + cx + '" cy="330" r="270" fill="url(#cardGlow)" opacity="0.6"/>' +
      '<rect x="14" y="14" width="' + (W - 28) + '" height="' + (H - 28) + '" rx="22" fill="none" stroke="' + CARD_GOLD + '" stroke-width="3"/>' +
      '<rect x="26" y="26" width="' + (W - 52) + '" height="' + (H - 52) + '" rx="18" fill="none" stroke="' + CARD_GOLD_LIGHT + '" stroke-width="1.4" opacity="0.6"/>' +
      eyebrow +
      cardPhotoCircleSVG(foto, cx, 330, 152, CARD_GOLD, 5, true) +
      cardGlyphSVG("crown", cx, 518, 60, CARD_GOLD, 1.8) +
      '<text x="' + cx + '" y="' + 640 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 735, 440, 84, "#0A0F1E", CARD_GOLD_LIGHT, 3, rango.nombre, CARD_GOLD_LIGHT, 28) +
      '<text x="' + cx + '" y="850" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" letter-spacing="3" fill="rgba(255,255,255,0.55)">MIEMBRO DE LA REALEZA ATOMY</text>' +
      footer;
  } else if (rangoIndex === 5) {
    /* Crown Master: corona más grande + laureles a los lados + brillo violeta-dorado. */
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg5)" rx="30"/>' +
      cardBokehSVG(cx, 300, 350, 250, 14, 53, [CARD_GOLD, CARD_ROSE]) +
      '<circle cx="' + cx + '" cy="330" r="290" fill="url(#cardGlow)" opacity="0.65"/>' +
      '<rect x="12" y="12" width="' + (W - 24) + '" height="' + (H - 24) + '" rx="24" fill="none" stroke="' + CARD_GOLD + '" stroke-width="3.5"/>' +
      '<rect x="26" y="26" width="' + (W - 52) + '" height="' + (H - 52) + '" rx="18" fill="none" stroke="' + CARD_GOLD_LIGHT + '" stroke-width="1.4" opacity="0.7"/>' +
      cardLaurelSVG(cx - 250, 700, -1, CARD_GOLD) +
      cardLaurelSVG(cx + 250, 700, 1, CARD_GOLD) +
      eyebrow +
      cardPhotoCircleSVG(foto, cx, 330, 155, CARD_GOLD, 6, true) +
      cardGlyphSVG("crown", cx, 518, 76, CARD_GOLD, 1.8) +
      '<text x="' + cx + '" y="' + 655 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + (nameSize + 6) + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 752, 460, 88, "#080512", CARD_GOLD_LIGHT, 3.5, rango.nombre, CARD_GOLD_LIGHT, 30) +
      '<text x="' + cx + '" y="865" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" letter-spacing="3" fill="rgba(255,255,255,0.6)">CLUB DE LÍDERES CROWN</text>' +
      footer;
  } else {
    /* Imperial Master: medallón alado + trofeo + sol dorado, la tarjeta más ornamentada. */
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#cardBg6)" rx="30"/>' +
      '<circle cx="' + cx + '" cy="310" r="320" fill="url(#cardSunburst)"/>' +
      cardBokehSVG(cx, 300, 360, 260, 16, 67, [CARD_GOLD, CARD_GOLD_LIGHT, "#FFF3D6"]) +
      '<rect x="10" y="10" width="' + (W - 20) + '" height="' + (H - 20) + '" rx="26" fill="none" stroke="' + CARD_GOLD + '" stroke-width="4"/>' +
      '<rect x="24" y="24" width="' + (W - 48) + '" height="' + (H - 48) + '" rx="20" fill="none" stroke="' + CARD_GOLD_LIGHT + '" stroke-width="1.6" opacity="0.75"/>' +
      '<rect x="38" y="38" width="' + (W - 76) + '" height="' + (H - 76) + '" rx="16" fill="none" stroke="' + CARD_GOLD_DEEP + '" stroke-width="1" opacity="0.55"/>' +
      eyebrow +
      cardPhotoCircleSVG(foto, cx, 320, 158, CARD_GOLD, 6, true) +
      cardWingedMedallionSVG(cx, 555, 1.05, "trophy") +
      '<text x="' + cx + '" y="' + 665 + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + (nameSize + 10) + '" fill="' + CARD_GOLD_LIGHT + '">' + escapeHtml(name) + "</text>" +
      cardRibbonSVG(cx, 762, 480, 92, "#0A0712", CARD_GOLD_LIGHT, 4, rango.nombre, CARD_GOLD, 32) +
      '<text x="' + cx + '" y="880" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" letter-spacing="3.5" fill="rgba(255,255,255,0.65)">EL RANGO MÁS ALTO DEL PLAN</text>' +
      footer;
  }

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' + defs + body + "</svg>";
}

function rangoCardHTML(nombre, foto, rangoIndex) {
  return '<div class="recog-card">' + gemCornersHTML() + rangoCardSVGMarkup(nombre, foto, rangoIndex) + "</div>";
}

/* ---------------------------------------------------------------
   EXPORTACIÓN A PNG — SVG -> <img> -> <canvas> -> PNG, 100% en el cliente
   (sin backend). Misma técnica que el resto de tarjetas de esta familia
   de apps: se dibuja el SVG en un <canvas> oculto y se descarga como PNG.
--------------------------------------------------------------- */

function slugFileCumbre(str) {
  return String(str == null ? "" : str)
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function downloadBlobCumbre(blob, filename) {
  const dlUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = dlUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(dlUrl);
}

/* Genera el PNG y, si el dispositivo lo soporta (Web Share API con
   archivos — la mayoría de móviles), abre directo el panel nativo de
   "Compartir" (WhatsApp, Instagram, etc.) en vez de solo descargar la
   imagen en silencio. Si no hay soporte (la mayoría de escritorio), cae
   en la descarga normal con un aviso claro. */
function svgToPngShareCumbre(svgMarkup, width, height, filename, shareText) {
  const svgBlob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob(function (blob) {
      if (!blob) {
        if (typeof App !== "undefined") App.showToast("No se pudo generar la imagen. Inténtalo de nuevo.");
        return;
      }
      const file = new File([blob], filename, { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: "Cumbre Master", text: shareText }).catch(function (err) {
          if (err && err.name === "AbortError") return;
          downloadBlobCumbre(blob, filename);
          if (typeof App !== "undefined") App.showToast("No se pudo abrir el panel de compartir — se descargó la imagen.");
        });
        return;
      }
      downloadBlobCumbre(blob, filename);
      if (typeof App !== "undefined") App.showToast("Se descargó la imagen — ya puedes adjuntarla donde quieras compartirla.");
    }, "image/png");
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
    if (typeof App !== "undefined") App.showToast("No se pudo generar la imagen. Inténtalo de nuevo.");
  };
  img.src = url;
}

function downloadRangoCard(state, rangoIndex) {
  const rango = RANGOS_MASTER[rangoIndex] || RANGOS_MASTER[0];
  const svg = rangoCardSVGMarkup(state.nombre, state.foto, rangoIndex);
  svgToPngShareCumbre(svg, 800, 1000, "Cumbre-Master-" + slugFileCumbre(rango.nombre) + "-" + slugFileCumbre(state.nombre || "lider") + ".png", "¡Mi rango en Atomy: " + rango.nombre + "! 🚀");
}

/* ---------------------------------------------------------------
   HISTORIA (formato vertical 1080x1920) — la misma tarjeta de
   reconocimiento, enmarcada dentro de un lienzo festivo pensado para
   Instagram/Facebook/WhatsApp Stories. Una vez compartida vía el panel
   nativo, cada red social ofrece su propio editor (música, stickers,
   texto) sobre esta imagen — no reinventamos un editor de audio/video
   aquí, solo entregamos una imagen con el formato y el ánimo correctos
   para que ese editor externo se pueda usar de una vez.
--------------------------------------------------------------- */

function rangoHistoriaSVGMarkup(nombre, foto, rangoIndex) {
  const rango = RANGOS_MASTER[rangoIndex] || RANGOS_MASTER[0];
  const W = 1080, H = 1920, cx = W / 2;
  const cardW = 940, cardH = Math.round((cardW * 1000) / 800);
  const cardX = (W - cardW) / 2;
  const cardY = 340;
  const cardBottom = cardY + cardH;
  const cardSvg = rangoCardSVGMarkup(nombre, foto, rangoIndex).replace(
    'width="100%" height="100%"',
    'x="' + cardX + '" y="' + cardY + '" width="' + cardW + '" height="' + cardH + '"'
  );

  const defs =
    "<defs>" +
    '<linearGradient id="historiaBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#050510"/><stop offset="45%" stop-color="' + CARD_BG + '"/><stop offset="100%" stop-color="#1B1338"/></linearGradient>' +
    '<radialGradient id="historiaGlow" cx="50%" cy="15%" r="55%"><stop offset="0%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0.4"/><stop offset="100%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0"/></radialGradient>' +
    "</defs>";

  const topDecor = cardBokehSVG(cx, 130, 460, 130, 11, 31, [CARD_GOLD, CARD_GOLD_LIGHT, CARD_ACCENT]);
  const bottomDecorCy = cardBottom + (H - cardBottom) * 0.42;
  const bottomDecor = cardBokehSVG(cx, bottomDecorCy, 500, 150, 13, 53, [CARD_GOLD, "#FFF3D6", CARD_ACCENT]);

  const headline =
    '<text x="' + cx + '" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" letter-spacing="6" font-weight="700" fill="' + CARD_GOLD + '">CUMBRE MASTER</text>' +
    '<text x="' + cx + '" y="212" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="54" fill="' + CARD_CREAM + '">¡Nuevo rango alcanzado!</text>' +
    '<text x="' + cx + '" y="256" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="' + CARD_GOLD_LIGHT + '">' + escapeHtml(rango.nombre) + "</text>";

  const captionY1 = cardBottom + 150;
  const captionY2 = captionY1 + 46;
  const caption =
    '<text x="' + cx + '" y="' + captionY1 + '" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" fill="rgba(245,239,225,0.9)">Comparte tu logro y cuéntales cómo lo lograste 🎉</text>' +
    '<text x="' + cx + '" y="' + captionY2 + '" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="3.5" fill="rgba(232,185,78,0.8)">RECORRIDO HACIA EL ÉXITO CON ATOMY</text>';

  return (
    '<svg viewBox="0 0 ' + W + " " + H + '" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    defs +
    '<rect width="' + W + '" height="' + H + '" fill="url(#historiaBg)"/>' +
    '<rect width="' + W + '" height="' + H + '" fill="url(#historiaGlow)"/>' +
    topDecor +
    headline +
    cardSvg +
    bottomDecor +
    caption +
    "</svg>"
  );
}

function downloadRangoHistoria(state, rangoIndex) {
  const rango = RANGOS_MASTER[rangoIndex] || RANGOS_MASTER[0];
  const svg = rangoHistoriaSVGMarkup(state.nombre, state.foto, rangoIndex);
  svgToPngShareCumbre(
    svg, 1080, 1920,
    "Cumbre-Master-Historia-" + slugFileCumbre(rango.nombre) + "-" + slugFileCumbre(state.nombre || "lider") + ".png",
    "¡Nuevo rango alcanzado: " + rango.nombre + "! 🎉 Mi camino con Atomy sigue creciendo."
  );
}

function gemCornersHTML() {
  return '<div class="gem-corners"><span class="g-tl"></span><span class="g-tr"></span><span class="g-bl"></span><span class="g-br"></span></div>';
}

function sectionHeaderHTML(title, desc, iconName, iconColor) {
  return (
    '<div class="section-header">' +
    (iconName ? medallionHTML(iconName, 48, iconColor) : "") +
    '<div><h2>' + escapeHtml(title) + "</h2>" +
    (desc ? '<p>' + escapeHtml(desc) + "</p>" : "") +
    "</div></div>"
  );
}

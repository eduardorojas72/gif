/* ---------------------------------------------------------------
   ESCENA DE MONTAÑA, MEDALLONES Y TARJETA DE RECONOCIMIENTO
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

/* Medallón "Los 8 Pasos": círculo azul oscuro con la silueta sólida de dos
   pies dorados (icono plano, bien perfilado), y encima el icono propio de
   ese paso en blanco. */
function pasoMedallionHTML(themeIconName, size) {
  size = size || 68;
  const footSize = Math.round(size * 0.62);
  const themeSize = Math.round(size * 0.3);
  const diamonds =
    '<span class="diamond d-top"></span><span class="diamond d-bottom"></span>' +
    '<span class="diamond d-left"></span><span class="diamond d-right"></span>';
  return (
    '<div class="medallion blue" style="width:' + size + 'px;height:' + size + 'px">' +
    '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">' +
    Icon("footprints", { size: footSize, color: "var(--gold)" }) +
    "</span>" +
    '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding-top:' + Math.round(size * 0.05) + 'px">' +
    Icon(themeIconName, { size: themeSize, color: "#fff", stroke: 1.9 }) +
    "</span>" +
    diamonds +
    "</div>"
  );
}

/* Medallón de cabecera "Los 8 Pasos al Éxito": dos pies dorados sólidos, más grandes. */
function pasosHeaderMedallionHTML(size) {
  size = size || 64;
  const iconSize = Math.round(size * 0.58);
  const diamonds =
    '<span class="diamond d-top"></span><span class="diamond d-bottom"></span>' +
    '<span class="diamond d-left"></span><span class="diamond d-right"></span>';
  return (
    '<div class="medallion blue" style="width:' + size + 'px;height:' + size + 'px">' +
    Icon("footprints", { size: iconSize, color: "var(--gold)" }) +
    diamonds +
    "</div>"
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

/* ---------------------------------------------------------------
   RADAR DEL ESCENARIO DE VIDA — octágono de 8 ejes (uno por categoría),
   con anillos de nivel 1-4 y marcadores tocables para fijar el avance.
--------------------------------------------------------------- */

function escenarioRadarSVG(categorias, escenario) {
  const cx = 150, cy = 150, Rmax = 82, Rlabel = 106;
  const n = categorias.length;
  const angleOf = (i) => (-90 + i * (360 / n)) * (Math.PI / 180);
  const pt = (i, r) => {
    const a = angleOf(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  let rings = "";
  for (let lvl = 1; lvl <= 4; lvl++) {
    const r = (lvl / 4) * Rmax;
    const pts = categorias.map((c, i) => { const p = pt(i, r); return p.x.toFixed(1) + "," + p.y.toFixed(1); }).join(" ");
    rings += '<polygon points="' + pts + '" fill="none" stroke="var(--border)" stroke-width="1" opacity="' + (lvl === 4 ? 0.5 : 0.28) + '"/>';
  }

  let axes = "";
  categorias.forEach((c, i) => {
    const p = pt(i, Rmax);
    axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p.x.toFixed(1) + '" y2="' + p.y.toFixed(1) + '" stroke="var(--border)" stroke-width="1" opacity="0.4"/>';
  });

  const dataPts = categorias.map((c, i) => {
    const av = (escenario[c.id] && escenario[c.id].avance) || 0;
    const p = pt(i, (av / 4) * Rmax);
    return p.x.toFixed(1) + "," + p.y.toFixed(1);
  }).join(" ");
  const dataPoly = '<polygon points="' + dataPts + '" fill="var(--gold)" fill-opacity="0.22" stroke="var(--gold)" stroke-width="2"/>';

  let markers = "", labels = "";
  categorias.forEach((c, i) => {
    const av = (escenario[c.id] && escenario[c.id].avance) || 0;
    for (let lvl = 1; lvl <= 4; lvl++) {
      const p = pt(i, (lvl / 4) * Rmax);
      const on = lvl <= av;
      markers +=
        '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="7" ' +
        'fill="' + (on ? "var(--gold)" : "var(--card)") + '" stroke="' + (on ? "var(--gold)" : "var(--border)") + '" stroke-width="1.4" ' +
        'data-action="set-escenario-avance" data-cat="' + c.id + '" data-arg="' + lvl + '" style="cursor:pointer"/>';
    }
    const lp = pt(i, Rlabel);
    const cosv = Math.cos(angleOf(i));
    const anchor = cosv > 0.35 ? "start" : cosv < -0.35 ? "end" : "middle";
    labels += '<text x="' + lp.x.toFixed(1) + '" y="' + lp.y.toFixed(1) + '" text-anchor="' + anchor + '" dominant-baseline="middle" font-size="10.5" font-weight="700" fill="var(--text-soft)">' + escapeHtml(c.label) + "</text>";
  });

  return (
    '<svg viewBox="0 0 300 300" width="100%" style="max-width:340px;display:block;margin:0 auto">' +
    rings + axes + dataPoly + markers + labels +
    "</svg>"
  );
}

function mountainSceneHTML(quincenas, cumbreLograda, height) {
  height = height || 190;
  const peak = { x: 160, y: 18 };
  const trail = [
    { x: 40, y: 172 }, { x: 66, y: 148 }, { x: 92, y: 122 },
    { x: 118, y: 96 }, { x: 138, y: 66 }, { x: 152, y: 38 },
  ];
  const pathD = "M" + trail.map((p) => p.x + "," + p.y).join(" L") + " L" + peak.x + "," + peak.y;

  const gid = "mtn" + Math.random().toString(36).slice(2, 8);

  /* Los 6 círculos se rellenan de dorado y muestran un check en cuanto esa
     quincena queda completada (quincenas[i+1] true) — el "encendido" que
     pediste ya ocurre automáticamente aquí. */
  const marcadores = trail.map((p, i) => {
    const done = !!quincenas[i + 1];
    const glow = done ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="9" fill="#F0C468" opacity="0.4"/>' : "";
    const check = done
      ? '<path d="M' + (p.x - 2.3) + ',' + p.y + ' l1.6,1.8 l3,-3.4" stroke="#0A1B33" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      : "";
    return (
      "<g>" + glow +
      '<circle cx="' + p.x + '" cy="' + p.y + '" r="6" fill="' + (done ? "#F0C468" : "rgba(10,27,51,0.6)") + '" stroke="' + (done ? "#FBE7AE" : "#EAF4FF") + '" stroke-width="2" stroke-opacity="' + (done ? 1 : 0.85) + '"/>' +
      check + "</g>"
    );
  }).join("");

  const flagColor = cumbreLograda ? "#F0C468" : "#EAF4FF";
  const flagFill = cumbreLograda ? "#F0C468" : "#4FA3E3";

  const doneCount = Object.values(quincenas).filter(Boolean).length;

  return (
    '<div class="mountain-wrap">' +
    '<svg viewBox="0 0 300 190" width="100%" height="' + height + '" preserveAspectRatio="xMidYMax meet">' +
    "<defs>" +
      '<linearGradient id="vig' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#04070F" stop-opacity="0.05"/>' +
        '<stop offset="55%" stop-color="#04070F" stop-opacity="0.05"/>' +
        '<stop offset="100%" stop-color="#04070F" stop-opacity="0.55"/>' +
      "</linearGradient>" +
    "</defs>" +
    '<rect x="0" y="0" width="300" height="190" fill="url(#vig' + gid + ')"/>' +
    '<path d="' + pathD + '" fill="none" stroke="#F0C468" stroke-opacity="0.8" stroke-width="2.5" stroke-dasharray="1 7" stroke-linecap="round"/>' +
    marcadores +
    '<line x1="' + peak.x + '" y1="' + peak.y + '" x2="' + peak.x + '" y2="' + (peak.y - 22) + '" stroke="' + flagColor + '" stroke-width="2" stroke-opacity="' + (cumbreLograda ? 1 : 0.75) + '"/>' +
    '<path d="M' + peak.x + ',' + (peak.y - 22) + ' L' + (peak.x + 14) + ',' + (peak.y - 17) + ' L' + peak.x + ',' + (peak.y - 12) + ' Z" fill="' + flagFill + '"/>' +
    "</svg>" +
    '<div class="mountain-caption">' + doneCount + " de 6 quincenas conquistadas</div>" +
    "</div>"
  );
}

/* Tarjeta de cada quincena individual: foto de la montaña + un punto que
   asciende más arriba cuantas más quincenas lleves completadas en total
   (0 de 6 = casi a la base, 6 de 6 = casi en la cima). Es el mismo "vas
   aquí" en las 6 páginas de quincena, no algo distinto por cada una. */
function quincenaAscensoHTML(doneCount) {
  const total = 6;
  const frac = Math.max(0, Math.min(1, doneCount / total));
  const topPercent = (88 - frac * 76).toFixed(1);
  return (
    '<div class="quincena-ascenso-wrap">' +
    '<div class="ascenso-marker" style="left:50%;top:' + topPercent + '%"></div>' +
    '<div class="ascenso-caption">Vas en ' + doneCount + " de " + total + " quincenas conquistadas</div>" +
    "</div>"
  );
}

function heroMountainHTML(overlayHtml) {
  const foto = '<img src="img/hero-plan6dias.png" alt="" style="width:100%;height:100%;object-fit:cover;display:block">';
  return (
    '<div class="hero-mountain" id="hero-mountain">' +
    '<div class="hm-layer hm-blur">' + foto + "</div>" +
    '<div class="hm-layer hm-sharp">' + foto + "</div>" +
    '<div class="hm-glow"></div>' +
    '<div class="hm-vignette"></div>' +
    '<div class="hm-hint">' + Icon("sparkles", { size: 11, color: "rgba(255,255,255,.85)" }) + " Mueve el cursor para revelar la cima</div>" +
    (overlayHtml || "") +
    "</div>"
  );
}

/* Mini escena de montaña nocturna (cielo azul + luna + estrellas + silueta
   de picos) — usada como fondo compartido en las tarjetas de las 6
   quincenas del Plan 90 y en las insignias de "6 conquistas" de Logros. */
function campMountainBadgeSVG(dim) {
  return (
    '<img src="img/montana-plan90.png" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;' +
    (dim ? "filter:grayscale(.35);opacity:.7" : "") + '">'
  );
}

function campMedallionHTML(n, desbloqueado) {
  return (
    '<div class="tile-media">' +
    campMountainBadgeSVG(!desbloqueado) +
    '<div style="position:absolute;inset:0;background:' + (desbloqueado ? "linear-gradient(180deg, rgba(10,27,51,0) 45%, rgba(10,27,51,.2) 100%)" : "rgba(5,10,20,.5)") + '"></div>' +
    Icon("tent", { size: 30, color: "#fff", stroke: 1.7 }) +
    '<div style="position:absolute;top:8px;left:8px;width:24px;height:24px;border-radius:999px;background:var(--card);color:var(--text);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">' + n + "</div>" +
    "</div>"
  );
}

/* Insignia de logro para las 6 quincenas ("6 conquistas"), con la misma
   mini escena de montaña de fondo. */
function campLogroChipHTML(titulo, hecho) {
  const flag = hecho ? '<div class="flag">' + Icon("check", { size: 11, color: "#fff" }) + "</div>" : "";
  return (
    '<div class="logro-chip' + (hecho ? " on" : "") + '">' +
    '<div class="logro-badge' + (hecho ? " on" : "") + '" style="background:none">' +
    campMountainBadgeSVG(!hecho) + flag +
    "</div>" +
    '<span class="lc-label">' + escapeHtml(titulo) + "</span></div>"
  );
}

/* ---------------------------------------------------------------
   TARJETA DE RECONOCIMIENTO — un solo generador SVG (800x1000) que
   sirve tanto para la vista en pantalla como para la exportación a
   PNG (share.js), así ambas quedan siempre idénticas. Cinco diseños,
   uno por rango:
     0 Consumidor VIP → fondo azul "brumoso" + título apilado
     1 Miembro Atomy → tarjeta con lazo azul
     2 Agente → misma tarjeta con variación (lazo con filo dorado)
     3 Agente Especial → lazo oscuro con texto e hilo dorados
     4 Sales Master → medallón alado dorado bajo el nombre
   El nombre siempre se escribe con la tipografía script incrustada
   (evita depender de Google Fonts al exportar la imagen).
--------------------------------------------------------------- */

const CARD_GOLD = "#E8B94E";
const CARD_GOLD_LIGHT = "#F6D98A";
const CARD_CREAM = "#F5EFE1";

function fontFaceDefsSVG() {
  return "<style>@font-face{font-family:'Cumbre Script';src:url(data:font/ttf;base64," + ALEX_BRUSH_TTF_B64 + ") format('truetype');}</style>";
}

/* ---------------------------------------------------------------
   TARJETAS DE RANGO CON FOTO REAL — plantillas diseñadas por el equipo
   (img/*.png) que reemplazan el diseño dibujado a mano para los rangos que
   ya tienen foto propia. Cada plantilla trae su propia cinta con un
   "Nombre" de plantilla; se tapa con un parche a juego (dorado o del color
   propio de la cinta, ver maskColor/maskColorLight) antes de escribir
   encima el nombre real del socio, en negrilla y siguiendo la curva de esa
   cinta (arch: cuánto se arquea el nombre hacia arriba en el centro). El
   índice de este array coincide con RANGOS (data.js). */
const RANK_CARD_TEMPLATES = [
  { img: "img/consumidor-vip.png", w: 1080, h: 1920, mask: { x: 190, y: 1160, width: 700, height: 120, rx: 20 }, textY: 1240, textColor: "#173B73", arch: 10 },
  { img: "img/miembro-atomy.png", w: 1080, h: 1920, mask: { x: 230, y: 1150, width: 620, height: 150, rx: 18 }, textY: 1255, textColor: "#1a1a1a", arch: 10 },
  { img: "img/agente.png", w: 1240, h: 1748, mask: { x: 270, y: 1275, width: 700, height: 180, rx: 20 }, textY: 1405, textColor: "#1a1a1a", arch: 12 },
  { img: "img/agente-especial.png", w: 1240, h: 1748, mask: { x: 270, y: 970, width: 700, height: 135, rx: 18 }, textY: 1062, textColor: "#1a1a1a", arch: 10 },
  { img: "img/sales-master.png", w: 1240, h: 1748, mask: { x: 260, y: 1250, width: 720, height: 120, rx: 20 }, textY: 1360, textColor: "#FFFFFF", arch: 34, maskColor: "#0B2050", maskColorLight: "#1E4E9E" },
];

function rankCardNameFontSize(nombre) {
  const len = (nombre || "Tu nombre").length;
  if (len <= 13) return 92;
  if (len <= 18) return 76;
  if (len <= 24) return 62;
  return 50;
}

function rankCardTemplateSVGMarkup(nombre, photoHref, template) {
  const name = safeXml(nombre || "Tu nombre");
  const fontSize = rankCardNameFontSize(nombre);
  const maskColor = template.maskColor || CARD_GOLD;
  const maskColorLight = template.maskColorLight || CARD_GOLD_LIGHT;
  const cx = template.w / 2;
  const half = template.mask.width / 2 - 24;
  const x1 = cx - half, x2 = cx + half;
  const curveId = "nameCurve" + template.textY;
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + template.w + '" height="' + template.h + '" viewBox="0 0 ' + template.w + " " + template.h + '">' +
    fontFaceDefsSVG() +
    '<image href="' + photoHref + '" x="0" y="0" width="' + template.w + '" height="' + template.h + '"/>' +
    '<linearGradient id="rankMask" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0%" stop-color="' + maskColor + '"/><stop offset="50%" stop-color="' + maskColorLight + '"/><stop offset="100%" stop-color="' + maskColor + '"/>' +
    "</linearGradient>" +
    '<rect x="' + template.mask.x + '" y="' + template.mask.y + '" width="' + template.mask.width + '" height="' + template.mask.height + '" rx="' + template.mask.rx + '" fill="url(#rankMask)"/>' +
    '<path id="' + curveId + '" d="M ' + x1 + " " + template.textY + " Q " + cx + " " + (template.textY - template.arch) + " " + x2 + " " + template.textY + '" fill="none"/>' +
    '<text text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-weight="700" font-size="' + fontSize + '" fill="' + template.textColor + '">' +
    '<textPath href="#' + curveId + '" startOffset="50%">' + name + "</textPath>" +
    "</text>" +
    "</svg>"
  );
}

function nameFontSize(nombre) {
  const len = (nombre || "Tu nombre").length;
  if (len <= 13) return 78;
  if (len <= 18) return 64;
  if (len <= 24) return 52;
  return 42;
}

function titleLinesSVG(text) {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return [text.toUpperCase()];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" ").toUpperCase(), words.slice(mid).join(" ").toUpperCase()];
}

function starPathSVG(cx, cy, r, color) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? r : r * 0.42;
    pts.push((cx + Math.cos(ang) * rad).toFixed(1) + "," + (cy + Math.sin(ang) * rad).toFixed(1));
  }
  return '<polygon points="' + pts.join(" ") + '" fill="' + color + '"/>';
}

function bokehSVG(cx, cy, rx, ry, count, seed, colors) {
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

function personGlyphSVG(cx, cy, s, color) {
  return (
    '<circle cx="' + cx + '" cy="' + (cy - s * 0.18) + '" r="' + (s * 0.34) + '" fill="none" stroke="' + color + '" stroke-width="' + (s * 0.1) + '"/>' +
    '<path d="M' + (cx - s * 0.48) + ' ' + (cy + s * 0.55) + ' Q ' + cx + ' ' + (cy - s * 0.02) + ' ' + (cx + s * 0.48) + ' ' + (cy + s * 0.55) + '" fill="none" stroke="' + color + '" stroke-width="' + (s * 0.1) + '" stroke-linecap="round"/>'
  );
}

function photoCircleSVG(foto, nombre, cx, cy, r, ringColor, ringWidth, glow) {
  const clipId = "clipPhoto" + Math.random().toString(36).slice(2, 9);
  const inner = foto
    ? '<clipPath id="' + clipId + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + (r - ringWidth) + '"/></clipPath>' +
      '<image href="' + foto + '" x="' + (cx - r) + '" y="' + (cy - r) + '" width="' + (r * 2) + '" height="' + (r * 2) + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + clipId + ')"/>'
    : '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - ringWidth) + '" fill="rgba(255,255,255,0.07)"/>' + personGlyphSVG(cx, cy, r * 0.62, "rgba(255,255,255,.55)");
  const glowRing = glow ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r + 11) + '" fill="none" stroke="' + ringColor + '" stroke-width="2" opacity="0.4"/>' : "";
  return (
    glowRing +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="rgba(255,255,255,0.04)" stroke="' + ringColor + '" stroke-width="' + ringWidth + '"/>' +
    inner
  );
}

function ribbonSVG(cx, cy, w, h, fillColor, strokeColor, strokeW, text, textColor, fontSize) {
  const x1 = cx - w / 2, x2 = cx + w / 2, flag = h * 0.5;
  return (
    '<path d="M' + (x1 - flag) + ' ' + (cy - h / 2) + ' L' + x1 + ' ' + cy + ' L' + (x1 - flag) + ' ' + (cy + h / 2) + ' Z" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"/>' +
    '<path d="M' + (x2 + flag) + ' ' + (cy - h / 2) + ' L' + x2 + ' ' + cy + ' L' + (x2 + flag) + ' ' + (cy + h / 2) + ' Z" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"/>' +
    '<rect x="' + x1 + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" fill="' + fillColor + '" stroke="' + strokeColor + '" stroke-width="' + strokeW + '"/>' +
    '<text x="' + cx + '" y="' + (cy + fontSize * 0.32) + '" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + fontSize + '" font-weight="700" letter-spacing="1.5" fill="' + textColor + '">' + escapeHtml(text.toUpperCase()) + "</text>"
  );
}

function wingedMedallionSVG(cx, cy, scale) {
  let out = "";
  const featherColor = CARD_GOLD;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 5; i++) {
      const len = (66 + i * 15) * scale;
      const y0 = cy - (i - 2) * 6 * scale;
      const x0 = cx + side * 34 * scale;
      const x1 = cx + side * (34 * scale + len * 0.55);
      const y1 = y0 - 20 * scale - i * 3 * scale;
      const x2 = cx + side * (34 * scale + len);
      const y2 = y0 - 2 * scale;
      out += '<path d="M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' Q' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1) + '" fill="none" stroke="' + featherColor + '" stroke-width="' + (3 * scale).toFixed(1) + '" stroke-linecap="round" opacity="' + (0.5 + i * 0.1).toFixed(2) + '"/>';
    }
  }
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (46 * scale) + '" fill="url(#medallionGrad)" stroke="' + CARD_GOLD + '" stroke-width="' + (3 * scale) + '"/>';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (35 * scale) + '" fill="none" stroke="#8A6420" stroke-width="' + (1.4 * scale) + '"/>';
  out += starPathSVG(cx, cy, 19 * scale, "#8A6420");
  return out;
}

function cardFooterSVG(cx, y) {
  return (
    '<line x1="' + (cx - 60) + '" y1="' + (y - 26) + '" x2="' + (cx + 60) + '" y2="' + (y - 26) + '" stroke="' + CARD_GOLD + '" stroke-width="1" opacity="0.45"/>' +
    '<text x="' + cx + '" y="' + y + '" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.55)">Recorrido hacia el éxito con Atomy</text>'
  );
}

function recogCardSVGMarkup(nombre, foto, rango, pv, rangoIndex) {
  const W = 800, H = 1000, cx = 400;
  const name = nombre || "Tu nombre";
  const nameSize = nameFontSize(name);
  const defs =
    "<defs>" +
    fontFaceDefsSVG() +
    '<filter id="cardBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '<radialGradient id="medallionGrad" cx="35%" cy="30%" r="70%"><stop offset="0%" stop-color="' + CARD_GOLD_LIGHT + '"/><stop offset="100%" stop-color="#B8862E"/></radialGradient>' +
    '<linearGradient id="bgMisty" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A1B33"/><stop offset="55%" stop-color="#153A6B"/><stop offset="100%" stop-color="#1E4E8F"/></linearGradient>' +
    '<linearGradient id="bgRibbon" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0A0E18"/><stop offset="45%" stop-color="#122040"/><stop offset="75%" stop-color="#1B3B6B"/><stop offset="100%" stop-color="#0D1526"/></linearGradient>' +
    '<linearGradient id="bgEspecial" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#050810"/><stop offset="45%" stop-color="#0E2C52"/><stop offset="75%" stop-color="#164A85"/><stop offset="100%" stop-color="#060E1B"/></linearGradient>' +
    '<linearGradient id="bgWinged" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#04060D"/><stop offset="45%" stop-color="#0C2440"/><stop offset="75%" stop-color="#123760"/><stop offset="100%" stop-color="#050A14"/></linearGradient>' +
    '<radialGradient id="glowSoft" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0.35"/><stop offset="100%" stop-color="' + CARD_GOLD_LIGHT + '" stop-opacity="0"/></radialGradient>' +
    "</defs>";

  let body = "";

  if (rangoIndex === 0) {
    /* ---- Consumidor VIP: azul brumoso + título apilado + script ---- */
    const lines = titleLinesSVG(rango);
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#bgMisty)" rx="30"/>' +
      bokehSVG(cx, 300, 380, 260, 8, 11, ["#BFDCFF", "#8FC6F0"]) +
      '<circle cx="620" cy="150" r="220" fill="url(#glowSoft)"/>' +
      '<circle cx="150" cy="700" r="260" fill="url(#glowSoft)"/>' +
      '<rect x="18" y="18" width="' + (W - 36) + '" height="' + (H - 36) + '" rx="22" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>' +
      '<text x="' + cx + '" y="95" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="15" letter-spacing="5" font-weight="700" fill="' + CARD_GOLD + '">CUMBRE 90</text>' +
      lines.map(function (l, i) { return '<text x="' + cx + '" y="' + (168 + i * 52) + '" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" font-size="42" letter-spacing="4" fill="' + CARD_CREAM + '">' + escapeHtml(l) + "</text>"; }).join("") +
      photoCircleSVG(foto, name, cx, 470, 148, "#FFFFFF", 4, false) +
      '<text x="' + cx + '" y="' + (680) + '" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + CARD_CREAM + '">' + escapeHtml(name) + "</text>" +
      (pv ? '<text x="' + cx + '" y="722" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="1" fill="rgba(255,255,255,0.6)">' + escapeHtml(pv) + "</text>" : "") +
      cardFooterSVG(cx, 940);
  } else if (rangoIndex === 4) {
    /* ---- Sales Master: medallón alado bajo el nombre ---- */
    body =
      '<rect width="' + W + '" height="' + H + '" fill="url(#bgWinged)" rx="30"/>' +
      '<circle cx="' + cx + '" cy="330" r="260" fill="url(#glowSoft)"/>' +
      bokehSVG(cx, 320, 320, 260, 10, 33, [CARD_GOLD, "#FFF3D6"]) +
      '<rect x="16" y="16" width="' + (W - 32) + '" height="' + (H - 32) + '" rx="24" fill="none" stroke="' + CARD_GOLD + '" stroke-width="2.5"/>' +
      '<text x="' + cx + '" y="90" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="15" letter-spacing="5" font-weight="700" fill="' + CARD_GOLD + '">CUMBRE 90</text>' +
      photoCircleSVG(foto, name, cx, 330, 150, CARD_GOLD, 5, true) +
      '<text x="' + cx + '" y="565" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + (nameSize + 12) + '" fill="' + CARD_GOLD_LIGHT + '">' + escapeHtml(name) + "</text>" +
      wingedMedallionSVG(cx, 700, 1) +
      ribbonSVG(cx, 805, 320, 56, "#0A0712", CARD_GOLD_LIGHT, 2.5, "Sales Master", CARD_GOLD, 27) +
      (pv ? '<text x="' + cx + '" y="875" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" letter-spacing="1" fill="rgba(255,255,255,0.65)">' + escapeHtml(pv) + "</text>" : "") +
      cardFooterSVG(cx, 955);
  } else {
    /* ---- Representante (1) / Agente (2) / Agente Especial (3): lazo ---- */
    const especial = rangoIndex === 3;
    const agente = rangoIndex === 2;
    const bgFill = especial ? "url(#bgEspecial)" : "url(#bgRibbon)";
    const ringColor = especial ? CARD_GOLD : (agente ? "#BFE0FF" : "#8FC6F0");
    const sideLineColor = especial ? CARD_GOLD : (agente ? CARD_GOLD : "rgba(232,185,78,0.55)");
    const sideLineOpacity = especial ? 0.8 : (agente ? 0.6 : 0.4);
    const ribbonFill = especial ? "#12101F" : (agente ? "#1F4E85" : "#2E6FB8");
    const ribbonStroke = especial ? CARD_GOLD_LIGHT : (agente ? CARD_GOLD_LIGHT : "#BFE0FF");
    const ribbonStrokeW = especial ? 3 : (agente ? 3 : 1.5);
    const ribbonText = especial ? CARD_GOLD : (agente ? CARD_GOLD : "#0B1B33");
    const bokehColors = especial ? [CARD_GOLD, "#FFF3D6"] : (agente ? [CARD_GOLD, "#BFE0FF"] : ["#BFE0FF", "#8FC6F0"]);
    const rankFontSize = especial ? 32 : (agente ? 36 : (rango.length > 20 ? 21 : 27));
    const ribbonGlow = (agente || especial)
      ? '<g filter="url(#cardBlur)" opacity="0.6">' + ribbonSVG(cx, 610, 420, 92, "none", CARD_GOLD_LIGHT, 5, "", "transparent", rankFontSize) + "</g>"
      : "";

    body =
      '<rect width="' + W + '" height="' + H + '" fill="' + bgFill + '" rx="30"/>' +
      '<circle cx="' + cx + '" cy="290" r="240" fill="url(#glowSoft)" opacity="' + (especial ? 0.55 : 0.4) + '"/>' +
      bokehSVG(cx, 300, 280, 240, especial ? 12 : (agente ? 9 : 6), especial ? 71 : (agente ? 41 : 19), bokehColors) +
      '<path d="M120 0 L60 ' + H + '" stroke="' + sideLineColor + '" stroke-width="2" opacity="' + sideLineOpacity + '"/>' +
      '<path d="M150 0 L96 ' + H + '" stroke="' + sideLineColor + '" stroke-width="1.4" opacity="' + (sideLineOpacity * 0.75) + '"/>' +
      '<path d="M680 0 L740 ' + H + '" stroke="' + sideLineColor + '" stroke-width="2" opacity="' + sideLineOpacity + '"/>' +
      '<path d="M650 0 L704 ' + H + '" stroke="' + sideLineColor + '" stroke-width="1.4" opacity="' + (sideLineOpacity * 0.75) + '"/>' +
      '<rect x="20" y="20" width="' + (W - 40) + '" height="' + (H - 40) + '" rx="20" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>' +
      '<text x="700" y="68" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="14" letter-spacing="2" font-weight="700" fill="' + CARD_CREAM + '" opacity="0.85">ATOMY</text>' +
      '<text x="' + cx + '" y="95" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="15" letter-spacing="5" font-weight="700" fill="' + CARD_GOLD + '">CUMBRE 90</text>' +
      photoCircleSVG(foto, name, cx, 340, 150, ringColor, especial ? 5 : 4, especial) +
      (especial ? starPathSVG(cx, 522, 14, CARD_GOLD) : (agente ? starPathSVG(cx - 130, 610, 12, CARD_GOLD) : "")) +
      ribbonGlow +
      ribbonSVG(cx, 610, 420, 92, ribbonFill, ribbonStroke, ribbonStrokeW, rango, ribbonText, rankFontSize) +
      '<text x="' + cx + '" y="730" text-anchor="middle" font-family="\'Cumbre Script\', cursive" font-size="' + nameSize + '" fill="' + (especial ? CARD_GOLD_LIGHT : CARD_CREAM) + '">' + escapeHtml(name) + "</text>" +
      (pv ? '<text x="' + cx + '" y="772" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="1" fill="rgba(255,255,255,0.6)">' + escapeHtml(pv) + "</text>" : "") +
      cardFooterSVG(cx, 940);
  }

  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' + defs + body + "</svg>";
}

function recogCardHTML(nombre, foto, rango, pv, rangoIndex) {
  return '<div class="recog-card">' + recogCardSVGMarkup(nombre, foto, rango, pv, rangoIndex) + "</div>";
}

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

function mountainSceneHTML(quincenas, cumbreLograda, height) {
  height = height || 190;
  const peak = { x: 160, y: 18 };
  const trail = [
    { x: 40, y: 172 }, { x: 66, y: 148 }, { x: 92, y: 122 },
    { x: 118, y: 96 }, { x: 138, y: 66 }, { x: 152, y: 38 },
  ];
  const pathD = "M" + trail.map((p) => p.x + "," + p.y).join(" L") + " L" + peak.x + "," + peak.y;

  const estrellas = [];
  for (let i = 0; i < 46; i++) {
    const sx = (i * 37.3) % 300;
    const sy = (i * 53.7) % 128;
    const sr = 0.5 + ((i * 11) % 10) / 10;
    estrellas.push([sx, sy, sr]);
  }

  const gid = "mtn" + Math.random().toString(36).slice(2, 8);

  const marcadores = trail.map((p, i) => {
    const done = !!quincenas[i + 1];
    const glow = done ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="9" fill="#F0C468" opacity="0.35"/>' : "";
    const check = done
      ? '<path d="M' + (p.x - 2.3) + ',' + p.y + ' l1.6,1.8 l3,-3.4" stroke="#0A1B33" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      : "";
    return (
      "<g>" + glow +
      '<circle cx="' + p.x + '" cy="' + p.y + '" r="6" fill="' + (done ? "#F0C468" : "#0E2440") + '" stroke="' + (done ? "#FBE7AE" : "#4A80B0") + '" stroke-width="2" stroke-opacity="' + (done ? 1 : 0.6) + '"/>' +
      check + "</g>"
    );
  }).join("");

  const flagColor = cumbreLograda ? "#F0C468" : "#BFE0FF";
  const flagFill = cumbreLograda ? "#F0C468" : "#4FA3E3";

  const doneCount = Object.values(quincenas).filter(Boolean).length;

  return (
    '<div class="mountain-wrap">' +
    '<svg viewBox="0 0 300 190" width="100%" height="' + height + '" preserveAspectRatio="xMidYMax meet">' +
    "<defs>" +
      '<linearGradient id="sky' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#04070F"/><stop offset="45%" stop-color="#0A1B33"/>' +
        '<stop offset="75%" stop-color="#123A5E"/><stop offset="100%" stop-color="#1C4E78"/>' +
      "</linearGradient>" +
      '<linearGradient id="peakFill' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" stop-color="#163A5E"/><stop offset="100%" stop-color="#071527"/>' +
      "</linearGradient>" +
      '<radialGradient id="glow' + gid + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#DCEFFF" stop-opacity="0.55"/>' +
        '<stop offset="45%" stop-color="#4FA3E3" stop-opacity="0.25"/>' +
        '<stop offset="100%" stop-color="#4FA3E3" stop-opacity="0"/>' +
      "</radialGradient>" +
      '<radialGradient id="moonGlow' + gid + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#EAF4FF" stop-opacity="0.55"/>' +
        '<stop offset="100%" stop-color="#EAF4FF" stop-opacity="0"/>' +
      "</radialGradient>" +
    "</defs>" +
    '<rect x="0" y="0" width="300" height="190" fill="url(#sky' + gid + ')" rx="14"/>' +
    estrellas.map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#ffffff" opacity="0.85"/>'; }).join("") +
    '<circle cx="42" cy="27" r="20" fill="url(#moonGlow' + gid + ')"/>' +
    '<circle cx="42" cy="27" r="7.5" fill="#EAF4FF"/>' +
    '<circle cx="' + peak.x + '" cy="' + (peak.y + 35) + '" r="80" fill="url(#glow' + gid + ')"/>' +
    '<path d="M-10 150 L30 110 L60 135 L95 95 L130 125 L160 100 L195 130 L230 105 L265 135 L310 115 L310 190 L-10 190 Z" fill="#0F2A4A" opacity="0.5"/>' +
    '<path d="M-10 165 L40 130 L75 155 L115 115 L150 145 L185 120 L220 150 L255 125 L300 155 L310 150 L310 190 L-10 190 Z" fill="#0A1D36" opacity="0.75"/>' +
    '<path d="M-10 150 L15 120 L35 132 L55 95 L72 108 L90 72 L105 85 L122 55 L138 64 L152 28 L160 18 L170 32 L183 50 L198 40 L213 68 L230 58 L248 88 L263 78 L285 112 L310 100 L310 190 L-10 190 Z" fill="url(#peakFill' + gid + ')"/>' +
    '<path d="M152 28 L160 18 L170 32 L183 50 L172 58 L163 48 L153 60 L142 50 Z" fill="#EAF4FF" opacity="0.85"/>' +
    '<path d="M122 55 L138 64 L128 74 L116 66 Z" fill="#EAF4FF" opacity="0.55"/>' +
    '<path d="M-10 172 L10 155 L25 168 L40 150 L55 165 L70 148 L88 168 L105 152 L122 170 L140 150 L158 172 L175 152 L193 170 L210 150 L228 168 L245 152 L263 170 L280 150 L300 165 L310 158 L310 190 L-10 190 Z" fill="#050C18"/>' +
    '<rect x="0" y="176" width="300" height="14" fill="#0A1B33"/>' +
    '<rect x="0" y="176" width="300" height="2" fill="#4FA3E3" opacity="0.3"/>' +
    '<rect x="0" y="182" width="300" height="1.4" fill="#EAF4FF" opacity="0.15"/>' +
    '<path d="' + pathD + '" fill="none" stroke="#F0C468" stroke-opacity="0.6" stroke-width="2.5" stroke-dasharray="1 7" stroke-linecap="round"/>' +
    marcadores +
    '<line x1="' + peak.x + '" y1="' + peak.y + '" x2="' + peak.x + '" y2="' + (peak.y - 22) + '" stroke="' + flagColor + '" stroke-width="2" stroke-opacity="' + (cumbreLograda ? 1 : 0.5) + '"/>' +
    '<path d="M' + peak.x + ',' + (peak.y - 22) + ' L' + (peak.x + 14) + ',' + (peak.y - 17) + ' L' + peak.x + ',' + (peak.y - 12) + ' Z" fill="' + flagFill + '"/>' +
    "</svg>" +
    '<div class="mountain-caption">' + doneCount + " de 6 quincenas conquistadas</div>" +
    "</div>"
  );
}

/* ---------------------------------------------------------------
   MONTAÑA HERO ILUSTRADA — cabecera del Plan de 6 Días.
   Lago alpino + picos nevados + bosque + senderistas, estilo vector
   plano coherente con la identidad dorado/violeta de la app. Se usa
   dos veces (nítida + desenfocada) para el efecto "linterna" que
   sigue al cursor, definido en CSS (.hero-mountain).
--------------------------------------------------------------- */

function mountainHeroSVGMarkup(idSuffix) {
  const g = "mh" + idSuffix;
  const estrellas = [];
  for (let i = 0; i < 90; i++) {
    const sx = (i * 47.3) % 600;
    const sy = (i * 113.7) % 560;
    const sr = 0.5 + ((i * 7) % 10) / 10;
    estrellas.push([sx, sy, sr]);
  }
  return (
    '<svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">' +
    "<defs>" +
      '<linearGradient id="sky' + g + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#03050A"/>' +
        '<stop offset="26%" stop-color="#071B33"/>' +
        '<stop offset="52%" stop-color="#0E3358"/>' +
        '<stop offset="70%" stop-color="#164A78"/>' +
        '<stop offset="80%" stop-color="#1F5E90"/>' +
      '</linearGradient>' +
      '<linearGradient id="lake' + g + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#2A6690"/>' +
        '<stop offset="18%" stop-color="#123A5E"/>' +
        '<stop offset="100%" stop-color="#050C18"/>' +
      '</linearGradient>' +
      '<radialGradient id="sun' + g + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#EAF4FF" stop-opacity="0.85"/>' +
        '<stop offset="45%" stop-color="#4FA3E3" stop-opacity="0.3"/>' +
        '<stop offset="100%" stop-color="#4FA3E3" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<radialGradient id="moon' + g + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#EAF4FF" stop-opacity="0.6"/>' +
        '<stop offset="100%" stop-color="#EAF4FF" stop-opacity="0"/>' +
      '</radialGradient>' +
    "</defs>" +
    '<rect x="0" y="0" width="600" height="800" fill="url(#sky' + g + ')"/>' +
    estrellas.map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#fff" opacity="0.8"/>'; }).join("") +
    '<circle cx="115" cy="118" r="60" fill="url(#moon' + g + ')"/>' +
    '<circle cx="115" cy="118" r="24" fill="#EAF4FF"/>' +
    '<circle cx="360" cy="470" r="150" fill="url(#sun' + g + ')"/>' +
    /* cordilleras lejanas */
    '<path d="M-20 480 L90 360 L180 430 L260 330 L340 420 L420 340 L520 410 L640 350 L640 800 L-20 800 Z" fill="#123055" opacity="0.55"/>' +
    '<path d="M-20 520 L110 400 L220 470 L320 380 L440 460 L560 390 L640 440 L640 800 L-20 800 Z" fill="#0C2140" opacity="0.7"/>' +
    /* pico principal — cara en sombra y cara iluminada */
    '<path d="M300 150 L120 500 L480 500 Z" fill="#0A1A2E"/>' +
    '<path d="M300 150 L210 330 L245 360 L180 460 L235 500 L120 500 Z" fill="#081524"/>' +
    '<path d="M300 150 L370 300 L335 325 L410 430 L360 500 L480 500 Z" fill="#0E2A48"/>' +
    '<path d="M300 150 L246 268 L272 288 L224 372 L262 402 L206 500 L235 500 L300 150 Z" fill="#EAF2FA" opacity="0.92"/>' +
    '<path d="M300 150 L246 268 L272 288 L224 372 L262 402 L206 500 L120 500 L300 150 Z" fill="#6BBBF2" opacity="0.28"/>' +
    /* picos secundarios */
    '<path d="M120 260 L20 500 L220 500 Z" fill="#0E2A48" opacity="0.9"/>' +
    '<path d="M120 260 L86 340 L108 356 L64 440 L96 460 L20 500 L120 260 Z" fill="#DCE9F5" opacity="0.55"/>' +
    '<path d="M470 230 L580 500 L390 500 Z" fill="#0C2140" opacity="0.9"/>' +
    '<path d="M470 230 L500 330 L478 345 L516 430 L486 460 L580 500 L470 230 Z" fill="#DCE9F5" opacity="0.5"/>' +
    /* bosque de pinos en la base */
    '<path d="M-20 560 L20 470 L55 520 L95 440 L130 510 L165 460 L200 520 L235 465 L270 515 L300 470 L330 515 L365 460 L400 520 L435 465 L470 515 L505 450 L545 520 L580 470 L640 550 L640 800 L-20 800 Z" fill="#081524"/>' +
    '<path d="M-20 600 L40 540 L90 580 L150 520 L210 585 L270 535 L330 590 L390 530 L450 585 L510 535 L580 595 L640 545 L640 800 L-20 800 Z" fill="#0C1F38" opacity="0.9"/>' +
    /* lago con reflejo */
    '<rect x="0" y="600" width="600" height="200" fill="url(#lake' + g + ')"/>' +
    '<path d="M180 600 L300 660 L420 600 L470 600 L340 690 L470 780 L440 800 L300 705 L160 800 L130 780 L260 690 L130 600 Z" fill="#040A16" opacity="0.35"/>' +
    '<rect x="0" y="632" width="600" height="3" fill="#EAF4FF" opacity="0.22"/>' +
    '<rect x="0" y="668" width="600" height="2" fill="#EAF4FF" opacity="0.16"/>' +
    '<rect x="0" y="712" width="600" height="2" fill="#EAF4FF" opacity="0.12"/>' +
    '<rect x="0" y="758" width="600" height="2" fill="#EAF4FF" opacity="0.1"/>' +
    /* cabaña con ventanas encendidas junto a la orilla */
    '<circle cx="205" cy="592" r="34" fill="#F0C468" opacity="0.16"/>' +
    '<path d="M182 606 L182 578 L205 560 L228 578 L228 606 Z" fill="#040A16"/>' +
    '<rect x="192" y="586" width="10" height="10" fill="#F6D98A" opacity="0.92"/>' +
    '<rect x="210" y="586" width="10" height="10" fill="#F6D98A" opacity="0.92"/>' +
    /* orilla + senderistas */
    '<path d="M-20 800 L-20 730 Q160 690 300 715 Q440 738 640 700 L640 800 Z" fill="#040A16"/>' +
    '<g fill="#03050A">' +
      '<ellipse cx="284" cy="705" rx="2.6" ry="2.6"/><path d="M282 707 q2 8 -1 15 M286 707 q-2 8 3 14 M284 700 v-9 M284 691 q-6 -3 -9 -1 M284 694 q7 -4 10 -1"/>' +
      '<ellipse cx="304" cy="710" rx="2.4" ry="2.4"/><path d="M302 712 q2 7 -1 13 M306 712 q-1 7 3 12 M304 705 v-8 M304 697 q-5 -3 -8 -1"/>' +
    "</g>" +
    "</svg>"
  );
}

function heroMountainHTML(overlayHtml) {
  return (
    '<div class="hero-mountain" id="hero-mountain">' +
    '<div class="hm-layer hm-blur">' + mountainHeroSVGMarkup("b") + "</div>" +
    '<div class="hm-layer hm-sharp">' + mountainHeroSVGMarkup("a") + "</div>" +
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
  const gid = "cb" + Math.random().toString(36).slice(2, 8);
  const stars = [];
  for (let i = 0; i < 12; i++) {
    stars.push([(i * 23.7) % 100, (i * 17.3) % 42, 0.5 + (i % 3) * 0.3]);
  }
  return (
    '<svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style="position:absolute;inset:0;' + (dim ? "filter:grayscale(.35);opacity:.7" : "") + '">' +
    '<defs><linearGradient id="sky' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#04070F"/><stop offset="55%" stop-color="#0E3358"/><stop offset="100%" stop-color="#1F5E90"/>' +
    "</linearGradient></defs>" +
    '<rect width="100" height="100" fill="url(#sky' + gid + ')"/>' +
    stars.map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#fff" opacity="0.85"/>'; }).join("") +
    '<circle cx="18" cy="16" r="7" fill="#EAF4FF" opacity="0.9"/>' +
    '<path d="M0 68 L14 46 L26 58 L40 34 L52 50 L66 30 L80 52 L92 42 L100 60 L100 100 L0 100 Z" fill="#0A1B33"/>' +
    '<path d="M0 78 L18 58 L34 70 L50 48 L64 66 L82 52 L100 72 L100 100 L0 100 Z" fill="#050C18"/>' +
    '<rect x="0" y="88" width="100" height="12" fill="#0B2038"/>' +
    '<rect x="0" y="88" width="100" height="1.4" fill="#EAF4FF" opacity="0.25"/>' +
    "</svg>"
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
     0 Consumidor Consciente → fondo azul "brumoso" + título apilado
     1 Representante de Ventas → tarjeta con lazo azul
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
    /* ---- Consumidor Consciente: azul brumoso + título apilado + script ---- */
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

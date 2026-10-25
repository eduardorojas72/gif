/* ---------------------------------------------------------------
   MAPA DE SUEÑOS — collage exportable (SVG -> PNG) a partir de las
   8 categorías del Escenario de Vida, con fotos propias del socio.
   Reutiliza el mismo mecanismo que las tarjetas de reconocimiento
   (svgToPngDownload, CARD_GOLD, escapeHtml) definido en share.js /
   mountain.js / state.js.
--------------------------------------------------------------- */

const MAPA_SUENOS_SIZES = {
  horizontal: { w: 2560, h: 1440, label: "Horizontal 16:9" },
  vertical: { w: 1728, h: 2160, label: "Vertical 4:5" },
};

// Reparte las 8 categorías del Escenario de Vida en dos columnas
// alrededor de la foto principal, como en el mapa de muestra.
const MAPA_IZQUIERDA = ["casa", "viajes", "tiempolibre", "donacion"];
const MAPA_DERECHA = ["auto", "familia", "educacion", "negocio"];

function mapaCategoriaImagen(state, id) {
  const esc = state.escenarioVida || {};
  const propia = esc[id] && esc[id].imagen;
  if (propia) return propia;
  // La categoría "familia" usa la foto familiar general si no se subió una específica.
  if (id === "familia") return state.fotoFamilia || null;
  return null;
}

function categoriaIconGlyphSVG(iconName, cx, cy, size, color) {
  const body = (typeof ICON_PATHS !== "undefined" && ICON_PATHS[iconName]) || "";
  const scale = size / 24;
  return (
    '<g transform="translate(' + (cx - size / 2) + "," + (cy - size / 2) + ") scale(" + scale + ')" fill="none" stroke="' +
    color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + body + "</g>"
  );
}

// Foto (o marco vacío con el ícono de la categoría) recortada en
// rectángulo redondeado — versión rectangular de photoCircleSVG.
function photoRectSVG(foto, x, y, w, h, rx, iconName) {
  if (foto) {
    const clipId = "clipRect" + Math.random().toString(36).slice(2, 9);
    return (
      '<clipPath id="' + clipId + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '"/></clipPath>' +
      '<image href="' + foto + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + clipId + ')"/>' +
      '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="none" stroke="' + CARD_GOLD + '" stroke-width="2.5" opacity="0.85"/>'
    );
  }
  const cx = x + w / 2, cy = y + h / 2, iconSize = Math.min(w, h) * 0.34;
  return (
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="rgba(255,255,255,0.06)" stroke="' + CARD_GOLD + '" stroke-width="2" stroke-dasharray="7 7" opacity="0.75"/>' +
    categoriaIconGlyphSVG(iconName, cx, cy, iconSize, "rgba(255,255,255,0.45)")
  );
}

function tileLabelSVG(x, y, w, h, label) {
  const fontSize = Math.max(12, Math.min(w * 0.075, 19));
  return (
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h / 2) + '" fill="rgba(8,10,20,0.74)" stroke="' + CARD_GOLD + '" stroke-width="1.4"/>' +
    '<text x="' + (x + w / 2) + '" y="' + (y + h * 0.66) + '" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + fontSize + '" font-weight="700" letter-spacing="1" fill="' + CARD_GOLD_LIGHT + '">' + escapeHtml(label.toUpperCase()) + "</text>"
  );
}

function mapaTileSVG(cat, imagen, x, y, w, h) {
  const rx = Math.min(w, h) * 0.07;
  const labelH = Math.max(26, h * 0.15);
  const labelW = w * 0.9;
  const labelX = x + (w - labelW) / 2;
  const labelY = y + h - labelH * 0.6;
  return photoRectSVG(imagen, x, y, w, h, rx, cat.icon) + tileLabelSVG(labelX, labelY, labelW, labelH, cat.label);
}

// Cheque personalizado con el nombre del socio y el monto, como
// elemento central del collage.
function chequeSVG(cx, cy, w, h, nombre, monto) {
  const rot = -2.2;
  const x = cx - w / 2, y = cy - h / 2;
  const montoTxt = (monto || "").trim() ? "US$ " + monto : "US$ ____";
  return (
    '<g transform="rotate(' + rot + " " + cx + " " + cy + ')">' +
    '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (h * 0.09) + '" fill="' + CARD_CREAM + '" stroke="' + CARD_GOLD + '" stroke-width="3"/>' +
    '<rect x="' + (x + h * 0.08) + '" y="' + (y + h * 0.08) + '" width="' + (w - h * 0.16) + '" height="' + (h - h * 0.16) + '" rx="' + (h * 0.05) + '" fill="none" stroke="' + CARD_GOLD + '" stroke-width="1" opacity="0.5"/>' +
    '<text x="' + (x + w * 0.07) + '" y="' + (y + h * 0.34) + '" font-family="Arial, sans-serif" font-size="' + (h * 0.13) + '" fill="#6B4F1D">Pagúese a</text>' +
    '<text x="' + (x + w * 0.07) + '" y="' + (y + h * 0.64) + '" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + (h * 0.23) + '" font-weight="700" fill="#241A06">' + escapeHtml(nombre || "Tu nombre") + "</text>" +
    '<text x="' + (x + w * 0.93) + '" y="' + (y + h * 0.89) + '" text-anchor="end" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + (h * 0.28) + '" font-weight="700" fill="#1B5E3C">' + escapeHtml(montoTxt) + "</text>" +
    "</g>"
  );
}

function starsFieldSVG(W, H, count, seed) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = (((seed + i * 97) % 1000) / 1000) * W;
    const y = (((seed + i * 53) % 1000) / 1000) * H * 0.55;
    const r = 1 + (i % 3) * 0.8;
    const op = (0.22 + (i % 5) * 0.12).toFixed(2);
    out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + r + '" fill="#FFFFFF" opacity="' + op + '"/>';
  }
  return out;
}

// Reparte el título en hasta `maxLines` líneas, estimando el ancho
// por cantidad de caracteres (sin medir texto real, como el resto
// de las tarjetas SVG de esta app).
function wrapTextLines(text, maxChars, maxLines) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let cur = "";
  words.forEach(function (w) {
    const next = cur ? cur + " " + w : w;
    if (next.length > maxChars && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  });
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    const extra = lines.slice(maxLines - 1).join(" ");
    lines.length = maxLines - 1;
    lines.push(extra.length > maxChars ? extra.slice(0, maxChars - 1) + "…" : extra);
  }
  return lines;
}

function computeMapaLayout(W, H) {
  const vertical = H > W;
  const marginX = W * 0.035;
  const marginY = H * 0.045;
  const titleTop = marginY;
  const titleBottom = marginY + H * (vertical ? 0.1 : 0.13);
  const contentTop = titleBottom + H * 0.035;
  const contentBottom = H - marginY - H * 0.035;
  const contentH = contentBottom - contentTop;
  const columnW = W * (vertical ? 0.27 : 0.205);
  const gapCol = W * 0.018;
  const heroX = marginX + columnW + gapCol;
  const heroW = W - 2 * marginX - 2 * columnW - 2 * gapCol;
  const rows = 4;
  const rowGap = contentH * 0.025;
  const tileH = (contentH - (rows - 1) * rowGap) / rows;
  return {
    marginX: marginX, marginY: marginY, titleTop: titleTop, titleBottom: titleBottom,
    contentTop: contentTop, contentH: contentH,
    hero: { x: heroX, y: contentTop, w: heroW, h: contentH },
    left: { x: marginX, w: columnW },
    right: { x: W - marginX - columnW, w: columnW },
    tileH: tileH,
    rowY: function (i) { return contentTop + i * (tileH + rowGap); },
  };
}

function mapaSuenosSVGMarkup(state, variant) {
  const size = MAPA_SUENOS_SIZES[variant] || MAPA_SUENOS_SIZES.horizontal;
  const W = size.w, H = size.h;
  const L = computeMapaLayout(W, H);
  const catById = {};
  ESCENARIO_CATEGORIAS.forEach(function (c) { catById[c.id] = c; });

  const tituloTxt = (state.mapaSuenosTitulo || "").trim() ||
    "Gracias por permitirme alcanzar mis sueños y ayudar a más personas a lograrlo";
  const tituloLines = wrapTextLines(tituloTxt, Math.floor(W / 34), 2);
  const tituloFontSize = Math.round(H * 0.028);
  const titleY0 = L.titleTop + tituloFontSize;
  const titleSVG = tituloLines.map(function (line, i) {
    return '<text x="' + (W / 2) + '" y="' + (titleY0 + i * tituloFontSize * 1.25) + '" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + tituloFontSize + '" font-weight="700" fill="' + CARD_CREAM + '">' + escapeHtml(line) + "</text>";
  }).join("");

  let tiles = "";
  MAPA_IZQUIERDA.forEach(function (id, i) {
    tiles += mapaTileSVG(catById[id], mapaCategoriaImagen(state, id), L.left.x, L.rowY(i), L.left.w, L.tileH);
  });
  MAPA_DERECHA.forEach(function (id, i) {
    tiles += mapaTileSVG(catById[id], mapaCategoriaImagen(state, id), L.right.x, L.rowY(i), L.right.w, L.tileH);
  });

  const heroImg = photoRectSVG(state.foto, L.hero.x, L.hero.y, L.hero.w, L.hero.h, Math.min(L.hero.w, L.hero.h) * 0.035, "user-badge");
  const chequeW = L.hero.w * 0.86, chequeH = L.hero.h * 0.145;
  const chequeCx = L.hero.x + L.hero.w / 2, chequeCy = L.hero.y + L.hero.h * 0.64;
  const cheque = chequeSVG(chequeCx, chequeCy, chequeW, chequeH, state.nombre, state.mapaSuenosMonto);

  const badgeTxt = "MI MAPA · " + (state.mapaSuenosVigencia || "1 año").toUpperCase();
  const badge =
    '<rect x="' + (W / 2 - W * 0.09) + '" y="' + (L.titleBottom - H * 0.012) + '" width="' + (W * 0.18) + '" height="' + (H * 0.032) + '" rx="' + (H * 0.016) + '" fill="rgba(232,185,78,0.14)" stroke="' + CARD_GOLD + '" stroke-width="1.5"/>' +
    '<text x="' + (W / 2) + '" y="' + (L.titleBottom + H * 0.011) + '" text-anchor="middle" font-family="\'Space Grotesk\', Arial, sans-serif" font-size="' + (H * 0.016) + '" font-weight="700" letter-spacing="1.5" fill="' + CARD_GOLD_LIGHT + '">' + escapeHtml(badgeTxt) + "</text>";

  const footerFontSize = Math.round(H * 0.013);
  const footer =
    '<line x1="' + (W / 2 - W * 0.06) + '" y1="' + (H - L.marginY * 0.75) + '" x2="' + (W / 2 + W * 0.06) + '" y2="' + (H - L.marginY * 0.75) + '" stroke="' + CARD_GOLD + '" stroke-width="1" opacity="0.45"/>' +
    '<text x="' + (W / 2) + '" y="' + (H - L.marginY * 0.35) + '" text-anchor="middle" font-family="Arial, sans-serif" font-size="' + footerFontSize + '" fill="rgba(255,255,255,0.55)">Recorrido hacia el éxito con Atomy</text>';

  const defs =
    "<defs>" +
    '<linearGradient id="mapaBg" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#050A16"/><stop offset="55%" stop-color="#0E2242"/><stop offset="100%" stop-color="#163A63"/>' +
    "</linearGradient>" +
    "</defs>";

  const bg = '<rect width="' + W + '" height="' + H + '" fill="url(#mapaBg)"/>' + starsFieldSVG(W, H, 70, 17);

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + " " + H + '">' +
    defs + bg + titleSVG + badge + tiles + heroImg + cheque + footer +
    "</svg>"
  );
}

function downloadMapaSuenos(state, variant) {
  const size = MAPA_SUENOS_SIZES[variant] || MAPA_SUENOS_SIZES.horizontal;
  const svg = mapaSuenosSVGMarkup(state, variant);
  svgToPngDownload(svg, size.w, size.h, "Cumbre90-Mapa-de-Suenos-" + variant + "-" + slugFile(state.nombre || "socio") + ".png");
}

// Abre el mismo modal de "Compartir" que el resto de tarjetas-imagen
// (WhatsApp de tu patrocinador, Instagram, Facebook, TikTok...).
function shareMapaSuenos(state, variant) {
  const size = MAPA_SUENOS_SIZES[variant] || MAPA_SUENOS_SIZES.horizontal;
  const svg = mapaSuenosSVGMarkup(state, variant);
  const texto = (state.nombre ? state.nombre + ": " : "") + "Así visualizo mis metas en mi recorrido con Atomy. 🏔️✨";
  svgToPngShare(svg, size.w, size.h, "Cumbre90-Mapa-de-Suenos-" + variant + "-" + slugFile(state.nombre || "socio") + ".png", texto);
}

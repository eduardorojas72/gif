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

/* Medallón "Los 8 Pasos": círculo azul oscuro con la silueta de un pie
   en contorno dorado, y dentro el icono propio de ese paso. */
function pasoMedallionHTML(themeIconName, size) {
  size = size || 68;
  const footSize = Math.round(size * 0.72);
  const themeSize = Math.round(size * 0.3);
  const diamonds =
    '<span class="diamond d-top"></span><span class="diamond d-bottom"></span>' +
    '<span class="diamond d-left"></span><span class="diamond d-right"></span>';
  return (
    '<div class="medallion blue" style="width:' + size + 'px;height:' + size + 'px">' +
    '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">' +
    Icon("footprint-outline", { size: footSize, color: "var(--gold)", stroke: 1.4 }) +
    "</span>" +
    '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding-top:' + Math.round(size * 0.08) + 'px">' +
    Icon(themeIconName, { size: themeSize, color: "#fff", stroke: 1.9 }) +
    "</span>" +
    diamonds +
    "</div>"
  );
}

/* Medallón de cabecera "Los 8 Pasos al Éxito": dos pies en contorno dorado. */
function pasosHeaderMedallionHTML(size) {
  size = size || 64;
  const iconSize = Math.round(size * 0.48);
  const diamonds =
    '<span class="diamond d-top"></span><span class="diamond d-bottom"></span>' +
    '<span class="diamond d-left"></span><span class="diamond d-right"></span>';
  return (
    '<div class="medallion blue" style="width:' + size + 'px;height:' + size + 'px">' +
    Icon("footprints-outline", { size: iconSize, color: "var(--gold)", stroke: 1.4 }) +
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
  const peak = { x: 160, y: 20 };
  const trail = [
    { x: 40, y: 172 }, { x: 66, y: 148 }, { x: 92, y: 122 },
    { x: 118, y: 96 }, { x: 138, y: 66 }, { x: 152, y: 38 },
  ];
  const pathD = "M" + trail.map((p) => p.x + "," + p.y).join(" L") + " L" + peak.x + "," + peak.y;
  const estrellas = [
    [20, 20, 1], [50, 12, 0.8], [90, 8, 1.1], [130, 15, 0.7], [200, 10, 1],
    [230, 22, 0.8], [260, 14, 1.2], [280, 30, 0.7], [15, 45, 0.7], [270, 50, 0.9],
    [245, 40, 0.6], [60, 35, 0.6], [190, 30, 0.7], [110, 42, 0.6],
  ];
  const gid = "mtn" + Math.random().toString(36).slice(2, 8);

  const marcadores = trail.map((p, i) => {
    const done = !!quincenas[i + 1];
    const glow = done ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="9" fill="#F0C468" opacity="0.35"/>' : "";
    const check = done
      ? '<path d="M' + (p.x - 2.3) + ',' + p.y + ' l1.6,1.8 l3,-3.4" stroke="#2A1B4A" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      : "";
    return (
      "<g>" + glow +
      '<circle cx="' + p.x + '" cy="' + p.y + '" r="6" fill="' + (done ? "#F0C468" : "#20153F") + '" stroke="' + (done ? "#FBE7AE" : "#7A5FBF") + '" stroke-width="2" stroke-opacity="' + (done ? 1 : 0.6) + '"/>' +
      check + "</g>"
    );
  }).join("");

  const flagColor = cumbreLograda ? "#F0C468" : "#C9B8F0";
  const flagFill = cumbreLograda ? "#F0C468" : "#8B6CFF";

  const doneCount = Object.values(quincenas).filter(Boolean).length;

  return (
    '<div class="mountain-wrap">' +
    '<svg viewBox="0 0 300 190" width="100%" height="' + height + '" preserveAspectRatio="xMidYMax meet">' +
    "<defs>" +
    '<linearGradient id="sky' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#0A0716"/><stop offset="42%" stop-color="#241454"/>' +
    '<stop offset="74%" stop-color="#5B2E86"/><stop offset="100%" stop-color="#9D5FB0"/></linearGradient>' +
    '<radialGradient id="glow' + gid + '" cx="50%" cy="50%" r="50%">' +
    '<stop offset="0%" stop-color="#FBE7AE" stop-opacity="0.9"/>' +
    '<stop offset="45%" stop-color="#B98CE8" stop-opacity="0.4"/>' +
    '<stop offset="100%" stop-color="#B98CE8" stop-opacity="0"/></radialGradient>' +
    "</defs>" +
    '<rect x="0" y="0" width="300" height="190" fill="url(#sky' + gid + ')" rx="14"/>' +
    estrellas.map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#ffffff" opacity="0.8"/>'; }).join("") +
    '<circle cx="' + peak.x + '" cy="' + (peak.y + 30) + '" r="85" fill="url(#glow' + gid + ')"/>' +
    '<path d="M-10 190 L40 120 L90 165 L130 105 L170 160 L210 110 L260 150 L310 120 L310 190 Z" fill="#1B1038" opacity="0.55"/>' +
    '<path d="M-10 190 L60 145 L120 178 L190 130 L250 175 L310 140 L310 190 Z" fill="#150C2C" opacity="0.75"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x - 62) + ' 190 L' + (peak.x + 6) + ' 190 Z" fill="#150C2C"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x + 58) + ' 190 L' + (peak.x - 4) + ' 190 Z" fill="#241947"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x - 20) + ' 78 L' + (peak.x - 4) + ' 92 L' + (peak.x - 30) + ' 118 L' + (peak.x - 10) + ' 132 L' + (peak.x - 44) + ' 190 L' + (peak.x - 4) + ' 190 Z" fill="#F3DFA6" opacity="0.85"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x - 10) + ' 132 L' + (peak.x - 30) + ' 118 L' + (peak.x - 4) + ' 92 L' + (peak.x - 20) + ' 78 Z" fill="#C9A0F0" opacity="0.55"/>' +
    '<path d="M0 190 L40 130 L80 190 Z" fill="#150C2C" opacity="0.85"/>' +
    '<path d="M210 190 L250 125 L300 190 Z" fill="#150C2C" opacity="0.85"/>' +
    '<path d="' + pathD + '" fill="none" stroke="#F0C468" stroke-opacity="0.55" stroke-width="2.5" stroke-dasharray="1 7" stroke-linecap="round"/>' +
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
        '<stop offset="0%" stop-color="#0A0716"/>' +
        '<stop offset="26%" stop-color="#271650"/>' +
        '<stop offset="52%" stop-color="#6B3F8F"/>' +
        '<stop offset="70%" stop-color="#C98F6E"/>' +
        '<stop offset="80%" stop-color="#F3DFA6"/>' +
      '</linearGradient>' +
      '<linearGradient id="lake' + g + '" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#E8C27E"/>' +
        '<stop offset="18%" stop-color="#7A4F86"/>' +
        '<stop offset="100%" stop-color="#180F30"/>' +
      '</linearGradient>' +
      '<radialGradient id="sun' + g + '" cx="50%" cy="50%" r="50%">' +
        '<stop offset="0%" stop-color="#FDF0C8" stop-opacity="0.95"/>' +
        '<stop offset="45%" stop-color="#F0C468" stop-opacity="0.4"/>' +
        '<stop offset="100%" stop-color="#F0C468" stop-opacity="0"/>' +
      '</radialGradient>' +
    "</defs>" +
    '<rect x="0" y="0" width="600" height="800" fill="url(#sky' + g + ')"/>' +
    estrellas.map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#fff" opacity="0.75"/>'; }).join("") +
    '<circle cx="360" cy="470" r="150" fill="url(#sun' + g + ')"/>' +
    /* cordilleras lejanas */
    '<path d="M-20 480 L90 360 L180 430 L260 330 L340 420 L420 340 L520 410 L640 350 L640 800 L-20 800 Z" fill="#2A1B52" opacity="0.55"/>' +
    '<path d="M-20 520 L110 400 L220 470 L320 380 L440 460 L560 390 L640 440 L640 800 L-20 800 Z" fill="#1D1140" opacity="0.7"/>' +
    /* pico principal — cara en sombra y cara iluminada */
    '<path d="M300 150 L120 500 L480 500 Z" fill="#1B1030"/>' +
    '<path d="M300 150 L210 330 L245 360 L180 460 L235 500 L120 500 Z" fill="#150C2A"/>' +
    '<path d="M300 150 L370 300 L335 325 L410 430 L360 500 L480 500 Z" fill="#241947"/>' +
    '<path d="M300 150 L246 268 L272 288 L224 372 L262 402 L206 500 L235 500 L300 150 Z" fill="#F3E9D0" opacity="0.92"/>' +
    '<path d="M300 150 L246 268 L272 288 L224 372 L262 402 L206 500 L120 500 L300 150 Z" fill="#B98CE8" opacity="0.28"/>' +
    /* picos secundarios */
    '<path d="M120 260 L20 500 L220 500 Z" fill="#241947" opacity="0.9"/>' +
    '<path d="M120 260 L86 340 L108 356 L64 440 L96 460 L20 500 L120 260 Z" fill="#E9D9B8" opacity="0.55"/>' +
    '<path d="M470 230 L580 500 L390 500 Z" fill="#1D1140" opacity="0.9"/>' +
    '<path d="M470 230 L500 330 L478 345 L516 430 L486 460 L580 500 L470 230 Z" fill="#E9D9B8" opacity="0.5"/>' +
    /* bosque de pinos en la base */
    '<path d="M-20 560 L20 470 L55 520 L95 440 L130 510 L165 460 L200 520 L235 465 L270 515 L300 470 L330 515 L365 460 L400 520 L435 465 L470 515 L505 450 L545 520 L580 470 L640 550 L640 800 L-20 800 Z" fill="#150C2A"/>' +
    '<path d="M-20 600 L40 540 L90 580 L150 520 L210 585 L270 535 L330 590 L390 530 L450 585 L510 535 L580 595 L640 545 L640 800 L-20 800 Z" fill="#1B1136" opacity="0.9"/>' +
    /* lago con reflejo */
    '<rect x="0" y="600" width="600" height="200" fill="url(#lake' + g + ')"/>' +
    '<path d="M180 600 L300 660 L420 600 L470 600 L340 690 L470 780 L440 800 L300 705 L160 800 L130 780 L260 690 L130 600 Z" fill="#0F0924" opacity="0.35"/>' +
    '<rect x="0" y="632" width="600" height="3" fill="#FDF0C8" opacity="0.22"/>' +
    '<rect x="0" y="668" width="600" height="2" fill="#FDF0C8" opacity="0.16"/>' +
    '<rect x="0" y="712" width="600" height="2" fill="#FDF0C8" opacity="0.12"/>' +
    '<rect x="0" y="758" width="600" height="2" fill="#FDF0C8" opacity="0.1"/>' +
    /* orilla + senderistas */
    '<path d="M-20 800 L-20 730 Q160 690 300 715 Q440 738 640 700 L640 800 Z" fill="#0F0924"/>' +
    '<g fill="#0A0716">' +
      '<ellipse cx="284" cy="705" rx="2.6" ry="2.6"/><path d="M282 707 q2 8 -1 15 M286 707 q-2 8 3 14 M284 700 v-9 M284 691 q-6 -3 -9 -1 M284 694 q7 -4 10 -1"/>' +
      '<ellipse cx="304" cy="710" rx="2.4" ry="2.4"/><path d="M302 712 q2 7 -1 13 M306 712 q-1 7 3 12 M304 705 v-8 M304 697 q-5 -3 -8 -1"/>' +
    "</g>" +
    "</svg>"
  );
}

function heroMountainHTML(overlayHtml) {
  return (
    '<div class="hero-mountain" id="hero-mountain">' +
    '<div class="hm-layer hm-sharp">' + mountainHeroSVGMarkup("a") + "</div>" +
    '<div class="hm-layer hm-blur">' + mountainHeroSVGMarkup("b") + "</div>" +
    '<div class="hm-vignette"></div>' +
    '<div class="hm-hint">' + Icon("sparkles", { size: 11, color: "rgba(255,255,255,.85)" }) + " Mueve el cursor para revelar la cima</div>" +
    (overlayHtml || "") +
    "</div>"
  );
}

function campMedallionHTML(n, desbloqueado) {
  const bg = desbloqueado
    ? "radial-gradient(circle at 30% 25%, var(--gold), var(--accent) 55%, var(--text) 100%)"
    : "radial-gradient(circle at 30% 25%, var(--accent-soft), var(--accent) 70%)";
  return (
    '<div class="tile-media" style="background:' + bg + ';opacity:' + (desbloqueado ? 1 : 0.85) + '">' +
    '<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%;opacity:.35">' +
    '<path d="M0 100 L25 55 L45 78 L65 40 L85 70 L100 55 L100 100 Z" fill="#fff"/></svg>' +
    Icon("tent", { size: 32, color: "#fff", stroke: 1.7 }) +
    '<div style="position:absolute;top:8px;left:8px;width:24px;height:24px;border-radius:999px;background:var(--card);color:var(--text);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">' + n + "</div>" +
    "</div>"
  );
}

const TIER_BG = {
  1: ["#1E1640", "#2B1E52"],
  2: ["#170F32", "#3A2564"],
  3: ["#0F0A24", "#4A2A6E"],
};

function recogCardHTML(nombre, foto, rango, pv, tier) {
  tier = tier || 1;
  const gold = "#E8B94E";
  const bg = TIER_BG[tier];
  const bokehCount = tier === 3 ? 10 : tier === 2 ? 6 : 3;
  let bokeh = "";
  for (let i = 0; i < bokehCount; i++) {
    const left = 8 + ((i * 41) % 84);
    const top = 6 + ((i * 29) % 26);
    const size = 4 + (i % 3) * 3;
    bokeh += '<div style="position:absolute;left:' + left + '%;top:' + top + '%;width:' + size + 'px;height:' + size + 'px;background:' + gold + ';border-radius:999px;filter:blur(2px);opacity:.4"></div>';
  }
  const lines = tier >= 2
    ? '<div style="position:absolute;top:0;bottom:0;left:14%;width:2px;background:' + gold + ';opacity:.45;transform:skewX(-9deg)"></div>' +
      '<div style="position:absolute;top:0;bottom:0;right:14%;width:2px;background:' + gold + ';opacity:.45;transform:skewX(-9deg)"></div>'
    : "";
  const corners = ['top:12px;left:12px', 'top:12px;right:12px', 'bottom:12px;left:12px', 'bottom:12px;right:12px']
    .map(function (pos) { return '<div style="position:absolute;' + pos + ';width:8px;height:8px;background:' + gold + ';transform:rotate(45deg);border-radius:2px"></div>'; })
    .join("");
  const topIcon = tier === 3
    ? Icon("crown", { size: 24, color: gold, stroke: 1.8 })
    : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 19L9 7L13 14L16 9L22 19H2Z" fill="' + gold + '"/></svg>';
  const avatarInner = foto
    ? '<img src="' + foto + '" alt="' + escapeHtml(nombre) + '"/>'
    : Icon("user-badge", { size: 44, color: "#F5DFA0", stroke: 1.8 });

  return (
    '<div class="recog-card" style="background:linear-gradient(160deg, ' + bg[0] + ' 0%, ' + bg[1] + ' 100%);border-color:' + gold + '">' +
    lines + bokeh + corners +
    topIcon +
    '<span class="kicker">Cumbre 90</span>' +
    '<div class="avatar" style="border-color:' + gold + '">' + avatarInner + "</div>" +
    '<div class="name-banner" style="border-color:' + gold + '"><span>' + escapeHtml(nombre || "Tu nombre") + "</span></div>" +
    '<div class="rank">' + escapeHtml(rango) + "</div>" +
    (pv ? '<div class="pv">' + escapeHtml(pv) + "</div>" : "") +
    "<hr/>" +
    '<div class="foot">Recorrido hacia el éxito con Atomy</div>' +
    "</div>"
  );
}

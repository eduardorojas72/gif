/* ---------------------------------------------------------------
   ESCENA DE MONTAÑA, MEDALLONES Y TARJETA DE RECONOCIMIENTO
--------------------------------------------------------------- */

function medallionHTML(iconName, size) {
  size = size || 68;
  const decorado = size >= 40;
  const iconSize = Math.round(size * 0.42);
  const diamonds = decorado
    ? '<span class="diamond d-top"></span><span class="diamond d-bottom"></span>' +
      '<span class="diamond d-left"></span><span class="diamond d-right"></span>'
    : "";
  return (
    '<div class="medallion" style="width:' + size + 'px;height:' + size + 'px">' +
    Icon(iconName, { size: iconSize, color: "#fff", stroke: 1.8 }) +
    diamonds +
    "</div>"
  );
}

function sectionHeaderHTML(title, desc, iconName) {
  return (
    '<div class="section-header">' +
    (iconName ? medallionHTML(iconName, 48) : "") +
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
    const glow = done ? '<circle cx="' + p.x + '" cy="' + p.y + '" r="9" fill="#3FE0E8" opacity="0.3"/>' : "";
    const check = done
      ? '<path d="M' + (p.x - 2.3) + ',' + p.y + ' l1.6,1.8 l3,-3.4" stroke="#0A1B3E" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      : "";
    return (
      "<g>" + glow +
      '<circle cx="' + p.x + '" cy="' + p.y + '" r="6" fill="' + (done ? "#3FE0E8" : "#0A1B3E") + '" stroke="' + (done ? "#DFFEFF" : "#4FD8E8") + '" stroke-width="2" stroke-opacity="' + (done ? 1 : 0.5) + '"/>' +
      check + "</g>"
    );
  }).join("");

  const flagColor = cumbreLograda ? "#F2C14E" : "#DFFEFF";
  const flagFill = cumbreLograda ? "#F2C14E" : "#4FD8E8";

  const doneCount = Object.values(quincenas).filter(Boolean).length;

  return (
    '<div class="mountain-wrap">' +
    '<svg viewBox="0 0 300 190" width="100%" height="' + height + '" preserveAspectRatio="xMidYMax meet">' +
    "<defs>" +
    '<linearGradient id="sky' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0%" stop-color="#050B2E"/><stop offset="42%" stop-color="#0B2A6B"/>' +
    '<stop offset="74%" stop-color="#12ADCB"/><stop offset="100%" stop-color="#3FE0E8"/></linearGradient>' +
    '<radialGradient id="glow' + gid + '" cx="50%" cy="50%" r="50%">' +
    '<stop offset="0%" stop-color="#DFFEFF" stop-opacity="0.95"/>' +
    '<stop offset="45%" stop-color="#39D6E8" stop-opacity="0.45"/>' +
    '<stop offset="100%" stop-color="#39D6E8" stop-opacity="0"/></radialGradient>' +
    "</defs>" +
    '<rect x="0" y="0" width="300" height="190" fill="url(#sky' + gid + ')" rx="14"/>' +
    estrellas.map(function (s) { return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '" fill="#ffffff" opacity="0.8"/>'; }).join("") +
    '<circle cx="' + peak.x + '" cy="' + (peak.y + 30) + '" r="85" fill="url(#glow' + gid + ')"/>' +
    '<path d="M-10 190 L40 120 L90 165 L130 105 L170 160 L210 110 L260 150 L310 120 L310 190 Z" fill="#0C1E45" opacity="0.55"/>' +
    '<path d="M-10 190 L60 145 L120 178 L190 130 L250 175 L310 140 L310 190 Z" fill="#0A1836" opacity="0.75"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x - 62) + ' 190 L' + (peak.x + 6) + ' 190 Z" fill="#0A1B3E"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x + 58) + ' 190 L' + (peak.x - 4) + ' 190 Z" fill="#123055"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x - 20) + ' 78 L' + (peak.x - 4) + ' 92 L' + (peak.x - 30) + ' 118 L' + (peak.x - 10) + ' 132 L' + (peak.x - 44) + ' 190 L' + (peak.x - 4) + ' 190 Z" fill="#BFF6FF" opacity="0.9"/>' +
    '<path d="M' + peak.x + ' ' + peak.y + ' L' + (peak.x - 10) + ' 132 L' + (peak.x - 30) + ' 118 L' + (peak.x - 4) + ' 92 L' + (peak.x - 20) + ' 78 Z" fill="#4FD8E8" opacity="0.55"/>' +
    '<path d="M0 190 L40 130 L80 190 Z" fill="#0A1836" opacity="0.85"/>' +
    '<path d="M210 190 L250 125 L300 190 Z" fill="#0A1836" opacity="0.85"/>' +
    '<path d="' + pathD + '" fill="none" stroke="#DFFEFF" stroke-opacity="0.5" stroke-width="2.5" stroke-dasharray="1 7" stroke-linecap="round"/>' +
    marcadores +
    '<line x1="' + peak.x + '" y1="' + peak.y + '" x2="' + peak.x + '" y2="' + (peak.y - 22) + '" stroke="' + flagColor + '" stroke-width="2" stroke-opacity="' + (cumbreLograda ? 1 : 0.5) + '"/>' +
    '<path d="M' + peak.x + ',' + (peak.y - 22) + ' L' + (peak.x + 14) + ',' + (peak.y - 17) + ' L' + peak.x + ',' + (peak.y - 12) + ' Z" fill="' + flagFill + '"/>' +
    "</svg>" +
    '<div class="mountain-caption">' + doneCount + " de 6 quincenas conquistadas</div>" +
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
  1: ["#0B2A46", "#123B60"],
  2: ["#08213A", "#164B78"],
  3: ["#06182B", "#0F3D66"],
};

function recogCardHTML(nombre, foto, rango, pv, tier) {
  tier = tier || 1;
  const gold = "#E3B341";
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

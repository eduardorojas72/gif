/* ---------------------------------------------------------------
   TARJETAS EXPORTABLES — SVG -> PNG vía canvas (100% cliente)
--------------------------------------------------------------- */

function themeColors() {
  const cs = getComputedStyle(document.documentElement);
  const g = function (name) { return cs.getPropertyValue(name).trim(); };
  return {
    bg: g("--bg"), card: g("--card"), border: g("--border"),
    text: g("--text"), textSoft: g("--text-soft"),
    accent: g("--accent"), accentSoft: g("--accent-soft"),
    success: g("--success"), gold: g("--gold"),
  };
}

function svgToPngDownload(svgMarkup, width, height, filename) {
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
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = dlUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(dlUrl);
    }, "image/png");
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
    App.showToast("No se pudo generar la imagen. Inténtalo de nuevo.");
  };
  img.src = url;
}

function slugFile(str) {
  return String(str == null ? "" : str)
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function safeXml(str) {
  return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function downloadRecogCard(state) {
  const gold = "#E8B94E";
  const rangoObj = RANGOS[state.rangoIndex];
  const tier = rangoObj.tier;
  const bgs = TIER_BG;
  const c1 = bgs[tier][0], c2 = bgs[tier][1];
  const nombre = safeXml(state.nombre || "Tu nombre");
  const rango = rangoObj.nombre;

  const fotoTag = state.foto
    ? '<clipPath id="clip"><circle cx="400" cy="400" r="150"/></clipPath><image href="' + state.foto + '" x="250" y="250" width="300" height="300" preserveAspectRatio="xMidYMid slice" clip-path="url(#clip)"/>'
    : "";
  const lineasDoradas = tier >= 2
    ? '<line x1="150" y1="0" x2="90" y2="1000" stroke="' + gold + '" stroke-opacity="0.35" stroke-width="2"/><line x1="650" y1="0" x2="710" y2="1000" stroke="' + gold + '" stroke-opacity="0.35" stroke-width="2"/>'
    : "";
  const bokehCount = tier === 3 ? 10 : tier === 2 ? 6 : 3;
  let bokeh = "";
  for (let i = 0; i < bokehCount; i++) {
    const cx = 70 + ((i * 97) % 660), cy = 60 + ((i * 53) % 200), r = 6 + (i % 3) * 5;
    bokeh += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + gold + '" opacity="0.4"/>';
  }
  const coronaTag = tier === 3
    ? '<path d="M365 124 L370 102 L386 116 L400 90 L414 116 L430 102 L435 124 Z" fill="' + gold + '"/><circle cx="370" cy="100" r="3.5" fill="' + gold + '"/><circle cx="400" cy="88" r="4" fill="' + gold + '"/><circle cx="430" cy="100" r="3.5" fill="' + gold + '"/>'
    : '<path d="M368 118L400 90L432 118Z" fill="' + gold + '"/>';

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">' +
    "<defs>" +
    '<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="' + c1 + '"/><stop offset="55%" stop-color="' + c2 + '"/><stop offset="100%" stop-color="' + c1 + '"/></linearGradient>' +
    '<filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>' +
    "</defs>" +
    '<rect width="800" height="1000" fill="url(#bg)" rx="32"/>' +
    lineasDoradas +
    '<g filter="url(#soft)">' + bokeh + "</g>" +
    '<rect x="18" y="18" width="764" height="964" rx="24" fill="none" stroke="' + gold + '" stroke-width="3"/>' +
    coronaTag +
    '<text x="400" y="160" text-anchor="middle" font-family="Arial" font-size="16" letter-spacing="4" font-weight="bold" fill="' + gold + '">CUMBRE 90</text>' +
    '<circle cx="400" cy="400" r="152" fill="rgba(255,255,255,0.06)" stroke="' + gold + '" stroke-width="6"/>' +
    fotoTag +
    '<rect x="230" y="600" width="340" height="70" fill="#241947" stroke="' + gold + '" stroke-width="2"/>' +
    '<path d="M230 600 L192 635 L230 670 Z" fill="#241947" stroke="' + gold + '" stroke-width="2"/>' +
    '<path d="M570 600 L608 635 L570 670 Z" fill="#241947" stroke="' + gold + '" stroke-width="2"/>' +
    '<text x="400" y="645" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="' + gold + '">' + nombre + "</text>" +
    '<text x="400" y="712" text-anchor="middle" font-family="Arial" font-size="20" letter-spacing="2" font-weight="bold" fill="#ffffff">' + safeXml(rango.toUpperCase()) + "</text>" +
    '<text x="400" y="745" text-anchor="middle" font-family="Arial" font-size="16" fill="rgba(255,255,255,0.6)">' + rangoObj.pv + "</text>" +
    '<line x1="336" y1="775" x2="464" y2="775" stroke="' + gold + '" stroke-width="1.5" opacity="0.5"/>' +
    '<text x="400" y="810" text-anchor="middle" font-family="Arial" font-size="15" fill="rgba(255,255,255,0.55)">Recorrido hacia el éxito con Atomy</text>' +
    "</svg>";

  svgToPngDownload(svg, 800, 1000, "Cumbre90-" + slugFile(rango) + "-" + slugFile(state.nombre || "socio") + ".png");
}

function downloadCertificado(state) {
  const t = themeColors();
  const fecha = new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
  const nombre = safeXml(state.nombre || "Socio Atomy");
  const codigo = state.codigoCumbre || "C90-000000";
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620">' +
    '<rect width="900" height="620" fill="' + t.bg + '"/>' +
    '<rect x="24" y="24" width="852" height="572" rx="18" fill="none" stroke="' + t.gold + '" stroke-width="3"/>' +
    '<rect x="40" y="40" width="820" height="540" rx="12" fill="none" stroke="' + t.accent + '" stroke-width="1"/>' +
    '<text x="450" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="20" letter-spacing="6" fill="' + t.accent + '">CUMBRE 90</text>' +
    '<text x="450" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="42" fill="' + t.text + '">Certificado de Cumbre</text>' +
    '<text x="450" y="300" text-anchor="middle" font-family="Arial" font-size="16" fill="' + t.textSoft + '">Se otorga a</text>' +
    '<text x="450" y="350" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="' + t.gold + '">' + nombre + "</text>" +
    '<text x="450" y="400" text-anchor="middle" font-family="Arial" font-size="15" fill="' + t.textSoft + '">por completar el Plan de 90 Días y alcanzar el rango de Sales Master</text>' +
    '<text x="450" y="470" text-anchor="middle" font-family="Arial" font-size="13" fill="' + t.textSoft + '">' + fecha + "</text>" +
    '<text x="450" y="560" text-anchor="middle" font-family="Arial" font-size="12" fill="' + t.textSoft + '">Código: ' + codigo + "</text>" +
    "</svg>";
  svgToPngDownload(svg, 900, 620, "Certificado-Cumbre90-" + slugFile(state.nombre || "socio") + ".png");
}

function downloadDiaCard(state, diaId) {
  const dia = DIAS.find(function (d) { return d.id === diaId; });
  const est = state.dias[diaId];
  const t = themeColors();
  const entradas = dia.campos
    .map(function (c) { return { label: c.label, val: (est.fields[c.key] || "").trim() }; })
    .filter(function (e) { return e.val; });

  const width = 800, height = 620;
  let y = 250;
  const lines = entradas.length
    ? entradas.map(function (e) {
        const block =
          '<text x="60" y="' + y + '" font-family="Arial" font-size="14" fill="' + t.textSoft + '">' + safeXml(e.label) + "</text>" +
          '<text x="60" y="' + (y + 30) + '" font-family="Georgia, serif" font-size="19" fill="' + t.text + '">' + safeXml(wrapText(e.val, 58)) + "</text>";
        y += 70;
        return block;
      }).join("")
    : '<text x="60" y="' + y + '" font-family="Arial" font-size="15" fill="' + t.textSoft + '">Aún no has completado los campos de esta etapa.</text>';

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
    '<rect width="' + width + '" height="' + height + '" fill="' + t.bg + '"/>' +
    '<rect x="20" y="20" width="' + (width - 40) + '" height="' + (height - 40) + '" rx="20" fill="none" stroke="' + t.gold + '" stroke-width="2.5"/>' +
    '<text x="60" y="90" font-family="Arial" font-size="13" letter-spacing="4" font-weight="bold" fill="' + t.gold + '">CUMBRE 90 · ETAPA ' + dia.id + "</text>" +
    '<text x="60" y="140" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="' + t.text + '">' + safeXml(dia.etapa) + "</text>" +
    '<text x="60" y="170" font-family="Arial" font-size="15" fill="' + t.accent + '">' + safeXml(dia.titulo) + "</text>" +
    '<line x1="60" y1="200" x2="' + (width - 60) + '" y2="200" stroke="' + t.border + '" stroke-width="1"/>' +
    lines +
    '<text x="60" y="' + (height - 40) + '" font-family="Arial" font-size="12" fill="' + t.textSoft + '">Recorrido hacia el éxito con Atomy · ' + safeXml(state.nombre || "") + "</text>" +
    "</svg>";

  svgToPngDownload(svg, width, height, "Cumbre90-Etapa" + dia.id + "-" + slugFile(dia.etapa) + ".png");
}

function wrapText(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

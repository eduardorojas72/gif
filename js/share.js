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

function downloadBlob(blob, filename) {
  const dlUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = dlUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(dlUrl);
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
    canvas.toBlob(function (blob) { downloadBlob(blob, filename); }, "image/png");
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
    App.showToast("Nu s-a putut genera imaginea. Încearcă din nou.");
  };
  img.src = url;
}

/* Genera el PNG y abre el modal propio de "Compartir" (WhatsApp, Instagram,
   Facebook, TikTok, LinkedIn, YouTube), en vez de saltar directo al panel
   nativo del sistema operativo — así el socio ve siempre las mismas redes,
   sin que se cuelen apps de escritorio (Correo, Outlook, Paint...) que el
   picker nativo del SO añade según lo que tenga instalado. */
function svgToPngShare(svgMarkup, width, height, filename, shareText) {
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
        App.showToast("Nu s-a putut genera imaginea. Încearcă din nou.");
        return;
      }
      App.ui.compartirImagenDraft = { blob: blob, filename: filename, shareText: shareText || "" };
      App.render();
    }, "image/png");
  };
  img.onerror = function () {
    URL.revokeObjectURL(url);
    App.showToast("Nu s-a putut genera imaginea. Încearcă din nou.");
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
  const rangoObj = RANGOS[state.rangoIndex];
  const filename = "Cumbre90-" + slugFile(rangoObj.nombre) + "-" + slugFile(state.nombre || "partener") + ".png";
  const template = RANK_CARD_TEMPLATES[state.rangoIndex];

  if (template) {
    const shareText = RANK_SHARE_TEXTS[state.rangoIndex] || "";
    fetch(template.img)
      .then(function (r) { return r.blob(); })
      .then(function (blob) {
        return new Promise(function (resolve, reject) {
          const reader = new FileReader();
          reader.onload = function () { resolve(reader.result); };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .then(function (dataUri) {
        const svg = rankCardTemplateSVGMarkup(state.nombre, dataUri, template);
        svgToPngShare(svg, template.w, template.h, filename, shareText);
      })
      .catch(function () {
        App.showToast("Nu s-a putut încărca imaginea. Încearcă din nou.");
      });
    return;
  }

  const svg = recogCardSVGMarkup(state.nombre, state.foto, rangoObj.nombre, rangoObj.pv, state.rangoIndex);
  svgToPngShare(svg, 800, 1000, filename, "Acesta este progresul meu pe drumul spre Sales Master cu Atomy! 🚀");
}

/* Tarjeta "Consumidor VIP" — publicación lista para compartir e invitar a
   nuevos consumidores. Usa la misma plantilla y el mismo parche de nombre
   que la tarjeta de reconocimiento del rango 0 (RANK_CARD_TEMPLATES), pero
   como botón dedicado y siempre visible en Mi Rango, con su propio texto
   de invitación, sin depender de cuál sea el rango actual del socio. */
function downloadConsumidorVipCard(state) {
  const template = RANK_CARD_TEMPLATES[0];
  fetch(template.img)
    .then(function (r) { return r.blob(); })
    .then(function (blob) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = function () { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    })
    .then(function (dataUri) {
      const svg = rankCardTemplateSVGMarkup(state.nombre, dataUri, template);
      svgToPngShare(svg, template.w, template.h, "Cumbre90-Consumidor-VIP-" + slugFile(state.nombre || "partener") + ".png", CONSUMIDOR_VIP_SHARE_TEXT);
    })
    .catch(function () {
      App.showToast("Nu s-a putut încărca imaginea. Încearcă din nou.");
    });
}

function downloadCertificado(state) {
  const t = themeColors();
  const fecha = new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
  const nombre = safeXml(state.nombre || "Partener Atomy");
  const codigo = state.codigoCumbre || "C90-000000";
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620">' +
    '<rect width="900" height="620" fill="' + t.bg + '"/>' +
    '<rect x="24" y="24" width="852" height="572" rx="18" fill="none" stroke="' + t.gold + '" stroke-width="3"/>' +
    '<rect x="40" y="40" width="820" height="540" rx="12" fill="none" stroke="' + t.accent + '" stroke-width="1"/>' +
    '<text x="450" y="140" text-anchor="middle" font-family="Georgia, serif" font-size="20" letter-spacing="6" fill="' + t.accent + '">CUMBRE 90</text>' +
    '<text x="450" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="42" fill="' + t.text + '">Certificat de Culme</text>' +
    '<text x="450" y="300" text-anchor="middle" font-family="Arial" font-size="16" fill="' + t.textSoft + '">Se acordă lui</text>' +
    '<text x="450" y="350" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="' + t.gold + '">' + nombre + "</text>" +
    '<text x="450" y="400" text-anchor="middle" font-family="Arial" font-size="15" fill="' + t.textSoft + '">pentru completarea Planului de 90 de Zile și atingerea rangului de Sales Master</text>' +
    '<text x="450" y="470" text-anchor="middle" font-family="Arial" font-size="13" fill="' + t.textSoft + '">' + fecha + "</text>" +
    '<text x="450" y="560" text-anchor="middle" font-family="Arial" font-size="12" fill="' + t.textSoft + '">Cod: ' + codigo + "</text>" +
    "</svg>";
  svgToPngDownload(svg, 900, 620, "Certificado-Cumbre90-" + slugFile(state.nombre || "partener") + ".png");
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
    : '<text x="60" y="' + y + '" font-family="Arial" font-size="15" fill="' + t.textSoft + '">Încă nu ai completat câmpurile acestei etape.</text>';

  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' +
    '<rect width="' + width + '" height="' + height + '" fill="' + t.bg + '"/>' +
    '<rect x="20" y="20" width="' + (width - 40) + '" height="' + (height - 40) + '" rx="20" fill="none" stroke="' + t.gold + '" stroke-width="2.5"/>' +
    '<text x="60" y="90" font-family="Arial" font-size="13" letter-spacing="4" font-weight="bold" fill="' + t.gold + '">CUMBRE 90 · ETAPA ' + dia.id + "</text>" +
    '<text x="60" y="140" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="' + t.text + '">' + safeXml(dia.etapa) + "</text>" +
    '<text x="60" y="170" font-family="Arial" font-size="15" fill="' + t.accent + '">' + safeXml(dia.titulo) + "</text>" +
    '<line x1="60" y1="200" x2="' + (width - 60) + '" y2="200" stroke="' + t.border + '" stroke-width="1"/>' +
    lines +
    '<text x="60" y="' + (height - 40) + '" font-family="Arial" font-size="12" fill="' + t.textSoft + '">Drumul spre succes cu Atomy · ' + safeXml(state.nombre || "") + "</text>" +
    "</svg>";

  svgToPngShare(svg, width, height, "Cumbre90-Etapa" + dia.id + "-" + slugFile(dia.etapa) + ".png", "Avansez în Planul meu de 6 Zile cu Atomy! 🚀");
}

function wrapText(str, max) {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "…";
}

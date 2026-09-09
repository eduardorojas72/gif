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

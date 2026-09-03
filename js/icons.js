/* ---------------------------------------------------------------
   ICONOS — set propio en SVG inline (sin dependencias externas)
   Uso: Icon("check", { size:16, color:"currentColor", stroke:1.8 })
--------------------------------------------------------------- */

const ICON_PATHS = {
  menu: '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
  x: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  "message-circle": '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M9.5 19a2.5 2.5 0 0 0 5 0"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4.2"/><line x1="12" y1="2.5" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="21.5"/><line x1="2.5" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="21.5" y2="12"/><line x1="4.9" y1="4.9" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="19.1" y2="4.9"/>',
  gift: '<rect x="3.5" y="9" width="17" height="4.2" rx="0.8"/><rect x="4.5" y="13.2" width="15" height="7.3" rx="0.8"/><line x1="12" y1="9" x2="12" y2="20.5"/><path d="M12 9C10 5 6.5 5.5 6.5 7.5S9 9 12 9Z"/><path d="M12 9c2-4 5.5-3.5 5.5-1.5S15 9 12 9Z"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 3-6.7"/><polyline points="3 3 3 8 8 8"/>',
  "chevron-right": '<polyline points="9 5 16 12 9 19"/>',
  "chevron-left": '<polyline points="15 5 8 12 15 19"/>',
  award: '<circle cx="12" cy="8.5" r="5.5"/><path d="M8.3 13.2 6.8 21l5.2-2.8 5.2 2.8-1.5-7.8"/>',
  share2: '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><line x1="8.3" y1="10.7" x2="15.7" y2="6.3"/><line x1="8.3" y1="13.3" x2="15.7" y2="17.7"/>',
  home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5h5V15h2v4.5h5V10"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4.9a7.5 7.5 0 0 0-1.7-1L15 3h-6l-.3 2.5a7.5 7.5 0 0 0-1.7 1l-2.4-.9-2 3.4L4.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-.9c.5.4 1.1.8 1.7 1L9 21h6l.3-2.5c.6-.2 1.2-.6 1.7-1l2.4.9 2-3.4-2-1.6Z"/>',
  "triangle-alert": '<path d="M12 4 22 20H2Z"/><line x1="12" y1="10" x2="12" y2="14.5"/><circle cx="12" cy="17.2" r="0.4" fill="currentColor" stroke="none"/>',
  sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
  flame: '<path d="M12 3s5 4.5 5 9.5a5 5 0 0 1-10 0c0-1.6.8-2.7 1.6-3.7.2 1.4 1 2 1.7 2C10 8 9 6 12 3Z"/>',
  "clipboard-list": '<rect x="5" y="4.5" width="14" height="16" rx="1.5"/><rect x="9" y="3" width="6" height="3" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="14.5" x2="16" y2="14.5"/><line x1="8" y1="18" x2="13" y2="18"/>',
  "phone-call": '<path d="M6 3.5h3.2l1.3 4-2 1.6a13 13 0 0 0 5.4 5.4l1.6-2 4 1.3V17c0 1.4-1.1 2.5-2.5 2.4C10.5 19 5 13.5 4.6 7 4.5 5.6 4.6 3.5 6 3.5Z"/>',
  presentation: '<rect x="3.5" y="4" width="17" height="11" rx="1.2"/><line x1="12" y1="15" x2="12" y2="20"/><line x1="8" y1="20" x2="16" y2="20"/><path d="M7.5 11.5 10.5 8.5 13 10.5 16.5 7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  users: '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c1-3.2 3-5 5.5-5s4.5 1.8 5.5 5"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 12.3c2 .2 3.6 1.8 4.4 4.4"/>',
  repeat: '<path d="M4 8h13l-2.5-2.5"/><path d="M20 16H7l2.5 2.5"/>',
  "image-plus": '<rect x="3.5" y="5" width="13.5" height="13.5" rx="1.5"/><circle cx="8.5" cy="10" r="1.4"/><path d="M4 16.5 8.5 12l3 3 2-2 3 3"/><line x1="19.5" y1="4" x2="19.5" y2="9"/><line x1="17" y1="6.5" x2="22" y2="6.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  package: '<path d="M3.5 8 12 3.5 20.5 8 12 12.5Z"/><path d="M3.5 8v9L12 21.5 20.5 17V8"/><line x1="12" y1="12.5" x2="12" y2="21.5"/>',
  "book-open": '<path d="M12 6.2c-1.6-1.4-4-2-6.8-1.7v13c2.8-.3 5.2.3 6.8 1.7 1.6-1.4 4-2 6.8-1.7v-13c-2.8-.3-5.2.3-6.8 1.7Z"/><line x1="12" y1="6.2" x2="12" y2="19.2"/>',
  "trending-up": '<polyline points="3.5 16.5 10 10 14 14 20.5 7.5"/><polyline points="15 7.5 20.5 7.5 20.5 13"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11Z"/>',
  tent: '<path d="M3 19 11 5l8 14"/><path d="M11 5 17.5 19"/><path d="M11 5 4.5 19"/><line x1="9" y1="19" x2="13" y2="19"/>',
  download: '<line x1="12" y1="3.5" x2="12" y2="14.5"/><polyline points="7.5 11 12 15.5 16.5 11"/><line x1="4.5" y1="19.5" x2="19.5" y2="19.5"/>',
  crown: '<path d="M4 8.5 8 12l4-6.5 4 6.5 4-3.5 -1.4 9H5.4Z"/><line x1="5.4" y1="19.5" x2="18.6" y2="19.5"/>',
  camera: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.2"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  footprints: '<ellipse cx="7.2" cy="8.4" rx="2.9" ry="4" transform="rotate(-8 7.2 8.4)" fill="currentColor" stroke="none"/><circle cx="5.6" cy="3.1" r="0.85" fill="currentColor" stroke="none"/><circle cx="7.3" cy="2.3" r="0.9" fill="currentColor" stroke="none"/><circle cx="9" cy="2.7" r="0.75" fill="currentColor" stroke="none"/><circle cx="10.3" cy="3.6" r="0.6" fill="currentColor" stroke="none"/><ellipse cx="16.8" cy="15.9" rx="2.9" ry="4" transform="rotate(8 16.8 15.9)" fill="currentColor" stroke="none"/><circle cx="15.2" cy="10.6" r="0.85" fill="currentColor" stroke="none"/><circle cx="16.9" cy="9.8" r="0.9" fill="currentColor" stroke="none"/><circle cx="18.6" cy="10.2" r="0.75" fill="currentColor" stroke="none"/><circle cx="19.9" cy="11.1" r="0.6" fill="currentColor" stroke="none"/>',
  footprint: '<ellipse cx="12" cy="14.2" rx="3.7" ry="5.1" transform="rotate(-6 12 14.2)" fill="currentColor" stroke="none"/><circle cx="9.6" cy="6.1" r="1.05" fill="currentColor" stroke="none"/><circle cx="11.8" cy="4.9" r="1.15" fill="currentColor" stroke="none"/><circle cx="14" cy="5.5" r="0.95" fill="currentColor" stroke="none"/><circle cx="15.7" cy="6.8" r="0.75" fill="currentColor" stroke="none"/>',
  "footprint-outline": '<ellipse cx="12" cy="14.2" rx="3.9" ry="5.3" transform="rotate(-6 12 14.2)"/><circle cx="9.6" cy="6.1" r="1.15"/><circle cx="11.8" cy="4.9" r="1.25"/><circle cx="14" cy="5.5" r="1.05"/><circle cx="15.7" cy="6.8" r="0.85"/>',
  "footprints-outline": '<ellipse cx="7.2" cy="8.4" rx="2.9" ry="4" transform="rotate(-8 7.2 8.4)"/><circle cx="5.6" cy="3.1" r="0.85"/><circle cx="7.3" cy="2.3" r="0.9"/><circle cx="9" cy="2.7" r="0.75"/><circle cx="10.3" cy="3.6" r="0.6"/><ellipse cx="16.8" cy="15.9" rx="2.9" ry="4" transform="rotate(8 16.8 15.9)"/><circle cx="15.2" cy="10.6" r="0.85"/><circle cx="16.9" cy="9.8" r="0.9"/><circle cx="18.6" cy="10.2" r="0.75"/><circle cx="19.9" cy="11.1" r="0.6"/>',
  "trail-map": '<path d="M3 5v15l6-2.5 6 2.5 6-2.5V2l-6 2.5-6-2.5L3 5Z"/><path d="M9 2.5v15"/><path d="M15 4.5v15"/><circle cx="6.2" cy="8.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12.5" r="1" fill="currentColor" stroke="none"/><circle cx="18" cy="8" r="1" fill="currentColor" stroke="none"/><path d="M6.2 8.5 12 12.5l6-4.5" stroke-dasharray="1.5 2.5"/>',
  "mountain-flag": '<path d="M2 20 9 8 12.5 14 15.5 9.5 22 20H2Z"/><path d="M15.5 9.5V3"/><path d="M15.5 3 20 5 15.5 6.8Z" fill="currentColor" stroke="none"/>',
  "user-badge": '<circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c1.5-4 4.2-6 7.5-6s6 2 7.5 6"/>',
};

function Icon(name, opts) {
  opts = opts || {};
  const size = opts.size || 18;
  const color = opts.color || "currentColor";
  const stroke = opts.stroke != null ? opts.stroke : 1.8;
  const body = ICON_PATHS[name] || "";
  return (
    '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" ' +
    'stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-linejoin="round" ' +
    'style="color:' + color + '">' + body + "</svg>"
  );
}

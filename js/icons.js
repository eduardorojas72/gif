/* ---------------------------------------------------------------
   ICONOS — set compacto de SVG en línea, estilo "feather"
--------------------------------------------------------------- */

const ICON_PATHS = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>',
  "sun-set": '<path d="M12 3v7M8 7l4 3 4-3M3 18h18M5 21h14M6 14a6 6 0 0 1 12 0"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5 10 10l-.5 4.5L14 14l.5-4.5Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  calendar: '<rect x="3.5" y="4.5" width="17" height="16" rx="2"/><path d="M8 2.5v4M16 2.5v4M3.5 9.5h17"/>',
  "list-checks": '<path d="M4 6h2M4 12h2M4 18h2"/><path d="M9 6h11M9 12h11M9 18h11"/>',
  "phone-call": '<path d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2L20.5 15.5V19.5a1 1 0 0 1-1 1A16.5 16.5 0 0 1 4 4.5a1 1 0 0 1 1-.5Z"/>',
  "message-circle": '<path d="M20 11.5a8 8 0 1 1-3.3-6.5"/><path d="M20 4l-8 7.5"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4.5 7l7.5 6 7.5-6"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M15 13.5a4.5 4.5 0 0 1 6.5 4"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 19.5a7 7 0 0 1 14 0"/>',
  "user-star": '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 19.5a6.5 6.5 0 0 1 13 0"/><path d="M18 9l.8 1.8 1.9.2-1.4 1.3.4 1.9-1.7-1-1.7 1 .4-1.9-1.4-1.3 1.9-.2Z"/>',
  edit: '<path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L5 17l-1 3Z"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 13l4 4 10-10"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M7 7l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"/>',
  "chevron-right": '<path d="M9 5l7 7-7 7"/>',
  "chevron-left": '<path d="M15 5l-7 7 7 7"/>',
  "chevron-down": '<path d="M5 9l7 7 7-7"/>',
  star: '<path d="M12 3.5l2.5 5.3 5.8.6-4.3 4 1.1 5.8L12 16.3 6.9 19.2 8 13.4l-4.3-4 5.8-.6Z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  "trending-up": '<path d="M3 16l6-6 4 4 7-8"/><path d="M15 6h5v5"/>',
  "dollar-sign": '<path d="M12 2.5v19"/><path d="M17 6.5c0-1.7-2-3-5-3s-5 1.1-5 3 2 2.6 5 3 5 1.3 5 3-2 3-5 3-5-1.3-5-3"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3L17 11l3 4"/>',
  send: '<path d="M4 11.5 20 4l-6.5 16-3-7-6.5-1.5Z"/>',
  flame: '<path d="M12 2.5c1 3 .5 4-1 5.5-2 2-3 3.5-3 6a4 4 0 0 0 8 0c1 .5 1.5 1.5 1.5 3a5.5 5.5 0 1 1-11-1c0-5 3-8 5.5-13.5Z"/>',
  battery: '<rect x="2.5" y="8" width="16" height="8" rx="1.5"/><path d="M21 10.5v3"/><path d="M5 11v2M8 11v2"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 10v.5M15.5 10v.5"/><path d="M8 14.5c1 1.5 2.5 2.2 4 2.2s3-.7 4-2.2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2-1.2L14.2 3H9.8l-.4 2.6a7 7 0 0 0-2 1.2l-2.3-.9-2 3.4 2 1.5a7 7 0 0 0 0 2.4l-2 1.5 2 3.4 2.3-.9a7 7 0 0 0 2 1.2l.4 2.6h4.4l.4-2.6a7 7 0 0 0 2-1.2l2.3.9 2-3.4-2-1.5c.07-.4.1-.8.1-1.2Z"/>',
  download: '<path d="M12 3.5v12M8 12l4 4 4-4"/><path d="M4.5 18.5h15v2h-15Z"/>',
  upload: '<path d="M12 16.5v-12M8 8l4-4 4 4"/><path d="M4.5 18.5h15v2h-15Z"/>',
  bell: '<path d="M6 10.5a6 6 0 0 1 12 0c0 4 1.5 5.2 1.5 5.2H4.5S6 14.5 6 10.5Z"/><path d="M10 18.5a2 2 0 0 0 4 0"/>',
  share: '<circle cx="18" cy="5.5" r="2.2"/><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="18.5" r="2.2"/><path d="M8 10.8l8-4.2M8 13.2l8 4.2"/>',
  menu: '<path d="M4 6.5h16M4 12h16M4 17.5h16"/>',
  "log-out": '<path d="M9 4H6a1.5 1.5 0 0 0-1.5 1.5v13A1.5 1.5 0 0 0 6 20h3"/><path d="M14 16l4-4-4-4M18 12H9"/>',
  clipboard: '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1"/><path d="M8.5 11h7M8.5 14.5h7M8.5 18h4"/>',
  briefcase: '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
  repeat: '<path d="M4 7h11l-2.5-2.5M4 7l2.5 2.5"/><path d="M20 17H9l2.5 2.5M20 17l-2.5-2.5"/>',
  "book-open": '<path d="M12 6c-2-1.3-4.5-2-7-2v13.5c2.5 0 5 .7 7 2 2-1.3 4.5-2 7-2V4c-2.5 0-5 .7-7 2Z"/><path d="M12 6v13.5"/>',
  award: '<circle cx="12" cy="8.5" r="5"/><path d="M9 13l-1.5 7L12 18l4.5 2L15 13"/>',
  zap: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z"/>',
};

function Icon(name, opts) {
  opts = opts || {};
  const size = opts.size || 18;
  const color = opts.color || "currentColor";
  const path = ICON_PATHS[name] || "";
  return (
    '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + color + '" ' +
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">' + path + "</svg>"
  );
}

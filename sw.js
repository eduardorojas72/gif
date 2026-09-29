/* Service worker di Cumbre Master — memorizza in cache i file statici per l'uso offline.
   Strategia "network-first": prova sempre a ottenere prima la versione più recente
   dal server, e usa la copia in cache solo se non c'è rete. Così, ogni nuovo
   rilascio si vede immediatamente senza lasciare tracce di una versione
   vecchia bloccata nella cache del browser. */

const CACHE_NAME = "cumbre-master-cache-v5";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/styles.css",
  "./js/icons.js",
  "./js/fonts.js",
  "./js/data.js",
  "./js/state.js",
  "./js/mountain.js",
  "./js/views.js",
  "./js/app.js",
  "./icons/icon.svg",
  "./img/cover-cumbremaster.png",
  "./img/fondo-cumbremaster.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});

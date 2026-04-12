
// sw.js
const cacheName = 'v1';
const resourcesToPrecache = ['index.html', 'style.css', 'app.js'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(resourcesToPrecache))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
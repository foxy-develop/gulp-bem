const offlinePage = new Request('offline.html');

self.addEventListener('install', event =>
  event.waitUntil(fetch(offlinePage).then(response => 
    caches.open('sw-offline')
      .then(cache => 
        cache.put(offlinePage, response)))));

self.addEventListener('fetch', event => 
  event.respondWith(fetch(event.request).catch(error => 
    caches.open('sw-offline')
      .then(cache => 
        cache.match('offline.html')))))

self.addEventListener('refreshOffline', response => 
  caches.open('sw-offline')
    .then(cache => 
      cache.put(offlinePage, response)))

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /(.*)articles(.*)\.(?:png|gif|jpg|jpeg|svg|webp)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);
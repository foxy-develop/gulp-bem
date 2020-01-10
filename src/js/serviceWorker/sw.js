/*eslint-disable */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
const url = new URL(location.href);
const debug = url.searchParams.has('debug');
workbox.setConfig({debug});

workbox.core.setCacheNameDetails({
  prefix: "foxy",
  suffix: "v1",
  precache: "precache",
  runtime: "runtime-name"
});

workbox.core.skipWaiting();
workbox.core.clientsClaim();

// Note: Ignore the error that Glitch raises about workbox being undefined.

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp|ico)/,
  new workbox.strategies.CacheFirst({
    cacheName: "foxy-images-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\.(?:js|css)/,
  new workbox.strategies.CacheFirst({
    cacheName: 'foxy-static-resources',
  })
);

/*eslint-enable */

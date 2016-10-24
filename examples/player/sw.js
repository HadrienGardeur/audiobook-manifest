var CACHE_NAME = 'audiobook-player';
//HINT: Make sure that this correctly points to the static resources used for the player
var urlsToCache = [
  'index.html',
  'polyfills/fetch.js',
  'polyfills/urlsearchparams.js',
  'player.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  clients.claim();
});

/*
For a publication, it seems better to do network then cache than the opposite.
Could be problematic when the network is very slow, but has the benefit of being fresh.
*/

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );

});
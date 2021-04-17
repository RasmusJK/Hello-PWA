const cacheName = 'hello-pwa';
const filesToCache = [
    './',
    './index.html',
    './css/style.css',
    './js/main.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil((async () => {
        try {
            const cache = await caches.open(cacheName);
            return cache.addAll(filesToCache);
        } catch (e) {
            console.log(e.message);
        }
    })());
});

self.addEventListener('fetch', (event) => {
    console.log('ServiceWorker Fetch', event.request.url);
    event.respondWith((async () => {
        try {
            const response = await caches.match(event.request);
            return response || fetch(event.request);
        } catch (e) {
            console.log(e.message);
        }
    })());
});


// Start the service worker and cache all of the app's content
/*
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Serve cached content when offline
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
*/
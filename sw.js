const CACHE_NAME = 'java-chatbot-ef-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './style.css',
    './app.js',
    './lessons.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

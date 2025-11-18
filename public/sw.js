const CACHE_NAME = 'lakastah-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/meals.html',
    '/cart.html',
    '/profile.html',
    '/styles.css',
    '/app.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png'
];

// Install Service Worker and cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

// Activate SW
self.addEventListener('activate', event => {
    console.log('Service Worker activated');
});

// Fetch files from cache first
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});

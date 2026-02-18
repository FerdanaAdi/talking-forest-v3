// Dummy Service Worker to prevent 404 errors
self.addEventListener('install', function (event) {
    console.log('Service Worker Installed');
});

self.addEventListener('fetch', function (event) {
    // Pass through requests
});

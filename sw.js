const CACHE_NAME = 'veve-joki-v7';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './kalkulator.html',
    './kalkulator/wuwa.html',
    './kalkulator/endfield.html',
    './kalkulator/nte.html',
    './testimoni.html',
    './css/index.css?v=1.0.1',
    './js/navbar.js',
    './js/footer.js',
    './js/floating-buttons.js',
    './js/testimonials.js',
    './js/activity-ticker.js',
    './js/games-data.js',
    './js/orders.js',
    './js/router.js',
    './js/background-animation.js',
    './js/security.js',
    './assets/favicon-baru.svg'
];

// Install Event - Nyimpen aset awal
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Langsung aktifkan SW baru tanpa nunggu tutup tab
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event - Bersihin cache lama
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Strategi Pintar
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // 1. STRATEGI: NETWORK FIRST (Cek internet dulu, kalau gagal baru cache)
    // Cocok untuk HTML, JS, dan CSS agar perubahan codingan langsung muncul
    if (event.request.mode === 'navigate' || 
        event.request.destination === 'script' || 
        event.request.destination === 'style') {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Update cache dengan file terbaru dari network
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request)) // Offline? Pakai cache
        );
        return;
    }

    // 2. STRATEGI: CACHE FIRST (Cek cache dulu, kalau gak ada baru network)
    // Cocok untuk Gambar/Assets berat agar hemat kuota & kencang
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchRes) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, fetchRes.clone());
                    return fetchRes;
                });
            });
        })
    );
});

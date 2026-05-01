const CACHE_NAME = 'veve-joki-v14';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './kalkulator.html',
    './kalkulator/wuwa.html',
    './kalkulator/endfield.html',
    './kalkulator/nte.html',
    './testimoni.html',
    './manifest.json',
    './css/index.css?v=1.0.2',
    './joki/wuwa/data.js',
    './joki/endfield/data.js',
    './joki/nte/data.js',
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
    './assets/favicon-baru.svg',
    './assets/preview.png',
    './assets/hero.png',
    './assets/hero_2.png',
    './assets/wuwa.webp',
    './assets/arknight_endfield.png',
    './assets/NTE.webp',
    './assets/testimoni/1.png',
    './assets/testimoni/2.png',
    './assets/testimoni/3.png',
    './assets/testimoni/4.png',
    './assets/testimoni/5.png',
    './assets/testimoni/6.png',
    './assets/testimoni/7.png',
    './assets/testimoni/8.png'
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
    const path = url.pathname;

    // Normalisasi URL untuk Clean URL (misal: /kalkulator/wuwa -> /kalkulator/wuwa.html)
    // Digunakan untuk pencocokan di cache
    let cacheUrl = event.request.url;
    if (event.request.mode === 'navigate' || (!path.includes('.') && !path.endsWith('/'))) {
        if (!path.endsWith('.html')) {
            cacheUrl = event.request.url + '.html';
        }
    } else if (path.endsWith('/')) {
        cacheUrl = event.request.url + 'index.html';
    }

    // 1. STRATEGI: NETWORK FIRST (Cek internet dulu, kalau gagal baru cache)
    if (event.request.mode === 'navigate' || 
        event.request.destination === 'script' || 
        event.request.destination === 'style' ||
        url.pathname.endsWith('.html')) {
        
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Hanya simpan di cache jika response valid (ok)
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return response;
                })
                .catch(() => {
                    // Jika offline atau network error, coba cari di cache
                    // Gunakan URL asli ATAU URL yang sudah dinormalisasi (.html)
                    return caches.match(event.request).then((matched) => {
                        return matched || caches.match(cacheUrl);
                    });
                })
        );
        return;
    }

    // 2. STRATEGI: CACHE FIRST (Cek cache dulu, kalau gak ada baru network)
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) return response;

            // Jika tidak ada di cache dengan URL asli, coba dengan .html (untuk SPA)
            if (cacheUrl !== event.request.url) {
                return caches.match(cacheUrl).then((htmlResponse) => {
                    return htmlResponse || fetchAndCache(event.request);
                });
            }

            return fetchAndCache(event.request);
        })
    );
});

// Helper function untuk fetch dan simpan ke cache
function fetchAndCache(request) {
    return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, copy);
        });
        return response;
    }).catch(() => {
        // Return response kosong daripada rejected promise agar tidak muncul error merah di console
        return new Response('Offline - Resource not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    });
}

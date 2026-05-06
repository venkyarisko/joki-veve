/**
 * FILE KHUSUS UPDATE STATISTIK ORDER & CLIENT
 * Edit angka di bawah ini untuk mengupdate tampilan di website secara otomatis.
 */

if (!window.orderConfig) {
    window.orderConfig = {
        ordersDone: 0,      // Jumlah total order selesai
        happyClients: 0,    // Jumlah client puas
        manualProcess: 100,   // Persentase pengerjaan manual
        fastResponse: "24/7"  // Status response
    };
}

// Script untuk mengupdate tampilan (Jangan diubah kecuali paham JS)
function syncOrderStats() {
    const ordersEl = document.getElementById('stat-orders');
    const clientsEl = document.getElementById('stat-clients');
    const manualEl = document.getElementById('stat-manual');
    const responseEl = document.getElementById('stat-response');

    // Murni menghitung dari data testimoni (Statis + Firebase)
    let finalOrders = 0;
    let finalClients = 0;

    if (typeof testimonialData !== 'undefined' && testimonialData.length > 0) {
        // Hitung TOTAL order dari semua data testimoni
        finalOrders = testimonialData.length;

        // Hitung UNIK client dari semua data testimoni
        const uniqueNames = new Set(testimonialData.map(item => item.name));
        finalClients = uniqueNames.size;
    } else if (window.STATIC_TESTIMONIALS) {
        // Fallback jika testimonialData belum siap tapi STATIC_TESTIMONIALS ada
        finalOrders = window.STATIC_TESTIMONIALS.length;
        const uniqueNames = new Set(window.STATIC_TESTIMONIALS.map(item => item.name));
        finalClients = uniqueNames.size;
    }

    // Update tampilan
    if (ordersEl) {
        ordersEl.setAttribute('data-target', finalOrders);
        ordersEl.innerText = finalOrders + '+';
    }
    if (clientsEl) {
        clientsEl.setAttribute('data-target', finalClients);
        clientsEl.innerText = finalClients + '+';
    }
    if (manualEl) {
        manualEl.setAttribute('data-target', orderConfig.manualProcess);
        manualEl.innerText = orderConfig.manualProcess + '%';
    }
    if (responseEl) {
        responseEl.innerText = orderConfig.fastResponse;
    }
}

// Jalankan sync saat halaman dimuat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncOrderStats);
} else {
    syncOrderStats();
}

// Dengarkan sinyal jika data Firebase baru saja masuk
window.addEventListener('firebaseTestimonialsLoaded', () => {
    syncOrderStats();
});

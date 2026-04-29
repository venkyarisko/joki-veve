/**
 * FILE KHUSUS UPDATE STATISTIK ORDER & CLIENT
 * Edit angka di bawah ini untuk mengupdate tampilan di website secara otomatis.
 */

const orderConfig = {
    ordersDone: 0,      // Jumlah total order selesai
    happyClients: 0,    // Jumlah client puas
    manualProcess: 100,   // Persentase pengerjaan manual
    fastResponse: "24/7"  // Status response
};

// Script untuk mengupdate tampilan (Jangan diubah kecuali paham JS)
function syncOrderStats() {
    const ordersEl = document.getElementById('stat-orders');
    const clientsEl = document.getElementById('stat-clients');
    const manualEl = document.getElementById('stat-manual');
    const responseEl = document.getElementById('stat-response');

    // Deteksi otomatis jumlah testimoni & client jika tersedia
    let finalOrders = orderConfig.ordersDone;
    let finalClients = orderConfig.happyClients;

    if (typeof testimonialData !== 'undefined') {
        // Hitung total order (semua testimoni)
        if (testimonialData.length > finalOrders) {
            finalOrders = testimonialData.length;
        }

        // Hitung unik client (berdasarkan nama)
        const uniqueNames = new Set(testimonialData.map(item => item.name));
        if (uniqueNames.size > finalClients) {
            finalClients = uniqueNames.size;
        }
    }

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

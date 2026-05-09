/**
 * FILE KHUSUS UPDATE STATISTIK ORDER & CLIENT
 * Edit angka di bawah ini untuk mengupdate tampilan di website secara otomatis.
 */

if (!window.orderConfig) {
    window.orderConfig = {
        ordersDone: 0,      // Jumlah total order selesai
        happyClients: 0,    // Jumlah client puas
        manualProcess: 100,   // Persentase pengerjaan manual
        fastResponse: "15/7"  // Status response
    };
}

// Script untuk mengupdate tampilan (Jangan diubah kecuali paham JS)
function syncOrderStats(container = document) {
    // Gunakan querySelector agar kompatibel dengan Element maupun Document
    const ordersEl = container.querySelector('#stat-orders');
    const clientsEl = container.querySelector('#stat-clients');
    const feedbackEl = container.querySelector('#stat-feedback');
    const responseEl = container.querySelector('#stat-response');

    // Ambil base value dari config (jika ada)
    let baseOrders = window.orderConfig ? (window.orderConfig.ordersDone || 0) : 0;
    let baseClients = window.orderConfig ? (window.orderConfig.happyClients || 0) : 0;

    let finalOrders = baseOrders;
    let finalClients = baseClients;
    let finalFeedback = 0;

    // 1. Hitung Testimonial (Screenshot) - Hanya Bukti Pembayaran
    const allTestData = (typeof testimonialData !== 'undefined' ? testimonialData : []);

    if (allTestData.length > 0) {
        finalOrders += allTestData.length;
        const uniqueNames = new Set(allTestData.map(item => item.name));
        finalClients += uniqueNames.size;
    } else if (window.STATIC_TESTIMONIALS) {
        // Fallback jika global data belum siap
        const allStatic = window.STATIC_TESTIMONIALS || [];
        finalOrders += allStatic.length;
        const uniqueNames = new Set(allStatic.map(item => item.name));
        finalClients += uniqueNames.size;
    }

    // 2. Hitung Feedback (Tekstual) saja untuk stat feedback
    if (typeof feedbackData !== 'undefined' && feedbackData.length > 0) {
        finalFeedback = feedbackData.length;
    } else if (window.STATIC_FEEDBACK) {
        finalFeedback = window.STATIC_FEEDBACK.length;
    }

    // Update tampilan dengan animasi smooth (Silent Refresh)
    const smoothUpdate = (el, newVal) => {
        if (!el) return;
        const currentVal = parseInt(el.innerText.replace(/[^0-9]/g, '')) || 0;
        
        // Update data-target agar IntersectionObserver di router.js tetap sinkron
        el.setAttribute('data-target', newVal);

        if (currentVal === newVal) return;
        
        // Jika selisihnya besar atau nilai lama adalah 0, langsung update (atau biarkan router.js handle)
        if (currentVal === 0) {
            el.innerText = newVal + (el.innerText.includes('%') ? '%' : '+');
            return;
        }

        // Animasi kenaikan kecil (misal dari 500 ke 505)
        let start = currentVal;
        const duration = 1000; // 1 detik
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuad = t => t * (2 - t);
            const current = Math.floor(start + (newVal - start) * easeOutQuad(progress));
            
            el.innerText = current + (el.innerText.includes('%') ? '%' : '+');

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                el.innerText = newVal + (el.innerText.includes('%') ? '%' : '+');
            }
        };
        requestAnimationFrame(animate);
    };

    smoothUpdate(ordersEl, finalOrders);
    smoothUpdate(clientsEl, finalClients);
    smoothUpdate(feedbackEl, finalFeedback);

    if (responseEl && window.orderConfig) {
        responseEl.innerText = orderConfig.fastResponse;
    }
}

// Jalankan sync saat halaman dimuat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => syncOrderStats());
} else {
    syncOrderStats();
}

// Dengarkan sinyal jika data Firebase baru saja masuk
window.addEventListener('firebaseTestimonialsLoaded', () => {
    syncOrderStats();
});

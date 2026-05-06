import { db, collection, getDocs } from './firebase-config.js';

export async function syncFirebaseTestimonials() {
    // Instant Check: Jika data sudah ada di memori (dari halaman sebelumnya), langsung render!
    if (window.testimonialData && window.testimonialData.length > (window.STATIC_TESTIMONIALS?.length || 0)) {
        console.log("Firebase Global Sync: Menggunakan data yang sudah ter-load...");
        if (typeof renderTestimonials === 'function') renderTestimonials();
        if (typeof syncOrderStats === 'function') syncOrderStats();
    }

    console.log("%c Firebase Global Sync: Memulai fetch data dari database... ", "background: #00f2ff; color: #000; font-weight: bold;");
    try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        
        const firebaseData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (!data.image) data.image = './assets/preview.png'; 
            firebaseData.push(data);
        });

        console.log(`Firebase Global Sync: fetched ${firebaseData.length} items`);

        if (firebaseData.length > 0) {
            // Urutkan berdasarkan createdAt jika ada
            firebaseData.sort((a, b) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });

            // Gabungkan data Firebase (baru) dengan data statis (lama)
            // Reset dulu ke static untuk menghindari duplikasi
            const staticData = window.STATIC_TESTIMONIALS || [];
            window.testimonialData = [...firebaseData, ...staticData];
        } else {
            window.testimonialData = [...(window.STATIC_TESTIMONIALS || [])];
        }
        
        // Re-render testimoni jika fungsi tersedia
        if (typeof renderTestimonials === 'function') {
            renderTestimonials();
        }

        // Update statistik order & client di index.html jika fungsi tersedia
        if (typeof syncOrderStats === 'function') {
            syncOrderStats();
        }

        // Kirim sinyal bahwa data Firebase sudah siap
        window.dispatchEvent(new CustomEvent('firebaseTestimonialsLoaded', { 
            detail: window.testimonialData 
        }));
    } catch (error) {
        console.error("Gagal sinkronisasi Firebase:", error);
        if (typeof renderTestimonials === 'function') {
            renderTestimonials();
        }
    }
}

// Auto run when imported
syncFirebaseTestimonials();

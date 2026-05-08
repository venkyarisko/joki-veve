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
        
        const imageFirebase = [];
        const feedbackFirebase = [];
        const resultFirebase = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Cek apakah ini feedback tekstual, hasil kerja, atau screenshot
            if (data.type === 'feedback' || (data.message && data.rating)) {
                feedbackFirebase.push(data);
            } else if (data.type === 'result') {
                resultFirebase.push(data);
            } else {
                if (!data.image) data.image = './assets/preview.png'; 
                imageFirebase.push(data);
            }
        });

        console.log(`Firebase Global Sync: fetched ${imageFirebase.length} images, ${feedbackFirebase.length} feedback items, & ${resultFirebase.length} result items`);

        // Sort data Firebase berdasarkan createdAt jika ada
        const sortByDate = (a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
        };

        imageFirebase.sort(sortByDate);
        feedbackFirebase.sort(sortByDate);
        resultFirebase.sort(sortByDate);

        // Gabungkan dengan data statis
        window.testimonialData = [...imageFirebase, ...(window.STATIC_TESTIMONIALS || [])];
        window.feedbackData = [...feedbackFirebase, ...(window.STATIC_FEEDBACK || [])];
        window.resultsData = [...resultFirebase]; // Results usually only from Firebase
        
        // Re-render testimoni jika fungsi tersedia (cek tab aktif)
        if (typeof renderTestimonials === 'function' && (typeof currentTab === 'undefined' || currentTab === 'images')) {
            renderTestimonials();
        }
        if (typeof renderFeedback === 'function' && (typeof currentTab !== 'undefined' && currentTab === 'feedback')) {
            renderFeedback();
        }
        if (typeof renderResults === 'function' && (typeof currentTab !== 'undefined' && currentTab === 'results')) {
            renderResults();
        }

        // Update statistik order & client di index.html jika fungsi tersedia
        if (typeof syncOrderStats === 'function') {
            syncOrderStats();
        }

        // Kirim sinyal bahwa data Firebase sudah siap
        window.dispatchEvent(new CustomEvent('firebaseTestimonialsLoaded', { 
            detail: { 
                images: window.testimonialData, 
                feedback: window.feedbackData,
                results: window.resultsData
            } 
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

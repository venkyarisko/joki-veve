// Define static data as a base
window.STATIC_TESTIMONIALS = [
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/1.png',
        name: 'Morieyama Ken',
        service: ['Maintenance Factory'],
        price: 'Rp 25.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/2.png',
        name: 'Morieyama Ken',
        service: ['Maintenance Factory'],
        price: 'Rp 40.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/3.png',
        name: 'V9LENTINE',
        service: ['Maintenance Factory'],
        price: 'Rp 40.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/4.png',
        name: 'V9LENTINE',
        service: ['Maintenance Factory'],
        price: 'Rp 70.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/5.png',
        name: 'V9LENTINE',
        service: ['Maintenance Factory'],
        price: 'Rp 100.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/6.png',
        name: 'V9LENTINE',
        service: ['Maintenance Factory'],
        price: 'Rp 170.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/7.png',
        name: 'Lolipopo',
        service: ['Rawat Akun', 'Story', 'Exploration'],
        price: 'Rp 800.000',
        status: 1,
        worker: 'VeveGo'
    },
    {
        game: 'Arknight Endfield',
        image: './assets/testimoni/8.png',
        name: 'Lolipopo',
        service: ['Event Participation', 'Endgame Content'],
        price: 'Rp 238.000',
        status: 1,
        worker: 'VeveGo'
    }
];

window.STATIC_FEEDBACK = [];


// Active data that can be updated from Firebase
if (!window.testimonialData || window.testimonialData.length <= STATIC_TESTIMONIALS.length) {
    window.testimonialData = [...STATIC_TESTIMONIALS];
}

// --- Rendering Logic ---
if (typeof currentPage === 'undefined') {
    var currentPage = 1;
}
if (typeof currentPageImages === 'undefined') {
    var currentPageImages = 1;
    var currentPageFeedback = 1;
    var currentPageResults = 1;
    var itemsPerPage = 9;
    var currentTab = 'images';
}

function switchTestiTab(tab) {
    currentTab = tab;
    
    // Update buttons
    document.querySelectorAll('.testi-tab').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-${tab}`).classList.add('active');
    
    // Show/Hide containers
    const imgContainer = document.getElementById('testimonial-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const resultsContainer = document.getElementById('results-container');
    const cta = document.getElementById('add-feedback-cta');
    
    // Reset display
    imgContainer.style.display = 'none';
    feedbackContainer.style.display = 'none';
    resultsContainer.style.display = 'none';

    if (tab === 'images') {
        imgContainer.style.display = 'grid';
        if (cta) cta.style.display = 'none';
        renderTestimonials();
    } else if (tab === 'results') {
        resultsContainer.style.display = 'grid';
        if (cta) cta.style.display = 'none';
        renderResults();
    } else {
        feedbackContainer.style.display = 'grid';
        if (cta) cta.style.display = 'block';
        renderFeedback();
    }
}

function changePage(delta) {
    if (currentTab === 'images') {
        const totalPages = Math.ceil((window.testimonialData || []).length / itemsPerPage);
        currentPageImages += delta;
        if (currentPageImages < 1) currentPageImages = 1;
        if (currentPageImages > totalPages) currentPageImages = totalPages;
        renderTestimonials();
    } else if (currentTab === 'results') {
        const totalPages = Math.ceil((window.resultsData || []).length / itemsPerPage);
        currentPageResults += delta;
        if (currentPageResults < 1) currentPageResults = 1;
        if (currentPageResults > totalPages) currentPageResults = totalPages;
        renderResults();
    } else {
        const totalPages = Math.ceil((window.feedbackData || []).length / itemsPerPage);
        currentPageFeedback += delta;
        if (currentPageFeedback < 1) currentPageFeedback = 1;
        if (currentPageFeedback > totalPages) currentPageFeedback = totalPages;
        renderFeedback();
    }
    
    // Smooth scroll to top of section
    document.querySelector('.testi-tabs').scrollIntoView({ behavior: 'smooth' });
}

function renderResults() {
    const container = document.getElementById('results-container');
    const pagination = document.getElementById('pagination');
    if (!container) return;

    container.innerHTML = '';
    
    const resultsData = window.resultsData || [];
    
    if (resultsData.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.5; padding: 40px;">Belum ada hasil kerja yang ditampilkan.</p>';
        if (pagination) pagination.style.display = 'none';
        return;
    }

    const totalPages = Math.ceil(resultsData.length / itemsPerPage);
    if (currentPageResults > totalPages) currentPageResults = totalPages;
    if (currentPageResults < 1) currentPageResults = 1;

    const start = (currentPageResults - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = resultsData.slice(start, end);

    pageItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.style.position = 'relative';
        
        // Handle multiple images for preview layout
        const images = Array.isArray(item.images) ? item.images : (item.image ? [item.image] : []);
        const hasMultiple = images.length > 1;
        
        // Simpler 2-column preview layout (max 2 visible slots)
        const layoutNum = Math.min(images.length, 2);
        const previewImages = images.slice(0, layoutNum);
        const imgHTML = previewImages.map(img => `<img src="${img}" alt="${item.name}" loading="lazy">`).join('');
        
        // Calculate extra images: If more than 2, the overlay covers the 2nd slot, 
        // so we show total count minus the 1st visible image.
        const moreCount = images.length > 2 ? images.length - 1 : 0;

        card.onclick = () => openLightbox(images);
        card.innerHTML = `
            ${hasMultiple ? `<div class="multi-image-badge"><i class="fas fa-images"></i> ${images.length}</div>` : ''}
            <div class="result-img-wrapper layout-${layoutNum}">
                ${imgHTML}
                ${moreCount > 0 ? `<div class="more-overlay">+${moreCount}</div>` : ''}
            </div>
            <div class="result-info">
                <span class="result-name">${item.name}</span>
                <span class="result-service">${item.game} • ${item.service}</span>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Update pagination UI
    if (pagination) {
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
        document.getElementById('page-info').textContent = `Page ${currentPageResults} of ${totalPages}`;
        document.getElementById('prev-btn').disabled = currentPageResults === 1;
        document.getElementById('next-btn').disabled = currentPageResults === totalPages;
    }
    
    setupResultAnimations();
}

function setupResultAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.result-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function renderFeedback() {
    const container = document.getElementById('feedback-container');
    const pagination = document.getElementById('pagination');
    if (!container) return;

    container.innerHTML = '';
    
    const feedbackData = window.feedbackData || window.STATIC_FEEDBACK || [];
    
    if (feedbackData.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.5; padding: 40px;">Belum ada feedback dari customer.</p>';
        pagination.style.display = 'none';
        return;
    }

    const totalPages = Math.ceil(feedbackData.length / itemsPerPage);
    if (currentPageFeedback > totalPages) currentPageFeedback = totalPages;
    if (currentPageFeedback < 1) currentPageFeedback = 1;

    const start = (currentPageFeedback - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = feedbackData.slice(start, end);

    pageItems.forEach(item => {
        const initials = item.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
        
        const card = document.createElement('div');
        card.className = 'feedback-card';
        card.innerHTML = `
            <div class="feedback-header">
                <div class="feedback-rating">${stars}</div>
                <div class="feedback-date">${item.date || 'Recent'}</div>
            </div>
            <div class="feedback-message">${item.message}</div>
            <div class="feedback-footer">
                <div class="feedback-avatar">${initials}</div>
                <div class="feedback-user-info">
                    <span class="feedback-name">${item.name}</span>
                    <span class="feedback-meta-info">${item.game} • ${item.service}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Update pagination UI
    if (pagination) {
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
        document.getElementById('page-info').textContent = `Page ${currentPageFeedback} of ${totalPages}`;
        document.getElementById('prev-btn').disabled = currentPageFeedback === 1;
        document.getElementById('next-btn').disabled = currentPageFeedback === totalPages;
    }
    
    setupFeedbackAnimations();
}

function setupFeedbackAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feedback-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function renderTestimonials() {
    const container = document.getElementById('testimonial-container');
    const pagination = document.getElementById('pagination');
    if (!container) return;

    container.innerHTML = '';
    
    const data = window.testimonialData || [];
    const totalPages = Math.ceil(data.length / itemsPerPage);

    if (currentPageImages > totalPages) currentPageImages = totalPages;
    if (currentPageImages < 1) currentPageImages = 1;

    const startIndex = (currentPageImages - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach(testi => {
        const isComplete = testi.status === 1;
        const statusText = isComplete ? 'Complete' : 'On Process';
        const statusClass = isComplete ? 'status-complete' : 'status-process';

        let serviceHTML = '';
        if (Array.isArray(testi.service)) {
            serviceHTML = `<div class="service-tags">
                ${testi.service.map(s => `<span class="service-tag">${s}</span>`).join('')}
            </div>`;
        } else {
            serviceHTML = `<span class="customer-service">${testi.service}</span>`;
        }

        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.onclick = () => openLightbox(testi.image);

        card.innerHTML = `
            <div class="testimonial-img-wrapper">
                <img src="${testi.image}" alt="${testi.name}" loading="lazy">
            </div>
            <div class="customer-info">
                <span class="customer-game">${testi.game || 'Game Service'}</span>
                <span class="customer-name">${testi.name}</span>
                ${serviceHTML}
                ${testi.worker ? `<div class="worker-tag"><i class="fas fa-user-ninja"></i> ${testi.worker}</div>` : ''}
                <div class="customer-meta">
                    <span class="customer-price">${testi.price}</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    if (pagination) {
        pagination.style.display = totalPages > 1 ? 'flex' : 'none';
        document.getElementById('page-info').textContent = `Page ${currentPageImages} of ${totalPages}`;
        document.getElementById('prev-btn').disabled = currentPageImages === 1;
        document.getElementById('next-btn').disabled = currentPageImages === totalPages;
    }
    
    setupAnimations();
}

function updatePagination() {
    // Deprecated in favor of inline logic in render functions
}

let currentGallery = [];
let currentGalleryIndex = 0;

function openLightbox(srcOrArray) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const counter = document.getElementById('gallery-counter');
    
    if (!lightbox || !img) return;

    if (Array.isArray(srcOrArray)) {
        currentGallery = srcOrArray;
        currentGalleryIndex = 0;
    } else {
        currentGallery = [srcOrArray];
        currentGalleryIndex = 0;
    }

    updateGalleryUI();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function updateGalleryUI() {
    const img = document.getElementById('lightbox-img');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const counter = document.getElementById('gallery-counter');

    if (!img) return;

    img.src = currentGallery[currentGalleryIndex];
    
    if (currentGallery.length > 1) {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (counter) {
            counter.style.display = 'block';
            counter.textContent = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
        }
    } else {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (counter) counter.style.display = 'none';
    }
}

window.changeGalleryImage = function(delta) {
    currentGalleryIndex += delta;
    if (currentGalleryIndex < 0) currentGalleryIndex = currentGallery.length - 1;
    if (currentGalleryIndex >= currentGallery.length) currentGalleryIndex = 0;
    updateGalleryUI();
};

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Global window listeners for the lightbox - Added once
if (!window._testiListenersAdded) {
    window.addEventListener('click', (event) => {
        const lightbox = document.getElementById('lightbox');
        if (event.target == lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === 'ArrowLeft') window.changeGalleryImage(-1);
            if (e.key === 'ArrowRight') window.changeGalleryImage(1);
        }
    });
    window._testiListenersAdded = true;
}

function setupAnimations() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}


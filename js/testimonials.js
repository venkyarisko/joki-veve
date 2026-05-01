if (!window.testimonialData) {
    window.testimonialData = [
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/1.png',
            name: 'Morieyama Ken',
            service: ['Maintenance Factory'],
            price: 'Rp 25.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/2.png',
            name: 'Morieyama Ken',
            service: ['Maintenance Factory'],
            price: 'Rp 40.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/3.png',
            name: 'V9LENTINE',
            service: ['Maintenance Factory'],
            price: 'Rp 40.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/4.png',
            name: 'V9LENTINE',
            service: ['Maintenance Factory'],
            price: 'Rp 70.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/5.png',
            name: 'V9LENTINE',
            service: ['Maintenance Factory'],
            price: 'Rp 100.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/6.png',
            name: 'V9LENTINE',
            service: ['Maintenance Factory'],
            price: 'Rp 170.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/7.png',
            name: 'Lolipopo',
            service: ['Rawat Akun', 'Story', 'Exploration'],
            price: 'Rp 800.000',
            status: 1
        },
        {
            game: 'Arknight Endfield',
            image: 'assets/testimoni/8.png',
            name: 'Lolipopo',
            service: ['Event Participation', 'Endgame Content'],
            price: 'Rp 238.000',
            status: 1
        }
    ];
}

// --- Rendering Logic ---
if (typeof currentPage === 'undefined') {
    var currentPage = 1;
}
if (typeof itemsPerPage === 'undefined') {
    var itemsPerPage = 9;
}

function renderTestimonials() {
    const container = document.getElementById('testimonial-container');
    if (!container) return;

    container.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = testimonialData.slice(startIndex, endIndex);

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
                <div class="customer-meta">
                    <span class="customer-price">${testi.price}</span>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    updatePagination();
    setupAnimations();
}

function updatePagination() {
    const totalPages = Math.ceil(testimonialData.length / itemsPerPage);
    const paginationEl = document.getElementById('pagination');
    if (!paginationEl) return;

    if (testimonialData.length > itemsPerPage) {
        paginationEl.style.display = 'flex';
        document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
        document.getElementById('prev-btn').disabled = currentPage === 1;
        document.getElementById('next-btn').disabled = currentPage === totalPages;
    } else {
        paginationEl.style.display = 'none';
    }
}

function changePage(direction) {
    currentPage += direction;
    renderTestimonials();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!lightbox || !img) return;

    img.src = src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

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


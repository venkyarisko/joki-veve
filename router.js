/**
 * router.js - Minimal SPA Router for Veve Services
 * Handles page transitions without reloading the navbar and background.
 */

// --- Global Page Handlers ---

const PageHandlers = {
    initHome: () => {
        console.log("Initializing Home Page...");

        // Sync order stats if the function exists (from orders.js)
        if (typeof syncOrderStats === 'function') syncOrderStats();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || !targetId) return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Reveal animations on scroll
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.game-card, .feature-item, .testimonial-cta, .workflow-item, .faq-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });

        // FAQ Accordion Logic
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all other FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Stats count-up animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-target'));
                    if (!countTo) return;

                    let count = 0;
                    const duration = 2000;
                    const increment = countTo / (duration / 16);

                    const updateCount = () => {
                        count += increment;
                        if (count < countTo) {
                            target.innerText = Math.ceil(count) + (target.innerText.includes('%') ? '%' : '+');
                            requestAnimationFrame(updateCount);
                        } else {
                            target.innerText = countTo + (target.innerText.includes('%') ? '%' : '+');
                        }
                    };
                    updateCount();
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(stat => statsObserver.observe(stat));
    },

    initTestimonials: () => {
        console.log("Initializing Testimonials Page...");
        if (typeof renderTestimonials === 'function') {
            renderTestimonials();
        }
    }
};

// --- SPA Router Logic ---

async function navigate(url, addHistory = true) {
    // Fallback for file:// protocol (CORS restriction)
    if (window.location.protocol === 'file:') {
        window.location.href = url;
        return;
    }

    if (url === window.location.href && addHistory) return;

    const main = document.getElementById('main-content');
    document.body.classList.add('page-transitioning');

    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const newMain = doc.getElementById('main-content');
        if (!newMain) {
            window.location.href = url; // Fallback if not an SPA-ready page
            return;
        }

        const newContent = newMain.innerHTML;
        const newTitle = doc.title;

        // Small delay for fade out effect
        setTimeout(() => {
            main.innerHTML = newContent;
            document.title = newTitle;
            document.body.classList.remove('page-transitioning');

            if (addHistory) history.pushState({}, '', url);

            // Re-initialize scripts based on the new page
            const path = window.location.pathname;
            if (path.includes('testimoni.html')) {
                PageHandlers.initTestimonials();
            } else {
                PageHandlers.initHome();
            }

            // Update Navbar Active State
            updateNavbarActive(path);

            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 400);
    } catch (err) {
        console.error("Navigation failed:", err);
        window.location.href = url; // Fallback
    }
}

function updateNavbarActive(path) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        link.classList.remove('active');
        link.removeAttribute('style');

        if (path.includes('testimoni.html') && linkPath && linkPath.includes('testimoni.html')) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else if (!path.includes('testimoni.html') && linkPath && (linkPath === 'index.html' || linkPath.startsWith('#'))) {
            // Index or home anchors
        }
    });
}

// Intercept all clicks
document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const url = link.href;
    const isLocal = url.startsWith(window.location.origin);
    const isAnchor = link.getAttribute('href').startsWith('#');
    const isTargetBlank = link.target === '_blank';

    if (isLocal && !isAnchor && !isTargetBlank) {
        e.preventDefault();
        navigate(url);
    }
});

// Handle Back/Forward buttons
window.addEventListener('popstate', () => {
    navigate(window.location.href, false);
});

// --- Global UI Logic (Navbar, etc.) ---

function initNavbar() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Initial run
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    const path = window.location.pathname;
    if (path.includes('testimoni.html')) {
        PageHandlers.initTestimonials();
    } else {
        PageHandlers.initHome();
    }
});

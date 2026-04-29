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

/// --- SPA Router Logic ---

/**
 * Simplified & Robust Navigation
 */
async function navigate(url, addHistory = true) {
    console.log("SPA: Starting navigation to", url);
    
    try {
        const urlObj = new URL(url, window.location.href);
        const targetHash = urlObj.hash;
        
        // Fallback for file protocol or different origin
        if (window.location.protocol === 'file:' || urlObj.origin !== window.location.origin) {
            window.location.href = url;
            return;
        }

        const main = document.getElementById('main-content');
        if (!main) {
            window.location.href = url;
            return;
        }

        // Normalize paths to compare if we are staying on the same page
        const norm = p => p.replace(/index\.html$/, '').replace(/\/$/, '');
        const isSamePage = norm(urlObj.pathname) === norm(window.location.pathname);

        if (isSamePage && targetHash) {
            console.log("SPA: Internal hash link");
            if (addHistory) history.pushState({}, '', url);
            const target = document.querySelector(targetHash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        // If it's exactly the same URL, do nothing
        if (url === window.location.href && addHistory) return;

        // Start transition
        document.body.classList.add('page-transitioning');

        // Fetch using the pathname (safest for same-origin)
        console.log("SPA: Fetching", urlObj.pathname);
        const response = await fetch(urlObj.pathname);
        if (!response.ok) throw new Error("Fetch failed");
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.getElementById('main-content');

        if (!newMain) throw new Error("No #main-content found");

        const newContent = newMain.innerHTML;
        const newTitle = doc.title;

        // Content swap with a small delay for animation if any
        setTimeout(() => {
            main.innerHTML = newContent;
            document.title = newTitle;
            document.body.classList.remove('page-transitioning');

            if (addHistory) history.pushState({}, '', url);

            // Re-initialize based on the new path
            const currentPath = window.location.pathname;
            console.log("SPA: Navigated to", currentPath);
            
            // Support both /testimoni.html and clean /testimoni URLs
            if (currentPath.includes('testimoni')) {
                if (typeof PageHandlers !== 'undefined') PageHandlers.initTestimonials();
            } else {
                if (typeof PageHandlers !== 'undefined') PageHandlers.initHome();
            }

            updateNavbarActive(currentPath);

            // Handle scroll after content swap
            if (targetHash) {
                const target = document.querySelector(targetHash);
                if (target) {
                    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
                }
            } else {
                window.scrollTo(0, 0);
            }
        }, 300);

    } catch (err) {
        console.error("SPA ERROR:", err);
        window.location.href = url; // Hard fallback
    }
}

function updateNavbarActive(path) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        link.classList.remove('active');
        link.removeAttribute('style');

        const isTestimonialsPage = path.includes('testimoni');
        const linkIsTestimonials = href.includes('testimoni');
        
        if (isTestimonialsPage && linkIsTestimonials) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        }
    });
}

// Intercept all clicks
document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const hrefAttr = link.getAttribute('href');
    if (!hrefAttr) return;

    // Skip external links, target=_blank, and special protocols
    if (link.origin !== window.location.origin || link.target === '_blank' || hrefAttr.includes(':')) return;

    // Skip simple anchors on the same page
    if (hrefAttr.startsWith('#')) return;

    // Everything else is a candidate for SPA navigation
    console.log("SPA: Intercepting click on", hrefAttr);
    e.preventDefault();
    navigate(link.href);
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
        mobileMenuToggle.onclick = (e) => {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        };

        navLinks.onclick = (e) => {
            if (e.target.closest('a')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        };

        document.onclick = (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        };
    }
}

// Initial run
document.addEventListener('DOMContentLoaded', () => {
    console.log("SPA: DOMContentLoaded");
    initNavbar();
    const path = window.location.pathname;
    
    updateNavbarActive(path);
    
    // Support both /testimoni.html and clean /testimoni URLs
    if (path.includes('testimoni')) {
        PageHandlers.initTestimonials();
    } else {
        PageHandlers.initHome();
    }
    
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 600);
    }
});

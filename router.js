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

/**
 * Enhanced navigation that handles hashes and scrolls to target elements
 */
async function navigate(url, addHistory = true) {
    const urlObj = new URL(url, window.location.href);
    const targetHash = urlObj.hash;
    const cleanUrl = url.split('#')[0];

    // Fallback for file:// protocol (CORS restriction)
    if (window.location.protocol === 'file:') {
        window.location.href = url;
        return;
    }

    // If it's just a hash on the current page, let the smooth scroll handler or browser handle it
    const currentCleanUrl = window.location.href.split('#')[0];
    if (cleanUrl === currentCleanUrl && targetHash) {
        if (addHistory) history.pushState({}, '', url);
        const target = document.querySelector(targetHash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
    }

    if (url === window.location.href && addHistory) return;

    const main = document.getElementById('main-content');
    if (!main) {
        window.location.href = url;
        return;
    }

    document.body.classList.add('page-transitioning');

    try {
        const response = await fetch(cleanUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        
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

            // Scroll logic: to hash or top
            if (targetHash) {
                const target = document.querySelector(targetHash);
                if (target) {
                    // Give a tiny bit of time for DOM to settle
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                } else {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        }, 400);
    } catch (err) {
        console.error("Navigation failed:", err);
        window.location.href = url; // Fallback
    }
}

function updateNavbarActive(path) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        link.classList.remove('active');
        link.removeAttribute('style');

        const isTestimonialsPage = path.includes('testimoni.html');
        const linkIsTestimonials = href.includes('testimoni.html');
        
        if (isTestimonialsPage && linkIsTestimonials) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else if (!isTestimonialsPage && (href === 'index.html' || href === '#' || href.startsWith('#'))) {
            // Home/Index links
        }
    });
}

// Intercept all clicks
document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    const url = link.href; // Absolute URL
    const isLocal = url.startsWith(window.location.origin);
    const isAnchor = href.startsWith('#');
    const isTargetBlank = link.target === '_blank';

    // Only intercept local, non-anchor, non-new-tab links
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
                navLinks.classList.toggle('active');
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
    
    // Update active state on load
    updateNavbarActive(path);
    
    if (path.includes('testimoni.html')) {
        PageHandlers.initTestimonials();
    } else {
        PageHandlers.initHome();
    }
    
    // Check if there is an initial hash to scroll to
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
});

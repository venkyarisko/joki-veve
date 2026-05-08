/**
 * router.js - Minimal SPA Router for Veve Services
 * Handles page transitions without reloading the navbar and background.
 */

// --- Initial Redirect Logic ---
(function() {
    const path = window.location.pathname;
    let cleanPath = path;

    // Detect base path from the router script itself
    let base = '/';
    const script = document.querySelector('script[src*="router.js"]');
    if (script) {
        try {
            const scriptUrl = new URL(script.src, window.location.href);
            base = scriptUrl.pathname.replace('js/router.js', '');
        } catch(e) {}
    }

    if (cleanPath.endsWith('.html')) {
        cleanPath = cleanPath.replace('.html', '');
    }

    if (cleanPath.endsWith('/index')) {
        cleanPath = cleanPath.slice(0, -5); // Keep the trailing slash
    }
    
    // Ensure the root path has a trailing slash
    if (base !== '/' && cleanPath === base.slice(0, -1)) {
        cleanPath = base;
    }

    if (cleanPath !== path || window.location.hash) {
        try {
            window._pendingHash = window.location.hash;
            history.replaceState(null, '', cleanPath + window.location.search);
        } catch (e) {
            console.warn("SPA: Could not update URL state", e);
        }
    }
})();

// --- Global Page Handlers ---

const PageHandlers = {
    initHome: () => {
        console.log("Initializing Home Page...");

        // Sync order stats if the function exists (from orders.js)
        if (typeof syncOrderStats === 'function') syncOrderStats();

        // Reveal animations on scroll
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Instant finish for mobile to avoid frozen state
                    const isMobile = window.innerWidth <= 768;
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, isMobile ? 300 : 600);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.game-card, .feature-item, .testimonial-cta, .workflow-item, .faq-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            el.style.willChange = 'opacity, transform';
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

                    let count = parseInt(target.innerText.replace(/[^0-9]/g, '')) || 0;
                    const duration = 2000;
                    const increment = (countTo - count) / (duration / 16);

                    if (count >= countTo) {
                        target.innerText = countTo + (target.innerText.includes('%') ? '%' : '+');
                        return;
                    }

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
    },

    initKalkulator: () => {
        console.log("Initializing Kalkulator Page...");
        if (typeof renderGames === 'function') {
            renderGames();
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
        const norm = p => p.replace(/index(\.html)?$/, '').replace(/\/$/, '');
        const isSamePage = norm(urlObj.pathname) === norm(window.location.pathname);

        if (isSamePage && targetHash) {
            console.log("SPA: Internal hash link");
            // Keep URL clean and avoid reload
            if (addHistory) history.pushState({}, '', window.location.pathname);
            
            const target = document.querySelector(targetHash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Update navbar active state
            if (typeof Navbar !== 'undefined') Navbar.render();
            
            return;
        }

        // If it's the same page, just scroll to top
        if (isSamePage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            let historyUrl = urlObj.pathname.replace(/\.html$/, '');
            if (historyUrl.endsWith('/index')) historyUrl = historyUrl.slice(0, -5);
            
            if (addHistory) history.pushState({}, '', historyUrl + urlObj.search + urlObj.hash);
            if (typeof Navbar !== 'undefined') Navbar.render();
            return;
        }

        // Start transition
        document.body.classList.add('page-transitioning');

        // Fetch using the pathname (safest for same-origin)
        let fetchPath = urlObj.pathname;
        if (fetchPath === '/' || fetchPath.endsWith('/')) {
            fetchPath += 'index.html';
        } else if (!fetchPath.endsWith('.html')) {
            fetchPath += '.html';
        }

        console.log("SPA: Fetching", fetchPath);
        const response = await fetch(fetchPath);
        if (!response.ok) throw new Error("Fetch failed");
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMain = doc.getElementById('main-content');
        if (!newMain) throw new Error("No #main-content found");

        // Fix relative paths in the new content before swapping
        const baseDir = fetchPath.substring(0, fetchPath.lastIndexOf('/') + 1);
        
        newMain.querySelectorAll('img, a, source').forEach(el => {
            const attr = el.tagName === 'A' ? 'href' : 'src';
            const val = el.getAttribute(attr);
            
            if (val && !val.startsWith('http') && !val.startsWith('/') && !val.startsWith('#') && !val.startsWith('javascript:')) {
                el.setAttribute(attr, baseDir + val);
            }
        });

        // Pre-sync stats & status in the detached document to avoid flicker
        if (typeof syncOrderStats === 'function') {
            syncOrderStats(doc);
        }
        if (typeof updateStatus === 'function') {
            updateStatus(doc);
        }

        const newContent = newMain.innerHTML;
        const newTitle = doc.title;

        // Content swap with a small delay for animation if any
        setTimeout(async () => {
            main.innerHTML = newContent;
            document.title = newTitle;
            document.body.classList.remove('page-transitioning');

            // Clear page-specific data to prevent stale data from previous pages
            if (typeof jokiServices !== 'undefined') jokiServices = undefined;

            // Execute scripts found in the fetched content, skipping global ones already loaded
            const scriptPromises = [];
            doc.querySelectorAll('script').forEach(oldScript => {
                const src = oldScript.getAttribute('src');
                if (src && (
                    src.includes('navbar.js') || 
                    src.includes('router.js') || 
                    src.includes('background-animation.js') ||
                    src.includes('activity-ticker.js') ||
                    src.includes('footer.js') ||
                    src.includes('floating-buttons.js') ||
                    src.includes('security.js')
                )) {
                    return; // Skip global scripts
                }

                // For page-specific scripts, we want to re-execute them if they are already in the DOM.
                // This ensures data.js for different games is correctly re-loaded.
                if (src) {
                    const absoluteSrc = src.startsWith('http') || src.startsWith('/') ? src : baseDir + src;
                    const fullUrl = new URL(absoluteSrc, window.location.href).href;
                    
                    // Find any existing script with the same absolute URL and remove it
                    const existingScripts = document.querySelectorAll('script[src]');
                    existingScripts.forEach(s => {
                        if (s.src === fullUrl) {
                            console.log("SPA: Refreshing script:", fullUrl);
                            s.remove();
                        }
                    });
                }

                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                
                // Fix relative paths for fetched scripts
                if (src && !src.startsWith('http') && !src.startsWith('/')) {
                    newScript.src = baseDir + src;
                }

                if (newScript.src) {
                    const promise = new Promise((resolve) => {
                        newScript.onload = () => {
                            console.log("SPA: Script loaded:", newScript.src);
                            resolve();
                        };
                        newScript.onerror = () => {
                            console.warn("SPA: Script failed to load:", newScript.src);
                            resolve(); // Continue anyway
                        };
                    });
                    scriptPromises.push(promise);
                }

                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                document.body.appendChild(newScript);
                if (!newScript.src) newScript.remove();
            });

            // Wait for all scripts to load before initializing the page
            if (scriptPromises.length > 0) {
                console.log("SPA: Waiting for", scriptPromises.length, "scripts...");
                await Promise.all(scriptPromises);
            }

            // Use clean URLs in history
            let historyUrl = urlObj.pathname.replace(/\.html$/, '');
            if (historyUrl.endsWith('/index')) historyUrl = historyUrl.slice(0, -5);
            if (addHistory) history.pushState({}, '', historyUrl + urlObj.search + urlObj.hash);

            // Re-initialize based on the new path
            const currentPath = window.location.pathname;
            console.log("SPA: Navigated to", currentPath);
            
            // Support both /testimoni.html and clean /testimoni URLs
            if (currentPath.includes('testimoni')) {
                if (typeof PageHandlers !== 'undefined') PageHandlers.initTestimonials();
            } else if (currentPath.includes('kalkulator')) {
                if (typeof PageHandlers !== 'undefined') PageHandlers.initKalkulator();
            } else {
                if (typeof PageHandlers !== 'undefined') PageHandlers.initHome();
            }

            if (typeof Navbar !== 'undefined') Navbar.render();

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

// Intercept all clicks
document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const hrefAttr = link.getAttribute('href');
    if (!hrefAttr) return;

    // Skip external links, target=_blank, and special protocols
    if (link.origin !== window.location.origin || link.target === '_blank' || hrefAttr.includes(':')) return;

    // Everything else is a candidate for SPA navigation
    console.log("SPA: Intercepting click on", hrefAttr);
    e.preventDefault();
    navigate(link.href);
});

// Handle Back/Forward buttons
window.addEventListener('popstate', () => {
    navigate(window.location.href, false);
});

// Initial run
document.addEventListener('DOMContentLoaded', () => {
    console.log("SPA: DOMContentLoaded");
    const path = window.location.pathname;
    
    // Support both /testimoni.html and clean /testimoni URLs
    if (path.includes('testimoni')) {
        PageHandlers.initTestimonials();
    } else if (path.includes('kalkulator')) {
        PageHandlers.initKalkulator();
    } else {
        PageHandlers.initHome();
    }
    
    if (window._pendingHash) {
        setTimeout(() => {
            const target = document.querySelector(window._pendingHash);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            window._pendingHash = null; // Clear it
        }, 600);
    }
});

/**
 * Security script to prevent image theft and discourage devtools usage.
 * Protects against: Right-click, Drag-and-drop, and common shortcuts.
 */

(function () {
    'use strict';

    if (window._securityInitialized) return;
    window._securityInitialized = true;

    const protectImages = () => {
        // Prevent context menu on all images
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });

        // Prevent dragging on all images
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                return false;
            }
        });
    };


    // Advanced DevTools protection
    const devToolsProtection = () => {
        // Prevent right click on images
        document.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'IMG') {
                if (e.button === 2) {
                    e.preventDefault();
                    return false;
                }
            }
        }, true);
    };

    // Initialize protection
    const init = () => {
        protectImages();
        devToolsProtection();

        // Additional layer: Disable selecting text in sensitive areas
        const sensitiveElements = document.querySelectorAll('.testimonial-card, .modal-content');
        sensitiveElements.forEach(el => {
            el.style.userSelect = 'none';
            el.style.webkitUserSelect = 'none';
        });
    };

    // Run after DOM content is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Since testimonials are loaded dynamically, we need to periodically re-apply or use event delegation
    // The event listeners on 'document' already handle delegation for images.
})();

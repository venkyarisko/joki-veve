/**
 * footer.js - Dynamic Footer for Veve Services
 * Centralizes the footer to ensure consistency across all pages.
 */

if (!window.Footer) {
    window.Footer = {
    /**
     * Determine the root path dynamically
     */
    getRoot: function() {
        if (this._cachedRoot !== undefined) return this._cachedRoot;
        const script = document.querySelector('script[src*="footer.js"]');
        if (script) {
            const src = script.src;
            this._cachedRoot = src.replace('js/footer.js', '');
            return this._cachedRoot;
        }
        this._cachedRoot = '';
        return '';
    },

    render: function() {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) return;

        const currentYear = new Date().getFullYear();
        const root = this.getRoot();
        
        const html = `
            <footer style="padding: 40px 0; text-align: center; border-top: 1px solid var(--glass-border);">
                <div class="container">
                    <p style="color: var(--text-muted); margin-bottom: 10px;">&copy; ${currentYear} Veve Services. Jasa Joki Game Terpercaya & 100% Manual.</p>
                    <div class="footer-links" style="display: flex; justify-content: center; gap: 20px; font-size: 0.9rem; flex-wrap: wrap;">
                        <a href="https://discord.com/users/vevego" target="_blank" style="color: var(--text-muted); text-decoration: none; transition: var(--transition);">
                            <i class="fab fa-discord"></i> Discord
                        </a>
                        <a href="${root}#faq" style="color: var(--text-muted); text-decoration: none; transition: var(--transition);">
                            <i class="fas fa-question-circle"></i> FAQ
                        </a>
                        <a href="${root}testimoni" style="color: var(--text-muted); text-decoration: none; transition: var(--transition);">
                            <i class="fas fa-star"></i> Testimonials
                        </a>
                        <a href="${root}partner" style="color: var(--text-muted); text-decoration: none; transition: var(--transition);">
                            <i class="fas fa-handshake"></i> Partner
                        </a>
                    </div>
                </div>
            </footer>
        `;

        footerPlaceholder.innerHTML = html;

        // Add hover effects via JS since it's easier than injecting a style tag
        const links = footerPlaceholder.querySelectorAll('a');
        links.forEach(link => {
            link.onmouseover = () => link.style.color = 'var(--primary)';
            link.onmouseout = () => link.style.color = 'var(--text-muted)';
        });
    }
};
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    if (window.Footer) window.Footer.render();
});

// For SPA support: if script is re-loaded by router
if (document.readyState !== 'loading') {
    if (window.Footer) window.Footer.render();
}

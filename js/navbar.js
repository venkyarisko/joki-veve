/**
 * navbar.js - Dynamic Navbar for Veve Services
 * Centralizes the navigation bar to ensure consistency across all pages.
 */

if (!window.Navbar) {
window.Navbar = {
    links: [
        { name: 'Services', path: '#services' },
        { name: 'About', path: '#about' },
        { name: 'Kalkulator', path: 'kalkulator' },
        { name: 'Testimonials', path: 'testimoni' },
        { name: 'Partner', path: 'partner' },
        { name: 'Contact', path: '#contact' }
    ],

    /**
     * Determine the root path dynamically
     */
    getRoot: function() {
        if (this._cachedRoot !== undefined) return this._cachedRoot;

        // Look at the current script's source to find the path to the root
        const script = document.querySelector('script[src*="navbar.js"]');
        if (script) {
            const src = script.src; // Absolute URL
            this._cachedRoot = src.replace('js/navbar.js', '');
            return this._cachedRoot;
        }
        this._cachedRoot = '';
        return '';
    },

    /**
     * Get the correct path for a link based on current location
     */
    resolvePath: function(targetPath) {
        if (targetPath.startsWith('http') || targetPath.startsWith('/')) return targetPath;
        
        // Calculate depth from root
        // We can use the window.location.pathname and compare it to index.html's location
        // But a simpler way for SPA: links in the navbar should always be relative to the BASE URL of the site.
        
        // Since we are using SPA, it's best to use absolute paths from the root of the project.
        // Let's find the project root from the initial load.
        if (!this._root) {
            this._root = this.getRoot();
        }
        
        return this._root + targetPath;
    },

    render: function() {
        const navContainer = document.getElementById('navbar-placeholder');
        if (!navContainer) return;

        const currentPath = window.location.pathname;
        const root = this.getRoot();
        const rootPathname = new URL(root, window.location.href).pathname;
        const cleanCurrentPath = currentPath.replace('.html', '');
        const isHome = cleanCurrentPath === '/' || cleanCurrentPath === rootPathname || cleanCurrentPath === rootPathname.slice(0, -1) || cleanCurrentPath.endsWith('/') || cleanCurrentPath.endsWith('/index');
        
        const logoHref = isHome ? '#' : root;

        const html = `
            <nav>
                <div class="container">
                    <a href="${logoHref}" class="logo">VEVE<span class="logo-dot">.</span>SERVICES <i class="fas fa-bolt bolt-icon"></i></a>

                    <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle Menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>

                    <ul class="nav-links" id="nav-links">
                        ${this.links.map(link => {
                            const isAnchor = link.path.includes('#');
                            const cleanCurrentPath = currentPath.replace('.html', '');
                            const isHome = cleanCurrentPath === '/' || cleanCurrentPath === rootPathname || cleanCurrentPath === rootPathname.slice(0, -1) || cleanCurrentPath.endsWith('/') || cleanCurrentPath.endsWith('/index');
                            
                            let fullPath;
                            if (isAnchor && isHome) {
                                // Just use the hash if we are already on home
                                fullPath = link.path.split('#')[1] ? '#' + link.path.split('#')[1] : root + link.path;
                            } else {
                                fullPath = root + link.path;
                            }

                            const linkBase = link.path.split('#')[0];
                            
                            // Better active detection
                            let isActive = false;
                            if (linkBase === 'index' || linkBase === '') {
                                isActive = isHome;
                            } else {
                                isActive = cleanCurrentPath.includes(linkBase);
                            }

                            return `
                                <li>
                                    <a href="${fullPath}" class="${isActive ? 'active' : ''}" ${isActive ? 'style="color: var(--primary);"' : ''}>
                                        ${link.name}
                                    </a>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            </nav>
        `;

        navContainer.innerHTML = html;
        
        // Re-init navbar events
        if (typeof initNavbar === 'function') {
            initNavbar();
        }
    }
};
}

/**
 * Global Navbar Initialization (Mobile Menu, etc.)
 */
function initNavbar() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        // Remove existing listeners if any (simple way for SPA)
        const newToggle = mobileMenuToggle.cloneNode(true);
        mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);
        
        newToggle.onclick = (e) => {
            e.stopPropagation();
            newToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        };

        navLinks.onclick = (e) => {
            if (e.target.closest('a')) {
                newToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        };

        document.onclick = (e) => {
            if (!navLinks.contains(e.target) && !newToggle.contains(e.target)) {
                newToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        };
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Navbar.render();
});

/**
 * floating-buttons.js - Centralized Floating Buttons for Veve Services
 * Injects and manages the Discord and Back-to-Top buttons across all pages.
 */

(function() {
    // Create the floating buttons HTML
    const container = document.createElement('div');
    container.className = 'floating-btns-container';
    container.innerHTML = `
        <button class="floating-btn install-float" id="pwa-install" title="Install App">
            <i class="fas fa-download"></i>
        </button>
        <a href="https://discord.com/users/vevego" target="_blank" class="floating-btn discord-float" id="discord-float" title="Chat via Discord">
            <i class="fab fa-discord"></i>
        </a>
        <button class="floating-btn back-to-top" id="back-to-top" title="Back to Top">
            <i class="fas fa-chevron-up"></i>
        </button>
    `;

    // Append to body once DOM is ready
    const init = () => {
        if (!document.getElementById('discord-float')) {
            document.body.appendChild(container);
            
            const backToTop = document.getElementById('back-to-top');
            const discordFloat = document.getElementById('discord-float');
            const installBtn = document.getElementById('pwa-install');

            // --- PWA Install Logic ---
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                installBtn.classList.add('visible');
                console.log("PWA: Install prompt available");
            });

            installBtn.onclick = async () => {
                if (!deferredPrompt) return;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`PWA: Install choice: ${outcome}`);
                deferredPrompt = null;
                installBtn.classList.remove('visible');
            };

            window.addEventListener('appinstalled', () => {
                installBtn.classList.remove('visible');
                console.log('PWA: App installed');
            });

            // --- Scroll Logic ---
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                    discordFloat.classList.add('shift-up');
                    installBtn.classList.add('shift-up-more');
                } else {
                    backToTop.classList.remove('visible');
                    discordFloat.classList.remove('shift-up');
                    installBtn.classList.remove('shift-up-more');
                }
            }, { passive: true });

            backToTop.onclick = () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            };
        }

    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

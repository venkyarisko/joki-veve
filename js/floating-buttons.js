/**
 * floating-buttons.js - Centralized Floating Buttons for Veve Services
 * Injects and manages the Discord and Back-to-Top buttons across all pages.
 */

(function() {
    // Create the floating buttons HTML
    const container = document.createElement('div');
    container.className = 'floating-btns-container';
    container.innerHTML = `
        <a href="https://discord.com/users/vevego" target="_blank" class="floating-btn discord-float" id="discord-float" title="Chat via Discord">
            <i class="fab fa-discord"></i>
        </a>
        <button class="floating-btn back-to-top" id="back-to-top" title="Back to Top">
            <i class="fas fa-chevron-up"></i>
        </button>
    `;

    // Create PWA Modal HTML
    const pwaModal = document.createElement('div');
    pwaModal.className = 'modal-overlay';
    pwaModal.id = 'pwa-modal';
    pwaModal.innerHTML = `
        <div class="custom-modal">
            <div class="modal-icon"><i class="fas fa-mobile-alt"></i></div>
            <h3>Pasang Aplikasi Veve</h3>
            <p>Install aplikasi di HP kamu untuk akses joki lebih cepat, aman, dan lancar tanpa ribet buka browser!</p>
            <div class="modal-btns">
                <button class="modal-btn modal-btn-cancel" id="pwa-later">Nanti Saja</button>
                <button class="modal-btn modal-btn-confirm" id="pwa-install-now">Install Sekarang</button>
            </div>
        </div>
    `;

    // Append to body once DOM is ready
    const init = () => {
        if (!document.getElementById('discord-float')) {
            document.body.appendChild(container);
            document.body.appendChild(pwaModal);
            
            const backToTop = document.getElementById('back-to-top');
            const discordFloat = document.getElementById('discord-float');
            const pwaInstallBtn = document.getElementById('pwa-install-now');
            const pwaLaterBtn = document.getElementById('pwa-later');

            // --- PWA Pop-up Logic ---
            let deferredPrompt;
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                
                // Cek apakah user pernah nolak modal ini sebelumnya di session ini
                if (!sessionStorage.getItem('pwa-modal-dismissed')) {
                    setTimeout(() => {
                        pwaModal.classList.add('active');
                    }, 3000); // Tampilkan setelah 3 detik stay di web
                }
            });

            pwaInstallBtn.onclick = async () => {
                pwaModal.classList.remove('active');
                if (!deferredPrompt) return;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
            };

            pwaLaterBtn.onclick = () => {
                pwaModal.classList.remove('active');
                sessionStorage.setItem('pwa-modal-dismissed', 'true');
            };

            window.addEventListener('appinstalled', () => {
                pwaModal.classList.remove('active');
            });

            // --- Scroll Logic ---
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                    discordFloat.classList.add('shift-up');
                } else {
                    backToTop.classList.remove('visible');
                    discordFloat.classList.remove('shift-up');
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

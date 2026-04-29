/**
 * Activity Ticker System
 * Displays "live" order notifications using testimonial data.
 */

(function () {
    const CONFIG = {
        minInterval: 15000, // 15 seconds
        maxInterval: 30000, // 30 seconds
        displayDuration: 10000, // 10 seconds
        initialDelay: 5000, // 5 seconds after load
    };

    function initTicker() {
        // Create container if it doesn't exist
        let tickerContainer = document.getElementById('activity-ticker-container');
        if (!tickerContainer) {
            tickerContainer = document.createElement('div');
            tickerContainer.id = 'activity-ticker-container';
            document.body.appendChild(tickerContainer);
        }

        // Wait for testimonialData to be available
        if (!window.testimonialData || window.testimonialData.length === 0) {
            // Check again in 1 second
            setTimeout(initTicker, 1000);
            return;
        }

        // Start the loop
        setTimeout(showNextNotification, CONFIG.initialDelay);
    }

    function showNextNotification() {
        if (!window.testimonialData || window.testimonialData.length === 0) return;

        const randomIndex = Math.floor(Math.random() * window.testimonialData.length);
        const data = window.testimonialData[randomIndex];

        createNotification(data);

        // Schedule next one
        const nextInterval = Math.floor(Math.random() * (CONFIG.maxInterval - CONFIG.minInterval + 1)) + CONFIG.minInterval;
        setTimeout(showNextNotification, nextInterval);
    }

    function createNotification(data) {
        const container = document.getElementById('activity-ticker-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = 'activity-ticker';

        // Service display
        let serviceText = Array.isArray(data.service) ? data.service[0] : data.service;

        notification.innerHTML = `
            <div class="ticker-content">
                <div class="ticker-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="ticker-info">
                    <p class="ticker-title">Order Completed!</p>
                    <p class="ticker-text">Joki <b>${serviceText}</b> di <b>${data.game}</b> milik <b>${data.name}</b> complete!</p>
                </div>
                <button class="ticker-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="ticker-progress"></div>
        `;

        container.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, CONFIG.displayDuration);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTicker);
    } else {
        initTicker();
    }
})();

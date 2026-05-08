const DATA_STATUS = {
    isOpen: true, // Set to true for Open Order, false for Close Order
    openText: "Open Order",
    closeText: "Close Order",
    openBadge: "Available Now",
    closeBadge: "Currently Busy"
};

function updateStatus(container = document) {
    const badge = container.querySelector('#status-badge');
    const label = container.querySelector('#status-label');
    const dot = container.querySelector('#status-dot');

    if (!badge || !label || !dot) return;

    if (DATA_STATUS.isOpen) {
        badge.textContent = DATA_STATUS.openBadge;
        badge.style.background = 'rgba(0, 242, 255, 0.1)';
        badge.style.color = 'var(--primary)';
        badge.style.borderColor = 'var(--glass-border)';
        label.textContent = DATA_STATUS.openText;
        label.style.color = 'white';
        dot.style.background = '#00ff88'; // Green for open
        dot.style.boxShadow = '0 0 10px #00ff88';
    } else {
        badge.textContent = DATA_STATUS.closeBadge;
        badge.style.background = 'rgba(255, 50, 50, 0.1)';
        badge.style.color = '#ff4444';
        badge.style.borderColor = 'rgba(255, 50, 50, 0.3)';
        label.textContent = DATA_STATUS.closeText;
        label.style.color = '#ff4444';
        dot.style.background = '#ff4444'; // Red for closed
        dot.style.boxShadow = '0 0 10px #ff4444';
    }
}

// Auto-run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => updateStatus());
} else {
    updateStatus();
}

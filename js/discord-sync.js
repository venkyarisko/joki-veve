/**
 * Discord Server Status Sync
 * Fetches real-time member count from Discord Widget API
 */

const DISCORD_SERVER_ID = '1501628879528530150'; // Veve Service Guild ID

async function updateDiscordStatus() {
    const countElement = document.getElementById('discord-online-count');
    if (!countElement) return;

    // Set default text agar tidak terlihat "Loading..." jika fetch gagal/diskip
    if (countElement.textContent === 'Loading...') {
        countElement.textContent = 'Community Active 🟢';
    }

    // Skip fetch jika di localhost untuk menghindari polusi galat CORS di konsol
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
        return; 
    }

    try {
        const timestamp = new Date().getTime();
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json?t=${timestamp}`, {
            cache: 'no-store'
        });

        if (!response.ok) throw new Error('Status not OK');
        
        const data = await response.json();
        const onlineCount = data.presence_count || 0;
        
        countElement.textContent = `${onlineCount} Members Online`;
    } catch (error) {
        // Silent fail - tetap gunakan teks fallback
        countElement.textContent = 'Community Active 🟢';
    }
}

// Initial fetch
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateDiscordStatus);
} else {
    updateDiscordStatus();
}

// Update every 5 minutes
setInterval(updateDiscordStatus, 5 * 60 * 1000);

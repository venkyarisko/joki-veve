/**
 * Discord Server Status Sync
 * Fetches real-time member count from Discord Widget API
 */

const DISCORD_SERVER_ID = '1501628879528530150'; // Veve Service Guild ID

async function updateDiscordStatus() {
    const countElement = document.getElementById('discord-online-count');
    if (!countElement) return;

    try {
        // Tambahkan timestamp agar tidak kena cache browser
        const timestamp = new Date().getTime();
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json?t=${timestamp}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Discord API Error:', errorData);
            throw new Error(errorData.message || 'Widget disabled');
        }
        
        const data = await response.json();
        const onlineCount = data.presence_count || 0;
        
        // Update UI
        countElement.textContent = `${onlineCount} Members Online`;
        console.log('Discord Sync Success:', onlineCount, 'online');
    } catch (error) {
        console.warn('Discord Sync Failed:', error.message);
        // Jika gagal, tampilkan pesan yang lebih bersahabat
        countElement.textContent = 'Server Online 🟢';
    }
}

// Initial fetch
document.addEventListener('DOMContentLoaded', updateDiscordStatus);

// Optional: update every 5 minutes
setInterval(updateDiscordStatus, 5 * 60 * 1000);

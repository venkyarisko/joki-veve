/**
 * DATA DAFTAR GAME UNTUK KALKULATOR
 */

if (!window.gameList) {
    window.gameList = [
        {
            id: 'nte',
            title: 'Neverness to Everness',
            image: 'assets/NTE.webp',
            path: 'kalkulator/nte.html',
            status: 'Available',
            description: 'Hitung Estimasi Joki Untuk Game Neverness To Everness'
        },
        {
            id: 'wuwa',
            title: 'Wuthering Waves',
            image: 'assets/wuwa.webp',
            path: 'kalkulator/wuwa.html',
            status: 'Coming Soon',
            description: 'Layanan Kalkulator Segera Hadir'
        },
        {
            id: 'endfield',
            title: 'Arknights: Endfield',
            image: 'assets/arknight_endfield.png',
            path: 'kalkulator/endfield.html',
            status: 'Available',
            description: 'Hitung Estimasi Joki Untuk Game Arknights: Endfield'
        }
    ];
}

function renderGames() {
    const container = document.getElementById('game-list-container');
    if (!container || typeof gameList === 'undefined') return;

    // Sorting logic:
    // 1. Sort A-Z by Title
    // 2. Then ensure 'Coming Soon' is at the bottom
    const sortedGames = [...gameList].sort((a, b) => {
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();
        const isComingSoonA = statusA.includes('coming');
        const isComingSoonB = statusB.includes('coming');

        if (isComingSoonA && !isComingSoonB) return 1;
        if (!isComingSoonA && isComingSoonB) return -1;

        return a.title.localeCompare(b.title);
    });

    container.innerHTML = '';

    sortedGames.forEach((game, index) => {
        const isComingSoon = game.status.toLowerCase().includes('coming');
        const element = isComingSoon ? 'div' : 'a';
        const disabledClass = isComingSoon ? 'disabled' : '';

        const card = document.createElement(element);
        if (!isComingSoon) card.setAttribute('href', game.path);
        card.className = `game-select-row ${disabledClass}`;

        card.innerHTML = `
            ${!isComingSoon ? '<div class="row-overlay"></div>' : ''}
            <img src="${game.image}" alt="${game.title}" class="game-img-small">
            <div class="row-content">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            </div>
            <div class="row-action">
                <span class="status-tag ${isComingSoon ? 'status-upcoming' : 'status-available'}">${game.status}</span>
                <div class="select-arrow">
                    <i class="fas ${isComingSoon ? 'fa-lock' : 'fa-chevron-right'}"></i>
                </div>
            </div>
        `;

        // Add enter animation
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;

        container.appendChild(card);

        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, 50);
    });
}

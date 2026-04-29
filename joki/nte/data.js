/**
 * DATA JOKI NEVERNESS TO EVERNESS (NTE)
 * Anda bisa mengubah nama layanan, deskripsi, dan harga di sini.
 * Kategori yang tersedia: 'Rawat', 'Story', 'Map', 'Misc'
 */

var jokiServices = [
    // Kategori: Rawat
    {
        id: 'daily',
        category: 'Rawat',
        title: 'Rawat Akun Harian',
        description: 'Daily Commissions + Energy Spend',
        price: 5000
    },
    {
        id: 'weekly',
        category: 'Rawat',
        title: 'Paket Mingguan',
        description: '7 Hari Rawat Akun + Weekly Boss',
        price: 30000
    },
    {
        id: 'monthly',
        category: 'Rawat',
        title: 'Paket Bulanan',
        description: '30 Hari Rawat Akun (Hemat 30k)',
        price: 120000
    },
    {
        id: 'patch',
        category: 'Rawat',
        title: 'Paket 1 Patch',
        description: 'Rawat Akun Full 1 Patch <br>(42 Hari) + Event Patch',
        price: 210000
    },

    // Kategori: Story
    {
        id: 'story_main',
        category: 'Story',
        title: 'Main Story',
        description: 'Selesaikan Main Story /Act ',
        price: 35000,
        displayPrice: '35000',
        hasQuantity: true
    },
    {
        id: 'story_side',
        category: 'Story',
        title: 'Side Quests',
        description: 'Selesaikan Quest Sampingan Yang Tersedia',
        price: 15000,
        displayPrice: '15000',
        hasQuantity: true
    },

    // Kategori: Map
    {
        id: 'map_100',
        category: 'Map',
        title: 'Eksplorasi Map (100%)',
        description: 'Semua Wilayah Hethereau',
        price: 300000
    },
    {
        id: 'map_100',
        category: 'Map',
        title: 'Eksplorasi Map (100%)',
        description: 'Eksplorasi Map Per Wilayah Hethereau',
        price: 40000
    },
    {
        id: 'teleport',
        category: 'Map',
        title: 'Unlock All Teleport',
        description: 'Buka Semua Titik Teleportasi Di Map',
        price: 20000
    },

    // Kategori: Misc
    {
        id: 'event',
        category: 'Misc',
        title: 'Event Participation',
        description: 'Menyelesaiin Event Yang Ada (Harga Mnyesuaikan Tingkat Kesulitan)',
        price: 0,
        displayPrice: '20k - 40k',
        isComingSoon: false
    },
    {
        id: 'urban',
        category: 'Misc',
        title: 'Urban Exploration',
        description: 'Farming City Material & Side Quest',
        price: 25000,
        isComingSoon: true
    },
    {
        id: 'boss_farm',
        category: 'Misc',
        title: 'Boss Material Farming',
        description: 'Farming Material Boss Sesuai Kebutuhan',
        price: 15000,
        isComingSoon: true
    }
];

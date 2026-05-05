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
    /* Contoh Layanan dengan Slash Harga:
    {
        id: 'promo_test',
        category: 'Rawat',
        title: 'Promo Spesial',
        description: 'Layanan Promo Terbatas',
        slash: true,
        normalPrice: 50000,
        slashPrice: 35000
    },
    */
    {
        id: 'patch',
        category: 'Rawat',
        title: 'Paket 1 Patch',
        description: 'Rawat Akun Full 1 Patch <br>(42 Hari) + Event Patch',
        price: 260000
    },

    // Kategori: Story
    {
        id: 'story_main',
        category: 'Story',
        title: 'Main Story',
        description: 'Selesaikan Main Story /Act ',
        price: 30000,
        displayPrice: '30.000',
        hasQuantity: true
    },
    {
        id: 'story_side',
        category: 'Story',
        title: 'Side Quests',
        description: 'Selesaikan Quest Sampingan Yang Tersedia',
        price: 7000,
        displayPrice: '7.000',
        hasQuantity: true
    },
    {
        id: 'story_spinoffs',
        category: 'Story',
        title: 'Spinoffs Quests',
        description: 'Selesaikan Quest Spinoffs Yang Tersedia',
        price: 10000,
        displayPrice: '10.000',
        hasQuantity: true
    },

    // Kategori: Map
    {
        id: 'map_100',
        category: 'Map',
        title: 'Eksplorasi Map (100%)',
        description: 'Semua Wilayah Hethereau',
        price: 220000,
        slash: true,
        normalPrice: 240000,
        slashPrice: 220000
    },
    {
        id: 'teleport',
        category: 'Map',
        title: 'Unlock All Teleport',
        description: 'Buka Semua Titik Teleportasi Di Map',
        price: 20000
    },

    // Kategori: Map Area
    {
        id: 'map_new_herland_district',
        category: 'Map Area',
        subcategory: 'Hetherau',
        title: 'Eksplorasi Map (100%) New Herland District',
        description: 'Penyelesaian 100% Wilayah New Herland District',
        price: 50000
    },
    {
        id: 'map_miguel_district',
        category: 'Map Area',
        subcategory: 'Hetherau',
        title: 'Eksplorasi Map (100%) Miguel District',
        description: 'Penyelesaian 100% Wilayah Miguel District',
        price: 50000
    },
    {
        id: 'map_illusion_town',
        category: 'Map Area',
        subcategory: 'Hetherau',
        title: 'Eksplorasi Map (100%) Illusion Town',
        description: 'Penyelesaian 100% Wilayah Illusion Town',
        price: 50000
    },
    {
        id: 'map_unheard_shores',
        category: 'Map Area',
        subcategory: 'Hetherau',
        title: 'Eksplorasi Map (100%) Unheard Shores',
        description: 'Penyelesaian 100% Wilayah Unheard Shores',
        price: 50000
    },
    {
        id: 'map_bridge_crossings',
        category: 'Map Area',
        subcategory: 'Hetherau',
        title: 'Eksplorasi Map (100%) Bridge Crossings',
        description: 'Penyelesaian 100% Wilayah Bridge Crossings',
        price: 40000
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

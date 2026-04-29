/**
 * DATA JOKI ARKNIGHTS: ENDFIELD
 * Kategori: 'Rawat', 'Story', 'Eksplorasi', 'Industri'
 */

var jokiServices = [
    // Kategori: Rawat
    {
        id: 'daily',
        category: 'Rawat',
        title: 'Rawat Akun Harian',
        description: 'Daily Task + Spend Sanity/Energy',
        price: 7000
    },
    {
        id: 'weekly',
        category: 'Rawat',
        title: 'Paket Mingguan',
        description: '7 Hari Rawat Akun + Weekly Boss & Tasks',
        price: 45000
    },
    {
        id: 'monthly',
        category: 'Rawat',
        title: 'Paket Bulanan',
        description: '30 Hari Rawat Akun (Lebih Hemat 30k)',
        price: 180000
    },
    {
        id: 'patch',
        category: 'Rawat',
        title: 'Paket 1 Patch',
        description: 'Rawat Akun Full 1 Patch <br>(42 Hari) + Event + Battlepass',
        price: 310000
    },

    // Kategori: Story
    {
        id: 'story_main',
        category: 'Story',
        title: 'Main Story',
        description: 'Penyelesaian Main Story / Chapter',
        price: 30000,
        hasQuantity: true
    },
    {
        id: 'story_side',
        category: 'Story',
        title: 'Side Story / Quests',
        description: 'Penyelesaian Misi Sampingan',
        price: 7000,
        hasQuantity: true
    },
    {
        id: 'story_operator',
        category: 'Story',
        title: 'Operator Quests',
        description: 'Penyelesaian Misi Operator',
        price: 15000,
        hasQuantity: true
    },
    {
        id: 'story_exploration',
        category: 'Story',
        title: 'Exploration Quests',
        description: 'Penyelesaian Misi Eksplorasi',
        price: 15000,
        hasQuantity: true
    },

    // Kategori: Eksplorasi
    {
        id: 'map_100_valley_iv',
        category: 'Eksplorasi',
        title: 'Eksplorasi Map (100%) Valley IV',
        description: 'Eksplorasi Seluruh Map Endfield (All Clear)',
        price: 280000,
    },
    {
        id: 'map_area_valley_iv',
        category: 'Eksplorasi',
        title: 'Eksplorasi / Area<br>Valley IV',
        description: 'Eksplorasi 100% Untuk Satu Wilayah Spesifik',
        price: 50000,
        hasQuantity: true
    },
    {
        id: 'map_100_wuling',
        category: 'Eksplorasi',
        title: 'Eksplorasi Map (100%) Wuling',
        description: 'Eksplorasi Seluruh Map Endfield (All Clear)',
        price: 350000,
    },
    {
        id: 'map_area_wuling',
        category: 'Eksplorasi',
        title: 'Eksplorasi / Area<br>Wuling',
        description: 'Eksplorasi 100% Untuk Satu Wilayah Spesifik',
        price: 70000,
        hasQuantity: true
    },
    {
        id: 'teleport',
        category: 'Eksplorasi',
        title: 'Unlock All Teleport',
        description: 'Buka Semua Titik Fast Travel Di Map',
        price: 25000
    },

    // Kategori: Industri (Base Management)
    {
        id: 'wiring',
        category: 'Industri',
        title: 'Jasa Tarik Kabel',
        description: 'Optimasi Jalur Listrik & Koneksi Base / Wilayah',
        price: 20000,
        hasQuantity: true
    },
    {
        id: 'factory',
        category: 'Industri',
        title: 'Jasa Rawat Pabrik',
        description: 'Manajemen Produksi & Efisiensi Pabrik Harian',
        price: 0,
        displayPrice: '50k - 200k',
    }
];

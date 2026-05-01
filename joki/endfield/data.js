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
        price: 310000,
        slash: true,
        normalPrice: 320000,
        slashPrice: 310000
    },
    {
        id: 'map_100_wuling',
        category: 'Eksplorasi',
        title: 'Eksplorasi Map (100%) Wuling',
        description: 'Eksplorasi Seluruh Map Endfield (All Clear)',
        price: 300000,
        slash: true,
        normalPrice: 310000,
        slashPrice: 300000
    },
    {
        id: 'teleport',
        category: 'Eksplorasi',
        title: 'Unlock All Teleport',
        description: 'Buka Semua Titik Fast Travel Di Map',
        price: 25000
    },

    // Kategori: Map Area
    {
        id: 'map_the_hub',
        category: 'Map Area',
        subcategory: 'Valley IV',
        title: 'Eksplorasi Map (100%) The HUB',
        description: 'Eksplorasi 100% Wilayah The HUB',
        price: 60000
    },
    {
        id: 'map_valley_pass',
        category: 'Map Area',
        subcategory: 'Valley IV',
        title: 'Eksplorasi Map (100%) Valley Pass',
        description: 'Eksplorasi 100% Wilayah Valley Pass',
        price: 40000
    },
    {
        id: 'map_abburey_quarry',
        category: 'Map Area',
        subcategory: 'Valley IV',
        title: 'Eksplorasi Map (100%) Abburey Quarry',
        description: 'Eksplorasi 100% Wilayah Abburey Quarry',
        price: 50000
    },
    {
        id: 'map_originium_science_park',
        category: 'Map Area',
        subcategory: 'Valley IV',
        title: 'Eksplorasi Map (100%) Originium Science Park',
        description: 'Eksplorasi 100% Wilayah Originium Science Park',
        price: 50000
    },
    {
        id: 'map_origin_lodespring',
        category: 'Map Area',
        subcategory: 'Valley IV',
        title: 'Eksplorasi Map (100%) Origin Lodespring',
        description: 'Eksplorasi 100% Wilayah Origin Lodespring',
        price: 60000
    },
    {
        id: 'map_power_plateau',
        category: 'Map Area',
        subcategory: 'Valley IV',
        title: 'Eksplorasi Map (100%) Power Plateau',
        description: 'Eksplorasi 100% Wilayah Power Plateau',
        price: 60000
    },
    {
        id: 'map_wuling_city',
        category: 'Map Area',
        subcategory: 'Wuling',
        title: 'Eksplorasi Map (100%) Wuling City',
        description: 'Eksplorasi 100% Wilayah Wuling City',
        price: 110000
    },
    {
        id: 'map_jingyu_valley',
        category: 'Map Area',
        subcategory: 'Wuling',
        title: 'Eksplorasi Map (100%) Jingyu Valley',
        description: 'Eksplorasi 100% Wilayah Jingyu Valley',
        price: 70000
    },
    {
        id: 'map_qingbo_stockade',
        category: 'Map Area',
        subcategory: 'Wuling',
        title: 'Eksplorasi Map (100%) Qingbo Stockade',
        description: 'Eksplorasi 100% Wilayah Qingbo Stockade',
        price: 60000
    },
    {
        id: 'map_marker_stone',
        category: 'Map Area',
        subcategory: 'Wuling',
        title: 'Marker Stone',
        description: 'Eksplorasi 100% Wilayah Marker Stone',
        price: 70000,
        isNew: true
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

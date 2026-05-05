/**
 * DATA JOKI WUTHERING WAVES (WUWA)
 */

var jokiServices = [
    // Kategori: Rawat
    {
        id: 'daily',
        category: 'Rawat',
        title: 'Rawat Akun Harian',
        description: 'Daily Task + Waveplates Spend',
        price: 5000,
        slash: true,
        normalPrice: 10000,
        slashPrice: 5000
    },
    {
        id: 'weekly',
        category: 'Rawat',
        title: 'Paket Mingguan',
        description: '7 Hari Rawat Akun + Weekly Boss & Tasks',
        price: 30000
    },
    {
        id: 'monthly',
        category: 'Rawat',
        title: 'Paket Bulanan',
        description: '30 Hari Rawat Akun (Lebih Hemat)',
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
        price: 280000
    },

    // Kategori: Story
    {
        id: 'main_story',
        category: 'Story',
        title: 'Main Story / Chapter',
        description: 'Penyelesaian Alur Cerita Utama',
        price: 25000,
        hasQuantity: true
    },
    {
        id: 'side_quest',
        category: 'Story',
        title: 'Side Quests',
        description: 'Penyelesaian Misi Sampingan',
        price: 10000,
        hasQuantity: true
    },
    {
        id: 'exploration_quest',
        category: 'Story',
        title: 'Exploration Quest',
        description: 'Penyelesaian Misi Eksplorasi Khusus',
        price: 20000,
        hasQuantity: true
    },
    {
        id: 'story_character',
        category: 'Story',
        title: 'Companion / Quest',
        description: 'Penyelesaian Misi Karakter Spesifik',
        price: 15000,
        hasQuantity: true
    },

    // Kategori: Eksplorasi
    {
        id: 'exploration_100_huanglong',
        category: 'Eksplorasi',
        title: 'Eksplorasi Map (100%) Huanglong',
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 500000,
        slash: true,
        normalPrice: 530000,
        slashPrice: 500000
    },
    {
        id: 'exploration_100_tethys_deep',
        category: 'Eksplorasi',
        title: "Eksplorasi Map (100%) Tethys's Deep",
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 95000,
        slash: true,
        normalPrice: 105000,
        slashPrice: 95000
    },
    {
        id: 'exploration_100_rinascita',
        category: 'Eksplorasi',
        title: "Eksplorasi Map (100%) Rinascita",
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 425000,
        slash: true,
        normalPrice: 455000,
        slashPrice: 425000
    },
    {
        id: 'exploration_100_septimont',
        category: 'Eksplorasi',
        title: "Eksplorasi Map (100%) Septimont",
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 235000,
        slash: true,
        normalPrice: 255000,
        slashPrice: 235000
    },
    {
        id: 'exploration_100_lohai_roi',
        category: 'Eksplorasi',
        title: "Eksplorasi Map (100%) Lohai Roi",
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 400000,
        slash: true,
        normalPrice: 430000,
        slashPrice: 400000,
    },
    {
        id: 'exploration_100_frostland_surface',
        category: 'Eksplorasi',
        title: "Eksplorasi Map (100%) Frostland Surface",
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 180000,
        slash: true,
        normalPrice: 190000,
        slashPrice: 180000,
    },
    {
        id: 'exploration_100_dimmr_plains',
        category: 'Eksplorasi',
        title: "Eksplorasi Map (100%) Dimmr Plains",
        description: 'Penyelesaian 100% Untuk Satu Wilayah (All Chests, Echoes, etc)',
        price: 150000,
        slash: true,
        normalPrice: 160000,
        slashPrice: 150000,
        isNew: true
    },


    // Kategori: Map Area
    {
        id: 'map_jinzhou',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Jinzhou',
        description: 'Eksplorasi 100% Wilayah Jinzhou',
        price: 30000
    },
    {
        id: 'map_gorges_of_spirits',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Gorges of Spirits',
        description: 'Eksplorasi 100% Wilayah Gorges of Spirits',
        price: 25000
    },
    {
        id: 'map_desorock_highland',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Desorock Highland',
        description: 'Eksplorasi 100% Wilayah Desorock Highland',
        price: 50000
    },
    {
        id: 'map_norfall_barrens',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Norfall Barrens',
        description: 'Eksplorasi 100% Wilayah Norfall Barrens',
        price: 35000
    },
    {
        id: 'map_central_plains',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Central Plains',
        description: 'Eksplorasi 100% Wilayah Central Plains',
        price: 60000
    },
    {
        id: 'map_port_city_of_guixu',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Port City of Guixu',
        description: 'Eksplorasi 100% Wilayah Port City of Guixu',
        price: 70000
    },
    {
        id: 'map_tigers_maw',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: "Tiger's Maw",
        description: "Eksplorasi 100% Wilayah Tiger's Maw",
        price: 30000
    },
    {
        id: 'map_wuming_bay',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Wuming Bay',
        description: 'Eksplorasi 100% Wilayah Wuming Bay',
        price: 30000
    },
    {
        id: 'map_dim_forest',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Dim Forest',
        description: 'Eksplorasi 100% Wilayah Dim Forest',
        price: 50000
    },
    {
        id: 'map_whining_mirror',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: "Whining Aix's Mire",
        description: "Eksplorasi 100% Wilayah Whining Aix's Mire",
        price: 70000
    },
    {
        id: 'map_mt_firmament',
        category: 'Map Area',
        subcategory: 'Huanglong',
        title: 'Mt. Firmament',
        description: 'Eksplorasi 100% Wilayah Mt. Firmament',
        price: 80000
    },

    {
        id: 'map_black_shores_archipelago',
        category: 'Map Area',
        subcategory: "Tethys's Deep",
        title: 'Black Shores Archipelago',
        description: 'Eksplorasi 100% Wilayah Black Shores Archipelago',
        price: 50000
    },
    {
        id: 'map_tethys_core',
        category: 'Map Area',
        subcategory: "Tethys's Deep",
        title: "Tethys's Deep",
        description: "Eksplorasi 100% Wilayah Tethys's Deep",
        price: 55000
    },

    // Rinascita
    {
        id: 'map_raguna_city',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Raguna City',
        description: 'Eksplorasi 100% Wilayah Raguna City',
        price: 5000
    },
    {
        id: 'map_averardo_vault',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Averardo Vault',
        description: 'Eksplorasi 100% Wilayah Averardo Vault',
        price: 40000
    },
    {
        id: 'map_penitents_end',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: "Penitent's End",
        description: "Eksplorasi 100% Wilayah Penitent's End",
        price: 40000
    },
    {
        id: 'map_hallowed_reach',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Hallowed Reach',
        description: 'Eksplorasi 100% Wilayah Hallowed Reach',
        price: 30000
    },
    {
        id: 'map_whisperwind_haven',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Whisperwind Haven',
        description: 'Eksplorasi 100% Wilayah Whisperwind Haven',
        price: 35000
    },
    {
        id: 'map_nimbus_sanctum',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Nimbus Sanctum',
        description: 'Eksplorasi 100% Wilayah Nimbus Sanctum',
        price: 40000
    },
    {
        id: 'map_fagaceae_peninsula',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Fagaceae Peninsula',
        description: 'Eksplorasi 100% Wilayah Fagaceae Peninsula',
        price: 60000
    },
    {
        id: 'map_thessaleo_fells',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Thessaleo Fells',
        description: 'Eksplorasi 100% Wilayah Thessaleo Fells',
        price: 50000
    },
    {
        id: 'map_riccolli_islands',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Riccolli Islands',
        description: 'Eksplorasi 100% Wilayah Riccolli Islands',
        price: 40000
    },
    {
        id: 'map_beohr_waters',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Beohr Waters',
        description: 'Eksplorasi 100% Wilayah Beohr Waters',
        price: 45000
    },
    {
        id: 'map_vault_underground',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Vault Underground',
        description: 'Eksplorasi 100% Wilayah Vault Underground',
        price: 20000
    },
    {
        id: 'map_avinoleum',
        category: 'Map Area',
        subcategory: 'Rinascita',
        title: 'Avinoleum',
        description: 'Eksplorasi 100% Wilayah Avinoleum',
        price: 50000
    },

    // Septimont
    {
        id: 'map_septimont',
        category: 'Map Area',
        subcategory: 'Septimont',
        title: 'Septimont',
        description: 'Eksplorasi 100% Wilayah Septimont',
        price: 110000
    },
    {
        id: 'map_fabrication_of_the_deep',
        category: 'Map Area',
        subcategory: 'Septimont',
        title: 'Fabrication of The Deep',
        description: 'Eksplorasi 100% Wilayah Fabrication of The Deep',
        price: 35000
    },
    {
        id: 'map_sanguis_plateaus',
        category: 'Map Area',
        subcategory: 'Septimont',
        title: 'Sanguis Plateaus',
        description: 'Eksplorasi 100% Wilayah Sanguis Plateaus',
        price: 90000
    },
    {
        id: 'map_three_heroes_crest',
        category: 'Map Area',
        subcategory: 'Septimont',
        title: "Three Heroes' Crest",
        description: "Eksplorasi 100% Wilayah Three Heroes' Crest",
        price: 20000
    },


    // Lohai-Roi
    {
        id: 'map_etching_plains',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Etching Plains',
        description: 'Eksplorasi 100% Wilayah Etching Plains',
        price: 50000
    },
    {
        id: 'map_startorch_academy',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Startorch Academy',
        description: 'Eksplorasi 100% Wilayah Startorch Academy',
        price: 55000
    },
    {
        id: 'map_starward_riseway',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Starward Riseway',
        description: 'Eksplorasi 100% Wilayah Starward Riseway',
        price: 45000
    },
    {
        id: 'map_fangspire_chasm',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Fangspire Chasm',
        description: 'Eksplorasi 100% Wilayah Fangspire Chasm',
        price: 50000
    },
    {
        id: 'map_bjjartr_woods',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Bjjartr Woods',
        description: 'Eksplorasi 100% Wilayah Bjjartr Woods',
        price: 50000
    },
    {
        id: 'map_stagnant_run',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Stagnant Run',
        description: 'Eksplorasi 100% Wilayah Stagnant Run',
        price: 40000
    },
    {
        id: 'map_rebirth_uplands',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Rebirth Uplands',
        description: 'Eksplorasi 100% Wilayah Rebirth Uplands',
        price: 50000
    },
    {
        id: 'map_mawburrow_desert',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: 'Mawburrow Desert',
        description: 'Eksplorasi 100% Wilayah Mawburrow Desert',
        price: 50000
    },
    {
        id: 'map_giants_gaze',
        category: 'Map Area',
        subcategory: 'Lohai-Roi',
        title: "Giant's Gaze",
        description: "Eksplorasi 100% Wilayah Giant's Gaze",
        price: 40000
    },

    // Frostlands Surface
    {
        id: 'map_frostland_transit_port',
        category: 'Map Area',
        subcategory: 'Frostlands Surface',
        title: 'Frostland Transit Port',
        description: 'Eksplorasi 100% Wilayah Frostland Transit Port',
        price: 35000
    },
    {
        id: 'map_mount_gjallar',
        category: 'Map Area',
        subcategory: 'Frostlands Surface',
        title: 'Mount Gjallar',
        description: 'Eksplorasi 100% Wilayah Mount Gjallar',
        price: 40000
    },
    {
        id: 'map_starblind_crashsite',
        category: 'Map Area',
        subcategory: 'Frostlands Surface',
        title: 'Starblind Crashsite',
        description: 'Eksplorasi 100% Wilayah Starblind Crashsite',
        price: 35000
    },
    {
        id: 'map_upphaf_forest_ruins',
        category: 'Map Area',
        subcategory: 'Frostlands Surface',
        title: 'Upphaf Forest Ruins',
        description: 'Eksplorasi 100% Wilayah Upphaf Forest Ruins',
        price: 45000
    },
    {
        id: 'map_tidelost_forest',
        category: 'Map Area',
        subcategory: 'Frostlands Surface',
        title: 'Tidelost Forest',
        description: 'Eksplorasi 100% Wilayah Tidelost Forest',
        price: 35000
    },

    // Dimmr Plains
    {
        id: 'map_solisia_landing',
        category: 'Map Area',
        subcategory: 'Dimmr Plains',
        title: 'Solisia Landing',
        description: 'Eksplorasi 100% Wilayah Solisia Landing',
        price: 40000,
        isNew: true
    },
    {
        id: 'map_sealed_fissure',
        category: 'Map Area',
        subcategory: 'Dimmr Plains',
        title: 'Sealed Fissure',
        description: 'Eksplorasi 100% Wilayah Sealed Fissure',
        price: 40000,
        isNew: true
    },
    {
        id: 'map_silent_crag',
        category: 'Map Area',
        subcategory: 'Dimmr Plains',
        title: 'Silent Crag',
        description: 'Eksplorasi 100% Wilayah Silent Crag',
        price: 40000,
        isNew: true
    },
    {
        id: 'map_dimmr_deep',
        category: 'Map Area',
        subcategory: 'Dimmr Plains',
        title: 'Dimmr Deep',
        description: 'Eksplorasi 100% Wilayah Dimmr Deep',
        price: 40000,
        isNew: true
    },

    // Kategori: Misc
    {
        id: 'echo_farming',
        category: 'Misc',
        title: 'Echo Farming',
        description: 'Jasa Hunt Echo Spesifik (Cost 3/4)',
        price: 15000,
        hasQuantity: true,
        isComingSoon: true
    }
];

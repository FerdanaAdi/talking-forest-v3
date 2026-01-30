/**
 * ============================================
 * 📄 FILE: options.js
 * 🎬 FUNGSI: Konfigurasi Karakter & Settings
 * ============================================
 * 
 * ✅ YANG BISA KAMU EDIT:
 * - Nama karakter
 * - Warna nama karakter
 * - Daftar sprite/ekspresi
 * 
 * 📂 GAMBAR KARAKTER:
 * Simpan di: assets/images/characters/[nama_karakter]/
 */

"use strict";

// ================================
// DEFINISI KARAKTER
// ================================
Monogatari.characters({
    'rimba': {
        name: 'Rimba',
        color: '#4ade80',  // Hijau forest
        directory: 'rimba',
        sprites: {
            'normal': 'rimba_normal.png',
            'happy': 'rimba_happy.png',
            'sad': 'rimba_sad.png',
            'thinking': 'rimba_thinking.png'
        },
        default_expression: 'normal'
    },
    'bunga': {
        name: 'Bunga',
        color: '#f472b6',  // Pink
        directory: 'bunga',
        sprites: {
            'normal': 'bunga_normal.png',
            'happy': 'bunga_happy.png'
        },
        default_expression: 'normal'
    },
    'narrator': {
        name: '',  // Narrator tanpa nama
        color: '#ffd700'  // Gold
    }
});

// ================================
// KONFIGURASI TAMBAHAN
// ================================
Monogatari.settings({
    'Name': 'Talking Forest',
    'Version': '3.0.0',
    'TypeAnimation': true,
    'TypeAnimationSpeed': 50,
    'AutoSave': true,
    'AutoSaveInterval': 60000  // 1 menit
});

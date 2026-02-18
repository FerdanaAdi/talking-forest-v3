/**
 * ============================================
 * 📄 FILE: options.js
 * 🎬 FUNGSI: Konfigurasi Karakter & Settings
 * ============================================
 */

"use strict";

// ================================
// DEFINISI KARAKTER
// ================================
monogatari.characters({
    'rimba': {
        name: 'Rimba',
        color: '#4ade80',
        directory: '../monogatari/characters/rimba',
        sprites: {
            'normal': 'rimba_normal.png',
            'happy': 'rimba_happy.png',
            'sad': 'rimba_sad.png',
            'thinking': 'rimba_thinking.png',
            'surprised': 'rimba_surprised.png',
            'determined': 'rimba_determined.png',
            'confused': 'rimba_confused.png',
            'hopeful': 'rimba_hopeful.png'
        },
        default_expression: 'normal'
    },
    'narrator': {
        name: '',
        color: '#ffd700'
    }
});

// ================================
// DEFINISI ASET
// ================================
monogatari.assets('scenes', {
    // Engine defaults to 'assets/scenes/', so we go up one level to reach 'assets/monogatari/scenes/'
    'forest': '../monogatari/scenes/forest.png'
});

monogatari.assets('music', {
    // Engine defaults to 'assets/music/', so we go up one level
    'forest_ambient': '../monogatari/audio/bgm_prologue.mp3'
});

monogatari.assets('sounds', {
    // Engine defaults to 'assets/sounds/'
    'glitch': '../monogatari/audio/sfx_glitch.mp3'
});

// ================================
// KONFIGURASI ENGINE
// ================================
monogatari.settings({
    'Name': 'Talking Forest',
    'Version': '3.0.0',

    // Disable features that cause issues
    'ServiceWorkers': false,
    'Preload': false,

    // UI Settings
    'TypeAnimation': true,
    'TypeAnimationSpeed': 50,

    // Save Settings
    'AutoSave': 0,
    'Slots': 10
});

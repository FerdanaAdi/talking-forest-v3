/**
 * ============================================
 * 📄 FILE: script.js
 * 🎬 FUNGSI: Naskah Cerita Visual Novel
 * ============================================
 * 
 * PROLOG - Talking Forest V3
 */

"use strict";

// ================================
// NASKAH CERITA
// ================================
monogatari.script({

    // SCENE: START (Entry Point)
    'Start': [
        'show scene forest with fadeIn',
        'play music forest_ambient with loop fade 2',

        'show character rimba surprised at center with fadeIn',
        'rimba Hmmm? Siapa disana?!',

        'show character rimba normal',
        'rimba Aku mencium aroma manusia asing di hutanku...',
        'rimba Tunggu dulu... Kamu sepertinya bukan penebang liar.',

        'show character rimba happy',
        'rimba Wajahmu terlihat bingung. Apa kamu tersesat?',
        'rimba Perkenalkan, namaku RIMBA! Aku adalah penjaga hutan Borneo ini.',
        'rimba Siapa namamu, Petualang Muda?',

        // Input Nama Player
        {
            'Input': {
                'Text': 'Siapa namamu?',
                'Validation': function (input) {
                    return input.trim().length > 0;
                },
                'Save': function (input) {
                    this.storage({
                        player: {
                            name: input
                        }
                    });
                    return true;
                },
                'Warning': 'Tolong masukkan namamu ya!'
            }
        },

        'jump Introduction'
    ],

    'Introduction': [
        'show character rimba happy',
        'rimba Nama yang bagus! Senang bertemu denganmu, {{player.name}}.',

        'show character rimba sad',
        'rimba Tapi maaf... Aku tidak bisa menyambutmu dengan meriah.',
        'rimba Hutan ini sedang sakit. Pohon-pohon kehilangan suaranya karena sihir jahat.',

        'show character rimba normal',
        'rimba Aku butuh bantuanmu untuk memulihkan mereka.',

        'show character rimba happy',
        'rimba Maukah kamu membantuku mengumpulkan "Pecahan Suara"?',
        'rimba Ayo, ikuti aku! Kita mulai dengan pohon di depan sana.',

        'end'
    ]
});

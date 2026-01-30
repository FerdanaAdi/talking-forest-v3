/**
 * ============================================
 * 📄 FILE: script.js
 * 🎬 FUNGSI: Naskah Cerita Visual Novel
 * ============================================
 * 
 * ✅ YANG BISA KAMU EDIT:
 * - Semua teks dialog
 * - Urutan scene
 * - Background & musik
 * 
 * 📝 FORMAT DIALOG:
 * "nama_karakter Dialog yang diucapkan"
 * 
 * 📝 FORMAT SCENE:
 * Monogatari.script({
 *   'NamaScene': [
 *     "perintah1",
 *     "perintah2",
 *     ...
 *   ]
 * });
 */

"use strict";

// ================================
// NASKAH CERITA
// ================================
Monogatari.script({

    // SCENE: START (Entry Point)
    'Start': [
        'show background forest with fadeIn',
        'centered Selamat datang di Talking Forest...',
        'play music forest_ambient with loop fade 2',

        'show character rimba normal at center with fadeIn',
        'rimba Halo, Ranger muda!',
        'rimba Aku Rimba, penjaga hutan ini.',
        'rimba Kamu datang di waktu yang tepat...',

        'show character rimba thinking',
        'rimba Hutan Loa Duri sedang dalam bahaya.',
        'rimba Pohon-pohon mulai kehilangan suaranya.',

        'show character rimba normal',
        'rimba Tapi dengan bantuanmu, kita bisa mengembalikan keajaiban hutan ini!',

        'jump MisiPertama'
    ],

    // SCENE: MISI PERTAMA
    'MisiPertama': [
        'show character rimba happy',
        'rimba Tugas pertamamu adalah menemukan Pohon Ulin.',
        'rimba Pohon Ulin adalah raja dari semua pohon di Kalimantan.',
        'rimba Cari kode QR di pohon itu, lalu scan!',

        'centered Siap memulai petualangan?',

        // Redirect ke scan page
        {
            'Function': {
                'Apply': function () {
                    window.location.href = 'scan.html?mission=ulin_01';
                }
            }
        }
    ],

    // SCENE: SETELAH SCAN BERHASIL
    'AfterScan': [
        'show background forest_clearing with fadeIn',
        'show character rimba happy at center',
        'rimba Luar biasa! Kamu berhasil menemukan pohon itu!',
        'rimba Sekarang kamu harus mengenal bagian-bagiannya.',
        'rimba Ayo kita rakit puzzle anatomi pohon ini!',

        // Redirect ke puzzle
        {
            'Function': {
                'Apply': function () {
                    window.location.href = 'puzzle.html';
                }
            }
        }
    ]
});

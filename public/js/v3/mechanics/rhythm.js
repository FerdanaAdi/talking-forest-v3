/**
 * ============================================
 * 📄 FILE: public/js/v3/mechanics/rhythm.js
 * 🎵 FUNGSI: Logika Game Rhythm (Tap-Tap Musik)
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur jalannya game musik:
 * - Menjatuhkan not (kotak warna) dari atas
 * - Mengecek apakah pemain menekan tombol di saat yang pas
 * - Menghitung skor
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ CONFIG (Baris ~20):
 *    - `gameSpeed`: Kecepatan jatuh not (Makin kecil = Makin kencang!)
 *                   Contoh: 2 (Cepat), 4 (Sedang), 6 (Lambat)
 *    - `spawnRate`: Seberapa sering not muncul (milidetik)
 *                   Contoh: 1000 = 1 detik sekali
 *
 * ✅ SCORING (Baris ~30):
 *    - `perfectScore`: Poin kalau pas banget
 *    - `goodScore`: Poin kalau lumayan
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Logika spawnNote (gsap.to)
 * ✗ Logika hitDetection (Math.abs)
 * ✗ Nama fungsi class RhythmGame
 *
 * ============================================
 */

export class RhythmGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scoreDisplay = document.getElementById('score-display');
        this.notesLayer = document.getElementById('notes-layer');
        this.flowerVisual = document.getElementById('flower-visual');

        // --- ⚙️ CONFIG (SIAP DIEDIT) ---
        this.config = {
            gameSpeed: 3,        // Durasi jatuh (detik). Ubah jadi 2 kalau mau ngebut!
            spawnRate: 1500,     // Muncul tiap 1.5 detik
            targetY: 0,          // Posisi garis (dihtiung otomatis nanti)
            hitWindow: 50        // Toleransi meleset (pixel)
        };

        // --- 🏆 SCORING (SIAP DIEDIT) ---
        this.points = {
            PERFECT: 100,
            GOOD: 50,
            MISS: 0
        };

        // State (Jangan ubah nilai awal ini)
        this.score = 0;
        this.isPlaying = false;
        this.activeNotes = []; // Daftar not yang sedang jatuh
        this.lanes = [1, 2, 3]; // Jalur (Kiri, Tengah, Kanan)
    }

    start() {
        console.log("🎵 Rhythm Game Dimulai!");
        this.isPlaying = true;
        this.score = 0;
        this.updateScore(0);

        // Hitung posisi garis target (berdasarkan elemen HTML)
        // Kita ambil posisi garis kuning dari bawah (bottom: 24 = 6rem = 96px)
        // Disederhanakan: kita anggap target ada di 80% tinggi container
        this.config.targetY = this.container.offsetHeight - 120; // Kira-kira di garis kuning

        // Mulai Loop Musik (Spawn Notes)
        this.spawnLoop = setInterval(() => {
            if (this.isPlaying) this.spawnNote();
        }, this.config.spawnRate);

        // Timer Selesai Game (30 Detik)
        setTimeout(() => {
            if (this.isPlaying) this.finishGame();
        }, 30000);

        // Pasang Event Listener Tombol
        this.attachControls();
    }

    // Fungsi Munculkan Not
    spawnNote() {
        // Pilih jalur acak (1, 2, atau 3)
        const laneIdx = Math.floor(Math.random() * this.lanes.length);
        const lane = this.lanes[laneIdx];

        // Buat elemen visual not
        const note = document.createElement('div');

        // Warna berdasarkan jalur (Merah, Hijau, Biru)
        let colorClass = 'bg-green-500';
        if (lane === 1) colorClass = 'bg-red-500';
        if (lane === 3) colorClass = 'bg-blue-500';

        note.className = `absolute w-16 h-16 rounded-lg ${colorClass} border-2 border-white shadow-lg top-0`;

        // Posisi X (Horizontal)
        // Lane 1: 35%, Lane 2: 50%, Lane 3: 65% (Kira-kira, nanti dirapikan CSS Grid)
        // Kita pakai fixed pixel simpel dulu sesuai HTML rhtyhm.html
        // Perkiraan posisi left berdasarkan struktur flex
        const positions = ['25%', '50%', '75%'];
        note.style.left = positions[laneIdx];
        note.style.transform = 'translateX(-50%)';

        this.notesLayer.appendChild(note);

        // Record data not ini
        const noteData = {
            id: Date.now(),
            el: note,
            lane: lane,
            hit: false
        };
        this.activeNotes.push(noteData);

        // Animasi Jatuh (GSAP)
        gsap.to(note, {
            y: this.container.offsetHeight + 100, // Jatuh sampai lewat bawah layar
            duration: this.config.gameSpeed,
            ease: "none", // Kecepatan konstan (linear)
            onUpdate: () => {
                // Update posisi real-time (bisa dicek manual kalau mau presisi tinggi)
            },
            onComplete: () => {
                // Not lewat tanpa di-hit (MISS)
                if (!noteData.hit && this.isPlaying) {
                    this.handleMiss(noteData);
                }
                note.remove(); // Hapus dari layar
                this.activeNotes = this.activeNotes.filter(n => n.id !== noteData.id); // Hapus dari memori
            }
        });
    }

    attachControls() {
        // Keyboard (A, S, D)
        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            if (e.key === 'a' || e.key === 'A') this.checkHit(1);
            if (e.key === 's' || e.key === 'S') this.checkHit(2);
            if (e.key === 'd' || e.key === 'D') this.checkHit(3);
        });

        // Touch / Click Tombol Layar
        document.getElementById('btn-1').addEventListener('mousedown', () => this.checkHit(1));
        document.getElementById('btn-2').addEventListener('mousedown', () => this.checkHit(2));
        document.getElementById('btn-3').addEventListener('mousedown', () => this.checkHit(3));

        // Support Touchstart untuk HP
        document.getElementById('btn-1').addEventListener('touchstart', (e) => { e.preventDefault(); this.checkHit(1); });
        document.getElementById('btn-2').addEventListener('touchstart', (e) => { e.preventDefault(); this.checkHit(2); });
        document.getElementById('btn-3').addEventListener('touchstart', (e) => { e.preventDefault(); this.checkHit(3); });
    }

    checkHit(lane) {
        // Cari not di jalur ini yang paling dekat dengan garis target
        // Kita cari not yang posisinya ada di range targetY +/- hitWindow

        /* 
           ⚠️ LOGIKA SEDERHANA UNTUK PROTOTIPE:
           GSAP mengubah property 'transform: translate(0px, Ypx)'.
           Kita harus baca nilai Y itu.
        */

        const hitNote = this.activeNotes.find(n => {
            if (n.lane !== lane || n.hit) return false;

            // Ambil posisi Y current dari GSAP
            const currentY = gsap.getProperty(n.el, "y");

            // Cek Jarak
            const distance = Math.abs(currentY - this.config.targetY);
            return distance < this.config.hitWindow;
        });

        if (hitNote) {
            // KENA! (HIT)
            hitNote.hit = true;

            // Cek seberapa pas?
            const currentY = gsap.getProperty(hitNote.el, "y");
            const distance = Math.abs(currentY - this.config.targetY);

            if (distance < 20) {
                this.showFeedback("PERFECT! 🔥", "text-yellow-400");
                this.updateScore(this.points.PERFECT);
                // Efek visual: Not meledak/hilang
                this.animateHit(hitNote.el, 1.5);
            } else {
                this.showFeedback("GOOD! 👍", "text-blue-400");
                this.updateScore(this.points.GOOD);
                this.animateHit(hitNote.el, 1.2);
            }

        } else {
            // GAK ADA NOT TAPI DI TEKAN (MISS KOSONG)
            // Opsional: Kurangi poin atau biarkan saja
            // console.log("Miss click");
        }
    }

    handleMiss(noteData) {
        this.showFeedback("MISS ❌", "text-red-500");

        // Ubah warna not jadi abu-abu sesaat sebelum hilang
        noteData.el.classList.add('grayscale');
        noteData.el.classList.remove('bg-red-500', 'bg-green-500', 'bg-blue-500');
        noteData.el.classList.add('bg-gray-500');
    }

    updateScore(points) {
        this.score += points;
        this.scoreDisplay.innerText = this.score;

        // Efek Flower Growth (Makin tinggi skor, bunga makin besar/jelas)
        // Contoh simpel: Opacity nambah
        const progress = Math.min(this.score / 1000, 1); // Max di 1000 poin
        this.flowerVisual.style.opacity = 0.5 + (progress * 0.5);
        this.flowerVisual.style.transform = `scale(${1 + progress})`;
    }

    animateHit(element, scaleMult) {
        // Hentikan animasi jatuh
        gsap.killTweensOf(element);

        // Efek "Kena"
        gsap.to(element, {
            scale: scaleMult,
            opacity: 0,
            duration: 0.2,
            onComplete: () => element.remove()
        });
    }

    showFeedback(text, colorClass) {
        const feedback = document.createElement('div');
        feedback.innerText = text;
        feedback.className = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black font-bakso ${colorClass} drop-shadow-lg pointer-events-none z-50`;
        this.container.appendChild(feedback);

        gsap.fromTo(feedback,
            { scale: 0.5, opacity: 0 },
            {
                scale: 1.5, opacity: 1, duration: 0.3, ease: "back.out(2)", onComplete: () => {
                    gsap.to(feedback, { opacity: 0, y: -50, duration: 0.3, onComplete: () => feedback.remove() });
                }
            }
        );
    }

    finishGame() {
        this.isPlaying = false;
        clearInterval(this.spawnLoop);

        // ✅ INTEGRASI LOGIC V3
        try {
            // 1. Ambil ID Species (Contoh: 'anggrek_hitam')
            const urlParams = new URLSearchParams(window.location.search);
            const speciesId = urlParams.get('id') || 'anggrek_hitam';

            // 2. Mock State (Karena kita diluar Alpine)
            let playerData = JSON.parse(localStorage.getItem('tf_player_v3')) || {
                inventory: [], xp: 0, badges: [], level: 1
            };
            if (!playerData.inventory) playerData.inventory = [];

            // 3. Simpan Progress
            // Syarat menang: Skor minimal 500
            if (this.score >= 500) {
                const pm = new ProgressManager({ player: playerData });
                pm.saveProgress(speciesId, 150); // Rhythm XP reward

                // System UI Modal: GAME_WON
                if (window.Alpine && window.Alpine.store('systemUI')) {
                    window.Alpine.store('systemUI').showModal('GAME_WON', {
                        title: 'LUAR BIASA! 🎉',
                        message: `Skor: ${this.score}`,
                        xp: 150,
                        onContinue: () => {
                            window.location.href = `quiz.html?id=${speciesId}&source=rhythm`;
                        }
                    });
                } else {
                    alert(`🎉 LUAR BIASA! Skor: ${this.score}\nLanjut ke Kuis Pengetahuan!`);
                    window.location.href = `quiz.html?id=${speciesId}&source=rhythm`;
                }

            } else {
                // Kalah - System UI Toast
                if (window.Alpine && window.Alpine.store('systemUI')) {
                    window.Alpine.store('systemUI').showToast(`❌ Skor kurang: ${this.score}. Butuh 500 poin!`, 'error');
                    setTimeout(() => window.location.reload(), 2000);
                } else {
                    alert(`❌ SKOR KURANG: ${this.score}\nButuh 500 poin. Coba lagi ya!`);
                    window.location.reload();
                }
            }

        } catch (e) {
            console.error("Logic Error:", e);
            window.location.href = 'index.html'; // Fallback
        }
    }
}

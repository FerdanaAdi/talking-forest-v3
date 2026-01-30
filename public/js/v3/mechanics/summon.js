/**
 * ============================================
 * 📄 FILE: public/js/v3/mechanics/summon.js
 * 🦅 FUNGSI: Logika Game Tebak Suara Hewan
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur logika permainan:
 * - Load data hewan dari species.json
 * - Acak 3 pilihan siluet
 * - Mainkan suara (dummy)
 * - Cek jawaban Benar/Salah
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ PESAN FEEDBACK (Baris ~110):
 *    - Pesan kalau salah tebak
 *    - Pesan kalau benar (di fact card)
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Logika `shuffleArray` (Pengacak)
 * ✗ Logika `checkAnswer`
 * ✗ Import statements
 *
 * ============================================
 */

export class SummonGame {
    constructor() {
        this.container = document.getElementById('silhouettes-container');
        this.btnPlay = document.getElementById('btn-play-sound');
        this.soundWave = document.getElementById('sound-wave');

        this.factCard = document.getElementById('fact-card');
        this.factTitle = document.getElementById('fact-title');
        this.factDesc = document.getElementById('fact-desc');
        this.factImage = document.getElementById('fact-image');

        // State
        this.animals = [];
        this.currentRound = null;
        this.isPlayingSound = false;

        this.init();
    }

    async init() {
        await this.loadData();
        this.setupControls();
        this.startRound();
    }

    async loadData() {
        // Load data dari JSON
        try {
            const res = await fetch('assets/data/species.json');
            const data = await res.json();
            // Filter hanya yang type="animal"
            this.animals = data.filter(item => item.type === 'animal' || item.mechanic === 'summon');

            // Kalau kosong, pakai data dummy biar gak error
            if (this.animals.length === 0) {
                console.warn("⚠️ Data hewan kosong, pakai dummy.");
                this.animals = [
                    { id: 'enggang', name: 'Enggang', description: 'Burung besar paruh gading.' },
                    { id: 'orangutan', name: 'Orangutan', description: 'Kera besar berbulu merah.' },
                    { id: 'bekantan', name: 'Bekantan', description: 'Monyet hidung panjang.' }
                ];
            }
        } catch (e) {
            console.error("Gagal load data:", e);
        }
    }

    setupControls() {
        this.btnPlay.addEventListener('click', () => this.playSound());
    }

    startRound() {
        // Reset UI
        this.container.innerHTML = '';
        this.factCard.style.marginBottom = '-100%'; // Sembunyikan kartu

        // 1. Pilih 1 Hewan Target (Jawaban Benar)
        const targetIndex = Math.floor(Math.random() * this.animals.length);
        const targetAnimal = this.animals[targetIndex];

        // 2. Pilih 2 Hewan Pengecoh (Jawaban Salah)
        // Filter hewan selain target, lalu acak
        const others = this.animals.filter(a => a.id !== targetAnimal.id);
        const distractors = this.shuffleArray(others).slice(0, 2);

        // 3. Gabungkan dan Acak Posisi
        const options = this.shuffleArray([targetAnimal, ...distractors]);

        this.currentRound = {
            target: targetAnimal,
            options: options
        };

        // 4. Render Siluet (Kotak Hitam)
        options.forEach(animal => {
            const btn = document.createElement('button');
            btn.className = "aspect-square bg-black rounded-xl border-4 border-stone-600 shadow-lg hover:border-yellow-400 hover:scale-105 transition-all relative overflow-hidden group";

            // Placeholder Gambar Siluet (Bisa ganti <img> nanti)
            // Sekarang pakai Emoji/Teks dulu tapi digelapkan
            btn.innerHTML = `
                <div class="absolute inset-0 bg-black z-10 group-hover:bg-opacity-90 transition"></div>
                <span class="text-4xl opacity-0 group-hover:opacity-50 transition">❓</span>
            `;

            btn.onclick = () => this.checkAnswer(animal, btn);
            this.container.appendChild(btn);
        });

        // Auto play sound (opsional)
        // this.playSound();
    }

    playSound() {
        if (this.isPlayingSound) return;
        this.isPlayingSound = true;

        // Visualisasi Gelombang Suara
        this.soundWave.style.opacity = 1;

        // Placeholder Suara (Text Speech browser dulu sebagai ganti MP3)
        // Naju nanti ganti ini dengan: new Audio(this.currentRound.target.soundUrl).play();
        const msg = new SpeechSynthesisUtterance("Suara " + this.currentRound.target.name);
        msg.rate = 0.8;
        window.speechSynthesis.speak(msg);

        // Reset setelah selesai (simulasi 2 detik)
        setTimeout(() => {
            this.isPlayingSound = false;
            this.soundWave.style.opacity = 0;
        }, 2000);
    }

    checkAnswer(selectedAnimal, btnElement) {
        if (selectedAnimal.id === this.currentRound.target.id) {
            // ✅ BENAR!
            this.handleCorrect(selectedAnimal, btnElement);
        } else {
            // ❌ SALAH!
            this.handleWrong(btnElement);
        }
    }

    handleCorrect(animal, btn) {
        // 1. Ubah visual jadi "Terungkap"
        btn.classList.remove('bg-black', 'border-stone-600');
        btn.classList.add('bg-green-500', 'border-green-300', 'scale-110');

        // Hapus overlay hitam
        btn.innerHTML = `<span class="text-4xl animate-bounce">✅</span>`;

        // 2. Tampilkan Fakta
        this.showFact(animal);

        // 3. Mainkan suara "Success"
        this.playSfx('success');
    }

    handleWrong(btn) {
        // Efek getar/salah
        btn.classList.add('bg-red-500', 'shake-animation'); // shake-animation perlu di CSS
        setTimeout(() => btn.classList.remove('bg-red-500'), 500);

        // Audio salah
        const msg = new SpeechSynthesisUtterance("Salah");
        window.speechSynthesis.speak(msg);
    }

    showFact(animal) {
        this.factTitle.innerText = `Benar! Ini ${animal.name}`;
        this.factDesc.innerText = animal.description || "Hewan ini sangat unik lho!";
        this.factImage.innerHTML = "✨"; // Placeholder gambar

        // Slide Up Card
        this.factCard.style.marginBottom = '0';
    }

    nextLevel() {
        // Reload round baru
        this.startRound();
    }

    playSfx(type) {
        // Placeholder SFX
        console.log(`🎵 Playing SFX: ${type}`);
    }

    // Helper: Acak Array (Fisher-Yates Shuffle)
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

/**
 * ============================================
 * 📄 FILE: public/js/v3/components/fact-card.js
 * 🎓 FUNGSI: Menampilkan Kartu Fakta Edukatif
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur tampilan "Kartu Pintar" yang muncul
 * setelah pemain menyelesaikan game.
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Tidak ada di file ini.
 *    (Edit tampilan di game.css, edit teks di species.json)
 *
 * ============================================
 */

export class FactCard {
    constructor() {
        this.overlay = null;
        this.createOverlay();
    }

    createOverlay() {
        // Cek apakah sudah ada (biar gak dobel)
        if (document.getElementById('global-fact-overlay')) return;

        // Buat elemen HTML via JS (Inject ke Body)
        // Biar Naju gak perlu copas-copas HTML ke semua file
        const html = `
            <div id="global-fact-overlay" class="fixed inset-0 z-[999] flex items-end justify-center pointer-events-none transition-all duration-500 opacity-0 mb-[-20px]">
                
                <!-- KARTU -->
                <div class="bg-white m-4 p-6 rounded-[2rem] shadow-2xl w-full max-w-sm border-4 border-forest relative pointer-events-auto transform transition-transform duration-500 translate-y-full" id="global-fact-card">
                    
                    <!-- Hiasan -->
                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full border-4 border-white flex items-center justify-center text-3xl shadow-md animate-bounce">
                        💡
                    </div>

                    <div class="mt-6 text-center">
                        <h2 id="gf-title" class="font-bakso text-2xl text-forest mb-2">Tahukah Kamu?</h2>
                        
                        <div class="bg-parchment p-4 rounded-xl border-2 border-stone-200 mb-4 text-left flex gap-4 items-start">
                            <div id="gf-icon" class="text-4xl">🤔</div>
                            <p id="gf-desc" class="text-stone-700 text-sm font-nunito leading-relaxed">
                                ...
                            </p>
                        </div>

                        <!-- Tombol Lanjut -->
                        <button id="gf-btn" class="w-full bg-forest text-white font-bakso text-lg py-3 rounded-xl hover:scale-105 active:scale-95 transition shadow-lg">
                            LANJUT ➜
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);

        // Cache Elements
        this.overlay = document.getElementById('global-fact-overlay');
        this.card = document.getElementById('global-fact-card');
        this.title = document.getElementById('gf-title');
        this.desc = document.getElementById('gf-desc');
        this.icon = document.getElementById('gf-icon');
        this.btn = document.getElementById('gf-btn');
    }

    /**
     * Tampilkan Kartu Fakta
     * @param {string} title - Judul (misal: "Hebat!")
     * @param {string} fact - Isi fakta edukatif
     * @param {string} emoji - Icon (opsional)
     * @param {function} onNext - Fungsi yang dijalankan saat tombol ditekan
     */
    show(title, fact, emoji = '✨', onNext = null) {
        if (!this.overlay) this.createOverlay();

        // Isi Konten
        this.title.innerText = title;
        this.desc.innerText = fact;
        this.icon.innerText = emoji;

        // Tampilkan Fade In & Slide Up
        this.overlay.classList.remove('opacity-0', 'mb-[-20px]');
        this.card.classList.remove('translate-y-full');

        // Setup Tombol
        this.btn.onclick = () => {
            this.hide();
            if (onNext) onNext();
        };

        // Audio Effect (Pop)
        this.playSound();
    }

    hide() {
        if (!this.overlay) return;

        // Slide Down & Fade Out
        this.card.classList.add('translate-y-full');
        this.overlay.classList.add('opacity-0', 'mb-[-20px]');
    }

    playSound() {
        // Simple Pop Sound
        const audio = new Audio('assets/audio/sfx/pop.mp3');
        audio.volume = 0.5;
        // audio.play().catch(() => {}); // Commented out biar gak error kalau file gak ada
    }
}

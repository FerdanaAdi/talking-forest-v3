/**
 * ============================================
 * 📄 FILE: public/js/v3/dialog-engine.js
 * ✍️ FUNGSI: Animasi teks mengetik (Typewriter Effect)
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur efek "mengetik" pada dialog Rimba.
 * Teksnya muncul satu huruf per satu, seperti di game RPG!
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Baris 17: typingSpeed (kecepatan ketik)
 *    - Angka KECIL = CEPAT (misal: 10)
 *    - Angka BESAR = LAMBAT (misal: 80)
 *    - Default: 30 (pas untuk dibaca)
 *
 *    Contoh: typingSpeed: 30 → typingSpeed: 50 (lebih lambat)
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Nama fungsi (type, stop, reset)
 * ✗ Logika setInterval dan clearInterval
 *
 * ============================================
 */

const DialogEngine = () => ({
    // State Internal
    text: '',           // Teks yang sedang tampil (bisa separuh jalan)
    fullText: '',       // Teks lengkap yang harusnya tampil
    isTyping: false,    // Apakah sedang mengetik?
    typingSpeed: 30,    // Kecepatan ketik (ms per huruf)
    timer: null,        // Variable timer untuk animasi

    // Fungsi Utama: Mulai Mengetik
    /**
     * @function type
     * @description Memulai efek mengetik (typewriter) pada dialog.
     * @param {string} message - Teks lengkap yang akan diketik.
     */
    type(message) {
        // Reset dulu
        this.stop();
        this.fullText = message;
        this.text = '';
        this.isTyping = true;

        let index = 0;

        // Mulai Loop Animasi
        this.timer = setInterval(() => {
            // Tambahkan satu huruf
            this.text += this.fullText.charAt(index);
            index++;

            // Cek apakah sudah selesai?
            if (index >= this.fullText.length) {
                this.stop(); // Selesai
            }
        }, this.typingSpeed);
    },

    /**
     * @function stop
     * @description Menghentikan animasi ketik dan menampilkan seluruh teks.
     */
    stop() {
        clearInterval(this.timer);
        this.isTyping = false;
        this.text = this.fullText; // Pastikan teks tampil penuh
    },

    /**
     * @function reset
     * @description Mengosongkan dialog engine.
     */
    reset() {
        this.stop();
        this.text = '';
        this.fullText = '';
    }
});

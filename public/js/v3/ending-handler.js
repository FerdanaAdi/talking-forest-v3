/**
 * ============================================
 * 📄 FILE: js/v3/ending-handler.js
 * 🎬 FUNGSI: Sutradara Ending (Final Cutscene)
 * ============================================
 * 
 * 🔰 PANDUAN:
 * File ini mengecek apakah pemain pantas melihat ending.
 * Jika ya, dia akan mengarahkan ke halaman cutscene.
 */

class EndingHandler {
    constructor(progressManager) {
        this.pm = progressManager; // Butuh akses ke Progress Manager
    }

    /**
     * 🔍 CEK STATUS FINALE
     * Dipanggil setiap kali pemain menyelesaikan misi / scan baru.
     */
    checkFinaleTrigger() {
        console.log("🕵️ EndingHandler: Mengecek kelayakan ending...");

        if (this.pm.isGameComplete()) {
            console.log("✨ SYARAT TERPENUHI! MEMULAI GRAND FINALE...");
            this.triggerFinale();
        } else {
            console.log("🔒 Belum tamat. Teruskan perjuangan!");
        }
    }

    /**
     * 🚀 LUNCURKAN CUTSCENE
     */
    triggerFinale() {
        // Tampilkan konfirmasi dengan System UI
        setTimeout(() => {
            if (window.Alpine && window.Alpine.store('systemUI')) {
                window.Alpine.store('systemUI').showModal('CONFIRM_EXIT', {
                    message: '✨ SUSH... Kamu merasakan energi magis berkumpul...\\n\\nSemua species telah ditemukan! Siap untuk ritual terakhir?',
                    onConfirm: () => {
                        window.location.href = 'cutscene.html?scene=grand_finale';
                    },
                    onCancel: () => {
                        // User cancel, stay on current page
                    }
                });
            } else {
                // Fallback
                const confirmResult = window.confirm("✨ SUSH... Kamu merasakan energi magis berkumpul...\\n\\nSemua species telah ditemukan! Siap untuk ritual terakhir?");
                if (confirmResult) {
                    window.location.href = 'cutscene.html?scene=grand_finale';
                }
            }
        }, 1000);
    }
}

// Global Export
window.EndingHandler = EndingHandler;

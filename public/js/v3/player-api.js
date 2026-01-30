/**
 * ============================================
 * 📄 FILE: public/js/v3/player-api.js
 * 👤 FUNGSI: Mengurus Data Pemain & Simpan ke Cloud
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengurus:
 * - Validasi nama pemain (minimal 3 huruf, tidak boleh simbol)
 * - Menyimpan data ke localStorage (offline)
 * - Menyimpan data ke Firebase (online)
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Baris 14: Pesan error "Nama tidak boleh kosong!"
 * ✅ Baris 17: Pesan error "Nama minimal 3 huruf ya!"
 * ✅ Baris 18: Pesan error "Jangan pakai simbol aneh-aneh ya!"
 *
 *    Contoh: 'Nama tidak boleh kosong!' → 'Ups, namanya kosong nih!'
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Regex validasi (/^[a-zA-Z0-9 ]+$/)
 * ✗ Logika localStorage.setItem
 * ✗ Logika Firebase (setDoc, signInAnonymously)
 *
 * ============================================
 */

const PlayerAPI = () => ({
    /**
     * @function validateName
     * @description Memvalidasi input nama pemain.
     * @param {string} name - Nama yang diinput user.
     * @returns {object} { valid: boolean, msg: string }
     */
    validateName(name) {
        if (!name) return { valid: false, msg: 'Nama tidak boleh kosong!' };
        // Sanitization simple (strip HTML tags)
        const cleanName = name.replace(/<[^>]*>?/gm, '');
        if (cleanName.length < 3) return { valid: false, msg: 'Nama minimal 3 huruf ya!' };
        if (!/^[a-zA-Z0-9 ]+$/.test(cleanName)) return { valid: false, msg: 'Jangan pakai simbol aneh-aneh ya!' };
        return { valid: true, sanitized: cleanName };
    },

    /**
     * @function savePlayer
     * @description Menyimpan data player ke LocalStorage & Cloud.
     * @param {object} playerData - Object data player lengkap.
     * @returns {Promise<void>}
     */
    async savePlayer(playerData) {
        // 1. Simpan ke LocalStorage (Cepat & Offline)
        localStorage.setItem('tf_player_v3', JSON.stringify(playerData));
        console.log('[PlayerAPI] Saved to LocalStorage');

        // 2. Simpan ke Firestore (Cloud) - Jika ada internet
        try {
            if (window.db) {
                // Gunakan library Firebase yang sudah di-init di firebase-config.js
                // Tapi karena kita pakai CDN & script module, kita akses via window global atau import
                // Untuk tahap ini, kita asumsi window.db sudah tersedia dari firebase-config.js

                // Cek Login Dulu
                if (!window.currentUser) {
                    await this.loginAnonymously();
                }

                if (window.currentUser) {
                    const uid = window.currentUser.uid;
                    // Simpan ke collection 'players'
                    // Note: Sintaks ini butuh Firebase SDK 9 Modular atau Compat
                    // Kita pakai cara aman: Cek dulu ketersediaan fungsi
                    if (window.setDoc && window.doc) {
                        await window.setDoc(window.doc(window.db, "players", uid), {
                            ...playerData,
                            lastUpdated: new Date()
                        }, { merge: true });
                        console.log('[PlayerAPI] Saved to Firestore');
                    }
                }
            }
        } catch (e) {
            console.warn('[PlayerAPI] Gagal simpan ke Cloud (Mungkin Offline):', e);
        }
    },

    /**
     * @function loginAnonymously
     * @description Login ke Firebase Auth secara anonymous.
     * @returns {Promise<object>} User object dari Firebase.
     */
    async loginAnonymously() {
        try {
            if (window.auth && window.signInAnonymously) {
                const result = await window.signInAnonymously(window.auth);
                window.currentUser = result.user;
                console.log('[PlayerAPI] Login Success:', result.user.uid);
                return result.user;
            }
        } catch (e) {
            console.error('[PlayerAPI] Login Failed:', e);
        }
    }
});

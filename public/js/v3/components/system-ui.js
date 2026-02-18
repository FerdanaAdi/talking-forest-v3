/**
 * ============================================
 * 📄 FILE: public/js/v3/components/system-ui.js
 * 🧠 FUNGSI: Komponen UI Sistem Global (Modals, Toasts, Loading, Error)
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur tampilan "popup" dan "notifikasi" di seluruh aplikasi:
 * - Modal: Kotak dialog besar (Level Up, Badge, Konfirmasi)
 * - Toast: Notifikasi kecil di pojok layar (+50 XP, Error, dll)
 * - Loading: Layar tunggu saat data dimuat
 * - Error: Tampilan saat ada masalah koneksi
 *
 * 💡 CARA PAKAI (dari file lain):
 * ─────────────────────────────────────────────
 * // Tampilkan Toast
 * Alpine.store('systemUI').showToast('+100 XP', 'success');
 * Alpine.store('systemUI').showToast('Koneksi terputus!', 'error');
 *
 * // Tampilkan Modal
 * Alpine.store('systemUI').showModal('LEVEL_UP', { level: 5 });
 * Alpine.store('systemUI').showModal('BADGE_DETAIL', { badge: {...} });
 *
 * // Loading
 * Alpine.store('systemUI').setLoading(true, 'Memuat data...');
 * Alpine.store('systemUI').setLoading(false);
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Nama fungsi (showToast, showModal, dll)
 * ✗ Struktur data toasts[] dan modal
 *
 * ============================================
 */

document.addEventListener('alpine:init', () => {
    Alpine.store('systemUI', {
        // ==========================================
        // 1. TOAST NOTIFICATIONS (ALUR 13)
        // ==========================================
        toasts: [],
        toastIdCounter: 0,

        /**
         * @function showToast
         * @description Menampilkan notifikasi kecil di pojok layar
         * @param {string} message - Pesan yang ditampilkan
         * @param {string} type - Tipe: 'success', 'error', 'xp', 'info'
         * @param {number} duration - Durasi tampil (ms), default 3000
         */
        showToast(message, type = 'info', duration = 3000) {
            const id = ++this.toastIdCounter;
            const toast = { id, message, type, visible: true };
            // Force Reactivity with reassignment
            this.toasts = [...this.toasts, toast];

            // Auto-hide setelah durasi
            setTimeout(() => {
                this.hideToast(id);
            }, duration);
        },

        hideToast(id) {
            const index = this.toasts.findIndex(t => t.id === id);
            if (index !== -1) {
                this.toasts[index].visible = false;
                // Hapus dari array setelah animasi fade
                setTimeout(() => {
                    this.toasts = this.toasts.filter(t => t.id !== id);
                }, 300);
            }
        },

        // ==========================================
        // 2. MODALS (ALUR 12)
        // ==========================================
        modal: {
            isOpen: false,
            type: null,      // 'LEVEL_UP', 'BADGE_DETAIL', 'CONFIRM_EXIT'
            data: {}         // Data spesifik untuk modal
        },

        /**
         * @function showModal
         * @description Menampilkan modal popup
         * @param {string} type - Tipe modal
         * @param {object} data - Data untuk ditampilkan di modal
         */
        // MODAL ACTIONS
        showModal(type, data = {}) {
            console.log('🔔 [SystemUI] Opening Modal:', type, data);

            // Update individual properties for proper Alpine reactivity
            this.modal.data = data;
            this.modal.type = type;
            this.modal.isOpen = true;

            console.log('   AFTER:', JSON.parse(JSON.stringify(this.modal)));
        },
        closeModal() {
            console.log('🔕 [SystemUI] Closing Modal');
            this.modal.isOpen = false;
            this.modal.type = null;
            this.modal.data = {};
        },

        // TOAST ACTIONS==========================================
        // 3. LOADING STATE (ALUR 14)
        // ==========================================
        loading: {
            isActive: false,
            message: 'Memuat...'
        },

        setLoading(isActive, message = 'Memuat...') {
            this.loading.isActive = isActive;
            this.loading.message = message;
        },

        // ==========================================
        // 4. ERROR STATE (ALUR 15)
        // ==========================================
        error: {
            isActive: false,
            code: null,
            message: ''
        },

        showError(code, message) {
            this.error = {
                isActive: true,
                code: code,
                message: message
            };
        },

        hideError() {
            this.error.isActive = false;
            this.error.code = null;
            this.error.message = '';
        },

        // ==========================================
        // 5. SETTINGS STATE (ALUR 16)
        // ==========================================
        settings: {
            sfxVolume: parseFloat(localStorage.getItem('tfv3_sfx_volume') || '0.5'),
            bgmVolume: parseFloat(localStorage.getItem('tfv3_bgm_volume') || '0.3'),
            language: localStorage.getItem('tfv3_language') || 'id',
            darkMode: localStorage.getItem('tfv3_dark_mode') === 'true',
            animationsEnabled: localStorage.getItem('tfv3_animations') !== 'false'
        },

        saveSetting(key, value) {
            this.settings[key] = value;
            localStorage.setItem('tfv3_' + key.replace(/([A-Z])/g, '_$1').toLowerCase(), value);
        }
    });

    // Global Debug Helper
    window.testModal = () => {
        Alpine.store('systemUI').showModal('GAME_WON', {
            title: 'TEST SUKSES! 🚀',
            message: 'Sistem UI v3 berfungsi normal.',
            xp: 123
        });
    };
});

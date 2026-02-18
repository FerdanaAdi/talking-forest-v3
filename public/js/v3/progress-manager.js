/**
 * ============================================
 * 📄 FILE: js/v3/progress-manager.js
 * 📈 FUNGSI: Manajer XP, Level, dan Koleksi
 * ============================================
 * 
 * 🔰 PANDUAN:
 * File ini bertugas mencatat prestasi pemain.
 * Dia yang menentukan kapan pemain naik level atau dapat badge.
 */

// Global Export agar bisa dipanggil di game-state.js
// Dipindah ke bawah agar tidak ReferenceError

class ProgressManager {
    constructor(gameState) {
        this.state = gameState; // Referensi ke Alpine Store (player data)

        // Konfigurasi Leveling
        this.levelConfig = {
            baseXP: 100,  // XP butuh untuk level 2
            multiplier: 1.5 // Tiap level makin sush (100, 150, 225...)
        };

        // Daftar Total Koleksi (Untuk cek tamat)
        this.totalSpecies = [];
        this.loadTotalSpecies();
    }

    /**
     * 📥 LOAD DAFTAR SPECIES DARI JSON
     */
    async loadTotalSpecies() {
        try {
            const res = await fetch('assets/data/species.json');
            const data = await res.json();
            this.totalSpecies = data.map(s => s.id);
            console.log(`📋 ProgressManager: ${this.totalSpecies.length} species dimuat.`);
        } catch (e) {
            console.error("❌ Gagal load species.json:", e);
            // Fallback
            this.totalSpecies = ['mangga_kakek', 'paku_sarang', 'bekantan'];
        }
    }

    /**
     * 💾 SIMPAN PROGRESS BARU
     * @param {string} speciesId - ID Unik spesies (misal: 'mangga_kakek')
     * @param {number} xpEarned - XP yang didapat
     */
    saveProgress(speciesId, xpEarned) {
        if (!this.state.player) {
            console.error("❌ Eror: Data pemain tidak ditemukan!");
            return;
        }

        console.log(`📝 Mencatat progress: ${speciesId} (+${xpEarned} XP)`);

        // 1. Cek apakah sudah pernah koleksi?
        if (!this.state.player.inventory.includes(speciesId)) {
            // BARU! Tambahkan ke tas
            this.state.player.inventory.push(speciesId);
            console.log("🎒 Barang baru masuk inventaris!");

            // Tambah XP
            this.addXP(xpEarned);

            // Cek Badge Spesial
            this.checkBadges();
        } else {
            console.log("⚠️ Item ini sudah ada di tas (Re-play). Tidak dapat XP.");
        }

        // 2. Simpan ke LocalStorage
        this.triggerSave();
    }

    /**
     * ➕ TAMBAH XP & CEK LEVEL UP
     */
    addXP(amount) {
        this.state.player.xp += amount;

        let currentLevel = this.state.player.level;
        // Rumus sederhana: Level = Math.floor(XP / 100) + 1
        // Tapi kita pakai threshold manual: 100, 300, 600...
        let nextLevelXP = currentLevel * 100;

        if (this.state.player.xp >= nextLevelXP) {
            this.state.player.level++;
            console.log(`🎉 LEVEL UP! ${currentLevel} -> ${this.state.player.level}`);

            // SYSTEM UI MODAL: LEVEL UP
            if (window.Alpine && window.Alpine.store('systemUI')) {
                window.Alpine.store('systemUI').showModal('LEVEL_UP', {
                    level: this.state.player.level,
                    rank: this.getLevelRank(this.state.player.level),
                    stars: Math.min(this.state.player.level, 5)
                });
            }
        }
    }

    getLevelRank(level) {
        if (level < 2) return "Penjelajah Pemula";
        if (level < 4) return "Sahabat Hutan";
        return "Penjaga Rimba";
    }

    /**
     * 🏅 CEK BADGE (Achievements)
     */
    checkBadges() {
        const inv = this.state.player.inventory;
        const badges = this.state.player.badges;
        let newBadge = null;

        // Contoh Badge: "Penjelajah Pemula" (Punya 1 item)
        if (inv.length >= 1 && !badges.includes('pemula')) {
            newBadge = { id: 'pemula', name: 'Penjelajah Pemula', icon: '🌱' };
        }

        // Contoh Badge: "Ahli Rimba" (Punya 3 item)
        if (inv.length >= 3 && !badges.includes('ahli_rimba')) {
            newBadge = { id: 'ahli_rimba', name: 'Ahli Rimba', icon: '🦁' };
        }

        if (newBadge) {
            this.state.player.badges.push(newBadge.id);

            // SYSTEM UI MODAL: ACHIEVEMENT
            if (window.Alpine && window.Alpine.store('systemUI')) {
                window.Alpine.store('systemUI').showModal('ACHIEVEMENT_UNLOCK', {
                    badge: newBadge,
                    xp: 0
                });
            } else {
                alert(`🏅 BADGE BARU: ${newBadge.name}!`);
            }
        }
    }

    /**
     * 💾 TRIGGER SAVE KE STORAGE
     */
    triggerSave() {
        this.state.player.last_saved = new Date().toISOString();
        localStorage.setItem('tf_player_v3', JSON.stringify(this.state.player));
        console.log("💾 Data tersimpan otomatis.");
    }

    /**
     * 🏁 CEK APAKAH SUDAH TAMAT?
     */
    isGameComplete() {
        const owned = this.state.player.inventory;
        // Jika totalSpecies belum load, return false
        if (!this.totalSpecies || this.totalSpecies.length === 0) return false;

        return this.totalSpecies.every(id => owned.includes(id));
    }
}

// Global Export
window.ProgressManager = ProgressManager;

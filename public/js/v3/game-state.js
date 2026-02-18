/**
 * ============================================
 * 📄 FILE: public/js/v3/game-state.js
 * 🧠 FUNGSI: Otak utama game Talking Forest V3
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini adalah "otak" dari game. Dia mengatur:
 * - Data pemain (nama, avatar, XP)
 * - Alur registrasi
 * - Perpindahan halaman (routing)
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Baris 16-20: Volume audio (ganti angka 0.5 ke 0-1)
 * ✅ Baris 140-141: Label stage ("Bibit", "Tunas", "Pohon")
 *    Contoh: { 'child': 'Bibit' } → { 'child': 'Kecambah' }
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Nama fungsi (init, startGame, playDialog, dll)
 * ✗ Logika if/else dan return
 * ✗ Baris window.location.href (redirect)
 *
 * 🔧 CARA TEST:
 * 1. Edit sesuatu
 * 2. Refresh browser (F5)
 * 3. Cek Console (F12) kalau ada error
 *
 * ============================================
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('gameLogic', () => ({
        // ==========================================
        // MODULES (Load External Logic)
        // ==========================================
        playerAPI: PlayerAPI(),
        dialogEngine: DialogEngine(),
        progressManager: null, // Init di init()
        endingHandler: null,   // Init di init()

        // AUDIO SYSTEM (Centralized)
        sfx: {
            pop: new Audio('assets/audio/sfx/pop.mp3'),
            chime: new Audio('assets/audio/sfx/chime.mp3'),
            error: new Audio('assets/audio/sfx/error.mp3')
        },

        // ==========================================
        // 1. DATA PEMAIN (STATE)
        // ==========================================
        player: {
            name: '',
            gender: 'male',
            stage: 'child',
            avatar: 'child_male',
            xp: 0,
            level: 1,
            saved: false,
            hook_seen: false,
            // 🎒 INVENTORY SYSTEM (New Phase 5)
            inventory: [],        // Koleksi Species: ['mangga_kakek', 'paku_sarang']
            badges: [],           // Badge Prestasi: ['penjaga_hutan', 'ahli_tanaman']
            completedSpecies: []  // ID Species yang sudah tamat 100%
        },

        // 0 = Intro, 1 = Register, 2 = Mission
        gameState: 0,

        // ==========================================
        // 2. DATA DIALOG
        // ==========================================
        dialogs: [],
        dialogIndex: 0,
        // Note: currentDialog kita ambil dari dialogs[index], 
        // tapi teks-nya kita ambil dari dialogEngine.text (untuk efek ketik)

        // Options
        options: {
            stages: ['child', 'adult', 'elder'],
            genders: ['male', 'female']
        },

        // ==========================================
        // 3. FUNGSI UTAMA (INIT)
        // ==========================================
        /**
         * @function init
         * @description Inisialisasi game, load dialog, cek sesi player.
         * @returns {Promise<void>}
         */
        async init() {
            // A. Load Database Dialog
            const res = await fetch('assets/data/dialogs.json');
            const data = await res.json();
            this.allDialogs = data;

            // PRELOAD AUDIO
            Object.values(this.sfx).forEach(audio => {
                audio.volume = 0.5;
                audio.preload = 'auto';
                audio.load();
            });

            // C. INIT LOGIC HELPERS (Phase 5)
            if (window.ProgressManager) {
                this.progressManager = new window.ProgressManager(this);
                this.endingHandler = new window.EndingHandler(this.progressManager);
                console.log("✅ Logic V3 Loaded (Progress & Ending)");
            }

            // B. CEK ROUTING (Berdasarkan URL & LocalStorage)
            const urlParams = new URLSearchParams(window.location.search);
            const action = urlParams.get('action'); // 'register' atau null
            const savedData = localStorage.getItem('tf_player_v3');

            // LOGIC 1: SUDAH PUNYA AKUN?
            if (savedData) {
                // Restore Player
                this.player = JSON.parse(savedData);
                this.player.saved = true;
                // Backwards Compatibility (Jika player lama belum punya field hook_seen)
                if (typeof this.player.hook_seen === 'undefined') {
                    this.player.hook_seen = false;
                }

                this.playerAPI.loginAnonymously(); // Sync Cloud

                // RESTORE DASHBOARD (Scene 1.2 Mission)
                this.gameState = 2; // Dashboard Mode
                this.dialogs = data.scene_1_2_mission || [];
                // Opsional: Play dialog greeting
                // this.playDialog(0);

                console.log('✅ Welcome back:', this.player.name);
                this.updateAvatarId();
                return;
            }

            // LOGIC 2: BELUM PUNYA AKUN
            // Cek apakah dia baru balik dari Bioskop (action=register)?
            if (action === 'register') {
                console.log('📝 Register Mode (Post-Intro)');
                this.gameState = 1; // Form Registrasi
            } else {
                // User Baru buka web -> Lempar ke Bioskop Intro
                console.log('🎬 New User -> Redirect to Story');
                window.location.href = 'story.html?scene=intro';
                return;
            }

            this.updateAvatarId();
        },

        // Helper: Mainkan Dialog ke-N dengan Efek Ketik
        playDialog(index) {
            if (index < this.dialogs.length) {
                const d = this.dialogs[index];
                this.currentDialog = d; // FIX: Update state dialog aktif agar Gbr Rimba berubah
                // Panggil Engine untuk ketik teks
                this.dialogEngine.type(d.text);
            }
        },

        // ==========================================
        // 4. LOGIKA AVATAR
        // ==========================================
        setGender(g) { this.player.gender = g; this.updateAvatarId(); },
        setStage(s) { this.player.stage = s; this.updateAvatarId(); },

        changeStage(offset) {
            const currentIndex = this.options.stages.indexOf(this.player.stage);
            const nextIndex = (currentIndex + offset + this.options.stages.length) % this.options.stages.length;
            this.setStage(this.options.stages[nextIndex]);
        },

        getStageName() {
            const labels = { 'child': 'Bibit', 'adult': 'Tunas', 'elder': 'Pohon' };
            return labels[this.player.stage] || 'Unknown';
        },

        updateAvatarId() {
            this.player.avatar = `${this.player.stage}_${this.player.gender}`;
        },

        getAvatarImage() {
            return `assets/images/avatars/char_${this.player.stage}_${this.player.gender}.png`;
        },

        // ==========================================
        // 5. START GAME (Register)
        // ==========================================
        startGame() {
            // Gunakan Module Validasi
            const validation = this.playerAPI.validateName(this.player.name);

            if (!validation.valid) {
                // Ganti alert dengan System UI Toast
                if (window.Alpine && window.Alpine.store('systemUI')) {
                    window.Alpine.store('systemUI').showToast(validation.msg, 'error');
                }
                return;
            }

            // Simpan Data via Module
            this.player.saved = true;
            this.player.hook_seen = false; // Reset hook status for new player
            this.playerAPI.savePlayer(this.player);

            // Redirect ke Story Engine: Mission Brief
            console.log("✈️ Registration Complete. Going to Mission...");
            window.location.href = 'story.html?scene=mission';
        },

        // ==========================================
        // 6. ROUTING GAMEPLAY (JELAJAH)
        // ==========================================
        startJourney() {
            console.log("🏃 Tombol Jelajah Diklik!");

            if (this.player.hook_seen) {
                console.log("✅ Sudah nonton Hook -> Langsung Scan");
                window.location.href = 'scan.html';
            } else {
                console.log("🎬 Belum nonton Hook -> Ke Bioskop");
                window.location.href = 'story.html?scene=hook';
            }
        },

        // Legacy cleanup
        nextDialog() {
            // NOTE: Logic ini sudah pindah ke story-engine.js
            // Fungsi ini mungkin masih dipanggil oleh tombol di index.html jika ada sisa kode lama
            console.warn("⚠️ Deprecated nextDialog called.");
        },

        playSound(name) {
            const audio = this.sfx[name];
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => console.log("Audio blocked:", e));
            }
        }
    }));
});

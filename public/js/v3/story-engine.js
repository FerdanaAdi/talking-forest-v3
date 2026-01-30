/**
 * ============================================
 * 📄 FILE: public/js/v3/story-engine.js
 * 🎬 FUNGSI: "Proyektor Bioskop" - Menjalankan cerita
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur "film cerita" di story.html:
 * - Menampilkan dialog satu per satu
 * - Mengganti background
 * - Menampilkan ekspresi Rimba
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Baris dengan console.log (pesan debug)
 * ✅ Path gambar default jika ada
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Semua fungsi (init, loadDialogs, nextDialog, dll)
 * ✗ Logika routing (window.location.href)
 *
 * 💬 CATATAN:
 * Kalau mau ubah TEKS CERITA, edit di:
 * → public/assets/data/dialogs.json
 *
 * ============================================
 */

const storyEngine = () => ({
    // STATE
    isLoading: true,
    sceneId: null,      // ID Scene dari URL (intro, hook, reveal)
    dialogs: [],        // Array dialog yang sedang dimainkan
    currentIndex: -1,   // Posisi dialog sekarang

    // VISUAL STATE
    currentBg: '',
    currentChar: '',
    speakerName: '',
    isSpeaking: false,
    bgLoaded: false,

    // AUDIO STATE
    bgmInfo: null,

    // MODULES
    dialogEngine: null, // Instance dari DialogEngine

    // DATA ADDITIONAL
    speciesData: null,

    /**
     * @function init
     * @description Dijalankan saat halaman dibuka.
     */
    async init() {
        console.log("🎬 Story Engine: Start...");

        // 1. Setup Dialog Engine (Efek Ketik)
        this.dialogEngine = DialogEngine();

        // 2. Baca URL Param (?scene=... & ?code=...)
        const urlParams = new URLSearchParams(window.location.search);
        this.sceneId = urlParams.get('scene') || 'intro';
        const codeId = urlParams.get('code');

        // SPECIAL: Jika Scene Reveal, Load Data Spesies Dulu
        if (this.sceneId === 'reveal' && codeId) {
            await this.loadSpeciesData(codeId);
        }

        // 3. Load Data Dialog
        await this.loadStoryData();

        // 4. Mulai Cerita
        this.isLoading = false;
        this.nextDialog();
    },

    /**
     * @function loadSpeciesData
     * @description Ambil data pohon dari database untuk inject nama.
     */
    async loadSpeciesData(codeId) {
        try {
            const res = await fetch('assets/data/species.json');
            const all = await res.json();
            this.speciesData = all.find(s => s.id === codeId);
            if (this.speciesData) {
                console.log("🌳 Species Detected:", this.speciesData.name);
            }
        } catch (e) { console.error("Gagal load species", e); }
    },

    /**
     * @function loadStoryData
     * @description Fetch dialogs.json dan ambil array sesuai sceneId.
     */
    async loadStoryData() {
        try {
            const res = await fetch('assets/data/dialogs.json');
            const data = await res.json();

            // Mapping ID URL -> Key JSON
            const map = {
                'intro': 'scene_1_intro',
                'mission': 'scene_1_2_mission',
                'hook': 'scene_2_hook',
                'reveal': 'scene_2_discovery'
            };

            const key = map[this.sceneId];
            if (data[key]) {
                this.dialogs = data[key];
                console.log(`✅ Scene '${this.sceneId}' loaded.`);
            } else {
                this.dialogs = [{ text: "Error: Scene Script Missing.", mood: "sad" }];
            }

        } catch (e) {
            console.error("❌ Gagal load story:", e);
        }
    },

    /**
     * @function nextDialog
     * @description Maju ke slide/dialog berikutnya.
     */
    nextDialog() {
        if (this.dialogEngine && this.dialogEngine.isTyping) {
            this.dialogEngine.stop();
            return;
        }

        this.currentIndex++;

        if (this.currentIndex >= this.dialogs.length) {
            this.endScene();
            return;
        }

        const dialog = this.dialogs[this.currentIndex];

        // 1. Update Speaker
        this.speakerName = dialog.speaker || 'RIMBA';

        // 2. Update Visual
        this.updateVisuals(dialog);

        // 3. Play Audio
        this.updateAudio(dialog);

        // 4. Inject Variables & Type
        let text = dialog.text;
        const savedName = localStorage.getItem('tf_player_name') || 'Petualang';
        text = text.replace(/{player_name}/g, savedName);

        // Inject Species Name (Jika ada data)
        if (this.speciesData) {
            text = text.replace(/{species}/g, this.speciesData.name);
        } else {
            text = text.replace(/{species}/g, "Pohon Misterius"); // Fallback
        }

        this.dialogEngine.type(text);
        this.isSpeaking = true;
    },

    /**
     * @function updateVisuals
     * @description Mengganti background/karakter jika ada di data dialog.
     */
    updateVisuals(dialog) {
        // Background (Hanya ganti jika didefinisikan)
        // Format: 'bg_forest_intro' -> 'assets/images/bg/bg_forest_intro.jpg'
        if (dialog.bg) {
            this.currentBg = `assets/images/bg/${dialog.bg}.jpg`;
            this.bgLoaded = false; // Trigger fade
        } else if (!this.currentBg) {
            // Default BG jika belum ada
            this.currentBg = 'assets/images/bg/bg_forest_intro.jpg';
            this.bgLoaded = true;
        }

        // Mood Karakter (Rimba)
        if (dialog.mood) {
            this.currentChar = `assets/images/mascot/rimba_${dialog.mood}.png`;
        }
    },

    /**
     * @function updateAudio
     * @description Mengatur musik/sfx.
     */
    updateAudio(dialog) {
        // SFX Dialog (Pop)
        const pop = new Audio('assets/audio/sfx/pop.mp3');
        pop.volume = 0.5;
        pop.play().catch(e => { });

        // TODO: BGM Logic (Nanti fase polish)
    },

    /**
     * @function endScene
     * @description Logika saat scene selesai. Redirect kemana?
     */
    endScene() {
        console.log("🏁 Scene Finished!");

        // Routing Logic
        switch (this.sceneId) {
            case 'intro':
                // Setelah intro -> Masuk Dashboard (index.html) -> Trigger Register
                window.location.href = 'index.html?action=register';
                break;

            case 'mission':
                // Setelah mission brief -> Siap main
                window.location.href = 'index.html';
                break;

            case 'hook':
                // Setelah Hook Scene 2 -> Masuk Game (scan.html)
                this.markHookAsSeen();
                window.location.href = 'scan.html';
                break;

            case 'reveal':
                // Setelah Reveal -> Masuk ke Gameplay (Puzzle)
                if (this.speciesData) {
                    window.location.href = 'puzzle.html?code=' + this.speciesData.id;
                } else {
                    // Fallback jika data hilang
                    window.location.href = 'index.html';
                }
                break;

            default:
                window.location.href = 'index.html';
        }
    },

    /**
     * @function markHookAsSeen
     * @description Menandai bahwa player sudah menonton scene hook.
     */
    markHookAsSeen() {
        try {
            const savedData = localStorage.getItem('tf_player_v3');
            if (savedData) {
                const player = JSON.parse(savedData);
                player.hook_seen = true;
                localStorage.setItem('tf_player_v3', JSON.stringify(player));
                console.log("✅ Progress Saved: Hook Seen");
            }
        } catch (e) {
            console.error("❌ Gagal simpan progress", e);
        }
    }
});

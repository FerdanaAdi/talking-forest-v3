/**
 * ============================================
 * 📄 FILE: public/js/v3/scan-logic.js
 * 📹 FUNGSI: Otak Detektif - Membaca QR Code
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur scanner QR:
 * - Nyalakan kamera HP
 * - Baca kode QR
 * - Cari data pohon di database
 * - Redirect ke halaman puzzle/story
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Pesan error (cari teks dalam tanda "...")
 * ✅ Volume audio baris 67-70 (ganti angka 0.5)
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Logika kamera (navigator.mediaDevices)
 * ✗ Logika QR reader (Html5Qrcode)
 * ✗ Logika state (status: 0-5)
 *
 * 📖 STATUS CODES:
 * 0 = IDLE (Siap scan)
 * 1 = VALIDATING (Mengecek kode)
 * 2 = JOURNEY (Animasi perjalanan)
 * 3 = ARRIVAL (Sampai di lokasi)
 * 4 = REVEAL (Tampilkan info)
 * 5 = DIAGNOSIS (Selesai)
 *
 * ============================================
 */

document.addEventListener('alpine:init', () => {
    Alpine.data('scanLogic', () => ({
        // STATE: Data yang berubah-ubah (Numeric by Alur 4 Spec)
        // 0: IDLE, 1: VALIDATING, 2: JOURNEY, 3: ARRIVAL, 4: REVEAL, 5: DIAGNOSIS
        status: 0,
        speciesData: null,   // Data pohon yang ketemu
        errorMessage: '',    // Pesan kalau error
        manualCode: '',      // Input kode manual
        fogOpacity: 1.0,

        // PLAYER DATA (Untuk Header UI)
        player: {
            name: 'Petualang',
            level: 1,
            xp: 0,
            avatar: 'child_male',
            stage: 'child' // Bibit
        },

        // MODULE
        dialogEngine: DialogEngine(),

        // NARRATIVE STATE
        dialogs: [],
        currentDialogIndex: 0,
        currentMood: 'neutral',
        isLastDialog: false,
        showGlitch: false,

        // AUDIO CACHE
        sfx: {
            pop: new Audio('assets/audio/sfx/pop.mp3'),
            chime: new Audio('assets/audio/sfx/chime.mp3'),
            error: new Audio('assets/audio/sfx/error.mp3'),
            footsteps: new Audio('assets/audio/sfx/footsteps.mp3'),
            fog_clear: new Audio('assets/audio/sfx/fog_clear.mp3')
        },

        async init() {
            // LOAD PLAYER DATA
            const saved = localStorage.getItem('tf_player_v3');
            if (saved) {
                const p = JSON.parse(saved);
                this.player = {
                    name: p.name || 'Petualang',
                    level: p.level || 1,
                    xp: p.xp || 0,
                    avatar: p.avatar || 'child_male',
                    stage: p.stage || 'child'
                };
            }

            // Preload Audio
            Object.values(this.sfx).forEach(audio => {
                audio.volume = 0.5;
                audio.preload = 'auto';
            });
            this.sfx.footsteps.loop = true;

            // Load Dialogs for Scene 2
            try {
                const res = await fetch('assets/data/dialogs.json');
                const data = await res.json();
                this.dialogs = data.scene_2_diagnosis; // Updated Key
            } catch (e) { console.error("Gagal load dialogs", e); }

            // Check URL Parameter
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                this.manualCode = code;
                this.processCode(code);
            }
        },

        async processCode(codeId) {
            if (!codeId) return;
            this.status = 1; // VALIDATING
            this.errorMessage = '';

            try {
                // Simulate thinking
                await new Promise(r => setTimeout(r, 1000));

                const response = await fetch('assets/data/species.json');
                const allSpecies = await response.json();
                const found = allSpecies.find(s => s.id === codeId.trim().toLowerCase());

                if (found) {
                    // CEK LOGIKA: "Kalau udah pernah, jangan ada lagi"
                    const saved = localStorage.getItem('tf_player_v3');
                    if (saved) {
                        const p = JSON.parse(saved);
                        // Cek apakah ID sudah ada di inventory (array of strings)
                        // Robust check: Check exact ID or input code
                        if (p.inventory && (p.inventory.includes(found.id) || p.inventory.includes(codeId))) {
                            console.log("🚫 Pohon sudah dikoleksi:", found.name);
                            this.speciesData = found;
                            // RESET VISUAL: Pastikan full color, jangan grayscale
                            gsap.to("body", { filter: "grayscale(0%)", duration: 0.5 });
                            this.status = 6; // State 6: ALREADY FOUND
                            this.playSound('pop');
                            return;
                        }
                    }

                    this.speciesData = found;
                    this.startJourney();
                } else {
                    throw new Error("Pohon tidak dikenal di hutan ini.");
                }
            } catch (err) {
                this.status = 0; // Back to idle
                this.errorMessage = err.message;
                this.playSound('error');
            }
        },

        startJourney() {
            this.status = 2; // JOURNEY
            this.playSound('footsteps');

            // 1. VISUAL: The Graying World (Green -> Grayscale)
            gsap.to("body", { filter: "grayscale(100%)", duration: 3, ease: "power1.in" });
            gsap.to(".bg-parallax", { xPercent: -100, ease: "none", duration: 10, repeat: -1 });

            // 2. INTERACTION: Rimba's Observation (Random Chatter)
            const observations = [
                "Aduh, lihat bunga-bunga ini... layu karena lupa cara mekar.",
                "Sstt, dengar? Burung-burung di sini berhenti bernyanyi.",
                "Udaranya terasa berat... Kenangan disini pudar."
            ];
            const randomText = observations[Math.floor(Math.random() * observations.length)];

            // Show Chatter (Via DialogEngine or specific UI)
            // For now, we can use a temporary bubble override or just console log as the user UI handles dialogs in status 5
            console.log("Rimba says:", randomText);
            // In a full implementation, binding this to a 'chatter' variable in UI would be best.
            // For now, we focus on the Grayscale and Journey.

            // Journey duration (3s)
            setTimeout(() => {
                this.sfx.footsteps.pause();
                this.enterArrival();
            }, 3000);
        },

        enterArrival() {
            this.status = 3; // ARRIVAL
            this.fogOpacity = 1.0;
        },

        clearFog() {
            if (this.status !== 3) return;
            this.fogOpacity -= 0.35;
            this.playSound('fog_clear');

            if (this.fogOpacity <= 0) {
                this.enterReveal();
            }
        },

        enterReveal() {
            this.status = 4; // REVEAL
            this.showGlitch = true;
            this.playSound('chime');

            // 🎨 RESTORE COLOR (Hapus Efek Abu-abu setelah kabut hilang)
            gsap.to("body", { filter: "grayscale(0%)", duration: 1.5 });

            setTimeout(() => {
                this.enterDiagnosis();
            }, 1000);
        },

        enterDiagnosis() {
            this.status = 5; // DIAGNOSIS
            this.showGlitch = false;

            // AUTO-SAVE: Mark as collected immediately when diagnosis starts
            this.saveToInventory();

            // Reset Dialog & Narrate
            this.currentDialogIndex = -1;
            this.isLastDialog = false;
            this.currentMood = 'sad';
            this.nextDialog();
        },

        saveToInventory() {
            if (!this.speciesData) return;
            try {
                // Load existing data to init ProgressManager
                let playerData = JSON.parse(localStorage.getItem('tf_player_v3'));
                if (!playerData) {
                    playerData = { inventory: [], xp: 0, badges: [], level: 1 };
                }

                // Gunakan ProgressManager agar logic XP & Level jalan!
                // Kita buat instance sementara karena ProgressManager butuh struktur {player: ...}
                const mockState = { player: playerData };

                if (window.ProgressManager) {
                    const pm = new window.ProgressManager(mockState);
                    pm.saveProgress(this.speciesData.id, 50); // Scan Reward: +50 XP
                    console.log("💾 Saved via ProgressManager:", this.speciesData.id);
                } else {
                    // Fallback jika ProgressManager belum load
                    if (!playerData.inventory.includes(this.speciesData.id)) {
                        playerData.inventory.push(this.speciesData.id);
                        localStorage.setItem('tf_player_v3', JSON.stringify(playerData));
                    }
                }

            } catch (e) { console.error("Auto-save failed", e); }
        },

        nextDialog() {
            if (!this.dialogs || !this.dialogs.length) return;
            this.currentDialogIndex++;
            const dialog = this.dialogs[this.currentDialogIndex];

            if (dialog) {
                let text = dialog.text;
                if (this.speciesData) {
                    text = text.replace(/{species}/g, this.speciesData.name);

                    // Inject player name (fallback)
                    const pname = localStorage.getItem('tf_player_name') || 'Petualang';
                    text = text.replace(/{player_name}/g, pname);
                }
                this.dialogEngine.type(text);
                this.currentMood = dialog.mood;
                if (this.currentDialogIndex >= this.dialogs.length - 1) {
                    this.isLastDialog = true;
                }
            }
        },

        startRecovery() {
            this.showGlitch = true;
            this.playSound('pop');
            setTimeout(() => {
                window.location.href = 'story.html?scene=reveal&code=' + this.speciesData.id;
            }, 800);
        },

        playSound(name) {
            const audio = this.sfx[name];
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(e => { });
            }
        }
    }));
});

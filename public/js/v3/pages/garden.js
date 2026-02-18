
document.addEventListener('alpine:init', () => {
    Alpine.data('gardenPage', () => ({
        // Data
        allSpecies: [],
        inventory: [],
        activeFilter: 'all', // 'all' | 'pohon' | 'tanaman' | 'hewan'
        gardenHealth: 100,
        lastWatered: null,
        isLoading: true,

        async init() {
            // 1. Load species dari JSON
            try {
                // Sesuaikan path jika perlu
                const res = await fetch('../assets/data/species.json');
                this.allSpecies = await res.json();

                // Default filter ke 'pohon' karena biasanya itu yg pertama
                this.activeFilter = 'pohon';
            } catch (e) {
                console.error("Gagal load species.json", e);
                // Mock data kalau error/file belum ada
                this.allSpecies = [
                    { id: 'p1', name: 'Ulin', type: 'pohon', assets: { siluet: 'ulin.webp', full: 'ulin_full.webp' } },
                    { id: 'p2', name: 'Meranti', type: 'pohon', assets: { siluet: 'meranti.webp', full: 'meranti_full.webp' } },
                    { id: 'h1', name: 'Orang Utan', type: 'hewan', assets: { siluet: 'orangutan.webp', full: 'orangutan_full.webp' } }
                ];
            }

            // 2. Load player data dari localStorage
            const playerData = JSON.parse(localStorage.getItem('tf_player_v3')) || {};
            // Inventory simpan ID species
            this.inventory = playerData.inventory || [];
            // Debug: Unlock beberapa item buat testing display
            // this.inventory = ['p1', 'h1']; 

            this.lastWatered = playerData.lastWatered || null;

            // 3. Hitung Health
            this.calculateHealth();

            this.isLoading = false;
        },

        // Filter species berdasarkan tab aktif
        get filteredSpecies() {
            if (this.activeFilter === 'all') return this.allSpecies;
            return this.allSpecies.filter(s => s.type === this.activeFilter);
        },

        // Cek apakah species sudah unlock
        isUnlocked(speciesId) {
            return this.inventory.includes(speciesId);
        },

        // Hitung health berdasarkan waktu
        calculateHealth() {
            if (!this.lastWatered) {
                this.gardenHealth = 50; // Default kalau belum pernah siram
                return;
            }
            const daysPassed = Math.floor((Date.now() - this.lastWatered) / (1000 * 60 * 60 * 24));
            // Berkurang 10% per hari
            this.gardenHealth = Math.max(0, 100 - (daysPassed * 10));
        },

        // Aksi Siram Kebun
        waterGarden() {
            // Cek cooldown (1x per hari)
            const today = new Date().toDateString();
            const lastDay = this.lastWatered ? new Date(this.lastWatered).toDateString() : null;

            if (lastDay === today) {
                alert('🚿 Kamu sudah menyiram hari ini! Kembali besok ya.');
                return;
            }

            // Update health & XP
            this.gardenHealth = 100;
            this.lastWatered = Date.now();

            // Simpan ke localStorage
            let playerData = JSON.parse(localStorage.getItem('tf_player_v3')) || {};
            playerData.lastWatered = this.lastWatered;
            playerData.xp = (playerData.xp || 0) + 10;
            localStorage.setItem('tf_player_v3', JSON.stringify(playerData));

            // Notifikasi visual (bisa diganti Toast nanti)
            alert('💧 Segar! Kebun disiram. (+10 XP)');

            // Dispatch event biar UI lain update kalau perlu
            window.dispatchEvent(new CustomEvent('player-updated', { detail: playerData }));
        },

        // Klik species
        openDetail(species) {
            if (this.isUnlocked(species.id)) {
                // Redirect ke detail page
                window.location.href = `../detail.html?id=${species.id}`;
            } else {
                // Shake animation or sound?
                alert('🔒 Species ini belum terbuka. Scan QR di lokasi untuk membukanya!');
            }
        },

        // Set filter
        setFilter(type) {
            this.activeFilter = type;
            // Auto scroll to top of grid usually good, but grid is in separate scroll container
        }
    }));
});

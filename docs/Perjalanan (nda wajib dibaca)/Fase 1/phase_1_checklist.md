# 🚀 FASE 1: ONBOARDING & GAME LOGIC
> **Target:** Membuat halaman depan yang "hidup", di mana user bisa memilih avatar, mengisi nama, dan data mereka tersimpan.

## 📋 PREPARATION CHECKLIST
Status: **In Progress** (Found missing items from Plan)

### 🚨 MISSING ITEMS (From Implementation Plan BAB VI)
- [x] **Typewriter Effect**: Teks dialog muncul per huruf (Tahap 1.2).
- [x] **Firebase Auth**: Login Anonymously (Tahap 1.3).
- [x] **Firestore Sync**: Simpan data player ke Cloud (Tahap 1.3).
- [x] **Rimba Expression**: Animasi transisi ekspresi (Tahap 1.2).
- [x] **Validation Logic**: Check min 3 characters for nickname (Tahap 1.1).
- [x] **Architecture Refactor**: Split `game-state.js` into modular files (`player-api.js`, `dialog-engine.js`) as per plan.

### 1. 🧠 SETUP LOGIKA GAME (GAME STATE)
**Target:** Refactor & Split monolithic `game-state.js`

Silakan buat file baru dan ketik/copy kode di bawah ini. Saya sudah beri komentar penjelasan.

```javascript
// File: public/js/v3/game-state.js

/**
 * Otak dari Game Talking Forest V3
 * Menggunakan Alpine.js untuk state management (penyimpanan data sementara).
 */
document.addEventListener('alpine:init', () => {
    Alpine.data('gameLogic', () => ({
        // 1. DATA PEMAIN (State)
        player: {
            name: '',           
            gender: 'male',     // 'male' atau 'female'
            stage: 'child',     // 'child' (Bibit), 'adult' (Tunas), 'elder' (Pohon)
            avatar: 'child_male', 
            xp: 0,
            level: 1,
            saved: false
        },
        
        // State Alur: 0 = Intro Dialog, 1 = Form Register, 2 = Game/Dashboard
        gameState: 0, 

        // 1.5 DATA DIALOG
        dialogs: [],
        currentDialog: {},
        dialogIndex: 0,

        // Konfigurasi Avatar yang tersedia
        // Konfigurasi Avatar yang tersedia (3 Tahap Usia x 2 Gender)
        // Konfigurasi Avatar (Dihitung dinamis)
        options: {
            stages: ['child', 'adult', 'elder'],
            genders: ['male', 'female']
        },

        // 2. FUNGSI UNTUK MEMULAI (Init)
        init() {
            // Load Database Dialog
            fetch('assets/data/dialogs.json')
                .then(res => res.json())
                .then(data => {
                    this.dialogs = data.scene_1_intro;
                    this.currentDialog = this.dialogs[0];
                });

            // Cek Player - Jika sudah ada, langsung ke Game (State 2)
            const savedData = localStorage.getItem('tf_player_v3');
            if (savedData) {
                this.player = JSON.parse(savedData);
                this.player.saved = true;
                this.gameState = 2; // Langsung masuk game
            } else {
                this.gameState = 0; // Mulai dari intro dialog
            }
            
            this.updateAvatarId();
        },

        // 3. LOGIKA AVATAR (Gender & Stage)
        setGender(g) {
            this.player.gender = g;
            this.updateAvatarId();
        },
        
        setStage(s) {
            this.player.stage = s;
            this.updateAvatarId();
        },

        updateAvatarId() {
            this.player.avatar = `${this.player.stage}_${this.player.gender}`;
        },
        
        getAvatarImage() {
            // Format file: char_STAGE_GENDER.png
            // Contoh: char_child_male.png
            return `assets/images/avatars/char_${this.player.stage}_${this.player.gender}.png`;
        },

        // 4. FUNGSI START GAME
        startGame() {
            if (!this.player.name.trim()) {
                alert('Isi nama dulu dong, Petualang!');
                return;
            }
            
            this.player.saved = true; // Tandai valid agar tampilan berubah jadi Dashboard
            localStorage.setItem('tf_player_v3', JSON.stringify(this.player));
            // Data tersimpan, UI akan otomatis berubah reactive (diatur di HTML)
        },
        
        // Helper: Cek apakah avatar sedang dipilih (untuk border highlight)
        isSelected(id) {
            return this.player.avatar === id;
        }
    }));
});
```

---

### 2. 👋 UI HALAMAN DEPAN (INDEX.HTML)
**Target:** Edit `public/index.html`

Tambahkan script `game-state.js` dan struktur HTML Alpine.

**Langkah 1 & 2: Copy-Paste Kode Lengkap**
Ganti **SELURUH** isi file `public/index.html` dengan kode di bawah ini. Ini sudah mencakup library (Tailwind/Alpine) dan tampilan baru (Grid Avatar).

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Talking Forest - Mulai Petualangan</title>
    
    <!-- 1. LIBRARY (Internet Wajib Jalan) -->
    <!-- Tailwind CSS (Desain) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Alpine.js (Logika Interaktif) -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <!-- Google Fonts (Huruf Keren) -->
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Custom CSS -->
    <style>
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-nunito { font-family: 'Nunito', sans-serif; }
        .bg-parchment { background-color: #fdf6e3; }
        .text-forest { color: #2d6a4f; }
        .text-earth { color: #603813; }
        .border-gold { border-color: #ffd700; }
    </style>

    <!-- 2. GAME LOGIC -->
    <script src="js/v3/game-state.js"></script>
</head>

<!-- x-data: Deklarasi bahwa area ini dikendalikan oleh "gameLogic" yang kita buat tadi -->
<body x-data="gameLogic" x-init="init()" class="bg-parchment font-nunito h-screen flex flex-col items-center justify-center overflow-hidden">

    <!-- VIEW 1: INTRO DIALOG (Rimba: "Siapa disana?") -->
    <!-- Tampil saat gameState === 0 -->
    <template x-if="gameState === 0">
        <main class="w-full max-w-md h-full flex flex-col justify-end pb-10 px-6 animate-fade-in relative">
            <div class="absolute inset-0 z-0 bg-cover bg-center" style="background-image: url('assets/images/bg/bg_forest_intro.jpg');"></div>
            
            <!-- RIMBA Character -->
            <div class="relative z-10 mx-auto mb-[-20px] animate-bounce-slow">
               <img :src="'assets/images/mascot/rimba_' + (currentDialog.mood || 'neutral') + '.png'" 
                    class="w-48 h-48 object-contain drop-shadow-xl" alt="Rimba">
            </div>

            <!-- DIALOG BOX -->
            <div class="relative z-20 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-6 border-2 border-forest">
                <div class="absolute -top-4 left-4 bg-forest text-white px-4 py-1 rounded-full font-bold font-cinzel text-sm shadow-md">
                    RIMBA
                </div>
                <p class="text-earth font-nunito text-lg leading-relaxed mt-2" x-text="currentDialog.text"></p>
                <div class="flex justify-end mt-4">
                    <button @click="nextDialog()" class="bg-gold text-forest px-6 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform">
                        LANJUT ▶
                    </button>
                </div>
            </div>
        </main>
    </template>

    <!-- VIEW 2: REGISTRATION FORM -->
    <!-- Tampil saat gameState === 1 -->
    <template x-if="gameState === 1">
        <main class="w-full max-w-md p-6 flex flex-col gap-6 text-center h-full justify-center animate-fade-in">
            <!-- Header -->
            <div class="animate-bounce-slow">
                <h1 class="font-cinzel text-4xl text-forest font-bold mb-1 drop-shadow-sm">Talking Forest</h1>
                <p class="text-earth text-sm font-bold opacity-80">Petualangan Menjaga Hutan Borneo</p>
            </div>
            
            <!-- AREA PILIH AVATAR (Widget yang sudah dibuat) -->
             <div class="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border-4 border-forest/20 w-full max-w-sm mx-auto relative group-hover:scale-[1.01] transition-transform flex flex-col items-center gap-4">
                
                <!-- 1. CAROUSEL AREA (Image + Arrows) -->
                <div class="flex items-center justify-between w-full px-4">
                    <button @click="changeStage(-1)" class="text-forest hover:scale-125 transition-transform font-bold text-2xl p-2">◀</button>
                    <div class="w-32 h-32 relative flex items-center justify-center">
                        <div class="absolute inset-0 bg-yellow-100 rounded-full animate-pulse-slow opacity-50"></div>
                        <!-- Image Avatar Dinamis -->
                         <img :src="getAvatarImage()" class="w-28 h-28 object-contain drop-shadow-md z-10 transition-all duration-500">
                    </div>
                    <button @click="changeStage(1)" class="text-forest hover:scale-125 transition-transform font-bold text-2xl p-2">▶</button>
                </div>

                <!-- Stage Name Label -->
                <div class="text-center -mt-2">
                    <h3 class="font-cinzel font-bold text-forest text-lg tracking-widest uppercase" x-text="getStageName()"></h3>
                </div>

                <!-- 2. STAGE DOTS (Indicators) -->
                <div class="flex justify-center gap-3">
                    <template x-for="stage in options.stages">
                        <div class="w-3 h-3 rounded-full border-2 border-forest transition-colors duration-300"
                             :class="player.stage === stage ? 'bg-forest' : 'bg-transparent opacity-40'">
                        </div>
                    </template>
                </div>

                <!-- 3. GENDER TOGGLE -->
                <div class="flex gap-4 mt-2 bg-stone-100 p-1 rounded-full border border-stone-200">
                    <button @click="setGender('male')" 
                            class="px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
                            :class="player.gender === 'male' ? 'bg-blue-100 text-blue-700 shadow-sm font-bold border border-blue-200' : 'text-stone-400 hover:text-stone-600'">
                        <span>♂️</span><span class="text-xs">Putra</span>
                    </button>
                    <button @click="setGender('female')" 
                            class="px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
                            :class="player.gender === 'female' ? 'bg-pink-100 text-pink-700 shadow-sm font-bold border border-pink-200' : 'text-stone-400 hover:text-stone-600'">
                        <span>♀️</span><span class="text-xs">Putri</span>
                    </button>
                </div>
            </div>

            <!-- FORM INPUT -->
            <div class="space-y-4 mt-2">
                <div class="relative group">
                    <input type="text" x-model="player.name" placeholder="Siapa namamu?" 
                        class="w-full text-center text-lg p-4 rounded-2xl border-2 border-stone-300 focus:border-forest focus:ring-4 focus:ring-green-100 outline-none transition-all placeholder-stone-400 text-earth font-bold bg-white shadow-inner group-hover:border-stone-400">
                </div>
                <!-- Tombol Start -->
                <button @click="startGame()" :disabled="!player.name"
                        class="w-full bg-gradient-to-r from-forest to-emerald-600 text-white py-4 rounded-2xl font-cinzel font-bold text-xl shadow-lg shadow-green-900/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group">
                    <span>MULAI PETUALANGAN</span>
                    <span class="group-hover:translate-x-1 transition-transform">▶</span>
                </button>
            </div>
        </main>
    </template>

    <!-- VIEW 3: TUTORIAL / GAME (Sesuai Phase 1 Step 6) -->
    <!-- Tampil saat gameState === 2 (Sudah Login) -->
    <template x-if="gameState === 2">
        <main class="w-full max-w-md h-full flex flex-col justify-end pb-10 px-6 animate-fade-in relative">
            <div class="absolute inset-0 z-0 bg-cover bg-center opacity-30" style="background-image: url('assets/images/bg/bg_forest_intro.jpg');"></div>
             <!-- KARAKTER & DIALOG (Sama) -->
             <div class="relative z-10 mx-auto mb-[-20px] animate-bounce-slow">
               <img :src="'assets/images/mascot/rimba_' + (currentDialog.mood || 'neutral') + '.png'" 
                    class="w-48 h-48 object-contain drop-shadow-xl" alt="Rimba">
            </div>
            <div class="relative z-20 bg-white/95 backdrop-blur shadow-2xl rounded-2xl p-6 border-2 border-forest">
                <div class="absolute -top-4 left-4 bg-forest text-white px-4 py-1 rounded-full font-bold font-cinzel text-sm shadow-md">RIMBA</div>
                <p class="text-earth font-nunito text-lg leading-relaxed mt-2" x-text="currentDialog.text"></p>
                <div class="flex justify-end mt-4">
                    <button @click="nextDialog()" class="bg-gold text-forest px-6 py-2 rounded-xl font-bold hover:scale-105 active:scale-95 transition-transform">LANJUT ▶</button>
                </div>
            </div>
        </main>
    </template>

</body>
</html>
```

---

### 3. 📜 LOGIKA DIALOG (UPDATE GAME-STATE)
**Target:** Update `public/js/v3/game-state.js` agar bisa menampilkan cerita.

Kita perlu menambahkan logika untuk menampung data `dialogs.json` dan menjalankannya step-by-step.

**Tambahkan Kode Ini di dalam `Alpine.data`:**

```javascript
        // ... (data player dan options tetap sama) ...

        // 1.5 DATA DIALOG
        dialogs: [],      // Menampung semua daftar dialog dari JSON
        currentDialog: {}, // Dialog yang sedang tampil sekarang
        dialogIndex: 0,   // Urutan dialog ke berapa

        // ... (fungsi init sedikit berubah) ...
        init() {
            // Load Database Dialog dulu
            fetch('assets/data/dialogs.json')
                .then(res => res.json())
                .then(data => {
                    this.dialogs = data.scene_1_intro; // Ambil Scene 1
                    this.currentDialog = this.dialogs[0]; // Set dialog awal
                });

            // Cek Player
            const savedData = localStorage.getItem('tf_player_v3');
            if (savedData) {
                this.player = JSON.parse(savedData);
                this.player.saved = true;
                console.log('Player loaded:', this.player.name);
            }
        },

        // ... (setting avatar & start game tetap sama) ...

        // 5. NEXT DIALOG LOGIC
        nextDialog() {
            this.dialogIndex++;

            if (this.dialogIndex < this.dialogs.length) {
                this.currentDialog = this.dialogs[this.dialogIndex];
            } else {
                // Dialog Intro Selesai -> Masuk ke Form Register
                if (this.gameState === 0) {
                    console.log('Intro selesai, masuk ke Register...');
                    this.gameState = 1; // Pindah ke Form
                } 
                // Dialog Tutorial Selesai -> Masuk ke Scan
                else if (this.gameState === 2) {
                    window.location.href = 'scan.html';
                }
            }
        },
```
```

### 3. 🤔 TANYA JAWAB (TROUBLESHOOTING)

**Q: Apa itu `x-data`?**
A: Itu seperti menancapkan "kabel otak". Elemen HTML yang punya `x-data="gameLogic"` berarti bisa mengakses semua variable (name, avatar, level) yang ada di `game-state.js`.

**Q: Apa itu `x-model`?**
A: Itu seperti "Cermin Dua Arah".
- Kalau user ngetik di Input -> Variable `player.name` berubah.
- Kalau kita ubah Variable `player.name` di kodingan -> Teks di Input berubah.
Jadi selalu sinkron!

**Q: Apa itu `LocalStorage`?**
A: Itu seperti "Saku Celana" browser. Data yang disimpan di situ tidak akan hilang walaupun browser ditutup atau direfresh. Kita pakai ini agar user tidak perlu login ulang terus-menerus.

**Coba kamu Implementasikan sekarang!**
1. Buat file JS.
2. Edit file HTML.
3. Buka di browser, coba isi nama, pilih avatar, dan klik Start.
4. Kalau berhasil, harusnya pindah ke `home.html` (Dashboard).

---

### 3. 🏠 HOMEPAGE (DASHBOARD)
**Target:** Buat file `public/home.html`

Karena kita mengubah tujuan redirect ke `home.html`, kita perlu membuat halamannya. Copy kode ini ke file baru bernama `home.html` di folder `public`.

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Ranger - Talking Forest</title>
    
    <!-- Library Styles -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Nunito:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Game Logic -->
    <script src="js/v3/game-state.js"></script>

    <style>
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-nunito { font-family: 'Nunito', sans-serif; }
    </style>
</head>
<body x-data="gameLogic" x-init="init()" class="bg-[#fdf6e3] font-nunito h-screen flex flex-col items-center p-6">
    
    <!-- Greeting Header -->
    <header class="w-full max-w-md flex justify-between items-center mb-8 pt-4">
        <div>
            <p class="text-[#603813] text-sm font-bold opacity-70">Selamat Datang,</p>
            <h1 class="font-cinzel text-2xl text-[#2d6a4f] font-bold" x-text="player.name || 'Petualang'"></h1>
        </div>
        <!-- Avatar Mini (Pojok Kanan) -->
        <div class="w-14 h-14 rounded-full border-4 border-amber-400 bg-white overflow-hidden shadow-md flex items-center justify-center">
             <!-- Menampilkan emoji sesuai avatar yang dipilih -->
             <span class="text-2xl" x-show="player.avatar && player.avatar.includes('child_male')">👦</span>
             <span class="text-2xl" x-show="player.avatar && player.avatar.includes('child_female')">👧</span>
             <span class="text-2xl" x-show="player.avatar && player.avatar.includes('adult_male')">🧑</span>
             <span class="text-2xl" x-show="player.avatar && player.avatar.includes('adult_female')">👩</span>
             <span class="text-2xl" x-show="player.avatar && player.avatar.includes('elder_male')">👴</span>
             <span class="text-2xl" x-show="player.avatar && player.avatar.includes('elder_female')">👵</span>
             <span class="text-2xl" x-show="!player.avatar">👤</span>
        </div>
    </header>

    <!-- Menu Grid -->
    <main class="w-full max-w-md grid grid-cols-2 gap-4">
        
        <!-- SCAN QR (Tombol Utama) -->
        <a href="scan.html" class="col-span-2 bg-gradient-to-br from-[#2d6a4f] to-[#1b4332] text-white p-8 rounded-3xl shadow-xl shadow-green-900/20 flex flex-col items-center gap-3 hover:scale-[1.02] active:scale-95 transition-all group border-b-8 border-[#0f281e]">
            <span class="text-5xl group-hover:rotate-12 transition-transform drop-shadow-md">📷</span>
            <div class="text-center">
                <span class="font-cinzel font-bold text-2xl block">Scan Pohon</span>
                <span class="text-xs opacity-80 tracking-wide">Mulai Petualangan Barumu</span>
            </div>
        </a>

        <!-- KEBUN SAYA -->
        <a href="garden.html" class="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-stone-200 flex flex-col items-center gap-2 hover:-translate-y-1 active:translate-y-0 transition-transform">
            <span class="text-4xl filter drop-shadow-sm">🌿</span>
            <span class="font-bold text-[#603813]">Kebun Saya</span>
        </a>

        <!-- PROFIL -->
        <a href="profile.html" class="bg-white p-6 rounded-3xl shadow-lg border-b-4 border-stone-200 flex flex-col items-center gap-2 hover:-translate-y-1 active:translate-y-0 transition-transform">
            <span class="text-4xl filter drop-shadow-sm">📜</span>
            <span class="font-bold text-[#603813]">Profil</span>
        </a>

        <!-- Banner Info (Opsional) -->
        <div class="col-span-2 mt-4 bg-amber-100 p-4 rounded-xl text-amber-800 text-xs text-center border border-amber-200">
            <p>💡 Tip: Temukan kode QR di batang pohon untuk membuka rahasia hutan!</p>
        </div>

    </main>

</body>
</html>
```


---

### 4. 📂 INTEGRASI ASET (GAMBAR)
**Target:** Pastikan file gambar Anda tersimpan dengan nama yang BENAR agar otomatis muncul.

Silakan rename dan letakkan file gambar Anda di folder berikut:

**A. AVATAR (Folder: `public/assets/images/avatars/`)**
Format: `char_[stage]_[gender].png`
*   Bibit Laki-laki: `char_child_male.png`
*   Bibit Perempuan: `char_child_female.png`
*   *(Opsional Tunas/Pohon bisa pakai gambar yang sama dulu kalau belum ada)*

**B. STANDAR ASET (WAJIB)**
Agar tidak pecah di HP:
*   **Format:** PNG (Transparent) untuk Karakter, JPG untuk Background.
*   **Ukuran Maskot:** Minimal 512x512 px.
*   **Ukuran Avatar:** Minimal 512x512 px.
*   **Ukuran Background:** Minimal 1080x1920 px (Portrait Phone).
*   **Size File:** Usahakan di bawah 500KB agar loading cepat.

**C. MASKOT RIMBA (Folder: `public/assets/images/mascot/`)**
Nama file sesuai ekspresi:
1.  Senang: `rimba_happy.png`
2.  Biasa: `rimba_neutral.png`
3.  Kaget: `rimba_shock.png`
4.  Sedih/Bingung: `rimba_sad.png`

**C. BACKGROUND (Folder: `public/assets/images/bg/`)** *(Buat folder `bg` jika belum ada)*
1.  Hutan Intro: `bg_forest_intro.jpg`
2.  Hutan Pagi: `bg_forest_morning.jpg` (Opsional)
3.  Hutan Malam: `bg_forest_night.jpg` (Opsional)

---

### 5. 🛠️ UPDATE KODE UNTUK ASET
**Target:** Update `index.html` agar menampilkan gambar Maskot asli (bukan Emoji).

**Cari bagian:**
```html
<!-- KARAKTER RIMBA (Mascot) -->
<div class="w-40 h-40 bg-orange-400 ..."> 🐻 </div>
```

**Ganti dengan:**
```html
<!-- KARAKTER RIMBA (Mascot) -->
<div class="relative z-10 mx-auto mb-[-20px] animate-bounce-slow">
    <img :src="'assets/images/mascot/rimba_' + (currentDialog.mood || 'neutral') + '.png'" 
         class="w-48 h-48 object-contain drop-shadow-xl hover:scale-105 transition-transform"
         alt="Rimba">
</div>
```

**Pastikan Background juga update:**
Cari `style="background-image: url('assets/images/bg_forest_intro.jpg');"` di `index.html`. Pastikan path-nya sesuai dengan file yang Anda punya.


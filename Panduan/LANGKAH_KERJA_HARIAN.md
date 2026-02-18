# 📅 LANGKAH KERJA HARIAN
## Talking Forest V3 - Day by Day Plan
### 31 Januari - 14 Februari 2026

---

> [!IMPORTANT]
> Ini adalah jadwal kerja harian yang detail.
> Centang ✅ setiap task yang sudah selesai!
> (Print file ini atau edit langsung di sini)

---

# 📆 MINGGU 1: PROLOGUE PILOT (JALAN CERITA AWAL)

## 📌 HARI 1: PERSIAPAN ASET & MENTAL
### 👤 Ferdana (Manager)
- [ ] **FILE: Karakter Rimba** (Cari/Generate gambar .png transparan):
    > 📂 **SIMPAN DI:** `public/assets/images/characters/rimba/`
    > 📏 **SPEK GAMBAR WAJIB:**
    > - **Format:** `.png` (Background Transparan/Bolong).
    > - **Size:** Max 300KB - 500KB (Jangan > 1MB, nanti berat).
    > - **Dimensi:** Tinggi sekitar 1000px - 1200px (Half Body) **ATAU** 2000px (Full Body). Lebar menyesuaikan (Aspect Ratio).
    > - **Note:** Kalau Full Body, pastikan saat di-zoom ke wajah **TIDAK PECAH**. Kita butuh ekspresi wajahnya kelihatan jelas di HP.
    > - **Style:** Anime/Kartun 2D (Konsisten untuk semua ekspresi).
    
    1.  `rimba_confused.png` (Bingung)
    2.  `rimba_sad.png` (Sedih/Lesu - Opacity 70%)
    3.  `rimba_determined.png` (Yakin/Kepal Tangan)
    4.  `rimba_surprised.png` (Kaget Mata Melotot)
    5.  `rimba_thinking.png` (Pegang Dagu)
    6.  `rimba_hopeful.png` (Tangan Terbuka)

- [ ] **FILE: Background & UI** (Penting untuk nuansa):
    > 📂 **SIMPAN DI:** `public/assets/images/backgrounds/` & `public/assets/images/ui/`
    > 🖼️ **SPEK BACKGROUND & UI:**
    > - **Background:** Format `.jpg` (Wajib Landscape/Mendaftar). Resolusi min 1920x1080px.
    > 💡 **PROMPT AI (Midjourney/DALL-E) UNTUK ASET:**
    > - **Karakter:** `Anime style 2D character design, young male forest ranger, green and brown outdoor outfit, short messy hair, white background, [expression: confused/sad/determined], high quality vector --ar 2:3`
    > - **Background:** `Lush vibrant magical forest, sunlight beams, dense vegetation, Ghibli art style, highly detailed, colorful, 8k resolution --ar 16:9`
    > - **UI Icons:** `Flat vector game UI icon, [white hand pointer / scan button], minimalist design, white background, high contrast.`
    > - **UI Button (Scan):** Format `.png` Transparan. Lebar sekitar 300px - 500px.
    
    1.  `bg_forest_main.jpg` (Hutan Rimbun/Berwarna) -> **WAJIB BERWARNA!**
        > *Note: Jangan cari yang hitam putih. Nanti Naju (kode) yang bikin efek hitam-putihnya. Jadi pas "Sihir" aktif, warnanya bisa muncul perlahan.*
    2.  ~~`ui_hand_pointer.png` (Ikon Tangan Menunjuk)~~ -> **SKIP** (Gunakan CSS `cursor: pointer` atau animasi CSS).
    3.  `ui_scan_button.png` (Tombol Scan) -> **(OPSIONAL)**. Kalau gak ada, Naju akan buat pakai CSS (Kode).
- [ ] **FILE: Audio** (Cari di YouTube Library / Asset Store):
    > 📂 **SIMPAN DI:** `public/assets/audio/prologue/`
    > 🎵 **SPEK AUDIO WAJIB:**
    > - **Format:** `.mp3` (Paling aman untuk web).
    > - **Size:** BGM max 2MB, SFX max 500KB.
    > - **Durasi:** BGM (1-3 menit, *Loopable*), SFX (1-5 detik).
    > 🔗 **LINK CARI ASET:** [YouTube Audio Library](https://www.youtube.com/audiolibrary), [Pixabay Music](https://pixabay
    1.  `bgm_prologue.mp3` (Piano, suasana sedih)
    2.  `sfx_glitch.mp3` (Suara error digital)
    3.  ~~`sfx_shimmer.mp3`~~ -> **SKIP** (Opsional, gunakan transisi visual CSS `transition` untuk efek kemunculan warna).

### 👤 Naju (Developer)
- [ ] Setup `story.html` agar layar jadi Hitam Putih (`grayscale(100%)`).
- [ ] Siapkan folder `assets/images/characters/rimba/`.
- [ ] Siapkan folder `assets/audio/prologue/`.

### 🤖 Antigravity
- [ ] Coding logika "Nama Berkedip" (Glitch Effect).
- [ ] Coding transisi layar Hitam Putih -> Berwarna.

---

## 📌 HARI 2: MODUL 1 - PERJANJIAN RANGER
### 👤 Ferdana
- [ ] Review dialog Rimba. Apakah terlalu kaku?
- [ ] Tes efek suara. Apakah `sfx_glitch` bikin kaget?

### 👤 Naju
- [ ] Input dialog Scene 1-3 ke `script.js`.
- [ ] Test variabel `{player_name}`. Apakah nama user muncul?

---

## 📌 HARI 3: MODUL 2 - CAHAYA PENYELAMAT
### 👤 Ferdana
- [ ] Cek animasi Hand Icon (Panah). Apakah jelas menunjuk tombol scan?
- [ ] Cek tombol Scan. Apakah warnanya kontras?

### 👤 Naju
- [ ] Coding tombol Scan "muncul pelan-pelan".
- [ ] Implementasi `pointer-events: none` (User gabisa klik apapun selain tombol scan).

---

## 📌 HARI 4: EVALUASI & LANJUT KE ULIN
**JIKA PROLOG SUKSES (EMOSI DAPET, TUTORIAL PAHAM):**
Baru kita gas ke Pohon Ulin.

### 👤 Ferdana
- [ ] Approved: "Oke, Prolog Lulus!"

### 👤 Naju
- [ ] Merge code Prolog ke `main` branch.

---

# ✅ PROGRESS TRACKER

## Species Completion

| #    | Species | Dialog | Quiz | Folklore | Puzzle | Status |
| :--- | :------ | :----- | :--- | :------- | :----- | :----- |
| 1    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 2    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 3    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 4    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 5    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 6    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 7    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 8    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |
| 9    | _______ | [ ]    | [ ]  | [ ]      | [ ]    | 🔴      |

**Legend:** 🔴 Not Started | 🟡 In Progress | 🟢 Complete

---

# 📝 CATATAN HARIAN

## Hari 1 Notes:
```
Tanggal: ___________
Apa yang dikerjakan:
_____________________
_____________________

Masalah/blocker:
_____________________

Besok harus:
_____________________
```

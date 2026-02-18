# 🌲 PANDUAN LENGKAP TALKING FOREST V3
## Khusus untuk Ferdana & Naju (Tim Non-IT)
### Versi 1.0 - 31 Januari 2026

---

> [!IMPORTANT]
> 📚 **BACA INI DULU SEBELUM MULAI!**
>
> Dokumen ini dibuat khusus untuk kamu berdua yang **bukan anak IT**.
> Semua penjelasan dibuat **sangat detail** agar kalian bisa:
> 1. Memahami apa yang sedang dikerjakan
> 2. Tahu file mana yang boleh dan tidak boleh diedit
> 3. Melanjutkan project tanpa stuck
>
> 🔴 **ATURAN EMAS:** Jika ragu, **JANGAN EDIT!** Tanya dulu.

---

# 📋 DAFTAR ISI

| No   | Bagian                                                           | Isi                                | Halaman |
| :--- | :--------------------------------------------------------------- | :--------------------------------- | :------ |
| 1    | [PENGENALAN PROJECT](#-bagian-1-pengenalan-project)              | Apa itu Talking Forest V3?         | ⬇️       |
| 2    | [STRUKTUR FOLDER](#-bagian-2-struktur-folder-project)            | Penjelasan setiap folder dan file  | ⬇️       |
| 3    | [ALUR KERJA GAME](#-bagian-3-alur-kerja-game)                    | Bagaimana game ini bekerja         | ⬇️       |
| 4    | [PANDUAN EDIT FILE](#-bagian-4-panduan-edit-file-untuk-naju)     | Zona aman untuk Naju edit          | ⬇️       |
| 5    | [LANGKAH PENGERJAAN](#-bagian-5-langkah-pengerjaan-step-by-step) | Apa yang harus dikerjakan sekarang | ⬇️       |
| 6    | [DAFTAR FILE PENTING](#-bagian-6-daftar-file-penting)            | Semua file dan fungsinya           | ⬇️       |
| 7    | [FAQ & TROUBLESHOOTING](#-bagian-7-faq--troubleshooting)         | Solusi masalah umum                | ⬇️       |

---

# 🌟 BAGIAN 1: PENGENALAN PROJECT

## 1.1 Apa Itu Talking Forest V3?

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🌲 TALKING FOREST = Website Game Edukasi Hutan 🌲            │
│                                                                 │
│   Pengunjung datang ke hutan → Scan QR di pohon →              │
│   Main game → Dapat cerita folklore → Koleksi pohon virtual    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Penjelasan Sederhana:
Bayangkan seperti **Pokemon GO** tapi untuk **pohon di hutan**.

1. **Pengunjung** datang ke Hutan Kota Samarinda
2. **Scan QR Code** yang ditempel di pohon pakai HP
3. **Main mini-game** (puzzle, kuis, rhythm)
4. **Dapat reward** berupa cerita tentang pohon tersebut
5. **Kumpulkan** semua pohon di koleksi virtual

### Kenapa V3?
- **V1:** Website statis (cuma info biasa)
- **V2:** Ada admin panel, QR scanner
- **V3 (SEKARANG):** **Game edukasi lengkap** dengan karakter, cerita, animasi!

---

## 1.2 Siapa Yang Mengerjakan Apa?

```
┌─────────────────────────────────────────────────────────────────┐
│                      TIM TALKING FOREST V3                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  👤 FERDANA (Akuntansi)                                        │
│  ├── Koordinator project                                       │
│  ├── Edit konten cerita (dialog, folklore)                     │
│  ├── Testing & quality check                                   │
│  └── Komunikasi dengan dosen & mitra                           │
│                                                                 │
│  👤 NAJU (Pendidikan Bahasa Inggris)                           │
│  ├── Edit teks & dialog di file JSON                           │
│  ├── Terjemahan (jika ada versi English)                       │
│  ├── Bantu testing                                             │
│  └── Edit konten yang sudah ditandai ZONA AMAN                 │
│                                                                 │
│  🤖 ANTIGRAVITY AI                                              │
│  ├── Coding semua file JavaScript                              │
│  ├── Setup struktur project                                    │
│  ├── Debugging & fixing                                        │
│  └── Membuat dokumentasi teknis                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1.3 Status Project Saat Ini

### Progress Keseluruhan: **63%** ████████████░░░░░░░░

| Komponen        | Progress | Penjelasan          |
| :-------------- | :------- | :------------------ |
| 🏠 Halaman Utama | ✅ 100%   | Homepage sudah jadi |
| 📱 Scanner QR    | ✅ 100%   | Bisa scan QR code   |
| 🧩 Puzzle Game   | ✅ 90%    | Tinggal isi konten  |
| ❓ Quiz Game     | ✅ 90%    | Tinggal isi soal    |
| 🎵 Rhythm Game   | 🟡 70%    | Perlu audio         |
| 📖 Cerita (VN)   | 🔴 40%    | **PRIORITAS!**      |
| ✨ Time Spell    | 🔴 30%    | Animasi ending      |
| 🌸 Polish        | 🔴 0%     | Terakhir            |

---

# 📁 BAGIAN 2: STRUKTUR FOLDER PROJECT

## 2.1 Gambaran Besar

```
📂 talking-forest-v2 - Uji Coba/
│
├── 📂 public/                    ← 🔴 FOLDER UTAMA (semua file web di sini)
│   │
│   ├── 📄 index.html             ← Halaman utama (lobby game)
│   ├── 📄 scan.html              ← Halaman scan QR
│   ├── 📄 story.html             ← Halaman cerita (visual novel)
│   ├── 📄 puzzle.html            ← Game puzzle
│   ├── 📄 quiz.html              ← Game kuis
│   ├── 📄 rhythm.html            ← Game rhythm
│   ├── 📄 summon.html            ← Game summon hewan
│   ├── 📄 cutscene.html          ← Animasi cutscene
│   ├── 📄 detail.html            ← Detail species
│   ├── 📄 register.html          ← Registrasi user
│   │
│   ├── 📂 v3/                    ← Halaman tambahan V3
│   │   ├── 📄 garden.html        ← Koleksi user
│   │   └── 📄 profile.html       ← Profil user
│   │
│   ├── 📂 assets/                ← 🟢 FOLDER ASET (gambar, audio, data)
│   │   ├── 📂 data/              ← ⭐ FILE JSON (Naju edit di sini!)
│   │   ├── 📂 images/            ← Semua gambar
│   │   ├── 📂 audio/             ← Semua audio/musik
│   │   └── 📂 monogatari/        ← Aset visual novel
│   │
│   ├── 📂 js/                    ← 🔴 FOLDER KODE (JANGAN EDIT!)
│   │   └── 📂 v3/                ← Kode V3
│   │       ├── 📂 monogatari/    ← Sistem cerita
│   │       └── 📂 mechanics/     ← Kode game
│   │
│   └── 📂 css/                   ← 🟡 FOLDER STYLING
│       ├── 📄 style.css          ← Style umum
│       └── 📄 game.css           ← Style game
│
└── 📂 .gemini/                   ← Folder Antigravity (abaikan)
```

---

## 2.2 Penjelasan Detail Setiap Folder

### 📂 `public/` - Folder Utama
**Apa ini?** Semua file yang tampil di website ada di sini.
**Boleh edit?** Tergantung file-nya (lihat panduan di bawah).

### 📂 `public/assets/data/` - ⭐ ZONA AMAN NAJU
**Apa ini?** File-file JSON yang berisi konten game.
**Boleh edit?** ✅ YA! Ini zona utama untuk Naju.

```
📂 public/assets/data/
├── 📄 species.json       ← Daftar semua pohon/hewan
├── 📄 dialogs.json       ← Dialog karakter Rimba
├── 📄 quizzes.json       ← Soal-soal kuis
├── 📄 folklore.json      ← Cerita rakyat
└── 📄 config.json        ← Pengaturan game
```

### 📂 `public/js/v3/` - 🔴 ZONA TERLARANG
**Apa ini?** Kode JavaScript yang menjalankan game.
**Boleh edit?** ❌ TIDAK! Bisa merusak game.

### 📂 `public/assets/images/` - Gambar
**Apa ini?** Semua gambar yang dipakai game.
**Boleh edit?** 🟡 Boleh TAMBAH gambar baru, jangan hapus/rename.

---

# 🎮 BAGIAN 3: ALUR KERJA GAME

## 3.1 Flowchart Utama (Cara Game Bekerja)

```
                          ┌─────────────────┐
                          │  USER BUKA WEB  │
                          │   index.html    │
                          └────────┬────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │   SUDAH PERNAH DAFTAR?       │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┴────────────────────┐
              │                                         │
              ▼                                         ▼
    ┌─────────────────┐                      ┌─────────────────┐
    │  BELUM DAFTAR   │                      │  SUDAH DAFTAR   │
    │ → register.html │                      │ → Langsung Main │
    └────────┬────────┘                      └────────┬────────┘
             │                                        │
             ▼                                        │
    ┌─────────────────┐                               │
    │ 1. Pilih Avatar │                               │
    │ 2. Isi Nama     │                               │
    │ 3. Simpan       │                               │
    └────────┬────────┘                               │
             │                                        │
             └────────────────┬───────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   SCAN QR CODE  │
                    │    scan.html    │
                    └────────┬────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ QR TERDETEKSI!  │
                    │ Species: Ulin   │
                    └────────┬────────┘
                              │
                              ▼
              ┌───────────────────────────────┐
              │     JENIS SPECIES APA?        │
              └───────────────────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   POHON     │      │  TANAMAN    │      │   HEWAN     │
│ puzzle.html │      │ rhythm.html │      │ summon.html │
│ Drag & Drop │      │ Tap Rhythm  │      │ Sound Match │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                    │
       └──────────────────┬─┴────────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │   MAIN QUIZ     │
                │    quiz.html    │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  CERITA MUNCUL  │
                │   story.html    │
                │ (Folklore,dll)  │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ KOLEKSI UPDATE  │
                │  +1 Species     │
                │  +50 XP         │
                └────────┬────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ SUDAH KUMPUL SEMUA? │
              └─────────┬───────────┘
                        │
           ┌────────────┴────────────┐
           │                         │
           ▼                         ▼
    ┌─────────────┐          ┌─────────────┐
    │   BELUM     │          │   SUDAH!    │
    │ Scan lagi.. │          │ TIME SPELL  │
    └─────────────┘          │ cutscene    │
                             └──────┬──────┘
                                    │
                                    ▼
                             ┌─────────────┐
                             │   ENDING    │
                             │ Sertifikat  │
                             │ Share Card  │
                             └─────────────┘
```

---

## 3.2 Penjelasan Setiap Tahap

### TAHAP 1: Registrasi (`register.html`)
**Apa yang terjadi:**
- User baru pilih avatar (anak/dewasa/lansia × laki/perempuan)
- Isi nickname (nama panggilan)
- Data disimpan di HP user (localStorage)

**File terkait:**
- `register.html` - tampilan halaman
- `js/v3/game-state.js` - menyimpan data user

---

### TAHAP 2: Scan QR (`scan.html`)
**Apa yang terjadi:**
- User arahkan kamera ke QR code
- QR code terbaca → dapat ID species
- Redirect ke mini-game sesuai jenis species

**File terkait:**
- `scan.html` - tampilan scanner
- `js/v3/scan-logic.js` - logika scan

---

### TAHAP 3: Mini-Game

#### 3A. Puzzle (Untuk Pohon)
```
┌───────────────────────────────────────┐
│        PUZZLE DRAG & DROP             │
├───────────────────────────────────────┤
│                                       │
│  ┌─────┐     ┌─────────────────────┐  │
│  │DAUN │ →   │     ZONA DROP       │  │
│  └─────┘     │                     │  │
│  ┌─────┐     │   ┌───┐             │  │
│  │BATNG│ →   │   │ ? │ DAUN        │  │
│  └─────┘     │   ├───┤             │  │
│  ┌─────┐     │   │ ? │ BATANG      │  │
│  │AKAR │ →   │   ├───┤             │  │
│  └─────┘     │   │ ? │ AKAR        │  │
│              │   └───┘             │  │
│              └─────────────────────┘  │
│                                       │
│  Drag bagian pohon ke tempat benar!   │
└───────────────────────────────────────┘
```

#### 3B. Rhythm (Untuk Tanaman)
```
┌───────────────────────────────────────┐
│          RHYTHM TAP GAME              │
├───────────────────────────────────────┤
│                                       │
│     ♪    ♫    ♪    ♫    ♪            │
│     │    │    │    │    │            │
│     ▼    ▼    ▼    ▼    ▼            │
│  ───────────────────────────────      │
│           [ HIT ZONE ]                │
│  ───────────────────────────────      │
│                                       │
│  Tap saat note sampai di hit zone!    │
└───────────────────────────────────────┘
```

#### 3C. Summon (Untuk Hewan)
```
┌───────────────────────────────────────┐
│         SOUND & SHADOW MATCH          │
├───────────────────────────────────────┤
│                                       │
│        ┌─────────────────┐            │
│        │   ░░░░░░░░░░░   │            │
│        │   ░ SILUET  ░   │            │
│        │   ░ HEWAN?  ░   │            │
│        │   ░░░░░░░░░░░   │            │
│        └─────────────────┘            │
│                                       │
│  🔊 [Putar Suara]                     │
│                                       │
│  Dengarkan suara, tebak hewannya!     │
└───────────────────────────────────────┘
```

---

### TAHAP 4: Quiz (`quiz.html`)
**Apa yang terjadi:**
- Muncul 3-5 soal tentang species yang baru di-scan
- Jawab benar = bonus XP
- Jawab salah = dapat hint, boleh coba lagi

**Contoh Soal:**
```
┌───────────────────────────────────────┐
│  SOAL 1/5                             │
├───────────────────────────────────────┤
│                                       │
│  Pohon Ulin disebut "Besi Borneo"     │
│  karena...                            │
│                                       │
│  [ A ] Warnanya seperti besi          │
│  [ B ] Kayunya sangat keras           │  ← Jawaban benar
│  [ C ] Bisa dibuat besi               │
│  [ D ] Ditemukan di tambang besi      │
│                                       │
└───────────────────────────────────────┘
```

---

### TAHAP 5: Story Reveal (`story.html`)
**Apa yang terjadi:**
- Karakter Rimba (maskot) muncul
- Menceritakan folklore/cerita rakyat
- Animasi visual novel style

```
┌───────────────────────────────────────┐
│                                       │
│        ╔═══════════════════╗          │
│        ║                   ║          │
│        ║     [RIMBA]       ║          │
│        ║    (´・ω・`)      ║          │
│        ║                   ║          │
│        ╚═══════════════════╝          │
│                                       │
│  ┌────────────────────────────────┐   │
│  │ Rimba:                         │   │
│  │ "Wah, kamu hebat! Sekarang     │   │
│  │  aku akan ceritakan kisah      │   │
│  │  Pohon Ulin yang legendaris!"  │   │
│  └────────────────────────────────┘   │
│                                       │
│              [Lanjut ▶]               │
└───────────────────────────────────────┘
```

---

### TAHAP 6: Time Spell (Ending)
**Apa yang terjadi:**
- Jika sudah kumpulkan cukup species
- Animasi "Time Spell" - pohon tumbuh besar
- Unlock ending dan sertifikat

---

# ✏️ BAGIAN 4: PANDUAN EDIT FILE UNTUK NAJU

## 4.1 ATURAN WAJIB

```
╔═══════════════════════════════════════════════════════════════╗
║                    🔴 ATURAN EMAS NAJU 🔴                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  1. HANYA edit file yang ada tanda ⭐ ZONA AMAN               ║
║                                                               ║
║  2. JANGAN edit file .js (JavaScript) = RUSAK!                ║
║                                                               ║
║  3. JANGAN hapus atau rename file apapun                      ║
║                                                               ║
║  4. SELALU backup sebelum edit (copy paste dulu)              ║
║                                                               ║
║  5. Jika error setelah edit = UNDO/kembalikan backup          ║
║                                                               ║
║  6. Ragu? TANYA Ferdana atau Antigravity dulu!                ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 4.2 Daftar File Yang BOLEH Naju Edit

### ⭐ FILE 1: `species.json`
**Lokasi:** `public/assets/data/species.json`
**Fungsi:** Daftar semua pohon, tanaman, hewan di game

**Contoh Isi:**
```json
{
  "species": [
    {
      "id": "ulin_01",
      "name": "Pohon Ulin",
      "type": "pohon",
      "description": "Pohon keras yang dijuluki Besi Borneo"
    }
  ]
}
```

**Yang BOLEH diedit Naju:**
| Field         | Boleh Edit? | Contoh                              |
| :------------ | :---------- | :---------------------------------- |
| `name`        | ✅ YA        | Ganti "Pohon Ulin" → "Ulin Raksasa" |
| `description` | ✅ YA        | Ganti deskripsi bebas               |
| `id`          | ❌ TIDAK     | Jangan ganti!                       |
| `type`        | ❌ TIDAK     | Jangan ganti!                       |

---

### ⭐ FILE 2: `dialogs.json`
**Lokasi:** `public/assets/data/dialogs.json`
**Fungsi:** Semua dialog karakter Rimba

**Contoh Isi:**
```json
{
  "onboarding": {
    "welcome": {
      "character": "rimba",
      "text": "Halo! Aku Rimba, penjaga hutan ini.",
      "expression": "happy"
    }
  }
}
```

**Yang BOLEH diedit Naju:**
| Field        | Boleh Edit? | Contoh                           |
| :----------- | :---------- | :------------------------------- |
| `text`       | ✅ YA        | Ganti dialog bebas               |
| `character`  | ❌ TIDAK     | Tetap "rimba"                    |
| `expression` | 🟡 HATI-HATI | Pilih: happy, sad, normal, shock |

---

### ⭐ FILE 3: `quizzes.json`
**Lokasi:** `public/assets/data/quizzes.json`
**Fungsi:** Semua soal kuis

**Contoh Isi:**
```json
{
  "ulin_01": {
    "questions": [
      {
        "question": "Pohon Ulin dijuluki apa?",
        "options": [
          "Besi Borneo",
          "Raja Hutan",
          "Pohon Emas",
          "Si Keras"
        ],
        "correct": 0,
        "hint": "Kayunya sangat keras seperti besi"
      }
    ]
  }
}
```

**Yang BOLEH diedit Naju:**
| Field      | Boleh Edit? | Contoh                           |
| :--------- | :---------- | :------------------------------- |
| `question` | ✅ YA        | Ganti pertanyaan bebas           |
| `options`  | ✅ YA        | Ganti pilihan jawaban            |
| `hint`     | ✅ YA        | Ganti petunjuk                   |
| `correct`  | 🟡 HATI-HATI | Angka 0-3 (urutan jawaban benar) |

**Penjelasan `correct`:**
- `correct: 0` = Jawaban pertama yang benar (A)
- `correct: 1` = Jawaban kedua yang benar (B)
- `correct: 2` = Jawaban ketiga yang benar (C)
- `correct: 3` = Jawaban keempat yang benar (D)

---

### ⭐ FILE 4: `folklore.json`
**Lokasi:** `public/assets/data/folklore.json`
**Fungsi:** Cerita rakyat setiap species

**Contoh Isi:**
```json
{
  "ulin_01": {
    "title": "Legenda Pohon Besi",
    "story": "Konon, di zaman dahulu kala...",
    "moral": "Kesabaran menghasilkan kekuatan"
  }
}
```

**Yang BOLEH diedit Naju:**
| Field   | Boleh Edit? | Contoh                          |
| :------ | :---------- | :------------------------------ |
| `title` | ✅ YA        | Ganti judul cerita              |
| `story` | ✅ YA        | Ganti isi cerita (bisa panjang) |
| `moral` | ✅ YA        | Ganti pesan moral               |

---

## 4.3 Cara Edit File JSON (Tutorial Naju)

### LANGKAH 1: Buka File
1. Buka VS Code
2. Klik File → Open Folder
3. Pilih folder `talking-forest-v2 - Uji Coba`
4. Di sidebar kiri, cari: `public/assets/data/`
5. Klik file yang mau diedit (misal `dialogs.json`)

### LANGKAH 2: Backup Dulu!
1. Tekan Ctrl + A (select all)
2. Tekan Ctrl + C (copy)
3. Buka Notepad
4. Tekan Ctrl + V (paste)
5. Save sebagai `dialogs_backup.txt`

### LANGKAH 3: Edit Konten
1. Cari teks yang mau diganti
2. Tekan Ctrl + H (Find & Replace)
3. Ketik teks lama di kotak atas
4. Ketik teks baru di kotak bawah
5. Klik Replace

### LANGKAH 4: Simpan
1. Tekan Ctrl + S
2. Selesai!

### LANGKAH 5: Test
1. Refresh browser (F5)
2. Cek apakah perubahan muncul
3. Jika error → kembalikan dari backup

---

## 4.4 Contoh Edit yang BENAR

### ✅ Contoh BAIK:
```json
// SEBELUM:
"text": "Halo! Aku Rimba."

// SESUDAH:
"text": "Hai! Namaku Rimba, senang bertemu!"
```

### ❌ Contoh SALAH:
```json
// JANGAN BEGINI! (Hapus tanda kutip)
"text": Halo! Aku Rimba.

// JANGAN BEGINI! (Ganti nama field)
"dialog": "Halo! Aku Rimba."

// JANGAN BEGINI! (Hapus koma)
"text": "Halo! Aku Rimba."
"next": "scene2"  // ← Kurang koma!
```

---

# 🚀 BAGIAN 5: LANGKAH PENGERJAAN (STEP BY STEP)

## 5.1 APA YANG HARUS DIKERJAKAN SEKARANG?

```
╔═══════════════════════════════════════════════════════════════╗
║                   📋 PRIORITAS MINGGU INI                     ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  🔴 URGENT (Harus selesai!)                                   ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 1. Setup gambar karakter Rimba (6 ekspresi)             │  ║
║  │ 2. Lengkapi dialog onboarding di dialogs.json           │  ║
║  │ 3. Test flow: index → register → scan → puzzle          │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                               ║
║  🟡 PENTING (Minggu depan)                                    ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 4. Isi soal kuis 3 species pertama (27 soal)            │  ║
║  │ 5. Isi cerita folklore 3 species pertama                │  ║
║  │ 6. Tambah gambar puzzle 3 species                       │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                               ║
║  🟢 NANTI (2 minggu lagi)                                     ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │ 7. Lengkapi semua 25 species                            │  ║
║  │ 8. Polish animasi                                       │  ║
║  │ 9. Testing akhir                                        │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 5.2 Checklist Harian

### 📅 HARI INI (31 Januari 2026)

**Untuk Ferdana:**
- [ ] Review dokumen ini
- [ ] Tentukan 3 species pertama yang mau dikerjakan
- [ ] Siapkan referensi folklore dari internet/buku

**Untuk Naju:**
- [ ] Baca BAGIAN 4 (Panduan Edit) sampai paham
- [ ] Coba buka file `dialogs.json` di VS Code
- [ ] Practice: ganti 1 dialog, save, liat hasilnya

**Untuk Antigravity:**
- [ ] Generate gambar Rimba 6 ekspresi
- [ ] Setup folder assets/monogatari
- [ ] Test integrasi story.html

---

## 5.3 Week by Week Plan

### MINGGU 1 (31 Jan - 6 Feb)
```
┌─────────────────────────────────────────────────────────────────┐
│  MINGGU 1: STORY SYSTEM                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HARI 1-2: Karakter & Background                                │
│  ├── Generate Rimba sprite (6 ekspresi)                         │
│  ├── Generate Bunga sprite (3 ekspresi)                         │
│  └── Generate 5 background scene                                │
│                                                                 │
│  HARI 3-4: Dialog System                                        │
│  ├── Isi dialog onboarding (10 scene)                           │
│  ├── Isi dialog pre-game (per species)                          │
│  └── Test visual novel di story.html                            │
│                                                                 │
│  HARI 5-7: Polish & Testing                                     │
│  ├── Test flow lengkap                                          │
│  ├── Fix bugs                                                   │
│  └── Dokumentasi                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### MINGGU 2 (7-13 Feb)
```
┌─────────────────────────────────────────────────────────────────┐
│  MINGGU 2: KONTEN SPECIES                                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HARI 1-3: Content Creation                                     │
│  ├── Isi quizzes.json (5 species × 9 soal = 45 soal)            │
│  ├── Isi folklore.json (5 species)                              │
│  └── Review & edit teks                                         │
│                                                                 │
│  HARI 4-5: Puzzle Assets                                        │
│  ├── Generate gambar puzzle (5 species × 3 parts)               │
│  ├── Test drag & drop                                           │
│  └── Adjust posisi drop zone                                    │
│                                                                 │
│  HARI 6-7: Integration                                          │
│  ├── Connect semua halaman                                      │
│  ├── Test full flow                                             │
│  └── Bug fixing                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# 📄 BAGIAN 6: DAFTAR FILE PENTING

## 6.1 Semua File HTML (Halaman Web)

| File              | Fungsi                  | Status | Edit? |
| :---------------- | :---------------------- | :----- | :---- |
| `index.html`      | Halaman utama/lobby     | ✅ Jadi | 🟡     |
| `register.html`   | Registrasi user baru    | ✅ Jadi | 🟡     |
| `scan.html`       | Scanner QR code         | ✅ Jadi | ❌     |
| `story.html`      | Visual novel/cerita     | ✅ Jadi | ❌     |
| `puzzle.html`     | Game puzzle drag & drop | ✅ Jadi | ❌     |
| `quiz.html`       | Game kuis               | ✅ Jadi | ❌     |
| `rhythm.html`     | Game rhythm tap         | ✅ Jadi | ❌     |
| `summon.html`     | Game summon hewan       | ✅ Jadi | ❌     |
| `cutscene.html`   | Animasi cutscene        | ✅ Jadi | ❌     |
| `detail.html`     | Detail species          | ✅ Jadi | ❌     |
| `v3/garden.html`  | Koleksi user            | ✅ Jadi | ❌     |
| `v3/profile.html` | Profil user             | ✅ Jadi | ❌     |

---

## 6.2 Semua File JavaScript (Kode)

> [!CAUTION]
> 🔴 **NAJU: JANGAN SENTUH FILE-FILE INI!**
> Ini adalah kode program. Jika salah edit 1 karakter saja, game bisa rusak total!

| File               | Fungsi                | Lokasi              |
| :----------------- | :-------------------- | :------------------ |
| `game-state.js`    | Menyimpan data player | `js/v3/`            |
| `player-api.js`    | Koneksi ke database   | `js/v3/`            |
| `scan-logic.js`    | Logika scanner QR     | `js/v3/`            |
| `story-engine.js`  | Engine cerita (lama)  | `js/v3/`            |
| `dialog-engine.js` | Engine dialog (lama)  | `js/v3/`            |
| `puzzle.js`        | Logika game puzzle    | `js/v3/mechanics/`  |
| `quiz.js`          | Logika game kuis      | `js/v3/mechanics/`  |
| `rhythm.js`        | Logika game rhythm    | `js/v3/mechanics/`  |
| `summon.js`        | Logika game summon    | `js/v3/mechanics/`  |
| `main.js`          | Config Monogatari     | `js/v3/monogatari/` |
| `script.js`        | Isi cerita Monogatari | `js/v3/monogatari/` |
| `options.js`       | Setting Monogatari    | `js/v3/monogatari/` |

---

## 6.3 Semua File JSON (Data/Konten)

> [!TIP]
> ⭐ **ZONA AMAN:** Ini adalah tempat Naju bekerja.

| File            | Fungsi                   |
| :-------------- | :----------------------- |
| `species.json`  | Database pohon & hewan   |
| `dialogs.json`  | Skrip percakapan         |
| `quizzes.json`  | Bank soal kuis           |
| `folklore.json` | Cerita rakyat (panjang)  |
| `puzzles.json`  | Konfigurasi level puzzle |
| `config.json`   | Pengaturan umum (XP dll) |

---

# ❓ BAGIAN 7: FAQ & TROUBLESHOOTING

## Q: Gamenya error blank putih, harus apa?
**A:** Buka Console (Tekan F12), lihat tulisan merah. Screenshot dan kirim ke Antigravity/Ferdana.

## Q: Gambarnya tidak muncul?
**A:** Pastikan nama file gambar SAMA PERSIS (huruf besar/kecil berpengaruh). `Pohon.jpg` beda dengan `pohon.jpg`.

## Q: Saya salah edit dan lupa backup!
**A:** Coba tekan Ctrl+Z (Undo) di VS Code berkali-kali sampai balik ke kondisi awal.

## Q: Boleh tidak saya ubah isi species?
**A:** Boleh banget! Asal jangan ubah `id`-nya. Ganti nama, deskripsi, cerita silakan.

---

*Selamat bekerja Tim Talking Forest V3!* 🌱
*Jangan takut salah, kita belajar bareng.* 🚀

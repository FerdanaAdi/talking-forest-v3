# 📋 DOKUMENTASI PROJECT TALKING FOREST V3
## Ringkasan untuk Naju dan AI Assistant

---

## 👋 HAI NAJU!

Ini adalah folder dokumentasi lengkap tentang project Talking Forest.

File-file ini berguna untuk:
1. **Naju** - Memahami konsep dan desain project
2. **AI Assistant** - Sebagai referensi saat membantu edit

---

## 📂 ISI FOLDER DOCS

| File                   | Isi                        | Untuk Siapa |
| :--------------------- | :------------------------- | :---------- |
| `RINGKASAN_PROJECT.md` | Penjelasan singkat project | Naju        |
| `KONSEP_GAME.md`       | Konsep game dan alur user  | Naju + AI   |
| `STRUKTUR_KODE.md`     | Penjelasan file dan folder | AI          |
| `ATURAN_EDIT.md`       | Aturan untuk AI saat edit  | AI          |

---

## 🎮 TENTANG PROJECT INI

### Apa Itu Talking Forest?

**Talking Forest V3** adalah website game edukasi tentang hutan Kalimantan.

**Konsep:**
- Pengunjung = "Ranger" (Penjaga Hutan)
- Pohon = Roh yang tertidur
- Misi = Membangunkan roh pohon

### Alur Permainan

```
1. ONBOARDING (Buat Avatar)
   ↓
2. SCAN (Scan QR di Pohon)
   ↓
3. PUZZLE (Susun Bagian Pohon)
   ↓
4. KUIS (Jawab Pertanyaan)
   ↓
5. TIME SPELL (Animasi Pohon Tumbuh)
   ↓
6. REWARD (Dapat XP + Badge)
```

### Maskot

**RIMBA** - Orang utan virtual yang jadi pemandu pemain.

Ekspresi Rimba:
- `happy` - Senang 😊
- `sad` - Sedih 😢
- `shock` - Kaget 😲
- `neutral` - Biasa 😐

---

## 🗂️ STRUKTUR FILE PROJECT

```
📂 public/
│
├── 📄 index.html          ← Halaman utama (Markas)
├── 📄 scan.html           ← Halaman scan + puzzle
├── 📄 story.html          ← Halaman cerita/dialog
├── 📄 puzzle.html         ← Halaman puzzle
│
├── 📂 css/
│   └── 📄 game.css        ← Semua styling
│
├── 📂 js/v3/
│   ├── 📄 game-state.js   ← State machine
│   ├── 📄 player-api.js   ← Player data
│   ├── 📄 dialog-engine.js ← Typewriter effect
│   └── 📄 story-engine.js ← Story/dialog logic
│
└── 📂 assets/
    ├── 📂 images/         ← Gambar-gambar
    ├── 📂 audio/          ← Suara & musik
    └── 📂 data/
        ├── 📄 dialogs.json ← Teks dialog
        └── 📄 species.json ← Data spesies
```

---

## 🎨 DESAIN VISUAL

### Warna Utama

| Nama      | Kode      | Fungsi              |
| :-------- | :-------- | :------------------ |
| Forest    | `#2d6a4f` | Hijau hutan (utama) |
| Earth     | `#603813` | Coklat tanah (teks) |
| Gold      | `#ffd700` | Emas (aksen)        |
| Parchment | `#fdf6e3` | Krem (background)   |

### Font

| Font       | Fungsi        |
| :--------- | :------------ |
| Bakso Sapi | Judul, tombol |
| Nunito     | Teks biasa    |

---

## 🔧 TEKNOLOGI YANG DIPAKAI

| Teknologi        | Fungsi                       |
| :--------------- | :--------------------------- |
| **HTML/CSS/JS**  | Core website                 |
| **Tailwind CSS** | Styling (via CDN)            |
| **Alpine.js**    | Reaktivitas (x-data, @click) |
| **GSAP**         | Animasi smooth               |
| **Firebase**     | Hosting + database           |

---

## ⚠️ ATURAN EDITING (UNTUK AI)

### WAJIB DIIKUTI:

1. **JANGAN** hapus komentar `<!-- ✅ ZONA EDIT -->`
2. **JANGAN** hapus komentar `<!-- ❌ JANGAN -->`
3. **JANGAN** edit atribut Alpine.js (`x-data`, `x-if`, `@click`, `:src`)
4. **JANGAN** edit file di folder `js/v3/`

### SAAT MENAMBAH KODE BARU:

Tambahkan komentar dengan format:
```html
<!-- ================================================ -->
<!-- ✅ ZONA EDIT: [NAMA BAGIAN]                      -->
<!-- Boleh ganti: [APA YANG BOLEH DIEDIT]            -->
<!-- ================================================ -->
```

### SAAT ADA BAGIAN YANG TIDAK BOLEH DIEDIT:

Tambahkan:
```html
<!-- ❌ JANGAN edit bagian ini -->
```

---

## 📞 KONTAK DEVELOPER

Kalau ada pertanyaan atau butuh bantuan:
- Kirim screenshot + penjelasan ke Developer

---

*Dokumentasi untuk Naju dan AI*
*Dari Developer dengan ❤️*

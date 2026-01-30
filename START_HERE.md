# 🚀 HALO NAJU! MULAI DARI SINI!
## Panduan Khusus untuk Kamu yang Mau Bantu Edit Project Talking Forest

---

## 👋 SELAMAT DATANG!

**Hai Naju!** 

Terima kasih sudah mau bantu project Talking Forest! 🌲

Tenang aja, kamu **TIDAK PERLU BISA CODING** untuk membantu. 
Panduan ini dibuat khusus buat kamu yang belum pernah ngoding sama sekali.

Kalau ada yang bingung, langsung chat aku (developer) ya!

---

## 🤔 INI PROJECT APA SIH?

**Talking Forest** adalah website game edukasi tentang hutan Kalimantan.

Bayangkan seperti **buku cerita interaktif di HP**:
- Pengunjung datang ke hutan wisata
- Scan QR Code di pohon
- Main puzzle sederhana
- Baca cerita tentang pohon itu

**Tugasmu:** Bantu rapikan teks, warna, dan tampilan supaya lebih bagus!

---

## 📱 KAMU PAKAI APA?

Kamu akan edit pakai **Firebase Studio** (editor online).
Tidak perlu install apapun! Langsung buka di browser.

**Baca panduan ini dulu:** 
📄 `PANDUAN_FIREBASE_STUDIO.md`

---

## 🎯 APA YANG BISA NAJU BANTU?

| Mau Ngapain?             | Baca File Ini             | Susah Nggak?     |
| :----------------------- | :------------------------ | :--------------- |
| 📝 Ubah teks percakapan   | `PANDUAN_EDIT_DIALOG.md`  | ⭐ Gampang banget |
| 🎨 Ganti warna-warna      | `PALET_WARNA.md`          | ⭐ Gampang        |
| 🖼️ Ganti gambar           | `PANDUAN_GANTI_GAMBAR.md` | ⭐⭐ Lumayan       |
| 📐 Ubah posisi/ukuran     | `PANDUAN_UBAH_LAYOUT.md`  | ⭐⭐ Lumayan       |
| 🔍 Cari yang boleh diedit | `PETA_ZONA_EDIT.md`       | ⭐ Gampang        |

---

## 📚 DAFTAR SEMUA PANDUAN

### 1. Cara Pakai Firebase Studio
📄 **`PANDUAN_FIREBASE_STUDIO.md`** ← BACA PERTAMA!
- Cara buka project
- Cara edit file
- Cara lihat hasil
- Cara test di HP

### 🤖 Mau Pakai AI untuk Bantu Edit?
📄 **`PANDUAN_PAKAI_AI.md`** ← BACA KALAU MAU PAKAI AI!
- Template prompt yang aman
- Aturan supaya AI tidak rusak tutorial
- Contoh prompt benar dan salah

### 2. Edit Teks Percakapan
📄 **`PANDUAN_EDIT_DIALOG.md`**
- File mana yang diedit
- Aturan yang harus diikuti
- Contoh edit benar dan salah

### 3. Ganti Warna
📄 **`PALET_WARNA.md`**
- Daftar semua warna yang dipakai
- Kode warna (seperti #2d6a4f)
- Website untuk cari warna baru

### 4. Ubah Layout/Posisi
📄 **`PANDUAN_UBAH_LAYOUT.md`**
- Cara ubah ukuran
- Cara ubah jarak
- Penjelasan kode Tailwind

### 5. Ganti Gambar
📄 **`PANDUAN_GANTI_GAMBAR.md`**
- Ukuran gambar yang benar
- Format file (PNG/JPG)
- Cara upload gambar baru

### 6. Peta Zona Edit (PENTING!)
📄 **`PETA_ZONA_EDIT.md`**
- Semua yang BOLEH diedit
- Semua yang JANGAN diedit
- Per file, per bagian

---

## ⚡ MAU CEPAT? IKUTI INI!

### Kalau Naju mau ganti teks dialog:
1. Buka file `public/assets/data/dialogs.json`
2. Cari teks yang mau diganti (Ctrl+F)
3. Ganti teks di dalam tanda kutip `"..."`
4. Save (Ctrl+S)
5. Lihat preview

### Kalau Naju mau ganti warna:
1. Buka file `public/css/game.css`
2. Cari kode warna (contoh: `#2d6a4f`)
3. Ganti dengan kode warna baru
4. Save → Preview

### Kalau Naju mau ganti gambar:
1. Siapkan gambar baru
2. **Rename** gambar sesuai nama file lama
3. Upload ke folder `public/assets/images/`
4. Replace file lama

---

## 🗂️ PETA FOLDER

```
📂 talking-forest-v2/
│
├── 📄 START_HERE.md       ← KAMU DI SINI!
├── 📄 PANDUAN_*.md        ← Semua panduan
│
└── 📂 public/             ← ISI PROJECT
    ├── 📄 index.html      ← Halaman utama
    ├── 📄 scan.html       ← Halaman scan QR
    ├── 📄 story.html      ← Halaman cerita
    │
    ├── 📂 css/
    │   └── 📄 game.css    ← WARNA & FONT
    │
    └── 📂 assets/
        ├── 📂 images/     ← GAMBAR
        └── 📂 data/
            └── 📄 dialogs.json ← TEKS DIALOG
```

---

## ⚠️ ATURAN PENTING (WAJIB BACA!)

### ✅ BOLEH dilakukan:
- Edit teks yang ada di dalam tanda kutip `"..."`
- Ganti kode warna (format `#XXXXXX`)
- Ganti gambar (dengan nama file sama)
- Bertanya kalau bingung!

### ❌ JANGAN dilakukan:
- Hapus tanda kurung `{ } [ ]`
- Hapus tanda koma `,` dan titik dua `:`
- Edit bagian yang ada tulisan `x-data`, `@click`, `:src`
- Edit file di folder `js/` (itu kode program)

### 🔄 SELALU:
- **Backup dulu** sebelum edit (copy file ke tempat lain)
- **Edit satu hal** dulu, test, baru lanjut yang lain
- **Save sering** (Ctrl+S)

---

## 🆘 BUTUH BANTUAN?

**Kalau Naju bingung atau error:**

1. 📸 **Screenshot** layar yang bermasalah
2. 📱 **Kirim ke aku** (developer)
3. 💬 **Jelaskan** apa yang mau kamu lakukan

**Aku akan bantu!** Jangan takut salah, santai aja 😊

---

## 💪 SEMANGAT NAJU!

Ingat:
- Kamu nggak perlu jadi programmer
- Ikuti panduan step-by-step
- Kalau ragu, tanya dulu
- Pelan-pelan aja, nggak usah buru-buru

**Terima kasih sudah mau bantu! 🌲❤️**

---

*Panduan dibuat oleh Developer untuk Naju*
*Terakhir update: 28 Januari 2026*

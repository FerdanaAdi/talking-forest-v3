# 🖼️ PANDUAN GANTI GAMBAR
## Cara Mengganti Gambar di Project - Khusus untuk Naju

---

## 👋 HAI NAJU!

Di panduan ini, Naju akan belajar cara mengganti gambar-gambar di project.

**Ini lumayan gampang** asal ikuti aturannya ya! 😊

---

## 📍 DIMANA GAMBAR-GAMBAR DISIMPAN?

Semua gambar ada di folder ini:
```
📂 public/
└── 📂 assets/
    └── 📂 images/    ← SEMUA GAMBAR DI SINI!
```

---

## 📐 ATURAN UKURAN GAMBAR

Setiap jenis gambar punya ukuran idealnya:

| Jenis Gambar       | Ukuran (piksel) | Catatan                 |
| :----------------- | :-------------- | :---------------------- |
| **Background**     | 1080 × 1920     | Portrait (lebih tinggi) |
| **Karakter Rimba** | 512 × 512       | PNG dengan transparansi |
| **Avatar pemain**  | 128 × 128       | PNG dengan transparansi |
| **Ikon/badge**     | 64 × 64         | PNG dengan transparansi |

### Apa maksudnya "transparansi"?

Transparansi = background gambar tembus pandang (bukan putih).

Contoh:
- ✅ Gambar Rimba dengan background **transparan** (seperti stiker)
- ❌ Gambar Rimba dengan background **putih** (jelek kalau ditaruh di atas warna lain)

---

## 📁 FORMAT FILE YANG DITERIMA

| Format   | Ekstensi | Kapan Dipakai                               |
| :------- | :------- | :------------------------------------------ |
| **PNG**  | `.png`   | Gambar dengan transparansi (karakter, ikon) |
| **JPG**  | `.jpg`   | Background, foto (ukuran lebih kecil)       |
| **JPEG** | `.jpeg`  | Sama dengan JPG                             |

---

## 🔄 CARA GANTI GAMBAR (STEP BY STEP)

### Langkah 1: Siapkan Gambar Baru

1. Buat atau download gambar baru
2. Pastikan ukurannya sesuai tabel di atas
3. Pastikan formatnya benar (PNG/JPG)

### Langkah 2: PENTING - Rename File!

⚠️ **Nama file HARUS SAMA PERSIS dengan file lama!**

Contoh:
- Nama file lama: `rimba-happy.png`
- Nama file baru HARUS: `rimba-happy.png`

**Kalau namanya beda, gambar tidak akan muncul!**

### Langkah 3: Upload ke Firebase Studio

1. Di Explorer (sidebar kiri), buka folder `public/assets/images/`
2. Klik kanan folder yang sesuai
3. Pilih **"Upload"** atau **"Upload File"**
4. Pilih gambar dari komputer Naju
5. Kalau ada konfirmasi **"Replace?"**, klik **Yes**

### Langkah 4: Test

1. Lihat preview
2. Cek apakah gambar sudah berubah
3. Kalau belum, tekan **Ctrl+Shift+R** (hard refresh)

---

## 📂 DAFTAR GAMBAR PENTING

### Karakter RIMBA (Maskot)

| Nama File           | Kapan Muncul       |
| :------------------ | :----------------- |
| `rimba-happy.png`   | Saat Rimba senang  |
| `rimba-sad.png`     | Saat Rimba sedih   |
| `rimba-shock.png`   | Saat Rimba kaget   |
| `rimba-neutral.png` | Saat Rimba biasa   |
| `rimba_run.png`     | Animasi Rimba lari |

### Avatar Pemain

| Nama File                 | Tipe             |
| :------------------------ | :--------------- |
| `avatar-child-male.png`   | Anak laki-laki   |
| `avatar-child-female.png` | Anak perempuan   |
| `avatar-adult-male.png`   | Dewasa laki-laki |
| `avatar-adult-female.png` | Dewasa perempuan |

### Background

| Nama File             | Lokasi                   |
| :-------------------- | :----------------------- |
| `bg_forest_intro.jpg` | Background halaman intro |
| `forest_seamless.jpg` | Background animasi lari  |

---

## 🎨 TOOLS UNTUK BIKIN/EDIT GAMBAR

### Tools Gratis Online:

| Tool          | Link                                 | Kegunaan                         |
| :------------ | :----------------------------------- | :------------------------------- |
| **Canva**     | [canva.com](https://canva.com)       | Desain gambar gampang            |
| **Remove.bg** | [remove.bg](https://remove.bg)       | Hapus background jadi transparan |
| **TinyPNG**   | [tinypng.com](https://tinypng.com)   | Kompres ukuran file              |
| **Photopea**  | [photopea.com](https://photopea.com) | Photoshop online gratis          |

### Cara Pakai Remove.bg (Hapus Background):

1. Buka [remove.bg](https://remove.bg)
2. Upload gambar yang ada backgroundnya
3. Website otomatis hapus background
4. Download hasilnya (sudah transparan!)

### Cara Pakai TinyPNG (Kompres Gambar):

1. Buka [tinypng.com](https://tinypng.com)
2. Upload gambar (drag & drop)
3. Website otomatis kompres
4. Download gambar yang sudah dikecilkan

---

## ⚠️ TROUBLESHOOTING

### Gambar tidak muncul?
1. Cek nama file sudah **SAMA PERSIS** (termasuk huruf besar/kecil)
2. Cek sudah di folder yang benar
3. Cek format file (PNG/JPG)

### Gambar pecah/blur?
- Ukuran gambar terlalu kecil
- Buat ulang dengan resolusi lebih tinggi

### Gambar lama masih muncul?
- Hard refresh: **Ctrl+Shift+R**
- Buka di mode incognito

### Upload gagal?
- Cek koneksi internet
- Coba refresh Firebase Studio
- Coba upload ulang

---

## 📋 CHECKLIST SEBELUM UPLOAD

- [ ] Nama file sudah SAMA dengan file lama
- [ ] Ukuran sesuai spesifikasi
- [ ] Format benar (PNG/JPG)
- [ ] Sudah dikompres (kalau file besar)
- [ ] Backup file lama sudah ada

---

## 💡 TIPS DARI DEVELOPER

1. **Selalu backup** gambar lama sebelum replace
2. **Test satu-satu** - jangan ganti banyak sekaligus
3. **Kompres dulu** gambar besar supaya loading cepat
4. **Pakai PNG** untuk gambar yang butuh transparan
5. **Tanya aku** kalau ragu!

---

## 🆘 NAJU BINGUNG?

Screenshot masalahnya dan kirim ke aku (Developer)!

Aku bantu perbaiki 😊

---

*Panduan ganti gambar untuk Naju*
*Dari Developer dengan ❤️*

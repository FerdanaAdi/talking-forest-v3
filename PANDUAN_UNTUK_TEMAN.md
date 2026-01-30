# 📖 PANDUAN UMUM UNTUK NAJU
## Penjelasan Project Talking Forest - Versi Super Gampang

---

## 👋 HAI NAJU!

Ini panduan umum tentang project yang akan kamu bantu edit.
Baca pelan-pelan ya, santai aja! 😊

---

## 🌲 PROJECT INI TENTANG APA?

**Talking Forest** adalah **website game edukasi**.

Jadi ceritanya:
1. Orang datang ke **hutan wisata**
2. Di hutan ada **QR Code** di pohon-pohon
3. Pengunjung **scan QR Code** pakai HP
4. Muncul **game puzzle sederhana**
5. Setelah main, bisa **baca cerita** tentang pohon itu

**Intinya:** Website ini bikin jalan-jalan di hutan jadi lebih seru!

---

## 🗂️ STRUKTUR FOLDER (Peta Harta Karun!)

Bayangkan folder-folder ini seperti laci-laci yang berisi barang berbeda:

```
📂 talking-forest-v2/           ← INI FOLDER UTAMA
│
├── 📄 START_HERE.md           ← Panduan pertama
├── 📄 PANDUAN_*.md            ← Semua panduan lainnya
│
└── 📂 public/                 ← FOLDER ISI PROJECT
    │
    ├── 📄 index.html          ← Halaman pertama (Selamat Datang)
    ├── 📄 scan.html           ← Halaman scan QR Code
    ├── 📄 story.html          ← Halaman cerita
    ├── 📄 puzzle.html         ← Halaman puzzle
    │
    ├── 📂 css/                ← LACI WARNA & FONT
    │   └── 📄 game.css        ← File warna utama
    │
    └── 📂 assets/             ← LACI BARANG-BARANG
        ├── 📂 images/         ← Gambar-gambar
        ├── 📂 audio/          ← Suara & musik
        └── 📂 data/           ← Data teks
            └── 📄 dialogs.json ← Teks percakapan
```

---

## 📄 PENJELASAN TIAP FILE

### File HTML (Halaman Website)

| File          | Apa Isinya               | Kapan Muncul           |
| :------------ | :----------------------- | :--------------------- |
| `index.html`  | Form nama + pilih avatar | Pertama kali buka game |
| `scan.html`   | Tombol scan + input kode | Saat cari pohon        |
| `story.html`  | Dialog + gambar cerita   | Saat baca cerita pohon |
| `puzzle.html` | Game puzzle              | Saat main puzzle       |

### File CSS (Tampilan)

| File           | Apa Isinya                 |
| :------------- | :------------------------- |
| `css/game.css` | Semua warna, font, animasi |

### File JSON (Data)

| File           | Apa Isinya            |
| :------------- | :-------------------- |
| `dialogs.json` | Teks percakapan Rimba |

---

## ✅ APA YANG BOLEH NAJU EDIT?

### BOLEH DIEDIT:

| Apa             | Dimana         | Cara Edit                   |
| :-------------- | :------------- | :-------------------------- |
| **Teks dialog** | `dialogs.json` | Ganti teks di dalam `"..."` |
| **Warna**       | `game.css`     | Ganti kode `#XXXXXX`        |
| **Font**        | `game.css`     | Ganti nama font             |
| **Gambar**      | `images/`      | Replace dengan nama sama    |
| **Teks tombol** | file `.html`   | Cari komentar `✅ EDIT`      |

### JANGAN DIEDIT:

| Apa                     | Alasan                       |
| :---------------------- | :--------------------------- |
| File di folder `js/`    | Itu kode program, bisa rusak |
| Tanda kurung `{ } [ ]`  | Struktur data                |
| Kode `x-data`, `@click` | Itu perintah program         |
| Nama file               | Program cari berdasar nama   |

---

## 🎨 TENTANG WARNA

Project ini pakai warna tema **hutan**:

| Nama      | Warna          | Kode      | Dipakai Untuk    |
| :-------- | :------------- | :-------- | :--------------- |
| Forest    | 🟢 Hijau Hutan  | `#2d6a4f` | Tombol, header   |
| Earth     | 🟤 Coklat Tanah | `#603813` | Teks body        |
| Gold      | 🟡 Emas         | `#ffd700` | Aksen, highlight |
| Parchment | 🟨 Krem Kertas  | `#fdf6e3` | Background       |

**Mau ganti warna?** Baca `PALET_WARNA.md`

---

## 🔤 TENTANG FONT

Project ini pakai 2 font:

| Font           | Kegunaan      | Kesan        |
| :------------- | :------------ | :----------- |
| **Bakso Sapi** | Judul, tombol | Ceria, unik  |
| **Nunito**     | Teks biasa    | Ramah, bulat |

**Mau ganti font?** Baca `PANDUAN_UBAH_LAYOUT.md`

---

## 👀 CARA LIHAT HASIL EDIT

### Di Firebase Studio:
1. Klik tombol **Preview** di toolbar
2. Lihat panel preview di samping/bawah
3. Kalau tidak update, tekan **Ctrl+Shift+R**

### Test Fresh (Tanpa Cache):
1. Tekan **Ctrl+Shift+N** (buka incognito)
2. Copy URL preview ke tab incognito
3. Bisa lihat seperti pengunjung baru!

---

## 💾 CARA SAVE

- Tekan **Ctrl + S** setelah edit
- Lihat tanda **●** di tab hilang = sudah tersave
- Kalau lupa save, perubahan tidak tersimpan!

---

## 🔄 CARA BACKUP

Sebelum edit banyak, backup dulu:

1. Klik kanan file yang mau diedit
2. Pilih **Copy**
3. Buat folder baru namanya `backup`
4. Paste file ke folder itu

Jadi kalau rusak, tinggal copy balik dari backup!

---

## 🆘 KALAU ADA MASALAH

### Layar putih / error:
1. Cek apakah ada tanda kutip `"` yang hilang
2. Cek koma `,` sudah lengkap
3. Tekan **Ctrl+Z** untuk undo

### Warna tidak berubah:
1. Pastikan sudah save (Ctrl+S)
2. Hard refresh (Ctrl+Shift+R)

### Masih bingung:
1. Screenshot layar
2. Kirim ke Developer (aku)
3. Aku bantu!

---

## 📞 KONTAK DEVELOPER

Kalau Naju butuh bantuan, langsung chat aku ya!

Jangan takut tanya, aku senang bantu 😊

---

*Panduan dibuat khusus untuk Naju*
*Dari Developer dengan ❤️*

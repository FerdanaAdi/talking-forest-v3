# 🔥 PANDUAN FIREBASE STUDIO
## Cara Menggunakan Firebase Studio - Khusus untuk Naju

---

## 👋 HAI NAJU!

## 📍 APA ITU FIREBASE STUDIO?

Firebase Studio adalah **editor kode online** dari Google.
Seperti Microsoft Word, tapi untuk menulis kode website.

**Kelebihan:**
- ✅ Tidak perlu install software
- ✅ Langsung jalan di browser (Chrome/Edge)
- ✅ Ada preview langsung
- ✅ Bisa kolaborasi

---

## 🚀 LANGKAH 1: BUKA PROJECT

### Opsi A: Dari Link Shared
1. Klik link yang dikirim temanmu
2. Login dengan akun Google
3. Project langsung terbuka!

### Opsi B: Import Manual
1. Buka [idx.google.com](https://idx.google.com) atau Firebase Studio
2. Klik **"Import Project"** atau **"Open Folder"**
3. Pilih folder project yang di-share

---

## 🖥️ MENGENAL TAMPILAN

```
┌─────────────────────────────────────────────────────────┐
│  🔥 Firebase Studio                            [Preview]│
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  📁 EXPLORER │           📝 EDITOR                      │
│              │                                          │
│  📂 public   │   <!DOCTYPE html>                        │
│    📄 index  │   <html lang="id">                      │
│    📄 scan   │   <!-- ✅ ZONA EDIT -->                  │
│    📂 css    │   <h1>Talking Forest</h1>               │
│    📂 assets │                                          │
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│  📟 TERMINAL (Abaikan saja)                             │
└─────────────────────────────────────────────────────────┘
```

| Bagian                  | Fungsi                             |
| :---------------------- | :--------------------------------- |
| **Explorer (Kiri)**     | Daftar semua file, klik untuk buka |
| **Editor (Tengah)**     | Tempat edit kode                   |
| **Preview (Kanan/Tab)** | Lihat hasil website                |
| **Terminal (Bawah)**    | Abaikan, untuk programmer          |

---

## 📂 LANGKAH 2: NAVIGASI FILE

### Cara Membuka File

1. Lihat **sidebar kiri** (Explorer)
2. Klik tanda **▶** di folder untuk expand
3. **Klik nama file** untuk membuka

### File-File Penting

| Lokasi                            | Fungsi         |
| :-------------------------------- | :------------- |
| `public/index.html`               | Halaman utama  |
| `public/scan.html`                | Halaman scan   |
| `public/story.html`               | Halaman cerita |
| `public/css/game.css`             | Warna & font   |
| `public/assets/data/dialogs.json` | Teks dialog    |
| `public/assets/images/`           | Gambar-gambar  |

---

## ✏️ LANGKAH 3: EDIT FILE

### Cara Mencari Bagian yang Boleh Diedit

1. Tekan **Ctrl + F** (atau Cmd + F di Mac)
2. Ketik: `ZONA EDIT` atau `✅ EDIT`
3. Tekan **Enter** untuk lompat ke hasil
4. Edit teks yang ada di bawah komentar itu

### Contoh Edit

**SEBELUM:**
```html
<!-- ✅ EDIT: Ganti judul di bawah ini -->
<h1>Talking Forest</h1>
```

**SESUDAH:**
```html
<!-- ✅ EDIT: Ganti judul di bawah ini -->
<h1>Hutan Berbicara</h1>
```

### Cara Save

- Tekan **Ctrl + S** (atau Cmd + S di Mac)
- Atau klik **File → Save**
- Lihat tanda ● di tab hilang = sudah tersave

---

## 👁️ LANGKAH 4: PREVIEW (Lihat Hasil)

### Cara 1: Tombol Preview
1. Lihat toolbar atas
2. Klik tombol **"Preview"** atau **"Run"**
3. Panel preview muncul di samping/bawah

### Cara 2: Open in New Tab
1. Klik kanan file `index.html`
2. Pilih **"Open with Live Server"** atau **"Preview"**
3. Buka di tab baru

### Kalau Preview Tidak Update
- Tekan **Ctrl + Shift + R** di preview
- Atau klik tombol **Refresh** 🔄

---

## 🖼️ LANGKAH 5: UPLOAD GAMBAR

### Cara Upload Gambar Baru

1. Siapkan gambar di komputer
2. Di Explorer, buka folder `public/assets/images/`
3. **Klik kanan** folder → **"Upload"**
4. Pilih gambar dari komputer
5. Kalau ada konfirmasi replace, klik **Yes**

### Rename Gambar

⚠️ **PENTING:** Nama file harus SAMA dengan yang lama!

1. Klik kanan file gambar
2. Pilih **"Rename"**
3. Ketik nama yang sama dengan file lama

---

## 🎨 LANGKAH 6: GANTI WARNA

### Lokasi File Warna
```
public/css/game.css
```

### Cara Ganti

1. Buka `game.css`
2. Tekan **Ctrl + F**
3. Cari kode warna (contoh: `#2d6a4f`)
4. Ganti dengan kode warna baru
5. Save (**Ctrl + S**)

### Cari Warna Baru

1. Buka tab baru
2. Pergi ke [htmlcolorcodes.com](https://htmlcolorcodes.com)
3. Pilih warna
4. Copy kode hex (contoh: `#FF5733`)

---

## 💬 LANGKAH 7: EDIT DIALOG

### Lokasi File Dialog
```
public/assets/data/dialogs.json
```

### Cara Edit

1. Buka file `dialogs.json`
2. Cari teks yang mau diubah
3. Edit teks di dalam tanda kutip `"..."`
4. JANGAN hapus tanda kutip atau koma!
5. Save

### Contoh

**SEBELUM:**
```json
"text": "Halo, selamat datang!"
```

**SESUDAH:**
```json
"text": "Hai, apa kabar hari ini?"
```

---

## 🆘 TROUBLESHOOTING

### ❌ Preview Tidak Muncul
1. Cek apakah sudah save (Ctrl+S)
2. Klik refresh di preview
3. Tutup preview, buka lagi

### ❌ Warna Tidak Berubah
1. Pastikan sudah save
2. Hard refresh: **Ctrl + Shift + R**
3. Cek typo di kode warna

### ❌ Dialog Tidak Muncul / Error
1. Cek tanda kutip `"` sudah lengkap
2. Cek koma `,` antar item
3. Buka [jsonlint.com](https://jsonlint.com), paste isi file, cek error

### ❌ Gambar Tidak Muncul
1. Cek nama file sudah persis sama
2. Cek format file (PNG/JPG)
3. Cek lokasi folder sudah benar

### ❌ Tidak Bisa Save
1. Cek koneksi internet
2. Refresh halaman
3. Login ulang

---

## 🧹 LANGKAH 8: CLEAR CACHE (Lihat Data Terbaru)

### ❓ Kenapa Perlu Clear Cache?

Project ini menyimpan data di **localStorage** browser.
Jika kamu edit dialog tapi masih muncul teks lama, itu karena cache!

### Cara 1: Buka Mode Incognito/Samaran (Hanya di Browser Luar)

*(Catatan: Cara ini tidak bisa digunakan langsung di dalam panel preview Firebase Studio)*

**Chrome:**
1. Tekan **Ctrl + Shift + N**
2. Copy URL preview ke tab incognito
3. Data fresh, tidak ada cache!

**Edge:**
1. Tekan **Ctrl + Shift + N**
2. Sama seperti Chrome

### Cara 2: Clear localStorage Manual

1. Di preview/browser, tekan **F12** (buka DevTools)
2. Klik tab **"Application"** atau **"Storage"**
3. Di sidebar kiri, cari **"Local Storage"**
4. Klik kanan → **"Clear"** atau klik ikon 🚫

```
┌─────────────────────────────────────────┐
│  DevTools                               │
├─────────┬───────────────────────────────┤
│         │                               │
│ Storage │   Key         │ Value         │
│ ├─Local │ tf_player_v3  │ {...}        │
│ │ Storag│               │               │
│         │   [Klik kanan → Clear]        │
└─────────┴───────────────────────────────┘
```

### Cara 3: Hard Refresh

- **Ctrl + Shift + R** = Refresh tanpa cache
- Atau **Ctrl + F5**

### Cara 4: Buka Preview di Browser Lain

1. Copy URL preview dari Firebase Studio
2. Buka browser lain (Firefox, Safari, dll)
3. Paste URL → Enter
4. Browser baru = tidak ada cache!

---

## 🔗 TEST DI DEVICE LAIN (HP / TABLET)

### Cara Mendapat URL Preview di Firebase Studio:

**Metode 1: Dari Panel Preview**
1. Buka preview di Firebase Studio
2. Lihat **address bar** di panel preview (biasanya di atas)
3. Copy URL yang ada di sana
4. URL biasanya berbentuk: `https://xxxxx.idx.dev/...` atau `https://xxxxx.web.app/...`

**Metode 2: Klik Ikon "Open in New Tab"**
1. Di panel preview, cari ikon **🔗** atau **↗️** (Open in New Tab)
2. Klik ikon tersebut
3. Preview terbuka di tab baru
4. **Copy URL dari address bar browser**

**Metode 3: Buka Web Preview**
1. Di toolbar Firebase Studio, cari menu **"Web Preview"** atau **"Preview"**
2. Pilih **"Open in New Window"** atau **"Get Shareable Link"**
3. Copy URL yang muncul

### Cara Test di HP:

1. Copy URL preview (dari salah satu metode di atas)
2. Kirim ke HP via **WhatsApp / Email / Telegram**
3. Buka link di browser HP
4. Test!

```
┌─────────────────────────────────────────┐
│ Firebase Studio                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🔗 https://abc123.idx.dev/public/   │ │  ← COPY URL INI!
│ │ ┌─────────────────────────────────┐ │ │
│ │ │                                 │ │ │
│ │ │     [PREVIEW WEBSITE]           │ │ │
│ │ │                                 │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**⚠️ CATATAN PENTING:**
- URL hanya aktif selama Firebase Studio running
- Jika Firebase Studio ditutup, URL tidak bisa diakses
- HP harus terhubung ke internet

---

## 🔄 RESET DATA GAME (Mulai Dari Awal)

Jika ingin test dari awal (seperti player baru):

1. Buka DevTools (**F12**)
2. Pergi ke **Application → Local Storage**
3. Hapus item:
   - `tf_player_v3`
   - `tf_species_cache`
4. Refresh halaman

**Atau gunakan Mode Incognito!**

## ⌨️ SHORTCUT PENTING

| Shortcut             | Fungsi               |
| :------------------- | :------------------- |
| **Ctrl + S**         | Save file            |
| **Ctrl + F**         | Cari teks            |
| **Ctrl + Z**         | Undo (batalkan edit) |
| **Ctrl + Shift + Z** | Redo                 |
| **Ctrl + /**         | Comment/uncomment    |

---

## 📋 CHECKLIST SEBELUM SELESAI

- [ ] Semua file sudah di-save (tidak ada tanda ●)
- [ ] Preview sudah dicek
- [ ] Tidak ada error merah di editor
- [ ] Screenshot hasil (untuk dokumentasi)

---

## 📞 NAJU BUTUH BANTUAN?

Kalau stuck atau bingung:
1. **Screenshot** layar yang bermasalah
2. **Kirim ke aku** (Developer)
3. **Jelaskan** apa yang Naju coba lakukan

Aku pasti bantu! 😊

---

*Panduan Firebase Studio untuk Naju*
*Dari Developer dengan ❤️*

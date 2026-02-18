# 📝 PANDUAN EDIT DIALOG
## Cara Mengubah Teks Percakapan di Game - Khusus untuk Naju

---

## 👋 HAI NAJU!

Di panduan ini, Naju akan belajar cara mengubah teks percakapan antara maskot RIMBA dengan pemain.

**Tenang, ini GAMPANG BANGET!** 

Naju cuma perlu:
1. Buka file yang benar
2. Cari teks yang mau diganti
3. Ganti teksnya
4. Save

Itu aja! Yuk mulai! 👇

---

## 📍 FILE MANA YANG DIEDIT?

**Lokasi file:**
```
📂 public/
└── 📂 assets/
    └── 📂 data/
        └── 📄 dialogs.json   ← FILE INI!
```

**Cara buka:**
1. Di sidebar kiri (Explorer), klik folder `public`
2. Klik folder `assets`
3. Klik folder `data`
4. Klik file `dialogs.json`

---

## 🔍 ISI FILE INI SEPERTI APA?

File ini isinya seperti **naskah drama**. 

Contoh:

```json
{
    "scene_1_intro": [
        {
            "id": 1,
            "text": "Hmmm? Siapa disana?!",
            "mood": "shock"
        },
        {
            "id": 2,
            "text": "Aku mencium aroma manusia asing di hutanku...",
            "mood": "neutral"
        }
    ]
}
```

**Penjelasan:**
- `"text"` = Ini teks dialognya (yang dibaca pemain)
- `"mood"` = Ekspresi wajah Rimba saat ngomong ini
- `"id"` = Nomor urut (jangan diubah)
- `"scene_1_intro"` = Nama adegan (jangan diubah)

---

## ✏️ CARA EDIT YANG BENAR

### Langkah 1: Cari teks yang mau diganti

1. Tekan **Ctrl + F** (buka kotak pencarian)
2. Ketik sebagian teks yang mau dicari
3. Tekan **Enter** untuk lompat ke teks itu

### Langkah 2: Ganti teksnya

**PENTING: Ganti HANYA teks yang ada di dalam tanda kutip!**

**SEBELUM:**
```json
"text": "Hmmm? Siapa disana?!"
```

**SESUDAH:**
```json
"text": "Wah! Ada pengunjung baru nih!"
```

### Langkah 3: Save

- Tekan **Ctrl + S**
- Atau klik **File → Save**

### Langkah 4: Test

- Lihat preview
- Cek apakah teks sudah berubah
- Kalau belum, coba **Ctrl+Shift+R** (hard refresh)

---

## 😊 PILIHAN MOOD (EKSPRESI)

Naju bisa ganti mood/ekspresi Rimba:

| Mood        | Artinya  | Kapan Dipakai                     |
| :---------- | :------- | :-------------------------------- |
| `"happy"`   | Senang 😊 | Saat menyapa, memuji              |
| `"sad"`     | Sedih 😢  | Saat cerita tentang hutan rusak   |
| `"shock"`   | Kaget 😲  | Saat pertama kali ketemu pemain   |
| `"neutral"` | Biasa 😐  | Menjelaskan sesuatu               |
| `"angry"`   | Marah 😠  | Saat bicara tentang penebang liar |

**Contoh ganti mood:**
```json
"mood": "happy"   ← Ganti ini sesuai kebutuhan
```

---

## ⚠️ ATURAN YANG HARUS DIIKUTI

### ✅ BOLEH:
- Ganti isi teks di dalam `"text": "..."`
- Ganti mood (harus salah satu dari daftar di atas)
- Menambah atau mengurangi kata

### ❌ JANGAN:
- Menghapus tanda kutip `"`
- Menghapus koma `,`
- Menghapus tanda kurung `{ }` atau `[ ]`
- Mengubah `"id"` atau nama scene

---

## 📋 CONTOH LENGKAP

### Naju mau ubah sapaan Rimba:

**SEBELUM:**
```json
{
    "id": 5,
    "text": "Perkenalkan, namaku RIMBA! Aku adalah penjaga hutan Borneo ini.",
    "mood": "happy"
}
```

**SESUDAH:**
```json
{
    "id": 5,
    "text": "Hai! Namaku RIMBA, dan aku adalah penjaga hutan Kalimantan yang keren!",
    "mood": "happy"
}
```

**Yang berubah:** Hanya isi teks
**Yang tetap:** id, tanda kutip, koma, mood

---

## 🚨 CARA CEK ERROR

### Kalau setelah save ada error:

1. Buka website [jsonlint.com](https://jsonlint.com)
2. Copy SEMUA isi file `dialogs.json`
3. Paste di website itu
4. Klik **"Validate JSON"**
5. Kalau ada error, websitenya akan kasih tahu baris berapa

### Error yang sering terjadi:

| Error               | Penyebab           | Solusi                          |
| :------------------ | :----------------- | :------------------------------ |
| Layar putih         | Tanda kutip hilang | Cek tanda `"`                   |
| Dialog tidak muncul | Koma hilang        | Tambahkan koma `,`              |
| Unexpected token    | Ada karakter aneh  | Cek ada tanda kutip ganda tidak |

---

## 💬 TIPS DARI DEVELOPER

1. **Edit satu dialog** dulu, test, baru lanjut
2. **Jangan edit banyak sekaligus** - susah cari kalau error
3. **Backup file** sebelum edit banyak
4. **Tanya aku** kalau ragu!

---

## 🆘 NAJU BINGUNG?

Screenshot bagian yang bermasalah dan kirim ke Developer (aku)!

Aku akan bantu perbaiki 😊

---

*Panduan dibuat khusus untuk Naju*
*Dari Developer dengan ❤️*

# 🤖 PANDUAN PAKAI AI DI FIREBASE STUDIO
## Cara Minta Bantuan AI Tanpa Merusak Tutorial yang Ada - Untuk Naju

---

## 👋 HAI NAJU!

Firebase Studio punya fitur **AI Assistant** (biasanya Gemini).
Naju boleh pakai AI ini untuk bantu edit, TAPI harus pakai cara yang benar!

Kalau sembarangan, AI bisa **menghapus komentar tutorial** yang sudah aku buat.

Panduan ini akan kasih Naju **template prompt** yang aman! 😊

---

## 📂 DOKUMEN REFERENSI UNTUK AI

Sebelum pakai AI, pastikan AI sudah membaca file-file ini:

```
📂 docs/
├── 📄 README.md           ← Ringkasan project
└── 📄 ATURAN_UNTUK_AI.md  ← Aturan wajib untuk AI
```

**Cara kasih tahu AI:**
```
Sebelum edit, baca dulu file docs/ATURAN_UNTUK_AI.md
```

---

## ⚠️ PERINGATAN PENTING

### Yang Bisa Terjadi Kalau Salah Pakai AI:

❌ AI bisa hapus semua komentar `<!-- ✅ ZONA EDIT -->` yang sudah ada
❌ AI bisa tulis ulang file tanpa penjelasan
❌ AI bisa ubah struktur yang seharusnya tidak diubah
❌ Nanti Naju bingung lagi karena tutorialnya hilang!

### Solusinya:

✅ Selalu pakai **TEMPLATE PROMPT** yang ada di bawah
✅ Minta AI **mempertahankan** semua komentar yang ada
✅ Review hasil AI sebelum save

---

## 📋 TEMPLATE PROMPT (COPY-PASTE INI!)

### Template 1: Minta AI Ubah Teks

```
Tolong ubah teks [SEBUTKAN TEKS LAMA] menjadi [SEBUTKAN TEKS BARU].

ATURAN PENTING:
1. JANGAN hapus komentar yang ada (<!-- ✅ ZONA EDIT -->, <!-- ❌ JANGAN -->, dll)
2. JANGAN ubah struktur file
3. HANYA ubah teks yang saya sebutkan
4. Kalau menambah komentar baru, gunakan format yang sama seperti yang sudah ada
```

**Contoh pakai:**
```
Tolong ubah teks "MULAI PETUALANGAN" menjadi "AYO MULAI!".

ATURAN PENTING:
1. JANGAN hapus komentar yang ada (<!-- ✅ ZONA EDIT -->, <!-- ❌ JANGAN -->, dll)
2. JANGAN ubah struktur file
3. HANYA ubah teks yang saya sebutkan
4. Kalau menambah komentar baru, gunakan format yang sama seperti yang sudah ada
```

---

### Template 2: Minta AI Ubah Warna

```
Tolong ubah warna [SEBUTKAN WARNA LAMA atau KODE] menjadi [SEBUTKAN WARNA BARU atau KODE].

ATURAN PENTING:
1. JANGAN hapus komentar penjelasan yang ada di file CSS
2. JANGAN ubah nama class
3. HANYA ubah nilai warna (kode hex)
4. Pertahankan semua komentar /* ... */ yang ada
```

**Contoh pakai:**
```
Tolong ubah warna hijau #2d6a4f menjadi biru #1565C0.

ATURAN PENTING:
1. JANGAN hapus komentar penjelasan yang ada di file CSS
2. JANGAN ubah nama class
3. HANYA ubah nilai warna (kode hex)
4. Pertahankan semua komentar /* ... */ yang ada
```

---

### Template 3: Minta AI Ubah Ukuran/Layout

```
Tolong ubah ukuran [SEBUTKAN ELEMEN] dari [UKURAN LAMA] menjadi [UKURAN BARU].

ATURAN PENTING:
1. JANGAN hapus komentar <!-- ✅ ZONA EDIT --> atau <!-- ❌ JANGAN -->
2. JANGAN ubah atribut x-data, x-if, @click, :src, :class
3. HANYA ubah class Tailwind yang saya sebutkan
4. Pertahankan semua komentar tutorial yang ada
```

**Contoh pakai:**
```
Tolong ubah ukuran tombol dari h-10 menjadi h-14 dan w-40 menjadi w-60.

ATURAN PENTING:
1. JANGAN hapus komentar <!-- ✅ ZONA EDIT --> atau <!-- ❌ JANGAN -->
2. JANGAN ubah atribut x-data, x-if, @click, :src, :class
3. HANYA ubah class Tailwind yang saya sebutkan
4. Pertahankan semua komentar tutorial yang ada
```

---

### Template 4: Minta AI Tambah Fitur Baru

```
Tolong tambahkan [SEBUTKAN FITUR].

ATURAN PENTING:
1. JANGAN hapus komentar tutorial yang sudah ada
2. Untuk kode baru, TAMBAHKAN komentar dengan format:
   <!-- ================================================ -->
   <!-- ✅ ZONA EDIT: [NAMA BAGIAN]                      -->
   <!-- Boleh ganti: [SEBUTKAN APA YANG BOLEH DIEDIT]   -->
   <!-- ================================================ -->
   
3. Untuk bagian yang tidak boleh diedit, tambahkan:
   <!-- ❌ JANGAN edit bagian ini -->
   
4. Gunakan bahasa Indonesia untuk semua komentar
5. Buat penjelasan sesederhana mungkin
```

---

### Template 5: Minta AI Perbaiki Error

```
Ada error di file ini: [JELASKAN ERROR].
Tolong perbaiki.

ATURAN PENTING:
1. JANGAN hapus komentar tutorial yang sudah ada
2. Pertahankan format komentar <!-- ✅ ZONA EDIT --> dll
3. Setelah perbaiki, jelaskan apa yang diubah
```

---

## 🎯 CONTOH PROMPT LENGKAP

### Situasi: Naju mau ganti judul "Talking Forest" jadi "Hutan Ajaib"

**COPY PROMPT INI:**
```
Tolong ubah teks "Talking Forest" di file index.html menjadi "Hutan Ajaib".

ATURAN PENTING yang WAJIB DIIKUTI:
1. JANGAN hapus komentar yang sudah ada seperti:
   - <!-- ✅ ZONA EDIT -->
   - <!-- ✅ EDIT: ... -->
   - <!-- ❌ JANGAN edit ... -->
   - <!-- ================================================ -->
   
2. JANGAN ubah apapun selain teks yang saya sebutkan

3. JANGAN ubah atribut Alpine.js seperti:
   - x-data
   - x-if
   - x-show
   - @click
   - :src
   - :class

4. Pertahankan SEMUA struktur dan komentar tutorial

5. Tampilkan hanya bagian yang berubah, jangan tulis ulang seluruh file
```

---

## ⚡ PROMPT CEPAT (Versi Singkat)

Kalau Naju mau cepat, tambahkan ini di akhir setiap prompt:

```
PENTING: Jangan hapus komentar <!-- ✅ --> atau <!-- ❌ --> yang ada!
```

---

## 🔍 CARA CEK HASIL AI

Setelah AI memberikan jawaban:

### 1. Cek apakah komentar masih ada

Cari di hasil:
- `<!-- ✅ ZONA EDIT` → Harus masih ada!
- `<!-- ❌ JANGAN` → Harus masih ada!
- `/* ✅ EDIT */` → Harus masih ada!

### 2. Kalau komentar hilang

**JANGAN LANGSUNG SAVE!**

Minta AI lagi:
```
Komentar tutorial hilang. Tolong kembalikan komentar seperti:
<!-- ================================================ -->
<!-- ✅ ZONA EDIT: [NAMA] -->
<!-- Boleh ganti: [APA] -->
<!-- ================================================ -->

Di semua bagian yang bisa diedit.
```

### 3. Kalau ragu

Screenshot dan kirim ke Developer (aku)!

---

## 📝 KATA-KATA KUNCI UNTUK AI

Tambahkan kata-kata ini di prompt agar AI mengerti:

| Kata Kunci                  | Fungsi                     |
| :-------------------------- | :------------------------- |
| "Pertahankan komentar"      | AI tidak hapus komentar    |
| "Jangan tulis ulang semua"  | AI hanya ubah yang diminta |
| "Format komentar yang sama" | AI ikuti style yang ada    |
| "Tampilkan hanya perubahan" | AI tidak output semua file |

---

## 🚫 CONTOH PROMPT YANG SALAH

### ❌ JANGAN seperti ini:

```
Ubah judul jadi "Hutan Ajaib"
```
→ AI mungkin tulis ulang semua file dan hapus komentar!

```
Tolong edit file ini supaya lebih bagus
```
→ Terlalu umum, AI bisa ubah banyak hal!

```
Perbaiki semua
```
→ Tidak spesifik, AI bisa rusak struktur!

---

## ✅ CONTOH PROMPT YANG BENAR

```
Ubah teks "MULAI PETUALANGAN" menjadi "AYO MAIN!" di file index.html.

PENTING: 
- Jangan hapus komentar <!-- ✅ ZONA EDIT --> yang ada
- Hanya ubah teks itu saja
- Jangan ubah yang lain
```

---

## 💡 TIPS DARI DEVELOPER

1. **Selalu spesifik** - Sebutkan persis apa yang mau diubah
2. **Selalu tambahkan aturan** - Copy-paste aturan dari template
3. **Review sebelum save** - Cek hasil AI dulu
4. **Backup dulu** - Sebelum pakai AI, copy file ke tempat lain
5. **Tanya aku** kalau ragu - Lebih baik tanya daripada rusak!

---

## 🆘 HASIL AI RUSAK?

Kalau AI sudah terlanjur menghapus komentar:

1. Tekan **Ctrl + Z** berkali-kali (undo)
2. Atau minta aku untuk perbaiki
3. Atau copy dari backup

**Jangan panik!** Selama belum save, bisa di-undo 😊

---

## 📞 NAJU BUTUH BANTUAN?

Kalau hasil AI aneh atau komentar hilang:
1. **JANGAN SAVE DULU**
2. Screenshot hasil AI
3. Kirim ke aku (Developer)
4. Aku bantu perbaiki!

---

*Panduan AI untuk Naju*
*Dari Developer dengan ❤️*

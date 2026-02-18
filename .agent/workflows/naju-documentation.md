---
description: Aturan wajib untuk dokumentasi kode (Naju-Friendly Style)
---

# 📚 Workflow: Dokumentasi Naju-Friendly

## ATURAN WAJIB

Setiap kali **membuat file baru** atau **mengedit file existing** yang berupa kode (JS, CSS, HTML), 
WAJIB menambahkan atau memastikan ada **dokumentasi header** dalam format berikut:

---

## 📄 FORMAT DOKUMENTASI JAVASCRIPT (.js)

```javascript
/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   📄 NAMA FILE: [path/nama-file.js]                                          ║
║   🔧 FUNGSI: [Deskripsi singkat fungsi file dalam Bahasa Indonesia]          ║
║   📍 POSISI: [Dipakai oleh file/halaman apa]                                 ║
║   📏 UKURAN: [~jumlah baris (Kecil/Sedang/Besar)]                            ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════════════════════════
🔰 PANDUAN UNTUK NAJU
════════════════════════════════════════════════════════════════════════════════

Halo Naju! 👋

[Penjelasan file dalam bahasa sederhana yang mudah dipahami orang non-IT]
- Poin 1
- Poin 2
- dst

════════════════════════════════════════════════════════════════════════════════
📚 SIMBOL-SIMBOL
════════════════════════════════════════════════════════════════════════════════

🟢 = BOLEH EDIT (aman diubah)
🔴 = JANGAN EDIT (berbahaya)
🟡 = HATI-HATI (edit dengan cermat)
💡 = Tip/penjelasan
⚠️ = Peringatan

════════════════════════════════════════════════════════════════════════════════
💡 YANG BOLEH DIEDIT
════════════════════════════════════════════════════════════════════════════════

🟢 Baris [X]: [Nama item] - [Penjelasan]
   Contoh: '[nilai lama]' → '[nilai baru]'

🟢 Baris [Y]: [Nama item] - [Penjelasan]

════════════════════════════════════════════════════════════════════════════════
⚠️ YANG JANGAN DIEDIT
════════════════════════════════════════════════════════════════════════════════

🔴 [Nama fungsi/variabel] - [Alasan kenapa tidak boleh diedit]
🔴 [Logika tertentu] - [Penjelasan bahayanya]

════════════════════════════════════════════════════════════════════════════════
*/
```

---

## 📄 FORMAT DOKUMENTASI CSS (.css)

```css
/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   📄 NAMA FILE: css/[nama-file.css]                                          ║
║   🎨 FUNGSI: [Deskripsi styling]                                             ║
║   📍 POSISI: [Halaman yang menggunakan]                                      ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

🔰 PANDUAN UNTUK NAJU
═══════════════════════════════════════════════════════

[Penjelasan singkat tentang style apa yang diatur file ini]

📚 SIMBOL:
🟢 = Boleh edit (warna, ukuran font, spacing)
🔴 = Jangan edit (struktur layout, z-index)

════════════════════════════════════════════════════════════════════════════════
*/
```

---

## 📄 FORMAT DOKUMENTASI HTML (.html)

```html
<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║   📄 HALAMAN: [Nama Halaman]                                                 ║
║   🔧 FUNGSI: [Deskripsi halaman]                                             ║
║   📁 PATH: [/path/file.html]                                                 ║
╚══════════════════════════════════════════════════════════════════════════════╝

🔰 PANDUAN NAJU:
- [Penjelasan 1]
- [Penjelasan 2]

🟢 BOLEH EDIT: [daftar elemen aman]
🔴 JANGAN EDIT: [daftar elemen berbahaya]
-->
```

---

## ✅ CHECKLIST SEBELUM COMMIT

Sebelum menyimpan file, pastikan:

1. [ ] Header dokumentasi ada di AWAL FILE
2. [ ] Bahasa Indonesia yang MUDAH DIPAHAMI
3. [ ] Simbol warna (🔴🟡🟢) digunakan dengan benar
4. [ ] Ada contoh "sebelum → sesudah" untuk item yang boleh diedit
5. [ ] Logika berbahaya diberi label 🔴 dengan alasan jelas
6. [ ] Nama file dan path sudah benar

---

## 🎯 PRINSIP DOKUMENTASI

1. **Bahasa Naju**: Tulis seperti menjelaskan ke teman yang tidak paham coding
2. **Konkret**: Berikan nomor baris dan contoh spesifik
3. **Visual**: Gunakan emoji dan border agar mudah dibaca
4. **Protektif**: Tandai dengan jelas kode yang TIDAK BOLEH diedit
5. **Helpful**: Berikan contoh perubahan yang aman

---

## 📝 CATATAN PENTING

- Dokumentasi ini WAJIB untuk semua file di folder `public/js/` dan `public/css/`
- File konfigurasi (firebase-config, dll) WAJIB ada peringatan ekstra
- File logic besar (>200 baris) WAJIB ada "Peta Navigasi" struktur file
- Untuk file yang sudah ada dokumentasi, JANGAN hapus - update saja jika perlu

---

*Workflow ini berlaku untuk project Talking Forest V2/V3*

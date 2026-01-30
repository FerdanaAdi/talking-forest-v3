# 📋 RENCANA IMPLEMENTASI FASE 4: KUIS INTERAKTIF

## 🎯 Tujuan
Membuat mini-game "Cerdas Cermat Hutan" (Chapter 4).  
**Konsep:** Pemain menjawab pertanyaan pilihan ganda tentang materi yang sudah dipelajari (Pohon, Tanaman, Hewan).

---

## 🏗️ 1. Struktur File
- [NEW] `public/quiz.html` (Halaman Kuis)
- [NEW] `public/js/v3/mechanics/quiz.js` (Logika Kuis)
- [MODIFY] `public/assets/data/quizzes.json` (Update/Buat data soal dummy)

---

## 🎮 2. Gameplay Mechanics
1.  **Question:** Menampilkan pertanyaan + gambar pendukung (opsional).
2.  **Timer:** Batas waktu (misal 30 detik) per soal.
3.  **Options:** 3-4 Pilihan jawaban.
4.  **Feedback:**
    -   *Benar:* Tombol hijau + Suara "Chime" + Skor Bertambah.
    -   *Salah:* Tombol merah + Suara "Buzz" + Tampilkan jawaban benar.
5.  **Result:** Skor akhir + Rating (Bintang).

---

## 🖼️ 3. Aset (Placeholder Mode)
Sesuai request "Curi Start":
-   **Gambar Soal:** Placeholder icon/emoji.
-   **Suara:** Placeholder TTS/console log.

---

## 📝 4. Langkah Pengerjaan
1.  **Drafting UI (`quiz.html`)**
    -   Header (Skor, Timer).
    -   Card Soal (Teks besar).
    -   Grid Jawaban (Button styling).
2.  **Core Logic (`quiz.js`)**
    -   Load soal dari `quizzes.json`.
    -   Timer logic (Countdown).
    -   Score calculation logic.
3.  **Update Database (`quizzes.json`)**
    -   Isi dengan 5-10 soal dummy yang bervariasi (Pohon, Tanaman, Hewan).
4.  **Panduan Naju**
    -   Pastikan format JSON soal mudah dimengerti.

---

Siap dieksekusi! 🚀

# 📋 RENCANA IMPLEMENTASI FASE 3B: RHYTHM TAP (TANAMAN)

## 🎯 Tujuan
Membuat mini-game "Rhythm Tap" untuk spesies Tanaman (Chapter 2).  
**Konsep:** Pemain harus menekan tombol (Beat) sesuai irama lagu untuk membuat bunga mekar.

---

## 🏗️ 1. Struktur File
- [NEW] `public/rhythm.html` (Halaman Permainan)
- [NEW] `public/js/v3/mechanics/rhythm.js` (Logika Game)
- [MODIFY] `public/assets/data/species.json` (Tambah data Tanaman dummy)

---

## 🎮 2. Gameplay Mechanics
1.  **Falling Notes:** Not balok (kotak placeholder) turun dari atas ke bawah.
2.  **Hit Zone:** Area di bawah yang harus ditap saat not lewat.
3.  **Scoring:**
    -   *Perfect*: Tepat di tengah (+100 XP)
    -   *Good*: Sedikit meleset (+50 XP)
    -   *Miss*: Lewat (+0 XP)
4.  **Feedback Visual:**
    -   Bunga (Placeholder kotak) membesar setiap kali benar.
    -   Efek partikel saat hit.

---

## 🖼️ 3. Aset (Placeholder Mode)
Sesuai request "Curi Start", kita pakai:
-   **Background:** Warna gradasi hijau-pink.
-   **Notes:** Kotak div warna-warni (CSS).
-   **Music:** Tidak ada dulu (visual only) atau metronome JS sederhana.

---

## 📝 4. Langkah Pengerjaan
1.  **Drafting UI (`rhythm.html`)**
    -   Canvas/Container untuk game.
    -   Score display.
    -   Tombol "Tap".
2.  **Core Logic (`rhythm.js`)**
    -   Engine spawn notes.
    -   Engine deteksi hit/miss.
    -   Animasi GSAP untuk gerakan note.
3.  **Update Database (`species.json`)**
    -   Tambah entry "Kantong Semar" (contoh) dengan tipe `rhythm`.
4.  **Testing**
    -   Pastikan playable di HP (responsive).

---

Siap dieksekusi! 🚀

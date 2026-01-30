# 📋 RENCANA IMPLEMENTASI FASE 3C: SOUND & SHADOW (HEWAN)

## 🎯 Tujuan
Membuat mini-game "Summoning Hewan" (Chapter 3).  
**Konsep:** Pemain mendengar suara hewan, lalu menebak siluet hewan yang benar dari 3 pilihan.

---

## 🏗️ 1. Struktur File
- [NEW] `public/summon.html` (Halaman Permainan)
- [NEW] `public/js/v3/mechanics/summon.js` (Logika Game)
- [MODIFY] `public/assets/data/species.json` (Tambah data Hewan dummy)

---

## 🎮 2. Gameplay Mechanics
1.  **Listen:** Pemain menekan tombol "Dengar Suara".
2.  **Guess:** 3 Siluet hewan muncul. Pemain harus memilih mana pemilik suara tersebut.
3.  **Reveal:**
    -   *Benar:* Siluet berubah jadi gambar berwarna + Hewan mendekat (Scale Up).
    -   *Salah:* Siluet bergetar + Suara "Salah".
4.  **Feedback:** Fakta unik tentang hewan tersebut muncul.

---

## 🖼️ 3. Aset (Placeholder Mode)
Sesuai request "Curi Start", kita pakai:
-   **Siluet:** Kotak Hitam.
-   **Hewan Reveal:** Kotak Warna-warni.
-   **Suara:** Placeholder audio (atau pesan visual "🔊 Suara Ayam").

---

## 📝 4. Langkah Pengerjaan
1.  **Drafting UI (`summon.html`)**
    -   Tombol Play besar.
    -   Container 3 Pilihan (Grid).
    -   Area visual utama (Hewan muncul).
2.  **Core Logic (`summon.js`)**
    -   Randomizer (1 Benar, 2 Salah).
    -   Logic cek jawaban.
    -   Animasi GSAP untuk reveal.
3.  **Update Database (`species.json`)**
    -   Tambah entry "Enggang" (sudah ada) & tambah dummy lain.
4.  **Fitur Voice (Opsional Nanti)**
    -   Deteksi suara mikrofon (tahap lanjut).

---

Siap dieksekusi! 🚀

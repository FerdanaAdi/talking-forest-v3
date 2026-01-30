# 📋 RENCANA IMPLEMENTASI FASE 5: TIME SPELL (GRAND FINALE)

## 🎯 Tujuan
Membuat fitur "Evolusi Waktu" (Chapter 5).  
**Konsep:** Pemain menggunakan "Mantra Pembesar" (Tombol Tahan) untuk menumbuhkan benih menjadi pohon raksasa secara real-time.

---

## 🏗️ 1. Struktur File
- [NEW] `public/time-spell.html` (Halaman Finale)
- [NEW] `public/js/v3/mechanics/time-spell.js` (Logika GSAP Complex)
- [MODIFY] `public/assets/data/species.json` (Tambah data narasi evolusi)

---

## 🎮 2. Gameplay Mechanics
1.  **Hold to Grow:** Pemain harus MENAHAN tombol mantra.
2.  **Progress Bar:** Energi mantra terisi saat ditahan.
3.  **Stages:**
    -   Level 1: Benih (Seed) 🌱
    -   Level 2: Tunas (Sprout) 🌿
    -   Level 3: Pohon Kecil (Sapling) 🎋
    -   Level 4: Pohon Dewasa (Tree) 🌳
    -   Level 5: Pohon Spirit (Ancient) ✨ (Selesai!)
4.  **Feedback:** Getaran (Vibration API) + Partikel + Suara makin kencang.

---

## 🖼️ 3. Visual Strategy (SVG + GSAP)
Karena ini "Curi Start", kita pakai **SVG Inline** yang bisa dimorphing/animasi warna, bukan gambar PNG statis, supaya kelihatan "tumbuh" beneran (smooth).

**Placeholder Stages (SVG Shapes):**
1.  `Seed`: Lingkaran Coklat kecil.
2.  `Sprout`: Garis Hijau melengkung.
3.  `Sapling`: Batang lurus + 2 Daun.
4.  `Tree`: Batang tebal + Mahkota bulat.
5.  `Ancient`: Tree + Glow + Partikel Emas.

---

## 📝 4. Langkah Pengerjaan
1.  **Drafting UI (`time-spell.html`)**
    -   Area Canvas Tengah (Tempat Pohon).
    -   Tombol Mantra (Bulat, Besar, di Bawah).
    -   Indikator Level (1-5).
2.  **Core Logic (`time-spell.js`)**
    -   `PointerDown`/`TouchStart`: Mulai isi energi.
    -   `PointerUp`/`TouchEnd`: Energi turun perlahan.
    -   GSAP Timeline per stage.
3.  **Data Narasi**
    -   Teks yang muncul tiap naik level ("Wah, akarnya mulai kuat!", "Lihat, ada daun baru!").
4.  **Panduan Naju**
    -   Tandai variabel durasi animasi & warna partikel.

---

Siap dieksekusi dengan **HATI-HATI & DETAIL**! 🌟

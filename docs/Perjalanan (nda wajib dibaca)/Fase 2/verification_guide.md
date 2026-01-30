# 🧪 PANDUAN UJI COBA (VERIFICATION GUIIDE)
**Fase 2.5: Story Engine Integration**

Silahkan ikuti langkah-langkah di bawah ini untuk memastikan "Renovasi Rumah" kita berhasil dengan sempurna.

---

## 🛠️ PERSIAPAN (PENTING!)
Sebelum mulai, pastikan browser bersih dari data lama.
1.  Buka **Developer Tools** (F12) -> Application -> Local Storage.
2.  Hapus Key `tf_player_v3` (Klik kanan -> Delete).
3.  **ATAU**: Gunakan Mode Incognito/Private Window baru.

---

## 🎬 SKENARIO 1: PETUALANG BARU (THE NEWBIE)
**Tujuan:** Memastikan user baru dipaksa nonton Intro dan Daftar.

1.  **Buka `index.html`**
    *   **Ekspektasi:** Jangan kaget kalau langsung dilempar ke `story.html`.
    *   **Cek:** Apakah layar jadi Bioskop (Intro Story)? Ada musik? Teks mengetik?
2.  **Selesaikan Intro**
    *   Klik terus sampai Rimba bilang "Ayo kenalan!".
    *   **Ekspektasi:** Setelah dialog habis, otomatis balik ke `index.html` tapi kali ini muncul **Form Registrasi**.
3.  **Daftar Nama**
    *   Pilih Avatar, Ketik Nama, Klik "Mulai Petualangan".
    *   **Ekspektasi:** Tidak langsung masuk Dashboard! Tapi dilempar lagi ke `story.html` (Misi Brief).
4.  **Selesaikan Misi Brief**
    *   Dengarkan Rimba menjelaskan misi.
    *   **Ekspektasi:** Setelah selesai, baru masuk ke **Lobby Utama (Dashboard)**.

---

## 🏃 SKENARIO 2: JELAJAH PERTAMA (THE EXPLORER)
**Tujuan:** Memastikan tombol jelajah mengarah ke Hook Scene dulu.

1.  **Di Lobby, Klik "Jelajah"**
    *   **Ekspektasi:** Karena kamu baru daftar, kamu dilempar ke `story.html` (Scene: Hutan Aneh/Hook).
2.  **Nonton Hook Scene**
    *   Simak cerita tentang hutan yang kehilangan warna.
    *   **Ekspektasi:** Setelah selesai, otomatis masuk ke `scan.html`.

---

## ⚔️ SKENARIO 3: ARENA & REVEAL (THE GAMER)
**Tujuan:** Memastikan halaman scan bersih dan redirect ending benar.

1.  **Di Halaman Scan (`scan.html`)**
    *   **Cek:** Apakah HALAMAN BERSIH? (Tidak ada teks cerita, tidak ada Rimba lari).
    *   **Cek:** Apakah Kabut (Fog) muncul?
    *   **Action:** Klik-klik kabut sampai hilang -> Muncul Tombol Scan.
2.  **Simulasi Scan Berhasil**
    *   Kalau di PC (gak ada kamera), gunakan URL Param cheat:
    *   Tambahkan di ujung URL: `&code=mangga_kakek` (atau ?code=mangga_kakek).
    *   **Ekspektasi:** Muncul suara "Chime" -> Redirect ke `story.html` (Scene: Reveal).
3.  **Nonton Ending (Reveal)**
    *   **Cek:** Apakah nama pohon ("Mangga Kakek") muncul di teks dialog?
    *   **Ekspektasi:** Setelah selesai, balik ke Lobby.

---

## 🧠 SKENARIO 4: PLAYER LAMA (THE VETERAN)
**Tujuan:** Memastikan fitur "Smart Jelajah" jalan.

1.  **Di Lobby (Setelah balik dari ending)**
    *   Klik lagi tombol **"Jelajah"**.
    *   **Ekspektasi:** KARENA SUDAH PERNAH NONTON HOOK, harusnya LANGSUNG masuk `scan.html`.
    *   **Gak boleh** mampir ke Bioskop lagi.

---

**Jika semua skenario di atas ✅ (Centang Hijau), berarti misi kita SUKSES BESAR!**
Laporkan hasilnya ya! 🚀

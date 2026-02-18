# Analisis & Rencana Implementasi untuk ALUR 12-15 (System UI)

Dokumen ini adalah ringkasan analisis dari `implementation_plan.md` dan `MASTER_PLAN_TALKING_FOREST_V3.md` serta usulan langkah-langkah untuk menyelesaikan masalah yang ada.

---

## 1. Analisis Masalah

Setelah menganalisis dokumen yang Anda berikan, masalah utamanya adalah **inkonsistensi dan ketidaklengkapan implementasi komponen antarmuka sistem (System UI)**. Ini mencakup modal, notifikasi (toasts), layar loading, dan pesan error.

Detail masalahnya adalah:

- **Duplikasi Kode:** File `public/v3/garden.html` memiliki kode template UI yang berulang.
- **Fitur Hilang:** Modal untuk `ACHIEVEMENT_UNLOCK` (saat pemain mendapatkan lencana baru) belum ada di file HTML mana pun, meskipun logikanya sudah disiapkan.
- **Halaman Tanpa UI:** Halaman inti permainan seperti `puzzle.html`, `rhythm.html`, `summon.html`, dan `quiz.html` tidak memiliki komponen System UI sama sekali. Hal ini menghalangi kemampuan untuk menampilkan notifikasi atau pop-up secara konsisten.
- **Implementasi Beragam:** Cara implementasi System UI tidak seragam di beberapa halaman yang sudah memilikinya.

---

## 2. Solusi yang Diusulkan

Solusinya adalah mengeksekusi rencana yang sudah didefinisikan dengan baik dalam `implementation_plan.md`. Rencana ini akan menyatukan dan melengkapi semua komponen System UI di seluruh aplikasi.

Berikut adalah langkah-langkah konkret yang akan diambil:

### Langkah 1: Membersihkan Duplikasi di `garden.html`
- **Tindakan:** Menghapus blok template System UI yang duplikat dari file `public/v3/garden.html`.
- **Tujuan:** Menyisakan hanya satu set template yang bersih dan fungsional.

### Langkah 2: Implementasi Modal `ACHIEVEMENT_UNLOCK`
- **Tindakan:** Menambahkan kode HTML untuk modal "Lencana Baru" ke dalam 5 halaman berikut:
    1. `public/index.html`
    2. `public/scan.html`
    3. `public/v3/profile.html`
    4. `public/v3/donate.html`
    5. `public/v3/garden.html` (setelah duplikasi dihapus)
- **Tujuan:** Memastikan setiap halaman utama dapat menampilkan pop-up ketika pemain mendapatkan pencapaian baru.

### Langkah 3: Penyempurnaan CSS
- **Tindakan:** Menambahkan styling CSS khusus untuk modal `ACHIEVEMENT_UNLOCK` ke dalam file `public/css/system-ui.css`.
- **Tujuan:** Memastikan modal baru memiliki tampilan yang menarik dan sesuai dengan desain.

### Langkah 4: (Membutuhkan Persetujuan) Menambahkan System UI ke Halaman Game
- **Tindakan:** Menambahkan seluruh template System UI (Toast, Modal, Loading, Error) beserta file CSS dan JS yang relevan ke halaman-halaman berikut:
    1. `public/puzzle.html`
    2. `public/rhythm.html`
    3. `public/summon.html`
    4. `public/quiz.html`
- **Tujuan:** Memungkinkan halaman game untuk menampilkan notifikasi (misalnya, "Jawaban Benar!"), konfirmasi keluar, atau pesan error secara konsisten dengan bagian aplikasi lainnya.

---

## 3. Konfirmasi
Mohon konfirmasi apakah Anda setuju dengan rencana di atas, dan terutama, apakah saya harus melanjutkan dengan **Langkah 4** untuk mengintegrasikan System UI ke dalam halaman-halaman game?

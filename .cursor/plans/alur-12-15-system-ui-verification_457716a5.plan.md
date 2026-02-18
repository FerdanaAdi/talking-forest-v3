---
name: alur-12-15-system-ui-verification
overview: Rencana verifikasi menyeluruh untuk implementasi ALUR 12-15 (modals, toasts, loading, error) agar konsisten dengan Master Plan dan Implementation Plan di seluruh halaman Talking Forest.
todos:
  - id: audit-templates
    content: Audit struktur template System UI di index/scan/profile/donate/garden terhadap implementation_plan.md
    status: pending
  - id: verify-modal-types
    content: Verifikasi semua type modal (EDIT_NICKNAME, BADGE_DETAIL, LEVEL_UP, ACHIEVEMENT_UNLOCK, CONFIRM_EXIT) ada di template dan sesuai desain Master Plan
    status: pending
  - id: test-achievement-modal
    content: Uji runtime modal ACHIEVEMENT_UNLOCK di semua halaman yang relevan via Alpine.store dan cocokkan dengan ALUR 12.4
    status: pending
  - id: check-css-achievement
    content: Periksa dan uji CSS serta animasi khusus modal-achievement di system-ui.css
    status: pending
  - id: test-toasts-loading-error
    content: Jalankan skenario uji console untuk toast, loading, dan error overlay sesuai ALUR 13-15
    status: pending
  - id: verify-game-pages
    content: Jika System UI diaktifkan di game pages, verifikasi integrasi dan confirm-exit modal tidak mengganggu logika game
    status: pending
isProject: false
---

## Tujuan Utama

- **Pastikan semua elemen System UI (modal, toast, loading, error)** yang didefinisikan di ALUR 12-15 di `MASTER_PLAN_TALKING_FOREST_V3.md` sudah **diimplementasikan dan berperilaku sesuai** dengan `implementation_plan.md`.
- **Sediakan checklist & skenario uji praktis** yang bisa kamu jalankan langsung di browser (via UI dan console) untuk mendeteksi gap implementasi.

## Konteks dari Dokumen

- **Master Plan** (`MASTER_PLAN_TALKING_FOREST_V3.md`)
- Mendefinisikan desain visual & perilaku untuk:
- **ALUR 12**: semua modal (EDIT_NICKNAME, BADGE_DETAIL, LEVEL_UP, ACHIEVEMENT_UNLOCK, CONFIRM_EXIT) di sekitar L2996–L3155.
- **ALUR 13**: toast notifications (SUCCESS, ERROR, XP GAIN) di sekitar L3159–L3199.
- **ALUR 14**: loading states (full screen + skeleton) di sekitar L3203–L3247.
- **ALUR 15**: error states (OFFLINE, SPECIES_NOT_FOUND, GENERAL_ERROR) di sekitar L3251–L3330.
- **Implementation Plan lokal** (`implementation_plan.md` di root)
- Memetakan desain di atas ke perubahan kode:
- Audit halaman yang sudah/ belum punya System UI templates.
- Komponen kerja:
- **Komponen 1**: bersihkan duplikasi template di `garden.html` + siapkan tempat untuk `ACHIEVEMENT_UNLOCK`.
- **Komponen 2**: tambah case `ACHIEVEMENT_UNLOCK` ke semua 5 halaman yang sudah punya template (`index.html`, `scan.html`, `profile.html`, `donate.html`, `garden.html`).
- **Komponen 3 (opsional)**: injek System UI (toast + modal + loading + error) ke game pages (`puzzle.html`, `rhythm.html`, `summon.html`, `quiz.html`).
- **Komponen 4**: styling khusus di `system-ui.css` untuk modal achievement.

## Rencana Verifikasi Bertahap

- **Langkah 1 – Verifikasi struktur template per halaman**
- Buka masing-masing file HTML yang disebut di `implementation_plan.md`:
- `index.html`, `scan.html`, `profile.html`, `donate.html`, `v3/garden.html`.
- Di setiap file, cek sebelum `</body>` apakah sudah ada **satu set lengkap** template System UI:
- Toast container + template binding ke `$store.systemUI.toast`.
- Modal overlay + `<template x-if="$store.systemUI.modal.isOpen">`.
- Loading overlay + binding ke `$store.systemUI.loading`.
- Error overlay + binding ke `$store.systemUI.error`.
- **Checklist per file**:
- Template tidak duplikat (khusus `garden.html` hanya ada 1 set).
- Semua elemen pakai class & struktur yang konsisten (sesuai contoh di halaman lain yang sudah benar, mis. `index.html`).

- **Langkah 2 – Verifikasi type modal di dalam template**
- Di blok `<template x-if="$store.systemUI.modal.isOpen">` di tiap halaman:
- Pastikan ada sub-`<template>` untuk:
- `EDIT_NICKNAME`
- `BADGE_DETAIL`
- `LEVEL_UP`
- `ACHIEVEMENT_UNLOCK` **(baru, fokus utama)**
- `CONFIRM_EXIT`
- Bandingkan teks, hierarchy, dan elemen dengan deskripsi di Master Plan (L2998–L3155):
- Judul & copywriting utama sesuai (misal: "LENCANA BARU!", "MASTER PUZZLE", teks konfirmasi keluar puzzle, dsb.).
- Tombol & aksi yang tersedia sama (misal hanya 1 tombol "KEREN! ✓" untuk achievement, dua tombol untuk confirm exit).

- **Langkah 3 – Verifikasi binding data & XP untuk `ACHIEVEMENT_UNLOCK`**
- Di template `ACHIEVEMENT_UNLOCK` di tiap file, cek:
- Icon badge diambil dari `$store.systemUI.modal.data.badge?.icon`.
- Nama & deskripsi badge dari `badge.name` dan `badge.description`.
- XP dari `modal.data.xp` dengan fallback default (mis. 50).
- Di runtime (browser console), uji manual:
- Jalankan di setiap halaman yang punya template:
- `Alpine.store('systemUI').showModal('ACHIEVEMENT_UNLOCK', { badge: { icon: '🧩', name: 'Master Puzzle', description: 'Selesaikan 10 puzzle' }, xp: 50 })`.
- Observasi:
- Layout dan teks sesuai diagram Master Plan.
- XP dan icon muncul dengan benar dan bisa diganti dari parameter.

- **Langkah 4 – Verifikasi CSS & animasi achievement**
- Buka `system-ui.css` (di `public/css/system-ui.css`).
- Pastikan sudah ada block CSS seperti di `implementation_plan.md` (kelas mis. `.modal-achievement`, `.badge-icon`, dan `@keyframes badgeBounce`).
- Cek di HTML modal achievement bahwa **root container** memakai class yang mengaktifkan styling ini (mis. `class="modal-content modal-achievement"` atau wrapper yang tepat).
- Di browser, trigger modal achievement dan pastikan:
- Background gradient & border berbeda dari modal biasa.
- Badge icon punya animasi bounce saat muncul.

- **Langkah 5 – Verifikasi toast (ALUR 13)**
- Di masing-masing halaman yang punya System UI:
- Dari console:
- `Alpine.store('systemUI').showToast('Data berhasil disimpan!', 'success')`.
- `Alpine.store('systemUI').showToast('Gagal menyimpan!', 'error')`.
- Cek:
- Posisi toast (top) & animasi sesuai Master Plan L3161–L3185.
- Warna / icon beda antara success & error.
- Jika ada desain XP floating toast (13.3), pastikan kelas/komponen yang memunculkannya konsisten dengan layout di Master Plan.

- **Langkah 6 – Verifikasi loading overlay (ALUR 14)**
- Dari console di halaman utama (mis. `index.html`, `scan.html`, `garden.html`):
- `Alpine.store('systemUI').setLoading(true, 'Memuat data...')`.
- Pastikan overlay full-screen + icon loading sesuai diagram L3205–L3223.
- Matikan loading: `Alpine.store('systemUI').setLoading(false)`.
- Jika skeleton loading dipakai di `garden.html` atau halaman list lain, cocokkan struktur skeleton (cards, shimmer) dengan desain L3226–L3247.

- **Langkah 7 – Verifikasi error overlay (ALUR 15)**
- Uji dari console dan/atau simulasi error di network:
- `Alpine.store('systemUI').showError('OFFLINE', 'TIDAK ADA KONEKSI')` (atau pola yang kamu pakai).
- `Alpine.store('systemUI').showError('SPECIES_NOT_FOUND', 'SPESIES TIDAK DITEMUKAN')`.
- `Alpine.store('systemUI').showError('GENERAL', 'TERJADI KESALAHAN')`.
- Cek apakah layout, icon, dan teks mengikuti contoh L3253–L3330.
- Pastikan ada cara yang jelas untuk dismiss/refresh (tombol COBA LAGI, REFRESH, dsb.).

- **Langkah 8 – Game pages (jika System UI diaktifkan)**
- Untuk `puzzle.html`, `rhythm.html`, `summon.html`, `quiz.html`:
- Verifikasi sudah ada `<script src="js/v3/components/system-ui.js"></script>` dan `<link rel="stylesheet" href="css/system-ui.css">` di `<head>`.
- Pastikan templates System UI ditambahkan di bawah, dengan struktur sama seperti halaman lain.
- Uji **khusus**:
- Jalankan `showModal('CONFIRM_EXIT')` di masing-masing game page dan pastikan tidak mengganggu kontrol game (overlay-nya menonaktifkan input game sementara, lalu mengembalikan state dengan benar saat ditutup).
- Jika game memunculkan toast/XP, pastikan tidak bertabrakan dengan HUD game.

- **Langkah 9 – Checklist final yang bisa kamu centang**
- Buat checklist (mis. di `analysis_and_plan.md` atau tools internal) dengan item:
- Per halaman: struktur template lengkap & tidak duplikat.
- Per modal type: semua muncul dan sesuai desain Master Plan.
- Per fitur: toast, loading, error, confirm exit di game pages (jika diaktifkan).
- Setelah semua skenario console di atas berhasil tanpa layout aneh atau error JS di console, anggap ALUR 12-15 **terverifikasi**.

## Hasil Akhir yang Diharapkan

- Kamu punya **script verifikasi praktis** (sekumpulan perintah `Alpine.store('systemUI')...`) yang bisa dijalankan kapan saja untuk regression test ALUR 12-15.
- Semua gap antara Master Plan dan implementasi nyata mudah di-spot karena setiap bagian punya skenario uji dan checklist yang jelas.
- Jika nanti ada perubahan desain di Master Plan, kamu cukup update checklist & skenario uji tanpa mengacak-acak lagi seluruh kode.
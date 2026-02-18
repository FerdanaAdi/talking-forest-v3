# ✅ Ringkasan Analisis & Rencana Aksi: System UI (Alur 12-15)

Dokumen ini merangkum analisis dari `IMPLEMENTATION_PLAN.md` dan menyediakan checklist langkah-langkah konkret untuk menyelesaikan masalah terkait komponen System UI (Modal, Toast, Loading, Error).

---

## ❗ Keputusan Desain yang Perlu Disetujui

Sebelum memulai, mohon konfirmasi tiga poin berikut yang diidentifikasi dalam rencana:

1.  **Hapus Duplikasi di `garden.html`**: File ini memiliki dua set template System UI yang identik. Rencananya adalah menghapus satu set yang duplikat.
2.  **Tambah Modal `ACHIEVEMENT_UNLOCK`**: Template HTML untuk modal ini belum ada sama sekali. Rencananya adalah menambahkannya ke semua halaman yang relevan.
3.  **System UI untuk Halaman Game**: Halaman game (`puzzle.html`, `quiz.html`, dll.) saat ini tidak memiliki System UI. **Rekomendasi kuat** adalah menambahkannya untuk konsistensi, terutama untuk notifikasi skor (Toast) dan konfirmasi keluar (Modal).

---

## 🛠️ Rencana Aksi (Action Plan)

Berikut adalah tiga komponen utama pekerjaan yang perlu dilakukan.

### Komponen 1: Perbaiki Duplikasi di `garden.html`

-   **File**: `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\v3\garden.html`
-   **Tugas**:
    1.  Buka file tersebut.
    2.  Identifikasi dua blok template System UI (yang pertama sekitar baris 416-550, yang kedua sekitar baris 665-814).
    3.  **Hapus seluruh blok kedua** yang merupakan duplikat.

### Komponen 2: Tambahkan Template Modal `ACHIEVEMENT_UNLOCK`

-   **Tugas**: Salin blok kode HTML di bawah ini dan tempelkan di dalam `<template x-if="$store.systemUI.modal.isOpen">` pada setiap file yang tercantum.

#### Kode Template untuk Ditambahkan:
```html
<!-- Achievement Unlock Modal (ALUR 12.4) -->
<template x-if="$store.systemUI.modal.type === 'ACHIEVEMENT_UNLOCK'">
    <div class="modal-content">
        <div class="modal-icon">🔓</div>
        <h2 class="modal-title">LENCANA BARU!</h2>
        <div style="font-size: 64px; margin: 16px 0;" x-text="$store.systemUI.modal.data.badge?.icon || '🏆'"></div>
        <h3 style="font-size: 18px; font-weight: 700; color: #2d6a4f;" x-text="$store.systemUI.modal.data.badge?.name || 'Badge'"></h3>
        <p class="modal-body" x-text="$store.systemUI.modal.data.badge?.description || ''"></p>
        <p style="color: #F59E0B; font-weight: 700;" x-text="'+' + ($store.systemUI.modal.data.xp || 50) + ' XP 🎉'"></p>
        <div class="modal-actions">
            <button class="modal-btn primary" @click="$store.systemUI.closeModal()">KEREN! ✓</button>
        </div>
    </div>
</template>
```

#### Daftar File yang Perlu Diubah:
1.  `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\index.html`
2.  `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\scan.html`
3.  `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\v3\profile.html`
4.  `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\v3\donate.html`
5.  `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\v3\garden.html` (tambahkan ke satu-satunya template yang tersisa setelah Komponen 1).

### Komponen 3: Tingkatkan Visual Modal dengan CSS

-   **File**: `c:\Users\Pongo\OneDrive - umkt.ac.id\Dokumen\Project\talking-forest-v2 - Uji Coba\public\css\system-ui.css`
-   **Tugas**: Tambahkan kode CSS berikut di akhir file untuk memberikan gaya dan animasi pada modal `ACHIEVEMENT_UNLOCK`.

#### Kode CSS untuk Ditambahkan:
```css
/* Achievement Unlock Modal Special */
.modal-achievement .modal-content {
    background: linear-gradient(135deg, #1a2e1a, #2d5a2d);
    border: 2px solid #4CAF50;
}

.modal-achievement .badge-icon {
    animation: badgeBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes badgeBounce {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); opacity: 1; }
}
```
**Catatan**: Agar CSS ini berfungsi, Anda mungkin perlu menambahkan kelas `modal-achievement` ke elemen pembungkus modal dan `badge-icon` ke ikonnya di dalam template HTML yang Anda tambahkan di Komponen 2.

---

## 🧪 Rencana Verifikasi

Setelah semua perubahan di atas diterapkan, buka setiap halaman yang telah dimodifikasi dan gunakan **Developer Console** di browser Anda untuk menjalankan perintah berikut dan memastikan setiap komponen UI muncul dengan benar.

1.  **Toast**:
    ```javascript
    Alpine.store('systemUI').showToast('Test Toast Berhasil', 'success');
    ```
2.  **Modal Level Up**:
    ```javascript
    Alpine.store('systemUI').showModal('LEVEL_UP', { level: 10 });
    ```
3.  **Modal Achievement Unlock (BARU)**:
    ```javascript
    Alpine.store('systemUI').showModal('ACHIEVEMENT_UNLOCK', { badge: { icon: '🧩', name: 'Master Puzzle', description: 'Anda menyelesaikan 10 puzzle.' }, xp: 100 });
    ```
4.  **Modal Konfirmasi**:
    ```javascript
    Alpine.store('systemUI').showModal('CONFIRM_EXIT');
    ```
5.  **Loading Overlay**:
    ```javascript
    Alpine.store('systemUI').setLoading(true, 'Memuat data...');
    // Untuk mematikannya: Alpine.store('systemUI').setLoading(false);
    ```
6.  **Error Overlay**:
    ```javascript
    Alpine.store('systemUI').showError('Koneksi Gagal', 'Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
    ```
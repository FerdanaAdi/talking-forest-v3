# 🔔 ALUR 12-15: Modals, Toasts, Loading & Error — Implementation Plan

## Tujuan
Mengimplementasikan semua modal, popup, toast, loading, dan error overlay secara **konsisten** di seluruh halaman sesuai spesifikasi [ALUR 12-15](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/docs/IMPLEMENTATION_PLAN.md#L2282-L2624) dari Master Plan.

---

## User Review Required

> [!IMPORTANT]
> **Keputusan desain yang perlu disetujui:**
> 1. `garden.html` saat ini punya **template DUPLIKAT** (2× toast, 2× modal, 2× loading, 2× error). Akan dihapus duplikatnya.
> 2. Modal type `ACHIEVEMENT_UNLOCK` (ALUR 12.4) **belum ada** di HTML manapun. Akan ditambahkan.
> 3. Game pages (puzzle, rhythm, summon, quiz, cutscene, story, register) **tidak punya** System UI templates sama sekali. Apakah harus ditambahkan? *(Rekomendasi: Ya, setidaknya Toast + Confirm Exit modal untuk game pages)*

> [!WARNING]
> **`detail.html`** menggunakan `.modal-overlay` dengan custom logic (bukan System UI store). File ini **tidak akan diubah** untuk menghindari breaking changes.

---

## 📊 Audit Status Saat Ini

### Halaman yang SUDAH punya System UI Templates

| Halaman                                                                                                                                      | `system-ui.js` |    Toast    |    Modal    |   Loading   |    Error    |    Duplikat?    |
| :------------------------------------------------------------------------------------------------------------------------------------------- | :------------: | :---------: | :---------: | :---------: | :---------: | :-------------: |
| [index.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/index.html)          |   ✅ `defer`    |   ✅ L617    |   ✅ L630    |   ✅ L743    |   ✅ L751    |      ❌ OK       |
| [scan.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/scan.html)            |       ✅        |   ✅ L922    |   ✅ L935    |   ✅ L1035   |   ✅ L1043   |      ❌ OK       |
| [profile.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/profile.html)   |       ✅        |   ✅ L277    |   ✅ L290    |   ✅ L405    |   ✅ L413    |      ❌ OK       |
| [donate.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/donate.html)     |    ❌ inline    |   ✅ L248    |   ✅ L261    |   ✅ L360    |   ✅ L368    |      ❌ OK       |
| [garden.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/garden.html)     |    ❌ inline    | ⚠️ L420+L669 | ⚠️ L433+L682 | ⚠️ L532+L795 | ⚠️ L540+L803 | ⚠️ **DUPLIKAT!** |
| [settings.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/settings.html) |       ✅        |      ❓      |      ❓      |      ❓      |      ❓      |        ?        |

### Halaman yang BELUM punya System UI Templates

| Halaman       |   Perlu?   | Alasan                                         |
| :------------ | :--------: | :--------------------------------------------- |
| puzzle.html   |    ✅ Ya    | Butuh `CONFIRM_EXIT` modal + Toast untuk score |
| rhythm.html   |    ✅ Ya    | Butuh `CONFIRM_EXIT` modal + Toast             |
| summon.html   |    ✅ Ya    | Butuh `CONFIRM_EXIT` modal + Toast             |
| quiz.html     |    ✅ Ya    | Butuh Toast untuk jawaban benar/salah          |
| story.html    | 🟡 Opsional | Punya loading sendiri, mungkin perlu toast     |
| cutscene.html | 🟡 Opsional | Standalone, mungkin perlu toast                |
| register.html | 🟡 Opsional | Hanya form, bisa pakai toast untuk validasi    |
| detail.html   |  ❌ Tidak   | Punya modal custom sendiri                     |

### Modal Types — Gap Analysis

| Modal Type           | ALUR  | `system-ui.js` |  HTML Templates  |  Status   |
| :------------------- | :---: | :------------: | :--------------: | :-------: |
| `LEVEL_UP`           | 12.3  |  ✅ Supported   | ✅ Ada di 5 pages |   ✅ OK    |
| `BADGE_DETAIL`       | 12.2  |  ✅ Supported   | ✅ Ada di 5 pages |   ✅ OK    |
| `CONFIRM_EXIT`       | 12.5  |  ✅ Supported   | ✅ Ada di 5 pages |   ✅ OK    |
| `EDIT_NICKNAME`      | 12.1  |  ✅ Supported   | ✅ Ada di 5 pages |   ✅ OK    |
| `ACHIEVEMENT_UNLOCK` | 12.4  |  ✅ Supported*  | ❌ **TIDAK ADA**  | ❌ MISSING |
| `DAILY_QUEST`        |  17   | ❌ Not in store |   ❌ Tidak ada    | 🟡 Future  |

*`system-ui.js` `showModal()` bisa menerima type apapun, tapi tidak ada HTML template untuk render `ACHIEVEMENT_UNLOCK`.

---

## Proposed Changes

### Komponen 1: Fix `garden.html` Duplicates

#### [MODIFY] [garden.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/garden.html)

- **Hapus** duplikat System UI templates (blok kedua ~L665-L814)
- Pastikan hanya **1 set** templates yang tersisa (~L416-L550)
- Tambahkan `ACHIEVEMENT_UNLOCK` modal case ke template yang tersisa

---

### Komponen 2: Tambah `ACHIEVEMENT_UNLOCK` Modal Template

#### [MODIFY] Semua 5 halaman yang sudah punya templates

Tambahkan case baru `ACHIEVEMENT_UNLOCK` di dalam `<template x-if="$store.systemUI.modal.isOpen">`. Layout sesuai ALUR 12.4:

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

Files yang diubah:
- [index.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/index.html)
- [scan.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/scan.html)
- [profile.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/profile.html)
- [donate.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/donate.html)
- [garden.html](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/v3/garden.html)

---

### Komponen 3: Tambah System UI ke Game Pages (Opsional — butuh persetujuan)

Jika disetujui, berikut yang ditambahkan ke setiap game page:

#### [MODIFY] puzzle.html, rhythm.html, summon.html, quiz.html

Untuk setiap file:
1. Tambah `<script src="js/v3/components/system-ui.js"></script>` di `<head>`
2. Tambah `<link rel="stylesheet" href="css/system-ui.css">` di `<head>`
3. Tambah System UI templates (Toast + Modal + Loading + Error) sebelum `</body>`

> [!IMPORTANT]
> Game pages ini sudah punya logika internal masing-masing. Kita **HANYA** menambahkan template — **tidak mengubah** logika game yang sudah ada.

---

### Komponen 4: CSS Enhancement untuk `ACHIEVEMENT_UNLOCK`

#### [MODIFY] [system-ui.css](file:///c:/Users/Pongo/OneDrive%20-%20umkt.ac.id/Dokumen/Project/talking-forest-v2%20-%20Uji%20Coba/public/css/system-ui.css)

Tambah style khusus untuk Achievement Unlock modal (mirip Level Up tapi dengan warna badge):

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

---

## Verification Plan

### Manual Verification
Setelah implementasi, buka setiap halaman dan test:
1. **Toast**: Panggil `Alpine.store('systemUI').showToast('Test', 'success')` dari console
2. **Modal LEVEL_UP**: Panggil `Alpine.store('systemUI').showModal('LEVEL_UP', {level: 5})`
3. **Modal ACHIEVEMENT_UNLOCK**: Panggil `Alpine.store('systemUI').showModal('ACHIEVEMENT_UNLOCK', {badge: {icon: '🧩', name: 'Master Puzzle', description: 'Selesaikan 10 puzzle'}, xp: 50})`
4. **Modal CONFIRM_EXIT**: Panggil `Alpine.store('systemUI').showModal('CONFIRM_EXIT')`
5. **Loading**: Panggil `Alpine.store('systemUI').setLoading(true, 'Testing...')`
6. **Error**: Panggil `Alpine.store('systemUI').showError('TEST', 'Test error message')`

### Checklist per Halaman
- [ ] `garden.html` — duplikat dihapus, 1 set template, ACHIEVEMENT_UNLOCK ditambah
- [ ] `index.html` — ACHIEVEMENT_UNLOCK ditambah
- [ ] `scan.html` — ACHIEVEMENT_UNLOCK ditambah
- [ ] `profile.html` — ACHIEVEMENT_UNLOCK ditambah
- [ ] `donate.html` — ACHIEVEMENT_UNLOCK ditambah
- [ ] Game pages (jika disetujui) — templates ditambahkan

# 🤖 ATURAN UNTUK AI ASSISTANT
## Rules for AI when Editing Talking Forest Project

---

## ⚠️ ATURAN WAJIB

Dokumen ini harus dibaca oleh AI sebelum melakukan editing pada project ini.

---

## 📋 ATURAN UTAMA

### 1. PERTAHANKAN SEMUA KOMENTAR TUTORIAL

**JANGAN PERNAH** menghapus komentar berikut:

```html
<!-- ================================================ -->
<!-- ✅ ZONA EDIT: [NAMA]                             -->
<!-- Boleh ganti: [DESKRIPSI]                        -->
<!-- ================================================ -->

<!-- ✅ EDIT: [INSTRUKSI] -->

<!-- ❌ JANGAN edit [BAGIAN] -->
```

### 2. JANGAN EDIT ALPINE.JS ATTRIBUTES

Atribut berikut TIDAK BOLEH diubah:

```html
x-data="..."
x-if="..."
x-show="..."
x-for="..."
x-text="..."
x-model="..."
@click="..."
@change="..."
:src="..."
:class="..."
:style="..."
```

### 3. JANGAN EDIT JAVASCRIPT FILES

File-file di folder `js/v3/` TIDAK BOLEH diubah:
- `game-state.js`
- `player-api.js`
- `dialog-engine.js`
- `story-engine.js`
- `scan-logic.js`

### 4. JANGAN EDIT STRUKTUR JSON

Saat edit `dialogs.json`:
- ✅ BOLEH edit isi `"text": "..."`
- ✅ BOLEH edit isi `"mood": "..."`
- ❌ JANGAN hapus `"id": ...`
- ❌ JANGAN hapus `"scene": ...`
- ❌ JANGAN hapus tanda kurung `{}` `[]`
- ❌ JANGAN hapus koma `,`

---

## 📝 FORMAT KOMENTAR YANG HARUS DIGUNAKAN

### Untuk Bagian yang BOLEH Diedit:

```html
<!-- ================================================ -->
<!-- ✅ ZONA EDIT: [NAMA BAGIAN]                      -->
<!-- Boleh ganti: [SEBUTKAN APA YANG BOLEH]          -->
<!-- ================================================ -->
<div>
    <!-- ✅ EDIT: [INSTRUKSI SPESIFIK] -->
    [KONTEN YANG BOLEH DIEDIT]
</div>
```

### Untuk Bagian yang TIDAK BOLEH Diedit:

```html
<!-- ❌ JANGAN edit [DESKRIPSI BAGIAN] -->
<div x-data="...">
    ...
</div>
```

### Untuk CSS:

```css
/* ================================================ */
/* ✅ ZONA EDIT: [NAMA BAGIAN]                      */
/* Boleh ganti: [DESKRIPSI]                         */
/* ================================================ */

/* ✅ EDIT: Ganti kode warna */
.class-name {
    color: #2d6a4f;
}
```

---

## 🗣️ BAHASA KOMENTAR

- Semua komentar HARUS dalam **Bahasa Indonesia**
- Gunakan bahasa yang sederhana dan mudah dipahami
- Hindari istilah teknis yang sulit

**Contoh BENAR:**
```html
<!-- ✅ EDIT: Ganti teks tombol di bawah ini -->
```

**Contoh SALAH:**
```html
<!-- Edit the button text below -->
```

---

## 🎯 SAAT MENAMBAH FITUR BARU

### Langkah yang HARUS diikuti:

1. Tambahkan komentar `<!-- ✅ ZONA EDIT -->` untuk bagian yang boleh diedit
2. Tambahkan komentar `<!-- ❌ JANGAN -->` untuk bagian logika
3. Gunakan format yang sama dengan yang sudah ada
4. Jangan ubah struktur file yang ada

### Contoh Penambahan Tombol Baru:

```html
<!-- ================================================ -->
<!-- ✅ ZONA EDIT: TOMBOL BANTUAN                     -->
<!-- Boleh ganti: Teks tombol, emoji, warna          -->
<!-- ================================================ -->
<!-- ❌ JANGAN edit @click -->
<button @click="showHelp()" class="bg-forest text-white px-4 py-2 rounded-lg">
    <!-- ✅ EDIT: Ganti teks tombol -->
    🆘 BANTUAN
</button>
```

---

## 📊 REFERENSI WARNA

| Nama      | Kode Hex  | Tailwind Class             |
| :-------- | :-------- | :------------------------- |
| Forest    | `#2d6a4f` | `bg-forest`, `text-forest` |
| Earth     | `#603813` | `bg-earth`, `text-earth`   |
| Gold      | `#ffd700` | `bg-gold`, `text-gold`     |
| Parchment | `#fdf6e3` | `bg-parchment`             |

---

## 📊 REFERENSI MOOD (dialogs.json)

| Mood        | Arti   | Gambar              |
| :---------- | :----- | :------------------ |
| `"happy"`   | Senang | `rimba-happy.png`   |
| `"sad"`     | Sedih  | `rimba-sad.png`     |
| `"shock"`   | Kaget  | `rimba-shock.png`   |
| `"neutral"` | Biasa  | `rimba-neutral.png` |

---

## ✅ CHECKLIST SEBELUM SELESAI

Sebelum memberikan output, AI harus memastikan:

- [ ] Semua komentar `<!-- ✅ ZONA EDIT -->` masih ada
- [ ] Semua komentar `<!-- ❌ JANGAN -->` masih ada
- [ ] Tidak ada atribut Alpine.js yang berubah
- [ ] Tidak ada file JavaScript yang diubah
- [ ] Semua komentar dalam Bahasa Indonesia

---

## 🚨 JIKA RAGU

Jika AI tidak yakin apakah suatu bagian boleh diedit:
1. **JANGAN** edit bagian tersebut
2. Informasikan ke user bahwa bagian itu memerlukan konfirmasi
3. Sarankan user untuk menghubungi Developer

---

*Aturan ini dibuat untuk menjaga konsistensi project*
*Dari Developer Talking Forest*

# 🗺️ PETA ZONA EDIT
## Panduan Lengkap Apa yang BOLEH dan TIDAK BOLEH Diedit - Untuk Naju

---

## 👋 HAI NAJU!

Ini adalah **peta lengkap** yang menunjukkan bagian mana yang boleh Naju edit dan mana yang jangan disentuh.

Kalau masih ragu, cari tanda **✅** (boleh) atau **❌** (jangan) di file kodenya ya!

---

## ⚠️ ATURAN UTAMA

### ✅ BOLEH EDIT:
- Teks yang terlihat di layar
- Kode warna (format `#XXXXXX`)
- Ukuran dan jarak (class Tailwind)
- Gambar (ganti dengan nama sama)
- Emoji

### ❌ JANGAN EDIT:
- Kode dalam `<script>...</script>`
- Atribut `x-data`, `x-if`, `@click`
- Nama file
- Tanda kurung `{}` `[]`
- Tanda koma `,` dan titik dua `:`

---

# 📄 FILE: index.html (Halaman Utama)

## ZONA 1: JUDUL APLIKASI

**Lokasi:** Cari `ZONA EDIT 1` atau teks "Talking Forest"

```html
<!-- ✅ EDIT: Ganti judul -->
<h1>Talking Forest</h1>

<!-- ✅ EDIT: Ganti tagline -->
<p>Petualangan Menjaga Hutan Borneo</p>
```

**Naju bisa:**
- Ganti "Talking Forest" → Nama lain
- Ganti tagline → Deskripsi lain
- Ubah ukuran teks (`text-4xl` → `text-5xl`)

---

## ZONA 2: FORM INPUT NAMA

**Lokasi:** Cari "Ketik Namamu" atau `ZONA EDIT 2`

```html
<!-- ✅ EDIT: Ganti placeholder -->
<input placeholder="Ketik Namamu...">

<!-- ✅ EDIT: Ganti teks tombol -->
<button>MULAI PETUALANGAN</button>
```

**Naju bisa:**
- Ganti "Ketik Namamu..." → Teks lain
- Ganti "MULAI PETUALANGAN" → Teks lain
- Ganti emoji ▶ → Emoji lain

---

## ZONA 3: TOMBOL GENDER

**Lokasi:** Cari "Putra" atau "Putri"

```html
<!-- ✅ EDIT: Ganti label -->
<span>♂️</span><span>Putra</span>
<span>♀️</span><span>Putri</span>
```

**Naju bisa:**
- Ganti "Putra" → "Laki-laki", "Cowok"
- Ganti "Putri" → "Perempuan", "Cewek"
- Ganti emoji

---

# 📄 FILE: scan.html (Halaman Scan)

## ZONA 1: HEADER

```html
<!-- ✅ EDIT: Ganti judul halaman -->
<h1>JELAJAH</h1>
```

## ZONA 2: TOMBOL SCAN

```html
<!-- ✅ EDIT: Ganti emoji dan teks -->
<span>📷</span>
<span>SCAN QR CODE</span>
```

## ZONA 3: TEKS KABUT

```html
<!-- ✅ EDIT: Ganti teks -->
<div>🌫️</div>
<h3>AWAS KABUT!</h3>
<p>(Ketuk terus untuk mengusir kabut)</p>
```

---

# 📄 FILE: story.html (Halaman Cerita)

## ZONA 1: TEKS LOADING

```html
<!-- ✅ EDIT: Ganti emoji dan teks -->
<div>🌿</div>
<p>MEMUAT CERITA...</p>
```

## ZONA 2: HELPER TEXT

```html
<!-- ✅ EDIT: Ganti petunjuk -->
<div>(Ketuk layar untuk lanjut)</div>
```

## ⚠️ DIALOG

**Dialog TIDAK diedit di story.html!**
Edit di file: `assets/data/dialogs.json`

---

# 📄 FILE: puzzle.html (Halaman Puzzle)

## ZONA 1: JUDUL

```html
<!-- ✅ EDIT: Ganti judul dan emoji -->
<div>🧩</div>
<h1>PUZZLE MODE</h1>
<p>Masuk ke dalam dimensi waktu pohon...</p>
```

## ZONA 2: TOMBOL KEMBALI

```html
<!-- ✅ EDIT: Ganti teks tombol -->
<a>KEMBALI KE MARKAS</a>
```

---

# 📄 FILE: css/game.css (Styling)

## ZONA: WARNA

```css
/* ✅ EDIT: Ganti kode warna */
.bg-parchment { background-color: #fdf6e3; } /* Krem */
.text-forest { color: #2d6a4f; }              /* Hijau */
.text-earth { color: #603813; }               /* Coklat */
.bg-gold { background-color: #ffd700; }       /* Emas */
```

## ZONA: FONT

```css
/* ✅ EDIT: Ganti nama font */
body { font-family: 'Bakso Sapi', cursive; }
```

---

# 📄 FILE: dialogs.json (Teks Dialog)

## ✅ BOLEH EDIT:

```json
{
    "text": "Halo, selamat datang!",  ← EDIT INI
    "mood": "happy"                    ← EDIT INI
}
```

## ❌ JANGAN EDIT:

```json
{
    "id": 1,              ← JANGAN
    "scene": "intro"      ← JANGAN
}
```

---

# 🚨 ZONA BAHAYA

Bagian-bagian ini JANGAN disentuh:

| Kode                   | Alasan          | Contoh                   |
| :--------------------- | :-------------- | :----------------------- |
| `x-data="..."`         | Alpine.js logic | `x-data="gameLogic"`     |
| `x-if="..."`           | Conditional     | `x-if="gameState === 1"` |
| `@click="..."`         | Event klik      | `@click="startGame()"`   |
| `:src="..."`           | Dynamic image   | `:src="getAvatar()"`     |
| `:class="..."`         | Dynamic class   | `:class="isActive"`      |
| `<script>...</script>` | Kode program    | Semua isi script         |

---

# 🎨 IDE TEMA WARNA

## Mau Tema Baru?

Ganti semua warna ini di `game.css`:

### Tema Original (Hutan)
- Forest: `#2d6a4f`
- Earth: `#603813`
- Gold: `#ffd700`

### Tema Ocean (Laut)
- Forest → `#1565C0`
- Earth → `#37474F`
- Gold → `#4DD0E1`

### Tema Sunset (Matahari Terbenam)
- Forest → `#E64A19`
- Earth → `#4E342E`
- Gold → `#FFB300`

---

## 📋 CHECKLIST NAJU

Sebelum save, cek:

- [ ] Hanya edit bagian yang ada tanda ✅
- [ ] Tidak hapus tanda kurung atau koma
- [ ] Sudah backup file asli
- [ ] Sudah test di preview

---

## 🆘 NAJU BINGUNG?

Screenshot bagian yang mau diedit dan kirim ke aku (Developer)!

Aku akan kasih tahu persis kode mana yang harus diganti 😊

---

*Peta Zona Edit untuk Naju*
*Dari Developer dengan ❤️*

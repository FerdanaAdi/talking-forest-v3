# 📐 PANDUAN UBAH LAYOUT
## Cara Mengubah Posisi, Ukuran, dan Tampilan - Khusus untuk Naju

---

## 👋 HAI NAJU!

Panduan ini untuk mengubah **layout** (tata letak) website.
Ini agak lebih tricky dari edit teks, tapi tenang... aku jelaskan pelan-pelan! 😊

---

## ❓ APA ITU LAYOUT?

**Layout** = Bagaimana elemen-elemen ditata di layar.

Contoh:
- Tombol di tengah atau di pinggir?
- Jarak antar elemen berapa?
- Ukuran kotak berapa besar?

---

## 🤔 DIMANA MENGUBAH LAYOUT?

Layout diatur di **2 tempat**:

| Tempat      | File                           | Apa yang Diatur       |
| :---------- | :----------------------------- | :-------------------- |
| **Di HTML** | `index.html`, `scan.html`, dll | Posisi, ukuran elemen |
| **Di CSS**  | `css/game.css`                 | Warna, font, animasi  |

---

## 🧩 TENTANG TAILWIND CSS

Project ini pakai **Tailwind CSS**.

**Apa itu?** 
Tailwind = cara ngatur tampilan langsung di HTML pakai `class="..."`.

**Contoh:**
```html
<div class="w-full h-20 bg-green-500 text-white p-4">
    Ini kotak hijau
</div>
```

**Artinya:**
- `w-full` = Lebar penuh (100%)
- `h-20` = Tinggi 80 piksel
- `bg-green-500` = Background hijau
- `text-white` = Teks putih
- `p-4` = Padding (jarak dalam) 16 piksel

---

## 📏 KODE UKURAN (Width & Height)

### Lebar (Width = `w-...`)

| Kode     | Artinya    | Contoh Pakai          |
| :------- | :--------- | :-------------------- |
| `w-full` | 100% lebar | Tombol memenuhi layar |
| `w-1/2`  | 50% lebar  | Setengah layar        |
| `w-1/3`  | 33% lebar  | Sepertiga layar       |
| `w-20`   | 80 piksel  | Ukuran tetap          |
| `w-40`   | 160 piksel | Ukuran tetap          |

### Tinggi (Height = `h-...`)

| Kode       | Artinya           |
| :--------- | :---------------- |
| `h-full`   | 100% tinggi       |
| `h-screen` | Setinggi layar HP |
| `h-20`     | 80 piksel         |
| `h-40`     | 160 piksel        |

### Contoh Edit:

**Mau tombol lebih besar?**
```html
<!-- SEBELUM: h-10 (40 piksel) -->
<button class="h-10 ...">Mulai</button>

<!-- SESUDAH: h-14 (56 piksel) -->
<button class="h-14 ...">Mulai</button>
```

---

## 📍 KODE JARAK (Margin & Padding)

### Margin = Jarak LUAR (ke elemen lain)

| Kode   | Artinya                            |
| :----- | :--------------------------------- |
| `m-4`  | Jarak semua sisi 16 piksel         |
| `mt-4` | Jarak **atas** (Top) 16 piksel     |
| `mb-4` | Jarak **bawah** (Bottom) 16 piksel |
| `ml-4` | Jarak **kiri** (Left) 16 piksel    |
| `mr-4` | Jarak **kanan** (Right) 16 piksel  |
| `mx-4` | Jarak kiri + kanan 16 piksel       |
| `my-4` | Jarak atas + bawah 16 piksel       |

### Padding = Jarak DALAM (isi ke tepi kotak)

| Kode   | Artinya                        |
| :----- | :----------------------------- |
| `p-4`  | Padding semua sisi 16 piksel   |
| `pt-4` | Padding atas 16 piksel         |
| `pb-4` | Padding bawah 16 piksel        |
| `px-4` | Padding kiri + kanan 16 piksel |
| `py-4` | Padding atas + bawah 16 piksel |

### Gambaran Margin vs Padding:

```
┌─────────────────────────────────┐
│         ↑ MARGIN ↑              │
│  ┌──────────────────────────┐   │
│  │     ↑ PADDING ↑          │   │
│ M│  P                    P  │M  │
│ A│  A    [ISI KONTEN]    D  │A  │
│ R│  D                    D  │R  │
│ G│  D    ↓ PADDING ↓     I  │G  │
│ I│  I                    N  │I  │
│ N│  N                    G  │N  │
│  └──────────────────────────┘   │
│         ↓ MARGIN ↓              │
└─────────────────────────────────┘
```

---

## 🔲 KODE POSISI (Flexbox)

### Arah Susunan

| Kode       | Artinya      | Gambaran          |
| :--------- | :----------- | :---------------- |
| `flex-row` | Horizontal → | [A] [B] [C]       |
| `flex-col` | Vertikal ↓   | [A]<br>[B]<br>[C] |

### Posisi di Tengah

| Kode             | Artinya                        |
| :--------------- | :----------------------------- |
| `items-center`   | Tengah vertikal (atas-bawah)   |
| `justify-center` | Tengah horizontal (kiri-kanan) |
| `text-center`    | Teks di tengah                 |

### Contoh Bikin Konten di Tengah:

```html
<div class="flex items-center justify-center">
    <p>Ini di tengah!</p>
</div>
```

---

## 🔤 KODE UKURAN TEKS

| Kode        | Ukuran    | Dipakai Untuk     |
| :---------- | :-------- | :---------------- |
| `text-xs`   | 12 piksel | Teks kecil banget |
| `text-sm`   | 14 piksel | Teks kecil        |
| `text-base` | 16 piksel | Teks normal       |
| `text-lg`   | 18 piksel | Agak besar        |
| `text-xl`   | 20 piksel | Besar             |
| `text-2xl`  | 24 piksel | Lebih besar       |
| `text-3xl`  | 30 piksel | Sangat besar      |
| `text-4xl`  | 36 piksel | Jumbo             |

### Contoh:
```html
<!-- Mau judul lebih besar -->
<h1 class="text-2xl ...">Judul</h1>

<!-- Ganti jadi: -->
<h1 class="text-4xl ...">Judul</h1>
```

---

## 🔍 CARA MENCARI YANG MAU DIEDIT

1. Buka file HTML (contoh: `index.html`)
2. Tekan **Ctrl + F**
3. Ketik teks yang tampil di layar
4. Temukan elemennya
5. Edit `class="..."` nya

**Atau cari tanda:** `<!-- ✅ ZONA EDIT -->`

---

## ✅ YANG BOLEH DIEDIT

| Kode             | Aman Diedit             |
| :--------------- | :---------------------- |
| `w-...`, `h-...` | ✅ Ya (ukuran)           |
| `p-...`, `m-...` | ✅ Ya (jarak)            |
| `text-...`       | ✅ Ya (ukuran teks)      |
| `bg-...`         | ✅ Ya (warna background) |
| `text-...` warna | ✅ Ya (warna teks)       |

## ❌ JANGAN DIEDIT

| Kode             | Alasan                  |
| :--------------- | :---------------------- |
| `x-data`, `x-if` | Itu Alpine.js (program) |
| `@click`         | Itu event klik          |
| `:src`, `:class` | Itu dinamis             |
| `flex`, `grid`   | Struktur layout utama   |

---

## 📋 CONTOH EDIT LENGKAP

### Naju mau tombol lebih lebar dan tinggi:

**SEBELUM:**
```html
<button class="w-40 h-10 bg-forest text-white">
    MULAI
</button>
```

**SESUDAH:**
```html
<button class="w-60 h-14 bg-forest text-white">
    MULAI
</button>
```

**Yang berubah:** `w-40` → `w-60`, `h-10` → `h-14`

---

## 🌐 REFERENSI LENGKAP

Kalau Naju mau lihat semua kode Tailwind:
👉 [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## 💡 TIPS DARI DEVELOPER

1. **Edit sedikit-sedikit** - ubah satu kode, lihat hasilnya
2. **Jangan hapus class yang ada** - tambah atau ganti saja
3. **Pakai Ctrl+Z** kalau salah - undo perubahan
4. **Tanya aku** kalau bingung!

---

## 🆘 NAJU BINGUNG?

Screenshot bagian yang mau diubah dan kirim ke aku (Developer)!

Aku akan kasih tahu kode mana yang perlu diedit 😊

---

*Panduan layout untuk Naju*
*Dari Developer dengan ❤️*

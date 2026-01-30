# 📖 PANDUAN EDIT FILE DATA
## Untuk Naju - Folder: public/assets/data/

---

## 📂 FILE DI FOLDER INI

| File           | Fungsi                     |
| :------------- | :------------------------- |
| `species.json` | Data pohon, tanaman, hewan |
| `dialogs.json` | Dialog Rimba (maskot)      |
| `quizzes.json` | Soal-soal kuis             |
| `puzzles.json` | Konfigurasi puzzle         |

---

## 🌳 SPECIES.JSON

### Struktur Data:
```
{
  "id": "...",           ← JANGAN EDIT (kunci unik)
  "name": "...",         ← BOLEH EDIT (nama tampil)
  "type": "...",         ← JANGAN EDIT
  "mechanic": "...",     ← JANGAN EDIT
  "description": "...",  ← BOLEH EDIT
  "anatomy": [...],      ← BOLEH EDIT isi "fact"
  "story": {...},        ← BOLEH EDIT semua
  "assets": {...}        ← HATI-HATI (path gambar)
}
```

### Contoh Edit Fakta:
**SEBELUM:**
```json
"fact": "Akar menyerap air."
```

**SESUDAH:**
```json
"fact": "Akar itu seperti sedotan raksasa! Dia minum air dari dalam tanah 💧"
```

---

## 💬 DIALOGS.JSON

### Struktur Data:
```
{
  "id": "...",      ← JANGAN EDIT
  "scene": "...",   ← JANGAN EDIT
  "text": "...",    ← BOLEH EDIT (isi dialog)
  "mood": "..."     ← BOLEH EDIT (ekspresi)
}
```

### Mood yang Tersedia:
- `"happy"` - Senang 😊
- `"sad"` - Sedih 😢
- `"curious"` - Penasaran 🤔
- `"excited"` - Gembira 🎉
- `"worried"` - Khawatir 😟

---

## ❓ QUIZZES.JSON

### Struktur Data:
```
{
  "species_id": "...",     ← JANGAN EDIT
  "question": "...",       ← BOLEH EDIT
  "options": ["A","B","C"], ← BOLEH EDIT
  "answer": "B",           ← BOLEH EDIT (huruf A/B/C/D)
  "explanation": "..."     ← BOLEH EDIT
}
```

### Contoh Soal:
```json
{
  "species_id": "mangga_kakek",
  "question": "Bagian pohon yang menyerap air adalah?",
  "options": ["Daun", "Akar", "Batang", "Bunga"],
  "answer": "B",
  "explanation": "Akar menyerap air dan nutrisi dari tanah!"
}
```

---

## ⚠️ ATURAN PENTING

1. **Jangan hapus tanda kutip** `"..."` di sekitar teks
2. **Jangan hapus koma** `,` di akhir baris (kecuali baris terakhir)
3. **Jangan hapus kurung** `{...}` atau `[...]`
4. **Simpan dengan encoding UTF-8** (default di VS Code)

---

## 🔧 KALAU ERROR

1. Buka [jsonlint.com](https://jsonlint.com)
2. Copy-paste isi file JSON
3. Klik "Validate JSON"
4. Lihat baris mana yang error
5. Perbaiki dan save ulang

---

*Panduan Data JSON - Talking Forest V3*

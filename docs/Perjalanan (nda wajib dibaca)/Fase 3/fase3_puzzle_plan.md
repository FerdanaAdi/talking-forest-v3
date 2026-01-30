# 🧩 FASE 3: PUZZLE MECHANICS
## Implementation Plan & Checklist

---

## 📋 RINGKASAN FASE 3

**Tujuan:** Membangun mekanik puzzle berdasarkan tipe spesies
**Durasi Estimasi:** 3-5 hari kerja

### 3 Tipe Mekanik Berdasarkan Kategori:

| Kategori               | Mekanik     | File JS     | Gameplay                                |
| :--------------------- | :---------- | :---------- | :-------------------------------------- |
| 🌳 **Pohon (Tree)**     | Drag & Drop | `puzzle.js` | Susun bagian pohon (akar, batang, daun) |
| 🌸 **Tanaman (Flower)** | Rhythm Tap  | `rhythm.js` | Ketuk urutan seperti Simon Says         |
| 🦎 **Hewan (Animal)**   | Sound Match | `summon.js` | Cocokkan suara dengan bayangan          |

---

## 📂 STRUKTUR FILE YANG AKAN DIBUAT

```
📂 public/
│
├── 📄 puzzle.html              ← UI UTAMA PUZZLE
│
└── 📂 js/v3/
    └── 📂 mechanics/           ← FOLDER BARU!
        ├── 📄 puzzle.js        ← Drag & Drop (Pohon)
        ├── 📄 rhythm.js        ← Sequence Tap (Tanaman)
        └── 📄 summon.js        ← Sound Match (Hewan)
```

---

## ✅ CHECKLIST IMPLEMENTASI

### PERSIAPAN (Hari 1)

- [ ] **Buat folder** `js/v3/mechanics/`
- [ ] **Update species.json** dengan field baru:
  ```json
  {
    "mechanic": "puzzle|rhythm|summon",
    "parts": ["akar", "batang", "daun"],
    "sounds": ["suara1.mp3", "suara2.mp3"]
  }
  ```
- [ ] **Siapkan assets**:
  - [ ] Gambar parts pohon (PNG transparan)
  - [ ] Audio untuk rhythm game
  - [ ] Audio suara hewan

---

### MEKANIK 1: DRAG & DROP PUZZLE (Pohon) ⭐ PRIORITAS

**File:** `js/v3/mechanics/puzzle.js`

#### Checklist Coding:

- [ ] Setup drop zones (akar, batang, daun)
- [ ] Setup draggable inventory items
- [ ] Implement drag start/end events
- [ ] Implement drop validation
- [ ] Visual feedback (benar/salah)
- [ ] Completion check
- [ ] XP reward on complete
- [ ] Fact card popup per bagian

#### Komponen UI (puzzle.html):

- [ ] Drop Zone Area (siluet pohon)
- [ ] Inventory Panel (bagian-bagian)
- [ ] Progress indicator (0/3 bagian)
- [ ] Hint button
- [ ] Fact card modal

#### Referensi & Library:

| Library          | Link                                                                                         | Kegunaan           |
| :--------------- | :------------------------------------------------------------------------------------------- | :----------------- |
| **SortableJS**   | [github.com/SortableJS/Sortable](https://github.com/SortableJS/Sortable)                     | Drag & drop smooth |
| **Native HTML5** | [MDN Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) | Tanpa library      |
| **Interact.js**  | [interactjs.io](https://interactjs.io/)                                                      | Touch-friendly     |

---

### MEKANIK 2: RHYTHM TAP (Tanaman)

**File:** `js/v3/mechanics/rhythm.js`

#### Checklist Coding:

- [ ] Generate random sequence (3-5 langkah)
- [ ] Show sequence animation
- [ ] Capture user input
- [ ] Validate sequence
- [ ] Visual feedback per tap
- [ ] Difficulty progression
- [ ] Success/fail handling

#### Komponen UI:

- [ ] 4 tombol warna/simbol
- [ ] Sequence display indicator
- [ ] "Watch" phase animation
- [ ] "Your turn" indicator

#### Referensi:

| Repo            | Link                                                               | Stars         |
| :-------------- | :----------------------------------------------------------------- | :------------ |
| Simon Game JS   | [Search GitHub](https://github.com/search?q=simon+says+javascript) | Banyak contoh |
| Memory Sequence | [Search GitHub](https://github.com/search?q=memory+sequence+game)  | Mirip konsep  |

---

### MEKANIK 3: SOUND MATCH (Hewan)

**File:** `js/v3/mechanics/summon.js`

#### Checklist Coding:

- [ ] Load audio files
- [ ] Play sound on trigger
- [ ] Show silhouette options
- [ ] Capture user selection
- [ ] Validate answer
- [ ] Reveal animation
- [ ] Success reward

#### Komponen UI:

- [ ] Audio player (hidden)
- [ ] "Play Sound" button
- [ ] 3-4 silhouette choices
- [ ] Selected indicator
- [ ] Reveal animation

#### Referensi:

| Resource      | Link                                                                            |
| :------------ | :------------------------------------------------------------------------------ |
| Web Audio API | [MDN Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) |
| Howler.js     | [howlerjs.com](https://howlerjs.com/)                                           |

---

## 🖼️ UI MOCKUP: PUZZLE.HTML

### Layout Drag & Drop (Pohon)

```
┌─────────────────────────────────────────┐
│  ← KEMBALI         PUZZLE         ⏱️ 0:30│
├─────────────────────────────────────────┤
│                                         │
│         ┌─────────────────┐             │
│         │   🌿 DAUN       │ ← Drop Zone │
│         └─────────────────┘             │
│              │     │                    │
│         ┌─────────────────┐             │
│         │   🪵 BATANG     │ ← Drop Zone │
│         └─────────────────┘             │
│              │     │                    │
│         ┌─────────────────┐             │
│         │   🌱 AKAR       │ ← Drop Zone │
│         └─────────────────┘             │
│                                         │
├─────────────────────────────────────────┤
│  INVENTORY (Drag dari sini)             │
│  ┌────┐  ┌────┐  ┌────┐                │
│  │ 🌿 │  │ 🪵 │  │ 🌱 │                │
│  └────┘  └────┘  └────┘                │
│                                         │
│   [💡 HINT]           [✓ SELESAI]      │
└─────────────────────────────────────────┘
```

### Layout Rhythm (Tanaman)

```
┌─────────────────────────────────────────┐
│  ← KEMBALI        RHYTHM         🎵     │
├─────────────────────────────────────────┤
│                                         │
│            "PERHATIKAN URUTAN"          │
│                                         │
│         ┌────┐  ┌────┐                 │
│         │ 🔴 │  │ 🔵 │                 │
│         └────┘  └────┘                 │
│         ┌────┐  ┌────┐                 │
│         │ 🟢 │  │ 🟡 │                 │
│         └────┘  └────┘                 │
│                                         │
│   Progress: ⚪ ⚪ ⚪ ⚪ ⚪               │
│                                         │
│         [▶️ MULAI]                      │
└─────────────────────────────────────────┘
```

### Layout Sound Match (Hewan)

```
┌─────────────────────────────────────────┐
│  ← KEMBALI        SUARA         🔊     │
├─────────────────────────────────────────┤
│                                         │
│         [🔊 PUTAR SUARA]               │
│                                         │
│   "Siapa yang bersuara seperti ini?"   │
│                                         │
│   ┌─────┐  ┌─────┐  ┌─────┐           │
│   │ ??? │  │ ??? │  │ ??? │           │
│   │ 🦎  │  │ 🦜  │  │ 🐒  │           │
│   └─────┘  └─────┘  └─────┘           │
│                                         │
│         [✓ PILIH INI]                  │
└─────────────────────────────────────────┘
```

---

## 📊 UPDATE SPECIES.JSON

### Format Baru dengan Mechanics:

```json
{
  "mangga_01": {
    "name": "Pohon Mangga",
    "latin": "Mangifera indica",
    "category": "tree",
    "mechanic": "puzzle",
    "puzzle": {
      "parts": [
        {"id": "akar", "name": "Akar", "image": "parts/mangga_akar.png", "fact": "Akar mangga bisa mencapai 6 meter!"},
        {"id": "batang", "name": "Batang", "image": "parts/mangga_batang.png", "fact": "Batang mangga menghasilkan getah."},
        {"id": "daun", "name": "Daun", "image": "parts/mangga_daun.png", "fact": "Daun muda berwarna merah kecoklatan."}
      ]
    }
  },
  "anggrek_01": {
    "name": "Anggrek Hitam",
    "category": "flower",
    "mechanic": "rhythm",
    "rhythm": {
      "sequence_length": 4,
      "speed": "medium",
      "sounds": ["chime1.mp3", "chime2.mp3", "chime3.mp3", "chime4.mp3"]
    }
  },
  "orangutan_01": {
    "name": "Orang Utan",
    "category": "animal",
    "mechanic": "summon",
    "summon": {
      "correct_sound": "orangutan_call.mp3",
      "decoy_sounds": ["monkey.mp3", "bird.mp3"],
      "silhouette": "orangutan_silhouette.png"
    }
  }
}
```

---

## 🔗 LINK PENCARIAN GITHUB

### Drag & Drop:
```
https://github.com/search?q=drag+drop+puzzle+javascript+stars%3A%3E50&type=repositories
```

### Simon Says / Rhythm:
```
https://github.com/search?q=simon+says+javascript&type=repositories
```

### Audio Quiz:
```
https://github.com/search?q=audio+quiz+game+javascript&type=repositories
```

### GSAP Animations:
```
https://github.com/search?q=gsap+game+animation&type=repositories
```

---

## 📋 PRIORITAS PENGERJAAN

### Minggu 1: Core Mechanics

| Hari       | Task                                 | Output               |
| :--------- | :----------------------------------- | :------------------- |
| **Hari 1** | Setup struktur + update species.json | Folder + JSON ready  |
| **Hari 2** | Puzzle drag & drop (basic)           | puzzle.js working    |
| **Hari 3** | Puzzle UI + styling                  | puzzle.html complete |
| **Hari 4** | Rhythm mechanic                      | rhythm.js working    |
| **Hari 5** | Sound match mechanic                 | summon.js working    |

### Minggu 2: Polish & Integration

| Hari        | Task                              |
| :---------- | :-------------------------------- |
| **Hari 6**  | Fact cards + animations           |
| **Hari 7**  | Integration dengan scan.html flow |
| **Hari 8**  | Testing semua mekanik             |
| **Hari 9**  | Bug fixing + polish               |
| **Hari 10** | Final testing                     |

---

## 🎯 NEXT STEPS

1. **Kamu perlu cari/buat:**
   - [ ] Asset gambar parts pohon (PNG transparan)
   - [ ] Audio untuk rhythm game (4 suara berbeda)
   - [ ] Audio suara hewan (3-5 hewan)
   - [ ] Referensi drag & drop dari GitHub

2. **Aku akan bantu:**
   - [ ] Coding puzzle.js (drag & drop)
   - [ ] Update puzzle.html dengan UI lengkap
   - [ ] Coding rhythm.js dan summon.js
   - [ ] Integration dengan game flow

---

## 💬 PERTANYAAN UNTUKMU

1. **Mau mulai dari mekanik mana dulu?**
   - [ ] Drag & Drop (Pohon) - PALING UMUM
   - [ ] Rhythm (Tanaman)
   - [ ] Sound (Hewan)

2. **Sudah punya asset gambar parts pohon?**

3. **Sudah punya audio files?**

4. **Mau pakai library (SortableJS) atau native HTML5 drag?**

---

*Implementation Plan Fase 3*
*Dibuat: 28 Januari 2026*

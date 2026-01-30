# 🌳 SCENE 2: THE PULSE OF THE FOREST (TECHNICAL SPEC)
> **Goal:** Menciptakan pengalaman "Loading Screen" yang imersif dan naratif.

## 1. STATE MANAGEMENT PLAN (Alpine.js)
Kita akan menggunakan State Machine sederhana di `scan-logic.js`:

| State ID | Nama Visual    | Deskripsi Logic                                         |
| :------- | :------------- | :------------------------------------------------------ |
| `0`      | **IDLE**       | Menunggu input user / scan.                             |
| `1`      | **VALIDATING** | Sedang cek database ID.                                 |
| `2`      | **JOURNEY**    | Transisi lari, background parallax, pre-fetching asset. |
| `3`      | **ARRIVAL**    | Sampai di lokasi, asset sudah siap, muncul kabut.       |
| `4`      | **REVEAL**     | Kabut hilang, siluet glitch muncul.                     |
| `5`      | **DIAGNOSIS**  | Dialog Rimba, scan pulse, tombol action.                |

---

## 2. ASSET REQUIREMENTS
**A. Visual Assets**
1.  `bg-forest-seamless.webp` (Loopable horizontal).
2.  `char-rimba-run.png` (Sprite lari).
3.  `char-rimba-sad.png` (Sprite sedih).
4.  `vfx-fog.png` (Overlay transparan).
5.  `vfx-glitch-layers` (CSS generated).

**B. Audio Assets**
1.  `sfx-footsteps.mp3` (Loop).
2.  `sfx-glitch.mp3`.
3.  `bgm-forest-eerie.mp3` (Ambience).

---

## 3. IMPLEMENTATION DETAILS

### 3.1 Part 2.1: The Journey (GSAP Animation)
**Objective:** Membuat efek lari tanpa memindah kamera.
*   **Technique:** Infinite Scroll Background.
*   **GSAP Code Snippet (Concept):**
```javascript
// Infinite Loop Background
gsap.to(".bg-parallax", {
    xPercent: -100,
    ease: "none",
    duration: 10,
    repeat: -1
});

// Rimba Bounce (Run Cycle)
gsap.to(".rimba-sprite", {
    y: 10,
    yoyo: true,
    repeat: -1,
    duration: 0.3,
    ease: "power1.inOut"
});

// Grayscale Transition
gsap.to("body", {
    filter: "grayscale(100%)",
    duration: 4, // Durasi loading
    ease: "power2.in"
});
```

### 3.2 Asset Pre-loading logic
Sambil animasi berjalan, script akan melakukan fetch di background:
```javascript
const preloadImage = (src) => new Promise(r => {
    const img = new Image();
    img.onload = r;
    img.src = src;
});
// Mainkan Rimba Lari...
await Promise.all([
    preloadImage(speciesData.image_real),
    preloadImage('assets/images/bg/specific_habitat.jpg')
]);
// Selesai Load -> Stop Lari -> Pindah State ARRIVAL
```

### 3.3 The Fog Mechanic
*   **Overlay**: Div `fixed inset-0` dengan gambar awan/kabut.
*   **Interaction**: User tap -> Opacity turun 33%.
*   **Completion**: Opacity 0 -> Remove Element -> Trigger REVEAL.

---

## 4. EXECUTION CHECKLIST (Simplified)
1.  [ ] **Setup GSAP**: Install/CDN GSAP library.
2.  [ ] **Asset Prep**: Kumpulkan/Generate aset dummy jika belum ada.
3.  [ ] **Refactor `scan.html`**: Siapkan container untuk Parallax BG, Fog, dan Scan UI.
4.  **Coding Phase**:
    *   [ ] Implement State Machine (`scan-logic.js`).
    *   [ ] Create Journey Animation (GSAP).
    *   [ ] Implement Fog Mechanic.
    *   [ ] Finalize Diagnosis UI & Glitch Effect.

/**
 * ============================================
 * 📄 FILE: public/js/v3/mechanics/puzzle.js
 * 🧩 FUNGSI: Logika Drag & Drop Puzzle
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini adalah "wasit" untuk game puzzle.
 * Tugasnya:
 * 1. Menyiapkan lapangan (tampilken gambar & kotak kosong).
 * 2. Mengawasi saat pemain menggeser (drag) potongan gambar.
 * 3. Mengecek apakah potongan ditaruh di tempat yang benar (drop).
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ Pesan debug (console.log)
 * ✅ Logika score/xp jika ingin diubah
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Logika touch event (handleTouchStart, dll)
 * ✗ Rumus posisi elemen
 *
 * ============================================
 */

export class PuzzleDragDrop {
    constructor(containerId, speciesData, onComplete) {
        // "Menyiapkan lapangan"
        this.container = document.getElementById(containerId);
        this.species = speciesData;
        this.onComplete = onComplete; // Fungsi yang dipanggil kalau menang
        this.parts = speciesData.anatomy; // Daftar bagian tubuh (akar, batang, daun)
        this.completedParts = 0; // Skor awal (belum ada yang jadi)

        this.init();
    }

    // Fungsi Mulai
    init() {
        console.log("🧩 Memulai Puzzle untuk:", this.species.name);
        this.renderUI();      // Gambar tampilan
        this.attachEvents();  // Pasang "cctv" buat memantau klik/drag
    }

    // Fungsi Membuat Tampilan (Render)
    renderUI() {
        this.container.innerHTML = ''; // Bersihkan area dulu

        // Buat kotak pembungkus utama
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col gap-6 w-full text-left bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md';

        // --- AREA DROP ZONE (Target/Sasaran) ---
        // Ini adalah tempat pemain menaruh potongan puzzle
        const zoneContainer = document.createElement('div');
        zoneContainer.className = 'flex flex-col gap-6 items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 relative min-h-[400px] shadow-inner transition-all duration-500';

        // Tambahkan Siluet Samar (Biar gampang nebaknya)
        if (this.species.assets && this.species.assets.siluet) {
            const siluetPath = this.species.assets.siluet.includes('/') ? this.species.assets.siluet : `assets/images/species/${this.species.assets.siluet}`;
            const siluetImg = document.createElement('img');
            siluetImg.src = siluetPath;
            siluetImg.className = 'absolute inset-0 w-full h-full object-contain opacity-20 pointer-events-none';
            zoneContainer.appendChild(siluetImg);
        }

        // Urutkan visual zona (Daun di atas, Akar di bawah)
        let visualParts = [...this.parts];
        if (this.species.type === 'tree') {
            visualParts.reverse(); // Balik urutan: Akar(0) -> Daun(2) jadi Daun->Akar
        }

        visualParts.forEach(part => {
            const zone = document.createElement('div');
            // Styling kotak zona (putus-putus)
            zone.className = 'w-32 h-32 border-2 border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center transition-all duration-300 bg-black/20 backdrop-blur-sm z-10 relative group hover:border-yellow-400/50';
            zone.dataset.partId = part.id; // "Kunci rahasia" zona ini
            zone.id = `zone-${part.id}`;

            // Isi zona kosong dengan tanda tanya
            zone.innerHTML = `
                <div class="text-4xl opacity-30 mb-2 group-hover:scale-110 transition">❓</div>
                <span class="text-xs text-white/50 pointer-events-none font-bold tracking-wider uppercase">${part.name}</span>
            `;

            // Pasang "sensor" drag
            zone.addEventListener('dragover', this.handleDragOver.bind(this));
            zone.addEventListener('dragleave', this.handleDragLeave.bind(this));
            zone.addEventListener('drop', this.handleDrop.bind(this));

            zoneContainer.appendChild(zone);

            // ➕ LAYOUT VISUAL: Tambahkan Garis Penghubung (Kecuali setelah elemen terakhir)
            // Biar mirip struktur pohon (Akar -> Batang -> Daun)
            if (visualParts.indexOf(part) < visualParts.length - 1) {
                const connector = document.createElement('div');
                connector.className = 'w-1 h-8 bg-white/30 rounded-full my-1'; // Garis batang
                zoneContainer.appendChild(connector);
            }
        });

        // --- AREA DRAGGABLE PARTS (Potongan Puzzle) ---
        // Ini adalah potongan yang bisa digeser-geser oleh pemain
        const partsContainer = document.createElement('div');
        partsContainer.className = 'flex flex-col gap-4 items-center justify-center p-4 bg-white/5 rounded-xl'; // Wrapper Utama: Vertikal (Buat Judul di atas)

        const titleParts = document.createElement('h3');
        titleParts.className = 'text-yellow-400 font-bold mb-2';
        titleParts.innerText = 'KOLEKSI BAGIAN';
        partsContainer.appendChild(titleParts);

        // Wrapper Baru: Horizontal untuk Item-Item Puzzle
        const itemsWrapper = document.createElement('div');
        itemsWrapper.className = 'flex flex-row gap-4 flex-wrap justify-center'; // Item berjejer ke samping
        partsContainer.appendChild(itemsWrapper);

        // Acak urutan potongan biar seru
        const shuffledParts = [...this.parts].sort(() => Math.random() - 0.5);

        shuffledParts.forEach(part => {
            const partEl = document.createElement('div');
            partEl.className = 'w-24 h-24 bg-white/10 rounded-lg cursor-grab hover:scale-105 active:scale-95 transition-transform flex items-center justify-center p-2 shadow-lg border border-white/20 relative group';
            partEl.draggable = true; // Aktifkan fitur drag HTML5
            partEl.dataset.id = part.id;

            // Gambar Potongan
            const img = document.createElement('img');
            img.src = part.image;
            img.alt = part.name;
            img.className = 'w-full h-full object-contain pointer-events-none drop-shadow-md';
            partEl.appendChild(img);

            // 🆕 Fitur Popup Preview (Klik untuk info)
            // Kalau diklik, muncul info kecil (Tooltip)
            partEl.addEventListener('click', () => this.showPreviewPopup(part));

            // Event Drag (Desktop)
            partEl.addEventListener('dragstart', this.handleDragStart.bind(this));
            partEl.addEventListener('dragend', this.handleDragEnd.bind(this));

            // 📱 Event Touch (Mobile) - BARU!
            partEl.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
            partEl.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            partEl.addEventListener('touchend', this.handleTouchEnd.bind(this));

            itemsWrapper.appendChild(partEl); // Masukkan ke wrapper horizontal
        });

        wrapper.appendChild(zoneContainer);
        wrapper.appendChild(partsContainer);
        this.container.appendChild(wrapper);
    }

    attachEvents() {
        // Event listener tambahan jika perlu
    }

    // --- LOGIKA EVENT (Apa yang terjadi saat peman beraksi) ---

    // Saat mulai menggeser
    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id); // Simpan ID yang digeser
        e.target.classList.add('opacity-50', 'scale-90'); // Efek visual jadi transparan
        this.playAudio('sfx/pickup.mp3'); // 🔊 Sound Effect
    }

    // Saat selesai menggeser (lepas atau batal)
    handleDragEnd(e) {
        e.target.classList.remove('opacity-50', 'scale-90');
    }

    // ═══════════════════════════════════════════════════════════════════
    // 📱 TOUCH HANDLERS (Mobile Support) - BARU!
    // ═══════════════════════════════════════════════════════════════════

    // Saat jari MULAI menyentuh item
    handleTouchStart(e) {
        e.preventDefault(); // Cegah scroll saat drag
        const touch = e.touches[0];
        const target = e.currentTarget;

        // Simpan data ke object sementara
        this.touchData = {
            id: target.dataset.id,
            startX: touch.clientX,
            startY: touch.clientY,
            originalEl: target,
            clone: null
        };

        // Efek visual: item asli jadi transparan
        target.classList.add('opacity-50', 'scale-90');
        this.playAudio('sfx/pickup.mp3');

        // Buat "klon bayangan" yang mengikuti jari
        const clone = target.cloneNode(true);
        clone.id = 'touch-clone';
        clone.style.position = 'fixed';
        clone.style.left = `${touch.clientX - 40}px`;
        clone.style.top = `${touch.clientY - 40}px`;
        clone.style.width = '80px';
        clone.style.height = '80px';
        clone.style.zIndex = '9999';
        clone.style.pointerEvents = 'none';
        clone.style.opacity = '0.9';
        clone.style.transform = 'scale(1.2)';
        clone.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        clone.style.borderRadius = '12px';
        document.body.appendChild(clone);
        this.touchData.clone = clone;
    }

    // Saat jari BERGERAK (drag)
    handleTouchMove(e) {
        e.preventDefault();
        if (!this.touchData || !this.touchData.clone) return;

        const touch = e.touches[0];
        const clone = this.touchData.clone;

        // Pindahkan klon mengikuti jari
        clone.style.left = `${touch.clientX - 40}px`;
        clone.style.top = `${touch.clientY - 40}px`;

        // Cek apakah jari di atas drop zone? Kasih highlight
        const zones = document.querySelectorAll('[data-part-id]');
        zones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            const isOver = (
                touch.clientX >= rect.left &&
                touch.clientX <= rect.right &&
                touch.clientY >= rect.top &&
                touch.clientY <= rect.bottom
            );

            if (isOver) {
                zone.classList.add('border-yellow-400', 'bg-yellow-400/10');
            } else {
                zone.classList.remove('border-yellow-400', 'bg-yellow-400/10');
            }
        });
    }

    // Saat jari DIANGKAT (drop)
    handleTouchEnd(e) {
        if (!this.touchData) return;

        const { id, originalEl, clone } = this.touchData;

        // Hapus klon bayangan
        if (clone) clone.remove();

        // Kembalikan tampilan item asli
        originalEl.classList.remove('opacity-50', 'scale-90');

        // Ambil posisi terakhir jari
        const touch = e.changedTouches[0];
        const dropX = touch.clientX;
        const dropY = touch.clientY;

        // Cari zona yang terkena drop
        const zones = document.querySelectorAll('[data-part-id]');
        let targetZone = null;

        zones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            const isHit = (
                dropX >= rect.left &&
                dropX <= rect.right &&
                dropY >= rect.top &&
                dropY <= rect.bottom
            );
            if (isHit) targetZone = zone;
            zone.classList.remove('border-yellow-400', 'bg-yellow-400/10');
        });

        // Proses drop jika ada target
        if (targetZone) {
            const targetId = targetZone.dataset.partId;
            if (id === targetId) {
                this.handleSuccessDrop(targetZone, id);
            } else {
                this.handleWrongDrop(targetZone);
            }
        }

        // Bersihkan data
        this.touchData = null;
    }

    // Saat benda melayang di atas zona target
    handleDragOver(e) {
        e.preventDefault(); // Wajib! Izinkan drop di sini
        e.currentTarget.classList.add('border-yellow-400', 'bg-yellow-400/10'); // Highlight target
    }

    // Saat benda pergi dari zona target
    handleDragLeave(e) {
        e.currentTarget.classList.remove('border-yellow-400', 'bg-yellow-400/10'); // Hapus highlight
    }

    // Saat benda DILEPAS (DROP) di zona target
    handleDrop(e) {
        e.preventDefault();
        const zone = e.currentTarget;
        zone.classList.remove('border-yellow-400', 'bg-yellow-400/10');

        const draggedId = e.dataTransfer.getData('text/plain'); // Ambil ID benda yang didrop
        const targetId = zone.dataset.partId; // Ambil ID zona ini harusnya apa

        if (!draggedId) return;

        // CEK JAWABAN: BENAR ATAU SALAH?
        if (draggedId === targetId) {
            this.handleSuccessDrop(zone, draggedId);
        } else {
            this.handleWrongDrop(zone);
        }
    }

    // --- LOGIKA KEMENANGAN ---

    handleSuccessDrop(zone, partId) {
        // 1. Ubah Tampilan Zona (Jadi Hijau & Berisi Gambar)
        zone.classList.add('border-green-500', 'bg-green-500/20');
        zone.classList.remove('border-dashed', 'border-white/40');

        // Kloning node untuk menghapus event listener drop (biar gak bisa didrop lagi)
        const newZone = zone.cloneNode(true);
        zone.parentNode.replaceChild(newZone, zone);

        // Masukkan Gambar Asli
        const partData = this.parts.find(p => p.id === partId);
        newZone.innerHTML = `<img src="${partData.image}" class="w-full h-full object-contain p-2 drop-shadow-xl" id="img-${partId}">`;

        // ✨ Animasi Muncul (GSAP Elastic)
        gsap.from(`#img-${partId}`, {
            scale: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });

        // 🔊 Sound Effect: Benar!
        this.playAudio('sfx/drop_correct.mp3');

        // 🆕 Tampilkan Fakta Edukatif (Popup Detail)
        this.showDetailedFact(partData);

        // 2. Hapus Benda dari Inventory (Kanan)
        const originalDraggable = document.querySelector(`div[draggable][data-id="${partId}"]`);
        if (originalDraggable) {
            gsap.to(originalDraggable, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                onComplete: () => originalDraggable.remove()
            });
        }

        // 3. Cek Apakah Semua Sudah Terisi?
        this.completedParts++;
        if (this.completedParts === this.parts.length) {
            this.handlePuzzleComplete();
        }
    }

    // Kalau Salah Drop
    handleWrongDrop(zone) {
        // ❌ Visual Salah (Merah & Getar)
        zone.classList.add('bg-red-500/30', 'border-red-500');

        // Animasi Shake dengan GSAP
        gsap.to(zone, {
            x: 5,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
                zone.classList.remove('bg-red-500/30', 'border-red-500'); // Kembalikan warna
                gsap.set(zone, { x: 0 });
            }
        });

        // 🔊 Sound Effect: Salah!
        this.playAudio('sfx/drop_wrong.mp3');
        console.log("❌ Ups, salah kamar!");
    }

    // --- POPUPS & ANIMATION ---

    // 🆕 Popup Preview (Saat item diklik di inventory)
    showPreviewPopup(part) {
        // Cek user nganggur gak? Kalau lagi drag jangan muncul
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in';
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

        modal.innerHTML = `
            <div class="bg-gray-800 border-2 border-yellow-500 p-6 rounded-2xl max-w-sm w-full text-center shadow-2xl relative transform transition-all scale-95" id="preview-box">
                <button onclick="this.parentElement.parentElement.remove()" class="absolute top-2 right-2 text-gray-400 hover:text-white">✕</button>
                <div class="bg-white/10 p-4 rounded-xl mb-4 inline-block">
                    <img src="${part.image}" class="w-32 h-32 object-contain">
                </div>
                <h3 class="text-xl font-bold text-yellow-400 mb-2">${part.name}</h3>
                <p class="text-gray-300 text-sm">Tarik gambar ini ke kotak yang pas ya!</p>
                <div class="mt-4 text-xs text-blue-400">💡 Klik di luar untuk tutup</div>
            </div>
        `;
        document.body.appendChild(modal);

        // Animasi pop-up
        gsap.to('#preview-box', { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
    }

    // 🆕 Popup Fakta Detail (Saat jawaban benar)
    showDetailedFact(part) {
        let toast = document.getElementById('fact-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'fact-toast';
            toast.className = 'fixed top-24 left-1/2 transform -translate-x-1/2 bg-blue-900/95 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-start gap-4 border border-blue-400 max-w-md w-[90%]';
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="text-3xl animate-bounce">💡</div>
            <div>
                <h4 class="font-bold text-yellow-300 text-sm uppercase mb-1">${part.name} BENAR!</h4>
                <p class="text-sm leading-relaxed">${part.fact || "Bagian ini penting lho!"}</p>
            </div>
        `;

        // Animasi Masuk
        gsap.fromTo(toast,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );

        // Hilang otomatis
        setTimeout(() => {
            gsap.to(toast, { y: -50, opacity: 0, duration: 0.5, onComplete: () => toast.remove() });
        }, 5000);
    }

    // ✨ Animasi Penggabungan (Merge Animation)
    handlePuzzleComplete() {
        console.log("🎉 PUZZLE SELESAI!");

        // 1. Tunggu sebentar setelah drop terakhir
        setTimeout(() => {
            // 2. Play Sound Complete
            this.playAudio('sfx/puzzle_complete.mp3');

            // ⚠️ FUNGSI BARU (Update untuk Naju & User)
            // Efek Merge Sesungguhnya: Semua bagian MENYATU jadi satu gambar utuh!

            // FIX: Selector wrapper bukan .grid lagi, tapi anak pertama container
            const wrapper = this.container.children[0];
            const zoneContainer = wrapper.children[0]; // Zone container adalah anak pertama wrapper

            // A. Ambil gambar full dari data species
            const fullImagePath = this.species.assets.full.includes('/')
                ? this.species.assets.full
                : `assets/images/${this.species.assets.full}`;

            // B. Efek Flash Cahaya (Ledakan putih)
            const flash = document.createElement('div');
            flash.className = 'absolute inset-0 bg-white z-50 rounded-xl pointer-events-none opacity-0';
            zoneContainer.appendChild(flash);

            const tl = gsap.timeline();

            // STEP 1: Flash Putih (Silau men!)
            tl.to(flash, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    // STEP 2: Ganti isi container dengan gambar full (Saat layar putih)
                    zoneContainer.innerHTML = ''; // Hapus kotak-kotak puzzle
                    zoneContainer.className = 'flex items-center justify-center p-0 bg-transparent relative h-[400px] w-full'; // Reset style

                    // Masukkan Gambar Full
                    const fullImg = document.createElement('img');
                    fullImg.src = fullImagePath;
                    fullImg.className = 'w-full h-full object-contain drop-shadow-[0_0_50px_rgba(255,215,0,0.8)] opacity-0 scale-50'; // Mulai dari kecil
                    // fullImg.id = 'final-tree'; // Tidak perlu ID kalau pakai variabel
                    zoneContainer.appendChild(fullImg);

                    // Masukkan Partikel Glow
                    const glow = document.createElement('div');
                    glow.className = 'absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl scale-0';
                    // glow.id = 'final-glow';
                    zoneContainer.appendChild(glow);
                    // Pindahin glow ke belakang gambar
                    zoneContainer.insertBefore(glow, fullImg);

                    // STEP 3: Timeline Baru untuk Animasi Muncul
                    const tl2 = gsap.timeline();
                    
                    tl2.to(flash, { opacity: 0, duration: 1, ease: "power2.out" })
                       .to(fullImg, {
                           opacity: 1,
                           scale: 1,
                           duration: 1.5,
                           ease: "elastic.out(1, 0.5)"
                       }, "-=0.5") // Muncul barengan flash hilang
                       .to(glow, {
                           scale: 1.5,
                           duration: 2,
                           yoyo: true,
                           repeat: -1
                       }, "-=1.5");

                    // STEP 4: Efek "Bernafas" (Idle) - Terpisah
                    gsap.to(fullImg, {
                        scale: 1.05,
                        duration: 2,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",
                        delay: 1.5 // Tunggu elastis selesai
                    });
                }
            });

            // 4. Panggil callback onComplete setelah selesai pamer
            setTimeout(() => {
                console.log("🧩 Puzzle Done! Calling callback...");

                // Panggil fungsi callback dari puzzle.html (handlePuzzleComplete)
                if (typeof this.onComplete === 'function') {
                    this.onComplete();
                } else {
                    console.error("❌ Callback onComplete tidak ditemukan!");
                    // Fallback redirect jika callback gagal
                    window.location.href = `quiz.html?id=${this.species.id}&source=puzzle_fallback`;
                }

            }, 4000); // Waktu animasi sebelum modal muncul

        }, 1000);
    }

    // Helper: Play Audio (Aman jika file tidak ada)
    playAudio(filename) {
        // Debugging Path
        const path = `assets/audio/${filename}`;
        console.log("🔊 Playing Audio:", path);

        const audio = new Audio(path);
        audio.volume = 1.0; // Full volume
        audio.play().catch(e => {
            console.error("❌ Audio Play Error:", e);
            // alert("Debug: Audio gagal diputar. Cek console log."); // Uncomment jika perlu
        });
    }
}

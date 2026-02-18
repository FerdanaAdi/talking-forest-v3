/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   📄 NAMA FILE: js/user-logic.js                                             ║
║   👤 FUNGSI: Logika utama halaman index/dashboard (GAMIFIED)                ║
║   📍 POSISI: Dipakai oleh index.html                                        ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════════════════════════
🔰 PANDUAN UNTUK NAJU
════════════════════════════════════════════════════════════════════════════════

Halo Naju! 👋

File ini BESAR (~530 baris) dan KOMPLEKS!
Ini adalah "otak" dari halaman utama aplikasi.

⚠️ Hati-hati! Banyak logika penting di sini.

════════════════════════════════════════════════════════════════════════════════
📚 SIMBOL-SIMBOL
════════════════════════════════════════════════════════════════════════════════

🟢 = BOLEH EDIT
🔴 = JANGAN EDIT
🟡 = HATI-HATI

════════════════════════════════════════════════════════════════════════════════
🎯 YANG BOLEH DIEDIT
════════════════════════════════════════════════════════════════════════════════

✅ BOLEH EDIT (dengan hati-hati):
1. Teks dalam alert() dan confirm()
2. Emoji di dalam HTML template
3. Nama rank di calculateRank() (sekitar baris 463-468):
   - "👑 Raja Rimba"
   - "🛡️ Penjaga Hutan"
   - dll

❌ JANGAN EDIT:
1. import di baris pertama
2. Semua function logic
3. Query Firebase
4. Event listener
5. Scanner logic

════════════════════════════════════════════════════════════════════════════════
📂 STRUKTUR FILE
════════════════════════════════════════════════════════════════════════════════

BAGIAN 1: Init & Login (~baris 1-50)
BAGIAN 2: Load Data Pohon (~baris 50-90)
BAGIAN 3: Setup Kategori Filter (~baris 90-125)
BAGIAN 4: Logika User & Nickname (~baris 125-175)
BAGIAN 5: Render Game Grid (~baris 175-220)
BAGIAN 6: Scanner QR (~baris 220-300)
BAGIAN 7: Modal Sukses & Share (~baris 300-340)
BAGIAN 8: Tracking Keuangan (~baris 340-375)
BAGIAN 9: Render Peta (~baris 375-420)
BAGIAN 10: Gamification Engine (~baris 420-530)

════════════════════════════════════════════════════════════════════════════════
💡 TIPS
════════════════════════════════════════════════════════════════════════════════

Kalau mau ganti level ranks, edit di calculateRank() (baris 463):
- XP 5000+ = "👑 Raja Rimba"  
- XP 2000+ = "🛡️ Penjaga Hutan"
- XP 750+ = "🌳 Penjelajah"
- XP 200+ = "🌿 Tunas"
- Default = "🌱 Benih"

════════════════════════════════════════════════════════════════════════════════
*/

// js/user-logic.js (GAMIFIED VERSION)

import {
    auth, db, signInAnonymously, onAuthStateChanged, signOut,
    doc, getDoc, setDoc, updateDoc, arrayUnion, increment,
    collection, getDocs, query, where, onSnapshot
} from "./firebase-config.js";

// --- VARIABEL GLOBAL ---
let currentUser = null;
let allTreesData = [];
let activeCategory = "Semua"; // <-- TAMBAHAN: Untuk menyimpan filter aktif
let scannerObj = null;

// DEBUG: Check if JS runs
console.log("🚀 Script Loaded & Starting...");


// =========================================
// 1. INIT & LOGIN
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    loadTreesFromDB();
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        console.log(`✅ LOGIN OK: ${user.uid.substring(0, 6)}...`);

        const shortID = user.uid.substring(0, 6).toUpperCase();
        if (document.getElementById("my-donor-id")) {
            document.getElementById("my-donor-id").textContent = shortID;
        }

        try {
            await cekDataUser(user.uid);
        } catch (e) {
            console.log(`❌ Error di cekDataUser: ${e.message}`);
        }
        listenToFinance(shortID);
        setupScanner();
    } else {
        console.log("⚠️ Belum login, mencoba Anonymous Auth...");
        signInAnonymously(auth)
            .then(() => console.log("✅ Anonymous Login Berhasil!"))
            .catch(err => console.log(`❌ Gagal Login: ${err.message}`));
    }
});

// =========================================
// 2. AMBIL DATA POHON & BUAT KATEGORI
// =========================================
async function loadTreesFromDB() {
    const grid = document.getElementById("badge-grid");
    if (!grid) return;

    grid.innerHTML = "<p style='text-align:center; width:200%; color:#888;'>Sedang mengambil data...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "content_trees"));

        allTreesData = [];
        querySnapshot.forEach((doc) => {
            allTreesData.push({ id: doc.id, ...doc.data() });
        });

        console.log(`📦 Data Pohon Ditemukan: ${allTreesData.length} item`);

        // --- TAMBAHAN: GENERATE KATEGORI OTOMATIS ---
        setupCategories(allTreesData);


        if (allTreesData.length === 0) {
            grid.innerHTML = "<p style='width:200%; text-align:center;'>Belum ada data pohon.</p>";
        } else if (!currentUser) {
            grid.innerHTML = "<p style='width:200%; text-align:center; color:#666;'>⏳ Menunggu Login...</p>";
        } else {
            cekDataUser(currentUser.uid);
        }

    } catch (error) {
        console.error("Gagal ambil pohon:", error);
        grid.innerHTML = `<p style='color:red; width:200%; text-align:center;'>❌ Gagal memuat data:<br>${error.message}</p>`;
        // Tambahkan detail error untuk debug
        const errDiv = document.createElement("div");
        errDiv.style.fontSize = "0.7rem";
        errDiv.style.color = "red";
        errDiv.innerText = JSON.stringify(error, null, 2);
        grid.appendChild(errDiv);
    }
}

// --- FUNGSI BARU: SETUP TOMBOL KATEGORI ---
function setupCategories(data) {
    const catContainer = document.getElementById("category-filter");
    if (!catContainer) return;

    // Ambil jenis unik, default "Lainnya" jika kosong
    const rawCategories = data.map(tree => tree.jenis || "Lainnya");
    // Hilangkan duplikat
    const uniqueCategories = ["Semua", ...new Set(rawCategories)];

    catContainer.innerHTML = ""; // Reset tombol

    uniqueCategories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `cat-pill ${cat === "Semua" ? "active" : ""}`;
        btn.textContent = cat;

        btn.onclick = () => {
            // Ubah tampilan tombol aktif
            document.querySelectorAll(".cat-pill").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Set filter & Render ulang
            activeCategory = cat;
            if (currentUser) cekDataUser(currentUser.uid);
        };

        catContainer.appendChild(btn);
    });
}

// =========================================
// 3. LOGIKA USER (Nama & Badge + FILTER)
// =========================================
async function cekDataUser(uid) {
    console.log(`🔎 Memeriksa data user: ${uid} ...`);
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        console.log(`📄 User Snap exists? ${userSnap.exists()}`);

        if (userSnap.exists()) {
            const data = userSnap.data();
            document.getElementById("user-greet").textContent = data.nickname;
            document.getElementById("rank-name").textContent = `Rank: 🌱 Skor ${data.score}`;
            document.getElementById("nickname-modal").classList.add("hidden");

            // Panggil render dengan badge user
            renderGame(data.badges || []);
        } else {
            console.log("👤 User baru, membuka modal input nama...");
            document.getElementById("nickname-modal").classList.remove("hidden");
        }
    } catch (e) {
        console.log(`❌ CRITICAL ERROR di cekDataUser: ${e.message}`);
        console.error(e);
    }
}

window.simpanNickname = async function () {
    const nama = document.getElementById("input-nick").value.trim();
    if (!nama) return alert("Isi namamu dulu!");

    if (currentUser) {
        await setDoc(doc(db, "users", currentUser.uid), {
            nickname: nama,
            score: 0,
            badges: [],
            joinedAt: new Date()
        });
        cekDataUser(currentUser.uid);
    }
}

window.resetAkun = async function () {
    if (confirm("Reset akun & skor?")) {
        await signOut(auth);
        location.reload();
    }
}

// =========================================
// 4. RENDER GAME (DENGAN FILTER KATEGORI)
// =========================================
function renderGame(userBadges) {
    console.log(`🎨 Render Game... Badges: ${userBadges.length}`);
    const grid = document.getElementById("badge-grid");
    grid.innerHTML = "";

    // --- LOGIKA FILTER ---
    // Jika kategori "Semua", ambil semua data. Jika tidak, filter berdasarkan jenis.
    const filteredTrees = activeCategory === "Semua"
        ? allTreesData
        : allTreesData.filter(t => (t.jenis || "Lainnya") === activeCategory);

    if (filteredTrees.length === 0) {
        grid.innerHTML = `<p style='width:200%; text-align:center; color:#888;'>Tidak ada pohon jenis "${activeCategory}"</p>`;
        return;
    }

    filteredTrees.forEach(tree => {
        const isUnlocked = userBadges.includes(tree.id);

        grid.innerHTML += `
        <div class="card-item" style="${isUnlocked ? 'border-color:#4a6741; background:#f0fdf4;' : ''}">
            <div class="card-img-box">
                <img src="${tree.foto}" class="card-img" style="${isUnlocked ? '' : 'filter:grayscale(100%); opacity:0.7;'}">
            </div>
            <h4 style="font-size:0.9rem; margin-bottom:5px;">${tree.nama}</h4>
            
            <div class="status-pill-small" style="${isUnlocked ? 'background:#4a6741; color:white;' : ''}">
                ${isUnlocked ? '✅ Terkoleksi' : '🔒 Terkunci'}
            </div>

            ${isUnlocked ?
                `<a href="detail.html?id=${tree.id}" style="text-decoration:none;">
                    <button style="margin-top:8px; font-size:0.7rem; cursor:pointer; background:none; border:1px solid #4a6741; border-radius:10px; padding:4px 10px; color:#4a6741; font-weight:bold;">
                        📖 Baca Detail
                    </button>
                </a>`
                : ''}
        </div>`;
    });
}

// =========================================
// 5. SCANNER (Versi Manual Fix - Sama persis kodemu)
// =========================================
function setupScanner() {
    const scanBtn = document.getElementById("scan-btn");

    scanBtn.onclick = () => {
        let overlay = document.getElementById("scanner-overlay-ui");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "scanner-overlay-ui";
            overlay.className = "scanner-overlay";
            overlay.style.position = "fixed";
            overlay.style.top = "0"; overlay.style.left = "0";
            overlay.style.width = "100%"; overlay.style.height = "100%";
            overlay.style.zIndex = "9999"; overlay.style.background = "rgba(0,0,0,0.9)";
            overlay.style.display = "flex"; overlay.style.flexDirection = "column";
            overlay.style.alignItems = "center"; overlay.style.justifyContent = "center";

            overlay.innerHTML = `
                <div style="background:white; padding:15px; border-radius:15px; width:90%; max-width:350px; text-align:center;">
                    <h3 style="margin:0 0 15px 0;">📷 Scan QR Pohon</h3>
                    <div id="reader" style="width:100%; height:250px; background:#eee; margin-bottom:15px;"></div>
                    <button onclick="tutupScanner()" style="width:100%; padding:12px; background:#e74c3c; color:white; border:none; border-radius:10px; font-weight:bold; cursor:pointer;">BATAL SCAN</button>
                </div>
            `;
            document.body.appendChild(overlay);
        }
        overlay.classList.remove("hidden");

        try {
            if (scannerObj) { scannerObj.clear(); }
            scannerObj = new Html5Qrcode("reader");
            scannerObj.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 200, aspectRatio: 1.0 },
                onScanSuccess,
                (errorMessage) => { }
            ).catch(err => {
                scannerObj.start({ facingMode: "user" }, { fps: 10, qrbox: 200 }, onScanSuccess, () => { });
            });
        } catch (e) { alert("Gagal inisialisasi kamera: " + e); }
    };
}

window.tutupScanner = function () {
    const overlay = document.getElementById("scanner-overlay-ui");
    if (overlay) overlay.classList.add("hidden");
    if (scannerObj) { scannerObj.stop().then(() => scannerObj.clear()).catch(err => { }); }
}

async function onScanSuccess(decodedText) {
    window.tutupScanner();
    const hasilScan = decodedText.trim();
    const tree = allTreesData.find(t => t.id === hasilScan);

    if (tree) {
        setTimeout(async () => {
            if (confirm(`🎉 KAMU MENEMUKAN: ${tree.nama}!\n\nJawab kuis?\n❓ ${tree.quiz_question}`)) {
                let opsi = tree.quiz_options.join(" / ");
                let jawabanUser = prompt(`Pilih jawaban (${opsi}):`);

                if (jawabanUser && jawabanUser.toLowerCase() === tree.quiz_answer.toLowerCase()) {
                    try {
                        const userRef = doc(db, "users", currentUser.uid);

                        // GAMIFICATION LOGIC START
                        await updateDoc(userRef, { badges: arrayUnion(tree.id) }); // Basic Badge
                        await addXP(currentUser.uid, 50, "scan_tree", tree.id);   // +50 XP
                        await logGameActivity("scan_tree", tree.id, 50);          // Audit Log
                        // GAMIFICATION LOGIC END

                        // --- GANTI ALERT DENGAN MODAL SUKSES ---
                        showSuccessModal(tree);
                        cekDataUser(currentUser.uid);
                    } catch (err) { alert("Gagal simpan skor."); }
                } else { alert("❌ Salah! Jawaban: " + tree.quiz_answer); }
            }
        }, 300);
    } else { alert("⚠️ QR Code tidak dikenali."); }
}

// =========================================
// 5b. LOGIKA MODAL SUKSES & SHARE
// =========================================
let currentTreeForShare = null;

function showSuccessModal(tree) {
    currentTreeForShare = tree;
    document.getElementById("success-img").src = tree.foto;
    document.getElementById("success-name").textContent = tree.nama;
    document.getElementById("success-modal").classList.remove("hidden");

    // Efek Konfeti (Opsional, visual only)
    console.log("🎉 Konfeti meletus!");
}

window.tutupSuccessModal = function () {
    document.getElementById("success-modal").classList.add("hidden");
}

window.shareAchievement = function () {
    if (!currentTreeForShare) return;

    const shareData = {
        title: 'The Talking Forest',
        text: `Hore! Aku baru saja menemukan ${currentTreeForShare.nama} di Hutan Bicara! 🌱 Ayo main sekarang!`,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Berhasil share'))
            .catch((err) => console.log('Gagal share:', err));
    } else {
        // Fallback untuk PC / Browser lama
        navigator.clipboard.writeText(`${shareData.text} \n${shareData.url}`);
        alert("Link tersalin ke clipboard! 📋\nSilakan paste di WhatsApp/Sosmed.");
    }
}

// =========================================
// 6. TRACKING KEUANGAN (Sama persis kodemu)
// =========================================
function listenToFinance(myShortID) {
    const qPersonal = query(collection(db, "finance"), where("donorID", "==", myShortID));

    onSnapshot(qPersonal, (snapshot) => {
        const list = document.getElementById("personal-history-list");
        if (list) {
            list.innerHTML = snapshot.empty ? "<p style='font-size:0.8rem; color:#999; text-align:center;'>Belum ada riwayat.</p>" : "";
            snapshot.forEach((doc) => {
                const d = doc.data();
                const color = d.type === 'in' ? '#e8f5e9' : '#fff3e0';
                list.innerHTML += `<div style="background:${color}; padding:10px; margin-bottom:8px; border-left:4px solid ${d.type === 'in' ? 'green' : 'orange'}; font-size:0.85rem;">
                    <b>${d.type === 'in' ? '💰 Masuk' : '💸 Keluar'}</b><br>${d.description}<br><b>Rp ${d.amount.toLocaleString()}</b>
                </div>`;
            });
        }
    });

    const qGlobal = query(collection(db, "finance"));
    onSnapshot(qGlobal, (snapshot) => {
        let total = 0;
        snapshot.forEach(doc => {
            const d = doc.data();
            if (d.type === 'in') total += d.amount; else total -= d.amount;
        });
        if (document.getElementById("global-saldo")) {
            document.getElementById("global-saldo").textContent = total.toLocaleString();
        }
    });
}

// =========================================
// 7. RENDER PETA (FITUR BARU)
// =========================================
window.renderMap = function () {
    const container = document.getElementById("pin-container");
    if (!container) return;

    container.innerHTML = ""; // Reset

    // DEBUG: Cek apakah fungsi jalan
    console.log("🗺️ RENDER MAP DIPANGGIL!");
    console.log(`📊 Total Pohon: ${allTreesData.length}`);

    // Ambil badges dari currentUser (kalau belum login, kosong)
    const myBadges = currentUser ? (currentUser.badges || []) : [];

    allTreesData.forEach(tree => {
        console.log(`📍 Cek Pohon: ${tree.nama} | X: ${tree.map_x} | Y: ${tree.map_y}`);

        // Skip jika koordinat invalid
        if (tree.map_x == null || tree.map_y == null) return;
        // Skip jika koordinat 0,0 (default)
        if (!tree.map_x && !tree.map_y) return;

        const isUnlocked = myBadges.includes(tree.id);
        const pin = document.createElement("div");

        pin.className = `map-pin ${isUnlocked ? 'collected' : ''}`;
        pin.style.left = `${tree.map_x}%`;
        pin.style.top = `${tree.map_y}%`;

        // Rotasi ikon pin CSS (bentuk teardrop)
        pin.style.transform = "translate(-50%, -100%) rotate(-45deg)"; // Reset transform + rotasi

        // Isi pin: Icon diputar balik
        pin.innerHTML = `<span style='transform:rotate(45deg); display:block; font-size:14px;'>${isUnlocked ? "🌲" : "🔒"}</span>`;

        pin.onclick = () => {
            if (isUnlocked) {
                // Buka detail modal / page
                window.location.href = `detail.html?id=${tree.id}`;
            } else {
                alert(`📍 Ini lokasi ${tree.nama}!\n\nPergi ke sana dan Scan QR Code di pohonnya untuk membuka kunci.`);
            }
        };

        container.appendChild(pin);
    });
}

// =========================================
// 8. GAMIFICATION ENGINE (CORE)
// =========================================

// A. Tambah XP & Cek Level
async function addXP(uid, amount, reason, targetId) {
    console.log(`✨ Adding ${amount} XP to ${uid} for ${reason}`);
    const userRef = doc(db, "users", uid);

    try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) return;

        const currentXP = userSnap.data().total_xp || 0;
        const newXP = currentXP + amount;

        let updates = {
            total_xp: newXP,
            last_active: new Date()
        };

        // Cek Level Up
        const newRank = calculateRank(newXP);
        const oldRank = userSnap.data().current_rank || "🌱 Pemula";

        if (newRank !== oldRank) {
            updates.current_rank = newRank;
            alert(`🎉 LEVEL UP!\nSelamat, kamu naik pangkat menjadi:\n${newRank}`);
            // TODO: Sound effect & modal keren
        }

        await updateDoc(userRef, updates);
        cekDataUser(uid); // Refresh UI
    } catch (e) {
        console.error("Gagal addXP:", e);
    }
}

// B. Hitung Rank Berdasarkan XP
function calculateRank(xp) {
    if (xp >= 5000) return "👑 Raja Rimba";
    if (xp >= 2000) return "🛡️ Penjaga Hutan";
    if (xp >= 750) return "🌳 Penjelajah";
    if (xp >= 200) return "🌿 Tunas";
    return "🌱 Benih"; // Default
}

// C. Audit Log (History Poin)
async function logGameActivity(action, targetId, xp) {
    if (!currentUser) return;
    try {
        await addDoc(collection(db, "game_logs"), {
            user_id: currentUser.uid,
            action_type: action,
            target_id: targetId || "-",
            xp_earned: xp,
            timestamp: new Date(),
            week_id: getWeekID()
        });
    } catch (e) { console.error("Log error", e); }
}

function getWeekID() {
    const d = new Date();
    const onejan = new Date(d.getFullYear(), 0, 1);
    const week = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    return `${d.getFullYear()}-W${week}`;
}

// Update UI Header
const _originalCekUser = cekDataUser;
cekDataUser = async function (uid) {
    // Panggil fungsi asli dulu (untuk load nama dll)
    // Tapi kita override bagian header score
    try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const data = userSnap.data();

            // Nama
            document.getElementById("user-greet").textContent = data.nickname;
            document.getElementById("nickname-modal").classList.add("hidden");

            // --- GAMIFIED HEADER ---
            const xp = data.total_xp || 0;
            const rank = data.current_rank || calculateRank(xp);

            // Logic Progress Bar sederana (0 - 5000 scale for demo)
            // Idealnya range per level
            let nextMilestone = 200;
            if (rank === "🌿 Tunas") nextMilestone = 750;
            if (rank === "🌳 Penjelajah") nextMilestone = 2000;
            if (rank === "🛡️ Penjaga Hutan") nextMilestone = 5000;
            if (rank === "👑 Raja Rimba") nextMilestone = 10000;

            const percent = Math.min(100, (xp / nextMilestone) * 100);

            document.getElementById("rank-name").innerHTML = `${rank} <small>(${xp}/${nextMilestone} XP)</small>`;
            document.getElementById("progress-fill").style.width = `${percent}%`;

            renderGame(data.badges || []);
        } else {
            document.getElementById("nickname-modal").classList.remove("hidden");
        }
    } catch (e) { console.error(e); }
};
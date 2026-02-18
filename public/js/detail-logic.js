/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   📄 NAMA FILE: js/detail-logic.js                                           ║
║   🌳 FUNGSI: Logika halaman detail pohon/species                            ║
║   📍 POSISI: Dipakai oleh detail.html                                       ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════════════════════════
🔰 PANDUAN UNTUK NAJU
════════════════════════════════════════════════════════════════════════════════

Halo Naju! 👋

File ini mengatur halaman DETAIL ketika player klik pohon yang sudah terbuka.
Menampilkan info lengkap, pop-up edukasi, dan kuis mini.

════════════════════════════════════════════════════════════════════════════════
📚 SIMBOL-SIMBOL
════════════════════════════════════════════════════════════════════════════════

🟢 = BOLEH EDIT
🔴 = JANGAN EDIT
🟡 = HATI-HATI

════════════════════════════════════════════════════════════════════════════════
🎯 YANG BOLEH DIEDIT
════════════════════════════════════════════════════════════════════════════════

✅ BOLEH EDIT:
1. Teks pop-up edukasi di fungsi bukaPopup() (sekitar baris 66-110)
   - Contoh: "Jumlahku di alam semakin sedikit..."
   - Emoji: 📜, 🌏, 🌱, ⚡
   
2. Alert messages:
   - "🎉 HEBAT! (+100 Poin)"
   - "Pohon tidak ditemukan!"

❌ JANGAN EDIT:
1. import di baris pertama
2. Nama function (loadTreeDetail, bukaPopup, setupQuiz, dll)
3. Query Firebase (getDoc, updateDoc)
4. Logika kuis (checkAnswer)

════════════════════════════════════════════════════════════════════════════════
📂 FITUR UTAMA
════════════════════════════════════════════════════════════════════════════════

1. loadTreeDetail() → Ambil data pohon dari Firebase berdasarkan ID
2. renderUI() → Tampilkan data ke layar
3. bukaPopup() → Pop-up edukasi hijau (status, asal, jenis, manfaat)
4. setupQuiz() → Siapkan kuis mini
5. checkAnswer() → Cek jawaban & beri poin
6. bacaInfo() → Baca deskripsi dengan suara (Text-to-Speech)

════════════════════════════════════════════════════════════════════════════════
*/

// js/detail-logic.js

import { auth, db, getDoc, doc, updateDoc, arrayUnion, increment, onAuthStateChanged }
    from "./firebase-config.js";

// Ambil ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const treeID = urlParams.get('id');

let currentTreeData = null;
let currentUser = null;

// INIT
document.addEventListener("DOMContentLoaded", async () => {
    if (!treeID) {
        alert("Pohon tidak ditemukan!");
        window.location.href = "index.html";
        return;
    }
    await loadTreeDetail(treeID);
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        updateScoreDisplay(user.uid);
        checkIfUnlocked(user.uid);
    }
});

// AMBIL DATA DARI FIREBASE ATAU LOKAL JSON
async function loadTreeDetail(id) {
    try {
        // Coba ambil dari Firebase dulu
        let data = null;
        try {
            const docRef = doc(db, "content_trees", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                data = docSnap.data();
            }
        } catch (fbError) {
            console.warn("Firebase offline/error, mencoba local JSON...", fbError);
        }

        // Jika tidak ada di Firebase, ambil dari species.json
        if (!data) {
            const res = await fetch('assets/data/species.json');
            const speciesList = await res.json();
            const species = speciesList.find(s => s.id === id);

            if (species) {
                // Mapping data JSON (English) ke Format UI (Indo)
                // Fix path gambar: jika hanya nama file, tambahkan path folder assets/images/species/
                let imgPath = species.assets?.image_real || species.image || "assets/loading.jpg";
                if (imgPath && !imgPath.includes("/")) {
                    imgPath = "assets/images/species/" + imgPath;
                }

                data = {
                    nama: species.name,
                    latin: species.latin_name || "",
                    foto: imgPath,
                    status: species.conservation_status || "Tidak diketahui",
                    asal: species.habitat || "Hutan Kalimantan",
                    jenis: species.type === 'tree' ? 'Pohon' : (species.type === 'animal' ? 'Hewan' : 'Tanaman'),
                    manfaat: species.facts?.[0] || "Menjaga keseimbangan ekosistem",
                    desc: species.description || species.story?.content || "Belum ada deskripsi.",
                    quiz_question: species.quiz_question || null,
                    quiz_options: species.quiz_options || [],
                    quiz_answer: species.quiz_answer || null,
                    // Simpan data asli untuk kebutuhan lain
                    originalData: species
                };
            }
        }

        if (data) {
            currentTreeData = data; // PENTING: Update variabel global agar popup jalan
            renderUI(data);
        } else {
            document.getElementById("detail-name").textContent = "Data Hilang 😢";
            document.getElementById("d-desc").textContent = "Spesies dengan ID '" + id + "' tidak ditemukan.";
        }
    } catch (e) {
        console.error("Error loading detail:", e);
        document.getElementById("detail-name").textContent = "Error Memuat Data";
    }
}

// TAMPILKAN KE LAYAR
function renderUI(data) {
    document.getElementById("detail-name").textContent = data.nama;
    document.getElementById("detail-latin").textContent = data.latin || "";

    // Handle image fallback
    const imgEl = document.getElementById("detail-img");
    imgEl.src = data.foto;
    imgEl.onerror = () => { imgEl.src = "assets/images/ui/placeholder-leaf.png"; };

    document.getElementById("d-status").textContent = data.status || "-";
    document.getElementById("d-asal").textContent = data.asal || "-";
    document.getElementById("d-jenis").textContent = data.jenis || "-";
    document.getElementById("d-guna").textContent = data.manfaat || "-";
    document.getElementById("d-desc").textContent = data.desc || "Belum ada deskripsi.";

    if (data.quiz_question) {
        setupQuiz(data);
        document.getElementById("quiz-section").classList.remove("hidden");
    } else {
        document.getElementById("quiz-section").classList.add("hidden");
    }

    // --- RENDER ANATOMY SECTION ---
    const anatomySection = document.getElementById("anatomy-section");
    const anatomyList = document.getElementById("anatomy-list");
    anatomyList.innerHTML = ""; // Reset

    if (data.originalData && data.originalData.anatomy && data.originalData.anatomy.length > 0) {
        anatomySection.classList.remove("hidden");

        data.originalData.anatomy.forEach(part => {
            const itemHTML = `
                <div class="anatomy-item" style="display: flex; gap: 12px; align-items: start; background: white; padding: 10px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border: 1px solid #eee;">
                    <div style="width: 50px; height: 50px; flex-shrink: 0; background-color: #f8f9fa; border-radius: 50%; display: flex; align-items: center; justify-content: center; overflow: hidden; border: 2px solid #e9ecef;">
                        <img src="${part.image}" alt="${part.name}" style="width: 70%; height: 70%; object-fit: contain;">
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0; color: #2E7D32; font-size: 0.95rem; font-weight: bold;">${part.name}</h4>
                        <p style="margin: 4px 0 0; font-size: 0.85rem; color: #555; line-height: 1.4;">${part.fact}</p>
                    </div>
                </div>
            `;
            anatomyList.innerHTML += itemHTML;
        });
    } else {
        anatomySection.classList.add("hidden");
    }

    // --- RENDER STORY AS DESCRIPTION IF AVAILABLE ---
    if (data.originalData && data.originalData.story) {
        const story = data.originalData.story;
        let storyHTML = `<span style="display:block; margin-bottom:8px; font-weight:bold; color:#d35400;">"${story.intro}"</span>`;
        storyHTML += `${story.content}<br><br>`;
        if (story.moral) {
            storyHTML += `<div style="background:#fff3cd; padding:8px 12px; border-radius:8px; border-left:4px solid #ffc107; font-size:0.85rem; color:#856404;">
                <strong>💡 Pesan Moral:</strong> ${story.moral}
            </div>`;
        }
        // Jika deskripsi default terlalu pendek, gunakan story
        if (!data.desc || data.desc.length < 50) {
            document.getElementById("d-desc").innerHTML = storyHTML;
        }
    }
}

// ===========================================
// 🔥 FITUR POP-UP PINTAR (LOGIKA BARU) 🔥
// ===========================================
window.bukaPopup = function (tipe) {
    if (!currentTreeData) return;

    const mModal = document.getElementById("green-modal");
    const mIcon = document.getElementById("m-icon");
    const mTitle = document.getElementById("m-title");
    const mBody = document.getElementById("m-body");

    let teks = "";

    // Switch Case: Menyusun Kalimat Otomatis
    switch (tipe) {
        case 'status':
            mIcon.textContent = "📜";
            mTitle.textContent = "Laporan Hutan";
            const status = currentTreeData.status || "Tidak diketahui";

            teks = `Status konservasiku saat ini adalah: <strong>${status}</strong>.<br><br>`;

            // Tambahkan kalimat edukasi sesuai status
            if (status.toLowerCase().includes("langka") || status.toLowerCase().includes("terancam") || status.toLowerCase().includes("rentan")) {
                teks += "⚠️ Jumlahku di alam semakin sedikit karena penebangan liar. Jika tidak dijaga, aku bisa punah selamanya. Maukah kamu membantuku?";
            } else {
                teks += "✅ Kabar baik! Jumlahku masih cukup aman di alam. Tapi kita harus tetap menjaga hutan ya!";
            }
            break;

        case 'asal':
            mIcon.textContent = "🌏";
            mTitle.textContent = "Rumah Asliku";
            teks = `Aku berasal dari daerah <strong>${currentTreeData.asal || "?"}</strong>.<br><br>Di sanalah habitat asliku berada. Tanah dan udara di sana sangat cocok untukku tumbuh besar.`;
            break;

        case 'jenis':
            mIcon.textContent = "🌱";
            mTitle.textContent = "Keluargaku";
            teks = `Aku termasuk dalam kelompok <strong>${currentTreeData.jenis || "?"}</strong>.<br><br>Setiap jenis makhluk hidup di hutan ini punya peran penting untuk menjaga keseimbangan alam.`;
            break;

        case 'manfaat':
            mIcon.textContent = "⚡";
            mTitle.textContent = "Kekuatan Super";
            teks = `Tahukah kamu? Manusia sering memanfaatkanku untuk <strong>${currentTreeData.manfaat || "?"}</strong>.<br><br>Selain itu, aku juga membantu menyaring udara kotor dan menahan air hujan agar tidak banjir!`;
            break;
    }

    mBody.innerHTML = teks;
    mModal.classList.add("show"); // Munculkan Modal
}

window.tutupPopup = function () {
    document.getElementById("green-modal").classList.remove("show"); // Sembunyikan
}

// LOGIKA KUIS (STANDARD)
function setupQuiz(data) {
    const quizBox = document.getElementById("quiz-section");
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");

    questionEl.textContent = data.quiz_question;
    optionsEl.innerHTML = "";

    data.quiz_options.forEach(opt => {
        const btn = document.createElement("div");
        btn.className = "quiz-option";
        btn.textContent = opt;
        btn.style.cssText = "background:#f7f4e9; border:2px solid #e0dac3; padding:10px; border-radius:10px; text-align:center; cursor:pointer;";
        btn.onclick = () => checkAnswer(opt, data.quiz_answer, btn);
        optionsEl.appendChild(btn);
    });
}

async function checkAnswer(selected, correct, btnElement) {
    if (!currentUser) return alert("Login dulu!");

    if (selected.toLowerCase() === correct.toLowerCase()) {
        btnElement.style.background = "#d4edda";
        btnElement.textContent += " ✅";

        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, { score: increment(100), badges: arrayUnion(treeID) });

        alert("🎉 HEBAT! (+100 Poin)");
        document.getElementById("quiz-section").classList.add("hidden");
        updateScoreDisplay(currentUser.uid);
    } else {
        btnElement.style.background = "#f8d7da";
        btnElement.textContent += " ❌";
        alert("Yah salah... Coba lagi!");
    }
}

async function updateScoreDisplay(uid) {
    const s = await getDoc(doc(db, "users", uid));
    if (s.exists()) document.getElementById("score-display").textContent = "Skor: " + s.data().score;
}

async function checkIfUnlocked(uid) {
    const s = await getDoc(doc(db, "users", uid));
    if (s.exists()) {
        const badges = s.data().badges || [];
        if (badges.includes(treeID)) document.getElementById("quiz-section").classList.add("hidden");
        else document.getElementById("quiz-section").classList.remove("hidden");
    }
}

window.bacaInfo = function () {
    if (!currentTreeData) return;
    const utterance = new SpeechSynthesisUtterance(`${currentTreeData.nama}. ${currentTreeData.desc}`);
    utterance.lang = "id-ID";
    window.speechSynthesis.speak(utterance);
}
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

// AMBIL DATA DARI FIREBASE
async function loadTreeDetail(id) {
    try {
        const docRef = doc(db, "content_trees", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            currentTreeData = docSnap.data();
            renderUI(currentTreeData);
        } else {
            document.getElementById("detail-name").textContent = "Data Hilang 😢";
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

// TAMPILKAN KE LAYAR
function renderUI(data) {
    document.getElementById("detail-name").textContent = data.nama;
    document.getElementById("detail-latin").textContent = data.latin || "";
    document.getElementById("detail-img").src = data.foto;
    
    document.getElementById("d-status").textContent = data.status || "-";
    document.getElementById("d-asal").textContent = data.asal || "-";
    document.getElementById("d-jenis").textContent = data.jenis || "-";
    document.getElementById("d-guna").textContent = data.manfaat || "-";
    document.getElementById("d-desc").textContent = data.desc || "Belum ada deskripsi.";

    setupQuiz(data);
}

// ===========================================
// 🔥 FITUR POP-UP PINTAR (LOGIKA BARU) 🔥
// ===========================================
window.bukaPopup = function(tipe) {
    if(!currentTreeData) return;

    const mModal = document.getElementById("green-modal");
    const mIcon = document.getElementById("m-icon");
    const mTitle = document.getElementById("m-title");
    const mBody = document.getElementById("m-body");

    let teks = "";
    
    // Switch Case: Menyusun Kalimat Otomatis
    switch(tipe) {
        case 'status':
            mIcon.textContent = "📜";
            mTitle.textContent = "Laporan Hutan";
            const status = currentTreeData.status || "Tidak diketahui";
            
            teks = `Status konservasiku saat ini adalah: <strong>${status}</strong>.<br><br>`;
            
            // Tambahkan kalimat edukasi sesuai status
            if(status.toLowerCase().includes("langka") || status.toLowerCase().includes("terancam") || status.toLowerCase().includes("rentan")) {
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

window.tutupPopup = function() {
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

window.bacaInfo = function() {
    if (!currentTreeData) return;
    const utterance = new SpeechSynthesisUtterance(`${currentTreeData.nama}. ${currentTreeData.desc}`);
    utterance.lang = "id-ID"; 
    window.speechSynthesis.speak(utterance);
}
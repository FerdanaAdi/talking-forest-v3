/* 
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   📄 NAMA FILE: js/umkm-logic.js                                             ║
║   🏪 FUNGSI: Logika untuk halaman galeri UMKM                               ║
║   📍 POSISI: Dipakai oleh umkm.html                                         ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

════════════════════════════════════════════════════════════════════════════════
🔰 PANDUAN UNTUK NAJU
════════════════════════════════════════════════════════════════════════════════

Halo Naju! 👋

File ini mengatur tampilan daftar mitra UMKM di halaman publik.
Data diambil dari Firebase, lalu ditampilkan sebagai kartu-kartu.

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
1. Teks di dalam innerHTML (misal: "💬 Chat WhatsApp")
2. Warna badge (bg-kuliner, bg-souvenir, bg-jasa) → edit di CSS
3. Teks pesan error ("Gagal memuat data")

❌ JANGAN EDIT:
1. import di baris pertama
2. Nama function (loadPublicUMKM, renderUMKM, filterUMKM)
3. Struktur template HTML di innerHTML
4. Query ke Firebase

════════════════════════════════════════════════════════════════════════════════
📂 ALUR KERJA FILE INI
════════════════════════════════════════════════════════════════════════════════

1. loadPublicUMKM() → Ambil semua data UMKM dari Firebase
2. renderUMKM() → Buat kartu HTML untuk setiap UMKM
3. filterUMKM() → Filter berdasarkan kategori (Kuliner/Souvenir/Jasa)

════════════════════════════════════════════════════════════════════════════════
*/

import { db, collection, getDocs } from "./firebase-config.js";

let allData = [];

window.loadPublicUMKM = async () => {
    try {
        const snap = await getDocs(collection(db, "umkm"));
        allData = [];
        snap.forEach(d => allData.push(d.data()));
        renderUMKM(allData);
    } catch (e) {
        console.error(e);
        document.getElementById("umkm-container").innerHTML = `<p style="text-align:center; width:100%;">Gagal memuat data.</p>`;
    }
};

function renderUMKM(data) {
    const container = document.getElementById("umkm-container");
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = `<p style="text-align:center; grid-column:1/-1; color:#888;">Belum ada mitra terdaftar.</p>`;
        return;
    }

    data.forEach(d => {
        let badgeClass = "bg-jasa";
        if (d.category === 'Kuliner') badgeClass = "bg-kuliner";
        if (d.category === 'Souvenir') badgeClass = "bg-souvenir";

        // Format Phone for WhatsApp (628...)
        let phone = d.phone.replace(/\D/g, '');
        if (phone.startsWith('0')) phone = '62' + phone.substring(1);

        container.innerHTML += `
            <div class="umkm-card">
                <span class="badge ${badgeClass}">${d.category}</span>
                <h3 style="margin:10px 0; color:#2c3e50;">${d.name}</h3>
                <p style="color:#666; font-size:0.9rem; margin-bottom:15px;">👤 ${d.owner}</p>
                <a href="https://wa.me/${phone}?text=Halo%20${d.name},%20saya%20lihat%20dari%20Talking%20Forest..." target="_blank" class="btn-wa">
                    💬 Chat WhatsApp
                </a>
            </div>
        `;
    });
}

window.filterUMKM = (cat) => {
    // Update Active Button
    document.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (cat === 'all') {
        renderUMKM(allData);
    } else {
        const filtered = allData.filter(d => d.category === cat);
        renderUMKM(filtered);
    }
};

// Auto Load
window.loadPublicUMKM();

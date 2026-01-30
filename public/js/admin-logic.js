import { auth, db, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, doc, updateDoc, setDoc, getDoc, deleteDoc, query, where, orderBy, onSnapshot, getDocs, limit }
    from "./firebase-config.js";

// --- GLOBAL STATE ---
let visitorChart = null;
let incomeChart = null;
let currentFloraPage = 1;
let floraPerPage = 5;
let allFloraData = []; // Cache for client-side search/pagination simplicity
let allFinanceData = []; // Cache for finance data

// --- AUTH & INIT ---
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("dashboard-section").classList.remove("hidden");
        // Init Modules
        window.initDashboard();
        window.monitorTickets();
        window.loadHarga();
        window.checkAndRecapDailyTickets(); // Auto-recap check
    } else {
        document.getElementById("login-section").classList.remove("hidden");
        document.getElementById("dashboard-section").classList.add("hidden");
    }
});

window.prosesLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth, document.getElementById("login-email").value, document.getElementById("login-pass").value);
    } catch (e) { document.getElementById("login-msg").textContent = "Gagal: " + e.message; }
};
window.prosesLogout = async () => { await signOut(auth); location.reload(); };

// --- DASHBOARD ---
window.initDashboard = async () => {
    // Set Date
    document.getElementById('dash-date').innerText = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    // 1. Visitors & Ticket Income (Trend & Today)
    const qTickets = query(collection(db, "ticket_transactions"), where("date", ">=", lastWeek), orderBy("date", "asc"));
    const tickSnap = await getDocs(qTickets);

    let visData = {};
    let todayVisitors = 0;
    let todayTicketIncome = 0;

    tickSnap.forEach(d => {
        const val = d.data();
        const dateObj = new Date(val.date.seconds * 1000);
        const dateStr = dateObj.toLocaleDateString('id-ID');

        // Chart Data (Daily)
        visData[dateStr] = (visData[dateStr] || 0) + val.visitor_count;

        // Today Stats
        if (dateObj >= today) {
            todayVisitors += val.visitor_count;
            todayTicketIncome += val.total_amount;
        }
    });

    const ctxV = document.getElementById('chart-visitor').getContext('2d');
    if (visitorChart) visitorChart.destroy();
    visitorChart = new Chart(ctxV, {
        type: 'line',
        data: {
            labels: Object.keys(visData),
            datasets: [{ label: 'Pengunjung', data: Object.values(visData), borderColor: '#1b4332', tension: 0.4, fill: true, backgroundColor: 'rgba(27,67,50,0.1)' }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
    // Update Stat Card (Hari Ini)
    document.getElementById('stat-visitor').innerText = todayVisitors;

    // 2. Finance / Income (Today & Distribution)
    const qFin = query(collection(db, "finance"), where("type", "==", "in"));
    const finSnap = await getDocs(qFin);

    // Note: Auto-recap entries in 'finance' might duplicate ticket income if we are not careful.
    // However, usually auto-recap has 'auto_ticket' source.
    // For "Today Revenue", we sum Realtime Ticket + Finance (non-auto-ticket) today?
    // Or just simple sum. Let's assume user manually entries finance + auto ticket.
    // Since auto-ticket runs at end of day, "Today's" finance usually won't have it yet.

    let sources = { "Tiket": 0 }; // We will rely on Finance 'Tiket' category for All Time Chart? 
    // Or accumulated from Ticket Transactions? 
    // Let's use Finance collection for Chart Distribution to be consistent with history.

    let todayTotalRevenue = todayTicketIncome;

    finSnap.forEach(d => {
        const v = d.data();
        const dateObj = v.date.seconds ? new Date(v.date.seconds * 1000) : new Date(v.date);

        // Chart Data
        sources[v.category || 'Lainnya'] = (sources[v.category || 'Lainnya'] || 0) + v.amount;

        // Today Stats (Exclude 'auto_ticket' to avoid double counting if run multiple times/manual?)
        // Actually, for "Today", we want Realtime.
        if (dateObj >= today && v.source_system !== 'auto_ticket') {
            todayTotalRevenue += v.amount;
        }
    });

    const ctxI = document.getElementById('chart-income').getContext('2d');
    if (incomeChart) incomeChart.destroy();
    incomeChart = new Chart(ctxI, {
        type: 'doughnut',
        data: {
            labels: Object.keys(sources),
            datasets: [{ data: Object.values(sources), backgroundColor: ['#2ecc71', '#3498db', '#9b59b6', '#f1c40f'] }]
        }
    });
    // Update Stat Card (Hari Ini)
    document.getElementById('total-revenue').innerText = "Rp " + todayTotalRevenue.toLocaleString('id-ID');

    // 3. Real Counts (UMKM & Asset)
    const umkmSnap = await getDocs(query(collection(db, "umkm"), where("status", "==", "active")));
    document.getElementById('stat-umkm').innerText = umkmSnap.size;

    const assetSnap = await getDocs(query(collection(db, "assets")));
    document.getElementById('stat-asset').innerText = assetSnap.size;
};

window.downloadReport = async () => { alert("Fitur download laporan akan segera hadir (V2.1)"); };

// --- FINANCE ---
// --- FINANCE V2 ---
window.showFinanceList = async () => {
    document.getElementById('view-finance-list').classList.remove('hidden');
    document.getElementById('view-finance-form').classList.add('hidden');

    // Fetch Data (All for client-side filtering)
    const q = query(collection(db, "finance"), orderBy("date", "desc"));
    const snap = await getDocs(q);
    allFinanceData = [];
    snap.forEach(d => allFinanceData.push({ id: d.id, ...d.data() }));

    // Initialize UI
    window.initFinanceFilters();
    window.updateFinanceSummaries();
    window.filterFinance();
};

window.initFinanceFilters = () => {
    // Populate Years
    const years = [...new Set(allFinanceData.map(d => (d.date.seconds ? new Date(d.date.seconds * 1000) : new Date(d.date)).getFullYear()))].sort((a, b) => b - a);
    const ySelect = document.getElementById('filter-year');
    if (ySelect) {
        ySelect.innerHTML = '<option value="">Semua Tahun</option>';
        years.forEach(y => ySelect.innerHTML += `<option value="${y}">${y}</option>`);
    }

    // Populate Months (Static)
    const mSelect = document.getElementById('filter-month');
    if (mSelect && mSelect.options.length <= 1) {
        mSelect.innerHTML = '<option value="">Semua Bulan</option>';
        ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].forEach((m, i) => {
            mSelect.innerHTML += `<option value="${i}">${m}</option>`;
        });
    }

    // Add Listeners
    ['finance-search', 'filter-month', 'filter-year', 'filter-status'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.oninput = window.filterFinance;
    });
};

window.updateFinanceSummaries = () => {
    let totalBalance = 0;
    let monthIncome = 0;
    let monthExpense = 0;
    let pendingCount = 0;

    const now = new Date();
    const curMonth = now.getMonth();
    const curYear = now.getFullYear();

    allFinanceData.forEach(d => {
        const amt = d.amount || 0;
        const date = d.date.seconds ? new Date(d.date.seconds * 1000) : new Date(d.date);
        const isIncome = d.type === 'in';
        const status = d.status || 'completed'; // Default legacy to completed

        // Global Balance (Exclude rejected)
        if (status !== 'rejected') {
            if (isIncome) totalBalance += amt; else totalBalance -= amt;
        }

        // Monthly Stats (Current Month)
        if (date.getMonth() === curMonth && date.getFullYear() === curYear && status !== 'rejected') {
            if (isIncome) monthIncome += amt; else monthExpense += amt;
        }

        if (status === 'pending') pendingCount++;
    });

    document.getElementById('total-balance').innerText = `Rp ${totalBalance.toLocaleString('id-ID')}`;
    document.getElementById('monthly-income').innerText = `Rp ${monthIncome.toLocaleString('id-ID')}`;
    document.getElementById('monthly-expense').innerText = `Rp ${monthExpense.toLocaleString('id-ID')}`;
    document.getElementById('pending-count').innerText = pendingCount;
};

window.filterFinance = () => {
    const search = document.getElementById('finance-search').value.toLowerCase();
    const month = document.getElementById('filter-month').value;
    const year = document.getElementById('filter-year').value;
    const status = document.getElementById('filter-status').value;

    const filtered = allFinanceData.filter(d => {
        const date = d.date.seconds ? new Date(d.date.seconds * 1000) : new Date(d.date);
        const dStatus = d.status || 'completed';
        const matchSearch = (d.description || '').toLowerCase().includes(search) || (d.category || '').toLowerCase().includes(search);
        const matchMonth = month === "" || date.getMonth() == month;
        const matchYear = year === "" || date.getFullYear() == year;
        const matchStatus = status === "all" || dStatus === status;

        return matchSearch && matchMonth && matchYear && matchStatus;
    });

    window.renderFinanceTable(filtered);
};

window.renderFinanceTable = (data) => {
    const tbody = document.getElementById("finance-list-body");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: 20px;">Belum ada data transaksi</td></tr>';
        return;
    }

    data.forEach(d => {
        const dateRaw = d.date.seconds ? new Date(d.date.seconds * 1000) : new Date(d.date);
        const date = dateRaw.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const isIn = d.type === 'in';
        const amtClass = isIn ? 'text-success' : 'text-danger';
        const sign = isIn ? '+' : '-';
        const status = d.status || 'completed';

        let badgeClass = 'pending';
        let statusText = 'Pending';
        if (status === 'completed') { badgeClass = 'completed'; statusText = 'Selesai'; }
        else if (status === 'rejected') { badgeClass = 'rejected'; statusText = 'Ditolak'; }
        else if (status === 'pending') { badgeClass = 'pending'; statusText = 'Menunggu'; }

        tbody.innerHTML += `
        <tr>
            <td>${date}</td>
            <td>${d.category}</td>
            <td>${d.description}</td>
            <td><span class="status-badge ${badgeClass}">${statusText}</span></td>
            <td class="text-right ${amtClass}" style="font-weight:600;">${sign} Rp ${d.amount.toLocaleString('id-ID')}</td>
            <td>
                ${status === 'pending' ?
                `<button onclick="updateFinanceStatus('${d.id}', 'completed')" class="btn btn-sm btn-success" title="Terima" style="padding:2px 8px; margin-right:4px;">✓</button>
                 <button onclick="updateFinanceStatus('${d.id}', 'rejected')" class="btn btn-sm btn-danger" title="Tolak" style="padding:2px 8px;">✕</button>`
                :
                `<button onclick="deleteFinance('${d.id}')" class="btn btn-outline" style="padding: 4px 8px;">🗑️</button>`}
            </td>
        </tr>`;
    });
};

window.updateFinanceStatus = async (id, newStatus) => {
    if (!confirm(`Ubah status menjadi ${newStatus}?`)) return;
    await updateDoc(doc(db, "finance", id), { status: newStatus });
    window.showFinanceList();
};

window.deleteFinance = async (id) => {
    if (!confirm("Hapus transaksi ini permanen?")) return;
    await deleteDoc(doc(db, "finance", id));
    window.showFinanceList();
};

window.openFinanceForm = () => { document.getElementById('view-finance-list').classList.add('hidden'); document.getElementById('view-finance-form').classList.remove('hidden'); window.toggleCategories(); };
window.toggleCategories = () => {
    const t = document.getElementById("fin-type").value;
    const c = document.getElementById("fin-category"); c.innerHTML = "";
    (t === 'in' ? ["Donasi", "Sponsorship", "Lainnya"] : ["Operasional", "Gaji", "Pemeliharaan", "Lainnya"]).forEach(x => {
        const o = document.createElement('option'); o.value = x; o.text = x; c.appendChild(o);
    });
};
window.simpanKeuangan = async () => {
    await addDoc(collection(db, "finance"), {
        type: document.getElementById("fin-type").value,
        category: document.getElementById("fin-category").value,
        description: document.getElementById("fin-desc").value,
        amount: parseInt(document.getElementById("fin-amount").value) || 0,
        date: new Date(),
        status: 'completed' // Admin entry defaults to completed
    });
    alert("Disimpan!"); window.showFinanceList();
};

// --- TICKETS ---
window.monitorTickets = () => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    onSnapshot(query(collection(db, "ticket_transactions"), where("date", ">=", today), orderBy("date", "desc")), (snap) => {
        const container = document.getElementById("monitor-card-list");
        if (!container) return;

        container.innerHTML = "";
        if (snap.empty) {
            container.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">Belum ada transaksi hari ini</div>`;
            return;
        }

        snap.forEach(d => {
            const v = d.data();
            // Determine status style
            const isSuccess = (v.status || 'success') === 'success'; // Default success if undefined
            const bgIcon = isSuccess ? '#C6F6D5' : '#FEFCBF';
            const colorIcon = isSuccess ? '#2F855A' : '#D69E2E';
            const bgBadge = isSuccess ? '#C6F6D5' : '#FEFCBF';
            const colorBadge = isSuccess ? '#22543d' : '#744210';
            const statusText = isSuccess ? 'Sukses' : 'Pending';
            const icon = isSuccess ? '✓' : '⧖';

            const card = document.createElement('div');
            card.style.cssText = `background:white; border:1px solid #eee; padding:15px; border-radius:10px; box-shadow:0 2px 5px rgba(0,0,0,0.05); display:flex; justify-content:space-between; align-items:center; transition:0.2s;`;
            card.innerHTML = `
             <div style="display:flex; gap:15px; align-items:center;">
                 <div style="min-width:40px; height:40px; background:${bgIcon}; border-radius:50%; display:flex; align-items:center; justify-content:center; color:${colorIcon}; font-weight:bold; font-size:1.2rem;">
                     ${icon}
                 </div>
                 <div>
                     <div style="font-weight:bold; font-size:0.95rem; color:var(--text-main);">ID Tiket #${v.ticketID || '???'}</div>
                     <div style="font-size:0.8rem; color:#666; margin-top:2px;">
                         ${new Date(v.timestamp).toLocaleTimeString()} | <strong>${v.visitor_count} Tiket</strong> | Rp ${v.total_amount.toLocaleString()}
                     </div>
                     <div style="font-size:0.75rem; color:#999; margin-top:2px;">Staff: ${v.staff_email || 'System'}</div>
                 </div>
             </div>
             <div style="padding:5px 12px; border-radius:15px; font-size:0.75rem; font-weight:bold; background:${bgBadge}; color:${colorBadge};">
                 ${statusText}
             </div>`;

            container.appendChild(card);
        });
    });
};

window.syncPrice = (type, val) => {
    document.getElementById(`pset-${type}`).value = val;
    document.getElementById(`lbl-${type}-price`).innerText = "Rp " + parseInt(val).toLocaleString('id-ID');
};

window.loadHarga = async () => {
    const s = await getDoc(doc(db, "settings", "prices"));
    if (s.exists()) {
        const d = s.data();
        // Set inputs
        document.getElementById('pset-adult').value = d.adult;
        document.getElementById('pset-child').value = d.child;
        // Set sliders
        document.getElementById('slider-adult').value = d.adult;
        document.getElementById('slider-child').value = d.child;
        // Set labels
        document.getElementById('lbl-adult-price').innerText = "Rp " + d.adult.toLocaleString('id-ID');
        document.getElementById('lbl-child-price').innerText = "Rp " + d.child.toLocaleString('id-ID');
    }
};
window.simpanHarga = async () => {
    await setDoc(doc(db, "settings", "prices"), { adult: parseInt(document.getElementById('pset-adult').value), child: parseInt(document.getElementById('pset-child').value), last_updated: new Date() });
    alert("Harga tersimpan!");
};

// --- UMKM ---
window.showUMKMList = async () => {
    document.getElementById('view-umkm-list').classList.remove('hidden'); document.getElementById('view-umkm-form').classList.add('hidden');
    const snap = await getDocs(query(collection(db, "umkm"), orderBy("createdAt", "desc")));
    const tb = document.getElementById("umkm-list-body"); tb.innerHTML = "";
    snap.forEach(d => {
        const v = d.data();
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><strong>${v.name}</strong></td><td>${v.owner}</td><td><span class="badge badge-warning">${v.category}</span></td><td>${v.phone}</td>
        <td><button class="btn btn-outline" style="padding:2px 8px;">Edit</button></td>`;
        tr.querySelector('button').onclick = () => window.openUMKMForm(v, d.id);
        tb.appendChild(tr);
    });
};
window.openUMKMForm = (data = null, id = "") => {
    document.getElementById('view-umkm-list').classList.add('hidden'); document.getElementById('view-umkm-form').classList.remove('hidden');
    document.getElementById('umkm-id').value = id;
    document.getElementById('umkm-name').value = data ? data.name : "";
    document.getElementById('umkm-owner').value = data ? data.owner : "";
    document.getElementById('umkm-category').value = data ? data.category : "Kuliner";
    document.getElementById('umkm-phone').value = data ? data.phone : "";
    if (id) { document.getElementById('product-section').classList.remove('hidden'); window.loadProduk(id); document.getElementById('active-umkm-name').innerText = data.name; document.getElementById('active-umkm-id').value = id; }
    else document.getElementById('product-section').classList.add('hidden');
};
window.simpanUMKM = async () => {
    const id = document.getElementById('umkm-id').value;
    const p = { name: document.getElementById('umkm-name').value, owner: document.getElementById('umkm-owner').value, category: document.getElementById('umkm-category').value, phone: document.getElementById('umkm-phone').value };
    if (document.getElementById('umkm-pass').value) p.password = document.getElementById('umkm-pass').value;
    if (id) await updateDoc(doc(db, "umkm", id), p); else { p.createdAt = new Date(); await addDoc(collection(db, "umkm"), p); }
    alert("UMKM Tersimpan"); window.showUMKMList();
};
window.loadProduk = async (uid) => {
    const snap = await getDocs(query(collection(db, "products"), where("umkm_id", "==", uid)));
    const c = document.getElementById("product-list"); c.innerHTML = "";
    snap.forEach(d => { const v = d.data(); c.innerHTML += `<div style="padding:10px; border:1px solid #eee; border-radius:8px;">${v.name} - Rp ${v.price} (Stok: ${v.stock})</div>`; });
};

// --- ASSET ---
window.showAssetList = async () => {
    document.getElementById('view-asset-list').classList.remove('hidden'); document.getElementById('view-asset-form').classList.add('hidden');
    const snap = await getDocs(query(collection(db, "gov_assets")));
    const tb = document.getElementById("asset-list-body"); tb.innerHTML = "";
    const map = document.getElementById("asset-pin-container"); map.innerHTML = "";
    snap.forEach(d => {
        const v = d.data();
        tb.innerHTML += `<tr><td>${v.name}</td><td>${v.kib || '-'}</td><td><span class="badge ${v.condition === 'good' ? 'badge-success' : (v.condition === 'broken' ? 'badge-danger' : 'badge-warning')}">${v.condition}</span></td><td>Rp ${(v.price || 0).toLocaleString()}</td><td><button onclick="openAssetForm(null,'${d.id}')" class="btn btn-outline" style="padding:2px 8px;">Edit</button></td></tr>`;
        if (v.map_x) {
            const p = document.createElement('div');
            p.style.cssText = `position:absolute; left:${v.map_x}%; top:${v.map_y}%; width:10px; height:10px; border-radius:50%; background:${v.condition === 'good' ? 'green' : 'red'}; border:1px solid white; transform:translate(-50%,-50%);`;
            p.title = v.name; map.appendChild(p);
        }
    });
};
window.openAssetForm = async (_, id) => {
    document.getElementById('view-asset-list').classList.add('hidden'); document.getElementById('view-asset-form').classList.remove('hidden');
    window.switchAssetTab('data', document.querySelector('#view-asset-form .form-tab-btn'));
    if (id) {
        const d = (await getDoc(doc(db, "gov_assets", id))).data();
        document.getElementById('asset-id').value = id;
        document.getElementById('asset-name').value = d.name; document.getElementById('asset-kib').value = d.kib;
        document.getElementById('asset-cond').value = d.condition; document.getElementById('asset-price').value = d.price;
        document.getElementById('asset-x').value = d.map_x || 0; document.getElementById('asset-y').value = d.map_y || 0;
        const pin = document.getElementById('picker-pin');
        if (d.map_x) { pin.style.display = 'block'; pin.style.left = d.map_x + '%'; pin.style.top = d.map_y + '%'; } else pin.style.display = 'none';
    } else {
        document.getElementById('asset-id').value = ""; document.getElementById('asset-name').value = ""; document.getElementById('picker-pin').style.display = 'none';
    }
};
window.switchAssetTab = (t, btn) => { document.querySelectorAll('#view-asset-form .form-tab-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); document.getElementById('atab-data').classList.toggle('hidden', t !== 'data'); document.getElementById('atab-loc').classList.toggle('hidden', t !== 'loc'); };
window.pickLocation = (e) => {
    if (e.target.tagName !== 'IMG') return;
    const r = e.target.getBoundingClientRect();
    const x = Math.round(((e.clientX - r.left) / r.width) * 100); const y = Math.round(((e.clientY - r.top) / r.height) * 100);
    document.getElementById('asset-x').value = x; document.getElementById('asset-y').value = y;
    const p = document.getElementById('picker-pin'); p.style.display = 'block'; p.style.left = x + '%'; p.style.top = y + '%';
};
window.generateKIB = () => { document.getElementById('asset-kib').value = `02.06.01.${Math.floor(1000 + Math.random() * 9000)}`; };
window.simpanAset = async () => {
    const id = document.getElementById('asset-id').value;
    const d = { name: document.getElementById('asset-name').value, kib: document.getElementById('asset-kib').value, condition: document.getElementById('asset-cond').value, price: parseInt(document.getElementById('asset-price').value) || 0, map_x: parseInt(document.getElementById('asset-x').value) || 0, map_y: parseInt(document.getElementById('asset-y').value) || 0, updatedAt: new Date() };
    if (id) await updateDoc(doc(db, "gov_assets", id), d); else await addDoc(collection(db, "gov_assets"), d);
    alert("Aset tersimpan"); window.showAssetList();
};

// --- CONTENT (ENCYCLOPEDIA) ---
window.showContentList = async () => {
    document.getElementById('view-content-list').classList.remove('hidden'); document.getElementById('view-content-form').classList.add('hidden');
    // Fetch ALL for client-side search/pagination (better UX for small datasets < 1000)
    const snap = await getDocs(query(collection(db, "content_trees")));
    allFloraData = [];
    snap.forEach(d => allFloraData.push({ id: d.id, ...d.data() }));
    window.filterFlora('all', document.querySelector('.filter-pill.active'));
};
window.filterFlora = (type, btn) => {
    if (btn) { document.querySelectorAll('.filter-pills .filter-pill').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
    let filtered = type === 'all' ? allFloraData : allFloraData.filter(x => x.jenis === type);
    // Search filter
    const q = document.getElementById('flora-search').value.toLowerCase();
    if (q) filtered = filtered.filter(x => x.nama.toLowerCase().includes(q) || x.id.toLowerCase().includes(q) || (x.latin || "").toLowerCase().includes(q));

    // Pagination Reset
    currentFloraPage = 1;
    window.renderFloraTable(filtered);
};
window.handleSearchFlora = () => { window.filterFlora(document.querySelector('.filter-pills .filter-pill.active').textContent === 'Semua' ? 'all' : document.querySelector('.filter-pills .filter-pill.active').textContent, null); };
window.renderFloraTable = (data) => {
    document.getElementById('flora-total').innerText = data.length;
    const start = (currentFloraPage - 1) * floraPerPage;
    const end = start + floraPerPage;
    const pageData = data.slice(start, end);
    document.getElementById('flora-showing').innerText = pageData.length;

    const tbody = document.getElementById("content-list-body"); tbody.innerHTML = "";
    pageData.forEach(d => {
        const catClass = (d.jenis || 'Pohon').toLowerCase();
        tbody.innerHTML += `
        <tr>
            <td><img src="${d.foto || 'assets/icon-tree.png'}" class="table-thumb"></td>
            <td><span class="flora-name">${d.nama}</span><span class="flora-latin">${d.latin || '-'}</span><span class="flora-id-badge">${d.id}</span></td>
            <td><div class="cat-badge ${catClass}">${d.jenis}</div><div style="margin-top:5px; font-size:0.8rem; color:#666;">${d.status || '-'}</div></td>
            <td>${d.map_x ? `<span style="color:green;">📍 Terpetakan (${d.map_x},${d.map_y})</span>` : '<span style="color:red;">Belum ada lokasi</span>'}</td>
            <td style="text-align:right;"><button onclick="editTanaman('${d.id}')" class="btn btn-outline" style="padding:5px 10px;">✏️ Edit</button></td>
        </tr>`;
    });
    // Page Numbers
    const totalPages = Math.ceil(data.length / floraPerPage);
    const pContainer = document.getElementById('flora-page-numbers'); pContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        pContainer.innerHTML += `<button class="btn-page ${i === currentFloraPage ? 'active' : ''}" onclick="setFloraPage(${i})">${i}</button>`;
    }
};
window.setFloraPage = (p) => { currentFloraPage = p; window.handleSearchFlora(); }; // Re-trigger render with current filter
window.prevPageFlora = () => { if (currentFloraPage > 1) { currentFloraPage--; window.handleSearchFlora(); } };
window.nextPageFlora = () => { const total = Math.ceil((parseInt(document.getElementById('flora-total').innerText)) / floraPerPage); if (currentFloraPage < total) { currentFloraPage++; window.handleSearchFlora(); } };

window.openContentForm = (data = null, id = null) => {
    document.getElementById('view-content-list').classList.add('hidden'); document.getElementById('view-content-form').classList.remove('hidden');
    window.switchFormTab('info', document.querySelector('#view-content-form .form-tab-btn'));
    if (data && id) {
        document.getElementById('p-mode').value = 'edit'; document.getElementById('p-id').value = id; document.getElementById('p-id').disabled = true;
        document.getElementById('btn-delete-plant').classList.remove('hidden');
        document.getElementById('p-nama').value = data.nama; document.getElementById('p-latin').value = data.latin || "";
        document.getElementById('p-foto').value = data.foto || ""; document.getElementById('p-jenis').value = data.jenis || "Pohon";
        document.getElementById('p-x').value = data.map_x || 0; document.getElementById('p-y').value = data.map_y || 0;
        const pin = document.getElementById('p-pin'); if (data.map_x) { pin.style.display = 'block'; pin.style.left = data.map_x + '%'; pin.style.top = data.map_y + '%'; } else pin.style.display = 'none';
        document.getElementById('p-desc').value = data.desc || ""; document.getElementById('p-status').value = data.status || "";
        document.getElementById('p-asal').value = data.asal || ""; document.getElementById('p-guna').value = data.manfaat || "";
        document.getElementById('pop-status').value = data.detail_status || ""; document.getElementById('pop-asal').value = data.detail_asal || "";
        document.getElementById('pop-jenis').value = data.detail_jenis || ""; document.getElementById('pop-guna').value = data.detail_manfaat || "";
        document.getElementById('p-quest').value = data.quiz_question || ""; document.getElementById('p-ans').value = data.quiz_answer || "";
        if (data.quiz_options) { document.getElementById('p-opt1').value = data.quiz_options[0]; document.getElementById('p-opt2').value = data.quiz_options[1]; document.getElementById('p-opt3').value = data.quiz_options[2]; }
    } else {
        document.getElementById('p-mode').value = 'new'; document.getElementById('p-id').value = ""; document.getElementById('p-id').disabled = false;
        document.querySelectorAll('#view-content-form input, #view-content-form textarea').forEach(i => i.value = "");
        document.getElementById('p-jenis').value = "Pohon"; document.getElementById('p-pin').style.display = 'none';
    }
    window.updatePreviewImg();
};
window.editTanaman = async (id) => { const d = allFloraData.find(x => x.id === id); if (d) window.openContentForm(d, id); };
window.switchFormTab = (t, btn) => { document.querySelectorAll('.form-tab-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');['info', 'map', 'detail'].forEach(x => document.getElementById('ftab-' + x).classList.toggle('hidden', x !== t)); };
window.updatePreviewImg = () => { document.getElementById('preview-img').src = document.getElementById('p-foto').value || "assets/icon-tree.png"; };
window.pickPlantLoc = (e) => {
    if (e.target.tagName !== 'IMG') return;
    const r = e.target.getBoundingClientRect(); const x = Math.round(((e.clientX - r.left) / r.width) * 100); const y = Math.round(((e.clientY - r.top) / r.height) * 100);
    document.getElementById('p-x').value = x; document.getElementById('p-y').value = y;
    const p = document.getElementById('p-pin'); p.style.display = 'block'; p.style.left = x + '%'; p.style.top = y + '%';
};
window.resetPlantLoc = () => { document.getElementById('p-x').value = 0; document.getElementById('p-y').value = 0; document.getElementById('p-pin').style.display = 'none'; };
window.simpanTanaman = async () => {
    const id = document.getElementById('p-id').value.toLowerCase().replace(/\s+/g, '-'); if (!id) return alert("ID Wajib");
    const p = {
        nama: document.getElementById("p-nama").value, latin: document.getElementById("p-latin").value, foto: document.getElementById("p-foto").value,
        map_x: parseInt(document.getElementById("p-x").value) || 0, map_y: parseInt(document.getElementById("p-y").value) || 0,
        jenis: document.getElementById("p-jenis").value, status: document.getElementById("p-status").value, asal: document.getElementById("p-asal").value, manfaat: document.getElementById("p-guna").value,
        desc: document.getElementById("p-desc").value, detail_status: document.getElementById("pop-status").value, detail_asal: document.getElementById("pop-asal").value, detail_jenis: document.getElementById("pop-jenis").value, detail_manfaat: document.getElementById("pop-guna").value,
        quiz_question: document.getElementById("p-quest").value, quiz_answer: document.getElementById("p-ans").value, quiz_options: [document.getElementById("p-opt1").value, document.getElementById("p-opt2").value, document.getElementById("p-opt3").value]
    };
    await setDoc(doc(db, "content_trees", id), p); alert("Disimpan!"); window.showContentList();
};
window.hapusTanaman = async () => { if (confirm("Hapus?")) { await deleteDoc(doc(db, "content_trees", document.getElementById('p-id').value)); alert("Terhapus"); window.showContentList(); } };

// --- TREE UPDATE ---
// --- TREE UPDATE (MONITORING) ---
window.showTreeUpdateList = async () => {
    document.getElementById('view-tree-list').classList.remove('hidden');
    document.getElementById('view-tree-form').classList.add('hidden');

    // Fetch Updates
    const snap = await getDocs(query(collection(db, "tree_updates"), orderBy("date", "desc"), limit(20)));
    const tbody = document.getElementById("tree-list-body");
    tbody.innerHTML = "";

    // Ensure catalog data is loaded for Name resolution (if needed)
    // For now assuming we snapshot name in the update record for performance

    if (snap.empty) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center" style="padding:20px;">Belum ada update kondisi.</td></tr>';
        return;
    }

    snap.forEach(d => {
        const v = d.data();
        let condBadge = '<span class="status-badge completed">🟢 Sehat</span>';
        if (v.condition === 'Butuh Perhatian') condBadge = '<span class="status-badge warning">🟡 Butuh Perhatian</span>';
        if (v.condition === 'Kritis') condBadge = '<span class="status-badge rejected">🔴 Kritis</span>';

        const timeAgo = timeSince(v.date ? new Date(v.date.seconds * 1000) : new Date());

        tbody.innerHTML += `
        <tr>
            <td>
                <div style="font-weight:bold; color:var(--text-main);">${v.treeName || v.treeID}</div>
                <div style="font-size:0.8rem; color:#888;">${v.treeID}</div>
            </td>
            <td>
                <div style="position:relative; width:80px; height:50px; border-radius:8px; overflow:hidden;">
                    <img src="${v.photoURL || 'assets/icon-tree.png'}" style="width:100%; height:100%; object-fit:cover;">
                    <div style="position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.6); color:white; font-size:0.6rem; text-align:center;">${timeAgo}</div>
                </div>
            </td>
            <td>${condBadge}</td>
            <td style="text-align:right;">
                <button class="btn btn-outline" style="padding:5px 8px; border:none;" title="Lihat Detail">📄</button>
            </td>
        </tr>`;
    });
};

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " tahun lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bulan lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hari lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " menit lalu";
    return "Baru saja";
}

window.openTreeUpdateForm = async () => {
    document.getElementById('view-tree-list').classList.add('hidden');
    document.getElementById('view-tree-form').classList.remove('hidden');

    // Populate Dropdown from Catalog (Ensiklopedi)
    const select = document.getElementById('tu-tree-id');
    select.innerHTML = '<option value="">-- Loading Catalog... --</option>';

    // Fetch only IDs and Names for dropdown
    const snap = await getDocs(query(collection(db, "content_trees"), orderBy("nama", "asc")));
    select.innerHTML = '<option value="">-- Pilih ID Pohon --</option>';

    snap.forEach(d => {
        const v = d.data();
        select.innerHTML += `<option value="${d.id}" data-name="${v.nama}">${v.nama} (${d.id})</option>`;
    });

    // Reset Form
    document.getElementById('tu-id').value = "";
    document.getElementById('tu-condition').value = "Sehat";
    document.getElementById('tu-height').value = "";
    document.getElementById('tu-photo').value = "";
    document.getElementById('tu-preview').src = "assets/icon-tree.png";
    document.getElementById('tu-notes').value = "";
};

window.simpanUpdatePohon = async () => {
    const treeSelect = document.getElementById('tu-tree-id');
    const treeID = treeSelect.value;
    const treeName = treeSelect.options[treeSelect.selectedIndex]?.dataset.name || treeID;

    const condition = document.getElementById('tu-condition').value;
    const height = document.getElementById('tu-height').value;
    const photo = document.getElementById('tu-photo').value;
    const notes = document.getElementById('tu-notes').value;

    if (!treeID) return alert("Wajib memilih Pohon dari katalog!");

    const data = {
        treeID: treeID,
        treeName: treeName,
        condition: condition,
        height: height,
        photoURL: photo,
        notes: notes,
        date: new Date()
    };

    try {
        // 1. Save to History
        await addDoc(collection(db, "tree_updates"), data);

        // 2. Update Master Record in Catalog (Sync Condition & Photo)
        await updateDoc(doc(db, "content_trees", treeID), {
            status: condition,
            // Only update photo if provided, otherwise keep original
            ...(photo ? { foto: photo } : {}),
            last_update: new Date()
        });

        alert("Update Berhasil Dikirim!");
        window.showTreeUpdateList();
    } catch (e) {
        alert("Gagal update: " + e.message);
    }
};

// --- AUTO RECAP SYSTEM ---
window.checkAndRecapDailyTickets = async () => {
    const now = new Date();
    // Jalankan hanya jika lewat jam 17:00
    if (now.getHours() < 17) return;

    const dateId = now.toISOString().split('T')[0]; // Format YYYY-MM-DD
    const recapRef = doc(db, "daily_ticket_recaps", dateId);

    try {
        const recapSnap = await getDoc(recapRef);
        if (recapSnap.exists()) return; // Sudah direkap hari ini

        console.log("Memulai Rekap Otomatis Tiket...");

        // Hitung Transaksi Hari Ini (00:00 - 23:59)
        const start = new Date(now); start.setHours(0, 0, 0, 0);
        const end = new Date(now); end.setHours(23, 59, 59, 999);

        const q = query(collection(db, "ticket_transactions"),
            where("date", ">=", start),
            where("date", "<=", end)
        );

        const snap = await getDocs(q);
        let totalIncome = 0;
        let totalVisitors = 0;

        snap.forEach(d => {
            const val = d.data();
            totalIncome += (val.total_amount || 0);
            totalVisitors += (val.visitor_count || 0);
        });

        if (totalIncome > 0) {
            // 1. Simpan ke daily_ticket_recaps
            await setDoc(recapRef, {
                date_id: dateId,
                total_visitors: totalVisitors,
                total_income: totalIncome,
                synced_at: new Date()
            });

            // 2. Masukkan ke Buku Kas (Finance)
            await addDoc(collection(db, "finance"), {
                type: 'in',
                category: 'Tiket',
                description: `Rekap Otomatis Tiket (${dateId})`,
                amount: totalIncome,
                date: new Date(),
                status: 'completed',
                source_system: 'auto_ticket'
            });

            // Notifikasi Toast/Alert
            const msg = `Laporan Harian: ${totalVisitors} Pengunjung, Rp ${totalIncome.toLocaleString()} telah direkap ke Keuangan.`;
            alert(msg);

            // Jika sedang buka tab finance, refresh
            if (!document.getElementById('view-finance-list').classList.contains('hidden')) {
                window.showFinanceList();
            }
        } else {
            // Jika 0 pendapatan, tetap tandai sudah dicek agar tidak run terus
            await setDoc(recapRef, {
                date_id: dateId,
                total_visitors: 0,
                total_income: 0,
                synced_at: new Date(),
                note: "No transactions"
            });
        }
    } catch (e) {
        console.error("Auto Recap Error:", e);
    }
};

// --- BUDGETING SYSTEM (RAB) ---
window.switchFinSubTab = (t, btn) => {
    document.querySelectorAll('#tab-finance .form-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderBottom = 'none';
    });
    btn.classList.add('active');
    btn.style.borderBottom = '2px solid var(--primary-color)';

    document.getElementById('fsub-book').classList.toggle('hidden', t !== 'book');
    document.getElementById('fsub-budget').classList.toggle('hidden', t !== 'budget');

    if (t === 'budget') window.showBudgetList();
    if (t === 'book') window.showFinanceList();
};

window.showBudgetList = async () => {
    document.getElementById('view-budget-list').classList.remove('hidden');
    document.getElementById('view-budget-form').classList.add('hidden');
    document.getElementById('view-budget-realization').classList.add('hidden');

    const snap = await getDocs(query(collection(db, "finance_budgets"), orderBy("created_at", "desc")));
    const tbody = document.getElementById("budget-list-body");
    tbody.innerHTML = "";

    if (snap.empty) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center" style="padding:20px;">Belum ada anggaran.</td></tr>';
        return;
    }

    snap.forEach(d => {
        const v = d.data();
        const date = v.created_at ? new Date(v.created_at.seconds * 1000).toLocaleDateString('id-ID') : '-';
        let statusBadge = 'badge-warning';
        let statusText = v.status.toUpperCase();

        if (v.status === 'approved') { statusBadge = 'badge-info'; statusText = 'SIAP CAIR'; }
        if (v.status === 'funded') { statusBadge = 'badge-success'; statusText = 'DANA CAIR'; }
        if (v.status === 'realized') { statusBadge = 'badge-primary'; statusText = 'TEREALISASI'; }
        if (v.status === 'rejected') { statusBadge = 'badge-danger'; statusText = 'DITOLAK'; }

        let actionBtn = `<button onclick="window.openBudgetForm('${d.id}')" class="btn btn-outline" style="padding:4px 8px;">Detail</button>`;

        // Flow: PROPOSED -> APPROVED -> FUNDED -> REALIZED
        if (v.status === 'approved') {
            actionBtn += ` <button onclick="window.disburseBudget('${d.id}', '${v.title}', ${v.total_estimation})" class="btn btn-primary" style="padding:4px 8px;">💸 Cairkan Dana</button>`;
        }
        if (v.status === 'funded') {
            actionBtn += ` <button onclick="window.openRealizationMock('${d.id}', '${v.title}', ${v.total_estimation})" class="btn btn-success" style="padding:4px 8px;">✅ Realisasi</button>`;
        }

        tbody.innerHTML += `
        <tr>
            <td>${date}</td>
            <td><strong>${v.title}</strong><br><small style="color:#666">${v.description || ''}</small></td>
            <td><span class="badge ${statusBadge}">${statusText}</span></td>
            <td>Rp ${v.total_estimation.toLocaleString()}</td>
            <td>${actionBtn}</td>
        </tr>`;
    });
};

window.openBudgetForm = async (id = null) => {
    document.getElementById('view-budget-list').classList.add('hidden');
    document.getElementById('view-budget-form').classList.remove('hidden');
    document.getElementById('budget-items-body').innerHTML = "";

    // Reset Form State
    const formInputs = document.querySelectorAll('#view-budget-form input, #view-budget-form textarea');
    formInputs.forEach(el => el.disabled = false);
    document.getElementById('btn-save-budget').classList.remove('hidden');
    document.getElementById('btn-add-item-row').classList.remove('hidden');
    document.getElementById('btn-delete-budget').classList.add('hidden'); // Default hidden

    if (id) {
        document.getElementById('budget-id').value = id;
        const d = (await getDoc(doc(db, "finance_budgets", id))).data();
        document.getElementById('budget-title').value = d.title;
        document.getElementById('budget-desc').value = d.description || "";
        document.getElementById('budget-total-display').innerText = "Rp " + d.total_estimation.toLocaleString();

        // CHECK STATUS FOR READ-ONLY MODE
        // If Approved, Funded, or Realized, make it Read-Only
        if (['approved', 'funded', 'realized'].includes(d.status)) {
            formInputs.forEach(el => el.disabled = true);
            document.getElementById('btn-save-budget').classList.add('hidden');
            document.getElementById('btn-add-item-row').classList.add('hidden');
            // Delete button stays hidden
        } else {
            document.getElementById('btn-delete-budget').classList.remove('hidden');
        }

        // Load Items
        if (d.items) {
            d.items.forEach(item => window.addBudgetRow(item, ['approved', 'funded', 'realized'].includes(d.status)));
        }
    } else {
        document.getElementById('budget-id').value = "";
        document.getElementById('budget-title').value = "";
        document.getElementById('budget-desc').value = "";
        document.getElementById('budget-total-display').innerText = "Rp 0";
        window.addBudgetRow(); // Add 1 empty row
    }
};

window.addBudgetRow = (data = null, readOnly = false) => {
    const tbody = document.getElementById('budget-items-body');
    const tr = document.createElement('tr');
    tr.className = 'budget-item-row';
    const disabledAttr = readOnly ? 'disabled' : '';
    const deleteBtn = readOnly ? '' : `<button onclick="this.closest('tr').remove(); window.calcBudgetTotal();" class="btn btn-danger" style="padding:2px 6px;">x</button>`;

    tr.innerHTML = `
        <td><input type="text" class="form-input item-name" placeholder="Nama Barang" value="${data ? data.name : ''}" ${disabledAttr}></td>
        <td><input type="number" class="form-input item-qty" placeholder="1" value="${data ? data.qty : ''}" oninput="window.calcBudgetTotal()" ${disabledAttr}></td>
        <td><input type="number" class="form-input item-price" placeholder="0" value="${data ? data.price : ''}" oninput="window.calcBudgetTotal()" ${disabledAttr}></td>
        <td class="item-subtotal">Rp ${(data ? data.total : 0).toLocaleString()}</td>
        <td>${deleteBtn}</td>
    `;
    tbody.appendChild(tr);
    if (!data) window.calcBudgetTotal();
};

window.calcBudgetTotal = () => {
    let total = 0;
    document.querySelectorAll('.budget-item-row').forEach(row => {
        const qty = parseInt(row.querySelector('.item-qty').value) || 0;
        const price = parseInt(row.querySelector('.item-price').value) || 0;
        const sub = qty * price;
        total += sub;
        row.querySelector('.item-subtotal').innerText = "Rp " + sub.toLocaleString();
    });
    document.getElementById('budget-total-display').innerText = "Rp " + total.toLocaleString();
    return total;
};

window.simpanBudget = async () => {
    const title = document.getElementById('budget-title').value;
    const desc = document.getElementById('budget-desc').value;
    if (!title) return alert("Judul Proyek Wajib Diisi");

    let items = [];
    document.querySelectorAll('.budget-item-row').forEach(row => {
        const name = row.querySelector('.item-name').value;
        if (name) {
            items.push({
                name: name,
                qty: parseInt(row.querySelector('.item-qty').value) || 0,
                price: parseInt(row.querySelector('.item-price').value) || 0,
                total: (parseInt(row.querySelector('.item-qty').value) || 0) * (parseInt(row.querySelector('.item-price').value) || 0)
            });
        }
    });

    if (items.length === 0) return alert("Harus ada minimal 1 item barang");

    const total = window.calcBudgetTotal();
    const id = document.getElementById('budget-id').value;

    const data = {
        title: title,
        description: desc,
        items: items,
        total_estimation: total,
        updated_at: new Date()
    };

    try {
        if (id) {
            await updateDoc(doc(db, "finance_budgets", id), data);
        } else {
            data.created_at = new Date();
            data.status = 'approved'; // Auto-approve for simplified flow as per plan
            await addDoc(collection(db, "finance_budgets"), data);
        }

        alert("Anggaran Tersimpan!");
        window.showBudgetList();
    } catch (e) {
        console.error("Gagal menyimpan anggaran:", e);
        alert("Gagal menyimpan: " + e.message);
    }
};

window.deleteBudget = async () => {
    const id = document.getElementById('budget-id').value;
    if (!id || !confirm("Hapus Anggaran Ini?")) return;
    await deleteDoc(doc(db, "finance_budgets", id));
    window.showBudgetList();
};

// --- REALIZATION FLOW ---
window.openRealizationMock = (id, title, est) => {
    document.getElementById('view-budget-list').classList.add('hidden');
    document.getElementById('view-budget-realization').classList.remove('hidden');

    document.getElementById('real-budget-id').value = id;
    document.getElementById('real-project-name').innerText = title;
    document.getElementById('real-project-est').innerText = "Rp " + est.toLocaleString();
    document.getElementById('real-amount').value = est; // Pre-fill with estimation
    document.getElementById('real-proof').value = "";
    document.getElementById('real-note').value = "";
};

window.disburseBudget = async (id, title, amount) => {
    if (!confirm(`CAIRKAN DANA AGGARAN?\n\nProyek: ${title}\nJumlah: Rp ${amount.toLocaleString()}\n\nDana akan masuk ke Pemasukan (Debit) sebagai modal awal pelaksanaan.`)) return;

    // 1. Create Income Transaction (Pencairan)
    const trxRef = await addDoc(collection(db, "finance"), {
        type: 'in',
        category: 'Pencairan Anggaran',
        description: `Pencairan Dana Proyek: ${title}`,
        amount: amount,
        date: new Date(),
        status: 'completed',
        source_system: 'budget_disbursement',
        budget_ref: id
    });

    // 2. Update Budget Status -> FUNDED
    await updateDoc(doc(db, "finance_budgets", id), {
        status: 'funded',
        funded_at: new Date(),
        funding_ref: trxRef.id
    });

    alert("Dana Berhasil Dicairkan! Silakan lakukan realisasi belanja.");
    window.showBudgetList();
};

window.submitRealization = async () => {
    const id = document.getElementById('real-budget-id').value;
    const amount = parseInt(document.getElementById('real-amount').value) || 0;
    const proof = document.getElementById('real-proof').value;
    const note = document.getElementById('real-note').value;
    const title = document.getElementById('real-project-name').innerText;

    if (!amount || amount <= 0) return alert("Nominal Realisasi Tidak Valid");
    if (!proof) return alert("Wajib menyertakan Link Bukti / Nota");

    // 1. Create Finance Transaction (Expense)
    const trxRef = await addDoc(collection(db, "finance"), {
        type: 'out',
        category: 'Belanja Operasional',
        description: `Realisasi: ${title}. ${note}`,
        amount: amount,
        proof_url: proof,
        budget_ref: id,
        date: new Date(),
        status: 'completed',
        source_system: 'manual_budget'
    });

    // 2. Update Budget Status -> REALIZED
    await updateDoc(doc(db, "finance_budgets", id), {
        status: 'realized',
        realization_ref: trxRef.id,
        realized_amount: amount,
        realized_at: new Date(),
        realization_proof: proof
    });

    alert("Realisasi Berhasil Dicatat!");
    window.showBudgetList();
    // Also refresh finance list if open
    if (!document.getElementById('view-finance-list').classList.contains('hidden')) window.showFinanceList();
};



window.printBudget = () => {
    const title = document.getElementById('budget-title').value;
    const items = [];
    document.querySelectorAll('.budget-item-row').forEach(row => {
        items.push({
            name: row.querySelector('.item-name').value,
            qty: row.querySelector('.item-qty').value,
            price: row.querySelector('.item-price').value,
            total: row.querySelector('.item-subtotal').innerText
        });
    });
    const total = document.getElementById('budget-total-display').innerText;

    // Render Print Template
    const pa = document.getElementById('print-area');
    pa.innerHTML = `
      <div class="print-header">
          <div class="print-logo">🌲 TALKING FOREST</div>
          <div class="print-subtitle">Desa Wisata Pongo</div>
      </div>
      <h2 class="print-title" style="text-align:center;">RENCANA ANGGARAN BIAYA (RAB)</h2>
      <div class="print-meta">
          <strong>Kegiatan:</strong> ${title}<br>
          <strong>Tanggal:</strong> ${new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </div>
      <table class="print-table">
          <thead><tr><th>No</th><th>Uraian Barang/Jasa</th><th>Vol</th><th>Harga Satuan</th><th>Total</th></tr></thead>
          <tbody>
              ${items.map((it, i) => `<tr>
                  <td style="text-align:center">${i + 1}</td>
                  <td>${it.name}</td>
                  <td style="text-align:center">${it.qty}</td>
                  <td style="text-align:right">Rp ${parseInt(it.price).toLocaleString()}</td>
                  <td style="text-align:right">${it.total}</td>
              </tr>`).join('')}
              <tr>
                  <td colspan="4" style="text-align:right; font-weight:bold;">TOTAL ESTIMASI</td>
                  <td style="text-align:right; font-weight:bold;">${total}</td>
              </tr>
          </tbody>
      </table>
      <div class="print-footer">
           <div class="sign-box">
               <div>Mengetahui,<br>Kepala Desa</div>
               <div class="sign-space"></div>
               <div>( ........................... )</div>
           </div>
           <div class="sign-box">
               <div>Dibuat Oleh,<br>Admin Wisata</div>
               <div class="sign-space"></div>
               <div>( ........................... )</div>
           </div>
      </div>
   `;

    // Execute Print
    document.body.classList.add('printing');
    // Short delay to ensure DOM render
    setTimeout(() => {
        window.print();
        document.body.classList.remove('printing');
    }, 100);
};

// --- MITRA UMKM MANAGEMENT ---
let cachedUMKM = []; // Local cache for filtering

window.showUMKMList = async () => {
    document.getElementById('view-umkm-list').classList.remove('hidden');
    document.getElementById('view-umkm-form').classList.add('hidden');

    // Fetch if cache empty or requested refresh
    if (cachedUMKM.length === 0) {
        const snap = await getDocs(query(collection(db, "umkm"), orderBy("name", "asc")));
        cachedUMKM = [];
        snap.forEach(d => {
            cachedUMKM.push({ id: d.id, ...d.data() });
        });
    }

    window.renderUMKMTable(cachedUMKM);
};

window.renderUMKMTable = (data) => {
    const tbody = document.getElementById("umkm-list-body");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center" style="padding:20px;">Tidak ada mitra ditemukan.</td></tr>';
        return;
    }

    data.forEach(item => {
        let statusBadge = item.status === 'active'
            ? '<span class="status-badge completed" style="font-size:0.8rem;">● Aktif</span>'
            : '<span class="status-badge rejected" style="font-size:0.8rem;">● Non-Aktif</span>';

        let categoryBadge = `<span style="background:#FFF7ED; color:#C2410C; padding:4px 10px; border-radius:15px; font-size:0.8rem; font-weight:600;">${item.category}</span>`;
        if (item.category === 'Jasa') categoryBadge = `<span style="background:#F3E8FF; color:#7E22CE; padding:4px 10px; border-radius:15px; font-size:0.8rem; font-weight:600;">${item.category}</span>`;
        if (item.category === 'Fashion') categoryBadge = `<span style="background:#FCE7F3; color:#DB2777; padding:4px 10px; border-radius:15px; font-size:0.8rem; font-weight:600;">${item.category}</span>`;

        // Generate Initials
        let initials = item.name.substring(0, 2).toUpperCase();
        let avatarColor = '#ED8936'; // Orange default
        if (item.id.charCodeAt(0) % 3 === 0) avatarColor = '#4299E1'; // Blue
        if (item.id.charCodeAt(0) % 3 === 1) avatarColor = '#9F7AEA'; // Purple

        const avatar = `<div style="width:35px; height:35px; background:${avatarColor}; color:white; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:0.8rem;">${initials}</div>`;

        tbody.innerHTML += `
        <tr>
            <td>
                <div style="display:flex; align-items:center; gap:12px;">
                    ${avatar}
                    <div>
                        <div style="font-weight:bold; color:var(--text-main);">${item.name}</div>
                        <div style="font-size:0.8rem; color:#888;">ID: ${item.id.substring(0, 6).toUpperCase()}</div>
                    </div>
                </div>
            </td>
            <td>${categoryBadge}</td>
            <td>
                <div style="font-size:0.85rem;">📞 ${item.phone || '-'}</div>
                <div style="font-size:0.8rem; color:#666;">✉️ ${item.email || '-'}</div>
            </td>
            <td>${statusBadge}</td>
            <td style="text-align:right;">
                <button onclick="window.openUMKMForm('${item.id}')" class="btn btn-outline" style="padding:5px 8px; border:none;" title="Edit">✏️</button>
                <button onclick="window.deleteUMKM('${item.id}', '${item.name}')" class="btn btn-outline" style="padding:5px 8px; border:none; color:red;" title="Hapus">🗑️</button>
            </td>
        </tr>`;
    });

    document.getElementById('umkm-pagination').innerText = `Menampilkan ${data.length} mitra`;
};

window.searchUMKM = () => {
    const term = document.getElementById('umkm-search').value.toLowerCase();
    const cat = document.getElementById('umkm-filter-cat').value;

    const filtered = cachedUMKM.filter(item => {
        const matchName = item.name.toLowerCase().includes(term) || (item.owner && item.owner.toLowerCase().includes(term));
        const matchCat = cat === "" || item.category === cat;
        return matchName && matchCat;
    });

    window.renderUMKMTable(filtered);
};

window.openUMKMForm = async (id = null) => {
    document.getElementById('view-umkm-list').classList.add('hidden');
    document.getElementById('view-umkm-form').classList.remove('hidden');
    document.getElementById('product-section').classList.add('hidden');

    if (id) {
        document.getElementById('umkm-id').value = id;
        const d = cachedUMKM.find(x => x.id === id) || (await getDoc(doc(db, "umkm", id))).data();

        document.getElementById('umkm-name').value = d.name;
        document.getElementById('umkm-owner').value = d.owner || "";
        document.getElementById('umkm-category').value = d.category || "Kuliner";
        document.getElementById('umkm-phone').value = d.phone || "";
        document.getElementById('umkm-email').value = d.email || "";
        document.getElementById('umkm-status').value = d.status || "active";
        document.getElementById('umkm-pass').value = ""; // Don't show password

        // Setup Product Management Link
        document.getElementById('product-section').classList.remove('hidden');
        document.getElementById('active-umkm-name').innerText = d.name;
        document.getElementById('active-umkm-id').value = id;
        // window.loadProducts(id); // To be implemented if needed
    } else {
        document.getElementById('umkm-id').value = "";
        document.getElementById('umkm-name').value = "";
        document.getElementById('umkm-owner').value = "";
        document.getElementById('umkm-category').value = "Kuliner";
        document.getElementById('umkm-phone').value = "";
        document.getElementById('umkm-email').value = "";
        document.getElementById('umkm-status').value = "active";
        document.getElementById('umkm-pass').value = "";
    }
};

window.simpanUMKM = async () => {
    const id = document.getElementById('umkm-id').value;
    const name = document.getElementById('umkm-name').value;
    const owner = document.getElementById('umkm-owner').value;
    const cat = document.getElementById('umkm-category').value;
    const phone = document.getElementById('umkm-phone').value;
    const email = document.getElementById('umkm-email').value;
    const status = document.getElementById('umkm-status').value;
    const pass = document.getElementById('umkm-pass').value;

    if (!name) return alert("Nama Mitra Wajib Diisi");

    const data = {
        name: name,
        owner: owner,
        category: cat,
        phone: phone,
        email: email,
        status: status,
        updated_at: new Date()
    };

    if (pass) data.password = pass; // Only update if filled

    try {
        if (id) {
            await updateDoc(doc(db, "umkm", id), data);
        } else {
            data.created_at = new Date();
            await addDoc(collection(db, "umkm"), data);
        }

        alert("Data Mitra Berhasil Disimpan!");
        cachedUMKM = []; // Clear cache to reload
        window.showUMKMList();
    } catch (e) {
        alert("Gagal menyimpan: " + e.message);
    }
};

window.deleteUMKM = async (id, name) => {
    if (!confirm(`Hapus mitra "${name}"? Data yang dihapus tidak bisa dikembalikan.`)) return;
    try {
        await deleteDoc(doc(db, "umkm", id));
        alert("Mitra Berhasil Dihapus");
        cachedUMKM = [];
        window.showUMKMList();
    } catch (e) {
        alert("Gagal menghapus: " + e.message);
    }
};

// --- ASSET MANAGEMENT (GIS) ---
let cachedAssets = [];

window.showAssetList = async () => {
    document.getElementById('view-asset-list').classList.remove('hidden');
    document.getElementById('view-asset-form').classList.add('hidden');

    // Fetch Data
    const snap = await getDocs(query(collection(db, "assets"), orderBy("name", "asc")));
    cachedAssets = [];
    const pinContainer = document.getElementById('asset-pin-container');
    pinContainer.innerHTML = ""; // Clear map pins

    const tbody = document.getElementById("asset-list-body");
    tbody.innerHTML = "";

    if (snap.empty) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center" style="padding:20px;">Belum ada aset tercatat.</td></tr>';
        return;
    }

    snap.forEach(d => {
        const item = { id: d.id, ...d.data() };
        cachedAssets.push(item);

        // Render Map Pin if location exists
        if (item.loc_x && item.loc_y) {
            const pin = document.createElement('div');
            pin.style.position = 'absolute';
            pin.style.left = item.loc_x + '%';
            pin.style.top = item.loc_y + '%';
            pin.style.width = '12px';
            pin.style.height = '12px';
            pin.style.background = 'red';
            pin.style.borderRadius = '50%';
            pin.style.border = '2px solid white';
            pin.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            pin.title = item.name;
            pinContainer.appendChild(pin);
        }

        // Render Table Row
        let condBadge = '<span class="status-badge completed">🟢 Baik</span>';
        if (item.condition === 'repair') condBadge = '<span class="status-badge warning">🟡 Perbaikan</span>';
        if (item.condition === 'broken') condBadge = '<span class="status-badge rejected">🔴 Rusak</span>';

        tbody.innerHTML += `
        <tr>
            <td><strong>${item.name}</strong><br><small style="color:#666">${item.year || '-'}</small></td>
            <td>${item.kib || '-'}</td>
            <td>${condBadge}</td>
            <td>Rp ${(item.price || 0).toLocaleString()}</td>
            <td style="text-align:right;">
                 <button onclick="window.openAssetForm('${item.id}')" class="btn btn-outline" style="padding:5px 12px; border-radius:15px; font-size:0.85rem;">Edit</button>
            </td>
        </tr>`;
    });
};

window.openAssetForm = async (id = null) => {
    document.getElementById('view-asset-list').classList.add('hidden');
    document.getElementById('view-asset-form').classList.remove('hidden');

    // Reset Tabs
    window.switchAssetTab('data', document.querySelector('.form-tab-btn'));

    if (id) {
        document.getElementById('asset-id').value = id;
        const d = cachedAssets.find(x => x.id === id) || (await getDoc(doc(db, "assets", id))).data();

        document.getElementById('asset-name').value = d.name;
        document.getElementById('asset-kib').value = d.kib || "";
        document.getElementById('asset-cond').value = d.condition || "good";
        document.getElementById('asset-price').value = d.price || 0;
        document.getElementById('asset-year').value = d.year || new Date().getFullYear();
        document.getElementById('asset-source').value = d.source || "";

        document.getElementById('asset-x').value = d.loc_x || "";
        document.getElementById('asset-y').value = d.loc_y || "";

        updatePickerPin(d.loc_x, d.loc_y);
    } else {
        document.getElementById('asset-id').value = "";
        document.getElementById('asset-name').value = "";
        document.getElementById('asset-kib').value = "";
        document.getElementById('asset-cond').value = "good";
        document.getElementById('asset-price').value = 0;
        document.getElementById('asset-year').value = new Date().getFullYear();
        document.getElementById('asset-source').value = "";
        document.getElementById('asset-x').value = "";
        document.getElementById('asset-y').value = "";
        updatePickerPin(null, null);
    }
};

window.switchAssetTab = (tab, btn) => {
    document.querySelectorAll('#view-asset-form .form-tab-btn').forEach(b => {
        b.classList.remove('active');
        b.style.borderBottom = 'none';
        b.style.color = '#888';
    });
    btn.classList.add('active');
    btn.style.borderBottom = '2px solid var(--primary-color)';
    btn.style.color = 'var(--primary-color)';

    document.getElementById('atab-data').classList.toggle('hidden', tab !== 'data');
    document.getElementById('atab-loc').classList.toggle('hidden', tab !== 'loc');
};

window.generateKIB = () => {
    const year = document.getElementById('asset-year').value;
    const rnd = Math.floor(Math.random() * 9000) + 1000;
    document.getElementById('asset-kib').value = `02.06.01.${rnd}`;
};

window.pickLocation = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    document.getElementById('asset-x').value = x.toFixed(2);
    document.getElementById('asset-y').value = y.toFixed(2);
    updatePickerPin(x, y);
};

function updatePickerPin(x, y) {
    const pin = document.getElementById('picker-pin');
    if (x && y) {
        pin.style.left = x + '%';
        pin.style.top = y + '%';
        pin.style.display = 'block';
    } else {
        pin.style.display = 'none';
    }
}

window.simpanAset = async () => {
    const id = document.getElementById('asset-id').value;
    const name = document.getElementById('asset-name').value;
    const kib = document.getElementById('asset-kib').value;
    const cond = document.getElementById('asset-cond').value;
    const price = parseInt(document.getElementById('asset-price').value) || 0;
    const year = parseInt(document.getElementById('asset-year').value) || 0;
    const source = document.getElementById('asset-source').value;
    const lx = parseFloat(document.getElementById('asset-x').value);
    const ly = parseFloat(document.getElementById('asset-y').value);

    if (!name) return alert("Nama Aset Wajib Diisi");

    const data = {
        name: name,
        kib: kib,
        condition: cond,
        price: price,
        year: year,
        source: source,
        loc_x: lx || null,
        loc_y: ly || null,
        updated_at: new Date()
    };

    try {
        if (id) {
            await updateDoc(doc(db, "assets", id), data);
        } else {
            data.created_at = new Date();
            await addDoc(collection(db, "assets"), data);
        }

        alert("Data Aset Berhasil Disimpan!");
        window.showAssetList();
    } catch (e) {
        alert("Gagal menyimpan: " + e.message);
    }
};

// Also show/hide Print button in openBudgetForm
const originalOpenBudgetForm = window.openBudgetForm;
window.openBudgetForm = async (id = null) => {
    await originalOpenBudgetForm(id);
    if (id) {
        document.getElementById('btn-print-budget').classList.remove('hidden');
    } else {
        document.getElementById('btn-print-budget').classList.add('hidden');
    }
};
import { db, collection, getDocs, query, where, addDoc, updateDoc, doc, getDoc, orderBy, deleteDoc, setDoc } from "./firebase-config.js";

// STATE
let currentUMKM = null;
let products = [];
let cart = {};
let categories = ["Makanan", "Minuman", "Jasa"]; // Default

// --- INIT ---
window.onload = async () => {
    // 1. Load Login Dropdown
    const q = query(collection(db, "umkm"));
    const snap = await getDocs(q);
    const select = document.getElementById('login-umkm-list');
    snap.forEach(d => {
        select.innerHTML += `<option value="${d.id}">${d.data().name}</option>`;
    });

    // 2. Check Session
    const savedID = localStorage.getItem('warung_id');
    if (savedID) resumeSession(savedID);
};

window.handleLogin = async () => {
    const id = document.getElementById('login-umkm-list').value;
    const pass = document.getElementById('login-pass').value;
    if (!id || !pass) return alert("Isi lengkap bos!");

    try {
        const snap = await getDoc(doc(db, "umkm", id));
        if (snap.exists() && snap.data().password === pass) {
            localStorage.setItem('warung_id', id);
            resumeSession(id);
        } else {
            alert("Password Salah!");
        }
    } catch (e) { alert(e.message); }
};

window.logout = () => {
    if (confirm("Keluar?")) {
        localStorage.removeItem('warung_id');
        location.reload();
    }
};

async function resumeSession(id) {
    try {
        const snap = await getDoc(doc(db, "umkm", id));
        if (snap.exists()) {
            currentUMKM = { id: snap.id, ...snap.data() };
            document.getElementById('warung-name-display').textContent = currentUMKM.name;

            // Load Custom Categories if any
            if (currentUMKM.custom_categories) {
                categories = [...new Set([...categories, ...currentUMKM.custom_categories])];
            }

            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-screen').style.display = 'flex';

            loadDataAll();
        }
    } catch (e) { console.error(e); }
}

function loadDataAll() {
    loadProducts();
    renderCategoryTabs();
    loadReport();
}

// --- TABS ---
window.switchTab = (tabName) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabName}`).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if (tabName === 'laporan') loadReport();
};

// --- KASIR LOGIC ---
async function loadProducts() {
    try {
        products = [];
        // Remove orderBy to avoid "Missing Index" error on Firestore
        const q = query(collection(db, "products"), where("umkm_id", "==", currentUMKM.id));
        const snap = await getDocs(q);
        snap.forEach(d => products.push({ id: d.id, ...d.data() }));

        // Client-side sort
        products.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

        renderProductGrid(products);
        renderCMSList(products);
    } catch (e) {
        console.error(e);
        alert("Gagal memuat produk: " + e.message);
    }
}

function renderProductGrid(list) {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = "";
    list.filter(p => p.is_available !== false).forEach(p => {
        const isOOS = p.stock <= 0;
        grid.innerHTML += `
            <div class="product-card ${isOOS ? 'no-stock' : ''}" onclick="addToCart('${p.id}')">
                <div style="font-size:2rem; margin-bottom:5px;">${getIcon(p.category)}</div>
                <div style="font-weight:bold; color:#2c3e50;">${p.name}</div>
                <div style="color:#27ae60;">Rp ${p.price.toLocaleString('id-ID')}</div>
                <div style="font-size:0.8rem; color:${isOOS ? 'red' : '#888'};">Stok: ${p.stock}</div>
            </div>
        `;
    });
}

function getIcon(cat) {
    if (cat === 'Makanan') return '🍜';
    if (cat === 'Minuman') return '🥤';
    if (cat === 'Jasa') return '🛠️';
    return '📦';
}

function renderCategoryTabs() {
    // 1. Kasir Tabs
    const kasirDiv = document.getElementById('kasir-cats');
    kasirDiv.innerHTML = `<button class="cat-btn active" onclick="filterCat('all')">Semua</button>`;
    categories.forEach(c => {
        kasirDiv.innerHTML += `<button class="cat-btn" onclick="filterCat('${c}')">${c}</button>`;
    });

    // 2. CMS Select
    const cmsSelect = document.getElementById('cms-cat');
    cmsSelect.innerHTML = "";
    categories.forEach(c => {
        cmsSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
}

window.filterCat = (cat) => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    if (cat === 'all') renderProductGrid(products);
    else renderProductGrid(products.filter(p => p.category === cat));
};

// --- CART ---
window.addToCart = (pid) => {
    const prod = products.find(p => p.id === pid);
    if (!prod || prod.stock <= 0) return;

    if (cart[pid]) {
        if (cart[pid].qty < prod.stock) cart[pid].qty++;
    } else {
        cart[pid] = { ...prod, qty: 1 };
    }
    updateCartUI();
};

window.changeQty = (pid, delta) => {
    if (!cart[pid]) return;
    const newQty = cart[pid].qty + delta;
    if (newQty <= 0) delete cart[pid];
    else if (newQty <= cart[pid].stock) cart[pid].qty = newQty;
    else alert("Mentok Stok!");
    updateCartUI();
};

function updateCartUI() {
    const div = document.getElementById("cart-items");
    div.innerHTML = "";
    let total = 0;

    Object.values(cart).forEach(item => {
        total += item.price * item.qty;
        div.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>@${item.price.toLocaleString('id-ID')}</small>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button onclick="changeQty('${item.id}', -1)" style="width:25px; height:25px;">-</button>
                    <strong>${item.qty}</strong>
                    <button onclick="changeQty('${item.id}', 1)" style="width:25px; height:25px;">+</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-total").textContent = `Rp ${total.toLocaleString('id-ID')}`;
    document.getElementById("cart-count").textContent = Object.values(cart).reduce((a, b) => a + b.qty, 0);
    document.getElementById("btn-checkout").disabled = total === 0;
}

window.processCheckout = async () => {
    if (!confirm("Bayar dan Proses?")) return;

    const items = Object.values(cart).map(i => ({
        id: i.id, name: i.name, qty: i.qty, price: i.price, hpp: i.hpp || 0,
        subtotal: i.price * i.qty
    }));
    const total = items.reduce((a, b) => a + b.subtotal, 0);

    try {
        await addDoc(collection(db, "umkm_transactions"), {
            umkm_id: currentUMKM.id, umkm_name: currentUMKM.name,
            items, total_amount: total, timestamp: new Date()
        });

        for (let item of items) {
            await updateDoc(doc(db, "products", item.id), {
                stock: item.stock - item.qty
            });
        }

        alert("✅ Lunas!");
        cart = {};
        updateCartUI();
        loadProducts(); // Refresh stock
        loadReport(); // Update report
    } catch (e) { alert("Error: " + e.message); }
};

// --- CMS LOGIC ---
window.addCustomCategory = async () => {
    const newCat = prompt("Nama Kategori Baru:");
    if (!newCat) return;

    if (!categories.includes(newCat)) {
        categories.push(newCat);
        // Save to UMKM doc
        await updateDoc(doc(db, "umkm", currentUMKM.id), {
            custom_categories: categories
        });
        renderCategoryTabs();
    }
};

window.saveCMS = async () => {
    const id = document.getElementById('cms-id').value;
    const name = document.getElementById('cms-name').value;
    const price = parseInt(document.getElementById('cms-price').value);
    const stock = parseInt(document.getElementById('cms-stock').value) || 0;
    const hpp = parseInt(document.getElementById('cms-hpp').value) || 0;
    const cat = document.getElementById('cms-cat').value;

    if (!name || !price) return alert("Nama & Harga Wajib!");

    try {
        const data = {
            umkm_id: currentUMKM.id,
            name, category: cat, price, hpp, stock,
            is_available: true,
            createdAt: new Date() // Note: On edit this updates date, nice for sorting recent edits
        };

        if (id) {
            await updateDoc(doc(db, "products", id), data);
        } else {
            await addDoc(collection(db, "products"), data);
        }

        resetCMSForm();
        loadProducts();
        alert("✅ Tersimpan!");
    } catch (e) { alert("Gagal: " + e.message); }
};

window.resetCMSForm = () => {
    document.getElementById('cms-id').value = "";
    document.getElementById('cms-name').value = "";
    document.getElementById('cms-price').value = "";
    document.getElementById('cms-stock').value = "";
    document.getElementById('cms-hpp').value = "";
};

window.editProduct = (id) => {
    const p = products.find(x => x.id === id);
    if (p) {
        document.getElementById('cms-id').value = p.id;
        document.getElementById('cms-name').value = p.name;
        document.getElementById('cms-price').value = p.price;
        document.getElementById('cms-stock').value = p.stock;
        document.getElementById('cms-hpp').value = p.hpp || 0;
        document.getElementById('cms-cat').value = p.category;

        switchTab('cms'); // Jump to CMS tab
        document.getElementById('cms-name').focus();
    }
};

window.deleteProduct = async (id) => {
    if (confirm("Hapus Permanen?")) {
        await deleteDoc(doc(db, "products", id));
        loadProducts();
    }
};

function renderCMSList(list) {
    const div = document.getElementById("cms-list");
    div.innerHTML = "";
    list.forEach(p => {
        div.innerHTML += `
            <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee; align-items:center;">
                <div>
                    <strong>${p.name}</strong> <small>(${p.category})</small><br>
                    <small>Stok: ${p.stock} | HPP: ${p.hpp} | Jual: ${p.price}</small>
                </div>
                <div>
                    <button onclick="editProduct('${p.id}')" style="background:#f39c12; border:none; padding:5px; border-radius:3px; color:white; cursor:pointer;">✏️</button>
                    <button onclick="deleteProduct('${p.id}')" style="background:#e74c3c; border:none; padding:5px; border-radius:3px; color:white; cursor:pointer;">🗑️</button>
                </div>
            </div>
        `;
    });
}

// --- REPORT LOGIC ---
window.loadReport = async () => {
    const startOfMonth = new Date(); startOfMonth.setDate(1); startOfMonth.setHours(0, 0, 0, 0);
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);

    // Fetch Transactions
    // FIX: Removed orderBy("timestamp", "desc") to avoid "Missing Index" error
    try {
        const q = query(collection(db, "umkm_transactions"), where("umkm_id", "==", currentUMKM.id));
        const snap = await getDocs(q);

        let transactions = [];
        snap.forEach(d => transactions.push(d.data()));

        // Client-side Sort (Newest First)
        transactions.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        let todayOmzet = 0;
        let monthOmzet = 0;
        let monthItems = 0;
        const tbody = document.getElementById("report-list");
        tbody.innerHTML = "";

        transactions.forEach(t => {
            const date = new Date(t.timestamp.seconds * 1000);

            if (date >= startOfDay) todayOmzet += t.total_amount;
            if (date >= startOfMonth) {
                monthOmzet += t.total_amount;
                monthItems += t.items.reduce((a, b) => a + b.qty, 0);
            }

            // List 10 recent
            if (tbody.children.length < 10) {
                tbody.innerHTML += `
                    <tr>
                        <td>${date.toLocaleString('id-ID')}</td>
                        <td>Rp ${t.total_amount.toLocaleString('id-ID')}</td>
                        <td>${t.items.length} Menu</td>
                    </tr>
                `;
            }
        });

        document.getElementById("rep-today").textContent = `Rp ${todayOmzet.toLocaleString('id-ID')}`;
        document.getElementById("rep-month").textContent = `Rp ${monthOmzet.toLocaleString('id-ID')}`;
        document.getElementById("rep-items").textContent = monthItems;

    } catch (e) {
        console.error("Gagal memuat laporan:", e);
        // Optional: Show error in UI
    }
};

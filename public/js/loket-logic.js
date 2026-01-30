// js/loket-logic.js
import { db, auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, collection, addDoc, query, orderBy, limit, onSnapshot, where, doc, getDoc }
    from "./firebase-config.js";

// --- GLOBAL STATE ---
let PRICES = { adult: 15000, child: 5000 }; // Default Fallback
let cart = { adult: 0, child: 0 };
let paymentMethod = 'cash';
let lastTransactionData = null; // Store for printing

// --- ELEMENT SELECTORS ---
const dom = {
    modal: document.getElementById('login-modal'),
    loginBtn: document.getElementById('btn-login'),
    emailIn: document.getElementById('login-email'),
    passIn: document.getElementById('login-pass'),
    msg: document.getElementById('login-msg'),
    staffName: document.getElementById('staff-name'),
    logoutBtn: document.getElementById('btn-logout'),

    // Buttons
    plusAdult: document.getElementById('btn-plus-adult'),
    minusAdult: document.getElementById('btn-minus-adult'),
    plusChild: document.getElementById('btn-plus-child'),
    minusChild: document.getElementById('btn-minus-child'),
    payCash: document.getElementById('pay-cash'),
    payQris: document.getElementById('pay-qris'),

    // Split Buttons
    processBtn: document.getElementById('btn-process'),
    printBtn: document.getElementById('btn-print'),

    visitorName: document.getElementById('visitor-name')
};

// --- INIT & AUTH LOGIC ---
async function loadPrices() {
    try {
        const snap = await getDoc(doc(db, "settings", "prices"));
        if (snap.exists()) {
            PRICES = snap.data();
            // Update UI Labels
            const adultLabel = document.getElementById('price-display-adult');
            const childLabel = document.getElementById('price-display-child');
            if (adultLabel) adultLabel.textContent = `Rp ${PRICES.adult.toLocaleString('id-ID')}`;
            if (childLabel) childLabel.textContent = `Rp ${PRICES.child.toLocaleString('id-ID')}`;
        }
    } catch (e) { console.warn("Using default prices", e); }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        checkUserRole(user);
        loadPrices();
    } else {
        dom.modal.classList.remove('hidden');
        dom.staffName.textContent = "Staff: -";
    }
});

async function checkUserRole(user) {
    try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists() && (docSnap.data().role === 'staff' || docSnap.data().role === 'admin')) {
            dom.modal.classList.add('hidden');
            dom.staffName.textContent = "Staff: " + user.email;
            listenToHistory();
        } else {
            // Fallback for legacy
            dom.modal.classList.add('hidden');
            dom.staffName.textContent = "Staff: " + user.email;
            listenToHistory();
        }
    } catch (e) {
        console.error("Role Error", e);
        // Fallback allow
        dom.modal.classList.add('hidden');
        dom.staffName.textContent = "Staff: " + user.email;
        listenToHistory();
    }
}

dom.loginBtn.addEventListener('click', async () => {
    try {
        dom.loginBtn.textContent = "Loading...";
        await signInWithEmailAndPassword(auth, dom.emailIn.value, dom.passIn.value);
    } catch (e) {
        dom.msg.textContent = "Gagal: " + e.message;
    } finally {
        dom.loginBtn.textContent = "MASUK SHIFT";
    }
});

dom.logoutBtn.addEventListener('click', async () => { if (confirm("Logout?")) await signOut(auth); });

// --- TRANSACTION LOGIC ---
function updateQty(type, change) {
    if (cart[type] + change < 0) return;
    cart[type] += change;
    document.getElementById(`qty-${type}`).textContent = cart[type];
    updateSummary();
}

dom.plusAdult.addEventListener('click', () => updateQty('adult', 1));
dom.minusAdult.addEventListener('click', () => updateQty('adult', -1));
dom.plusChild.addEventListener('click', () => updateQty('child', 1));
dom.minusChild.addEventListener('click', () => updateQty('child', -1));

dom.payCash.addEventListener('click', () => setPayment('cash'));
dom.payQris.addEventListener('click', () => setPayment('qris'));

function setPayment(method) {
    paymentMethod = method;
    dom.payCash.classList.toggle('selected', method === 'cash');
    dom.payQris.classList.toggle('selected', method === 'qris');
}

function updateSummary() {
    const total = (cart.adult * PRICES.adult) + (cart.child * PRICES.child);
    document.getElementById('total-price').textContent = `Rp ${total.toLocaleString('id-ID')}`;

    const detailDiv = document.getElementById('tx-details');
    if (total === 0) {
        detailDiv.innerHTML = '<p style="color:#888;">Belum ada item dipilih.</p>';
        dom.processBtn.disabled = true;
    } else {
        let html = '<ul style="padding-left:20px; color:#555;">';
        if (cart.adult > 0) html += `<li>${cart.adult}x Dewasa = ${(cart.adult * PRICES.adult).toLocaleString('id-ID')}</li>`;
        if (cart.child > 0) html += `<li>${cart.child}x Anak = ${(cart.child * PRICES.child).toLocaleString('id-ID')}</li>`;
        html += '</ul>';
        detailDiv.innerHTML = html;
        dom.processBtn.disabled = false;
    }

    if (total > 0 && dom.printBtn.style.display !== 'none') {
        dom.processBtn.style.display = 'block';
        dom.printBtn.style.display = 'none';
    }
}

// --- PROCESS LOGIC ---
dom.processBtn.addEventListener('click', async () => {
    const visitorName = dom.visitorName.value.trim();
    if (!visitorName) return alert("⚠️ WAJIB ISI NAMA PENGUNJUNG!");
    if (!auth.currentUser) return alert("Login dulu!");

    const total = (cart.adult * PRICES.adult) + (cart.child * PRICES.child);
    if (!confirm(`Proses Transaksi: Rp ${total.toLocaleString('id-ID')}?`)) return;

    dom.processBtn.disabled = true;
    dom.processBtn.textContent = "Menyimpan...";

    const ticketID = `TF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date();

    try {
        const txData = {
            ticketID, visitor_name: visitorName,
            staff_email: auth.currentUser.email, staff_uid: auth.currentUser.uid,
            date: timestamp, visitor_count: cart.adult + cart.child,
            adult_count: cart.adult, child_count: cart.child,
            total_amount: total, payment_method: paymentMethod,
            timestamp: timestamp.getTime()
        };

        await addDoc(collection(db, "ticket_transactions"), txData);

        alert("✅ Transaksi Berhasil!");
        lastTransactionData = txData;

        dom.processBtn.style.display = 'none';
        dom.printBtn.style.display = 'block';
        dom.processBtn.textContent = "PROSES BAYAR";
        dom.processBtn.disabled = false;

        clearInputsExceptPrint();

    } catch (e) {
        alert("Gagal: " + e.message);
        dom.processBtn.disabled = false;
        dom.processBtn.textContent = "PROSES BAYAR";
    }
});

function clearInputsExceptPrint() {
    cart = { adult: 0, child: 0 };
    dom.visitorName.value = "";
    document.getElementById('qty-adult').textContent = 0;
    document.getElementById('qty-child').textContent = 0;
    document.getElementById('total-price').textContent = "Rp 0";
    document.getElementById('tx-details').innerHTML = '<p style="color:green; font-weight:bold;">Transaksi Sukses! Silakan Cetak.</p>';
}

// --- PRINT LOGIC ---
dom.printBtn.addEventListener('click', () => {
    if (lastTransactionData) doPrint(lastTransactionData);
});

window.doPrint = (data) => {
    document.getElementById('p-ticket-id').textContent = data.ticketID;
    document.getElementById('p-date').textContent = new Date(data.timestamp).toLocaleString('id-ID');
    document.getElementById('p-name').textContent = data.visitor_name;
    document.getElementById('p-staff').textContent = data.staff_email;
    document.getElementById('p-total').textContent = `Rp ${data.total_amount.toLocaleString('id-ID')}`;

    const pItems = document.getElementById('p-items');
    pItems.innerHTML = "";
    if (data.adult_count > 0) pItems.innerHTML += `<tr><td>${data.adult_count}xDws</td><td>${(data.adult_count * PRICES.adult).toLocaleString('id-ID')}</td></tr>`;
    if (data.child_count > 0) pItems.innerHTML += `<tr><td>${data.child_count}xAnk</td><td>${(data.child_count * PRICES.child).toLocaleString('id-ID')}</td></tr>`;

    window.print();

    setTimeout(() => {
        dom.printBtn.style.display = 'none';
        dom.processBtn.style.display = 'block';
        dom.processBtn.disabled = true;
        document.getElementById('tx-details').innerHTML = '<p style="color:#888;">Belum ada item dipilih.</p>';
        lastTransactionData = null;
    }, 1000);
}

// --- HISTORY ---
let historyMap = {};

function listenToHistory() {
    const startOfDay = new Date(); startOfDay.setHours(0, 0, 0, 0);
    const q = query(collection(db, "ticket_transactions"), where("date", ">=", startOfDay), orderBy("date", "desc"), limit(10));

    onSnapshot(q, (snapshot) => {
        const tbody = document.getElementById("history-list");
        tbody.innerHTML = "";
        historyMap = {}; // Reset map

        snapshot.forEach((docSnap) => {
            const d = docSnap.data();
            historyMap[d.ticketID] = d; // Store in map

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><small>${d.ticketID || '-'}</small></td>
                <td>${d.visitor_count}</td>
                <td>${d.total_amount.toLocaleString('id-ID')}</td>
                <td><button onclick="printHistory('${d.ticketID}')" style="border:1px solid #ddd; background:white; cursor:pointer;">🖨️</button></td>
            `;
            tbody.appendChild(tr);
        });
    });
}

window.printHistory = (tid) => {
    const data = historyMap[tid];
    if (data) window.doPrint(data);
};

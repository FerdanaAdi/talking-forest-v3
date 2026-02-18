
document.addEventListener('alpine:init', () => {
    // DONATION PAGE LOGIC
    Alpine.data('donationPage', () => ({
        view: 'list', // list | payment | success
        selectedPackage: null,
        timer: '15:00',
        packages: [
            { id: 1, name: '🌳 Pohon Mangga', price: 50000, desc: 'Donasi 1 bibit Mangga', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80' },
            { id: 2, name: '🌴 Pohon Ulin', price: 75000, desc: 'Pohon Endemik Kalimantan', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=400&q=80' },
            { id: 3, name: '🌲 Paket Hutan Mini', price: 150000, desc: 'Donasi 5 Bibit Campur', image: 'https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&w=400&q=80' }
        ],
        selectPackage(pkg) {
            console.log('🔘 [Donate] selectPackage called with:', pkg);
            try {
                this.selectedPackage = pkg;
                this.view = 'payment'; // Change view first

                // Show toast to confirm action
                const ui = Alpine.store('systemUI');
                if (ui) ui.showToast('Memilih ' + pkg.name, 'info');

                this.startTimer();
                console.log('✅ [Donate] View switched to payment. Package:', this.selectedPackage);
            } catch (e) {
                console.error('❌ [Donate] Error in selectPackage:', e);
                alert('Error choosing package: ' + e.message);
            }
        },
        formatRupiah(number) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
        },
        startTimer() {
            let seconds = 900; // 15 minutes

            // Clear existing interval if any (to prevent multiple timers)
            if (this.timerInterval) clearInterval(this.timerInterval);

            this.timerInterval = setInterval(() => {
                seconds--;
                const m = Math.floor(seconds / 60).toString().padStart(2, '0');
                const s = (seconds % 60).toString().padStart(2, '0');
                this.timer = `${m}:${s}`;

                if (seconds <= 0) {
                    clearInterval(this.timerInterval);
                    // Handle timeout if needed
                }
            }, 1000);
        },
        confirmPayment() {
            setTimeout(() => {
                this.view = 'success';
            }, 500);
        },
        // Helpers for template access if $store is tricky
        get ui() { return Alpine.store('systemUI'); },
        triggerDebugToast() {
            console.log('Testing Toast from Page Logic');
            Alpine.store('systemUI').showToast('Tes dari Tombol', 'success');
        }
    }));
});

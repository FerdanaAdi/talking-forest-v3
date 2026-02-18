/**
 * ============================================
 * 📄 FILE: public/js/v3/mechanics/quiz.js
 * 🎓 FUNGSI: Logika Kuis Pilihan Ganda
 * ============================================
 *
 * 🔰 PANDUAN UNTUK NAJU:
 *
 * File ini mengatur jalannya kuis:
 * - Load soal dari quizzes.json
 * - Menangani Timer (hitung mundur)
 * - Menghitung Skor
 * - Menampilkan Hasil Akhir
 *
 * 💡 YANG BOLEH KAMU EDIT:
 * ─────────────────────────────────────────────
 * ✅ CONFIG (Baris ~20):
 *    - `timePerQuestion`: Waktu per soal (detik)
 *    - `scorePerCorrect`: Poin kalau benar
 *
 * ✅ PESAN FEEDBACK (Baris ~130):
 *    - Suara TTS kalau benar/salah
 *
 * ⚠️ YANG JANGAN DIEDIT:
 * ─────────────────────────────────────────────
 * ✗ Logika `nextQuestion`
 * ✗ Logika `checkAnswer`
 * ✗ Perhitungan Timer
 *
 * ============================================
 */

export class QuizGame {
    constructor() {
        this.dom = {
            questionText: document.getElementById('question-text'),
            questionNumber: document.getElementById('question-number'),
            questionImage: document.getElementById('question-image'),
            optionsContainer: document.getElementById('options-container'),
            timerDisplay: document.getElementById('timer-display'),
            progressBar: document.getElementById('progress-bar'),
            resultOverlay: document.getElementById('result-overlay'),
            resultCard: document.getElementById('result-card'),
            finalScore: document.getElementById('final-score'),
            resultEmoji: document.getElementById('result-emoji')
        };

        // --- ⚙️ CONFIG (SIAP DIEDIT) ---
        this.config = {
            timePerQuestion: 15, // 15 Detik per soal
            scorePerCorrect: 20, // Poin per soal benar
            totalQuestions: 5    // Ambil 5 soal acak
        };

        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 0;

        this.init();
    }

    async init() {
        await this.loadQuestions();
        if (this.questions.length > 0) {
            this.startQuiz();
        } else {
            this.dom.questionText.innerText = "❌ Gagal memuat soal. Cek quizzes.json ya!";
        }
    }

    async loadQuestions() {
        try {
            const res = await fetch('assets/data/quizzes.json');
            const data = await res.json();

            // Acak soal dan ambil sejumlah config.totalQuestions
            this.questions = this.shuffleArray(data).slice(0, this.config.totalQuestions);
        } catch (e) {
            console.error("Error loading quiz:", e);
            // Fallback Dummy Data kalau JSON error/kosong
            this.questions = [
                {
                    q: "Apa warna daun yang sehat?",
                    a: ["Merah", "Hijau", "Biru", "Hitam"],
                    correct: 1 // Hijau
                },
                {
                    q: "Hewan apa yang punya belalai?",
                    a: ["Semut", "Gajah", "Kucing", "Ayam"],
                    correct: 1 // Gajah
                }
            ];
        }
    }

    startQuiz() {
        this.currentIndex = 0;
        this.score = 0;
        this.showQuestion();
    }

    showQuestion() {
        const q = this.questions[this.currentIndex];

        // Update UI
        this.dom.questionText.innerText = q.q;
        this.dom.questionNumber.innerText = this.currentIndex + 1;

        // Update Progress Bar
        const progress = ((this.currentIndex) / this.questions.length) * 100;
        this.dom.progressBar.style.width = `${progress}%`;

        // Render Options
        this.dom.optionsContainer.innerHTML = '';
        q.a.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.className = "bg-white p-4 rounded-xl border-b-4 border-stone-300 text-stone-600 font-bold hover:bg-yellow-50 hover:border-yellow-400 transition text-left flex items-center gap-3 active:scale-95";

            // Label Huruf (A, B, C, D)
            const letters = ['A', 'B', 'C', 'D'];

            btn.innerHTML = `
                <span class="bg-stone-200 w-8 h-8 rounded flex items-center justify-center text-stone-500 font-mono">${letters[idx]}</span>
                <span class="flex-1">${optText}</span>
            `;

            btn.onclick = () => this.checkAnswer(idx, btn);
            this.dom.optionsContainer.appendChild(btn);
        });

        // Start Timer
        this.startTimer();
    }

    startTimer() {
        this.timeLeft = this.config.timePerQuestion;
        this.dom.timerDisplay.innerText = this.timeLeft;
        this.dom.timerDisplay.parentElement.classList.remove('bg-red-500', 'text-white'); // Reset warna
        this.dom.timerDisplay.parentElement.classList.add('bg-white', 'text-forest');

        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.dom.timerDisplay.innerText = this.timeLeft;

            // Warnai Merah kalau < 5 detik
            if (this.timeLeft <= 5) {
                this.dom.timerDisplay.parentElement.classList.remove('bg-white', 'text-forest');
                this.dom.timerDisplay.parentElement.classList.add('bg-red-500', 'text-white');
            }

            if (this.timeLeft <= 0) {
                this.timeOut();
            }
        }, 1000);
    }

    timeOut() {
        clearInterval(this.timer);
        this.playSound('buzz');
        // Anggap salah (index -1)
        this.highlightAnswers(-1);
        setTimeout(() => this.nextQuestion(), 2000);
    }

    checkAnswer(selectedIndex, btnElement) {
        clearInterval(this.timer); // Stop timer

        const q = this.questions[this.currentIndex];
        const isCorrect = (selectedIndex === q.correct);

        if (isCorrect) {
            // ✅ BENAR
            btnElement.classList.replace('border-stone-300', 'border-green-600');
            btnElement.classList.replace('bg-white', 'bg-green-100');
            btnElement.classList.add('text-green-800');
            this.score += this.config.scorePerCorrect;
            this.playSound('ding');
        } else {
            // ❌ SALAH
            btnElement.classList.replace('border-stone-300', 'border-red-600');
            btnElement.classList.replace('bg-white', 'bg-red-100');
            btnElement.classList.add('text-red-800', 'shake-animation'); // shake perlu CSS
            this.playSound('buzz');
        }

        // Tampilkan kunci jawaban
        this.highlightAnswers(q.correct);

        // Lanjut ke soal berikutnya setelah delay
        setTimeout(() => this.nextQuestion(), 1500);
    }

    highlightAnswers(correctIndex) {
        // Disabled semua tombol biat gak diklik lagi
        const buttons = this.dom.optionsContainer.querySelectorAll('button');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            btn.classList.add('opacity-80', 'cursor-not-allowed');
            // Tandai yang benar
            if (idx === correctIndex) {
                btn.classList.replace('border-stone-300', 'border-green-600');
                btn.classList.add('bg-green-200'); // Lebih terang biar kelihatan ini kuncinya
            }
        });
    }

    nextQuestion() {
        this.currentIndex++;
        if (this.currentIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.finishQuiz();
        }
    }

    finishQuiz() {
        // Tampilkan Overlay Hasil
        this.dom.resultOverlay.classList.remove('hidden');

        // Animasi Pop Up Card
        setTimeout(() => {
            this.dom.resultCard.classList.remove('scale-0');
            this.dom.resultCard.classList.add('scale-100');
        }, 100);

        // Set Skor
        // Animasi angka (counting up)
        let displayScore = 0;
        const scoreInterval = setInterval(() => {
            displayScore += 1;
            this.dom.finalScore.innerText = displayScore;
            if (displayScore >= this.score) clearInterval(scoreInterval);
        }, 20); // Cepet

        // Tentukan Emoji berdasarkan skor
        if (this.score === 100) this.dom.resultEmoji.innerText = "👑";
        else if (this.score >= 80) this.dom.resultEmoji.innerText = "🌟";
        else if (this.score >= 60) this.dom.resultEmoji.innerText = "🙂";
        else this.dom.resultEmoji.innerText = "📚";

        this.playSound('cheer');

        // ✅ INTEGRASI Save XP & Ending Check
        setTimeout(() => {
            this.handleQuizCompletion();
        }, 3000); // Tunggu animasi skor selesai
    }

    handleQuizCompletion() {
        try {
            // 1. Hitung XP Award (Misal: 2x Skor)
            const earnedXP = this.score * 2;

            // 2. Load Progress Manager
            let playerData = JSON.parse(localStorage.getItem('tf_player_v3')) || {
                inventory: [], xp: 0, badges: [], level: 1
            };

            // Perlu instance ProgressManager & EndingHandler
            // Asumsi script sudah di-load di HTML
            if (window.ProgressManager) {
                const pm = new window.ProgressManager({ player: playerData });

                // Tambah XP
                pm.addXP(earnedXP);
                pm.triggerSave(); // Save XP

                // Tampilkan pesan Toast
                if (window.Alpine) {
                    Alpine.store('systemUI').showToast(`🎓 KUIS SELESAI! +${earnedXP} XP`, 'success');
                }

                // Cek Ending
                if (pm.isGameComplete()) {
                    if (window.Alpine) {
                        Alpine.store('systemUI').showModal('GAME_WON', {
                            title: 'GRAND FINALE TERBUKA! 🌟',
                            message: 'Kamu telah mengumpulkan semua spesies! Hutan memanggilmu...',
                            xp: 0,
                            onContinue: () => {
                                window.location.href = 'cutscene.html';
                            }
                        });
                    } else {
                        // Fallback jika System UI tidak tersedia
                        if (window.Alpine && window.Alpine.store('systemUI')) {
                            window.Alpine.store('systemUI').showModal('CONFIRM_EXIT', {
                                message: '🏁 SELAMAT! Semua species terkumpul! Lanjut ke Grand Finale?',
                                onConfirm: () => {
                                    window.location.href = 'cutscene.html';
                                },
                                onCancel: () => {
                                    window.location.href = 'index.html';
                                }
                            });
                        } else {
                            if (confirm("🏁 SELAMAT! Semua species terkumpul!\nLanjut ke Grand Finale?")) {
                                window.location.href = 'cutscene.html';
                            } else {
                                window.location.href = 'index.html';
                            }
                        }
                    }
                }
                // Jika tidak tamat, user akan klik tombol "Kembali" yang ada di UI Result Card

            } else {
                console.error("ProgressManager not found!");
                window.location.href = 'index.html';
            }

        } catch (e) {
            console.error("Quiz Save Error:", e);
            window.location.href = 'index.html';
        }
    }

    // --- UTILS & AUDIO ---

    playSound(type) {
        // Placeholder Audio using Web Speech API (biar Naju gak ribet cari file dulu)
        const sounds = {
            'ding': "Benar!",
            'buzz': "Tetot!",
            'cheer': "Hore, Selesai!"
        };

        if (sounds[type]) {
            const msg = new SpeechSynthesisUtterance(sounds[type]);
            msg.rate = 1.2;
            window.speechSynthesis.speak(msg);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc,
    arrayUnion, increment, query, where, orderBy, onSnapshot, deleteDoc, limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- KONFIGURASI FIREBASE ---
// Ganti dengan data dari Project Settings di Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyB3kQkfAHz78udbcaGnAZg1pysP80JA_g0",
    authDomain: "talking-forest-dc837.firebaseapp.com",
    projectId: "talking-forest-dc837",
    storageBucket: "talking-forest-dc837.firebasestorage.app",
    messagingSenderId: "285068790766",
    appId: "1:285068790766:web:1fc6d14de7d06357e65cff",
    measurementId: "G-L03C9SWMLC"
};

// --- INISIALISASI ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- EXPORT ALAT-ALAT ---
export {
    auth, db,
    signInAnonymously, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut,
    collection, addDoc, getDocs, doc, setDoc, getDoc, updateDoc,
    arrayUnion, increment, query, where, orderBy, onSnapshot, deleteDoc, limit
};
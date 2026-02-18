/**
 * ============================================
 * 📄 FILE: main.js
 * 🎬 FUNGSI: Inisialisasi Monogatari Engine
 * ============================================
 */

"use strict";

window.addEventListener('load', function () {
    console.log("🚀 Starting Monogatari Debug Init...");

    // 1. Check Global Object
    console.log("Type of monogatari:", typeof monogatari);
    if (typeof monogatari !== 'undefined') {
        // List specific known properties for v2
        console.log("monogatari.version:", monogatari.version);
        console.log("monogatari._components:", monogatari._components); // Internal registry often here

        // 2. Try to access the missing component
        try {
            const mainScreen = monogatari.component('main-screen');
            console.log("TEST component('main-screen'):", mainScreen);

            if (!mainScreen) {
                console.error("❌ 'main-screen' component is NULL/UNDEFINED!");
                // Dump all keys to see what IS there
                console.log("All monogatari keys:", Object.keys(monogatari));
            } else {
                console.log("✅ 'main-screen' found. State:", mainScreen);
            }
        } catch (e) {
            console.error("Error calling monogatari.component('main-screen'):", e);
        }
    } else {
        console.error("❌ window.monogatari is UNDEFINED!");
    }

    // STANDARD INIT
    monogatari.init('#monogatari').then(() => {
        console.log("✅ Monogatari initialized - Talking Forest Story Mode");
    }).catch(err => {
        console.error("❌ Monogatari Init Error:", err);
    });
});

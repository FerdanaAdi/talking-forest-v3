# 📱 PANDUAN TESTING DI HP

Kalau kamu mau coba main **Talking Forest** di HP biar kerasa *real* (bisa scan QR beneran), ikuti langkah ini ya!

## 1. Syarat Wajib
*   💻 **Laptop** dan 📱 **HP** harus connect ke **Wi-Fi yang SAMA**.
*   Kalau gak ada Wi-Fi, bisa pakai **Hotspot HP** ke Laptop.

## 2. Cari Alamat IP Laptop
Kita perlu tahu "alamat" laptopmu biar HP bisa berkunjung.

1.  Buka Terminal (VS Code).
2.  Ketik perintah: `ipconfig` lalu Enter.
3.  Cari tulisan **IPv4 Address**.
    *   Biasanya angkanya mirip: `192.168.1.5` atau `192.168.100.12`.
    *   Catat angka itu! 📝

## 3. Nyalakan Server
Kamu harus "menghidupkan" website-nya dulu di laptop.

1.  Di Terminal VS Code, ketik:
    ```bash
    npx http-server . -c-1
    ```
    *(Ketik persis ya, ada titiknya!)*

    > ⚠️ **PENTING: JANGAN TUTUP TERMINAL INI!**
    > Kalau terminal ditutup atau kamu tekan `Ctrl+C`, servernya MATI dan HP gak akan bisa connect. Biarkan saja terminalnya terbuka selama kamu mengetes.

2.  Nanti akan muncul tulisan:
    ```
    Available on:
      http://192.168.1.5:8080
      http://127.0.0.1:8080
    ```

## 4. Buka di HP
1.  Buka Chrome / Safari di HP.
2.  Ketik alamat IP yang tadi kamu catat, ditambah `:8080`.
    *   Contoh: `192.168.1.5:8080`
3.  JENG JENG! Website harusnya muncul di HP. 🎉

## � SOLUSI KALAU "NOT FOUND" (404)
Kalau di layar laptop muncul tulisan kuning `Error (404): "Not found"`, artinya:
**HP KAMU SUDAH KONEK! 🥳**
(Tapi kamu salah ketik alamatnya)

**❌ JANGAN KETIK:**
*   `http://192.168.1.5:8080/public/index.html` (Salah!)
*   `http://192.168.1.5:8080/public` (Salah!)

**✅ INI YANG BENAR:**
*   `http://192.168.1.5:8080` (Langsung masuk index.html)
*   `http://192.168.1.5:8080/scan.html` (Langsung masuk halaman scan)

Servermu sudah otomatis masuk ke dalam folder `public`. Jadi gak perlu ditulis lagi kata "public"-nya di browser.

## 💡 Tips Lain:
*   **Firewall**: Kalau loading terus (gak muncul apa-apa), coba matikan Firewall laptop sebentar.
*   **IP Berubah**: Kalau restart laptop, IP bisa berubah. Cek `ipconfig` lagi ya.


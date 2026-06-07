# Blue Blossom & Serenity - Wedding Invitation

Website undangan pernikahan digital yang elegan, interaktif, dan sangat ringan. Didesain dengan nuansa biru (Blue Blossom) yang memberikan kesan tenang (Serenity) dan premium.

## ✨ Fitur Unggulan

- **Cover Interaktif**: Pembuka halaman yang elegan dengan animasi kelopak bunga jatuh.
- **Auto-Personalized**: Nama tamu otomatis berubah sesuai parameter URL (`?to=NamaTamu`).
- **Smart Countdown & Anniversary**: Penghitung mundur otomatis menuju hari bahagia yang akan berubah menjadi penghitung "Usia Pernikahan" (count-up) setelah acara dimulai.
- **Smart RSVP**: Konfirmasi kehadiran yang langsung tersimpan ke Google Sheets.
- **Live Wishes**: Kirim ucapan dan doa yang akan langsung muncul di halaman website secara real-time.
- **Save the Date**: Tombol integrasi langsung ke Google Calendar lengkap dengan jam dan lokasi.
- **Background Music**: Musik latar romantis yang bisa dikontrol (Play/Pause) oleh tamu.
- **Zero Server Cost**: Bisa di-host gratis menggunakan **GitHub Pages** (tidak perlu sewa hosting atau database).
- **Responsive Design**: Tampilan sempurna di berbagai perangkat (Smartphone, Tablet, maupun Laptop).

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla).
- **Backend/Database**: Google Sheets + Google Apps Script (Gratis & Tanpa Server).
- **Icons**: FontAwesome.
- **Fonts**: Google Fonts (Playfair Display, Lora, Great Vibes).

## 🚀 Cara Instalasi & Deploy

Website ini sangat sederhana karena hanya terdiri dari file statis.

1. **Clone/Download**: Ambil semua file dalam repositori ini.
2. **Setup Database**: Ikuti panduan lengkap di [SETUP_RSVP.md](SETUP_RSVP.md) untuk mengatur Google Sheets agar RSVP dan Ucapan bisa berfungsi.
3. **Hosting**:
   - Jika menggunakan **GitHub**: Aktifkan **GitHub Pages** di menu Settings repositori kamu.
   - Selesai! Website kamu sudah online.

## 📝 Konfigurasi
- Ganti detail acara (Nama, Tanggal, Lokasi) langsung di file `index.html`.
- Ganti asset foto di folder `assets/`.
- Ubah URL Google Apps Script di file `script.dev.js`.

---

## 🔒 Keamanan & Obfuscasi
Untuk melindungi *source code* (termasuk menyembunyikan link `GOOGLE_SCRIPT_URL`), website ini menggunakan teknik Javascript Obfuscation dan Anti-Inspect HTML.

**Alur Kerja (Workflow):**
1. Setiap kali Anda ingin mengubah logika atau URL Google Script, lakukan **HANYA** di file `script.dev.js`.
2. Buka terminal pada folder proyek ini.
3. Pastikan Node.js sudah terinstal, lalu jalankan perintah obfuscator:
   ```bash
   npm run build:js
   ```
4. Perintah tersebut akan otomatis membuat atau memperbarui file `script.min.js` menjadi format acak terenkripsi yang digunakan langsung oleh `index.html`.


---
Dibuat dengan ❤️ untuk momen bahagia.

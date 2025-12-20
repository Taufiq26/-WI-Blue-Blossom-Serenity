# Panduan Setup Google Sheets untuk RSVP

Karena website undangan ini bersifat **Statis** (tidak punya database sendiri), kita menggunakan **Google Sheets** sebagai database gratis untuk menyimpan data konfirmasi kehadiran tamu.

Ikuti langkah-langkah berikut untuk menghubungkan website dengan Google Sheet kamu.

## 1. Buat Google Sheet Baru
1. Buka [Google Sheets](https://sheets.new).
2. Beri nama spreadsheet, misalnya: **"Data Tamu Undangan"**.
3. Buat 2 sheet baru, yaitu "Kehadiran" dan "Ucapan".
4. Di **Baris 1**, buat header kolom berikut (urutan tidak masalah, tapi biar rapi):
   - Sheet "Kehadiran":
     - Kolom A: `Nama`
     - Kolom B: `Status` (Hadir/Tidak)
     - Kolom C: `Tanggal` (Waktu input)
   - Sheet "Ucapan":
     - Kolom A: `Nama`
     - Kolom B: `Ucapan`
     - Kolom C: `Tanggal` (Waktu input)

## 2. Buka Apps Script
1. Di menu Google Sheet, klik **Extensions** (Ekstensi) > **Apps Script**.
2. Akan terbuka tab baru berisi editor kode.

## 3. Masukkan Kode Script
1. Hapus semua kode default yang ada di file `Code.gs`.
2. Buka file `google-script-template.js` yang ada di folder project ini.
3. Salin **SEMUA** kodenya dan tempel (paste) ke dalam editor Apps Script tadi.
4. Tekan **Ctrl + S** (Save) dan beri nama project, misalnya "RSVP Backend".

## 4. Deploy (PENTING!)
Ini adalah langkah paling krusial agar script bisa diakses oleh website.

1. Klik tombol **Deploy** (Terapkan) berwarna biru di pojok kanan atas.
2. Pilih **New deployment** (Penerapan baru).
3. Klik ikon roda gigi (Select type) > pilih **Web app**.
4. Isi form konfigurasi:
   - **Description**: "Versi 1" (Bebas).
   - **Execute as**: `Me` (biarkan default, alamat emailmu).
   - **Who has access**: **Pilih "Anyone" (Siapa saja)**.
     > ⚠️ **WAJIB "Anyone"**. Jika tidak, tamu tidak akan bisa kirim data karena mereka tidak login ke akun Google-mu.
5. Klik **Deploy**.
6. Google akan meminta izin akses (**Authorize access**).
   - Klik tombolnya -> Pilih akun Google kamu.
   - Jika muncul peringatan "Google hasn't verified this app" (Wajar karena kamu develop sendiri):
     - Klik **Advanced** (Lanjutan).
     - Klik **Go to RSVP Backend (unsafe)** di bagian bawah.
   - Klik **Allow**.

## 5. Salin URL ke Website
1. Setelah sukses deploy, kamu akan melihat **Web App URL**.
2. URL-nya akan terlihat seperti: `https://script.google.com/macros/s/XXXXX.../exec`.
3. Salin URL tersebut.
4. Buka file `script.js` di project undanganmu.
5. Cari baris paling atas (sekitar baris 154):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'PASTE_URL_DISINI';
   ```
6. Ganti URL lama dengan URL barumu.

## Selesai! 🎉
Sekarang coba buka websitemu dengan parameter nama tamu (contoh: `index.html?to=CobaTamu`), klik tombol konfirmasi, dan cek apakah datanya masuk ke Google Sheet.

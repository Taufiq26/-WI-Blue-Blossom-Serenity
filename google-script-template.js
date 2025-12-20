// CODE INI UNTUK DI-COPY KE GOOGLE APPS SCRIPT (Extensions > Apps Script di Google Sheet)

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Parse data yang dikirim dari website
  var nama = e.parameter.nama;
  var status = e.parameter.status; // "Hadir"
  var tanggal = e.parameter.tanggal;

  // Simpan ke baris baru
  sheet.appendRow([nama, status, tanggal]);

  // Balas ke website bahwa berhasil
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

// PENTING:
// 1. Simpan script ini.
// 2. Klik "Deploy" (Terapkan) -> "New Deployment" (Penerapan Baru).
// 3. Pilih type "Web App".
// 4. Who has access (Siapa yang memiliki akses) = "Anyone" (Siapa saja).
// 5. Copy URL yang diberikan (dimulai dengan https://script.google.com/macros/s/...)
// 6. Paste URL tersebut ke file script.js di bagian const GOOGLE_SCRIPT_URL.

// 1. FUNGSI UNTUK MENERIMA DATA (RSVP & UCAPAN)
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var kategori = e.parameter.kategori; // 'RSVP' atau 'Ucapan'

  if (kategori === 'Ucapan') {
    // Pastikan kamu sudah membuat Tab/Sheet baru bernama "Ucapan" di Google Sheet kamu
    var sheet = ss.getSheetByName("Ucapan");
    if (!sheet) return ContentService.createTextOutput("Error: Sheet 'Ucapan' tidak ditemukan.").setMimeType(ContentService.MimeType.TEXT);

    var nama = e.parameter.nama;
    var pesan = e.parameter.pesan;
    var tanggal = e.parameter.tanggal;

    sheet.appendRow([nama, pesan, tanggal]);

  } else {
    // Default: RSVP
    // Mengambil sheet pertama (biasanya Data Tamu)
    var sheet = ss.getSheets()[0];

    var nama = e.parameter.nama;
    var status = e.parameter.status;
    var tanggal = e.parameter.tanggal;

    sheet.appendRow([nama, status, tanggal]);
  }

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}

// 2. FUNGSI UNTUK MENGAMBIL DATA (UNTUK DITAMPILKAN DI WEBSITE)
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Ucapan");
  if (!sheet) return ContentService.createTextOutput(JSON.stringify([])).setMimeType(ContentService.MimeType.JSON);

  var rows = sheet.getDataRange().getValues();
  var data = [];

  // Lewati baris pertama (header) jika ada
  for (var i = 1; i < rows.length; i++) {
    data.push({
      nama: rows[i][0],
      pesan: rows[i][1],
      tanggal: rows[i][2]
    });
  }

  // Balas dengan format JSON
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// PENTING:
// 1. Simpan script ini.
// 2. Klik "Deploy" (Terapkan) -> "New Deployment" (Penerapan Baru).
// 3. Pilih type "Web App".
// 4. Who has access (Siapa yang memiliki akses) = "Anyone" (Siapa saja).
// 5. Copy URL yang diberikan (dimulai dengan https://script.google.com/macros/s/...)
// 6. Paste URL tersebut ke file script.js di bagian const GOOGLE_SCRIPT_URL.

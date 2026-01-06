# Integrasi Google Spreadsheet - BYD Jakarta Pusat

Dokumen ini berisi panduan dan kode untuk menghubungkan formulir leads di website ke Google Spreadsheet.

## Cara Kerja
Website mengirim data (Nama, No HP, Model) via HTTP POST ke "Google Apps Script". Script ini berfungsi sebagai jembatan untuk menulis data tersebut ke dalam Google Sheet secara otomatis.

## Kode Google Apps Script

Salin kode di bawah ini ke editor Apps Script di Google Sheet Anda:
`Extensions` > `Apps Script`

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Ambil waktu sekarang zona Jakarta
  var now = new Date();
  
  // Format Tanggal: DD/MM/YYYY
  var dateStr = now.toLocaleDateString("id-ID", {timeZone: "Asia/Jakarta"});
  
  // Format Jam: HH:MM:SS (24 Jam)
  var timeStr = now.toLocaleTimeString("id-ID", {timeZone: "Asia/Jakarta", hour12: false});
  
  // Gabungkan Tanggal & Jam
  var timestamp = dateStr + " " + timeStr;

  // Tulis ke baris paling bawah di Sheet
  sheet.appendRow([
    timestamp,    // Kolom A: Waktu Lengkap
    data.name,    // Kolom B: Nama Customer
    data.phone,   // Kolom C: Nomor WhatsApp
    data.model,   // Kolom D: Model Mobil
    data.source   // Kolom E: Sumber (misal: "Website")
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
}
```

## Setup Google Sheet
1.  Buat Google Sheet baru.
2.  Beri nama judul kolom di Baris 1:
    *   **A**: Date/Time
    *   **B**: Name
    *   **C**: Phone
    *   **D**: Model
    *   **E**: Source

## Setup Deployment (PENTING)
Setiap kali Anda mengubah kode script:
1.  Klik **Deploy** > **New Deployment**.
2.  Pilih type: **Web app**.
3.  Configuration:
    *   **Execute as**: Me (email gmail Anda).
    *   **Who has access**: **Anyone** (Wajib pilih ini agar website bisa kirim data).
4.  Klik **Deploy** dan salin URL yang diberikan.
5.  Update URL tersebut di file `contexts/DataContext.tsx` di website jika URL berubah.

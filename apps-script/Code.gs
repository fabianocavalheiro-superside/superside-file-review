/**
 * Shared comment storage for the Creative Review board.
 * Paste into a Google Sheet: Extensions > Apps Script, then Deploy > New deployment
 * > Web app > Execute as: Me, Who has access: Anyone. Copy the /exec URL into CONFIG.endpoint.
 */
const SHEET_NAME = 'Comments';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['id', 'itemId', 'name', 'text', 'ts']);
  }
  return sh;
}

// Stops values starting with = + - @ from being treated as formulas
function safe_(v) {
  v = String(v == null ? '' : v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function doGet() {
  const rows = getSheet_().getDataRange().getValues();
  rows.shift();
  const out = rows.map(r => ({ id: r[0], itemId: r[1], name: r[2], text: r[3], ts: r[4] }));
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const c = JSON.parse(e.postData.contents);
  getSheet_().appendRow([safe_(c.id), safe_(c.itemId), safe_(c.name), safe_(c.text), Number(c.ts) || Date.now()]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

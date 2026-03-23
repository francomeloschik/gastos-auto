// ============================================================
// GOOGLE APPS SCRIPT — pegar en Extensions > Apps Script
// ============================================================
// 1. Abrí Google Sheets > Extensiones > Apps Script
// 2. Borrá el contenido y pegá TODO este código
// 3. Guardá (Ctrl+S)
// 4. Clic en "Implementar" > "Nueva implementación"
// 5. Tipo: "Aplicación web"
// 6. Ejecutar como: "Yo"
// 7. Quién tiene acceso: "Cualquier persona"
// 8. Clic en "Implementar" y copiá la URL
// 9. Pegá esa URL en la app (botón Sync > campo URL)
// ============================================================

const SHEET_NAME = 'Gastos';
const HEADERS = ['id','fecha','importe','cat','km','km_parcial','prov','litros','notas'];

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1,1,1,HEADERS.length).setFontWeight('bold').setBackground('#0f172a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = getSheet();

    if (payload.action === 'sync') {
      // Full sync: rewrite all data
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
      const rows = payload.data.map(g => HEADERS.map(h => g[h] !== undefined && g[h] !== null ? g[h] : ''));
      if (rows.length > 0) sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows);
      return ContentService.createTextOutput(JSON.stringify({status:'ok', rows: rows.length})).setMimeType(ContentService.MimeType.JSON);
    }

    if (payload.action === 'append') {
      const rows = payload.rows.map(g => HEADERS.map(h => g[h] !== undefined && g[h] !== null ? g[h] : ''));
      rows.forEach(r => sheet.appendRow(r));
      return ContentService.createTextOutput(JSON.stringify({status:'ok', rows: rows.length})).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({status:'error', message:'Unknown action'})).setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:'error', message: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(r => {
    const obj = {};
    headers.forEach((h,i) => obj[h] = r[i]);
    return obj;
  });
  return ContentService.createTextOutput(JSON.stringify(rows)).setMimeType(ContentService.MimeType.JSON);
}

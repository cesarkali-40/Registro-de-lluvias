const SPREADSHEET_ID = '18KQKLhvhRgdBR3n-d3ZqcBGVV1HC_J1_XgoXuqLfPLI';
const SHEET_NAME = 'Registros';
const HEADERS = [
  'id',
  'date',
  'department',
  'municipality',
  'rain',
  'lat',
  'lng',
  'action',
  'status',
  'updatedAt',
  'source'
];

function doGet() {
  return jsonResponse({
    ok: true,
    message: 'Registro de lluvias backup activo'
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const record = payload.record || {};
    const action = payload.action || 'create';

    if (!record.id) {
      throw new Error('Falta el campo record.id');
    }

    const sheet = getBackupSheet();
    const rowIndex = findRowById(sheet, record.id);
    const rowValues = buildRow(record, action);

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, HEADERS.length).setValues([rowValues]);
    } else {
      sheet.appendRow(rowValues);
    }

    return jsonResponse({
      ok: true,
      action,
      id: record.id
    });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: error.message
    });
  } finally {
    lock.releaseLock();
  }
}

function getBackupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  ensureHeaders(sheet);
  return sheet;
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet
    .getRange(1, 1, 1, HEADERS.length)
    .getValues()[0];

  const hasHeaders = HEADERS.every((header, index) => currentHeaders[index] === header);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function findRowById(sheet, id) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  const idText = String(id);

  for (let index = 0; index < ids.length; index++) {
    if (String(ids[index][0]) === idText) {
      return index + 2;
    }
  }

  return -1;
}

function buildRow(record, action) {
  const status = action === 'delete' ? 'deleted' : 'active';

  return [
    record.id || '',
    record.date || '',
    record.department || '',
    record.municipality || '',
    record.rain || 0,
    record.lat || '',
    record.lng || '',
    action,
    status,
    new Date().toISOString(),
    record.source || ''
  ];
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

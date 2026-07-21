function getSheet(name) {
  const spreadsheet = getSpreadsheet();
  if (!spreadsheet) return null;
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function getSpreadsheet() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (!spreadsheetId) return null;
  return SpreadsheetApp.openById(spreadsheetId);
}

/**
 * Go Connectivo — Contact form → this Google Sheet
 *
 * Paste in: Extensions → Apps Script
 * Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Then Authorize → Allow → copy the /exec URL
 */

function doGet(e) {
  return handle_(e);
}

function doPost(e) {
  return handle_(e);
}

function handle_(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = readPayload_(e);

    if (data.website) {
      return json_({ success: true, message: 'OK' });
    }

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const phone = String(data.phone || '').trim();
    const subject = String(data.subject || '').trim();
    const message = String(data.message || '').trim();

    if (!name && !email && !subject && !message) {
      return json_({ success: true, service: 'Go Connectivo contact sheet' });
    }

    sheet.appendRow([new Date(), name, email, phone, subject, message]);

    return json_({ success: true, message: 'Saved' });
  } catch (err) {
    return json_({ success: false, message: String(err) });
  }
}

function readPayload_(e) {
  const fromQuery = e && e.parameter ? e.parameter : {};
  const raw = e && e.postData && e.postData.contents ? String(e.postData.contents).trim() : '';

  if (raw) {
    try {
      return Object.assign({}, fromQuery, JSON.parse(raw));
    } catch (err) {
      const params = {};
      raw.split('&').forEach(function (part) {
        const idx = part.indexOf('=');
        if (idx === -1) return;
        const key = decodeURIComponent(part.slice(0, idx).replace(/\+/g, ' '));
        const value = decodeURIComponent(part.slice(idx + 1).replace(/\+/g, ' '));
        params[key] = value;
      });
      return Object.assign({}, fromQuery, params);
    }
  }

  return fromQuery;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

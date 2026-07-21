function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  const path = getRoute(e);

  if (path === '/api/dashboard') {
    return jsonResponse({ ok: true, data: { dashboard: getDashboardData() } });
  }

  if (path === '/api/warehouse') {
    return jsonResponse({ ok: true, data: getWarehouseData() });
  }

  if (path === '/api/audit') {
    return jsonResponse({ ok: true, data: getAuditData() });
  }

  if (path === '/api/risks') {
    return jsonResponse({ ok: true, data: getRiskData() });
  }

  if (path === '/api/compliance') {
    return jsonResponse({ ok: true, data: getComplianceData() });
  }

  if (path === '/api/carga' && method === 'POST') {
    const payload = parsePayload(e);
    saveLoad(payload);
    return jsonResponse({ ok: true, data: { message: 'Carga recebida com sucesso.', allocation: getAllocationSuggestion(payload) } });
  }

  if (path === '/api/health') {
    return jsonResponse({ ok: true, data: { status: 'online' } });
  }

  return jsonResponse({ ok: false, error: 'Rota não encontrada.' }, 404);
}

function getRoute(e) {
  const path = (e && e.parameter && e.parameter.path) || (e && e.pathInfo) || '';
  if (path) return path;

  const raw = (e && e.parameter && e.parameter.route) || '';
  return raw || '/api/health';
}

function parsePayload(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (error) {
      return {};
    }
  }

  return e && e.parameter ? e.parameter : {};
}

function jsonResponse(payload, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  if (statusCode) {
    output.setContent(output.getContent());
  }
  return output;
}

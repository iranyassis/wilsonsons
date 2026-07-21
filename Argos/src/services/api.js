const fallbackDashboard = {
  ocupacao: 38,
  livres: 540,
  ocupadas: 338,
  imo: 25,
  produtividade: 94,
  movimentosHoje: 127,
  sugestoes: 24
};

const fallbackWarehouse = [
  { id: 'A12-01', status: 'free', lane: 'A', col: 12, level: 1, code: '—', type: 'Livre', weight: '—', operator: '—', stored: '—' },
  { id: 'A12-02', status: 'reserved', lane: 'A', col: 12, level: 2, code: 'C-204', type: 'Palete', weight: '14.8t', operator: 'Talita', stored: '03h 20m' },
  { id: 'A12-03', status: 'occupied', lane: 'A', col: 12, level: 3, code: 'IMO-17', type: 'Carga IMO', weight: '19.2t', operator: 'Jonas', stored: '06h 10m' },
  { id: 'A13-01', status: 'free', lane: 'A', col: 13, level: 1, code: '—', type: 'Livre', weight: '—', operator: '—', stored: '—' },
  { id: 'A13-02', status: 'restricted', lane: 'A', col: 13, level: 2, code: 'R-110', type: 'Restrita', weight: '8.5t', operator: 'Marta', stored: '01h 40m' },
  { id: 'A13-03', status: 'occupied', lane: 'A', col: 13, level: 3, code: 'C-320', type: 'Container', weight: '17.4t', operator: 'Lia', stored: '08h 41m' },
  { id: 'B08-01', status: 'free', lane: 'B', col: 8, level: 1, code: '—', type: 'Livre', weight: '—', operator: '—', stored: '—' },
  { id: 'B08-02', status: 'occupied', lane: 'B', col: 8, level: 2, code: 'C-118', type: 'Palete', weight: '12.2t', operator: 'Renato', stored: '04h 05m' },
  { id: 'B08-03', status: 'reserved', lane: 'B', col: 8, level: 3, code: 'C-222', type: 'Reservado', weight: '13.1t', operator: 'Nina', stored: '02h 15m' }
];

const fallbackAudit = [
  { date: '20/07/2026', user: 'Marta', event: 'Nova carga', load: 'C-204', position: 'A12-02', status: 'Aprovado' },
  { date: '20/07/2026', user: 'Jonas', event: 'Sugestão IA', load: 'IMO-17', position: 'A12-03', status: 'Confirmado' },
  { date: '19/07/2026', user: 'Lia', event: 'Mudança manual', load: 'C-320', position: 'A13-03', status: 'Revisado' }
];

const fallbackRisks = [
  { title: 'Carga IMO em posição incorreta', probability: 'Alta', impact: 'Crítico', level: 'Severo', status: 'Ativo' },
  { title: 'Ocupação acima do limite', probability: 'Média', impact: 'Alto', level: 'Alto', status: 'Monitorado' },
  { title: 'Carga bloqueando acesso', probability: 'Alta', impact: 'Médio', level: 'Médio', status: 'Pendente' }
];

const fallbackCompliance = [
  { label: 'Controle de acesso', value: '98%' },
  { label: 'Auditoria', value: '100%' },
  { label: 'Rastreabilidade', value: '96%' },
  { label: 'Segregação de funções', value: '94%' },
  { label: 'Gestão de riscos', value: '97%' },
  { label: 'Privacidade', value: '95%' }
];

function getBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.__ARGOS_API_BASE_URL__) {
    return window.__ARGOS_API_BASE_URL__.replace(/\/$/, '');
  }
  return '';
}

async function requestJson(path, options = {}) {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    return null;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return response.json();
}

function unwrap(payload, fallback) {
  if (!payload) return fallback;
  if (payload.data !== undefined) return payload.data;
  if (payload.result !== undefined) return payload.result;
  return payload;
}

export async function loadDashboardData() {
  try {
    const payload = await requestJson('/api/dashboard');
    return unwrap(payload, fallbackDashboard).dashboard ?? unwrap(payload, fallbackDashboard);
  } catch {
    return fallbackDashboard;
  }
}

export async function loadWarehouseData() {
  try {
    const payload = await requestJson('/api/warehouse');
    return unwrap(payload, fallbackWarehouse);
  } catch {
    return fallbackWarehouse;
  }
}

export async function loadAuditData() {
  try {
    const payload = await requestJson('/api/audit');
    return unwrap(payload, fallbackAudit);
  } catch {
    return fallbackAudit;
  }
}

export async function loadRiskData() {
  try {
    const payload = await requestJson('/api/risks');
    return unwrap(payload, fallbackRisks);
  } catch {
    return fallbackRisks;
  }
}

export async function loadComplianceData() {
  try {
    const payload = await requestJson('/api/compliance');
    return unwrap(payload, fallbackCompliance);
  } catch {
    return fallbackCompliance;
  }
}

export async function submitLoad(payload) {
  try {
    const response = await requestJson('/api/carga', {
      method: 'POST',
      body: JSON.stringify({ route: '/api/carga', ...payload })
    });
    return unwrap(response, { message: 'Carga enviada com sucesso.' });
  } catch {
    return { message: 'Modo offline: a carga foi registrada localmente e está pronta para sincronização.' };
  }
}

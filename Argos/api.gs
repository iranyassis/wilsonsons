function getDashboardData() {
  return {
    ocupacao: 38,
    livres: 540,
    ocupadas: 338,
    imo: 25,
    produtividade: 94,
    movimentosHoje: 127,
    sugestoes: 24
  };
}

function getWarehouseData() {
  return [
    { id: 'A12-01', status: 'free', lane: 'A', col: 12, level: 1, code: '—', type: 'Livre', weight: '—', operator: '—', stored: '—' },
    { id: 'A12-02', status: 'reserved', lane: 'A', col: 12, level: 2, code: 'C-204', type: 'Palete', weight: '14.8t', operator: 'Talita', stored: '03h 20m' },
    { id: 'A12-03', status: 'occupied', lane: 'A', col: 12, level: 3, code: 'IMO-17', type: 'Carga IMO', weight: '19.2t', operator: 'Jonas', stored: '06h 10m' }
  ];
}

function getAuditData() {
  return [
    { date: '20/07/2026', user: 'Marta', event: 'Nova carga', load: 'C-204', position: 'A12-02', status: 'Aprovado' },
    { date: '20/07/2026', user: 'Jonas', event: 'Sugestão IA', load: 'IMO-17', position: 'A12-03', status: 'Confirmado' }
  ];
}

function getRiskData() {
  return [
    { title: 'Carga IMO em posição incorreta', probability: 'Alta', impact: 'Crítico', level: 'Severo', status: 'Ativo' },
    { title: 'Ocupação acima do limite', probability: 'Média', impact: 'Alto', level: 'Alto', status: 'Monitorado' }
  ];
}

function getComplianceData() {
  return [
    { label: 'Controle de acesso', value: '98%' },
    { label: 'Auditoria', value: '100%' },
    { label: 'Rastreabilidade', value: '96%' },
    { label: 'Segregação de funções', value: '94%' }
  ];
}

function getAllocationSuggestion(payload) {
  return {
    position: 'Rua A · Coluna 14 · Nível 2',
    confidence: '97%',
    reasons: ['Menor deslocamento', 'Menor consumo de energia', 'Ocupação ideal', 'Carga compatível']
  };
}

function saveLoad(payload) {
  const sheet = getSheet('Cargas');
  if (!sheet) return;
  sheet.appendRow([
    payload.code || 'SEM-CODIGO',
    payload.description || '',
    payload.weight || '',
    payload.priority || '',
    payload.destination || '',
    new Date().toISOString()
  ]);
}

import { useEffect, useMemo, useState } from 'react';
import {
  loadAuditData,
  loadComplianceData,
  loadDashboardData,
  loadRiskData,
  loadWarehouseData,
  submitLoad
} from './services/api';

const navigation = [
  { id: 'overview', label: 'Dashboard Executivo', icon: '◉' },
  { id: 'digital-twin', label: 'Digital Twin', icon: '⬢' },
  { id: 'new-load', label: 'Nova Carga', icon: '▣' },
  { id: 'audit', label: 'Auditoria', icon: '▤' },
  { id: 'risks', label: 'Gestão de Riscos', icon: '⚠' },
  { id: 'compliance', label: 'Compliance', icon: '✓' },
  { id: 'settings', label: 'Configurações', icon: '⚙' }
];

const occupancyBars = [
  { corridor: 'A', value: 82 },
  { corridor: 'B', value: 64 },
  { corridor: 'C', value: 71 },
  { corridor: 'D', value: 48 }
];

const loadTypes = [
  { name: 'Container', value: 38, color: '#4cc9f0' },
  { name: 'Palete', value: 27, color: '#3a86ff' },
  { name: 'IMO', value: 19, color: '#4361ee' },
  { name: 'Fragile', value: 16, color: '#5e60ce' }
];

const movementBars = [
  { shift: '06h', value: 22 },
  { shift: '12h', value: 34 },
  { shift: '18h', value: 28 },
  { shift: '24h', value: 17 }
];

const defaultPositions = [
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

const defaultAuditRows = [
  { date: '20/07/2026', user: 'Marta', event: 'Nova carga', load: 'C-204', position: 'A12-02', status: 'Aprovado' },
  { date: '20/07/2026', user: 'Jonas', event: 'Sugestão IA', load: 'IMO-17', position: 'A12-03', status: 'Confirmado' },
  { date: '19/07/2026', user: 'Lia', event: 'Mudança manual', load: 'C-320', position: 'A13-03', status: 'Revisado' }
];

const defaultRiskCards = [
  { title: 'Carga IMO em posição incorreta', probability: 'Alta', impact: 'Crítico', level: 'Severo', status: 'Ativo' },
  { title: 'Ocupação acima do limite', probability: 'Média', impact: 'Alto', level: 'Alto', status: 'Monitorado' },
  { title: 'Carga bloqueando acesso', probability: 'Alta', impact: 'Médio', level: 'Médio', status: 'Pendente' }
];

const defaultComplianceItems = [
  { label: 'Controle de acesso', value: '98%' },
  { label: 'Auditoria', value: '100%' },
  { label: 'Rastreabilidade', value: '96%' },
  { label: 'Segregação de funções', value: '94%' },
  { label: 'Gestão de riscos', value: '97%' },
  { label: 'Privacidade', value: '95%' }
];

function App() {
  const [activeView, setActiveView] = useState('overview');
  const [selectedPositionId, setSelectedPositionId] = useState(defaultPositions[2].id);
  const [dashboardData, setDashboardData] = useState({ ocupacao: 38, livres: 540, ocupadas: 338, imo: 25, produtividade: 94, movimentosHoje: 127, sugestoes: 24 });
  const [positions, setPositions] = useState(defaultPositions);
  const [auditRows, setAuditRows] = useState(defaultAuditRows);
  const [riskCards, setRiskCards] = useState(defaultRiskCards);
  const [complianceItems, setComplianceItems] = useState(defaultComplianceItems);
  const [statusMessage, setStatusMessage] = useState('');
  const [formData, setFormData] = useState({
    code: 'C-204',
    description: 'Container refrigerado',
    weight: '14.8t',
    volume: '36 m³',
    category: 'Cold chain',
    imo: 'Não',
    priority: 'Alta',
    destination: 'Porto Norte',
    date: '2026-07-20'
  });

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const [dashboard, warehouse, audit, risks, compliance] = await Promise.all([
        loadDashboardData(),
        loadWarehouseData(),
        loadAuditData(),
        loadRiskData(),
        loadComplianceData()
      ]);

      if (!isMounted) return;

      setDashboardData((prev) => ({ ...prev, ...dashboard }));
      setPositions(warehouse);
      setAuditRows(audit);
      setRiskCards(risks);
      setComplianceItems(compliance);
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedPosition = positions.find((position) => position.id === selectedPositionId) ?? positions[0] ?? defaultPositions[0];

  const heroStats = useMemo(() => [
    { label: 'Taxa de ocupação', value: `${dashboardData.ocupacao}%`, change: '+4.2%' },
    { label: 'Total de cargas', value: `${dashboardData.ocupadas + dashboardData.livres}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'), change: '+18' },
    { label: 'Movimentações do dia', value: `${dashboardData.movimentosHoje}`, change: '+9%' },
    { label: 'Sugestões da IA', value: `${dashboardData.sugestoes}`, change: '+6' }
  ], [dashboardData]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLoad = async (event) => {
    event.preventDefault();
    const response = await submitLoad(formData);
    setStatusMessage(response.message || 'Carga enviada com sucesso.');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'digital-twin':
        return (
          <section className="card-grid two-col">
            <div className="panel panel-large">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Digital Twin Operacional</p>
                  <h3>Mapa visual do armazém</h3>
                </div>
                <div className="legend">
                  <span><i className="dot free" />Livre</span>
                  <span><i className="dot reserved" />Reservado</span>
                  <span><i className="dot occupied" />Ocupado</span>
                  <span><i className="dot restricted" />Restrito</span>
                </div>
              </div>
              <div className="warehouse-grid">
                {positions.map((position) => (
                  <button
                    key={position.id}
                    className={`warehouse-cell ${position.status}`}
                    onClick={() => setSelectedPositionId(position.id)}
                  >
                    <strong>{position.id}</strong>
                    <span>{position.status}</span>
                  </button>
                ))}
              </div>
            </div>
            <aside className="panel detail-panel">
              <p className="eyebrow">Posição selecionada</p>
              <h3>{selectedPosition.id}</h3>
              <div className="detail-list">
                <div><span>Código</span><strong>{selectedPosition.code}</strong></div>
                <div><span>Tipo</span><strong>{selectedPosition.type}</strong></div>
                <div><span>Peso</span><strong>{selectedPosition.weight}</strong></div>
                <div><span>Operador</span><strong>{selectedPosition.operator}</strong></div>
                <div><span>Tempo armazenado</span><strong>{selectedPosition.stored}</strong></div>
              </div>
            </aside>
          </section>
        );
      case 'new-load':
        return (
          <section className="card-grid two-col">
            <div className="panel">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Cadastro de carga</p>
                  <h3>Nova solicitação de armazenamento</h3>
                </div>
              </div>
              <form className="form-grid" onSubmit={handleSubmitLoad}>
                <label>Código<input name="code" value={formData.code} onChange={handleFormChange} /></label>
                <label>Descrição<input name="description" value={formData.description} onChange={handleFormChange} /></label>
                <label>Peso<input name="weight" value={formData.weight} onChange={handleFormChange} /></label>
                <label>Volume<input name="volume" value={formData.volume} onChange={handleFormChange} /></label>
                <label>Categoria<select name="category" value={formData.category} onChange={handleFormChange}><option>Cold chain</option><option>Fragile</option><option>IMO</option></select></label>
                <label>Carga IMO<select name="imo" value={formData.imo} onChange={handleFormChange}><option>Sim</option><option>Não</option></select></label>
                <label>Prioridade<select name="priority" value={formData.priority} onChange={handleFormChange}><option>Alta</option><option>Média</option><option>Baixa</option></select></label>
                <label>Destino<input name="destination" value={formData.destination} onChange={handleFormChange} /></label>
                <label>Data<input name="date" type="date" value={formData.date} onChange={handleFormChange} /></label>
                <button type="submit" className="primary-btn">Solicitar Alocação Inteligente</button>
                {statusMessage ? <p className="status-text">{statusMessage}</p> : null}
              </form>
            </div>
            <div className="panel">
              <p className="eyebrow">IA de Alocação</p>
              <h3>Posição sugerida: Rua A · Coluna 14 · Nível 2</h3>
              <div className="ai-box">
                <div className="ai-score">97%</div>
                <ul>
                  <li>✓ Menor deslocamento</li>
                  <li>✓ Menor consumo de energia</li>
                  <li>✓ Ocupação ideal</li>
                  <li>✓ Carga compatível</li>
                  <li>✓ Menor esforço do operador</li>
                </ul>
              </div>
            </div>
          </section>
        );
      case 'audit':
        return (
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Dashboard de Auditoria</p>
                <h3>Rastreamento operacional</h3>
              </div>
              <div className="filter-row">
                <button className="ghost-btn">Data</button>
                <button className="ghost-btn">Operador</button>
                <button className="ghost-btn">Tipo</button>
                <button className="primary-btn">Exportar CSV</button>
              </div>
            </div>
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Usuário</th>
                  <th>Evento</th>
                  <th>Carga</th>
                  <th>Posição</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {auditRows.map((row) => (
                  <tr key={`${row.date}-${row.event}`}>
                    <td>{row.date}</td>
                    <td>{row.user}</td>
                    <td>{row.event}</td>
                    <td>{row.load}</td>
                    <td>{row.position}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        );
      case 'risks':
        return (
          <section className="card-grid three-col">
            {riskCards.map((risk) => (
              <div className="panel risk-card" key={risk.title}>
                <p className="eyebrow">Risco operacional</p>
                <h3>{risk.title}</h3>
                <div className="risk-meta">
                  <div><span>Probabilidade</span><strong>{risk.probability}</strong></div>
                  <div><span>Impacto</span><strong>{risk.impact}</strong></div>
                  <div><span>Nível</span><strong>{risk.level}</strong></div>
                  <div><span>Status</span><strong>{risk.status}</strong></div>
                </div>
              </div>
            ))}
          </section>
        );
      case 'compliance':
        return (
          <section className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Compliance institucional</p>
                <h3>Alinhamento com boas práticas de governança</h3>
              </div>
            </div>
            <div className="compliance-grid">
              {complianceItems.map((item) => (
                <div className="compliance-item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        );
      case 'settings':
        return (
          <section className="card-grid two-col">
            <div className="panel">
              <p className="eyebrow">Configurações</p>
              <h3>Operadores e regras</h3>
              <div className="settings-list">
                <div><span>Operadores</span><strong>24 ativos</strong></div>
                <div><span>Tipos de carga</span><strong>8 categorias</strong></div>
                <div><span>Regras</span><strong>14 automáticas</strong></div>
                <div><span>Parâmetros IA</span><strong>Otimizados</strong></div>
              </div>
            </div>
            <div className="panel">
              <p className="eyebrow">Modo executivo</p>
              <h3>Governança by Design</h3>
              <div className="tag-row">
                <span className="tag">AI-First</span>
                <span className="tag">Explainable AI</span>
                <span className="tag">ISO 27001 inspired</span>
              </div>
            </div>
          </section>
        );
      default:
        return (
          <>
            <section className="hero-card">
              <div>
                <p className="eyebrow">AI-FIRST PLATFORM</p>
                <h2>ARGOS AI – Smart Warehouse Platform</h2>
                <p>Uma experiência executiva para governança, eficiência e decisão inteligente no armazém.</p>
              </div>
              <div className="hero-badge">The Future of Smart Warehousing</div>
            </section>

            <section className="stats-grid">
              {heroStats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <p>{stat.label}</p>
                  <strong>{stat.value}</strong>
                  <span>{stat.change}</span>
                </div>
              ))}
            </section>

            <section className="card-grid two-col">
              <div className="panel panel-large">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Ocupação por corredor</p>
                    <h3>Mapa térmico operacional</h3>
                  </div>
                </div>
                <div className="bar-chart">
                  {occupancyBars.map((bar) => (
                    <div className="bar-item" key={bar.corridor}>
                      <div className="bar-track"><div className="bar-fill" style={{ height: `${bar.value}%` }} /></div>
                      <label>{bar.corridor}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Cargas por tipo</p>
                    <h3>Mix operacional</h3>
                  </div>
                </div>
                <div className="legend-stack">
                  {loadTypes.map((item) => (
                    <div className="legend-row" key={item.name}>
                      <div className="legend-color" style={{ background: item.color }} />
                      <span>{item.name}</span>
                      <strong>{item.value}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="card-grid two-col">
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <p className="eyebrow">Movimentações por turno</p>
                    <h3>Produtividade</h3>
                  </div>
                </div>
                <div className="bar-chart horizontal">
                  {movementBars.map((bar) => (
                    <div className="bar-item" key={bar.shift}>
                      <div className="bar-track horizontal"><div className="bar-fill" style={{ width: `${bar.value * 2.8}%` }} /></div>
                      <label>{bar.shift}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <p className="eyebrow">Eficiência operacional</p>
                <h3>94%</h3>
                <p>O índice de produtividade consolidado do turno atual está acima da média histórica.</p>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-mark">A</div>
            <div>
              <h1>ARGOS AI</h1>
              <p>Smart Warehouse Platform</p>
            </div>
          </div>
          <nav className="nav-list">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                onClick={() => setActiveView(item.id)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <p>Projeto educativo</p>
          <strong>KODIE Academy</strong>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="search-box">
            <span>⌕</span>
            <input placeholder="Pesquisar cargas, posições ou operadores" />
          </div>
          <div className="topbar-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">☾</button>
            <div className="profile-pill">
              <div className="avatar">IA</div>
              <div>
                <strong>Equipe ARGOS</strong>
                <p>Operação Central</p>
              </div>
            </div>
          </div>
        </header>

        <div className="page-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;

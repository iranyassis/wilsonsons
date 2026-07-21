# 🚢 ARGOS AI – Smart Warehouse Digital Twin

> **AI-First Platform for Intelligent Warehouse Allocation**

# 📖 Sobre o Projeto

O **ARGOS AI** é uma plataforma **AI-First** desenvolvida para modernizar o processo de visualização e alocação inteligente de cargas em um armazém autoportante.

Este projeto foi desenvolvido como solução para o **Desafio Final da KODIE Academy**, inspirado em um cenário real da **Wilson Sons**, aplicando conceitos de Inteligência Artificial, Automação, Digital Twin, Governança e Segurança da Informação.

O objetivo é transformar um processo operacional predominantemente manual em uma experiência digital, inteligente e orientada por dados, auxiliando operadores e gestores na tomada de decisões.

---

# 🎯 Problema

Atualmente, a alocação de cargas é realizada manualmente, dependendo da experiência do operador de empilhadeira para definir onde cada carga será armazenada.

Esse modelo apresenta desafios como:

* Retrabalho operacional
* Falta de visualização em tempo real
* Baixa rastreabilidade
* Risco de erro humano
* Movimentações desnecessárias
* Maior consumo de tempo e energia
* Dificuldade para tratar cargas especiais (IMO)

---

# 💡 Solução

O ARGOS AI utiliza o conceito de **Digital Twin** para representar virtualmente o armazém e aplicar algoritmos inteligentes que sugerem automaticamente a melhor posição para armazenamento.

A solução considera critérios como:

* Distância da posição
* Taxa de ocupação
* Tipo da carga
* Peso
* Restrições de segurança
* Compatibilidade com cargas IMO
* Produtividade operacional

---

# 🚀 Principais Funcionalidades

## Dashboard Executivo

* Taxa de ocupação
* Movimentações do dia
* Total de cargas
* Eficiência operacional
* Alertas críticos
* Indicadores de produtividade

---

## Digital Twin

Representação visual do armazém.

Visualização de:

* Corredores
* Colunas
* Níveis
* Posições livres
* Posições ocupadas
* Áreas restritas

---

## Cadastro de Cargas

Cadastro de:

* Código
* Descrição
* Peso
* Volume
* Categoria
* Destino
* Prioridade
* Carga IMO

---

## Alocação Inteligente

Motor de decisão baseado em IA.

A plataforma calcula automaticamente o melhor local para armazenamento.

Critérios utilizados:

* Distância
* Segurança
* Peso
* Ocupação
* Compatibilidade
* Prioridade

---

## IA Explicável (Explainable AI)

Além de sugerir a posição ideal, o sistema apresenta os motivos da recomendação.

Exemplo:

* Menor deslocamento
* Melhor aproveitamento do espaço
* Compatível com o tipo de carga
* Menor consumo operacional
* Nível ideal de ocupação

---

## Auditoria

Registro automático de eventos.

São registrados:

* Login
* Cadastro de cargas
* Sugestões da IA
* Alterações manuais
* Exclusões
* Aprovações
* Erros

Todos os registros permanecem disponíveis para rastreabilidade.

---

## Dashboard de Compliance

Indicadores de:

* Auditoria
* Segurança
* Governança
* Conformidade
* Riscos

---

# 🤖 Arquitetura da Solução

```text
Lovable (Front-end)

        │

Google Apps Script

        │

Business Layer

        │

AI Engine

        │

Google Sheets

        │

Dashboard + Auditoria
```

---

# 🏗 Arquitetura do Projeto

```
ARGOS-AI

├── src
│
├── api.gs
├── aiEngine.gs
├── warehouse.gs
├── audit.gs
├── dashboard.gs
├── auth.gs
├── notification.gs
├── utils.gs
├── config.gs
│
├── appsscript.json
├── package.json
└── README.md
```

---

# 🛠 Tecnologias

### Front-end

* Lovable
* React
* TypeScript

### Back-end

* Google Apps Script

### Banco de Dados

* Google Sheets

### Inteligência Artificial

* Engenharia de Prompt
* IA Generativa
* Motor de Decisão
* Explainable AI

### Dashboard

* Google Charts
* Componentes React

### Ferramentas

* Visual Studio Code
* Git
* GitHub
* clasp (Google Apps Script CLI)

---

# 🔐 Segurança da Informação

O projeto incorpora práticas inspiradas na **ISO/IEC 27001**, incluindo:

* Controle de acesso
* Auditoria
* Rastreabilidade
* Gestão de riscos
* Segregação de funções
* Registro de eventos
* Princípios de confidencialidade, integridade e disponibilidade

---

# 📊 Gestão de Riscos

| Risco                         | Controle Implementado            |
| ----------------------------- | -------------------------------- |
| Erro humano                   | Sugestão inteligente de alocação |
| Carga IMO em local inadequado | Validação automática             |
| Excesso de ocupação           | Monitoramento contínuo           |
| Perda de histórico            | Auditoria automática             |
| Falta de rastreabilidade      | Registro completo de eventos     |

---

# 📈 Indicadores

* Taxa de ocupação
* Total de cargas
* Movimentações diárias
* Eficiência operacional
* Produtividade
* Alertas
* Eventos auditados
* Índice de conformidade

---

# 🌐 Fluxo da Aplicação

```
Operador

↓

Cadastro da carga

↓

IA calcula melhor posição

↓

Sugestão apresentada

↓

Operador confirma

↓

Registro em Auditoria

↓

Atualização Dashboard

↓

Atualização do Digital Twin
```

---

# 📦 Estrutura do Banco de Dados

Planilhas utilizadas:

* Cargas
* Armazém
* Auditoria
* Dashboard
* Operadores
* Configurações

---

# 📚 Conceitos Aplicados

* AI-First
* Digital Twin
* Explainable AI (XAI)
* Business Intelligence
* Governança de TI
* Engenharia de Prompt
* Automação
* UX/UI
* Arquitetura de Sistemas
* Segurança da Informação

---

# 🎓 Objetivos de Aprendizagem

* Aplicar IA em um problema real de negócio
* Desenvolver uma aplicação Low-Code integrada
* Automatizar processos com Google Apps Script
* Utilizar Google Sheets como banco de dados
* Implementar boas práticas de arquitetura
* Demonstrar conceitos de Governança e Segurança

---

# 🚀 Melhorias Futuras

* Integração com ERP/WMS
* API REST completa
* Banco de dados SQL
* Machine Learning para otimização contínua
* Sensores IoT para atualização automática do Digital Twin
* QR Code para identificação de cargas
* Integração com Power BI
* Previsão de ocupação baseada em IA
* Alertas em tempo real

---

# 👩‍💻 Desenvolvedora

**Irany Assis**

Analista e Desenvolvedora de Sistemas | Segurança da Informação | Governança de TI | Inteligência Artificial | Cloud Computing

---

# 📜 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos e educacionais como parte do **Desafio Final da KODIE Academy**, inspirado em um cenário real da Wilson Sons.

---

## ⭐ Projeto desenvolvido para fins educativos na KODIE Academy.

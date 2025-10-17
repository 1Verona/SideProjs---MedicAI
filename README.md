# MedicAI - Sistema de Análise Médica com IA

Um sistema web moderno que utiliza IA para analisar prontuários médicos e identificar condições importantes como insuficiência cardíaca descompensada, problemas renais, uso de antidepressivos e câncer.

## 🚀 Tecnologias

- **Frontend**: [Nuxt.js 3](https://nuxt.com) - Framework Vue moderno
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Database**: [Prisma ORM](https://www.prisma.io) com SQLite
- **IA**: [Anthropic Claude API](https://claude.ai) para análise inteligente
- **Backend**: Nuxt Server Routes (H3)

## 📋 Recursos

- ✅ Análise automática de prontuários usando IA
- ✅ Detecção de 4 condições médicas principais
- ✅ Histórico de análises persistente
- ✅ Interface moderna e responsiva
- ✅ Scores de confiança para cada análise
- ✅ Modal detalhado com informações completas

## 🛠️ Setup e Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/1Verona/SideProjs---MedicAI.git
cd SideProjs---MedicAI
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave da API do Anthropic (Claude):
```env
OPENAI_API_KEY=sua-chave-da-api-aqui
DATABASE_URL="file:./prisma/dev.db"
```

4. **Setup do Prisma**
```bash
npx prisma migrate dev
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

## 📖 Como Usar

1. **Página Principal** - Vá para a página de Análise
2. **Preencher Informações** - Adicione nome, idade e gênero (opcionais)
3. **Colar Prontuário** - Cole o prontuário médico completo
4. **Analisar** - Clique no botão "Analisar Prontuário"
5. **Ver Resultados** - Receberá análise com scores de confiança
6. **Histórico** - Acesse o histórico para ver análises anteriores

## 🗄️ Estrutura do Banco de Dados

```prisma
model MedicalRecord {
  id                    String
  createdAt             DateTime
  updatedAt             DateTime
  
  patientName           String
  patientAge            Int?
  patientGender         String?
  medicalContent        String
  
  hasHeartFailure       Boolean?
  hasKidneyProblems     Boolean?
  takesAntidepressants  Boolean?
  hasCancer             Boolean?
  
  heartFailureScore     Float?
  kidneyProblemsScore   Float?
  antidepressantScore   Float?
  cancerScore           Float?
  
  fullAnalysis          String?
  model                 String
}
```

## 🔍 Estrutura do Projeto

```
.
├── pages/
│   ├── index.vue           # Página de análise
│   └── histórico.vue       # Histórico de análises
├── components/
│   ├── ResultCard.vue      # Card de resultado
│   ├── BadgeResult.vue     # Badge de sim/não
│   └── DetailResultCard.vue # Card de detalhes
├── layouts/
│   └── default.vue         # Layout padrão
├── server/
│   ├── api/
│   │   ├── analyze.post.ts # Endpoint de análise
│   │   └── records.get.ts  # Endpoint de histórico
│   └── utils/
│       └── medicalAnalyzer.ts # Lógica de análise com IA
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
└── nuxt.config.ts          # Configuração do Nuxt
```

## 📝 API Endpoints

### POST `/api/analyze`

Analisa um prontuário médico.

**Request:**
```json
{
  "patientName": "João Silva",
  "patientAge": 65,
  "patientGender": "M",
  "medicalContent": "Prontuário completo do paciente..."
}
```

**Response:**
```json
{
  "hasHeartFailure": true,
  "hasKidneyProblems": false,
  "takesAntidepressants": true,
  "hasCancer": false,
  "heartFailureScore": 0.92,
  "kidneyProblemsScore": 0.15,
  "antidepressantScore": 0.88,
  "cancerScore": 0.05,
  "fullAnalysis": "Análise completa em texto...",
  "recordId": "record-id-123"
}
```

### GET `/api/records`

Recupera todas as análises realizadas.

**Response:**
```json
[
  {
    "id": "record-id-1",
    "patientName": "João Silva",
    "patientAge": 65,
    "hasHeartFailure": true,
    "hasKidneyProblems": false,
    "takesAntidepressants": true,
    "hasCancer": false,
    "createdAt": "2025-10-17T22:55:00Z",
    ...
  }
]
```

## ⚙️ Variáveis de Ambiente

```env
# Chave da API do Anthropic (Claude)
OPENAI_API_KEY=sk-proj-...

# URL do banco de dados
DATABASE_URL=file:./prisma/dev.db
```

## 🚨 Avisos Importantes

⚠️ **AVISO MÉDICO IMPORTANTE**:
- Esta ferramenta é **APENAS INFORMATIVA**
- Não substitui diagnóstico profissional
- Sempre consulte um médico qualificado
- Não use para diagnóstico final de pacientes

## 🔒 Segurança

- As chaves de API são armazenadas apenas localmente em `.env`
- O arquivo `.env` está no `.gitignore`
- Os dados de análise são armazenados localmente no banco SQLite
- Não fazemos upload de dados sensíveis para servidores terceirizados

## 📦 Build para Produção

```bash
npm run build
npm run preview
```

## 🐛 Troubleshooting

**Erro: "OpenAI API key not configured"**
- Verifique se o arquivo `.env` existe
- Confirme que `OPENAI_API_KEY` está preenchida
- Reinicie o servidor de desenvolvimento

**Erro ao conectar ao banco de dados**
```bash
npx prisma migrate dev
npx prisma db push
```

**Porta 3000 já em uso**
```bash
npm run dev -- --port 3001
```

## 📚 Documentação Adicional

- [Nuxt Documentation](https://nuxt.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Anthropic Claude API](https://docs.anthropic.com)

## 📄 Licença

Este projeto está disponível sob licença MIT.

## 👨‍💻 Desenvolvedor

Criado por [Verona](https://github.com/1Verona)

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

---

**Nota**: Lembre-se sempre de usar esta ferramenta com responsabilidade e nunca como substituição para aconselhamento médico profissional.

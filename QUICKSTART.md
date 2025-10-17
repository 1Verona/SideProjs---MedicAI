# 🚀 Guia Rápido - MedicAI

Bem-vindo ao MedicAI! Siga estes passos para começar em menos de 5 minutos.

## 1️⃣ Configuração Inicial

### Clone o repositório
```bash
git clone https://github.com/1Verona/SideProjs---MedicAI.git
cd SideProjs---MedicAI
```

### Instale as dependências
```bash
npm install
```

### Configure a variável de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Abra .env e adicione sua chave da API do Claude:
# Obtenha em: https://console.anthropic.com/
```

### Inicie o servidor
```bash
npm run dev
```

Abra `http://localhost:3000` no seu navegador! ✨

---

## 2️⃣ Como Usar

### Análise de Prontuário

1. **Vá para a página inicial** - Você verá o formulário de análise
2. **Preencha os dados (opcional)**:
   - Nome do paciente
   - Idade
   - Gênero
3. **Cole o prontuário médico** - Toda a informação médica do paciente
4. **Clique em "Analisar Prontuário"** - Aguarde a IA processar
5. **Veja os resultados**:
   - ❤️ Insuficiência Cardíaca Descompensada
   - 🫘 Problemas Renais
   - 💊 Uso de Antidepressivos
   - ⚠️ Câncer
   - Cada resultado tem um score de confiança

### Histórico
- Clique em "Histórico" na barra de navegação
- Veja todas as análises realizadas
- Clique em "Ver" para expandir detalhes completos

---

## 3️⃣ Comandos Úteis

```bash
# Iniciar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Gerar cliente Prisma
npx prisma generate

# Abrir Prisma Studio (visualizador de BD)
npx prisma studio
```

---

## 4️⃣ Estrutura do Projeto

```
MedicAI/
├── pages/                      # Páginas Nuxt
│   ├── index.vue              # Análise
│   └── histórico.vue          # Histórico
├── components/                 # Componentes Vue
├── server/
│   ├── api/                   # Endpoints da API
│   └── utils/                 # Utilitários (análise com IA)
├── prisma/
│   ├── schema.prisma          # Modelo de dados
│   └── dev.db                 # Banco de dados SQLite
├── app.vue                    # Componente raiz
└── nuxt.config.ts             # Configuração Nuxt
```

---

## 5️⃣ Solução de Problemas

### ❌ "OpenAI API key not configured"
```bash
# Verifique se .env existe e tem a chave
cat .env

# Reinicie o servidor
npm run dev
```

### ❌ Erro ao conectar ao banco de dados
```bash
# Reinicialize o Prisma
rm prisma/dev.db
npx prisma migrate dev
```

### ❌ Porta 3000 já em uso
```bash
npm run dev -- -p 3001
```

---

## 🔒 Segurança

⚠️ **IMPORTANTE**: Sua chave da API fica segura em `.env` que **não é commitada** no Git.

---

## 📊 Exemplo de Prontuário

Para testar, cole um prontuário com informações como:

```
Paciente: João Silva
Idade: 65 anos
Histórico:
- Diagnóstico: Insuficiência cardíaca descompensada
- Medicações: Lisinopril, Furosemida, Sertraline
- Função renal: Clearance de creatinina 45 mL/min (problemas renais)
- Antecedentes: Diabetes tipo 2
```

---

## 📞 Precisa de Ajuda?

Consulte `README.md` para documentação completa.

Happy analyzing! 🎉

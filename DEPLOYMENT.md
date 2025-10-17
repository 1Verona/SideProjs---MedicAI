# 🚀 Guia de Deployment - MedicAI

## Opções de Deploy

### 1️⃣ Desenvolvimento Local (Recomendado para Começar)

```bash
npm run dev
# Acesse http://localhost:3000
```

---

### 2️⃣ Vercel (Recomendado para Produção)

**Passo 1: Configure Vercel**
```bash
npm install -g vercel
vercel login
```

**Passo 2: Deploy**
```bash
vercel
```

**Passo 3: Configure Variáveis de Ambiente**
1. Vá para: https://vercel.com/dashboard
2. Selecione seu projeto MedicAI
3. Vá em Settings → Environment Variables
4. Adicione:
   - `OPENAI_API_KEY`: sua chave Claude
   - `DATABASE_URL`: seu banco de dados (veja abaixo)

**Passo 4: Banco de Dados Vercel**
```bash
# Use Vercel Postgres (ou qualquer outro)
vercel env pull .env.local
```

---

### 3️⃣ Railway (Alternativa Fácil)

```bash
railway link
railway up
```

Configure em https://railway.app:
- Variáveis de ambiente
- PostgreSQL (opcional para escalar)

---

### 4️⃣ Docker (Auto-contido)

**Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

**Build:**
```bash
docker build -t medicai:latest .
docker run -e OPENAI_API_KEY=xxx -p 3000:3000 medicai
```

---

### 5️⃣ Heroku (Descontinuado, Não Recomendado)

```bash
heroku create medicai
heroku config:set OPENAI_API_KEY=xxx
git push heroku main
```

---

## 📊 Checklist de Deploy

- [ ] Testar localmente: `npm run dev`
- [ ] Build funciona: `npm run build`
- [ ] `.env` está em `.gitignore`
- [ ] API key configurada em variáveis de ambiente
- [ ] Database URL configurado
- [ ] Executar: `npx prisma migrate deploy`
- [ ] Testar endpoints da API
- [ ] Verificar CORS se necessário
- [ ] Limpar arquivos sensíveis
- [ ] Configurar logging
- [ ] Testar em staging primeiro

---

## 🔐 Segurança para Produção

```javascript
// nuxt.config.ts - Adicione
export default defineNuxtConfig({
  devtools: { enabled: false }, // Desabilitar em prod
  ssr: true, // Server-side rendering
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml']
    }
  }
})
```

---

## 📈 Performance

```bash
# Build otimizado
npm run build

# Preview de produção
npm run preview

# Analisar bundle
npm run build -- --analyze
```

---

## 🆘 Troubleshooting

**Erro: API key não configurada**
```bash
# Verificar variáveis de ambiente
echo $OPENAI_API_KEY
```

**Erro: Banco de dados não encontrado**
```bash
npx prisma migrate deploy
npx prisma db push
```

**Site lento**
- Ativar cache de CDN
- Usar região mais próxima
- Otimizar imagens

---

## 📊 Monitoramento

Configure logging em produção:
```typescript
// server/api/analyze.post.ts
console.log(`[${new Date().toISOString()}] Análise iniciada`)
```

Use:
- Sentry para error tracking
- LogRocket para user sessions
- Google Analytics para metrics

---

## ♻️ CI/CD com GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test # se tiver testes
      - uses: akhileshns/heroku-deploy@v3
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: medicai
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

---

## 💡 Dicas Finais

1. **Sempre teste em staging antes**
2. **Mantenha backups do banco**
3. **Monitor de performance 24/7**
4. **Atualize dependências regularmente**
5. **Use HTTPS em produção**
6. **Configure rate limiting para API**
7. **Implemente autenticação se necessário**

---

**Pronto para Deploy!** 🎉

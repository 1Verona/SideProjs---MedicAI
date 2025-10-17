# 🚀 Deploy no Vercel - MedicAI

## Passo 1: Preparar o repositório

```bash
# Já está no GitHub? Perfeito!
# Se não, faça push:
git push -u origin main
```

## Passo 2: Conectar ao Vercel

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione: `1Verona/SideProjs---MedicAI`
4. Clique "Import"

## Passo 3: Configurar Environment Variables

Na página de configuração do Vercel:

1. Vá para "Environment Variables"
2. Adicione:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Sua chave Claude
   - Clique "Add"

## Passo 4: Deploy

1. Clique "Deploy"
2. Aguarde (~2-5 minutos)
3. Pronto! URL gerada automaticamente

## Resultado

```
Seu site estará em:
https://medicai-[aleatorio].vercel.app
```

## Variáveis de Ambiente Necessárias

| Nome | Valor | Exemplo |
|------|-------|---------|
| `OPENAI_API_KEY` | Sua chave Claude | `sk-proj-...` |
| `DATABASE_URL` | URL do banco | `file:./prisma/dev.db` |

## Atualizar o site

Toda vez que fizer push no GitHub, Vercel faz deploy automaticamente!

```bash
git add .
git commit -m "Fix: description"
git push origin main
# Vercel detecta e faz deploy automaticamente
```

## Troubleshooting

### Erro: API key não encontrada
- Verifique se `OPENAI_API_KEY` está em Environment Variables
- Redeploye após adicionar

### Erro: Banco de dados não encontrado
- O SQLite é salvo no arquivo system
- Funciona no Vercel com `file:./prisma/dev.db`

### Build failed
- Verifique logs no dashboard do Vercel
- Geralmente é falta de variável de ambiente

## Preview

O Vercel cria preview automático para cada PR!

1. Faça um branch
2. Faça commit
3. Abra PR no GitHub
4. Vercel comenta com link de preview

## Manter sincronizado

Seu site fica sincronizado automaticamente:

```
GitHub ← Pull ← Vercel ← Deploy
```

Qualquer push em `main` = Deploy automático

## Próximos passos

1. ✅ Deploy no Vercel
2. Configurar domínio customizado (opcional)
3. Analytics (Vercel dashboard)
4. Edge functions (para performance)

---

**Deploy feito?** 🎉 Compartilhe a URL!

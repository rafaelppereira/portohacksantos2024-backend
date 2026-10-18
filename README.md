# Porto Hack Santos 2024 — Backend

Backend desenvolvido durante o **Porto Hack Santos 2024**, hackathon realizado em Santos/SP. A aplicação entrega atualizações em tempo real de dados da Atenção Primária à Saúde (APS) através de WebSockets e integração com IA generativa.

## Tecnologias

- **NestJS** — framework Node.js para APIs escaláveis
- **WebSockets / Socket.io** — comunicação em tempo real
- **Groq AI SDK** — integração com LLM para análise de dados
- **Swagger** — documentação automática da API
- **TypeScript**

## Funcionalidades

- Streaming de dados de APS em tempo real via WebSockets
- Processamento e análise com IA generativa (Groq)
- API REST documentada com Swagger
- Cache de dados para otimização de performance

## Como rodar

```bash
# Instalar dependências
npm install

# Variáveis de ambiente
cp .env.example .env

# Desenvolvimento
npm run start:dev

# Produção
npm run build && npm run start:prod
```

## Equipe

Projeto desenvolvido durante o Porto Hack Santos 2024.

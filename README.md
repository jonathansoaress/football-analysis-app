# Football Analysis Web App ⚽🤖

Um aplicativo web full-stack desenvolvido para fornecer análises profissionais de partidas de futebol (com foco na Copa do Mundo), integrando dados em tempo real e inteligência artificial (Google Gemini) para gerar prognósticos, placares prováveis e tendências de mercado.

## 🚀 Tecnologias Utilizadas

**Frontend:**
- React (via Vite)
- Tailwind CSS v4
- React Router DOM
- Axios
- Lucide React (Ícones)

**Backend:**
- Node.js & Express
- MongoDB (via Mongoose)
- `@google/genai` (Integração com Google Gemini 2.5)
- Axios (para consumo da API football-data.org)

## 📦 Estrutura do Projeto

O projeto é dividido em duas pastas principais:
- `/frontend`: Aplicação React
- `/backend`: Servidor Node.js

## ⚙️ Configuração Local (Passo a Passo)

### Pré-requisitos
- Node.js instalado (v18+)
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Gratuito)
- Chave de API do [football-data.org](https://www.football-data.org/) (Gratuito)
- Chave de API do [Google AI Studio](https://aistudio.google.com/app/apikey) (Gemini API)

### 1. Configurando o Backend
1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de exemplo de ambiente e renomeie para `.env`:
   ```bash
   cp .env.example .env
   ```
4. Preencha as variáveis no arquivo `.env`:
   - `PORT`: 5000
   - `MONGODB_URI`: Sua string de conexão do MongoDB
   - `FOOTBALL_DATA_API_KEY`: Sua chave do football-data.org
   - `GEMINI_API_KEY`: Sua chave do Gemini API
   - `FRONTEND_URL`: http://localhost:5173

5. Inicie o servidor:
   ```bash
   npm start
   ```

### 2. Configurando o Frontend
1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Copie o arquivo de exemplo de ambiente e renomeie para `.env`:
   ```bash
   cp .env.example .env
   ```
4. Opcional: Ajuste `VITE_API_URL` no `.env` se o backend não estiver rodando na porta 5000.
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🌐 Guia de Deployment

### Deploy do Banco de Dados (MongoDB Atlas)
1. Crie uma conta no MongoDB Atlas.
2. Crie um novo Cluster (Tier M0 - Free).
3. Na seção "Database Access", crie um usuário com senha.
4. Na seção "Network Access", adicione o IP `0.0.0.0/0` para permitir acesso de qualquer lugar (necessário para deploys no Vercel/Render).
5. Copie a "Connection String" e substitua `<password>` pela senha do usuário criado.

### Deploy do Backend (Render / Railway)
1. Crie uma conta no Render (render.com) ou Railway (railway.app).
2. Conecte sua conta do GitHub.
3. Crie um novo "Web Service".
4. Selecione este repositório.
5. Em **Root Directory**, digite `backend`.
6. Em **Build Command**, use `npm install`.
7. Em **Start Command**, use `node server.js`.
8. Adicione as Variáveis de Ambiente (`MONGODB_URI`, `FOOTBALL_DATA_API_KEY`, `GEMINI_API_KEY`, `FRONTEND_URL`).
9. Faça o deploy. Copie a URL gerada (ex: `https://meu-backend.onrender.com`).

### Deploy do Frontend (Vercel)
1. Faça login na [Vercel](https://vercel.com) com seu GitHub.
2. Crie um novo projeto importando este repositório.
3. Em **Root Directory**, clique em Editar e selecione `frontend`.
4. O framework "Vite" deve ser detectado automaticamente.
5. Adicione a variável de ambiente:
   - Name: `VITE_API_URL`
   - Value: `https://meu-backend.onrender.com/api` (A URL do backend que você gerou acima + `/api`).
6. Clique em Deploy.

## 🤖 Prompts do Gemini Utilizados

Abaixo está a base do prompt utilizado no código (`backend/services/geminiService.js`) para garantir análises profissionais:

```text
Você é um analista de futebol profissional e especialista em prognósticos esportivos com foco na [COMPETIÇÃO].
Preciso que você analise a próxima partida entre [MANDANTE] x [VISITANTE] que ocorrerá no dia [DATA].

Aqui estão os dados recentes fornecidos pela API:

TIME MANDANTE ([MANDANTE]):
- Posição atual / Informações: [DADOS]
- Últimos 5 jogos: [DADOS]

TIME VISITANTE ([VISITANTE]):
- Posição atual / Informações: [DADOS]
- Últimos 5 jogos: [DADOS]

TAREFA:
Com base nesses dados e **usando a ferramenta de busca do Google para obter informações em tempo real**, pesquise notícias recentes sobre ambas as seleções, como:
- Possíveis desfalques por lesão ou suspensão
- Clima, ânimos no vestiário e pressão da mídia
- Declarações de treinadores ou jogadores principais
- Tendências táticas

Formate sua resposta como um objeto JSON rigoroso contendo as seguintes chaves:
1. "analysisHtml": Uma string contendo a análise detalhada em formato HTML (use tags como <h3>, <p>, <ul>, <li>, <strong>). Inclua subtítulos para: Momento das Seleções, Diferenças Técnicas, Necessidade de Resultado, Desfalques e Notícias Recentes, Estilo de Jogo e Ânimos.
2. "mostProbableScore": Uma string prevendo o placar exato mais provável (ex: "2-1").
3. "bettingTips": Um array de strings com as 3 dicas de mercado de apostas mais prováveis (ex: ["Ambas marcam: Sim", "Mais de 2.5 gols", "Vitória do Mandante"]).
4. "confidenceLevel": Um número inteiro de 0 a 10 indicando o grau de confiança nessa previsão.
5. "mainRisks": Uma string breve descrevendo os principais riscos dessa entrada/previsão.

Atenção: A resposta deve ser EXCLUSIVAMENTE um objeto JSON válido.
```

## 📝 Como Conseguir as Chaves Gratuitas

1. **Football-Data.org:**
   - Acesse [football-data.org](https://www.football-data.org/client/register)
   - Preencha o formulário e receba sua chave gratuita no e-mail.
   - *Nota:* O plano gratuito tem um limite de 10 chamadas por minuto.
   
2. **Google Gemini (AI Studio):**
   - Acesse [Google AI Studio](https://aistudio.google.com/)
   - Faça login com sua conta Google.
   - Clique em "Get API key" e depois "Create API key".

3. **MongoDB Atlas:**
   - Acesse [MongoDB](https://www.mongodb.com/cloud/atlas/register)
   - Siga as etapas de criação do cluster M0 (Shared/Free).

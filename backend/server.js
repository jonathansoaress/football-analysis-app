const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const matchRoutes = require('./routes/matches');
const teamRoutes = require('./routes/teams');
const analysisRoutes = require('./routes/analysis');

app.use('/api/matches', matchRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/analysis', analysisRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do Football Analysis está rodando...');
});

// Tratamento de rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

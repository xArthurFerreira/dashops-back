const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Configuração flexível de CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:8080",
  "http://localhost:3000",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:3000"
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requisições sem origin (como curl, postman)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith('.vercel.app') || 
                      origin.endsWith('.github.dev') ||
                      origin.includes('localhost') ||
                      origin.includes('127.0.0.1');

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

// Rota base "/"
app.get('/', (req, res) => {
  res.json({
    status: "online",
    service: "DashOps API Backend",
    version: "1.1.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// Rota "/v1"
app.get('/v1', (req, res) => {
  const options = {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const dataFormatada = new Date().toLocaleString('pt-BR', options);

  res.json({
    message: "Api v1 respondendo no container docker...",
    chamada_em: dataFormatada
  });
});

app.listen(port, () => {
  console.log(`Servidor DashOps rodando na porta ${port}`);
});

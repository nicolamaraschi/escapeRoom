const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Abilita CORS per tutte le richieste
app.use(cors({
  origin: '*', // Permette richieste da qualsiasi origine
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept']
}));

// Supporto OPTIONS per preflight CORS
app.options('*', cors());

// Middleware per parsing JSON
app.use(bodyParser.json());

// Log di tutte le richieste
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const gameStatePath = path.join(__dirname, 'gameState.json');

if (!fs.existsSync(gameStatePath)) {
  const initialState = {
    currentAct: 1,
    solvedPuzzles: [],
    score: 1000,
    lastUpdated: Date.now()
  };
  fs.writeFileSync(gameStatePath, JSON.stringify(initialState, null, 2));
}

// Ping endpoint per verificare che il server sia attivo
app.get('/ping', (req, res) => {
  res.json({ message: 'pong', timestamp: new Date().toISOString() });
});

app.get('/game-state', (req, res) => {
  try {
    const gameState = JSON.parse(fs.readFileSync(gameStatePath, 'utf8'));
    console.log('Sending game state:', gameState);
    res.json(gameState);
  } catch (error) {
    console.error('Errore nella lettura dello stato:', error);
    res.status(500).json({ error: 'Errore nel server' });
  }
});

app.post('/game-state', (req, res) => {
  try {
    console.log('Received state update:', req.body);

    // Leggi lo stato corrente dal server
    const currentState = JSON.parse(fs.readFileSync(gameStatePath, 'utf8'));
    const incomingState = req.body;

    // MERGE INTELLIGENTE: unisci i puzzle risolti (no duplicati)
    const mergedPuzzles = [...new Set([
      ...(currentState.solvedPuzzles || []),
      ...(incomingState.solvedPuzzles || [])
    ])];

    // Prendi il massimo tra gli atti (il più avanzato)
    const maxAct = Math.max(
      currentState.currentAct || 1,
      incomingState.currentAct || 1
    );

    // Prendi il punteggio massimo
    const maxScore = Math.max(
      currentState.score || 1000,
      incomingState.score || 1000
    );

    // Crea il nuovo stato merged
    const mergedState = {
      currentAct: maxAct,
      solvedPuzzles: mergedPuzzles,
      score: maxScore,
      lastUpdated: Date.now()
    };

    // Salva lo stato merged
    fs.writeFileSync(gameStatePath, JSON.stringify(mergedState, null, 2));

    console.log('State merged successfully:', mergedState);

    // Ritorna lo stato merged al client
    res.json({
      success: true,
      message: 'Stato sincronizzato',
      state: mergedState
    });
  } catch (error) {
    console.error('Errore nel salvataggio dello stato:', error);
    res.status(500).json({ error: 'Errore nel server' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  const interfaces = require('os').networkInterfaces();
  let ipAddress = 'localhost';

  // Ottieni l'IP del computer
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && !alias.internal) {
        ipAddress = alias.address;
      }
    }
  }

  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Per accedere da altri dispositivi: http://${ipAddress}:${PORT}`);
  console.log(`Test del server: http://${ipAddress}:${PORT}/ping`);
});

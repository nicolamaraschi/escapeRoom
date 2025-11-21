# 🕰️ Cronache dell'Osservatorio Temporale

**Escape Room DIY - Budget ZERO per 4 Amici**

Un'escape room fisica/digitale ibrida che combina un'app web interattiva con materiali stampabili e oggetti fisici.

## 📋 Panoramica

- **Durata**: 90-120 minuti
- **Giocatori**: 1-4 (consigliato: 4)
- **Puzzle**: 10 puzzle divisi in 3 atti
- **Difficoltà**: Media-Alta
- **Budget**: €0-20 (solo stampe)

## 🚀 Quick Start

### Installazione

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il dev server
npm run dev

# 3. Apri nel browser
# L'app sarà disponibile su http://localhost:5173
```

### Build per Produzione

```bash
# Build dell'applicazione
npm run build

# Testa la build localmente
npm run preview
```

## 📱 Setup del Gioco

### Materiali Necessari

#### Digitali:
- 4 smartphone con browser moderno
- Wi-Fi o connessione dati
- App web aperta su tutti i dispositivi

#### Fisici da Stampare:
1. **P01**: Foglio con 4 orologi (con stelline disegnate)
2. **P02**: 5 documenti con QR codes nascosti
3. **P03**: Diario (5 pagine con lettere evidenziate)
4. **P04**: Mappa del mondo A3 con 5 località + QR codes
5. **P07**: 4 bigliettini con costanti fisiche
6. **P09**: 10 fotografie vintage

**Totale stampe**: ~25 fogli A4 + 1 A3

### Setup Ambiente Fisico

1. **Scegli una stanza** (salone, garage, camera grande)
2. **Oscura la stanza** (tende chiuse, luci soffuse)
3. **Dividi in 3 zone virtuali**:
   - **ZONA A (Scrivania)**: P01, P02, P03
   - **ZONA B (Tavolo)**: P07, P09
   - **ZONA C (Parete)**: P04 (mappa del mondo)
4. **Nascondi i materiali** secondo le istruzioni dei puzzle
5. **Prepara atmosfera**: candele LED, musica ambient

## 🎮 Come Giocare

### Flusso del Gioco

1. **Setup** (15 min prima):
   - Stampa tutti i materiali
   - Nascondi oggetti nella stanza
   - Apri l'app su 4 smartphone
   - Prepara l'atmosfera

2. **Start** (00:00):
   - Ogni giocatore inserisce il suo nome
   - Legge il briefing della missione
   - Accetta la missione (timer parte!)

3. **Atto 1 - Il Laboratorio** (30 min):
   - P01: Codice di Accesso Temporale
   - P02: Protocollo di Boot
   - P03: Il Diario del Dr. Vance

4. **Atto 2 - L'Osservazione** (40 min):
   - P04: Coordinate Temporali
   - P05: Eco del Passato
   - P06: Stanza degli Specchi
   - P07: Password Quantistica

5. **Atto 3 - Il Nucleo** (30 min):
   - P08: Sincronizzazione Multitemporale
   - P09: Archivio Olografico
   - P10: Protocollo di Reset (finale)

6. **Ending**:
   - Visualizza punteggio finale
   - Leggi l'epilogo della storia
   - Condividi risultato

## 🧩 Guida Puzzle (SPOILER!)

<details>
<summary>Clicca per vedere le soluzioni</summary>

### P01: Codice di Accesso
- **Soluzione**: `062102`
- **Logica**: Moltiplica le ore × numero di stelle

### P02: Protocollo di Boot
- **Frammenti**: INIT_, LOAD_, POWER_, CRONOS_, SYSTEM
- **Ordine corretto**: INIT → LOAD → POWER → CRONOS → SYSTEM

### P03: Il Diario
- **Soluzione**: `MARZO`
- **Logica**: Lettere evidenziate in giallo nelle pagine segnate

### P04: Coordinate Temporali
- **Eventi**: 1945-07-16, 1952-11-01, 1957-10-04, 1962-10-16, 1967-03-15
- **Logica**: Ordinare cronologicamente

### P05: Eco del Passato
- **Soluzione**: `CAUSALITY`
- **Nota**: Versione semplificata

### P06: Stanza degli Specchi
- **Nota**: Versione semplificata - puzzle logico

### P07: Password Quantistica
- **Soluzione**: `29960602`
- **Costanti**: C=299792, h=662607, Na=602214, G=667430

### P08: Sincronizzazione
- **Nota**: Versione semplificata - puzzle cooperativo

### P09: Archivio Olografico
- **Soluzione**: `472916`
- **Foto critiche**: 2, 5, 7, 8, 9, 10

### P10: Sequenza Finale
- **Fase 1**: CAUSALITY (da P05)
- **Fase 2**: 29960602 (da P07)
- **Fase 3**: 472916 (da P09)

</details>

## 🛠️ Tecnologie

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router v6
- **State**: Zustand + Firebase Realtime Database
- **QR**: html5-qrcode

## 📁 Struttura

```
escapeRoom/
├── src/
│   ├── components/      # Timer, HintButton, PuzzleCard, CodeInput
│   ├── pages/           # Start, Briefing, Dashboard, Puzzle, Ending
│   ├── puzzles/         # P01-P10 componenti puzzle
│   ├── data/            # puzzles.ts, story.ts
│   ├── store/           # gameStore.ts (Zustand + Firebase)
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # checkSolution.ts
│   ├── firebase.ts      # Firebase configuration
│   └── App.tsx
├── public/
│   ├── audio/
│   └── images/
└── dist/                # Build production
```

## 🎯 Features Future

### v2.0 - Multiplayer Real-time (✅ IMPLEMENTATO)
- Backend con Firebase Realtime Database
- Sincronizzazione istantanea tra dispositivi
- Stato condiviso per tutti i giocatori

### v2.1 - Audio & Media
- P05 con vero audio mixer
- Effetti sonori
- Musica dinamica

### v2.2 - Physical Integration
- Arduino/ESP32
- Lucchetti elettronici
- Sensori RFID

## 🐛 Troubleshooting

### QR Scanner non funziona
- Permetti accesso alla fotocamera
- Usa HTTPS o localhost
- Browser consigliato: Chrome

### Build fallisce
```bash
npm install -D tailwindcss@^3.4.0
```

### L'app non salva i progressi
- Controlla che LocalStorage sia abilitato
- Non usare modalità incognito

## 📝 Tips per Game Master

### Prima del Gioco
- Testa tutto in anticipo
- Prepara soluzioni di backup su carta
- Carica tutti i dispositivi
- Testa QR codes

### Durante il Gioco
- Dai hint dopo 10+ min di blocco
- Incoraggia la collaborazione
- Non rivelare troppo

### Setup Perfetto
- Stanza buia ma non troppo
- Musica ambient (Spotify: "Dark Ambient")
- Candele LED > candele vere
- Prepara snack per dopo!

## 📄 Licenza

MIT - Usalo, modificalo, condividilo liberamente!

## 🙏 Credits

Progetto DIY per escape room casalinga.

Basato sul design "Cronache dell'Osservatorio Temporale".

---

**Buona fortuna, Agenti! Il tempo stringe... ⏰🔍**

import type { Puzzle } from '../types';

export const PUZZLES: Puzzle[] = [
  // ATTO 1
  {
    id: 'P01',
    title: 'Codice di Accesso Temporale',
    act: 1,
    type: 'code-input',
    description: 'Sulla scrivania trovi un foglio con 4 orologi. Ogni orologio mostra un\'ora diversa e sopra ci sono delle stelline. Trova il codice a 6 cifre.',
    location: 'ZONA A: Scrivania',
    dependencies: [],
    solution: '062102',
    hints: [
      'Conta le stelline sopra ogni orologio',
      'Moltiplica le ore mostrate per il numero di stelle sopra ogni orologio',
      'Ordine: 03×2=06, 07×3=21, 02×1=02. Codice: 062102'
    ],
    timeEstimate: 8
  },
  {
    id: 'P02',
    title: 'Protocollo di Boot',
    act: 1,
    type: 'qr-scan',
    description: 'Trova 5 documenti nella zona Laboratorio. Ogni documento nasconde un QR code che contiene un frammento di testo. Scansionali tutti e riordinali nella sequenza corretta.',
    location: 'ZONA A: Scrivania (documenti sparsi)',
    dependencies: ['P01'],
    solution: 'INIT_LOAD_POWER_CRONOS_SYSTEM',
    hints: [
      'Ogni documento ha un QR code nascosto in un angolo o come watermark',
      'I frammenti vanno riordinati. Pensa alla sequenza di avvio di un computer',
      'Ordine corretto: INIT → LOAD → POWER → CRONOS → SYSTEM'
    ],
    timeEstimate: 12
  },
  {
    id: 'P03',
    title: 'Il Diario del Dr. Vance',
    act: 1,
    type: 'text-input',
    description: 'Trova il diario sulla scrivania. Alcune pagine hanno segnalibri. In queste pagine, alcune lettere sono evidenziate in giallo.',
    location: 'ZONA A: Scrivania',
    dependencies: ['P01'],
    solution: 'MARZO',
    hints: [
      'Guarda solo le pagine con i segnalibri colorati',
      'Leggi solo le lettere evidenziate in giallo, in ordine di pagina',
      'Le lettere formano: M-A-R-Z-O (mese dell\'esperimento)'
    ],
    timeEstimate: 10
  },

  // ATTO 2
  {
    id: 'P04',
    title: 'Coordinate Temporali',
    act: 2,
    type: 'timeline',
    description: 'Sulla mappa del mondo ci sono 5 località marcate con puntine. Vicino a ogni località c\'è un QR code. Scansionali e ordina gli eventi cronologicamente.',
    location: 'ZONA C: Parete con mappa',
    dependencies: ['P03'],
    solution: '1945_1952_1957_1962_1967',
    hints: [
      'Ogni QR rivela una data storica di un evento importante',
      'Ordina le date dalla più vecchia alla più recente',
      '1945 (Alamogordo) → 1952 (Marshall) → 1957 (Baikonur) → 1962 (Cuba) → 1967 (Pacific)'
    ],
    timeEstimate: 15
  },
  {
    id: 'P05',
    title: 'Eco del Passato',
    act: 2,
    type: 'audio',
    description: 'Ricostruisci la registrazione del Test Omega. Tre tracce audio devono essere mixate correttamente per rivelare una parola chiave.',
    location: 'Digitale - nell\'app',
    dependencies: ['P03'],
    solution: 'CAUSALITY',
    hints: [
      'La traccia "Allarmi" deve essere riprodotta al contrario (reverse)',
      'Tutte e tre le tracce devono suonare insieme a velocità 1.0x',
      'La parola nascosta nel mix è: CAUSALITY'
    ],
    timeEstimate: 12
  },
  {
    id: 'P06',
    title: 'Stanza degli Specchi',
    act: 2,
    type: 'grid',
    description: 'Posiziona gli specchi nella griglia per riflettere il laser dalla sorgente al target. Hai 5 specchi disponibili.',
    location: 'Digitale - nell\'app',
    dependencies: ['P04'],
    solution: 'GRID_COMPLETE',
    hints: [
      'Gli specchi sono orientati a 45° e riflettono il laser a 90°',
      'Il laser parte dall\'angolo in alto a sinistra e deve raggiungere l\'angolo in basso a destra',
      'Soluzione: posiziona specchi in (2,0), (2,3), (5,3)'
    ],
    timeEstimate: 10
  },
  {
    id: 'P07',
    title: 'Password Quantistica',
    act: 2,
    type: 'calculator',
    description: 'Trova 4 biglietti nascosti nella stanza con costanti fisiche. Usa le equazioni nell\'app per calcolare la password finale.',
    location: 'ZONA B: Tavolo centrale (biglietti nascosti)',
    dependencies: ['P05'],
    solution: '29960602',
    hints: [
      'Cerca i biglietti con: velocità della luce (C), costante di Planck (h), numero di Avogadro (Na), costante gravitazionale (G)',
      'Inserisci i valori nelle equazioni mostrate nell\'app',
      'Password: (C/10000)=29, (h/10000)-60=6, (Na/100000)%10=0, (G/10000)+1=2 → 29960602'
    ],
    timeEstimate: 13
  },

  // ATTO 3
  {
    id: 'P08',
    title: 'Sincronizzazione Multitemporale',
    act: 3,
    type: 'sync',
    description: 'Questo puzzle richiede collaborazione. Ogni giocatore ha una sequenza di pulsanti da premere. Tutti devono premere i pulsanti giusti CONTEMPORANEAMENTE in 4 momenti sincronizzati.',
    location: 'Digitale - app multiplayer',
    dependencies: ['P07'],
    solution: 'SYNC_COMPLETE',
    hints: [
      'Guardate i vostri schermi: ognuno ha pulsanti diversi da premere',
      'Il timer vi dirà quando premere. Dovete essere sincronizzati entro ±0.5 secondi',
      'Contate insieme ad alta voce: "3... 2... 1... ADESSO!" e premete'
    ],
    timeEstimate: 15
  },
  {
    id: 'P09',
    title: 'Archivio Olografico',
    act: 3,
    type: 'gallery',
    description: 'Trova 10 fotografie sparse nella stanza. Ogni foto ha un numero nascosto. Solo 6 foto sono "critiche" (hanno un bordo dorato). Trova i numeri nascosti nelle foto critiche.',
    location: 'ZONA B e C: Foto sparse',
    dependencies: ['P07'],
    solution: '472916',
    hints: [
      'Le foto critiche hanno un piccolo bordo dorato agli angoli',
      'In ogni foto critica c\'è un numero scritto molto piccolo (usa la fotocamera del telefono per zoommare)',
      'Numeri in ordine delle foto critiche 2,5,7,8,9,10: 4-7-2-9-1-6 → 472916'
    ],
    timeEstimate: 10
  },
  {
    id: 'P10',
    title: 'Protocollo di Reset',
    act: 3,
    type: 'sequence',
    description: 'La sequenza finale. Usa tutto ciò che hai imparato per completare il reset del Paradosso Temporale. Tre codici devono essere inseriti in sequenza, poi trova la scatola con il QR code finale.',
    location: 'Tutta la stanza + scatola finale',
    dependencies: ['P08', 'P09'],
    solution: 'RESET_COMPLETE',
    hints: [
      'Codice Alfa: parola trovata nel puzzle audio (P05)',
      'Codice Beta: password calcolata nel puzzle quantistico (P07)',
      'Codice Gamma: numeri dell\'archivio fotografico (P09)'
    ],
    timeEstimate: 15
  }
];

export const getPuzzleById = (id: string): Puzzle | undefined => {
  return PUZZLES.find(p => p.id === id);
};

export const getPuzzlesByAct = (act: number): Puzzle[] => {
  return PUZZLES.filter(p => p.act === act);
};

export const getNextPuzzles = (solvedPuzzles: string[]): Puzzle[] => {
  return PUZZLES.filter(puzzle => {
    // Già risolto
    if (solvedPuzzles.includes(puzzle.id)) return false;

    // Controlla se tutte le dipendenze sono risolte
    return puzzle.dependencies.every(dep => solvedPuzzles.includes(dep));
  });
};

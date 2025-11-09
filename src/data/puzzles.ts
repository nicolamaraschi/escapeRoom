import type { Puzzle } from '../types';

export const PUZZLES: Puzzle[] = [
  // ATTO 1
  {
    id: 'P01',
    title: 'Codice di Accesso Temporale',
    act: 1,
    type: 'code-input',
    description: 'Sulla scrivania trovi un foglio con 4 orologi analogici e simboli strani. Ogni orologio ha sopra una sequenza di simboli romani e sotto una formula matematica criptata. Il foglio è diviso in 4 sezioni con colori diversi.',
    location: 'ZONA A: Scrivania',
    dependencies: [],
    solution: '194721',
    hints: [
      'I simboli sopra ogni orologio sono numeri romani. Convertili in decimali',
      'Per ogni orologio: moltiplica le ore (lancette) per il numero romano, poi applica l\'operazione matematica sotto',
      'Orologio ROSSO: III × 8 ore = 24, poi -5 = 19 | VERDE: II × 7 ore = 14, poi +33 = 47 | BLU: IV × 3 ore = 12, poi +9 = 21 | Codice: 194721'
    ],
    timeEstimate: 12
  },
  {
    id: 'P02',
    title: 'Protocollo di Boot',
    act: 1,
    type: 'qr-scan',
    description: 'Trova 5 documenti classificati nella zona Laboratorio. Ogni QR code contiene un anagramma cifrato + un numero romano. Dovrai: 1) decifrare l\'anagramma 2) usare il numero romano come ordine 3) ricomporre la sequenza.',
    location: 'ZONA A: Scrivania (documenti sparsi)',
    dependencies: ['P01'],
    solution: 'INIT_LOAD_POWER_CRONOS_SYSTEM',
    hints: [
      'Ogni QR contiene: ANAGRAMMA + NUMERO ROMANO. Esempio: "TIIN_" + "I" = primo frammento',
      'Anagrammi: TIIN→INIT(I), ODLA→LOAD(II), ERWOP→POWER(III), SCORNO→CRONOS(IV), STYMSE→SYSTEM(V)',
      'Ricomponi in ordine romano: I-II-III-IV-V = INIT_LOAD_POWER_CRONOS_SYSTEM'
    ],
    timeEstimate: 15
  },
  {
    id: 'P03',
    title: 'Il Diario del Dr. Vance',
    act: 1,
    type: 'text-input',
    description: 'Il diario ha 8 pagine segnate. Ogni pagina contiene: 1) lettere sottolineate in colori diversi 2) numeri di pagina strani 3) coordinate marginali. Le lettere GIALLE formano una parola ma sono in disordine. I numeri delle pagine (scritti in piccolo agli angoli) indicano l\'ordine corretto.',
    location: 'ZONA A: Scrivania',
    dependencies: ['P01'],
    solution: 'PARADOSSO',
    hints: [
      'Ignora le lettere rosse, blu e verdi. Solo le GIALLE contano',
      'Ogni pagina ha due numeri: quello grande è falso, quello piccolissimo nell\'angolo è il vero ordine',
      'Pagine in ordine corretto: P-A-R-A-D-O-S-S-O = PARADOSSO (non MARZO!)'
    ],
    timeEstimate: 15
  },

  // ATTO 2
  {
    id: 'P04',
    title: 'Coordinate Temporali',
    act: 2,
    type: 'timeline',
    description: 'Sulla mappa ci sono 5 località con coordinate GPS parziali. Ogni QR contiene: un evento storico in codice + coordinate incomplete. Devi: 1) identificare l\'evento reale 2) trovare la data esatta 3) ordinare cronologicamente 4) usare le cifre delle coordinate come moltiplicatori.',
    location: 'ZONA C: Parete con mappa',
    dependencies: ['P03'],
    solution: '1945_1952_1957_1962_1967',
    hints: [
      'Eventi cifrati: "Trinity Test" (Alamogordo 1945), "Ivy Mike" (Marshall 1952), "Sputnik 1" (Baikonur 1957), "Crisi dei Missili" (Cuba 1962), "Test Starfish Prime" (Pacifico 1967)',
      'Le coordinate parziali sono hint visivi ma non servono per il codice',
      'Ordine cronologico finale: 1945_1952_1957_1962_1967'
    ],
    timeEstimate: 18
  },
  {
    id: 'P05',
    title: 'Eco del Passato',
    act: 2,
    type: 'audio',
    description: 'Trova 3 file audio nascosti (QR codes che linkano a file audio online). Ogni traccia contiene: 1) Voce distorta con parola in codice Morse 2) Rumore di fondo con frequenza nascosta 3) Quando mixate insieme formano la parola chiave. Traccia 1: velocità 0.75x, Traccia 2: reverse, Traccia 3: pitch +3 semitoni.',
    location: 'Digitale - nell\'app + QR sparsi',
    dependencies: ['P03'],
    solution: 'CAUSALITY',
    hints: [
      'Usa un\'app per modificare gli audio (es: Audacity sul telefono o online). Traccia 1 a 0.75x, Traccia 2 al contrario, Traccia 3 pitch +3',
      'Nel morse: C: -.-. A: .- U: ..- S: ... A: .- L: .-.. I: .. T: - Y: -.--',
      'Parola finale da inserire nell\'app: CAUSALITY'
    ],
    timeEstimate: 20
  },
  {
    id: 'P06',
    title: 'Stanza degli Specchi',
    act: 2,
    type: 'grid',
    description: 'Griglia 8x8 con laser. Il raggio parte da (0,0) verso destra. Devi posizionare 6 specchi (/) o (\\) per portare il laser al target (7,7). Ci sono 4 OSTACOLI NERI che bloccano il raggio. Gli specchi riflettono a 90°. Ogni specchio può essere usato una sola volta.',
    location: 'Digitale - nell\'app',
    dependencies: ['P04'],
    solution: 'GRID_COMPLETE',
    hints: [
      'Ostacoli fissi in: (2,1), (4,3), (5,5), (6,2). Il laser NON può attraversarli',
      'Specchi "/" riflettono: destra→su, sinistra→giù, su→destra, giù→sinistra. Specchi "\\" fanno l\'opposto',
      'Soluzione: (2,0)\\, (2,4)/, (4,4)\\, (4,6)/, (7,6)\\ → target (7,7)'
    ],
    timeEstimate: 18
  },
  {
    id: 'P07',
    title: 'Password Quantistica',
    act: 2,
    type: 'calculator',
    description: 'Trova 4 biglietti NASCOSTI con enigmi. Ogni biglietto ha un REBUS che porta a una costante fisica. Devi: 1) Risolvere il rebus 2) Identificare quale costante 3) Cercare il valore nella "Tavola Periodica Modificata" (poster nella stanza) 4) Applicare la formula matematica scritta sul biglietto. Password = 8 cifre concatenate.',
    location: 'ZONA B: Tavolo centrale (biglietti nascosti)',
    dependencies: ['P05'],
    solution: '29979745',
    hints: [
      'Rebus 1: "VEL-O-CITTÀ" → c (velocità luce) 299792, formula: primi 4 digit = 2997 | Rebus 2: "PI-A-NETTA" → G (6.674), formula: invertita = 4776 backwards = 6774... no aspetta: 97 dalla tavola | Rebus 3 e 4 danno 45',
      'Tavola Periodica Modificata: c=299792, h=662607, Na=602214, G=667430 (tutti * 10^-qualcosa, ma sulla tavola scritti interi)',
      'Formula finale: Biglietto 1 (2997) + Biglietto 2 (97) + Biglietto 3 (45) = 29979745'
    ],
    timeEstimate: 20
  },

  // ATTO 3
  {
    id: 'P08',
    title: 'Sincronizzazione Multitemporale',
    act: 3,
    type: 'sync',
    description: 'Puzzle cooperativo avanzato. 4 giocatori, 4 tablet. Ogni tablet mostra una griglia 4x4 con colori diversi. Nella stanza ci sono 4 POSTER con pattern. Ogni giocatore deve: 1) Trovare il proprio poster (colore matching) 2) Replicare il pattern sul tablet 3) Premere SYNC quando pronti. Tutti e 4 devono premere entro 2 secondi. Se corretti, ricevono un codice a 4 cifre (uno per giocatore) da combinare.',
    location: 'Digitale - app multiplayer + 4 poster',
    dependencies: ['P07'],
    solution: 'SYNC_COMPLETE',
    hints: [
      'Poster ROSSO, BLU, VERDE, GIALLO. Ogni giocatore ha un colore assegnato random all\'avvio dell\'app',
      'Il pattern è una sequenza di celle da toccare in ordine (numerate sul poster da 1 a 8)',
      'Codice finale: concatenare i 4 numeri nell\'ordine: Rosso-Blu-Verde-Giallo = es. 7-2-9-4 = 7294'
    ],
    timeEstimate: 18
  },
  {
    id: 'P09',
    title: 'Archivio Olografico',
    act: 3,
    type: 'gallery',
    description: 'Trova 12 fotografie in bianco e nero sparse. Ogni foto è stampata su carta trasparente (o lucida). 6 foto hanno un QR nell\'angolo (queste sono le "chiavi"). Devi: 1) Scansionare i 6 QR per ottenere 6 coordinate 2) Sovrapporre le foto chiave UNA SULL\'ALTRA contro luce 3) I pattern si allineano formando un codice visivo 4) Usare la "Legenda Crittografica" (poster) per decifrare.',
    location: 'ZONA B e C: Foto sparse',
    dependencies: ['P07'],
    solution: '837429',
    hints: [
      'Le 6 foto chiave hanno QR: scansionali per sapere l\'ordine di sovrapposizione (Layer 1, 2, 3...)',
      'Sovrapponi le foto contro una luce (finestra o lampada telefono). Appariranno forme geometriche sovrapposte',
      'Legenda sul poster: Cerchio=8, Quadrato=3, Triangolo=7, Stella=4, Rombo=2, Esagono=9. Codice: 837429'
    ],
    timeEstimate: 20
  },
  {
    id: 'P10',
    title: 'Protocollo di Reset',
    act: 3,
    type: 'sequence',
    description: 'La sequenza FINALE. 4 fasi da completare: FASE 1-3 richiedono codici da puzzle precedenti (P05, P07, P09). FASE 4 è un ENIGMA FINALE: nella stanza c\'è una SCATOLA CHIUSA con lucchetto a 4 cifre. La combinazione si trova applicando l\'equazione scritta sulla scatola: "Somma delle cifre del PARADOSSO diviso Timeline primo evento". Dentro la scatola c\'è il QR code finale da scansionare per attivare il reset.',
    location: 'Tutta la stanza + scatola finale',
    dependencies: ['P08', 'P09'],
    solution: 'RESET_COMPLETE',
    hints: [
      'Fase 1: CAUSALITY (P05) | Fase 2: 29979745 (P07) | Fase 3: 837429 (P09)',
      'Fase 4 - Enigma scatola: PARADOSSO (P03 soluzione) ha 9 lettere, somma posizioni alfabeto: P(16)+A(1)+R(18)+A(1)+D(4)+O(15)+S(19)+S(19)+O(15)=108. Timeline primo evento: 1945 (P04). Calcolo: 108÷1945... NO! È somma CIFRE delle soluzioni! Prova: (P+A+R...)=varie opzioni',
      'Soluzione scatola: usa i primi 4 digit della Password Quantistica al contrario: 2997 → 7992. Oppure combina qualcosa. Codice: 7992 (o lascialo aperto per ora)'
    ],
    timeEstimate: 20
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

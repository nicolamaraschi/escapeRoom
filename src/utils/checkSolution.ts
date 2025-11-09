import { PUZZLES } from '../data/puzzles';

/**
 * Normalizza l'input dell'utente per il confronto
 */
const normalizeInput = (input: string): string => {
  return input.trim().toUpperCase().replace(/\s+/g, '_');
};

/**
 * Controlla se la soluzione fornita dall'utente è corretta
 */
export const checkSolution = (puzzleId: string, userInput: string): boolean => {
  const puzzle = PUZZLES.find(p => p.id === puzzleId);
  if (!puzzle) {
    console.error(`Puzzle ${puzzleId} not found`);
    return false;
  }

  const normalized = normalizeInput(userInput);

  // Se la soluzione è un array, controlla se corrisponde a una delle opzioni
  if (Array.isArray(puzzle.solution)) {
    return puzzle.solution.some(sol => normalizeInput(sol) === normalized);
  }

  // Altrimenti confronta direttamente
  return normalizeInput(puzzle.solution) === normalized;
};

/**
 * Controlla parzialmente la soluzione (utile per feedback real-time)
 */
export const checkPartialSolution = (puzzleId: string, userInput: string): {
  correct: boolean;
  progress: number; // 0-100
} => {
  const puzzle = PUZZLES.find(p => p.id === puzzleId);
  if (!puzzle) {
    return { correct: false, progress: 0 };
  }

  const solution = Array.isArray(puzzle.solution) ? puzzle.solution[0] : puzzle.solution;
  const normalizedSolution = normalizeInput(solution);
  const normalizedInput = normalizeInput(userInput);

  const correct = normalizedSolution === normalizedInput;

  // Calcola il progresso basato sui caratteri corretti
  let matchingChars = 0;
  const minLength = Math.min(normalizedInput.length, normalizedSolution.length);

  for (let i = 0; i < minLength; i++) {
    if (normalizedInput[i] === normalizedSolution[i]) {
      matchingChars++;
    }
  }

  const progress = normalizedSolution.length > 0
    ? Math.floor((matchingChars / normalizedSolution.length) * 100)
    : 0;

  return { correct, progress };
};

/**
 * Verifica se un codice QR è valido per un puzzle
 */
export const validateQRCode = (puzzleId: string, qrData: string): {
  valid: boolean;
  fragment?: string;
} => {
  // Validazione specifica per puzzle QR
  if (puzzleId === 'P02') {
    const validFragments = ['INIT_', 'LOAD_', 'POWER_', 'CRONOS_', 'SYSTEM'];
    if (validFragments.includes(qrData)) {
      return { valid: true, fragment: qrData };
    }
  }

  if (puzzleId === 'P04') {
    const validDates = ['1945-07-16', '1952-11-01', '1957-10-04', '1962-10-16', '1967-03-15'];
    if (validDates.includes(qrData)) {
      return { valid: true, fragment: qrData };
    }
  }

  if (puzzleId === 'P10' && qrData === 'PARADOX_RESET_COMPLETE') {
    return { valid: true, fragment: qrData };
  }

  return { valid: false };
};

/**
 * Calcola il punteggio finale considerando tempo e hint
 */
export const calculateFinalScore = (
  baseScore: number,
  startTime: number,
  endTime: number
): number => {
  const elapsedMinutes = (endTime - startTime) / 60000;
  const targetTime = 120; // 2 ore

  // Bonus tempo: max 500 punti se finisci in metà tempo
  const timeBonus = Math.max(0, Math.floor((targetTime - elapsedMinutes) * 5));

  // Penalità hint già applicata durante il gioco
  const finalScore = baseScore + timeBonus;

  return Math.max(0, finalScore);
};

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Act, HintLevel, HintUsage } from '../types';

interface GameState {
  sessionId: string;
  playerName: string;
  startTime: number | null;
  endTime?: number;
  currentAct: Act;
  solvedPuzzles: string[];
  hintsUsed: HintUsage[];
  score: number;
  inventory: string[];

  // Actions
  setPlayerName: (name: string) => void;
  startGame: () => void;
  endGame: () => void;
  solvePuzzle: (puzzleId: string) => void;
  useHint: (puzzleId: string, level: HintLevel) => void;
  addToInventory: (item: string) => void;
  calculateScore: () => number;
  resetGame: () => void;
  isPuzzleUnlocked: (puzzleId: string, dependencies: string[]) => boolean;
  isPuzzleSolved: (puzzleId: string) => boolean;
  getHintsUsed: (puzzleId: string) => HintUsage[];
}

const initialState = {
  sessionId: '',
  playerName: '',
  startTime: null,
  endTime: undefined,
  currentAct: 1 as Act,
  solvedPuzzles: [],
  hintsUsed: [],
  score: 1000,
  inventory: [],
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayerName: (name: string) => set({ playerName: name }),

      startGame: () => set({
        startTime: Date.now(),
        sessionId: crypto.randomUUID()
      }),

      endGame: () => set({ endTime: Date.now() }),

      solvePuzzle: (puzzleId: string) => set((state) => {
        if (state.solvedPuzzles.includes(puzzleId)) {
          return state;
        }

        const newSolved = [...state.solvedPuzzles, puzzleId];
        let newScore = state.score + 100; // +100 per puzzle risolto

        // Check se sblocca nuovo atto
        let newAct = state.currentAct;
        if (newSolved.includes('P03') && state.currentAct === 1) {
          newAct = 2;
          newScore += 50; // Bonus per completamento atto
        }
        if (newSolved.includes('P07') && state.currentAct === 2) {
          newAct = 3;
          newScore += 50;
        }

        return {
          solvedPuzzles: newSolved,
          score: newScore,
          currentAct: newAct
        };
      }),

      useHint: (puzzleId: string, level: HintLevel) => set((state) => {
        const penalty = level === 3 ? 25 : level === 2 ? 15 : 10;
        return {
          hintsUsed: [
            ...state.hintsUsed,
            { puzzleId, level, timestamp: Date.now() }
          ],
          score: Math.max(0, state.score - penalty)
        };
      }),

      addToInventory: (item: string) => set((state) => ({
        inventory: [...state.inventory, item]
      })),

      calculateScore: () => {
        const state = get();
        if (!state.startTime) return state.score;

        const endTime = state.endTime || Date.now();
        const elapsed = (endTime - state.startTime) / 60000; // minuti
        const timeBonus = Math.max(0, Math.floor((120 - elapsed) * 5));

        return Math.round(state.score + timeBonus);
      },

      resetGame: () => set(initialState),

      isPuzzleUnlocked: (_puzzleId: string, dependencies: string[]) => {
        const state = get();

        // Se non ha dipendenze, è sbloccato
        if (dependencies.length === 0) return true;

        // Controlla se tutte le dipendenze sono risolte
        return dependencies.every(dep => state.solvedPuzzles.includes(dep));
      },

      isPuzzleSolved: (puzzleId: string) => {
        return get().solvedPuzzles.includes(puzzleId);
      },

      getHintsUsed: (puzzleId: string) => {
        return get().hintsUsed.filter(h => h.puzzleId === puzzleId);
      }
    }),
    {
      name: 'cronache-game-state',
      version: 1,
    }
  )
);

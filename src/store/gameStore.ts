import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ref, set as setFirebase, onValue, update } from 'firebase/database';
import { db } from '../firebase';
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

  // Sync state
  isSyncing: boolean;
  lastSyncTime: number | null;
  syncError: string | null;

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

  // Sync actions
  syncWithServer: () => void;
  setSyncState: (isSyncing: boolean, error?: string | null) => void;
}

const initialState = {
  sessionId: 'default-session', // Shared session for all players
  playerName: '',
  startTime: null,
  endTime: undefined,
  currentAct: 1 as Act,
  solvedPuzzles: [],
  hintsUsed: [],
  score: 1000,
  inventory: [],
  isSyncing: false,
  lastSyncTime: null,
  syncError: null,
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPlayerName: (name: string) => set({ playerName: name }),

      startGame: () => {
        const state = get();
        const startTime = Date.now();
        set({ startTime });

        // Initialize game in Firebase if not exists
        const gameRef = ref(db, `games/${state.sessionId}`);
        update(gameRef, {
          startTime,
          lastUpdated: Date.now()
        });
      },

      endGame: () => {
        const endTime = Date.now();
        set({ endTime });
        const state = get();
        const gameRef = ref(db, `games/${state.sessionId}`);
        update(gameRef, { endTime });
      },

      solvePuzzle: (puzzleId: string) => {
        const state = get();

        if (state.solvedPuzzles.includes(puzzleId)) {
          return;
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

        // Aggiorna stato locale
        set({
          solvedPuzzles: newSolved,
          score: newScore,
          currentAct: newAct
        });

        // Aggiorna Firebase
        const gameRef = ref(db, `games/${state.sessionId}`);
        update(gameRef, {
          solvedPuzzles: newSolved,
          score: newScore,
          currentAct: newAct,
          lastUpdated: Date.now()
        }).catch(error => {
          console.error('Error syncing puzzle to Firebase:', error);
        });
      },

      useHint: (puzzleId: string, level: HintLevel) => {
        const state = get();
        const penalty = level === 3 ? 25 : level === 2 ? 15 : 10;

        const newHints = [
          ...state.hintsUsed,
          { puzzleId, level, timestamp: Date.now() }
        ];
        const newScore = Math.max(0, state.score - penalty);

        set({
          hintsUsed: newHints,
          score: newScore
        });

        // Sync hints to Firebase
        const gameRef = ref(db, `games/${state.sessionId}`);
        update(gameRef, {
          hintsUsed: newHints,
          score: newScore,
          lastUpdated: Date.now()
        });
      },

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

      resetGame: () => {
        set(initialState);
        // Reset Firebase as well
        const gameRef = ref(db, `games/${initialState.sessionId}`);
        setFirebase(gameRef, {
          ...initialState,
          lastUpdated: Date.now()
        });
      },

      isPuzzleUnlocked: (_puzzleId: string, dependencies: string[]) => {
        const state = get();
        if (dependencies.length === 0) return true;
        return dependencies.every(dep => state.solvedPuzzles.includes(dep));
      },

      isPuzzleSolved: (puzzleId: string) => {
        return get().solvedPuzzles.includes(puzzleId);
      },

      getHintsUsed: (puzzleId: string) => {
        return get().hintsUsed.filter(h => h.puzzleId === puzzleId);
      },

      // Sincronizzazione Realtime con Firebase
      syncWithServer: () => {
        const state = get();
        if (state.isSyncing) return;

        set({ isSyncing: true });
        const gameRef = ref(db, `games/${state.sessionId}`);

        onValue(gameRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            set({
              solvedPuzzles: data.solvedPuzzles || [],
              currentAct: data.currentAct || 1,
              score: data.score || 1000,
              hintsUsed: data.hintsUsed || [],
              startTime: data.startTime || null,
              endTime: data.endTime,
              isSyncing: false,
              lastSyncTime: Date.now(),
              syncError: null,
            });
          } else {
            // If no data exists, initialize it
            setFirebase(gameRef, {
              ...initialState,
              lastUpdated: Date.now()
            });
          }
        }, (error) => {
          console.error('Firebase sync error:', error);
          set({
            isSyncing: false,
            syncError: error.message
          });
        });
      },

      setSyncState: (isSyncing: boolean, error: string | null = null) => {
        set({ isSyncing, syncError: error });
      }
    }),
    {
      name: 'cronache-game-state',
      version: 1,
    }
  )
);


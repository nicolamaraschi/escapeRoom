export type PuzzleType =
  | 'code-input'
  | 'qr-scan'
  | 'text-input'
  | 'timeline'
  | 'audio'
  | 'grid'
  | 'calculator'
  | 'sync'
  | 'gallery'
  | 'sequence';

export type PuzzleStatus = 'locked' | 'unlocked' | 'solved';

export type Act = 1 | 2 | 3;

export type HintLevel = 1 | 2 | 3;

export interface Puzzle {
  id: string;
  title: string;
  act: Act;
  type: PuzzleType;
  description: string;
  location: string;
  dependencies: string[];
  solution: string | string[];
  hints: [string, string, string];
  timeEstimate: number;
}

export interface HintUsage {
  puzzleId: string;
  level: HintLevel;
  timestamp: number;
}

export interface GameSession {
  sessionId: string;
  playerName: string;
  startTime: number | null;
  endTime?: number;
  currentAct: Act;
  solvedPuzzles: string[];
  hintsUsed: HintUsage[];
  score: number;
  inventory: string[];
}

export interface Event {
  id: string;
  date: string;
  location: string;
  description?: string;
}

export interface AudioTrack {
  id: string;
  url: string;
  correctSpeed: number;
  reverse?: boolean;
}

export interface Photo {
  id: string;
  url: string;
  hiddenNumber?: string;
  critical?: boolean;
}

import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { HintLevel } from '../types';

interface HintButtonProps {
  puzzleId: string;
  hints: [string, string, string];
}

export const HintButton: React.FC<HintButtonProps> = ({ puzzleId, hints }) => {
  const [showHints, setShowHints] = useState(false);
  const { useHint, getHintsUsed } = useGameStore();

  const hintsUsed = getHintsUsed(puzzleId);
  const currentHintLevel = hintsUsed.length as 0 | 1 | 2 | 3;

  const handleUseHint = (level: HintLevel) => {
    if (level <= currentHintLevel) return; // Già usato

    const penalty = level === 3 ? 25 : level === 2 ? 15 : 10;

    if (window.confirm(`Vuoi usare un suggerimento di livello ${level}? Perderai ${penalty} punti.`)) {
      useHint(puzzleId, level);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setShowHints(!showHints)}
        className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
      >
        <span className="text-xl">💡</span>
        <span className="font-semibold">
          {showHints ? 'Nascondi suggerimenti' : 'Mostra suggerimenti'}
        </span>
      </button>

      {showHints && (
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((level) => {
            const isUsed = level <= currentHintLevel;
            const penalty = level === 3 ? 25 : level === 2 ? 15 : 10;

            return (
              <div
                key={level}
                className={`p-4 rounded-lg border ${
                  isUsed
                    ? 'border-primary bg-dark-2'
                    : 'border-gray-700 bg-dark opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-text-dim">
                    Suggerimento {level}/3
                  </span>
                  <span className="text-xs text-danger">-{penalty} punti</span>
                </div>

                {isUsed ? (
                  <p className="text-text-main">{hints[level - 1]}</p>
                ) : (
                  <button
                    onClick={() => handleUseHint(level as HintLevel)}
                    className="w-full py-2 px-4 bg-secondary hover:bg-primary hover:text-dark text-white rounded-lg transition-all active:scale-95"
                  >
                    Usa questo suggerimento
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

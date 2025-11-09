import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { STORY } from '../data/story';

export const Start: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setPlayerName, startGame } = useGameStore();

  const handleStart = () => {
    if (name.trim().length < 2) {
      alert('Inserisci un nome valido (almeno 2 caratteri)');
      return;
    }

    setPlayerName(name.trim());
    startGame();
    navigate('/briefing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gradient animate-pulse-glow">
            {STORY.title}
          </h1>
          <p className="text-xl text-text-dim">{STORY.subtitle}</p>
        </div>

        {/* Card */}
        <div className="card space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🕰️</div>
            <h2 className="text-2xl font-bold mb-2">Benvenuto, Agente</h2>
            <p className="text-text-dim">
              Ti stai per immergere in un'avventura temporale. Hai 120 minuti per
              risolvere il paradosso e salvare il continuum.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="playerName" className="block text-sm font-semibold mb-2">
                Nome Agente
              </label>
              <input
                id="playerName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                placeholder="Inserisci il tuo nome..."
                className="input w-full text-lg"
                autoFocus
              />
            </div>

            <button
              onClick={handleStart}
              disabled={name.trim().length < 2}
              className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Inizia Missione →
            </button>
          </div>

          {/* Info */}
          <div className="pt-6 border-t border-gray-700 space-y-3 text-sm text-text-dim">
            <div className="flex items-center gap-2">
              <span>⏱️</span>
              <span>Durata: 90-120 minuti</span>
            </div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>Giocatori: 1-4 (consigliato: 4)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🧩</span>
              <span>Puzzle: 10 (3 Atti)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💡</span>
              <span>Sistema di suggerimenti disponibile</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-text-dim">
          <p>Progetto Cronos • Classificazione: TOP SECRET</p>
        </div>
      </div>
    </div>
  );
};

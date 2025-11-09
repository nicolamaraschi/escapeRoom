import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { checkSolution } from '../utils/checkSolution';
import { CodeInput } from '../components/CodeInput';

export const P01CodeInput: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleComplete = (code: string) => {
    if (checkSolution('P01', code)) {
      setSuccess(true);
      setError(false);

      setTimeout(() => {
        solvePuzzle('P01');
        navigate('/dashboard');
      }, 2000);
    } else {
      setError(true);
      setSuccess(false);

      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🕐</div>
        <h2 className="text-2xl font-bold mb-4">Codice di Accesso Temporale</h2>
        <p className="text-text-dim max-w-2xl mx-auto">
          Sul foglio davanti a te ci sono 4 orologi disegnati. Ogni orologio mostra un'ora
          diversa e sopra ognuno ci sono delle stelline. Osserva attentamente e trova il
          codice a 6 cifre.
        </p>
      </div>

      <div className="bg-dark-2 p-6 rounded-lg border border-gray-700">
        <h3 className="font-bold mb-3 text-center">Istruzioni:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-text-dim">
          <li>Guarda il foglio con i 4 orologi sulla scrivania</li>
          <li>Ogni orologio ha delle stelline sopra (contale!)</li>
          <li>Moltiplica l'ora mostrata per il numero di stelle</li>
          <li>Inserisci i risultati in sequenza per formare il codice</li>
        </ol>
      </div>

      <div className={`transition-all ${success ? 'scale-105' : ''}`}>
        <CodeInput
          length={6}
          type="numeric"
          onComplete={handleComplete}
          placeholder="Inserisci il codice a 6 cifre"
        />
      </div>

      {error && (
        <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center animate-pulse">
          <span className="text-danger font-bold">❌ Codice errato! Riprova.</span>
        </div>
      )}

      {success && (
        <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center animate-pulse-glow">
          <span className="text-primary font-bold">✅ Accesso concesso! Caricamento...</span>
        </div>
      )}

      <div className="text-center text-xs text-text-dim">
        <p>💡 Suggerimento: Il codice ha 6 cifre numeriche</p>
      </div>
    </div>
  );
};

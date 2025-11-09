import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { checkSolution } from '../utils/checkSolution';

export const P03TextInput: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (checkSolution('P03', input)) {
      setSuccess(true);
      setError(false);

      setTimeout(() => {
        solvePuzzle('P03');
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
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-bold mb-4">Il Diario del Dr. Vance</h2>
        <p className="text-text-dim max-w-2xl mx-auto">
          Trova il diario sulla scrivania. Alcune pagine sono segnate con post-it colorati.
          In quelle pagine, alcune lettere sono evidenziate in giallo.
        </p>
      </div>

      <div className="bg-dark-2 p-6 rounded-lg border border-gray-700">
        <h3 className="font-bold mb-3 text-center">Come procedere:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-text-dim">
          <li>Trova il diario nella Zona A (scrivania)</li>
          <li>Guarda solo le pagine con i post-it colorati</li>
          <li>In ogni pagina segnata, alcune lettere sono evidenziate in giallo</li>
          <li>Leggi le lettere evidenziate in ordine di pagina</li>
          <li>Le lettere formano una parola - inseriscila qui sotto</li>
        </ol>
      </div>

      <div className="bg-dark p-6 rounded-lg border-2 border-dashed border-gray-700">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-sm text-text-dim">Parola nascosta nel diario</p>
        </div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Inserisci la parola..."
          className="input w-full text-center text-2xl font-bold tracking-widest"
          autoFocus
        />

        <button
          onClick={handleSubmit}
          disabled={input.length === 0}
          className="btn-primary w-full mt-4 disabled:opacity-50"
        >
          Conferma
        </button>
      </div>

      {error && (
        <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center animate-pulse">
          <span className="text-danger font-bold">❌ Parola errata! Rileggi attentamente il diario.</span>
        </div>
      )}

      {success && (
        <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center animate-pulse-glow">
          <span className="text-primary font-bold">✅ Esatto! La data dell'esperimento è stata svelata!</span>
        </div>
      )}

      <div className="text-center text-xs text-text-dim">
        <p>💡 Suggerimento: La parola è un mese in italiano (5 lettere)</p>
      </div>
    </div>
  );
};

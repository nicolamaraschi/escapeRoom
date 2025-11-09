import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useGameStore } from '../store/gameStore';
import { validateQRCode, checkSolution } from '../utils/checkSolution';

export const P02QRScanner: React.FC = () => {
  const navigate = useNavigate();
  const { solvePuzzle } = useGameStore();
  const [fragments, setFragments] = useState<string[]>([]);
  const [orderedFragments, setOrderedFragments] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const requiredFragments = ['INIT_', 'LOAD_', 'POWER_', 'CRONOS_', 'SYSTEM'];

  useEffect(() => {
    if (scanning) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        false
      );

      scanner.render(
        (decodedText) => {
          const validation = validateQRCode('P02', decodedText);
          if (validation.valid && validation.fragment) {
            if (!fragments.includes(validation.fragment)) {
              setFragments([...fragments, validation.fragment]);
              setError('');
            }
          } else {
            setError('QR code non valido per questo puzzle');
          }
          scanner.clear();
          setScanning(false);
        },
        () => {
          // Error callback - ignore
        }
      );

      return () => {
        scanner.clear().catch(console.error);
      };
    }
  }, [scanning, fragments]);

  const handleCheckOrder = () => {
    const sequence = orderedFragments.join('_');
    if (checkSolution('P02', sequence)) {
      setSuccess(true);
      setTimeout(() => {
        solvePuzzle('P02');
        navigate('/dashboard');
      }, 2000);
    } else {
      setError('Sequenza errata! Controlla l\'ordine dei frammenti.');
    }
  };

  const moveFragment = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...orderedFragments];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newOrder.length) {
      [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
      setOrderedFragments(newOrder);
    }
  };

  useEffect(() => {
    // Auto-add new fragments to ordered list
    fragments.forEach(frag => {
      if (!orderedFragments.includes(frag)) {
        setOrderedFragments([...orderedFragments, frag]);
      }
    });
  }, [fragments]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-4">Protocollo di Boot</h2>
        <p className="text-text-dim max-w-2xl mx-auto">
          Trova i 5 documenti nella zona Laboratorio. Ogni documento ha un QR code nascosto
          che contiene un frammento. Scansionali tutti e riordinali nella sequenza corretta.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-dark-2 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">Frammenti trovati:</span>
          <span className="text-primary font-mono">{fragments.length}/5</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {requiredFragments.map(frag => (
            <span
              key={frag}
              className={`px-3 py-1 rounded font-mono text-sm ${
                fragments.includes(frag)
                  ? 'bg-primary text-dark'
                  : 'bg-gray-700 text-text-dim'
              }`}
            >
              {fragments.includes(frag) ? frag : '???'}
            </span>
          ))}
        </div>
      </div>

      {/* Scanner */}
      {!scanning && fragments.length < 5 && (
        <button
          onClick={() => setScanning(true)}
          className="btn-primary w-full py-4 flex items-center justify-center gap-2"
        >
          <span className="text-2xl">📷</span>
          <span>Scansiona QR Code</span>
        </button>
      )}

      {scanning && (
        <div>
          <div id="qr-reader" className="rounded-lg overflow-hidden"></div>
          <button
            onClick={() => setScanning(false)}
            className="btn-danger w-full mt-4"
          >
            Annulla Scansione
          </button>
        </div>
      )}

      {/* Ordering */}
      {fragments.length === 5 && !success && (
        <div className="space-y-4">
          <h3 className="font-bold text-center">Riordina i frammenti:</h3>
          <p className="text-sm text-text-dim text-center">
            Pensa alla sequenza di avvio di un computer
          </p>

          <div className="space-y-2">
            {orderedFragments.map((frag, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-dark-2 p-3 rounded-lg border border-gray-700"
              >
                <span className="text-text-dim font-mono text-sm w-8">{index + 1}.</span>
                <span className="flex-1 font-mono font-bold text-primary">{frag}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveFragment(index, 'up')}
                    disabled={index === 0}
                    className="px-3 py-1 bg-secondary text-white rounded disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveFragment(index, 'down')}
                    disabled={index === orderedFragments.length - 1}
                    className="px-3 py-1 bg-secondary text-white rounded disabled:opacity-30"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleCheckOrder}
            className="btn-primary w-full py-4"
          >
            Conferma Sequenza
          </button>
        </div>
      )}

      {error && (
        <div className="bg-danger bg-opacity-20 border border-danger rounded-lg p-4 text-center">
          <span className="text-danger font-bold">❌ {error}</span>
        </div>
      )}

      {success && (
        <div className="bg-primary bg-opacity-20 border border-primary rounded-lg p-4 text-center animate-pulse-glow">
          <span className="text-primary font-bold">✅ Protocollo di boot completato!</span>
        </div>
      )}
    </div>
  );
};

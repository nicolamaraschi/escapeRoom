import { useState } from 'react';
import { useGameStore } from '../store/gameStore';

export const SyncButton = () => {
  const [message, setMessage] = useState('');
  const { syncWithServer, isSyncing, syncError } = useGameStore();

  const handleSync = () => {
    setMessage('Sincronizzazione...');
    syncWithServer();

    // Feedback temporaneo
    setTimeout(() => {
      if (!syncError) {
        setMessage('Sincronizzato!');
        setTimeout(() => setMessage(''), 2000);
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {(message || syncError) && (
        <div className={`p-2 rounded mb-2 text-xs max-w-xs ${syncError ? 'bg-red-900 text-white' : 'bg-dark-2 text-text-main'}`}>
          {syncError || message}
        </div>
      )}
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className={`p-3 rounded-full shadow-lg text-white ${isSyncing ? 'bg-gray-500' : 'bg-secondary hover:bg-primary'}`}
        title="Sincronizza con Firebase"
      >
        {isSyncing ? '⏳' : '🔄'}
      </button>
    </div>
  );
};

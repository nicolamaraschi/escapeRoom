import { useState } from 'react';

// Usa sia localhost che l'IP - proverà prima localhost e poi l'IP se fallisce
const LOCALHOST_URL = 'http://localhost:3000';
const NETWORK_URL = 'http://192.168.1.80:3000';  // Modifica con il tuo IP

export const SyncButton = () => {
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState('');

  const fetchWithFallback = async (endpoint: string) => {
    try {
      // Prima prova localhost
      const localResponse = await fetch(`${LOCALHOST_URL}${endpoint}`, {
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      });
      
      if (localResponse.ok) {
        return localResponse;
      }
    } catch (error) {
      console.log('Local fetch failed, trying network IP...');
    }
    
    // Se localhost fallisce, prova l'IP di rete
    return fetch(`${NETWORK_URL}${endpoint}`, {
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    });
  };

  const handleSync = async () => {
    setSyncing(true);
    setMessage('Sincronizzazione...');
    
    try {
      console.log('Trying to sync with server...');
      
      // Prima verifichiamo se il server è attivo
      try {
        const pingResponse = await fetchWithFallback('/ping');
        const pingData = await pingResponse.json();
        console.log('Server ping successful:', pingData);
      } catch (error) {
        console.error('Ping failed:', error);
        setMessage('Server non raggiungibile');
        setSyncing(false);
        return;
      }
      
      // Ora proviamo a ottenere lo stato dal server
      const response = await fetchWithFallback('/game-state');
      console.log('Server response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Errore nella risposta: ${response.status}`);
      }
      
      const serverState = await response.json();
      console.log('Server state:', serverState);
      
      // Salva lo stato nel localStorage
      localStorage.setItem('cronache-game-state', JSON.stringify({
        state: {
          currentAct: serverState.currentAct || 1,
          solvedPuzzles: serverState.solvedPuzzles || [],
          score: serverState.score || 1000
        }
      }));
      
      setMessage('Sincronizzato! Ricarico...');
      // Ricarica la pagina per applicare le modifiche
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Error in sync:', error);
      setMessage(`Errore: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setSyncing(false);
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4">
      {message && (
        <div className="bg-dark-2 p-2 rounded mb-2 text-xs text-text-main max-w-xs">
          {message}
        </div>
      )}
      <button
        onClick={handleSync}
        disabled={syncing}
        className="p-3 bg-secondary hover:bg-primary text-white rounded-full shadow-lg"
        title="Sincronizza con il server"
      >
        {syncing ? '⏳' : '🔄'}
      </button>
    </div>
  );
};

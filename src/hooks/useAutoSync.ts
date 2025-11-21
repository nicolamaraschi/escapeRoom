import { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';

/**
 * Hook per sincronizzazione automatica con il server
 * Esegue polling ogni 5 secondi quando il gioco è attivo
 */
export const useAutoSync = (enabled: boolean = true) => {
    const { syncWithServer, startTime } = useGameStore();

    useEffect(() => {
        // Non sincronizzare se non abilitato o se il gioco non è iniziato
        if (!enabled || !startTime) {
            return;
        }

        // Sync iniziale immediato
        syncWithServer();

        // Sync iniziale immediato (Firebase onValue gestirà gli aggiornamenti successivi)
        syncWithServer();

        // Nessun polling necessario con Firebase Realtime Database
    }, [enabled, startTime, syncWithServer]);
};

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

        // Polling ogni 5 secondi
        const interval = setInterval(() => {
            syncWithServer();
        }, 5000);

        // Cleanup quando il componente viene smontato
        return () => {
            clearInterval(interval);
        };
    }, [enabled, startTime, syncWithServer]);
};

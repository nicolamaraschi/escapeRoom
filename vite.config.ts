// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Questo sostituirà tutte le chiamate a crypto.randomUUID con questa funzione
    'crypto.randomUUID': 'generatePolyfillUUID',
  },
  // Aggiungiamo uno script globale che definisce la funzione di fallback
  server: {
    port: 5173,
    host: true, // Abilita l'accesso da rete locale
  },
});
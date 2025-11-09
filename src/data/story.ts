export const STORY = {
  title: 'CRONACHE DELL\'OSSERVATORIO TEMPORALE',
  subtitle: 'Versione DIY - Budget ZERO',

  briefing: {
    title: 'Briefing Iniziale',
    content: `**Data**: 15 Marzo 1967
**Luogo**: Osservatorio Temporale Omega - Livello -4
**Classificazione**: TOP SECRET - OCCHI DEL PROGETTO SOLO

Agente,

Sei stato scelto per una missione di importanza critica. L'Osservatorio Temporale Omega, il nostro impianto di ricerca più avanzato sulla manipolazione del continuum spazio-temporale, ha smesso di rispondere alle comunicazioni 72 ore fa.

L'ultimo messaggio ricevuto dal Dr. Julian Vance, direttore del progetto, conteneva una sola parola: **"PARADOSSO"**.

Il tuo obiettivo è semplice ma vitale:
1. Accedi ai sistemi dell'Osservatorio
2. Scopri cosa è successo al Dr. Vance e al suo team
3. **Impedisci il collasso del continuum temporale**

Il laboratorio è bloccato in uno stato di "loop temporale". Ogni sistema richiede codici di accesso che dovrai trovare tra i documenti e gli esperimenti del Dr. Vance.

**Tempo disponibile**: 120 minuti prima che l'anomalia diventi irreversibile.

*Il destino di innumerevoli timeline dipende da te.*

**— Progetto Cronos, Comando Centrale**`
  },

  actIntros: {
    1: {
      title: 'ATTO I: Il Laboratorio Silenzioso',
      content: `Entri nel laboratorio del Dr. Vance. L'aria è densa, quasi vibra. Luci di emergenza proiettano ombre lunghe su documenti sparsi, orologi fermati allo stesso istante, apparecchiature scientifiche ancora ronzanti di energia.

Sulla scrivania, un computer vintage mostra una schermata di login. Accanto, il diario personale di Vance è aperto su una data specifica: Marzo 1967.

*Qualcosa è andato terribilmente storto qui.*

**Obiettivo**: Accedi ai sistemi di base del laboratorio.`
    },
    2: {
      title: 'ATTO II: L\'Osservazione',
      content: `I sistemi si riattivano con un ronzio. Monitor accendono mostrando coordinate geografiche, registrazioni audio distorte, e una mappa del mondo costellata di eventi.

Il computer rivela frammenti del "Test Omega" - l'esperimento che avrebbe dovuto permettere di osservare il passato senza alterarlo. Ma qualcosa è andato storto.

Le coordinate indicano 5 punti nel globo. 5 eventi storici. Tutti collegati.

**Obiettivo**: Ricostruisci la sequenza degli eventi che hanno portato al paradosso.`
    },
    3: {
      title: 'ATTO III: Il Nucleo',
      content: `La verità si svela. Il Dr. Vance non ha solo osservato il passato. Ha provato a *cambiarlo*.

Nel nucleo dell'Osservatorio, i dispositivi temporali sono ancora attivi, intrappolati in un loop. La sincronizzazione è corrotta. Le timeline si sovrappongono.

Un archivio olografico mostra le ultime ore del team. Vance registra un messaggio finale: *"Se state leggendo questo, c'è ancora una possibilità. Il protocollo di reset..."*

**Obiettivo**: Attiva il Protocollo di Reset prima che sia troppo tardi.`
    }
  },

  ending: {
    success: {
      title: 'RESET COMPLETATO',
      content: `Il countdown raggiunge lo zero.

Un'onda di energia attraversa il laboratorio. I dispositivi temporali si spengono uno alla volta. Le luci tornano normali. L'aria... torna a respirare.

Sul monitor principale appare un messaggio:

**PARADOSSO TEMPORALE RISOLTO**
**CONTINUUM STABILIZZATO**
**PROTOCOLLO OMEGA: TERMINATO**

Nel silenzio che segue, trovi un ultimo documento sulla scrivania di Vance. Una lettera:

*"A chi verrà dopo di me,*

*Ho imparato una lezione che nessuna equazione avrebbe potuto insegnarmi: il tempo non è un fiume da deviare, ma un oceano da rispettare.*

*Il Test Omega è fallito non per limiti tecnologici, ma per arroganza umana. Ho cercato di cambiare eventi che ritenevo errori della storia. Ma ogni cambiamento creava paradossi più grandi.*

*Se state leggendo questo, avete resettato il loop. Le timeline sono salve. Il mondo continuerà a esistere, ignaro di quanto vicino siamo stati al collasso.*

*Non ripetete il mio errore. Alcuni segreti del tempo devono rimanere tali.*

*— Dr. Julian Vance, 14 Marzo 1967"*

Il laboratorio ora è silenzioso. Sicuro. La missione è compiuta.

**Ma nel buio, un piccolo LED rosso lampeggia ancora...**`,
      timeBonus: 'Bonus tempo: +{bonus} punti',
      score: 'Punteggio finale: {score} punti'
    },
    failure: {
      title: 'TEMPO SCADUTO',
      content: `Il countdown raggiunge lo zero.

Ma questa volta, non c'è stata attivazione del protocollo.

Le luci tremolano. L'anomalia temporale si espande. Nell'ultimo istante di lucidità, capisci cosa sta succedendo: il laboratorio sta collassando in se stesso, trascinandoti attraverso innumerevoli timeline sovrapposte.

L'ultima cosa che vedi è il volto del Dr. Vance su un monitor, in loop infinito, che ripete all'infinito: *"Paradosso... paradosso... paradosso..."*

**GAME OVER**

*Ma il tempo è strano. Forse, in un'altra timeline, ce l'avete fatta...*`
    }
  },

  hints: {
    general: 'Ricorda: ogni dettaglio nel laboratorio ha uno scopo. Osserva attentamente.',
    time: 'Il tempo stringe. Usa i suggerimenti se sei bloccato più di 10 minuti.',
    teamwork: 'Alcuni puzzle richiedono che tutti lavoriate insieme. Comunicate!'
  }
};

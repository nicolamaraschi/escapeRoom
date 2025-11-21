import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDBXokErTI7ROwlmNOL9mPcuHcO8gm06x0",
    authDomain: "escape-room-party-nicola.firebaseapp.com",
    databaseURL: "https://escape-room-party-nicola-default-rtdb.firebaseio.com",
    projectId: "escape-room-party-nicola",
    storageBucket: "escape-room-party-nicola.firebasestorage.app",
    messagingSenderId: "788939611072",
    appId: "1:788939611072:web:a59e2093f9a015aa4d8625"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyALzPgBvYxTy1QyLc3jg1gK6nCLvr9IlxA",
    authDomain: "agrotec-115.firebaseapp.com",
    databaseURL: "https://agrotec-115-default-rtdb.firebaseio.com",
    projectId: "agrotec-115",
    storageBucket: "agrotec-115.firebasestorage.app",
    messagingSenderId: "1023377188405",
    appId: "1:1023377188405:web:7fd90b390d56421705737c",
    measurementId: "G-KKFCLMRZEG"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços necessários
export const auth = getAuth(app);
export const database = getDatabase(app); // Adicionado o serviço de Realtime Database

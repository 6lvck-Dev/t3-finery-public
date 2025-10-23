// firebase-config.js - Firebase Configuration (Modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";
import { getFunctions } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-functions.js";
import { enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDM34_DH_miBhSoURg0bbYgnFXt3JpzXVw",
    authDomain: "t3-finery.firebaseapp.com",
    projectId: "t3-finery",
    storageBucket: "t3-finery.firebasestorage.app",
    messagingSenderId: "175402125261",
    appId: "1:175402125261:web:859e32582a2b6e25fee684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
    console.log('Firestore persistence failed:', err);
});

// Export for use in other files
window.firebaseApp = app;
window.firebaseAuth = auth;
window.firebaseDB = db;
window.firebaseStorage = storage;
window.firebaseFunctions = functions;

console.log('Firebase initialized successfully with Modular SDK');

// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, serverTimestamp, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyB5h0YsVNYpapBsGCLiFZb9zNM-e59i5SU",
    authDomain: "review-joki.firebaseapp.com",
    projectId: "review-joki",
    storageBucket: "review-joki.appspot.com",
    messagingSenderId: "560413000000",
    appId: "1:560413000000:web:xxxxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, collection, getDocs, addDoc, query, orderBy, serverTimestamp, deleteDoc, doc, onSnapshot, storage, ref, uploadBytes, getDownloadURL };

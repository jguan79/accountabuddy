import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCUQnedgZE0A2drHfv0SiW9k0YjPOAA8IU",
    authDomain: "accountabuddy-aram1.firebaseapp.com",
    projectId: "accountabuddy-aram1",
    storageBucket: "accountabuddy-aram1.firebasestorage.app",
    messagingSenderId: "1006900548091",
    appId: "1:1006900548091:android:1d58d4af5bb32b28b4fb5e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const functions = getFunctions(app);
const firestore = getFirestore(app);

export { app, auth, functions, firestore };

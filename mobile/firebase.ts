import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

/* Dummy Values. Change this when we are ready to deploy so that we can connect to real project (backend). */
const firebaseConfig = {
    apiKey: "fake-api-key",
    authDomain: "localhost",
    projectId: "demo-project",
    storageBucket: "demo-project.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:dummy",
};

const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001); /* local dev only */

const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, "localhost", 8080); /* local dev only */

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099"); /* local dev only */

export { app, functions, firestore, auth };

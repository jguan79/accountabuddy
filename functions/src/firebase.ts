import * as admin from "firebase-admin";

// Initialize the Firebase app (only once)
if (!admin.apps.length) {
    admin.initializeApp();
}

// Export the Firestore database reference
export const db = admin.firestore();

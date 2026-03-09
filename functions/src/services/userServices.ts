import { User } from "../models/User";
import { db } from "../firebase";

/**
 * Services function to add user to database.
 *
 * Receives a user object and adds it to the firestore DB.
 * @param user - The user object to add
 * @returns The newly created user object including its ID
 */

export async function createUserInDb(
    user: User,
): Promise<User & { id: string }> {
    // Add user to DB
    const docRef = await db.collection("users").add(user);

    // Return the created user object including the generated ID
    return { ...user, id: docRef.id };
}

/**
 * Service function to query a user in the database.
 *
 * Searches the Firestore "users" collection for a document
 * matching the provided username and password.
 *
 * @param {string} username - Username to search for
 * @param {string} password - Password to match
 *
 * @returns {Promise<object | null>} The matching user object including its ID if found, otherwise null
 */

export async function queryUserInDb(username: string, password: string) {
    const snapshot = await db
        .collection("users")
        .where("username", "==", username)
        .where("password", "==", password)
        .get();

    // If no user found return null
    if (snapshot.empty) {
        return null;
    }

    // Return first matching user
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
}

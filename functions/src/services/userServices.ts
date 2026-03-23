import { User } from "../models/User";
import { db as clientDb } from "../firebase";
import type { Firestore } from "firebase-admin/firestore";

/**
 * Services function to add user to database.
 *
 * @param user - User object
 * @param writeDb - optional admin Firestore to bypass rules
 */
export async function createUserInDb(
    user: User,
    writeDb?: Firestore,
): Promise<User & { id: string }> {
    const writeRef = writeDb
        ? writeDb.collection("users")
        : clientDb.collection("users");

    const docRef = await writeRef.add(user);

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
export async function queryUserInDb(
    username: string,
    password: string,
): Promise<(User & { id: string }) | null> {
    const snapshot = await clientDb
        .collection("users")
        .where("username", "==", username)
        .where("password", "==", password)
        .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data() as User;

    return { id: doc.id, ...data };
}

/**
 * Service function to search users by partial username.
 *
 * @param usernamePart - Partial username to search for
 * @param excludeUserId - Optional ID of the current user to exclude from results
 * @returns {Promise<(User & { id: string })[]>} - Array of users matching the query
 */
export async function queryUsersByUsername(
    usernamePart: string,
    excludeUserId?: string,
): Promise<(Omit<User, "password"> & { id: string })[]> {
    const snapshot = await clientDb.collection("users").get();

    const users: (Omit<User, "password"> & { id: string })[] = [];

    snapshot.docs.forEach((doc) => {
        const data = doc.data() as User;
        const id = doc.id;

        if (excludeUserId && id === excludeUserId) return;

        if (data.username.toLowerCase().includes(usernamePart.toLowerCase())) {
            const { password, ...safeData } = data;
            users.push({ id, ...safeData });
        }
    });

    return users;
}

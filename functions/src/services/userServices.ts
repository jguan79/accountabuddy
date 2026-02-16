import { User } from "../models/User";
import { db } from "../firebase";

/**
 * Services function to add user to database.
 *
 * Receives a user object and adds it to the firestore DB.
 * @param user - The user object to add
 * @returns The newly created user object including its ID
 */

export async function createUserInDb(user: User): Promise<User> {
    // Add user to the DB
    const docRef = await db.collection("users").add(user);

    // Return the created user object including the generated ID
    return { ...user, id: docRef.id };
}

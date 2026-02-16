import { User } from "../models/User";
import { db } from "../firebase";

/**
 * Adds a new user to the database.
 * @param user - The user object to add
 * @returns The newly created user including its ID
 */

export async function createUserInDb(user: User): Promise<User> {
    // Add user to the DB
    const docRef = await db.collection("users").add(user);

    // Return the created user object including the generated ID
    return { ...user, id: docRef.id };
}

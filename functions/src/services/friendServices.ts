import { db } from "../firebase";
import type { Friend } from "../models/Friend";

/**
 * Get all friends for a user.
 *
 * @param userId - The ID of the user
 * @returns {Promise<Friend[]>} - Array of friends with userId and username
 */
export async function getFriendsForUser(userId: string): Promise<Friend[]> {
    const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("friends")
        .get();

    return snapshot.docs.map((doc) => doc.data() as Friend);
}

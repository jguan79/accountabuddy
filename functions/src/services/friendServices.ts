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

/**
 * Add a friend to a user's friends subcollection.
 * Adds a document with the friend's id and username under
 * users/{userId}/friends/{friendId}.
 *
 * @param userId - ID of the user who is adding a friend
 * @param friendId - ID of the friend to add
 */
export async function addFriendForUser(
    userId: string,
    friendId: string,
): Promise<void> {
    // lookup friend user document to get their username
    const friendDoc = await db.collection("users").doc(friendId).get();
    if (!friendDoc.exists) {
        throw new Error("Friend user not found");
    }

    const friendData = friendDoc.data() as any;
    const friendRecord: Friend = {
        userId: friendId,
        username: friendData.username,
    };

    // write into current user's friends subcollection
    await db
        .collection("users")
        .doc(userId)
        .collection("friends")
        .doc(friendId)
        .set(friendRecord, { merge: true });
}

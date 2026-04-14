import { db } from "../firebase";
import type { Friend } from "../models/Friend";

/**
 * Retrivies all friends for given user.
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
 * Add a friend to a user's friends subcollection in Firestore.
 *
 * It will retrieve the friend's username, create a friend records, and store the record under users/{userId}/friends/{friendId}.
 *
 * @param userId - ID of the user who is adding a friend
 * @param friendId - ID of the user to be added as a friend.
 */
export async function addFriendForUser(
    userId: string,
    friendId: string,
): Promise<void> {
    // Lookup friend user document to get their username
    const friendDoc = await db.collection("users").doc(friendId).get();
    if (!friendDoc.exists) {
        throw new Error("Friend user not found");
    }

    const friendData = friendDoc.data() as any;
    const friendRecord: Friend = {
        userId: friendId,
        username: friendData.username,
    };

    // Store friend record in user's friends subcollection
    await db
        .collection("users")
        .doc(userId)
        .collection("friends")
        .doc(friendId)
        .set(friendRecord, { merge: true });
}

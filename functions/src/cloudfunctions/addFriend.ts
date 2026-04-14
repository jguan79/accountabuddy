import { onCall } from "firebase-functions/v2/https";
import { addFriendForUser } from "../services/friendServices";

/**
 * Cloud function to add a friend for a user.
 *
 * Receives { userId, friendId } from the frontend
 *
 * @param {object} req.data - Input object from the frontend
 * @param req.data.userId - UserID received
 * @param req.data.friendId - friendID received
 *
 * @returns {Promise<{ success: boolean }>} Success when friend is added.
 *
 */

const addFriend = onCall(async (req) => {
    const userId = req.data.userId;
    const friendId = req.data.friendId;

    if (!userId || !friendId) {
        throw new Error("Missing userId or friendId");
    }

    await addFriendForUser(userId, friendId);
    return { success: true };
});

export { addFriend };

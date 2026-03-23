import { onCall } from "firebase-functions/v2/https";
import { addFriendForUser } from "../services/friendServices";

/**
 * Cloud function to add a friend for a user.
 * Expects { userId, friendId } in req.data
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

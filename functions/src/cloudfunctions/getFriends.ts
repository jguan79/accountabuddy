// functions/getFriends.ts
import { onCall } from "firebase-functions/v2/https";
import { getFriendsForUser } from "../services/friendServices";
import type { Friend } from "../models/Friend";

/**
 * Cloud function to get all friends of a user.
 *
 * @param req.data.userId - ID of the user
 * @returns {Promise<Friend[]>} - Array of friends with userId and username
 */
const getFriends = onCall(async (req) => {
    const userId = req.data.userId;
    const friends = await getFriendsForUser(userId);
    return friends;
});

export { getFriends };

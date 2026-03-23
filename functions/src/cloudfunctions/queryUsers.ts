import { onCall } from "firebase-functions/v2/https";
import { queryUsersByUsername } from "../services/userServices";
// import type { User } from "../models/User";

/**
 * Cloud function to query users by username.
 *
 * @param {object} req.data - Input from the frontend
 * @param {string} req.data.usernamePart - Partial username to search for
 * @param {string} req.data.currentUserId - OPTIONAL ID of current user to exclude
 *
 * @returns {Promise<(User & { id: string })[]>} - List of matching users
 */
const queryUsers = onCall(async (req) => {
    const usernamePart = req.data.usernamePart;
    const currentUserId = req.data.currentUserId;

    const users = await queryUsersByUsername(usernamePart, currentUserId);
    return users;
});

export { queryUsers };

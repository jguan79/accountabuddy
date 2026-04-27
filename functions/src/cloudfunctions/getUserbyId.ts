import { onCall } from "firebase-functions/v2/https";
import { getUserByIdFromDb } from "../services/userServices";

/**
 * Cloud function to fetch a user by ID
 *
 * @param req.data.userId - ID of the user
 * @returns User object
 */
const getUserById = onCall(async (req) => {
    const { userId } = req.data;

    if (!userId) {
        throw new Error("userId is required.");
    }

    const user = await getUserByIdFromDb(userId);

    return user;
});

export { getUserById };

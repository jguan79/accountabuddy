import { onCall } from "firebase-functions/v2/https";
import { updateUserInDb } from "../services/userServices";

/**
 * Cloud function to update a user profile.
 *
 * Receives a userId and a partial updates object from the frontend,
 * applies the updates to the user document in the database,
 * and returns the updated user object.
 *
 * @param {object} req.data - Input object from the frontend
 * @param {string} req.data.userId - ID of the user to update
 * @param {object} req.data.updates - Partial user fields to update
 * @param {string} [req.data.updates.username] - (Optional) Updated username
 * @param {string} [req.data.updates.firstName] - (Optional) Updated first name
 * @param {string} [req.data.updates.lastName] - (Optional) Updated last name
 *
 * @returns {Promise<User & { id: string }>} The updated user object
 */

const updateUser = onCall(async (req) => {
    const { userId, updates } = req.data;

    if (!userId) {
        throw new Error("userId is required.");
    }

    if (!updates) {
        throw new Error("updates object is required.");
    }

    const updatedUser = await updateUserInDb(userId, updates);

    return updatedUser;
});

export { updateUser };

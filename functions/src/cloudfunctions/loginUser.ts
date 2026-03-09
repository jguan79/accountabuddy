import { onCall } from "firebase-functions/v2/https";
import { queryUserInDb } from "../services/userServices";
import { User } from "../models/User";

/**
 * Cloud function to login a user.
 *
 * Receives a username and password from the frontend, checks the database
 * for a matching user, and returns the user object if credentials are valid.
 *
 * @param {object} req.data - Input object from the frontend
 * @param {string} req.data.username - Username entered by the user
 * @param {string} req.data.password - Password entered by the user
 *
 * @returns {Promise<User & { id: string }>} The user object including its ID if found, otherwise null
 */

const loginUser = onCall(
    async (req): Promise<(User & { id: string }) | null> => {
        const username = req.data.username;
        const password = req.data.password;

        // Call service to find matching user
        const user = await queryUserInDb(username, password);

        // Return user if found
        return user;
    },
);

export { loginUser };

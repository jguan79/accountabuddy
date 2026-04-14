import * as admin from "firebase-admin";
import { onCall } from "firebase-functions/v2/https";
import { User } from "../models/User";
import { createUserInDb } from "../services/userServices";

// Initialize admin once
if (!admin.apps.length) {
    admin.initializeApp();
}
const adminDb = admin.firestore();

/**
 * Cloud function to create a new user.
 *
 * Receives a user object from the frontend, calls the service to add it to the DB, and returns the created user including the database generated ID.
 *
 * @param {object} req.data - The input object from the frontend
 * @param {string} req.data.firstName - First name of the user
 * @param {string} req.data.lastName - Last name of the user
 * @param {string} req.data.username - Username for login
 * @param {string} req.data.password - Password for login
 *
 * @returns {Promise<User & { id: string }>} The newly created user object including the ID
 */
const createUser = onCall(
    {
        invoker: "public",
    },
    async (req) => {
        console.log("FUNCTION HIT");
        console.log("DATA:", req.data);

        try {
            const user: User = {
                firstName: req.data.firstName,
                lastName: req.data.lastName,
                username: req.data.username,
                password: req.data.password,
            };

            const newUser = await createUserInDb(user, adminDb);

            console.log("SUCCESS:", newUser);

            return newUser;
        } catch (err) {
            console.error("ERROR INSIDE FUNCTION:", err);
            throw err;
        }
    },
);

export { createUser };

import { onCall } from "firebase-functions/v2/https";
import { User } from "../models/User";
import { queryUserInDb } from "../services/userServices";

// Add JSDOC Later
const createUser = onCall(async (req) => {
    username = req.data.username;
    password = req.data.password;

    // Call service function to match username and password to user.
    const user = await queryUserInDb(username, password);

    // Return the user if found
    return user;
});

export { user };

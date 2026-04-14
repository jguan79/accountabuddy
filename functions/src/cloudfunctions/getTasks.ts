import { onCall } from "firebase-functions/v2/https";
import { getTasksForUser } from "../services/taskServices";

/**
 * Cloud function to get all tasks for a user.
 *
 * @param req.data.userId - ID of the user whose tasks to fetch
 * @returns {Promise<(Task & { id: string })[]>} - Array of tasks including IDs
 */
const getTasks = onCall(async (req) => {
    const userId = req.data.userId;
    const tasks = await getTasksForUser(userId);
    return tasks;
});

export { getTasks };

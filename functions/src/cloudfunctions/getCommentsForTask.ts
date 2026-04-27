import { onCall } from "firebase-functions/v2/https";
import { getCommentsForTaskFromDb } from "../services/commentServices";

/**
 * Cloud function to fetch all comments for a specific task
 *
 * @param req.data.taskId - ID of the task to fetch comments for
 * @returns Array of comment objects for the task
 */
const getCommentsForTask = onCall(async (req) => {
    const { taskId } = req.data;

    if (!taskId) {
        throw new Error("taskId is required.");
    }

    const comments = await getCommentsForTaskFromDb(taskId);

    return comments;
});

export { getCommentsForTask };

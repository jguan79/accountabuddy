import { onCall } from "firebase-functions/v2/https";
import { deleteTaskInDb } from "../services/taskServices";

/**
 * Cloud function to delete a task.
 *
 * Receives userId and taskId from the frontend, deletes the task, and returns a success message.
 *
 * @param {object} req.data - Input from the frontend
 * @param {string} req.data.userId - ID of the user who owns the task
 * @param {string} req.data.taskId - ID of the task to delete
 *
 * @returns {Promise<{ success: boolean }>} - Indicates whether the deletion was successful
 */
const deleteTask = onCall(async (req) => {
    const { userId, taskId } = req.data;

    await deleteTaskInDb(userId, taskId);

    return { success: true };
});

export { deleteTask };

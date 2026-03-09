import { onCall } from "firebase-functions/v2/https";
import { updateTaskInDb } from "../services/taskServices";

/**
 * Cloud function to update a task.
 *
 * @param {object} req.data - Input from the frontend
 * @param {string} req.data.userId - ID of the user who owns the task
 * @param {string} req.data.taskId - ID of the task to update
 * @param {Partial<Task>} req.data.updates - An object with task fields to update
 *
 * @returns {Promise<Task & { id: string }>} - The updated task
 */
const updateTask = onCall(async (req) => {
    const { userId, taskId, updates } = req.data;

    const updatedTask = await updateTaskInDb(userId, taskId, updates);

    return updatedTask;
});

export { updateTask };

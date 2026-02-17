import { onCall } from "firebase-functions/v2/https";
import { Task } from "../models/Task";
import { createTaskInDb } from "../services/taskServices";

/**
 * Cloud function to create a new task.
 *
 * Receives a task object from the frontend, calls the service to add it to the DB,
 * and returns the created task including the database generated ID.
 *
 * @param {object} req.data - The input object from the frontend
 * @param {string} req.data.subjectTitle - Subject/category of the task
 * @param {string} req.data.dueDate - Due date of the task
 * @param {string} req.data.color - Color associated with the task. CHANGE DATA TYPE
 * @param {string} req.data.description - Description of the task
 * @param {string} req.data.userId - ID of the user who owns the task
 *
 * @returns {Promise<Task>} The newly created task object including the ID
 */

const createTask = onCall(async (req) => {
    // Build the task object
    const task: Task = {
        id: "",
        subjectTitle: req.data.subjectTitle,
        dueDate: req.data.dueDate,
        color: req.data.color,
        description: req.data.description,
        userId: req.data.userId,
    };

    // Call service function to create task in the DB
    const newTask = await createTaskInDb(task);

    // Return the created task
    return newTask;
});

export { createTask };

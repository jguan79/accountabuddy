import { Task } from "../models/Task";
import { db } from "../firebase";

/**
 * Services function to add task to database.
 *
 * Receives a task object and adds it to the firestore DB.
 * @param task - The task object to add
 * @returns The newly created task object including its ID
 */
export async function createTaskInDb(
    task: Task,
): Promise<Task & { id: string }> {
    const docRef = await db
        .collection("users")
        .doc(task.userId) // get the user doc
        .collection("tasks") // subcollection under user
        .add(task);

    return { ...task, id: docRef.id };
}

/**
 * Service function to get all tasks for a user.
 *
 * @param userId - The ID of the user whose tasks we want
 * @returns {Promise<(Task & { id: string })[]>} - Array of tasks with IDs
 */
export async function getTasksForUser(
    userId: string,
): Promise<(Task & { id: string })[]> {
    const snapshot = await db
        .collection("users")
        .doc(userId)
        .collection("tasks")
        .get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Task),
    }));
}

/**
 * Service function to delete a task by its ID for a specific user.
 *
 * @param userId - ID of the user who owns the task
 * @param taskId - ID of the task to delete
 * @returns {Promise<void>} - Resolves when the task is deleted
 */
export async function deleteTaskInDb(
    userId: string,
    taskId: string,
): Promise<void> {
    await db
        .collection("users")
        .doc(userId)
        .collection("tasks")
        .doc(taskId)
        .delete();
}

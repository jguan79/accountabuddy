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

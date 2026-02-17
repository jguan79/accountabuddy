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

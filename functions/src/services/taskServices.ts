import { Task } from "../models/Task";
import { db } from "../firebase";

/**
 * Services function to add task to database.
 *
 * Receives a task object and adds it to the firestore DB.
 * @param task - The task object to add
 * @returns The newly created task object including its ID
 */

export async function createTaskInDb(task: Task): Promise<Task> {
    // Add user to the DB
    const docRef = await db.collection("tasks").add(task);

    // Return the created user object including the generated ID
    return { ...task, id: docRef.id };
}

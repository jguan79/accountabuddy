import { db } from "../firebase";

/**
 * Add a comment to a task
 */
export async function createCommentInDb(data: {
    taskId: string;
    userId: string;
    text: string;
}) {
    const createdAt = new Date().toISOString();

    const commentRef = await db.collection("comments").add({
        taskId: data.taskId,
        userId: data.userId,
        text: data.text,
        createdAt,
    });

    return {
        id: commentRef.id,
        taskId: data.taskId,
        userId: data.userId,
        text: data.text,
        createdAt,
    };
}

/**
 * Get all comments for a specific task
 */
export async function getCommentsForTaskFromDb(taskId: string) {
    const snapshot = await db
        .collection("comments")
        .where("taskId", "==", taskId)
        .get();

    return snapshot.docs
        .map((doc) => ({
            id: doc.id,
            ...(doc.data() as any),
        }))
        .sort(
            (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
        );
}

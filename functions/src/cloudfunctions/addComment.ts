import { onCall } from "firebase-functions/v2/https";
import { createCommentInDb } from "../services/commentServices";

/**
 * Cloud function to add a comment to a task
 *
 * @param req.data.taskId - ID of the task being commented on
 * @param req.data.userId - ID of the user creating the comment
 * @param req.data.text - Text content of the comment
 * @returns Comment object with its generated ID
 */
const addComment = onCall(async (req) => {
    const { taskId, userId, text } = req.data;

    if (!taskId || !userId || !text) {
        throw new Error("taskId, userId, and text are required.");
    }

    const comment = await createCommentInDb({
        taskId,
        userId,
        text,
    });

    return comment;
});

export { addComment };

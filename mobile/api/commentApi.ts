import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { Comment } from "../frontend_models/Comment";

export async function addComment(taskId: string, userId: string, text: string) {
    const callable = httpsCallable(functions, "addComment");
    const response = await callable({
        taskId,
        userId,
        text,
    });

    return response.data as Comment;
}

export async function getCommentsForTask(taskId: string) {
    const callable = httpsCallable(functions, "getCommentsForTask");
    const response = await callable({ taskId });

    return response.data as Comment[];
}

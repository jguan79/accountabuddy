import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";
import { Task } from "../frontend_models/Task";

export async function getTasks(userId: string) {
    const getTasksCallable = httpsCallable(functions, "getTasks");
    const response = await getTasksCallable({ userId });
    return response.data as (Task & { id: string })[];
}

export async function createTask(data: Task) {
    const createTaskCallable = httpsCallable(functions, "createTask");
    const response = await createTaskCallable(data);
    return response.data;
}

export async function updateTask(data: Task) {
    const updateTaskCallable = httpsCallable(functions, "updateTask");
    const response = await updateTaskCallable(data);
    return response.data;
}

export async function deleteTask(userId: string, taskId: string) {
    const deleteTaskCallable = httpsCallable(functions, "deleteTask");
    await deleteTaskCallable({ userId, taskId });
}

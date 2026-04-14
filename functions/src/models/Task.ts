export type TaskStatus = "in_progress" | "completed" | "overdue";

export interface Task {
    subjectTitle: string;
    dueDate: string;
    color: string;
    description: string;
    userId: string;
    status: TaskStatus;
}

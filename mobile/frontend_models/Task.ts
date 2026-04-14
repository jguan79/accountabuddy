export type TaskStatus = "in progress" | "completed" | "overdue";

export interface Task {
    id: string;
    subjectTitle: string;
    description?: string;
    dueDate?: string;
    color?: string;
    status?: TaskStatus;
}

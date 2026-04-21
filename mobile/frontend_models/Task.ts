export type TaskStatus = "in_progress" | "completed" | "overdue";

export interface Task {
    id: string; // Firestore ID (for frontend purposes only)
    userId: string;
    subjectTitle: string;
    description?: string;
    dueDate?: string;
    color?: string;
    status?: TaskStatus;
}

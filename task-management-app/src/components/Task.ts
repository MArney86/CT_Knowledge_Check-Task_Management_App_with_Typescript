// TypeScript interface for a Task object in a task management application
export interface Task {
    id: number;
    name: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'failed';
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date; // Optional field for tasks that have a due date
}
import type { Task } from './Task';

export type TaskActions = 
    | { type: 'UPDATE_STATUS'; payload: [number, 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'failed'] }
    | { type: 'UPDATE_PRIORITY'; payload: [number, 'low' | 'medium' | 'high'] }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'REMOVE_TASK'; payload: number }
    | { type: 'CLEAR_TASKS' }
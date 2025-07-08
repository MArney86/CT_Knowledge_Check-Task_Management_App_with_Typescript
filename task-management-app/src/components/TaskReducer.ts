import type { TaskActions } from './TaskActions';
import type { TaskState } from './TaskState';
import { saveTasksToStorage } from '../utils/taskStorage';

const TaskReducer = (state: TaskState, action: TaskActions, userId?: string): TaskState => {
    let newState: TaskState = {tasks: []};
    
    switch (action.type) {
        case 'UPDATE_STATUS':
            newState = {...state, tasks: state.tasks.map(item => item.id === action.payload[0] ? {...item, status: action.payload[1], updatedAt: new Date()} : item)};
            break;
        case 'REMOVE_TASK':
            newState = {...state, tasks: state.tasks.filter(item => item.id !== action.payload)};
            break;
        case 'UPDATE_PRIORITY':
            newState = {...state, tasks: state.tasks.map(item => item.id === action.payload[0] ? {...item, priority: action.payload[1], updatedAt: new Date()} : item)};
            break;
        case 'UPDATE_TASK':
            newState = {...state, tasks: state.tasks.map(item => item.id === action.payload.id ? {...item, ...action.payload, updatedAt: new Date()} : item)};
            break;
        case 'ADD_TASK':
            // Generate unique ID
            const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map(task => task.id)) + 1 : 1;
            action.payload.id = newId;
            action.payload.createdAt = new Date();
            action.payload.updatedAt = new Date();
            newState = {...state, tasks: [...state.tasks, action.payload]};
            break;
        case 'CLEAR_TASKS':
            newState = {...state, tasks: []};
            break;
        default:
            newState = state;
    }
    
    // Save to localStorage if userId is provided
    if (userId && newState !== state) {
        saveTasksToStorage(newState.tasks, userId);
    }
    
    return newState;
}

export default TaskReducer;
import type { TaskActions } from './TaskActions';
import type { TaskState } from './TaskState';

const taskReducer = (state: TaskState, action: TaskActions): TaskState => {
    switch (action.type) {
        case 'UPDATE_STATUS':
            return {...state, tasks: state.tasks.map(item => item.id === action.payload[0] ? {...item, status: action.payload[1], updatedAt: new Date()} : item)};
        case 'REMOVE_TASK':
            return {...state, tasks: state.tasks.filter(item => item.id !== action.payload)};
        case 'UPDATE_PRIORITY':
            return {...state, tasks: state.tasks.map(item => item.id === action.payload[0] ? {...item, priority: action.payload[1], updatedAt: new Date()} : item)};
        case 'UPDATE_TASK':
            return {...state, tasks: state.tasks.map(item => item.id === action.payload.id ? {...item, ...action.payload, updatedAt: new Date()} : item)};
        case 'ADD_TASK':
            if (state.tasks.filter(task => task.id === state.tasks.length + 1)) {// Ensure unique ID
                action.payload.id = state.tasks[state.tasks.length - 1].id + 1; // Assign new ID based on last task's ID
            } else {
                action.payload.id = state.tasks.length + 1; // Assign new ID based on length
            }
            action.payload.createdAt = new Date();
            action.payload.updatedAt = new Date();
            return {...state, tasks: [...state.tasks, action.payload]};
        case 'CLEAR_TASKS':
            return {...state, tasks: []};
        default:
            return state;
    }
}

export default taskReducer;
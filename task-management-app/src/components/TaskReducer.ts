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
            // Generate unique ID
            const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map(task => task.id)) + 1 : 1;
            action.payload.id = newId;
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
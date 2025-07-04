import React from 'react';
import type { TaskState } from '../components/TaskState';

// Define the user object type
interface User {
  name: string;
  isLoggedIn: boolean;
  tasks: TaskState;
}

// Define the context value type
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

// Create context with proper typing and default values
const UserContext = React.createContext<UserContextType>({
  user: { name: '', isLoggedIn: false, tasks: { tasks: [] } },
  setUser: () => {}
});

export default UserContext;
export type { User };
import React, { useState, useContext, useEffect } from 'react';
import type { TaskState } from '../components/TaskState';
import type { TaskActions } from '../components/TaskActions';
import TaskReducer from '../components/TaskReducer';

// Define the user object type
interface User {
  name: string;
  email: string;
  picture: string;
  tasks: TaskState;
}

// Define the context value type
interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  dispatchTasks: (action: TaskActions) => void;
}

// Create context with proper typing and default values
const UserContext = React.createContext<UserContextType>({
  user: { name: '', email: '', picture: '', tasks: { tasks: [] } },
  setUser: () => {
    console.warn('setUser called outside of UserContextProvider');
  },
  dispatchTasks: () => {
    console.warn('dispatchTasks called outside of UserContextProvider');
  }
});

// Provider component that manages user state
export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    picture: '',
    tasks: { tasks: [] }
  });

  
  // Create a dispatch function that uses the task reducer to update user state
  const dispatchTasksWithUser = (action: TaskActions) => {
    setUser(prevUser => {
      const newTasks = TaskReducer(prevUser.tasks, action, prevUser.email);
      const updatedUser = {
        ...prevUser,
        tasks: newTasks
      };
      
      return updatedUser;
    });
  };

  // Load tasks from localStorage when user changes
  useEffect(() => {
    if (user) {
      console.log('User context updated', user);
    }
  }, [user]);

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser: setUser, dispatchTasks: dispatchTasksWithUser } },
    children
  );
};

// Custom hook for using the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export default UserContext;
export type { User, UserContextType };
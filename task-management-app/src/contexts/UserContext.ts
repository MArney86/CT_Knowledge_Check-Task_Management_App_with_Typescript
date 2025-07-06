import React, { useState, useContext } from 'react';
import type { TaskState } from '../components/TaskState';

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
}

// Create context with proper typing and default values
const UserContext = React.createContext<UserContextType>({
  user: { name: '', email: '', picture: '', tasks: { tasks: [] } },
  setUser: () => {
    console.warn('setUser called outside of UserContextProvider');
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

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser } },
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
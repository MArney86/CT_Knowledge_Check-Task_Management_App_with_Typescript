import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import HomePage from './components/HomePage'
import NavigationBar from './components/NavigationBar'
import TaskLayout from './components/TasksLayout'
import Profile from './components/Profile'
import AuthenticationGuard from './AuthenticationGuard'
import { UserContextProvider, useUserContext } from './contexts/UserContext'
import { SelectionContextProvider } from './contexts/SelectionContext'

// Component to handle loading example tasks after authentication
function AppContent() {
  const { isAuthenticated, user: authUser } = useAuth0();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (isAuthenticated && authUser && user.tasks.tasks.length === 0) {
      // Load example tasks only if user is authenticated and no tasks exist
      const exampleTasks = [
        {
          id: 1,
          name: 'Setup Development Environment',
          description: 'Install Node.js, VS Code, and configure the project workspace for the task management application.',
          status: 'completed' as const,
          priority: 'high' as const,
          createdAt: new Date('2024-01-15T09:00:00'),
          updatedAt: new Date('2024-01-15T10:30:00'),
          dueDate: new Date('2024-01-16T17:00:00')
        },
        {
          id: 2,
          name: 'Implement Authentication',
          description: 'Integrate Auth0 authentication service to handle user login, logout, and secure route protection.',
          status: 'in-progress' as const,
          priority: 'high' as const,
          createdAt: new Date('2024-01-16T10:00:00'),
          updatedAt: new Date('2024-01-17T14:20:00'),
          dueDate: new Date('2024-01-20T17:00:00')
        },
        {
          id: 3,
          name: 'Design UI Components',
          description: 'Create reusable UI components with Windows 98/2000 aesthetic including buttons, forms, and modals.',
          status: 'pending' as const,
          priority: 'medium' as const,
          createdAt: new Date('2024-01-17T11:00:00'),
          updatedAt: new Date('2024-01-17T11:00:00'),
          dueDate: new Date('2024-01-25T17:00:00')
        },
        {
          id: 4,
          name: 'Write Unit Tests',
          description: 'Create comprehensive unit tests for all components and utility functions to ensure code quality.',
          status: 'pending' as const,
          priority: 'low' as const,
          createdAt: new Date('2024-01-18T09:00:00'),
          updatedAt: new Date('2024-01-18T09:00:00')
        },
        {
          id: 5,
          name: 'Deploy to Production',
          description: 'Configure CI/CD pipeline and deploy the application to a production environment.',
          status: 'failed' as const,
          priority: 'medium' as const,
          createdAt: new Date('2024-01-10T08:00:00'),
          updatedAt: new Date('2024-01-12T16:45:00'),
          dueDate: new Date('2024-01-30T17:00:00')
        }
      ];

      // Update user with example tasks and auth info
      setUser({
        name: authUser.name || authUser.nickname || 'User',
        email: authUser.email || '',
        picture: authUser.picture || '',
        tasks: { tasks: exampleTasks }
      });
    }
  }, [isAuthenticated, authUser, user.tasks.tasks.length, setUser]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<AuthenticationGuard component={Profile} />} />
      <Route path="/tasks/*" element={
        <SelectionContextProvider>
          <AuthenticationGuard component={TaskLayout} />
        </SelectionContextProvider>} />
    </Routes>
  );
}

export default function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <NavigationBar />
      <UserContextProvider>
        <AppContent />
      </UserContextProvider>
    </>
  )
}
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect} from 'react'
import HomePage from './components/HomePage'
import NavigationBar from './components/NavigationBar'
import TaskLayout from './components/TasksLayout'
import Profile from './components/Profile'
import AuthenticationGuard from './AuthenticationGuard'
import { UserContextProvider, useUserContext } from './contexts/UserContext'
import { SelectionContextProvider } from './contexts/SelectionContext'
import { loadTasksFromStorage } from './utils/taskStorage'

// Component to handle loading example tasks after authentication
function AppContent() {
  const { isAuthenticated, user: authUser } = useAuth0();
  const { setUser } = useUserContext();

  useEffect(() => {
    if (isAuthenticated && authUser) {
      const userId = authUser.sub || authUser.email || 'unknown';
      
      // Try to load saved tasks from localStorage
      const savedTasks = loadTasksFromStorage(userId);
      
      // Use saved tasks or start with empty array
      const tasksToLoad = savedTasks || [];

      // Update user with tasks and auth info
      setUser({
        name: authUser.name || authUser.nickname || 'User',
        email: authUser.email || '',
        picture: authUser.picture || '',
        tasks: { tasks: tasksToLoad }
      });
    }
  }, []);

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
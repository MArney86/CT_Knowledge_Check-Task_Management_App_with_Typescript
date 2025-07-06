import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import HomePage from './components/HomePage'
import NavigationBar from './components/NavigationBar'
import TaskLayout from './components/TasksLayout'
import Profile from './components/Profile'
import AuthenticationGuard from './AuthenticationGuard'
import { UserContextProvider } from './contexts/UserContext'
import { SelectionContextProvider } from './contexts/SelectionContext'

export default function App() {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <NavigationBar />
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<AuthenticationGuard component={Profile} />} />
          <Route path="/tasks/*" element={
            <SelectionContextProvider>
              <AuthenticationGuard component={TaskLayout} />
            </SelectionContextProvider>} />
        </Routes>
      </UserContextProvider>
    </>
  )
}
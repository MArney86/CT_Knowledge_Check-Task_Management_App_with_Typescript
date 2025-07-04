import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import HomePage from './components/HomePage'
import NavigationBar from './components/NavigationBar'
import TaskLayout from './components/TaskLayout'

function App() {

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tasks/*" element={<TaskLayout />} />
      </Routes>
    </>
  )
}

export default App
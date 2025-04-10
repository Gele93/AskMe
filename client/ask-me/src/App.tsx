import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/sidebar'
import Sets from './pages/Sets'
import Questions from './pages/Questions'
import Profile from './pages/Profile'
import ProtectedRoute from './components/utilities/ProtectedRoute'
import CreateSet from './pages/CreateSet'
import InfoToast from './components/utilities/InfoToast'
import { ToastType } from './types/types'
import ManualSetCreate from './pages/ManualSetCreate'

function App() {

  const [isToast, setIsToast] = useState(false)
  const [toastText, setToastText] = useState("")
  const [toastType, setToastType] = useState(ToastType.Info)

  const useInfoToast = (text: string, type: ToastType) => {
    setToastType(type)
    setToastText(text)
    setIsToast(true)
    setTimeout(() => setIsToast(false), 8000);
  }
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path='/' element={<Sidebar />} >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard useInfoToast={useInfoToast} />
                </ProtectedRoute>
              } />
            <Route
              path="sets"
              element={
                <ProtectedRoute>
                  <Sets useInfoToast={useInfoToast} />
                </ProtectedRoute>
              } />
            <Route
              path="questions"
              element={
                <ProtectedRoute>
                  <Questions />
                </ProtectedRoute>
              } />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            <Route
              path="sets/create"
              element={
                <ProtectedRoute>
                  <CreateSet useInfoToast={useInfoToast} />
                </ProtectedRoute>
              } />
            <Route
              path="sets/create/manual"
              element={
                <ProtectedRoute>
                  <ManualSetCreate />
                </ProtectedRoute>
              } />
          </Route>
          <Route path="/home" element={<Landing />} />
        </Routes>
      </Router>
      <InfoToast toastText={toastText} isToast={isToast} setIsToast={setIsToast} toastType={toastType} />
    </div>
  )
}

export default App

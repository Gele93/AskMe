import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/sidebar'
import Sets from './pages/Sets'
import Questions from './pages/Questions'
import Profile from './pages/Profile'
import ProtectedRoute from './utils/ProtectedRoute'
import CreateSet from './pages/CreateSet'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Sidebar />} >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            <Route
              path="sets"
              element={
                <ProtectedRoute>
                  <Sets />
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
                  <CreateSet />
                </ProtectedRoute>
              } />

          </Route>
          <Route path="/home" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/sidebar'
import Sets from './pages/Sets'
import Questions from './pages/Questions'
import Profile from './pages/Profile'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Sidebar />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sets" element={<Sets />} />
            <Route path="questions" element={<Questions />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/home" element={<Landing />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import Sets from './pages/Sets'
import Questions from './pages/Questions'
import Profile from './pages/Profile'
import ProtectedRoute from './components/utilities/ProtectedRoute'
import CreateSet from './pages/CreateSet'
import InfoToast from './components/utilities/InfoToast'
import { LearnSetup, Priority, Set, SetToLearn, Theme, ThemeWithPriority, ToastType, User } from './types/types'
import ManualSetCreate from './pages/ManualSetCreate'
import Settings from './pages/Settings'
import PresetModal from './components/learn-this-components/PresetModal'
import { fetchGetSets } from './scripts/scripts'
import Learn from './pages/Learn'

function App() {

  const [user, setUser] = useState<User | null>(null)
  const [isToast, setIsToast] = useState<boolean>(false)
  const [toastText, setToastText] = useState<string>("")
  const [toastType, setToastType] = useState<ToastType>(ToastType.Info)
  const [isLearnThisPreset, setIsLearnThisPreset] = useState<boolean>(false)
  const [sets, setSets] = useState<Set[]>([])
  const [setToLearn, setSetToLearn] = useState<SetToLearn | null>(null)
  const [setup, setSetup] = useState<LearnSetup>({ questions: 1, goal: 100 })

  useEffect(() => {
    const userData: string | null = localStorage.getItem("user")
    if (userData) {
      const curUser: User = JSON.parse(userData)
      setUser(curUser)
    }
  }, [])

  const useInfoToast = (text: string, type: ToastType) => {
    setToastType(type)
    setToastText(text)
    setIsToast(true)
    setTimeout(() => setIsToast(false), 8000);
  }

  const openLearnThisPreset = (set: Set | null) => {
    setIsLearnThisPreset(true)

    if (set) {
      let themesWithPriority: ThemeWithPriority[] = set?.themes?.map(t => {
        return { ...t, priority: Priority.Normal }
      })
      let setWithPriority = { ...set, themes: themesWithPriority }
      setSetToLearn(setWithPriority)
    }
  }

  useEffect(() => {
    const getSets = async () => {
      const updatedSets = await fetchGetSets()
      setSets(updatedSets)
    }
    getSets()
  }, [])


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="learn"
            element={
              <ProtectedRoute>
                <Learn setToLearn={setToLearn} setup={setup} user={user} />
              </ProtectedRoute>
            } />
          <Route path='/' element={<Sidebar />} >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard useInfoToast={useInfoToast} openLearnThisPreset={openLearnThisPreset} user={user} />
                </ProtectedRoute>
              } />

            <Route
              path="sets"
              element={
                <ProtectedRoute>
                  <Sets useInfoToast={useInfoToast} openLearnThisPreset={openLearnThisPreset} sets={sets} setSets={setSets} />
                </ProtectedRoute>
              } />
            <Route
              path="questions"
              element={
                <ProtectedRoute>
                  <Questions openLearnThisPreset={openLearnThisPreset} />
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
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
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
          <Route path="/home" element={<Landing useInfoToast={useInfoToast} />} />
        </Routes>
        {isLearnThisPreset &&
          <PresetModal set={setToLearn} setSet={setSetToLearn} sets={sets} setIsLearnThisPreset={setIsLearnThisPreset} setSetup={setSetup} setup={setup} />}
      </Router>
      <InfoToast toastText={toastText} isToast={isToast} setIsToast={setIsToast} toastType={toastType} />
    </div>
  )
}

export default App

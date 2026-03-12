import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import ProjectList from './pages/ProjectList'
import DPRForm from './pages/DPRForm'

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dpr/:projectId"
          element={
            <ProtectedRoute>
              <DPRForm />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App

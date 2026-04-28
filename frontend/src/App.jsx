import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailsPage />} />
      
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Route>
    </Routes>
  )
}

export default App

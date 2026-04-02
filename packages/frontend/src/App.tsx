import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RootRedirect } from './components/auth/RootRedirect'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Feed from './pages/Feed'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<RootRedirect />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/feed'
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route path='/dashboard' element={<Navigate to='/feed' replace />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Feed from './pages/Feed'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
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

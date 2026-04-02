import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin'></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to='/feed' replace />
  }

  return <Navigate to='/login' replace />
}

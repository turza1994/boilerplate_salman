import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '@/lib/apiClient'
import { getAccessToken, setAccessToken, clearAllTokens } from '@/lib/auth'
import { AuthContextType, AuthState } from '@/types/auth'

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState)

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = getAccessToken()

        if (accessToken) {
          try {
            const response = await apiClient.get('/api/health')
            if (response.success) {
              // Try to restore user from localStorage
              const storedUser = localStorage.getItem('user')
              const user = storedUser ? JSON.parse(storedUser) : null
              setState((prev) => ({
                ...prev,
                user,
                accessToken,
                isAuthenticated: true,
                isLoading: false,
              }))
              return
            }
          } catch {
            try {
              const refreshed = await apiClient.refreshAccessToken()
              if (refreshed) {
                const newAccessToken = getAccessToken()
                if (newAccessToken) {
                  const storedUser = localStorage.getItem('user')
                  const user = storedUser ? JSON.parse(storedUser) : null
                  setState((prev) => ({
                    ...prev,
                    user,
                    accessToken: newAccessToken,
                    isAuthenticated: true,
                    isLoading: false,
                  }))
                  return
                }
              }
            } catch {
              // Refresh failed
            }
          }
        }

        clearAllTokens()
        localStorage.removeItem('user')
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
      } catch {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }))
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await apiClient.login({ email, password })

      if (response.success && response.data) {
        const { user, accessToken } = response.data

        setAccessToken(accessToken)
        localStorage.setItem('user', JSON.stringify(user))

        setState({
          user,
          accessToken,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = (): void => {
    clearAllTokens()
    localStorage.removeItem('user')
    setState({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    })
  }

  const refreshToken = async (): Promise<void> => {
    try {
      const refreshed = await apiClient.refreshAccessToken()
      if (refreshed) {
        const newAccessToken = getAccessToken()
        if (newAccessToken) {
          setState((prev) => ({
            ...prev,
            accessToken: newAccessToken,
          }))
        } else {
          throw new Error('Failed to get new access token')
        }
      } else {
        throw new Error('Token refresh failed')
      }
    } catch (error) {
      logout()
      throw error
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    refreshToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

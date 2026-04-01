export interface AuthState {
  user: User | null
  accessToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
}

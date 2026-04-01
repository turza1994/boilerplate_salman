export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    createdAt: string
  }
  accessToken: string
}

export interface SignupResponse {
  user: {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    createdAt: string
  }
  accessToken: string
}

export interface RefreshTokenRequest {
  refreshToken?: string
}

export interface RefreshTokenResponse {
  accessToken: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string
}

export interface ApiError {
  success: false
  message: string
  code?: string
}

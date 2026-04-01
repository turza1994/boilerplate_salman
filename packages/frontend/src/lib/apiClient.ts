import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/api'
import {
  Post,
  FeedResponse,
  Comment,
  Liker,
  CreatePostData,
  CreateCommentData,
} from '@/types/post'
import { getAccessToken, setAccessToken } from './auth'
import { addCSRFToHeaders, extractCSRFFromResponse } from './csrf'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    const accessToken = getAccessToken()
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    if (
      options.method &&
      ['POST', 'PUT', 'DELETE', 'PATCH'].includes(options.method.toUpperCase())
    ) {
      addCSRFToHeaders(headers)
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include',
    }

    try {
      const response = await fetch(url, config)
      const data: ApiResponse<T> = await response.json()

      extractCSRFFromResponse(response)

      if (response.status === 401 && !endpoint.includes('/refresh-token')) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          const newAccessToken = getAccessToken()
          if (newAccessToken) {
            headers['Authorization'] = `Bearer ${newAccessToken}`
            const retryResponse = await fetch(url, { ...config, headers })
            return retryResponse.json()
          }
        }
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  private async requestWithFile<T>(
    endpoint: string,
    formData: FormData,
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const headers: Record<string, string> = {}

    const accessToken = getAccessToken()
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    addCSRFToHeaders(headers)

    const config: RequestInit = {
      method: 'POST',
      headers,
      body: formData,
      credentials: 'include',
    }

    try {
      const response = await fetch(url, config)
      const data: ApiResponse<T> = await response.json()

      extractCSRFFromResponse(response)

      if (response.status === 401) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          const newAccessToken = getAccessToken()
          if (newAccessToken) {
            headers['Authorization'] = `Bearer ${newAccessToken}`
            const retryResponse = await fetch(url, { ...config, headers })
            return retryResponse.json()
          }
        }
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      addCSRFToHeaders(headers)

      const response = await fetch(`${this.baseURL}/api/auth/refresh-token`, {
        method: 'POST',
        headers,
        credentials: 'include',
      })

      if (response.ok) {
        const data: ApiResponse<RefreshTokenResponse> = await response.json()
        if (data.success && data.data?.accessToken) {
          setAccessToken(data.data.accessToken)
          extractCSRFFromResponse(response)
          return true
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
    }
    return false
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async signup(userData: SignupRequest): Promise<ApiResponse<SignupResponse>> {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // Post endpoints
  async getFeed(cursor?: number | null, limit = 10): Promise<ApiResponse<FeedResponse>> {
    const params = new URLSearchParams()
    if (cursor) params.set('cursor', String(cursor))
    params.set('limit', String(limit))
    return this.get<FeedResponse>(`/api/posts?${params.toString()}`)
  }

  async createPost(data: CreatePostData): Promise<ApiResponse<Post>> {
    return this.post<Post>('/api/posts', data)
  }

  async getPost(id: number): Promise<ApiResponse<Post>> {
    return this.get<Post>(`/api/posts/${id}`)
  }

  async updatePost(id: number, data: Partial<CreatePostData>): Promise<ApiResponse<Post>> {
    return this.put<Post>(`/api/posts/${id}`, data)
  }

  async deletePost(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.delete(`/api/posts/${id}`)
  }

  // Comment endpoints
  async getComments(postId: number): Promise<ApiResponse<Comment[]>> {
    return this.get<Comment[]>(`/api/posts/${postId}/comments`)
  }

  async createComment(postId: number, data: CreateCommentData): Promise<ApiResponse<Comment>> {
    return this.post<Comment>(`/api/posts/${postId}/comments`, data)
  }

  async deleteComment(id: number): Promise<ApiResponse<{ message: string }>> {
    return this.delete(`/api/comments/${id}`)
  }

  async replyToComment(commentId: number, data: { content: string }): Promise<ApiResponse<Comment>> {
    return this.post<Comment>(`/api/comments/${commentId}/reply`, data)
  }

  // Like endpoints
  async togglePostLike(postId: number): Promise<ApiResponse<{ liked: boolean }>> {
    return this.post<{ liked: boolean }>(`/api/posts/${postId}/like`, {})
  }

  async toggleCommentLike(commentId: number): Promise<ApiResponse<{ liked: boolean }>> {
    return this.post<{ liked: boolean }>(`/api/comments/${commentId}/like`, {})
  }

  async getPostLikers(postId: number): Promise<ApiResponse<Liker[]>> {
    return this.get<Liker[]>(`/api/posts/${postId}/likes`)
  }

  async getCommentLikers(commentId: number): Promise<ApiResponse<Liker[]>> {
    return this.get<Liker[]>(`/api/comments/${commentId}/likes`)
  }

  // Upload endpoint
  async uploadImage(file: File): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData()
    formData.append('image', file)
    return this.requestWithFile<{ url: string }>('/api/upload', formData)
  }

  // Generic methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()

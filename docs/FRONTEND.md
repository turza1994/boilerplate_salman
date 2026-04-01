# Frontend Development Guide

This document provides detailed guidelines for developing the React frontend application.

## 🏗️ Project Overview

The frontend is a React 19 application built with Vite, featuring:

- React 19 with functional components and hooks
- TypeScript with strict mode
- Vite 8 for fast development and build
- Tailwind CSS for styling
- shadcn/ui for consistent UI components
- React Router DOM for client-side routing
- React Hook Form for form handling
- Zod for schema validation
- JWT-based authentication

## 📁 File Structure

```
packages/frontend/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication-related components
│   │   ├── sections/    # Page sections (Hero, Features, etc.)
│   │   └── ui/          # shadcn/ui components
│   ├── contexts/        # React contexts (AuthContext)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and services
│   ├── pages/           # Page components (routes)
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global CSS styles
├── public/              # Static files served as-is
├── vite.config.js       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── eslint.config.js     # ESLint configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── .env.example         # Environment variables template
├── package.json         # Frontend dependencies and scripts
└── README.md            # Frontend-specific documentation
```

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format code with Prettier
# (Configured via lint:fix script)
```

## 🧩 Component Guidelines

### Component Types

1. **UI Components** (`src/components/ui/`): 
   - Primitive, reusable components (Button, Input, etc.)
   - Based on shadcn/ui primitives
   - Fully styled with Tailwind CSS

2. **Feature Components** (`src/components/`):
   - Domain-specific components (auth forms, section components)
   - Compose UI components
   - May contain business logic

3. **Page Components** (`src/pages/`):
   - Route-matched components
   - Handle data fetching and state management
   - Compose feature and UI components

4. **Layout Components**:
   - Not currently implemented as separate components
   - Layout handled within pages or App.tsx

### Component Structure

```typescript
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  title: string
  onSubmit: (data: { name: string }) => void
}

export const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Props and State

- Use TypeScript interfaces for props
- Prefer functional updates for state: `setState(prev => prev + 1)`
- Use useReducer for complex state logic
- Lift state up when needed, but avoid prop drilling
- Consider Context for truly global state

## 🎨 Styling Guidelines

### Tailwind CSS

- Use utility classes for styling
- Follow the Tailwind CSS JIT mode principles
- Use `@apply` sparingly in CSS files for complex reusable patterns
- Maintain consistency with existing spacing, typography, and color scales

### Custom CSS

- Component-specific styles in `src/components/[ComponentName].css`
- Global styles in `src/index.css`
- Avoid !important unless absolutely necessary
- Use CSS variables for theme-related values

### shadcn/ui

- Use shadcn/ui components as base for UI primitives
- Customize via Tailwind classes rather than modifying component source
- Follow shadcn/ui composition patterns
- Import from `@/components/ui/*`

## 🔌 API Integration

### API Client

Centralized API client in `src/lib/apiClient.ts`:

```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  withCredentials: true, // Important for cookies
})

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    return Promise.reject(error)
  }
)

export default apiClient
```

### Making Requests

```typescript
import apiClient from '@/lib/apiClient'

// GET request
const fetchData = async () => {
  const response = await apiClient.get('/api/endpoint')
  return response.data
}

// POST request
const submitData = async (data: FormData) => {
  const response = await apiClient.post('/api/endpoint', data)
  return response.data
}
```

### Error Handling

```typescript
try {
  const result = await apiClient.post('/endpoint', formData)
  // Handle success
} catch (error) {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'Request failed'
    setError(message)
  } else if (error.request) {
    // Request made but no response
    setError('Network error - please check your connection')
  } else {
    // Other errors
    setError('An unexpected error occurred')
  }
}
```

## 🔐 Authentication

### Auth Context

Global authentication state in `src/contexts/AuthContext.tsx`:

```typescript
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on load
    const checkSession = async () => {
      try {
        const response = await apiClient.get('/api/auth/me')
        setUser(response.data.user)
      } catch (error) {
        // No valid session
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/api/auth/login', credentials)
    setUser(response.data.user)
    localStorage.setItem('accessToken', response.data.accessToken)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('accessToken')
  }

  const value = { user, loading, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### Protected Routes

```typescript
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}
```

## 📝 Forms and Validation

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof schema>

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isLoading,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await apiClient.post('/api/auth/login', data)
      // Handle successful login
    } catch (error) {
      // Handle error
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email')}
        placeholder="Email"
        className={errors.email ? 'border-red-500' : ''}
      />
      {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className={errors.password ? 'border-red-500' : ''}
      />
      {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

## 🧭 Routing

### App Router

```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## 🪝 Custom Hooks

### useAuth Hook

```typescript
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### Custom Data Hooks

```typescript
import { useQuery, useMutation } from '@tanstack/react-query' // If implemented
// OR
import { useState, useCallback } from 'react'

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const response = await apiClient.get('/api/users')
      setUsers(response.data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  // In a real app, you'd use useEffect or react-query
  // useEffect(() => { fetchUsers() }, [fetchUsers])

  return { users, loading, error, refetch: fetchUsers }
}
```

## 🧪 Testing (To be implemented)

### Testing Strategy

When testing is implemented:

```bash
# Run frontend tests
npm run test --workspace=packages/frontend

# Run tests in watch mode
npm run test:watch --workspace=packages/frontend
```

### Testing Libraries

- React Testing Library for component tests
- Jest/Vitest for test runner
- Testing Library user-event for interactions
- MSW (Mock Service Worker) for API mocking

## 📱 Responsive Design

### Breakpoints

Follow Tailwind's default breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Mobile-First Approach

```typescript
// Mobile styles first, then override for larger screens
<div className="p-4 md:p-8 lg:p-12">
  {/* Content */}
</div>
```

## 🚀 Performance Optimization

### Code Splitting

Dynamic imports for route-based splitting:

```typescript
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('@/pages/Dashboard'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Other routes */}
      </Routes>
    </Suspense>
  )
}
```

### Memoization

```typescript
import { memo, useMemo, useCallback } from 'react'

// Memoize expensive calculations
const processedData = useMemo(() => {
  return expensiveCalculation(rawData)
}, [rawData])

// Memoize callback functions
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies])

// Memoize components
const MemoizedComponent = memo(({ data }) => {
  return <div>{data.value}</div>
})
```

### Image Optimization

- Use next/image equivalent when available
- Optimize image sizes before importing
- Use appropriate formats (WebP, AVIF)
- Lazy load offscreen images

## 🔧 Configuration

### Environment Variables

Vite loads variables prefixed with `VITE_`:

```
VITE_API_BASE_URL=http://localhost:5000
```

Access in code:
```typescript
import.meta.env.VITE_API_BASE_URL
```

### TypeScript

Strict TypeScript configuration in `tsconfig.json`:
- `strict`: true
- `noImplicitAny`: true
- `strictNullChecks`: true
- Path aliases: `@/*` maps to `./src/*`

### ESLint

Configuration in `eslint.config.js`:
- React hooks rules
- React refresh for fast refresh
- Browser globals
- No unused vars with capital letter exception

## 🚫 Absolute Prohibitions

- No class components (use functional components with hooks)
- No direct DOM manipulation in React components (use refs when necessary)
- No console.log in production (use proper logging)
- No mutable state mutations (use setState/updater functions)
- No blocking operations in render (keep render pure)
- No use of `any` types
- No neglecting accessibility (a11y) considerations
- No large bundles - use code splitting and lazy loading
- No direct window/document access in SSR-prone code
- No modifying shadcn/ui component source directly - use composition and Tailwind instead

## ✨ Best Practices

- Always prefer existing patterns over new ones
- Check similar files before implementing new features
- Use established utility functions from `@/lib/`
- Follow the established error handling patterns
- Keep components small and focused (single responsibility principle)
- Test component interactions and user flows
- Use TypeScript strictly throughout the codebase
- Maintain separation of concerns between UI, logic, and data
- Optimize re-renders with useMemo/useCallback when beneficial
- Follow React Compiler best practices (enabled in this project)
- Implement proper loading and error states for all async operations
- Ensure accessibility in all components (proper labels, keyboard navigation, etc.)
- Keep authentication tokens secure (HttpOnly cookies for refresh tokens)
- Validate all inputs both client-side and server-side
- Use atomic UI updates where possible
- Follow RESTful API conventions for endpoint design
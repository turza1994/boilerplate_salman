# Frontend AGENTS.md

This guide is for agentic coding agents working in this React + Vite frontend application.

## 🛠️ Development Commands

### Building & Running

```bash
npm run dev          # Start development server with HMR
npm run build        # Compile TypeScript and bundle for production
npm run preview      # Preview production build locally
npm run lint         # Check ESLint rules
npm run lint:fix     # Auto-fix ESLint issues
```

### Testing

```bash
# Note: Testing framework to be implemented
# Currently no test setup configured
```

## 📏 Code Style Guidelines

### Architecture Rules

- ✅ Use React 19 with functional components and hooks
- ✅ Component composition over inheritance
- ✅ Separation of concerns: UI components, logic hooks, services, contexts
- ✅ Use `@/` path aliases for internal imports (configured in tsconfig.json)

### TypeScript & Types

- Strict mode enabled - no implicit any, all strict checks on
- Always use type inference when possible
- Prefer `unknown` + parsing over `any` for runtime data
- Use exact types from API responses, avoid duplication
- No type assertions unless absolutely necessary
- Use nullish coalescing (`??`) and optional chaining (`?.`)

### Import Style

```typescript
// External libraries first
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Internal modules using @/ alias
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/apiClient'
import type { LoginFormData } from '@/types/auth'

// CSS imports
import './ComponentName.css'
```

### Component Structure

```typescript
// Functional component with props typing
interface Props {
  title: string
  onClick: () => void
}

export const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  // State and hooks
  const [count, setCount] = useState(0)
  
  // Event handlers
  const handleClick = () => {
    onClick()
    setCount(c => c + 1)
  }
  
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={handleClick}>Count: {count}</button>
    </div>
  )
}

// Custom hook pattern
export const useMyHook = (initialValue: number) => {
  const [value, setValue] = useState(initialValue)
  
  const increment = () => setValue(v => v + 1)
  const decrement = () => setValue(v => v - 1)
  
  return { value, increment, decrement }
}
```

### File Naming & Organization

- Files: camelCase for components, hooks, utils, types
- Components: PascalCase (Button.tsx, UserProfile.tsx)
- Hooks: camelCase with 'use' prefix (useAuth.ts, useApi.ts)
- Utilities: camelCase (apiClient.ts, validation.ts)
- Types: camelCase (auth.ts, api.ts) - exported types use PascalCase
- Contexts: camelCase with 'Context' suffix (AuthContext.tsx)
- Pages: PascalCase (Home.tsx, Dashboard.tsx, Login.tsx)
- UI components: PascalCase (Button.tsx, Input.tsx, Alert.tsx)

### Error Handling

```typescript
// Component error handling
try {
  const result = await apiClient.post('/endpoint', data)
  // Handle success
  setSuccess(true)
} catch (error) {
  const message = error instanceof Error ? error.message : 'Operation failed'
  setError(message)
  setIsLoading(false)
}

// Using React Error Boundaries (to be implemented)
// Currently using try/catch in event handlers and effects
```

### Validation

- Form validation using React Hook Form + Zod schemas
- Validate early, fail fast
- Sanitize user inputs before processing
- Use centralized validation utilities when possible

### Styling

- Tailwind CSS for utility-first styling
- shadcn/ui components for consistent UI primitives
- Custom CSS in component-specific CSS files
- Avoid inline styles unless for dynamic values
- Use tailwind-merge for conditional class combinations

### API Integration

- Centralized API client in `@/lib/apiClient.ts`
- Automatic token attachment for authenticated requests
- CSRF token handling for state-changing requests
- Error interception for consistent error handling
- Base URL configured via Vite environment variables

### State Management

- React Context for global state (AuthContext)
- React Query/TanStack Query for server state (to be implemented)
- Local component state with useState/useReducer
- Avoid prop drilling by combining context and hooks

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

## 📋 Common Tasks

### Adding New Component

1. Create component file in appropriate directory (`src/components/` or `src/components/ui/`)
2. Implement with proper TypeScript typing
3. Export as named export (default export only for pages/routes)
4. Add to barrel exports if appropriate
5. Import and use where needed
6. Follow existing styling patterns

### Adding New Page/Route

1. Create page component in `src/pages/`
2. Add route to `src/App.tsx` or route configuration
3. Implement data fetching in component or route loader
4. Handle loading and error states
5. Ensure proper SEO metadata if needed
6. Add to navigation if applicable

### Adding New API Integration

1. Define TypeScript types in `src/types/` if needed
2. Add method to `src/lib/apiClient.ts` or create new service file
3. Implement error handling and loading states
4. Use in components via hooks or direct calls
5. Add proper TypeScript typing for request/response

### Authentication Updates

1. Update `src/contexts/AuthContext.tsx` if context logic changes
2. Update `src/hooks/useAuth.ts` if custom hook changes
3. Update `src/lib/auth.ts` if utility functions change
4. Update API client if token handling changes
5. Update login/register forms if needed
6. Test complete authentication flow

## 🔧 Configuration Files

### Vite Configuration

- `vite.config.js` - Main Vite config
- `vite.config.ts` - TypeScript version (if used)
- `vite-env.d.ts` - Vite environment type declarations

### Tailwind Configuration

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS plugins configuration

### TypeScript Configuration

- `tsconfig.json` - Main TypeScript config with path aliases
- `tsconfig.node.json` - Node.js TypeScript config for Vite

### ESLint Configuration

- `eslint.config.js` - ESLint configuration with React hooks and refresh

Remember: This is a modern React application with TypeScript. Maintain consistency with existing patterns, follow React best practices, and ensure type safety throughout the codebase.
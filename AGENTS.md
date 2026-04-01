# AGENTS.md

This file contains essential guidelines for AI agents working on this fullstack monorepo with React frontend and Express.js backend. Follow these conventions to maintain code quality and consistency across the entire project.

## 🏗️ Monorepo Architecture

### Project Structure

```
boilerplate_fullstack/
├── packages/
│   ├── frontend/          # React 19 application with Vite (port 3000)
│   └── backend/           # Express.js API (port 5000)
├── scripts/               # Development and build scripts
├── docs/                  # Documentation files
└── package.json           # Root workspace configuration
```

### Workspace Organization

- **Root**: Manages all packages, shared scripts, and documentation
- **Frontend Package**: Complete React application with authentication
- **Backend Package**: Express.js API with database and authentication
- **Scripts**: Unified development, build, and maintenance tools

## 🛠️ Development Commands

### Root-Level Commands (Primary)

```bash
# Development
npm run dev                    # Start both frontend (3000) and backend (5000)
npm run start                  # Start both production servers
npm run build                  # Build both packages for production

# Package Management
npm run install:all            # Install all dependencies across workspaces
npm run clean                  # Clean all builds and node_modules
npm run clean:node             # Clean and reinstall all dependencies

# Code Quality
npm run lint                   # Lint all packages
npm run lint:fix               # Auto-fix linting issues
npm run test                   # Run all tests
npm run format                 # Format all code

# Database (Backend)
npm run migrate                # Run database migrations
npm run migrate:generate       # Generate new migrations
npm run studio                 # Open Drizzle Studio
```

### Package-Specific Commands

```bash
# Frontend only
npm run start:frontend         # Start frontend development server
npm run dev --workspace=packages/frontend

# Backend only
npm run start:backend          # Start backend development server
npm run dev --workspace=packages/backend
```

## 📋 Development Workflow

### Getting Started

1. **Install dependencies**: `npm run install:all`
2. **Set up environment**: Copy `.env.example` to `.env` and configure
3. **Set up database**: `createdb app_db && npm run migrate`
4. **Start development**: `npm run dev`
5. **Test end-to-end**: Verify frontend-backend communication

### Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health
- Drizzle Studio: `npm run studio` (when available)

## 🔄 Cross-Package Communication

### API Integration

- Frontend communicates with backend via HTTP APIs
- Base URL: `http://localhost:5000` (configured in frontend environment)
- All API requests include proper authentication headers
- CSRF protection enabled for state-changing requests

### Authentication Flow

1. Frontend sends credentials to `/api/auth/login`
2. Backend validates and returns access token + refresh cookie
3. Frontend stores access token, uses it in subsequent requests
4. Automatic token refresh on 401 responses
5. CSRF tokens handled automatically for protected operations

### Data Flow

```
Frontend (React) → HTTP Request → Backend (Express) → Service → Repository → Database
                    Response ←             ← JSON Response ←    ← Query Result
```

## 🎯 Package-Specific Guidelines

### Frontend Development (packages/frontend)

**Refer to**: `packages/frontend/AGENTS.md` for detailed guidelines

**Key Points**:

- React 19 with Vite 8 and TypeScript strict mode
- Use `@/` path aliases for internal imports
- Component naming: PascalCase for components, camelCase for utilities
- Authentication via `useAuth` hook and centralized `apiClient`
- shadcn/ui + Tailwind CSS for consistent styling

### Backend Development (packages/backend)

**Refer to**: `packages/backend/AGENTS.md` for detailed guidelines

**Key Points**:

- Express.js with TypeScript and ES modules
- Layered architecture: Routes → Controllers → Services → Repositories
- Drizzle ORM with PostgreSQL for type-safe database operations
- JWT authentication with access/refresh tokens
- Zod validation for all inputs

## 🔧 Code Quality Standards

### TypeScript Configuration

- **Root**: Node.js 22+ requirement for consistency
- **Frontend**: Vite-specific TypeScript config with JSX support
- **Backend**: Strict ES2022 config with ESNext modules
- **No `any` types** allowed in either package

### Import Organization

```typescript
// Frontend pattern
import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'

// Backend pattern
import express from 'express'
import { z } from 'zod'
import { logger } from '../utils/logger.js'
import { db } from '../db/client.js'
```

### File Naming Conventions

```
Frontend:
- Components: PascalCase.tsx (LoginForm.tsx)
- Utilities: camelCase.ts (apiClient.ts)
- Types: camelCase.ts (auth.ts)
- Pages: PascalCase.tsx (Home.tsx, Dashboard.tsx)

Backend:
- Files: camelCase.ts (userService.ts)
- Functions: camelCase (getUserById)
- Types: PascalCase (UserType)
- Constants: SCREAMING_SNAKE_CASE (API_VERSION)
```

## 🔐 Security Guidelines

### Authentication Requirements

- JWT access tokens (15min) + HttpOnly refresh cookies (7d)
- CSRF protection for state-changing requests
- Passwords hashed with bcrypt
- Never log sensitive data (passwords, tokens)

### Input Validation

- **Frontend**: React Hook Form + Zod schemas for forms
- **Backend**: Zod schemas for all API inputs
- Validate early, fail fast
- Sanitize user inputs before processing

### API Security

- CORS configured for frontend origin (http://localhost:3000)
- Rate limiting to prevent abuse
- Security headers via Helmet.js
- SQL injection prevention via Drizzle ORM

## 🗄️ Database Guidelines

### Migration Management

```bash
# Generate new migration
npm run migrate:generate

# Apply pending migrations
npm run migrate

# Inspect database
npm run studio
```

### Query Patterns

- Prefer atomic queries: `UPDATE ... RETURNING`
- Use transactions for multi-step operations
- Implement row-level locking when needed
- Keep database operations in repositories only

## 🧪 Testing Strategy

### Test Organization

```
Frontend: (To be implemented)
- Component tests with React Testing Library
- Integration tests for API interactions
- E2E tests for critical user flows

Backend:
- Unit tests for pure functions/utils
- Integration tests for API endpoints
- Database tests with transaction rollback
```

### Running Tests

```bash
# Run all tests
npm run test

# Backend tests only
npm run test --workspace=packages/backend

# Frontend tests only (when implemented)
npm run test --workspace=packages/frontend

# Run a single test file (backend)
npm run test --workspace=packages/backend -- tests/specific.test.ts

# Run a specific test by name (backend)
npm run test --workspace=packages/backend -- --grep "test name"

# Run tests in watch mode (backend)
npm run test:watch --workspace=packages/backend
```

## 🚀 Deployment Guidelines

### Production Build

```bash
npm run build                   # Build both packages
npm run start                   # Start production servers
```

### Environment Variables

**Root `.env.example` contains all required variables**:

- Backend: Database URL, JWT secrets, server configuration
- Frontend: API base URL, public environment variables

### Deployment Architecture

- Frontend: Deploy to Vercel, Netlify, or similar platform
- Backend: Deploy to Node.js hosting with PostgreSQL
- Database: PostgreSQL with connection pooling
- Both can be deployed independently or together

## 📚 Documentation

### Available Documentation

- `docs/FRONTEND.md` - Frontend development guide
- `docs/API.md` - Backend API documentation
- `docs/DEPLOYMENT.md` - Production deployment guide
- `packages/frontend/AGENTS.md` - Frontend-specific guidelines
- `packages/backend/AGENTS.md` - Backend-specific guidelines

### API Documentation

- Backend endpoints documented in `docs/API.md`
- Frontend API client usage in `docs/FRONTEND.md`
- Request/response formats standardized across both packages

## 🛡️ Error Handling

### Frontend Error Handling

```typescript
try {
  const result = await apiClient.post('/endpoint', data)
  // Handle success
} catch (error) {
  const message = error instanceof Error ? error.message : 'Operation failed'
  setSubmitError(message)
  setIsLoading(false)
}
```

### Backend Error Handling

- Services throw errors, controllers don't swallow them
- Global error handler provides consistent responses
- Structured logging for debugging
- No stack traces exposed to clients

## 🎯 Best Practices Summary

### Cross-Package Coordination

- Both packages must use same authentication tokens
- API contracts must stay synchronized
- Environment variables should be consistent
- Database schema changes require frontend updates

### Development Workflow

1. Always test changes in both packages
2. Run `npm run lint` before committing
3. Verify `npm run build` passes for both packages
4. Test authentication flow end-to-end
5. Update documentation when making breaking changes

### Code Quality

- Follow existing patterns in each package
- Use TypeScript strictly in both packages
- Write tests for new functionality
- Keep authentication and security patterns consistent
- Maintain separation of concerns across packages

## 📋 Common Tasks

### Adding New API Endpoint

1. **Backend**: Add schema → controller → service → repository
2. **Frontend**: Add types → API client method → UI components
3. **Test**: Verify end-to-end functionality
4. **Docs**: Update API documentation

### Database Schema Changes

1. **Backend**: Generate migration with `npm run migrate:generate`
2. **Backend**: Update Drizzle models and types
3. **Backend**: Run migration with `npm run migrate`
4. **Frontend**: Update TypeScript types if needed
5. **Test**: Verify API responses match new schema

### Authentication Updates

1. **Backend**: Update JWT logic or middleware
2. **Frontend**: Update auth context and API client
3. **Both**: Test complete authentication flow
4. **Both**: Verify token refresh mechanism

## 🚫 Absolute Prohibitions

### Monorepo Level

- ❌ Never modify dependencies in node_modules directly
- ❌ Don't break API contracts without updating both packages
- ❌ Don't commit .env files with sensitive data
- ❌ Don't ignore cross-package integration testing

### Package Level

- **Frontend**: See packages/frontend/AGENTS.md
- **Backend**: See packages/backend/AGENTS.md

## ✨ Key Benefits of This Architecture

- **Unified Development**: Single command starts fullstack
- **Independent Deployments**: Each package can be deployed separately
- **Type Safety**: Strict TypeScript across both packages
- **Consistent Tooling**: Shared linting, formatting, and build processes
- **Scalability**: Easy to add more packages (admin dashboard, docs, etc.)
- **Maintainability**: Clear separation of concerns while staying unified

---

**Remember**: This is a production-ready fullstack monorepo. Maintain consistency between packages, test cross-package functionality, and follow established patterns for authentication, API design, and error handling.

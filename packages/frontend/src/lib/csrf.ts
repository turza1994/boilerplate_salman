/**
 * CSRF Token Management Utilities
 * Handles CSRF token extraction and storage for secure API requests
 * Backend validates CSRF token by comparing x-csrf-token header with _csrf cookie
 */

/**
 * Get CSRF token from _csrf cookie
 * Backend sets this cookie and validates against it
 */
export const getCSRFToken = (): string | null => {
  if (typeof window === 'undefined') return null

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === '_csrf') {
      return value
    }
  }
  return null
}

/**
 * Extract CSRF token from API response headers and update cookie
 * Backend sends CSRF token in 'x-csrf-token' header
 */
export const extractCSRFFromResponse = (response: Response): void => {
  const csrfHeader = response.headers.get('x-csrf-token')
  if (csrfHeader) {
    // Update the _csrf cookie to match the new token from backend
    document.cookie = `_csrf=${csrfHeader}; path=/; max-age=${24 * 60 * 60}; SameSite=strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
  }
}

/**
 * Add CSRF token to request headers if available
 * Used for state-changing operations like refresh token
 * Backend validates by comparing this header with _csrf cookie
 */
export const addCSRFToHeaders = (
  headers: Record<string, string>,
): Record<string, string> => {
  const csrfToken = getCSRFToken()
  if (csrfToken) {
    headers['X-CSRF-Token'] = csrfToken
  }
  return headers
}

/**
 * Remove CSRF token cookie
 */
export const removeCSRFToken = (): void => {
  if (typeof window === 'undefined') return
  document.cookie =
    '_csrf=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=strict;'
}

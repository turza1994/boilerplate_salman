import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface FeedHeaderProps {
  onThemeToggle?: () => void
  isDarkMode?: boolean
}

export function FeedHeader({
  onThemeToggle,
  isDarkMode = false,
}: FeedHeaderProps) {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className='sticky top-0 z-50 bg-white border-b border-slate-200'>
      <div className='container px-4 mx-auto'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <a href='/feed' className='flex items-center gap-2'>
              <svg
                className='w-8 h-8 text-blue-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 10V3L4 14h7v7l9-11h-7z'
                />
              </svg>
              <span className='text-xl font-bold text-slate-900'>
                BuddyScript
              </span>
            </a>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className='flex-1 hidden max-w-md mx-8 md:flex'>
            <div className='relative w-full'>
              <svg
                className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-slate-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className='flex items-center gap-2'>
            {/* Home */}
            <a
              href='/feed'
              className='p-2 text-blue-600 rounded-lg hover:bg-blue-50'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </a>

            {/* Friends */}
            <a
              href='/friends'
              className='p-2 rounded-lg text-slate-600 hover:bg-slate-100'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </a>

            {/* Notifications */}
            <div className='relative'>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className='relative p-2 rounded-lg text-slate-600 hover:bg-slate-100'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                  />
                </svg>
                <span className='absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full top-1 right-1'>
                  6
                </span>
              </button>
              {showNotifications && (
                <div className='absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-80 border-slate-200'>
                  <div className='p-4 border-b border-slate-200'>
                    <h3 className='font-semibold text-slate-900'>
                      Notifications
                    </h3>
                  </div>
                  <div className='overflow-y-auto max-h-96'>
                    <div className='p-4 border-b border-slate-100 hover:bg-slate-50'>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full'>
                          <span className='text-sm font-medium text-blue-600'>
                            SJ
                          </span>
                        </div>
                        <div>
                          <p className='text-sm text-slate-800'>
                            <span className='font-medium'>Steve Jobs</span>{' '}
                            posted a link in your timeline.
                          </p>
                          <p className='text-xs text-slate-500'>
                            42 minutes ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <a
              href='/chat'
              className='relative p-2 rounded-lg text-slate-600 hover:bg-slate-100'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              <span className='absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-500 rounded-full top-1 right-1'>
                2
              </span>
            </a>

            {/* Theme Toggle */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className='p-2 rounded-lg text-slate-600 hover:bg-slate-100'
              >
                {isDarkMode ? (
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                ) : (
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                    />
                  </svg>
                )}
              </button>
            )}

            {/* Profile Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className='flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100'
              >
                <div className='flex items-center justify-center w-8 h-8 text-sm font-medium text-blue-600 bg-blue-100 rounded-full'>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </div>
                <svg
                  className='w-4 h-4 text-slate-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>
              {showProfile && (
                <div className='absolute right-0 w-64 mt-2 bg-white border rounded-lg shadow-lg border-slate-200'>
                  <div className='p-4 border-b border-slate-200'>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center justify-center w-12 h-12 font-medium text-blue-600 bg-blue-100 rounded-full'>
                        {user?.firstName?.[0]}
                        {user?.lastName?.[0]}
                      </div>
                      <div>
                        <h4 className='font-semibold text-slate-900'>
                          {user?.firstName} {user?.lastName}
                        </h4>
                        <a
                          href='/profile'
                          className='text-sm text-blue-600 hover:underline'
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                  <ul className='py-2'>
                    <li>
                      <a
                        href='/settings'
                        className='flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50'
                      >
                        <svg
                          className='w-5 h-5 text-blue-500'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href='/help'
                        className='flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50'
                      >
                        <svg
                          className='w-5 h-5 text-blue-500'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                          />
                        </svg>
                        Help & Support
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className='flex items-center w-full gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50'
                      >
                        <svg
                          className='w-5 h-5 text-blue-500'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                          />
                        </svg>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

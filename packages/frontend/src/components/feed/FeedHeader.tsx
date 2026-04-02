import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function FeedHeader() {
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
              <img
                src='/assets/images/logo.svg'
                alt='BuddyScript'
                className='h-8'
              />
            </a>
          </div>

          {/* Search Bar */}
          <div className='flex-1 hidden max-w-md mx-8 md:flex'>
            <div className='relative w-full'>
              <svg
                className='absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2'
                xmlns='http://www.w3.org/2000/svg'
                width='17'
                height='17'
                fill='none'
                viewBox='0 0 17 17'
              >
                <circle cx='7' cy='7' r='6' stroke='#666' />
                <path stroke='#666' strokeLinecap='round' d='M16 16l-3-3' />
              </svg>
              <input
                type='text'
                placeholder='input search text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>

          {/* Right Section - Nav Icons & Profile */}
          <div className='flex items-center gap-2'>
            {/* Home Icon - Active */}
            <a
              href='/feed'
              className='p-2 text-blue-600 rounded-lg hover:bg-blue-50'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='21'
                fill='none'
                viewBox='0 0 18 21'
              >
                <path
                  stroke='#000'
                  strokeWidth='1.5'
                  strokeOpacity='.6'
                  d='M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z'
                />
                <path
                  stroke='#000'
                  strokeOpacity='.6'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857'
                />
              </svg>
            </a>

            {/* Friends Icon */}
            <a
              href='/friends'
              className='p-2 rounded-lg text-slate-600 hover:bg-slate-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26'
                height='20'
                fill='none'
                viewBox='0 0 26 20'
              >
                <path
                  fill='#000'
                  fillOpacity='.6'
                  fillRule='evenodd'
                  d='M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.638-3.326-1.982-6.118-1.982z'
                  clipRule='evenodd'
                />
              </svg>
            </a>

            {/* Notification Bell with Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className='relative p-2 rounded-lg text-slate-600 hover:bg-slate-100'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='22'
                  fill='none'
                  viewBox='0 0 20 22'
                >
                  <path
                    fill='#000'
                    fillOpacity='.6'
                    fillRule='evenodd'
                    d='M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full top-1 right-1'>
                  6
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className='absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-80 border-slate-200'>
                  <div className='flex items-center justify-between p-4 border-b border-slate-200'>
                    <h4 className='font-semibold text-slate-900'>
                      Notifications
                    </h4>
                    <button className='relative p-1 rounded hover:bg-slate-100'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='4'
                        height='17'
                        fill='none'
                        viewBox='0 0 4 17'
                      >
                        <circle cx='2' cy='2' r='2' fill='#C4C4C4' />
                        <circle cx='2' cy='8' r='2' fill='#C4C4C4' />
                        <circle cx='2' cy='15' r='2' fill='#C4C4C4' />
                      </svg>
                    </button>
                  </div>

                  {/* Filter Tabs */}
                  <div className='flex border-b border-slate-200'>
                    <button className='flex-1 px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600'>
                      All
                    </button>
                    <button className='flex-1 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50'>
                      Unread
                    </button>
                  </div>

                  {/* Notification List */}
                  <div className='overflow-y-auto max-h-64'>
                    <div className='flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50'>
                      <img
                        src='/assets/images/friend-req.png'
                        alt='User'
                        className='w-10 h-10 rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-sm text-slate-700'>
                          <span className='font-semibold'>Steve Jobs</span>{' '}
                          posted a link in your timeline.
                        </p>
                        <span className='text-xs text-slate-500'>
                          42 minutes ago
                        </span>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50'>
                      <img
                        src='/assets/images/profile-1.png'
                        alt='User'
                        className='w-10 h-10 rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-sm text-slate-700'>
                          An admin changed the name of the group{' '}
                          <span className='font-semibold'>Freelancer usa</span>{' '}
                          to{' '}
                          <span className='font-semibold'>Freelancer usa</span>
                        </p>
                        <span className='text-xs text-slate-500'>
                          42 minutes ago
                        </span>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50'>
                      <img
                        src='/assets/images/friend-req.png'
                        alt='User'
                        className='w-10 h-10 rounded-full'
                      />
                      <div className='flex-1'>
                        <p className='text-sm text-slate-700'>
                          <span className='font-semibold'>Steve Jobs</span>{' '}
                          posted a link in your timeline.
                        </p>
                        <span className='text-xs text-slate-500'>
                          42 minutes ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Icon */}
            <a
              href='/chat'
              className='relative p-2 rounded-lg text-slate-600 hover:bg-slate-100'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='23'
                height='22'
                fill='none'
                viewBox='0 0 23 22'
              >
                <path
                  fill='#000'
                  fillOpacity='.6'
                  fillRule='evenodd'
                  d='M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.437-.174-.847-.338-1.14-.338-.338.002-.793.158-1.232.308-.9.307-2.022.69-2.852-.131-.826-.822-.445-1.932-.138-2.826.152-.44.307-.895.307-1.239 0-.282-.137-.642-.347-1.161C-.57 11.46.322 6.47 3.596 3.22A11.04 11.04 0 0111.43 0z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-blue-500 rounded-full top-1 right-1'>
                2
              </span>
            </a>

            {/* Profile Dropdown */}
            <div className='relative'>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className='flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100'
              >
                <img
                  src='/assets/images/profile.png'
                  alt='Profile'
                  className='object-cover w-8 h-8 rounded-full'
                />
                <span className='hidden text-sm font-medium text-slate-700 md:block'>
                  {user?.firstName} {user?.lastName}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='10'
                  height='6'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    fill='#112032'
                    d='M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z'
                  />
                </svg>
              </button>

              {showProfile && (
                <div className='absolute right-0 w-64 mt-2 bg-white border rounded-lg shadow-lg border-slate-200'>
                  {/* Profile Info Section */}
                  <div className='p-4 border-b border-slate-200'>
                    <div className='flex items-center gap-3'>
                      <img
                        src='/assets/images/profile.png'
                        alt='Profile'
                        className='object-cover w-12 h-12 rounded-full'
                      />
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

                  {/* Menu Items */}
                  <ul className='py-2'>
                    <li>
                      <a
                        href='/settings'
                        className='flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50'
                      >
                        <div className='flex items-center gap-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='19'
                            fill='none'
                            viewBox='0 0 18 19'
                          >
                            <path
                              fill='#377DFF'
                              d='M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.313.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17z'
                            />
                          </svg>
                          Settings
                        </div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='6'
                          height='10'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            fill='#112032'
                            d='M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z'
                            opacity='.5'
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href='/help'
                        className='flex items-center justify-between px-4 py-2 text-slate-700 hover:bg-slate-50'
                      >
                        <div className='flex items-center gap-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='20'
                            height='20'
                            fill='none'
                            viewBox='0 0 20 20'
                          >
                            <path
                              stroke='#377DFF'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M10 19a9 9 0 100-18 9 9 0 000 18z'
                            />
                            <path
                              stroke='#377DFF'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009'
                            />
                          </svg>
                          Help & Support
                        </div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='6'
                          height='10'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            fill='#112032'
                            d='M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z'
                            opacity='.5'
                          />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className='flex items-center justify-between w-full px-4 py-2 text-slate-700 hover:bg-slate-50'
                      >
                        <div className='flex items-center gap-3'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='19'
                            height='19'
                            fill='none'
                            viewBox='0 0 19 19'
                          >
                            <path
                              stroke='#377DFF'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='1.5'
                              d='M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667'
                            />
                          </svg>
                          Log Out
                        </div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='6'
                          height='10'
                          fill='none'
                          viewBox='0 0 6 10'
                        >
                          <path
                            fill='#112032'
                            d='M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z'
                            opacity='.5'
                          />
                        </svg>
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

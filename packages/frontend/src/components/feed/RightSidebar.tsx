import { useState } from 'react'

export function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState('')

  const friends = [
    {
      id: 1,
      name: 'Steve Jobs',
      role: 'CEO of Apple',
      initials: 'SJ',
      color: 'blue',
      online: false,
      lastSeen: '5 minute ago',
    },
    {
      id: 2,
      name: 'Ryan Roslansky',
      role: 'CEO of LinkedIn',
      initials: 'RR',
      color: 'green',
      online: true,
    },
    {
      id: 3,
      name: 'Dylan Field',
      role: 'CEO of Figma',
      initials: 'DF',
      color: 'purple',
      online: true,
    },
  ]

  return (
    <div className='space-y-6'>
      {/* You Might Like */}
      <div className='p-6 bg-white border rounded-lg border-slate-200'>
        <div className='flex items-center justify-between mb-6'>
          <h4 className='text-lg font-semibold text-slate-900'>
            You Might Like
          </h4>
          <a
            href='/suggestions'
            className='text-sm text-blue-600 hover:underline'
          >
            See All
          </a>
        </div>
        <hr className='mb-6 border-slate-200' />
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full'>
              <span className='font-medium text-orange-600'>RS</span>
            </div>
            <div>
              <h5 className='font-medium text-slate-900'>Radovan SkillArena</h5>
              <p className='text-sm text-slate-500'>Founder & CEO at Trophy</p>
            </div>
          </div>
        </div>
        <div className='flex gap-2 mt-4'>
          <button className='flex-1 px-3 py-2 text-sm font-medium border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-50'>
            Ignore
          </button>
          <button className='flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
            Follow
          </button>
        </div>
      </div>

      {/* Your Friends */}
      <div className='p-6 bg-white border rounded-lg border-slate-200'>
        <div className='flex items-center justify-between mb-6'>
          <h4 className='text-lg font-semibold text-slate-900'>Your Friends</h4>
          <a href='/friends' className='text-sm text-blue-600 hover:underline'>
            See All
          </a>
        </div>
        <div className='relative mb-6'>
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
        <div className='space-y-4'>
          {friends.map((friend) => (
            <div key={friend.id} className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-${friend.color}-100`}
                  >
                    <span
                      className={`text-sm font-medium text-${friend.color}-600`}
                    >
                      {friend.initials}
                    </span>
                  </div>
                  {friend.online && (
                    <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
                  )}
                </div>
                <div>
                  <h5 className='font-medium text-slate-900'>{friend.name}</h5>
                  <p className='text-sm text-slate-500'>{friend.role}</p>
                </div>
              </div>
              {friend.online ? (
                <span className='flex items-center gap-1 text-xs text-green-600'>
                  <svg
                    className='w-3 h-3'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <circle cx='12' cy='12' r='10' />
                  </svg>
                  Online
                </span>
              ) : (
                <span className='text-xs text-slate-500'>
                  {friend.lastSeen}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

export function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState('')

  const friends = [
    {
      id: 1,
      name: 'Steve Jobs',
      role: 'CEO of Apple',
      image: '/assets/images/people1.png',
      online: false,
      lastSeen: '5 minute ago',
    },
    {
      id: 2,
      name: 'Ryan Roslansky',
      role: 'CEO of Linkedin',
      image: '/assets/images/people2.png',
      online: true,
    },
    {
      id: 3,
      name: 'Dylan Field',
      role: 'CEO of Figma',
      image: '/assets/images/people3.png',
      online: true,
    },
  ]

  return (
    <div className='space-y-6'>
      {/* You Might Like */}
      <div className='p-6 transition-all duration-300 bg-white border rounded-lg border-slate-200 hover:shadow-md'>
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
            <img
              src='/assets/images/Avatar.png'
              alt='Radovan SkillArena'
              className='object-cover w-12 h-12 rounded-full'
            />
            <div>
              <h5 className='font-medium text-slate-900'>Radovan SkillArena</h5>
              <p className='text-sm text-slate-500'>Founder & CEO at Trophy</p>
            </div>
          </div>
        </div>
        <div className='flex gap-2 mt-4'>
          <button className='flex-1 px-3 py-2 text-sm font-medium transition-all duration-200 border rounded-lg text-slate-600 border-slate-300 hover:bg-slate-50 hover:scale-105'>
            Ignore
          </button>
          <button className='flex-1 px-3 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105'>
            Follow
          </button>
        </div>
      </div>

      {/* Your Friends */}
      <div className='p-6 transition-all duration-300 bg-white border rounded-lg border-slate-200 hover:shadow-md'>
        <div className='flex items-center justify-between mb-6'>
          <h4 className='text-lg font-semibold text-slate-900'>Your Friends</h4>
          <a href='/friends' className='text-sm text-blue-600 hover:underline'>
            See All
          </a>
        </div>
        <div className='relative mb-6'>
          <svg
            className='absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-slate-400'
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
            className='w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>
        <div className='space-y-4'>
          {friends.map((friend) => (
            <div key={friend.id} className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='relative'>
                  <img
                    src={friend.image}
                    alt={friend.name}
                    className='object-cover w-10 h-10 rounded-full'
                  />
                </div>
                <div>
                  <h5 className='font-medium text-slate-900'>{friend.name}</h5>
                  <p className='text-sm text-slate-500'>{friend.role}</p>
                </div>
              </div>
              {friend.online ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <rect
                    width='12'
                    height='12'
                    x='1'
                    y='1'
                    fill='#0ACF83'
                    stroke='#fff'
                    strokeWidth='2'
                    rx='6'
                  />
                </svg>
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

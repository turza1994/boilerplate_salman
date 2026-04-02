export function LeftSidebar() {
  return (
    <div className='space-y-6'>
      {/* Explore Section */}
      <div className='p-6 bg-white border rounded-lg border-slate-200'>
        <h4 className='mb-6 text-lg font-semibold text-slate-900'>Explore</h4>
        <ul className='space-y-4'>
          <li>
            <a
              href='/learning'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                />
              </svg>
              Learning
              <span className='px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full'>
                New
              </span>
            </a>
          </li>
          <li>
            <a
              href='/insights'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              Insights
            </a>
          </li>
          <li>
            <a
              href='/find-friends'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
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
              Find friends
            </a>
          </li>
          <li>
            <a
              href='/bookmarks'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                />
              </svg>
              Bookmarks
            </a>
          </li>
          <li>
            <a
              href='/groups'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
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
              Group
            </a>
          </li>
          <li>
            <a
              href='/gaming'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              Gaming
              <span className='px-2 py-0.5 text-xs font-medium text-blue-600 bg-blue-100 rounded-full'>
                New
              </span>
            </a>
          </li>
          <li>
            <a
              href='/settings'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
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
              href='/saved'
              className='flex items-center gap-3 text-slate-600 hover:text-blue-600'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                />
              </svg>
              Save post
            </a>
          </li>
        </ul>
      </div>

      {/* Suggested People */}
      <div className='p-6 bg-white border rounded-lg border-slate-200'>
        <div className='flex items-center justify-between mb-6'>
          <h4 className='text-lg font-semibold text-slate-900'>
            Suggested People
          </h4>
          <a
            href='/suggested'
            className='text-sm text-blue-600 hover:underline'
          >
            See All
          </a>
        </div>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full'>
                <span className='text-sm font-medium text-blue-600'>SJ</span>
              </div>
              <div>
                <h5 className='font-medium text-slate-900'>Steve Jobs</h5>
                <p className='text-sm text-slate-500'>CEO of Apple</p>
              </div>
            </div>
            <button className='px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50'>
              Connect
            </button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-10 h-10 bg-green-100 rounded-full'>
                <span className='text-sm font-medium text-green-600'>RR</span>
              </div>
              <div>
                <h5 className='font-medium text-slate-900'>Ryan Roslansky</h5>
                <p className='text-sm text-slate-500'>CEO of LinkedIn</p>
              </div>
            </div>
            <button className='px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50'>
              Connect
            </button>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full'>
                <span className='text-sm font-medium text-purple-600'>DF</span>
              </div>
              <div>
                <h5 className='font-medium text-slate-900'>Dylan Field</h5>
                <p className='text-sm text-slate-500'>CEO of Figma</p>
              </div>
            </div>
            <button className='px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50'>
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className='p-6 bg-white border rounded-lg border-slate-200'>
        <div className='flex items-center justify-between mb-6'>
          <h4 className='text-lg font-semibold text-slate-900'>Events</h4>
          <a href='/events' className='text-sm text-blue-600 hover:underline'>
            See all
          </a>
        </div>
        <a href='/events/1' className='block'>
          <div className='overflow-hidden border rounded-lg border-slate-200'>
            <div className='h-32 bg-gradient-to-r from-blue-500 to-purple-500'></div>
            <div className='p-4'>
              <div className='flex gap-3'>
                <div className='text-center'>
                  <p className='text-2xl font-bold text-slate-900'>10</p>
                  <p className='text-sm text-slate-500'>Jul</p>
                </div>
                <div>
                  <h5 className='font-medium text-slate-900'>
                    No more terrorism no more cry
                  </h5>
                </div>
              </div>
              <div className='flex items-center justify-between pt-4 mt-4 border-t border-slate-200'>
                <p className='text-sm text-slate-500'>17 People Going</p>
                <button className='px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50'>
                  Going
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

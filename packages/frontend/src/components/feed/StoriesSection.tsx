import { useState } from 'react'

interface Story {
  id: number
  name: string
  initials: string
  hasStory: boolean
  isOwn?: boolean
}

export function StoriesSection() {
  const [stories] = useState<Story[]>([
    { id: 0, name: 'Your Story', initials: 'YO', hasStory: false, isOwn: true },
    { id: 1, name: 'Ryan Roslansky', initials: 'RR', hasStory: true },
    { id: 2, name: 'Dylan Field', initials: 'DF', hasStory: false },
    { id: 3, name: 'Steve Jobs', initials: 'SJ', hasStory: true },
    { id: 4, name: 'Bill Gates', initials: 'BG', hasStory: false },
    { id: 5, name: 'Elon Musk', initials: 'EM', hasStory: true },
  ])

  return (
    <div className='p-4 mb-4 bg-white border rounded-lg border-slate-200'>
      {/* Desktop View */}
      <div className='hidden md:block'>
        <div className='flex gap-4 overflow-x-auto'>
          {stories.slice(0, 4).map((story) => (
            <div key={story.id} className='flex-shrink-0 w-1/4'>
              <div
                className={`relative h-40 rounded-lg overflow-hidden cursor-pointer ${
                  story.isOwn
                    ? 'bg-slate-100'
                    : 'bg-gradient-to-b from-blue-400 to-blue-600'
                }`}
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full ${
                      story.isOwn ? 'bg-blue-100' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`text-xl font-bold ${
                        story.isOwn ? 'text-blue-600' : 'text-white'
                      }`}
                    >
                      {story.initials}
                    </span>
                  </div>
                </div>
                {story.isOwn && (
                  <div className='absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4'>
                    <button className='flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full'>
                      <svg
                        className='w-5 h-5 text-white'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 4v16m8-8H4'
                        />
                      </svg>
                    </button>
                  </div>
                )}
                {story.hasStory && !story.isOwn && (
                  <div className='absolute top-2 left-2'>
                    <div className='w-3 h-3 bg-blue-500 border-2 border-white rounded-full'></div>
                  </div>
                )}
                <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent'>
                  <p className='text-sm font-medium text-white truncate'>
                    {story.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className='md:hidden'>
        <div className='flex gap-4 pb-2 overflow-x-auto'>
          {stories.map((story) => (
            <div key={story.id} className='flex-shrink-0 text-center'>
              <div className='relative'>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    story.hasStory
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : story.isOwn
                        ? 'bg-blue-100'
                        : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`text-lg font-bold ${
                      story.isOwn ? 'text-blue-600' : 'text-slate-600'
                    }`}
                  >
                    {story.initials}
                  </span>
                </div>
                {story.isOwn && (
                  <button className='absolute bottom-0 right-0 flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full'>
                    <svg
                      className='w-3 h-3 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 4v16m8-8H4'
                      />
                    </svg>
                  </button>
                )}
              </div>
              <p className='w-16 mt-1 text-xs truncate text-slate-600'>
                {story.isOwn ? 'Your Story' : story.name.split(' ')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

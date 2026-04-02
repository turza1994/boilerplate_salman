import { useState } from 'react'

interface Story {
  id: number
  name: string
  image: string
  hasStory: boolean
  isOwn?: boolean
}

export function StoriesSection() {
  const [stories] = useState<Story[]>([
    {
      id: 0,
      name: 'Your Story',
      image: '/assets/images/card_ppl1.png',
      hasStory: false,
      isOwn: true,
    },
    {
      id: 1,
      name: 'Ryan Roslansky',
      image: '/assets/images/card_ppl2.png',
      hasStory: true,
    },
    {
      id: 2,
      name: 'Ryan Roslansky',
      image: '/assets/images/card_ppl3.png',
      hasStory: false,
    },
    {
      id: 3,
      name: 'Ryan Roslansky',
      image: '/assets/images/card_ppl4.png',
      hasStory: false,
    },
  ])

  return (
    <div className='mb-4 overflow-hidden transition-all duration-300 bg-white border rounded-lg border-slate-200 hover:shadow-md'>
      {/* Desktop View */}
      <div className='relative hidden md:block'>
        {/* Left Arrow */}
        <button className='absolute z-10 flex items-center justify-center w-8 h-8 -translate-y-1/2 rounded-full left-2 top-1/2 bg-slate-600/80 hover:bg-slate-700/80'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='9'
            height='8'
            fill='none'
            viewBox='0 0 9 8'
          >
            <path
              fill='#fff'
              d='M1 4l-.366-.341-.318.341.318.341L1 4zm7 .5a.5 5 0 000-1v1zM3.434.659l-2.8 3 .732.682 2.8-3L3.434.66zm-2.8 3.682l2.8 3 .732-.682-2.8-3-.732.682zM1 4.5H8v-1H1v1z'
            />
          </svg>
        </button>
        {/* Right Arrow */}
        <button className='absolute z-10 flex items-center justify-center w-8 h-8 -translate-y-1/2 rounded-full right-2 top-1/2 bg-slate-600/80 hover:bg-slate-700/80'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='9'
            height='8'
            fill='none'
            viewBox='0 0 9 8'
          >
            <path
              fill='#fff'
              d='M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5 5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z'
            />
          </svg>
        </button>
        <div className='grid grid-cols-4 gap-2'>
          {stories.map((story) => (
            <div
              key={story.id}
              className='relative transition-all duration-300 aspect-[3/4] overflow-hidden cursor-pointer group hover:scale-105'
            >
              <img
                src={story.image}
                alt={story.name}
                className='object-cover w-full h-full'
              />
              {story.isOwn ? (
                <div className='absolute inset-0 flex flex-col items-center justify-end pb-6 bg-black/20'>
                  <button className='flex items-center justify-center mb-2 bg-blue-600 rounded-full w-9 h-9'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='10'
                      height='10'
                      fill='none'
                      viewBox='0 0 10 10'
                    >
                      <path
                        stroke='#fff'
                        strokeLinecap='round'
                        d='M.5 4.884h9M4.884 9.5v-9'
                      />
                    </svg>
                  </button>
                  <p className='text-sm font-medium text-white'>Your Story</p>
                </div>
              ) : (
                <div className='absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/60 to-transparent'>
                  {story.hasStory && (
                    <div className='absolute top-3 left-3'>
                      <div className='w-8 h-8 overflow-hidden border-2 border-blue-500 rounded-full'>
                        <img
                          src='/assets/images/mini_pic.png'
                          alt=''
                          className='object-cover w-full h-full'
                        />
                      </div>
                    </div>
                  )}
                  <p className='text-sm font-medium text-white'>{story.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View */}
      <div className='p-4 md:hidden'>
        <div className='flex gap-3 pb-2 overflow-x-auto'>
          {stories.map((story) => (
            <div
              key={story.id}
              className='flex-shrink-0 text-center transition-all duration-200 hover:scale-105'
            >
              <div
                className={`w-16 h-16 rounded-full overflow-hidden transition-all duration-200 ${story.hasStory ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className='object-cover w-full h-full'
                />
                {story.isOwn && (
                  <div className='relative'>
                    <button className='absolute flex items-center justify-center w-5 h-5 bg-blue-600 border-2 border-white rounded-full -bottom-1 -right-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='12'
                        fill='none'
                        viewBox='0 0 12 12'
                      >
                        <path
                          stroke='#fff'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6 2.5v7M2.5 6h7'
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className='w-16 mt-1 text-xs font-semibold text-white truncate drop-shadow-md'>
                {story.isOwn ? 'Your Story' : story.name.split(' ')[0] + '...'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

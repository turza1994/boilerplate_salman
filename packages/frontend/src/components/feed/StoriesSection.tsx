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
    { id: 0, name: 'Your Story', image: '/assets/images/card_ppl1.png', hasStory: false, isOwn: true },
    { id: 1, name: 'Ryan Roslansky', image: '/assets/images/card_ppl2.png', hasStory: true },
    { id: 2, name: 'Ryan Roslansky', image: '/assets/images/card_ppl3.png', hasStory: false },
    { id: 3, name: 'Ryan Roslansky', image: '/assets/images/card_ppl4.png', hasStory: false },
  ])

  return (
    <div className='mb-4 bg-white border rounded-lg border-slate-200 overflow-hidden'>
      {/* Desktop View */}
      <div className='hidden md:block relative'>
        {/* Left Arrow */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-slate-600/80 rounded-full flex items-center justify-center hover:bg-slate-700/80">
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8">
            <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5 5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
          </svg>
        </button>
        <div className='grid grid-cols-4'>
          {stories.map((story) => (
            <div key={story.id} className='relative aspect-[3/4] overflow-hidden cursor-pointer group'>
              <img src={story.image} alt={story.name} className='w-full h-full object-cover' />
              {story.isOwn ? (
                <div className='absolute inset-0 bg-black/20 flex flex-col items-center justify-end pb-6'>
                  <button className='w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center mb-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                      <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                    </svg>
                  </button>
                  <p className='text-sm font-medium text-white'>Your Story</p>
                </div>
              ) : (
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-3'>
                  {story.hasStory && (
                    <div className='absolute top-3 left-3'>
                      <div className='w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500'>
                        <img src="/assets/images/mini_pic.png" alt="" className='w-full h-full object-cover' />
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
      <div className='md:hidden p-4'>
        <div className='flex gap-3 overflow-x-auto pb-2'>
          {stories.map((story) => (
            <div key={story.id} className='flex-shrink-0 text-center'>
              <div className={`w-16 h-16 rounded-full overflow-hidden ${story.hasStory ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                <img src={story.image} alt={story.name} className='w-full h-full object-cover' />
                {story.isOwn && (
                  <div className='relative'>
                    <button className='absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className='w-16 mt-1 text-xs truncate text-slate-600'>
                {story.isOwn ? 'Your Story' : story.name.split(' ')[0] + '...'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { apiClient } from '@/lib/apiClient'

interface PostLikersModalProps {
  postId: number
  onClose: () => void
}

export function PostLikersModal({ postId, onClose }: PostLikersModalProps) {
  const [likers, setLikers] = useState<
    { id: number; firstName: string; lastName: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useState(() => {
    const fetchLikers = async () => {
      try {
        const response = await apiClient.getPostLikers(postId)
        if (response.success && response.data) {
          setLikers(response.data)
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false)
      }
    }
    fetchLikers()
  })

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-sm mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between p-4 border-b border-slate-200'>
          <h3 className='text-lg font-semibold text-slate-900'>Likes</h3>
          <button
            onClick={onClose}
            className='text-slate-400 hover:text-slate-600 cursor-pointer'
          >
            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='max-h-80 overflow-y-auto p-4'>
          {isLoading ? (
            <div className='flex justify-center py-4'>
              <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
            </div>
          ) : likers.length === 0 ? (
            <p className='text-slate-500 text-center py-4'>No likes yet</p>
          ) : (
            <div className='space-y-3'>
              {likers.map((liker) => (
                <div key={liker.id} className='flex items-center gap-3'>
                  <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium'>
                    {liker.firstName[0]}
                    {liker.lastName[0]}
                  </div>
                  <span className='text-sm font-medium text-slate-900'>
                    {liker.firstName} {liker.lastName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

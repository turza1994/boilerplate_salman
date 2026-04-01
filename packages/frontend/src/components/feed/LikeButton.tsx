import { useState } from 'react'

interface LikeButtonProps {
  isLiked: boolean
  likeCount: number
  onToggle: (liked: boolean) => void
  onShowLikers: () => void
  disabled?: boolean
}

export function LikeButton({
  isLiked,
  likeCount,
  onToggle,
  onShowLikers,
  disabled = false,
}: LikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (disabled || isLoading) return
    setIsLoading(true)
    onToggle(!isLiked)
    setIsLoading(false)
  }

  return (
    <div className='flex items-center gap-1'>
      <button
        onClick={handleClick}
        disabled={disabled || isLoading}
        className='flex items-center gap-1 cursor-pointer transition-colors duration-200 motion-reduce:transition-none disabled:opacity-50'
      >
        <svg
          className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-slate-500'}`}
          viewBox='0 0 24 24'
          fill={isLiked ? 'currentColor' : 'none'}
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
          />
        </svg>
      </button>
      {likeCount > 0 && (
        <button
          onClick={onShowLikers}
          className='text-sm text-slate-500 hover:text-slate-700 cursor-pointer'
        >
          {likeCount}
        </button>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Post } from '@/types/post'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/apiClient'
import { CommentsSection } from './CommentsSection'
import { PostLikersModal } from './PostLikersModal'

interface PostCardProps {
  post: Post
  onUpdate: () => void
}

export function PostCard({ post, onUpdate }: PostCardProps) {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [editVisibility, setEditVisibility] = useState<'public' | 'private'>(
    post.visibility,
  )
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const [showLikers, setShowLikers] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = user?.id === post.userId

  const handleToggleLike = (liked: boolean) => {
    setIsLiked(liked)
    setLikeCount((prev) => (liked ? prev + 1 : prev - 1))
    apiClient.togglePostLike(post.id).catch(() => {
      setIsLiked(!liked)
      setLikeCount((prev) => (!liked ? prev + 1 : prev - 1))
    })
  }

  const handleEdit = async () => {
    try {
      await apiClient.updatePost(post.id, {
        content: editContent,
        visibility: editVisibility,
      })
      setIsEditing(false)
      onUpdate()
    } catch {
      // ignore
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return
    setIsDeleting(true)
    try {
      await apiClient.deletePost(post.id)
      onUpdate()
    } catch {
      setIsDeleting(false)
    }
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

  return (
    <div className='mb-4 transition-all duration-300 bg-white border rounded-lg border-slate-200 post-card hover:shadow-lg hover:-translate-y-1'>
      {/* Post Header */}
      <div className='flex items-start justify-between p-6 pb-4'>
        <div className='flex items-center gap-3'>
          <img
            src='/assets/images/post_img.png'
            alt='Author'
            className='object-cover w-10 h-10 rounded-full'
          />
          <div>
            <h3 className='font-semibold text-slate-900'>
              {post.author.firstName} {post.author.lastName}
            </h3>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-slate-500'>
                {formatTime(post.createdAt)}
              </span>
              <span className='text-slate-400'>.</span>
              <a href='#0' className='text-sm text-blue-600 hover:underline'>
                {post.visibility}
              </a>
            </div>
          </div>
        </div>

        {isOwner && (
          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='p-1 cursor-pointer text-slate-400 hover:text-slate-600'
            >
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
            {showMenu && (
              <div className='absolute right-0 z-10 w-48 py-1 bg-white border rounded-lg shadow-lg top-8 border-slate-200'>
                <button
                  onClick={() => setShowMenu(false)}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='#1890FF'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.2'
                      d='M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z'
                    />
                  </svg>
                  Save Post
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='22'
                    fill='none'
                    viewBox='0 0 20 22'
                  >
                    <path
                      fill='#377DFF'
                      fillRule='evenodd'
                      d='M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Turn On Notification
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='#1890FF'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.2'
                      d='M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5'
                    />
                  </svg>
                  Hide
                </button>
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setShowMenu(false)
                  }}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='#1890FF'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.2'
                      d='M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75'
                    />
                    <path
                      stroke='#1890FF'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.2'
                      d='M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z'
                    />
                  </svg>
                  Edit Post
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  disabled={isDeleting}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 disabled:opacity-50'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    fill='none'
                    viewBox='0 0 18 18'
                  >
                    <path
                      stroke='#1890FF'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.2'
                      d='M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5'
                    />
                  </svg>
                  {isDeleting ? 'Deleting...' : 'Delete Post'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className='px-6'>
        {isEditing ? (
          <div className='mb-4'>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className='w-full px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={3}
            />
            <div className='flex items-center gap-2 mt-2'>
              <select
                value={editVisibility}
                onChange={(e) =>
                  setEditVisibility(e.target.value as 'public' | 'private')
                }
                className='px-2 py-1 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='public'>Public</option>
                <option value='private'>Private</option>
              </select>
              <button
                onClick={handleEdit}
                className='text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700'
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditContent(post.content)
                  setEditVisibility(post.visibility)
                }}
                className='text-sm cursor-pointer text-slate-500 hover:text-slate-700'
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h4 className='mb-4 text-lg font-medium text-slate-900'>
            {post.content}
          </h4>
        )}
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className='px-6 mb-4'>
          <img
            src={`${API_BASE_URL}${post.imageUrl}`}
            alt='Post image'
            className='object-cover w-full rounded-lg max-h-96'
            loading='lazy'
          />
        </div>
      )}

      {/* Post Stats */}
      <div className='flex items-center justify-between px-6 py-3 border-t border-slate-200'>
        <div className='flex items-center gap-2'>
          <div className='flex -space-x-1'>
            <img
              src='/assets/images/react_img1.png'
              alt=''
              className='w-6 h-6 border-2 border-white rounded-full'
            />
            <img
              src='/assets/images/react_img2.png'
              alt=''
              className='w-6 h-6 border-2 border-white rounded-full'
            />
            <img
              src='/assets/images/react_img3.png'
              alt=''
              className='w-6 h-6 border-2 border-white rounded-full'
            />
          </div>
          <span className='text-sm text-slate-600'>{likeCount}</span>
        </div>
        <div className='flex items-center gap-4 text-sm text-slate-600'>
          <span>{post.commentCount} Comment</span>
          <span>0 Share</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className='flex items-center border-t border-slate-200'>
        {/* Like Button */}
        <button
          onClick={() => handleToggleLike(!isLiked)}
          className={`flex items-center justify-center flex-1 gap-2 py-3 text-sm transition-all duration-200 like-button ${
            isLiked
              ? 'text-red-500 bg-red-50 liked'
              : 'text-slate-600 hover:bg-slate-50 hover:text-red-500'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill={isLiked ? 'currentColor' : 'none'}
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            className={`transition-transform duration-200 ${isLiked ? 'scale-110' : 'scale-100'}`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
            />
          </svg>
          {isLiked ? 'Liked' : 'Like'}
        </button>

        {/* Comment Button */}
        <button className='flex items-center justify-center flex-1 gap-2 py-3 text-sm transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-blue-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='21'
            height='21'
            fill='none'
            viewBox='0 0 21 21'
          >
            <path
              stroke='#000'
              d='M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z'
            />
            <path
              stroke='#000'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.938 9.313h7.125M10.5 14.063h3.563'
            />
          </svg>
          Comment
        </button>

        {/* Share Button */}
        <button className='flex items-center justify-center flex-1 gap-2 py-3 text-sm transition-all duration-200 text-slate-600 hover:bg-slate-50 hover:text-green-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='21'
            fill='none'
            viewBox='0 0 24 21'
          >
            <path
              stroke='#000'
              strokeLinejoin='round'
              d='M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z'
            />
          </svg>
          Share
        </button>
      </div>

      {/* Comments Section */}
      <div className='px-6 py-4 border-t border-slate-200'>
        <CommentsSection
          postId={post.id}
          initialCommentCount={post.commentCount}
          onUpdate={onUpdate}
        />
      </div>

      {showLikers && (
        <PostLikersModal
          postId={post.id}
          onClose={() => setShowLikers(false)}
        />
      )}
    </div>
  )
}

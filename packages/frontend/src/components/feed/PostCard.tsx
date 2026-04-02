import { useState } from 'react'
import { Post } from '@/types/post'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/apiClient'
import { LikeButton } from './LikeButton'
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
    <div className='mb-4 bg-white border rounded-lg border-slate-200'>
      {/* Post Header */}
      <div className='flex items-start justify-between p-6 pb-4'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center justify-center w-10 h-10 font-medium text-blue-600 bg-blue-100 rounded-full'>
            {post.author.firstName[0]}
            {post.author.lastName[0]}
          </div>
          <div>
            <h3 className='font-semibold text-slate-900'>
              {post.author.firstName} {post.author.lastName}
            </h3>
            <div className='flex items-center gap-2'>
              <span className='text-sm text-slate-500'>
                {formatTime(post.createdAt)}
              </span>
              <span className='text-slate-400'>·</span>
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
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
                />
              </svg>
            </button>
            {showMenu && (
              <div className='absolute right-0 z-10 w-48 py-1 bg-white border rounded-lg shadow-lg top-8 border-slate-200'>
                <button
                  onClick={() => {
                    setShowMenu(false)
                  }}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    className='w-4 h-4'
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
                  Save Post
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                  }}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                  Turn On Notification
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                  }}
                  className='flex items-center w-full gap-3 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-50'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
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
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
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
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
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
            <div className='flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full'>
              <span className='text-xs'>👍</span>
            </div>
            <div className='flex items-center justify-center w-6 h-6 bg-red-400 rounded-full'>
              <span className='text-xs'>❤️</span>
            </div>
            <div className='flex items-center justify-center w-6 h-6 bg-yellow-300 rounded-full'>
              <span className='text-xs'>😂</span>
            </div>
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
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          onToggle={handleToggleLike}
          onShowLikers={() => setShowLikers(true)}
        />
        <button className='flex items-center justify-center flex-1 gap-2 py-3 text-sm text-slate-600 hover:bg-slate-50'>
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
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
          Comment
        </button>
        <button className='flex items-center justify-center flex-1 gap-2 py-3 text-sm text-slate-600 hover:bg-slate-50'>
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
              d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
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

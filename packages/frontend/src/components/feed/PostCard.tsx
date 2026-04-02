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
    <div className='p-4 mb-4 bg-white border rounded-lg border-slate-200'>
      <div className='flex items-start justify-between mb-3'>
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
              <span className='text-xs text-slate-500'>
                {formatTime(post.createdAt)}
              </span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  post.visibility === 'public'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {post.visibility}
              </span>
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
              <div className='absolute right-0 z-10 w-32 py-1 bg-white border rounded-lg shadow-lg top-8 border-slate-200'>
                <button
                  onClick={() => {
                    setIsEditing(true)
                    setShowMenu(false)
                  }}
                  className='w-full px-4 py-2 text-sm text-left cursor-pointer text-slate-700 hover:bg-slate-100'
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false)
                    handleDelete()
                  }}
                  disabled={isDeleting}
                  className='w-full px-4 py-2 text-sm text-left text-red-600 cursor-pointer hover:bg-red-50 disabled:opacity-50'
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className='mb-3'>
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
        <p className='mb-3 whitespace-pre-wrap text-slate-800'>
          {post.content}
        </p>
      )}

      {post.imageUrl && (
        <div className='mb-3'>
          <img
            src={`${API_BASE_URL}${post.imageUrl}`}
            alt='Post image'
            className='object-cover w-full rounded-lg max-h-96'
            loading='lazy'
          />
        </div>
      )}

      <div className='flex items-center gap-4'>
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          onToggle={handleToggleLike}
          onShowLikers={() => setShowLikers(true)}
        />
        <div className='flex items-center gap-1 text-sm text-slate-500'>
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
          {post.commentCount}
        </div>
      </div>

      <CommentsSection
        postId={post.id}
        initialCommentCount={post.commentCount}
        onUpdate={onUpdate}
      />

      {showLikers && (
        <PostLikersModal
          postId={post.id}
          onClose={() => setShowLikers(false)}
        />
      )}
    </div>
  )
}

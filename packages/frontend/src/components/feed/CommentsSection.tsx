import { useState, useEffect } from 'react'
import { Comment } from '@/types/post'
import { apiClient } from '@/lib/apiClient'
import { useAuth } from '@/contexts/AuthContext'
import { LikeButton } from './LikeButton'

interface CommentsSectionProps {
  postId: number
  initialCommentCount: number
  onUpdate?: () => void
}

export function CommentsSection({
  postId,
  initialCommentCount,
  onUpdate,
}: CommentsSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showLikers, setShowLikers] = useState<{
    type: 'comment' | 'reply'
    id: number
  } | null>(null)
  const [likers, setLikers] = useState<
    { id: number; firstName: string; lastName: string }[]
  >([])

  const loadComments = async () => {
    try {
      const response = await apiClient.getComments(postId)
      if (response.success && response.data) {
        setComments(response.data)
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (isExpanded && comments.length === 0) {
      loadComments()
    }
  }, [isExpanded])

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    setIsLoading(true)
    try {
      const response = await apiClient.createComment(postId, {
        content: newComment,
      })
      if (response.success && response.data) {
        setComments((prev) => [response.data!, ...prev])
        setNewComment('')
        onUpdate?.()
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  const handleReply = async (parentId: number) => {
    if (!replyContent.trim()) return
    setIsLoading(true)
    try {
      const response = await apiClient.replyToComment(parentId, {
        content: replyContent,
      })
      if (response.success && response.data) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === parentId
              ? { ...c, replies: [...c.replies, response.data!] }
              : c,
          ),
        )
        setReplyContent('')
        setReplyTo(null)
        onUpdate?.()
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await apiClient.deleteComment(commentId)
      setComments((prev) => prev.filter((c) => c.id !== commentId))
    } catch {
      // ignore
    }
  }

  const handleDeleteReply = async (commentId: number, replyId: number) => {
    try {
      await apiClient.deleteComment(replyId)
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
            : c,
        ),
      )
    } catch {
      // ignore
    }
  }

  const handleToggleCommentLike = async (commentId: number) => {
    try {
      const response = await apiClient.toggleCommentLike(commentId)
      if (response.success && response.data) {
        const { liked } = response.data
        setComments((prev) =>
          prev.map((c) => {
            if (c.id === commentId) {
              return {
                ...c,
                isLiked: liked,
                likeCount: liked ? c.likeCount + 1 : c.likeCount - 1,
              }
            }
            return {
              ...c,
              replies: c.replies.map((r) => {
                if (r.id === commentId) {
                  return {
                    ...r,
                    isLiked: liked,
                    likeCount: liked ? r.likeCount + 1 : r.likeCount - 1,
                  }
                }
                return r
              }),
            }
          }),
        )
      }
    } catch {
      // ignore
    }
  }

  const handleShowLikers = async (type: 'comment' | 'reply', id: number) => {
    setShowLikers({ type, id })
    try {
      const response = await apiClient.getCommentLikers(id)
      if (response.success && response.data) {
        setLikers(response.data)
      }
    } catch {
      setLikers([])
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
    return `${diffDays}d ago`
  }

  return (
    <div className='pt-3 mt-3 border-t border-slate-100'>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className='text-sm text-blue-600 cursor-pointer hover:text-blue-700'
        >
          {initialCommentCount > 0
            ? `View ${initialCommentCount} comment${initialCommentCount !== 1 ? 's' : ''}`
            : 'Add a comment'}
        </button>
      ) : (
        <div className='space-y-3'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Write a comment...'
              className='flex-1 px-3 py-2 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleAddComment()
                }
              }}
            />
            <button
              onClick={handleAddComment}
              disabled={isLoading || !newComment.trim()}
              className='text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700 disabled:opacity-50'
            >
              Post
            </button>
          </div>

          <div className='space-y-3'>
            {comments.map((comment) => (
              <div key={comment.id} className='space-y-2'>
                <div className='flex gap-2'>
                  <div className='flex items-center justify-center flex-shrink-0 text-xs font-medium text-blue-600 bg-blue-100 rounded-full w-7 h-7'>
                    {comment.author.firstName[0]}
                    {comment.author.lastName[0]}
                  </div>
                  <div className='flex-1'>
                    <div className='px-3 py-2 rounded-lg bg-slate-100'>
                      <span className='text-sm font-medium text-slate-900'>
                        {comment.author.firstName} {comment.author.lastName}
                      </span>
                      <p className='text-sm text-slate-700'>
                        {comment.content}
                      </p>
                    </div>
                    <div className='flex items-center gap-3 px-1 mt-1'>
                      <span className='text-xs text-slate-400'>
                        {formatTime(comment.createdAt)}
                      </span>
                      <button
                        onClick={() =>
                          setReplyTo(replyTo === comment.id ? null : comment.id)
                        }
                        className='text-xs font-medium cursor-pointer text-slate-500 hover:text-slate-700'
                      >
                        Reply
                      </button>
                      <LikeButton
                        isLiked={comment.isLiked}
                        likeCount={comment.likeCount}
                        onToggle={() => handleToggleCommentLike(comment.id)}
                        onShowLikers={() =>
                          handleShowLikers('comment', comment.id)
                        }
                      />
                      {user?.id === comment.userId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className='text-xs text-red-500 cursor-pointer hover:text-red-700'
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    {replyTo === comment.id && (
                      <div className='flex gap-2 mt-2'>
                        <input
                          type='text'
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder='Write a reply...'
                          className='flex-1 text-sm border border-slate-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleReply(comment.id)
                            }
                          }}
                          autoFocus
                        />
                        <button
                          onClick={() => handleReply(comment.id)}
                          disabled={isLoading || !replyContent.trim()}
                          className='text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700 disabled:opacity-50'
                        >
                          Reply
                        </button>
                      </div>
                    )}

                    {comment.replies.length > 0 && (
                      <div className='mt-2 ml-4 space-y-2'>
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className='flex gap-2'>
                            <div className='flex items-center justify-center flex-shrink-0 w-6 h-6 text-xs font-medium rounded-full bg-slate-200 text-slate-600'>
                              {reply.author.firstName[0]}
                              {reply.author.lastName[0]}
                            </div>
                            <div className='flex-1'>
                              <div className='px-3 py-2 rounded-lg bg-slate-50'>
                                <span className='text-sm font-medium text-slate-900'>
                                  {reply.author.firstName}{' '}
                                  {reply.author.lastName}
                                </span>
                                <p className='text-sm text-slate-700'>
                                  {reply.content}
                                </p>
                              </div>
                              <div className='flex items-center gap-3 px-1 mt-1'>
                                <span className='text-xs text-slate-400'>
                                  {formatTime(reply.createdAt)}
                                </span>
                                <LikeButton
                                  isLiked={reply.isLiked}
                                  likeCount={reply.likeCount}
                                  onToggle={() =>
                                    handleToggleCommentLike(reply.id)
                                  }
                                  onShowLikers={() =>
                                    handleShowLikers('reply', reply.id)
                                  }
                                />
                                {user?.id === reply.userId && (
                                  <button
                                    onClick={() =>
                                      handleDeleteReply(comment.id, reply.id)
                                    }
                                    className='text-xs text-red-500 cursor-pointer hover:text-red-700'
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(false)}
            className='text-sm cursor-pointer text-slate-400 hover:text-slate-600'
          >
            Hide comments
          </button>
        </div>
      )}

      {showLikers && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
          onClick={() => {
            setShowLikers(null)
            setLikers([])
          }}
        >
          <div
            className='w-full max-w-sm mx-4 bg-white rounded-lg shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex items-center justify-between p-4 border-b border-slate-200'>
              <h3 className='text-lg font-semibold text-slate-900'>Likes</h3>
              <button
                onClick={() => {
                  setShowLikers(null)
                  setLikers([])
                }}
                className='cursor-pointer text-slate-400 hover:text-slate-600'
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='p-4 overflow-y-auto max-h-80'>
              {likers.length === 0 ? (
                <p className='py-4 text-center text-slate-500'>No likes yet</p>
              ) : (
                <div className='space-y-3'>
                  {likers.map((liker) => (
                    <div key={liker.id} className='flex items-center gap-3'>
                      <div className='flex items-center justify-center w-8 h-8 text-sm font-medium text-blue-600 bg-blue-100 rounded-full'>
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
      )}
    </div>
  )
}

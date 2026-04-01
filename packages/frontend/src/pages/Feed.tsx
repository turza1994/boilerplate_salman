import { useState, useEffect, useCallback } from 'react'
import { useRequireAuth } from '@/hooks/useAuth'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/apiClient'
import { Post } from '@/types/post'
import { CreatePostForm } from '@/components/feed/CreatePostForm'
import { PostCard } from '@/components/feed/PostCard'
import { Button } from '@/components/ui/button'

export default function FeedPage() {
  const { isLoading: authLoading } = useRequireAuth()
  const { user, logout } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [cursor, setCursor] = useState<number | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPosts = useCallback(
    async (reset = false) => {
      if (reset) {
        setIsLoading(true)
        setPosts([])
        setCursor(null)
        setHasMore(true)
      } else {
        setIsLoadingMore(true)
      }

      try {
        const currentCursor = reset ? null : cursor
        const response = await apiClient.getFeed(currentCursor, 10)

        if (response.success && response.data) {
          const { posts: newPosts, nextCursor } = response.data

          if (reset) {
            setPosts(newPosts)
          } else {
            setPosts((prev) => [...prev, ...newPosts])
          }

          setCursor(nextCursor)
          setHasMore(nextCursor !== null)
        } else {
          throw new Error(response.message || 'Failed to load posts')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts')
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [cursor],
  )

  useEffect(() => {
    if (!authLoading) {
      loadPosts(true)
    }
  }, [authLoading])

  const handlePostCreated = () => {
    loadPosts(true)
  }

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      loadPosts(false)
    }
  }

  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <header className='bg-white border-b border-slate-200 sticky top-0 z-40'>
        <div className='max-w-2xl mx-auto flex items-center justify-between px-4 py-3'>
          <h1 className='text-xl font-bold text-slate-900'>Feed</h1>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-medium'>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </div>
              <span className='text-sm font-medium text-slate-700 hidden sm:block'>
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={logout}
              className='text-slate-600 hover:text-slate-900 cursor-pointer'
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className='max-w-2xl mx-auto px-4 py-6'>
        <CreatePostForm onPostCreated={handlePostCreated} />

        {error && (
          <div className='mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3'>
            {error}
            <button
              onClick={() => {
                setError(null)
                loadPosts(true)
              }}
              className='ml-2 text-red-700 underline cursor-pointer'
            >
              Retry
            </button>
          </div>
        )}

        {isLoading ? (
          <div className='flex justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        ) : posts.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-slate-500'>No posts yet. Be the first to post!</p>
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={() => loadPosts(true)} />
            ))}

            {hasMore && (
              <div className='flex justify-center py-4'>
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  isLoading={isLoadingMore}
                  variant='outline'
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

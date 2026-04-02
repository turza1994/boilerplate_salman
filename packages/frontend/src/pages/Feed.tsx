import { useState, useEffect, useCallback } from 'react'
import { useRequireAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/apiClient'
import { Post } from '@/types/post'
import { CreatePostForm } from '@/components/feed/CreatePostForm'
import { PostCard } from '@/components/feed/PostCard'
import { PostSkeleton } from '@/components/feed/PostSkeleton'
import { FeedLayout } from '@/components/feed/FeedLayout'
import { FeedHeader } from '@/components/feed/FeedHeader'
import { LeftSidebar } from '@/components/feed/LeftSidebar'
import { RightSidebar } from '@/components/feed/RightSidebar'
import { StoriesSection } from '@/components/feed/StoriesSection'
import { MobileBottomNav } from '@/components/feed/MobileBottomNav'
import { Button } from '@/components/ui/button'
import '@/styles/feed-design.css'

export default function FeedPage() {
  const { isLoading: authLoading } = useRequireAuth()
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
      <div className='flex items-center justify-center min-h-screen'>
        <div className='w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin'></div>
      </div>
    )
  }

  const mainContent = (
    <>
      <StoriesSection />
      <CreatePostForm onPostCreated={handlePostCreated} />

      {error && (
        <div className='px-4 py-3 mb-4 text-sm text-red-600 border border-red-200 rounded-md bg-red-50'>
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
        <div className='space-y-4'>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      ) : posts.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-slate-500'>No posts yet. Be the first to post!</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpdate={() => loadPosts(true)}
            />
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
    </>
  )

  return (
    <FeedLayout
      header={<FeedHeader />}
      leftSidebar={<LeftSidebar />}
      mainContent={mainContent}
      rightSidebar={<RightSidebar />}
      mobileBottomNav={<MobileBottomNav />}
    />
  )
}

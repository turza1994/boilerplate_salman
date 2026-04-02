export function PostSkeleton() {
  return (
    <div className='mb-4 bg-white border rounded-lg border-slate-200 animate-pulse'>
      {/* Post Header Skeleton */}
      <div className='flex items-start justify-between p-6 pb-4'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 rounded-full bg-slate-200' />
          <div>
            <div className='w-32 h-4 mb-2 rounded bg-slate-200' />
            <div className='w-20 h-3 rounded bg-slate-200' />
          </div>
        </div>
      </div>

      {/* Post Content Skeleton */}
      <div className='px-6'>
        <div className='w-full h-4 mb-2 rounded bg-slate-200' />
        <div className='w-3/4 h-4 mb-4 rounded bg-slate-200' />
      </div>

      {/* Post Image Skeleton */}
      <div className='px-6 mb-4'>
        <div className='w-full h-48 rounded-lg bg-slate-200' />
      </div>

      {/* Post Stats Skeleton */}
      <div className='flex items-center justify-between px-6 py-3 border-t border-slate-200'>
        <div className='flex items-center gap-2'>
          <div className='flex -space-x-1'>
            <div className='w-6 h-6 border-2 border-white rounded-full bg-slate-200' />
            <div className='w-6 h-6 border-2 border-white rounded-full bg-slate-200' />
            <div className='w-6 h-6 border-2 border-white rounded-full bg-slate-200' />
          </div>
          <div className='w-8 h-4 rounded bg-slate-200' />
        </div>
        <div className='flex items-center gap-4'>
          <div className='w-20 h-4 rounded bg-slate-200' />
          <div className='w-16 h-4 rounded bg-slate-200' />
        </div>
      </div>

      {/* Post Actions Skeleton */}
      <div className='flex items-center border-t border-slate-200'>
        <div className='flex items-center justify-center flex-1 gap-2 py-3'>
          <div className='w-5 h-5 rounded bg-slate-200' />
          <div className='w-12 h-4 rounded bg-slate-200' />
        </div>
        <div className='flex items-center justify-center flex-1 gap-2 py-3'>
          <div className='w-5 h-5 rounded bg-slate-200' />
          <div className='w-16 h-4 rounded bg-slate-200' />
        </div>
        <div className='flex items-center justify-center flex-1 gap-2 py-3'>
          <div className='w-5 h-5 rounded bg-slate-200' />
          <div className='w-12 h-4 rounded bg-slate-200' />
        </div>
      </div>
    </div>
  )
}

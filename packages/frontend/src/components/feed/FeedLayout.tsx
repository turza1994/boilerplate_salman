import { ReactNode } from 'react'

interface FeedLayoutProps {
  header: ReactNode
  leftSidebar: ReactNode
  mainContent: ReactNode
  rightSidebar: ReactNode
  mobileBottomNav: ReactNode
}

export function FeedLayout({
  header,
  leftSidebar,
  mainContent,
  rightSidebar,
  mobileBottomNav,
}: FeedLayoutProps) {
  return (
    <div className='min-h-screen bg-slate-50'>
      {header}
      <div className='container px-4 py-6 mx-auto'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-12'>
          {/* Left Sidebar - Hidden on mobile */}
          <aside className='hidden lg:block lg:col-span-3'>{leftSidebar}</aside>

          {/* Main Content */}
          <main className='col-span-1 lg:col-span-6'>{mainContent}</main>

          {/* Right Sidebar - Hidden on mobile and tablet */}
          <aside className='hidden xl:block xl:col-span-3'>
            {rightSidebar}
          </aside>
        </div>
      </div>
      {mobileBottomNav}
    </div>
  )
}

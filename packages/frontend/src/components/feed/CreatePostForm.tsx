import { useState, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/apiClient'

interface CreatePostFormProps {
  onPostCreated: () => void
}

export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    if (!content.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      let imageUrl: string | null = null

      if (imageFile) {
        const uploadResponse = await apiClient.uploadImage(imageFile)
        if (uploadResponse.success && uploadResponse.data) {
          imageUrl = uploadResponse.data.url
        } else {
          throw new Error('Failed to upload image')
        }
      }

      const response = await apiClient.createPost({
        content,
        visibility,
        imageUrl,
      })

      if (response.success) {
        setContent('')
        setVisibility('public')
        setImageFile(null)
        setImagePreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        onPostCreated()
      } else {
        throw new Error(response.message || 'Failed to create post')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-6 mb-4 bg-white border rounded-lg border-slate-200'>
      <div className='flex gap-4'>
        <div className='flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full'>
          <svg
            className='w-5 h-5 text-blue-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
            />
          </svg>
        </div>
        <div className='flex-1'>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Write something ...'
            className='mb-4 border-0 resize-none focus:ring-0 focus:border-0'
            rows={3}
          />

          {imagePreview && (
            <div className='relative mb-4'>
              <img
                src={imagePreview}
                alt='Preview'
                className='object-cover w-full rounded-lg max-h-64'
              />
              <button
                onClick={removeImage}
                className='absolute flex items-center justify-center w-6 h-6 text-white rounded-full cursor-pointer top-2 right-2 bg-black/50 hover:bg-black/70'
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
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          )}

          {error && (
            <div className='px-3 py-2 mb-4 text-sm text-red-600 border border-red-200 rounded-md bg-red-50'>
              {error}
            </div>
          )}
        </div>
      </div>

      <div className='flex items-center justify-between pt-4 border-t border-slate-200'>
        <div className='flex items-center gap-4'>
          {/* Photo */}
          <div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/jpeg,image/png,image/gif,image/webp'
              onChange={handleImageChange}
              className='hidden'
              id='image-upload'
            />
            <label
              htmlFor='image-upload'
              className='flex items-center gap-2 text-sm cursor-pointer text-slate-600 hover:text-blue-600'
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
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              Photo
            </label>
          </div>

          {/* Video */}
          <button className='flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600'>
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
                d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
              />
            </svg>
            Video
          </button>

          {/* Event */}
          <button className='flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600'>
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
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            Event
          </button>

          {/* Article */}
          <button className='flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600'>
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
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            Article
          </button>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !content.trim()}
          isLoading={isLoading}
          className='flex items-center gap-2 bg-blue-600 hover:bg-blue-700'
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
              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
            />
          </svg>
          Post
        </Button>
      </div>
    </div>
  )
}

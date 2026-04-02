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
    <div className='p-4 mb-4 bg-white border rounded-lg border-slate-200'>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className='mb-3'
        rows={3}
      />

      {imagePreview && (
        <div className='relative mb-3'>
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
        <div className='px-3 py-2 mb-3 text-sm text-red-600 border border-red-200 rounded-md bg-red-50'>
          {error}
        </div>
      )}

      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
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
            className='flex items-center gap-1 text-sm cursor-pointer text-slate-600 hover:text-slate-800'
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

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as 'public' | 'private')
            }
            className='px-2 py-1 text-sm border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='public'>Public</option>
            <option value='private'>Private</option>
          </select>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !content.trim()}
          isLoading={isLoading}
          className='bg-blue-600 hover:bg-blue-700'
        >
          Post
        </Button>
      </div>
    </div>
  )
}

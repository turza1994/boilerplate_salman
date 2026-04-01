export interface PostAuthor {
  id: number
  firstName: string
  lastName: string
}

export interface Post {
  id: number
  userId: number
  content: string
  imageUrl: string | null
  visibility: 'public' | 'private'
  createdAt: string
  updatedAt: string
  author: PostAuthor
  likeCount: number
  commentCount: number
  isLiked: boolean
}

export interface FeedResponse {
  posts: Post[]
  nextCursor: number | null
}

export interface Comment {
  id: number
  postId: number
  userId: number
  parentId: number | null
  content: string
  createdAt: string
  updatedAt: string
  author: PostAuthor
  likeCount: number
  isLiked: boolean
  replies: Comment[]
}

export interface Liker {
  id: number
  firstName: string
  lastName: string
}

export interface CreatePostData {
  content: string
  visibility: 'public' | 'private'
}

export interface CreateCommentData {
  content: string
  parentId?: number
}

export interface ReplyData {
  content: string
}

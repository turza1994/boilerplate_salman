import {
  createPost as createPostRepo,
  getPostById,
  getPostWithDetails,
  getFeedPosts,
  updatePost as updatePostRepo,
  deletePost as deletePostRepo,
} from '../repositories/postRepository.js';

export async function createPost(
  userId: number,
  content: string,
  imageUrl: string | null,
  visibility: 'public' | 'private'
) {
  const post = await createPostRepo(userId, content, imageUrl, visibility);
  if (!post) {
    throw new Error('Failed to create post');
  }
  return getPostWithDetails(post.id, userId);
}

export async function getPost(id: number, currentUserId: number) {
  const post = await getPostWithDetails(id, currentUserId);
  if (!post) {
    throw new Error('Post not found');
  }

  if (post.visibility === 'private' && post.userId !== currentUserId) {
    throw new Error('Post not found');
  }

  return post;
}

export async function getFeed(
  currentUserId: number,
  cursor: number | null,
  limit: number
) {
  return getFeedPosts(currentUserId, cursor, limit);
}

export async function updatePost(
  id: number,
  userId: number,
  data: { content?: string; visibility?: 'public' | 'private' }
) {
  const existingPost = await getPostById(id);
  if (!existingPost) {
    throw new Error('Post not found');
  }
  if (existingPost.userId !== userId) {
    throw new Error('Not authorized to update this post');
  }

  const updated = await updatePostRepo(id, userId, data);
  if (!updated) {
    throw new Error('Failed to update post');
  }
  return getPostWithDetails(updated.id, userId);
}

export async function deletePost(id: number, userId: number) {
  const existingPost = await getPostById(id);
  if (!existingPost) {
    throw new Error('Post not found');
  }
  if (existingPost.userId !== userId) {
    throw new Error('Not authorized to delete this post');
  }

  await deletePostRepo(id, userId);
}

import {
  createComment as createCommentRepo,
  getCommentsByPostId,
  getCommentById,
  deleteComment as deleteCommentRepo,
} from '../repositories/commentRepository.js';

export async function createComment(
  postId: number,
  userId: number,
  content: string,
  parentId?: number
) {
  if (parentId) {
    const parent = await getCommentById(parentId);
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (!parent || parent.postId !== postId) {
      throw new Error('Parent comment not found');
    }
  }

  const comment = await createCommentRepo(
    postId,
    userId,
    content,
    parentId ?? null
  );

  return {
    ...comment,
    likeCount: 0,
    isLiked: false,
    replies: [],
  };
}

export async function getComments(postId: number, currentUserId: number) {
  return getCommentsByPostId(postId, currentUserId);
}

export async function deleteComment(id: number, userId: number) {
  const existing = await getCommentById(id);
  if (!existing) {
    throw new Error('Comment not found');
  }
  if (existing.userId !== userId) {
    throw new Error('Not authorized to delete this comment');
  }

  await deleteCommentRepo(id, userId);
}

export async function replyToComment(
  parentId: number,
  userId: number,
  content: string
) {
  const parent = await getCommentById(parentId);
  if (!parent) {
    throw new Error('Parent comment not found');
  }

  const comment = await createCommentRepo(
    parent.postId,
    userId,
    content,
    parentId
  );

  return {
    ...comment,
    likeCount: 0,
    isLiked: false,
    replies: [],
  };
}

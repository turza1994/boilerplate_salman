import {
  togglePostLike as togglePostLikeRepo,
  toggleCommentLike as toggleCommentLikeRepo,
  getPostLikers as getPostLikersRepo,
  getCommentLikers as getCommentLikersRepo,
} from '../repositories/likeRepository.js';

export async function toggleLike(postId: number, userId: number) {
  return togglePostLikeRepo(postId, userId);
}

export async function toggleCommentLike(commentId: number, userId: number) {
  return toggleCommentLikeRepo(commentId, userId);
}

export async function getPostLikers(postId: number) {
  return getPostLikersRepo(postId);
}

export async function getCommentLikers(commentId: number) {
  return getCommentLikersRepo(commentId);
}

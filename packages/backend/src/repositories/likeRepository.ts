import { eq, and } from 'drizzle-orm';
import { db } from '../db/client.js';
import { postLikes, commentLikes, users } from '../models/index.js';

export async function togglePostLike(postId: number, userId: number) {
  const existing = await db
    .select()
    .from(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
    return { liked: false };
  }

  await db.insert(postLikes).values({ postId, userId });
  return { liked: true };
}

export async function toggleCommentLike(commentId: number, userId: number) {
  const existing = await db
    .select()
    .from(commentLikes)
    .where(
      and(eq(commentLikes.commentId, commentId), eq(commentLikes.userId, userId))
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(commentLikes)
      .where(
        and(eq(commentLikes.commentId, commentId), eq(commentLikes.userId, userId))
      );
    return { liked: false };
  }

  await db.insert(commentLikes).values({ commentId, userId });
  return { liked: true };
}

export async function getPostLikers(postId: number) {
  return db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(postLikes)
    .leftJoin(users, eq(postLikes.userId, users.id))
    .where(eq(postLikes.postId, postId));
}

export async function getCommentLikers(commentId: number) {
  return db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
    })
    .from(commentLikes)
    .leftJoin(users, eq(commentLikes.userId, users.id))
    .where(eq(commentLikes.commentId, commentId));
}

import { eq, and, desc, sql, count, isNull } from 'drizzle-orm';
import { db } from '../db/client.js';
import { comments, users, commentLikes } from '../models/index.js';

export async function createComment(
  postId: number,
  userId: number,
  content: string,
  parentId: number | null = null
) {
  const result = await db
    .insert(comments)
    .values({ postId, userId, content, parentId })
    .returning();

  return result[0];
}

export async function getCommentById(id: number) {
  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function getCommentsByPostId(postId: number, currentUserId: number) {
  const topLevelComments = await db
    .select({
      id: comments.id,
      postId: comments.postId,
      userId: comments.userId,
      parentId: comments.parentId,
      content: comments.content,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
      author: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(and(eq(comments.postId, postId), isNull(comments.parentId)))
    .orderBy(desc(comments.createdAt));

  if (topLevelComments.length === 0) {
    return [];
  }

  const commentIds = topLevelComments.map((c) => c.id);

  const replies = await db
    .select({
      id: comments.id,
      postId: comments.postId,
      userId: comments.userId,
      parentId: comments.parentId,
      content: comments.content,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
      author: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(
      sql`${comments.parentId} IN (${sql.join(commentIds.map((id) => sql`${id}`), sql`, `)})`
    )
    .orderBy(comments.createdAt);

  const allCommentIds = [...commentIds, ...replies.map((r) => r.id)];

  const likeCounts = await db
    .select({
      commentId: commentLikes.commentId,
      count: count(),
    })
    .from(commentLikes)
    .where(
      sql`${commentLikes.commentId} IN (${sql.join(allCommentIds.map((id) => sql`${id}`), sql`, `)})`
    )
    .groupBy(commentLikes.commentId);

  const userLikes = await db
    .select({ commentId: commentLikes.commentId })
    .from(commentLikes)
    .where(
      and(
        sql`${commentLikes.commentId} IN (${sql.join(allCommentIds.map((id) => sql`${id}`), sql`, `)})`,
        eq(commentLikes.userId, currentUserId)
      )
    );

  const likeCountMap = new Map(likeCounts.map((lc) => [lc.commentId, lc.count]));
  const userLikedSet = new Set(userLikes.map((ul) => ul.commentId));

  const repliesWithMeta = replies.map((reply) => ({
    ...reply,
    likeCount: likeCountMap.get(reply.id) ?? 0,
    isLiked: userLikedSet.has(reply.id),
  }));

  const repliesByParent = new Map<number, typeof repliesWithMeta>();
  for (const reply of repliesWithMeta) {
    if (reply.parentId !== null) {
      const existing = repliesByParent.get(reply.parentId) ?? [];
      existing.push(reply);
      repliesByParent.set(reply.parentId, existing);
    }
  }

  return topLevelComments.map((comment) => ({
    ...comment,
    likeCount: likeCountMap.get(comment.id) ?? 0,
    isLiked: userLikedSet.has(comment.id),
    replies: repliesByParent.get(comment.id) ?? [],
  }));
}

export async function deleteComment(id: number, userId: number) {
  const result = await db
    .delete(comments)
    .where(and(eq(comments.id, id), eq(comments.userId, userId)))
    .returning();

  return result[0] ?? null;
}

import { eq, and, desc, sql, lt, or, count } from 'drizzle-orm';
import { db } from '../db/client.js';
import { posts, users, postLikes, comments } from '../models/index.js';

export async function createPost(
  userId: number,
  content: string,
  imageUrl: string | null,
  visibility: 'public' | 'private'
) {
  const result = await db
    .insert(posts)
    .values({ userId, content, imageUrl, visibility })
    .returning();

  return result[0];
}

export async function getPostById(id: number) {
  const result = await db
    .select({
      id: posts.id,
      userId: posts.userId,
      content: posts.content,
      imageUrl: posts.imageUrl,
      visibility: posts.visibility,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function getPostWithDetails(id: number, currentUserId: number) {
  const post = await getPostById(id);
  if (!post) return null;

  const likeCountResult = await db
    .select({ count: count() })
    .from(postLikes)
    .where(eq(postLikes.postId, id));

  const commentCountResult = await db
    .select({ count: count() })
    .from(comments)
    .where(eq(comments.postId, id));

  const userLikeResult = await db
    .select()
    .from(postLikes)
    .where(
      and(eq(postLikes.postId, id), eq(postLikes.userId, currentUserId))
    )
    .limit(1);

  return {
    ...post,
    likeCount: likeCountResult[0]?.count ?? 0,
    commentCount: commentCountResult[0]?.count ?? 0,
    isLiked: userLikeResult.length > 0,
  };
}

export async function getFeedPosts(
  currentUserId: number,
  cursor: number | null,
  limit: number
) {
  const conditions = cursor
    ? and(
        lt(posts.id, cursor),
        or(
          eq(posts.visibility, 'public'),
          eq(posts.userId, currentUserId)
        )
      )
    : or(
        eq(posts.visibility, 'public'),
        eq(posts.userId, currentUserId)
      );

  const feedPosts = await db
    .select({
      id: posts.id,
      userId: posts.userId,
      content: posts.content,
      imageUrl: posts.imageUrl,
      visibility: posts.visibility,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .where(conditions)
    .orderBy(desc(posts.id))
    .limit(limit + 1);

  const hasMore = feedPosts.length > limit;
  const slicedPosts = hasMore ? feedPosts.slice(0, limit) : feedPosts;

  if (slicedPosts.length === 0) {
    return { posts: [], nextCursor: null as number | null };
  }

  const lastPost = slicedPosts[slicedPosts.length - 1];
  const nextCursor = hasMore && lastPost ? lastPost.id : null;

  const postIds = slicedPosts.map((p) => p.id);

  const likeCounts = await db
    .select({
      postId: postLikes.postId,
      count: count(),
    })
    .from(postLikes)
    .where(
      sql`${postLikes.postId} IN (${sql.join(postIds.map((id) => sql`${id}`), sql`, `)})`
    )
    .groupBy(postLikes.postId);

  const commentCounts = await db
    .select({
      postId: comments.postId,
      count: count(),
    })
    .from(comments)
    .where(
      sql`${comments.postId} IN (${sql.join(postIds.map((id) => sql`${id}`), sql`, `)})`
    )
    .groupBy(comments.postId);

  const userLikes = await db
    .select({ postId: postLikes.postId })
    .from(postLikes)
    .where(
      and(
        sql`${postLikes.postId} IN (${sql.join(postIds.map((id) => sql`${id}`), sql`, `)})`,
        eq(postLikes.userId, currentUserId)
      )
    );

  const likeCountMap = new Map(likeCounts.map((lc) => [lc.postId, lc.count]));
  const commentCountMap = new Map(
    commentCounts.map((cc) => [cc.postId, cc.count])
  );
  const userLikedSet = new Set(userLikes.map((ul) => ul.postId));

  const enrichedPosts = slicedPosts.map((post) => ({
    ...post,
    likeCount: likeCountMap.get(post.id) ?? 0,
    commentCount: commentCountMap.get(post.id) ?? 0,
    isLiked: userLikedSet.has(post.id),
  }));

  return { posts: enrichedPosts, nextCursor };
}

export async function updatePost(
  id: number,
  userId: number,
  data: { content?: string; visibility?: 'public' | 'private' }
) {
  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (data.content !== undefined) updateData.content = data.content;
  if (data.visibility !== undefined) updateData.visibility = data.visibility;

  const result = await db
    .update(posts)
    .set(updateData)
    .where(and(eq(posts.id, id), eq(posts.userId, userId)))
    .returning();

  return result[0] ?? null;
}

export async function deletePost(id: number, userId: number) {
  const result = await db
    .delete(posts)
    .where(and(eq(posts.id, id), eq(posts.userId, userId)))
    .returning();

  return result[0] ?? null;
}

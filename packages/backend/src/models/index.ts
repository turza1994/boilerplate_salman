import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  pgEnum,
  unique,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const visibilityEnum = pgEnum('visibility', ['public', 'private']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('user'),
  refreshTokenHash: text('refresh_token_hash'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const posts = pgTable(
  'posts',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    imageUrl: text('image_url'),
    visibility: visibilityEnum('visibility').notNull().default('public'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index('posts_user_idx').on(table.userId),
    createdAtIdx: index('posts_created_at_idx').on(table.createdAt),
    visibilityIdx: index('posts_visibility_idx').on(table.visibility),
  })
);

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    parentId: integer('parent_id'),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => ({
    postIdx: index('comments_post_idx').on(table.postId),
    userIdx: index('comments_user_idx').on(table.userId),
    parentIdx: index('comments_parent_idx').on(table.parentId),
  })
);

export const postLikes = pgTable(
  'post_likes',
  {
    postId: integer('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    uniqueLike: unique('post_likes_unique').on(table.postId, table.userId),
  })
);

export const commentLikes = pgTable(
  'comment_likes',
  {
    commentId: integer('comment_id')
      .notNull()
      .references(() => comments.id, { onDelete: 'cascade' }),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    uniqueLike: unique('comment_likes_unique').on(table.commentId, table.userId),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  postLikes: many(postLikes),
  commentLikes: many(commentLikes),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.userId], references: [users.id] }),
  comments: many(comments),
  likes: many(postLikes),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, { fields: [comments.userId], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  likes: many(commentLikes),
}));

export const schema = {
  users,
  posts,
  comments,
  postLikes,
  commentLikes,
};

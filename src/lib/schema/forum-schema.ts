import {
  type AnySQLiteColumn,
  int,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  type: text("type", {
    enum: ["link", "text", "image"],
  }).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() =>
    new Date().toISOString()
  ),
  createdBy: text("created_by").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
});

export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  postId: text("post_id").notNull().references(() => posts.id, {
    onDelete: "cascade",
  }),
  parentCommentId: text("parent_comment_id").references(
    (): AnySQLiteColumn => comments.id,
    {
      onDelete: "cascade",
    },
  ),
  createdAt: text("created_at").notNull().$defaultFn(() =>
    new Date().toISOString()
  ),
  createdBy: text("created_by").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
});

export const votes = sqliteTable("votes", {
  id: text("id").primaryKey(),
  value: int("value").notNull(), // 1 for upvote, -1 for downvote
  postId: text("post_id").references(() => posts.id, {
    onDelete: "cascade",
  }),
  commentId: text("comment_id").references(() => comments.id, {
    onDelete: "cascade",
  }),
  createdAt: text("created_at").notNull().$defaultFn(() =>
    new Date().toISOString()
  ),
  createdBy: text("created_by").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
}, (table) => {
  return {
    postCreatedByUniqueIndex: uniqueIndex("votes_post_createdBy_unique").on(
      table.postId,
      table.createdBy,
    ),
    postCommentCreatedByUnique: uniqueIndex(
      "votes_post_comment_createdBy_unique",
    ).on(
      table.postId,
      table.commentId,
      table.createdBy,
    ),
  };
});

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: text("created_at").notNull().$defaultFn(() =>
    new Date().toISOString()
  ),
  createdBy: text("created_by").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
});

export const postTags = sqliteTable("post_tags", {
  id: text("id").primaryKey(),
  postId: text("post_id").notNull().references(() => posts.id, {
    onDelete: "cascade",
  }),
  tagId: text("tag_id").notNull().references(() => tags.id, {
    onDelete: "cascade",
  }),
  createdAt: text("created_at").notNull().$defaultFn(() =>
    new Date().toISOString()
  ),
  createdBy: text("created_by").notNull().references(() => user.id, {
    onDelete: "cascade",
  }),
});

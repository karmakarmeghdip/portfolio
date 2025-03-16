import {
  type AnySQLiteColumn,
  int,
  sqliteTable,
  text,
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
});

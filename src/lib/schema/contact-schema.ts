import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const contact = sqliteTable("contact", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  jobType: text("job_type", {
    enum: ["freelance", "fulltime", "contract"],
  }).notNull(),
  amount: int("amount").notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at").notNull().$defaultFn(() =>
    new Date().toISOString()
  ),
  created_by: text("created_by").notNull().references(() => user.id, {
    onDelete: "restrict",
  }),
});

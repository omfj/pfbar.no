import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("email_verified", { mode: "timestamp_ms" }),
  type: text("type", { enum: ["user", "admin"] })
    .notNull()
    .default("user"),
  image: text("image"),
});

export type User = (typeof users)["$inferSelect"];
export type UserInsert = (typeof users)["$inferInsert"];

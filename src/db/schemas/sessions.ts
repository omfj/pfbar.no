import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from ".";

export const sessions = sqliteTable("session", {
  sessionToken: text("session_token").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export type Session = (typeof sessions)["$inferSelect"];
export type SessionInsert = (typeof sessions)["$inferInsert"];

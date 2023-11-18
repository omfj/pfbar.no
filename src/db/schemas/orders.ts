import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { baskets, users } from ".";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm/relations";
import { sql } from "drizzle-orm";

export const orders = sqliteTable(
  "order",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => nanoid()),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    status: text("status", { enum: ["pending", "completed"] })
      .notNull()
      .default("pending"),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
  })
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  baskets: many(baskets),
}));

export type Order = (typeof orders)["$inferSelect"];
export type OrderInsert = (typeof orders)["$inferInsert"];

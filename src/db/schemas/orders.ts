import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { baskets, users } from ".";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm/relations";

export const orders = pgTable(
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
    createdAt: timestamp("created_at")
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
  }),
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

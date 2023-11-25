import { json, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { users } from ".";
import { relations } from "drizzle-orm";

type CartContent = Record<string, number>;

export const carts = pgTable("cart", {
  userId: text("user_id").notNull().references(() => users.id),
  content: json("products").$type<CartContent>(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId] }),
}));

export const cartsRelations = relations(carts, ({ one }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

export type Cart = (typeof carts)["$inferSelect"];
export type CartInsert = (typeof carts)["$inferInsert"];

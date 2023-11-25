import { index, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { nanoid } from "nanoid";
import { orders, products } from ".";

export const baskets = pgTable(
  "basket",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => nanoid()),
    orderId: text("basket_id")
      .notNull()
      .references(() => orders.id),
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    quantity: integer("quantity").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
    orderIdx: index("order_idx").on(table.orderId),
  }),
);

export const basketsRelations = relations(baskets, ({ one }) => ({
  order: one(orders, {
    fields: [baskets.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [baskets.productId],
    references: [products.id],
  }),
}));

export type Basket = (typeof baskets)["$inferSelect"];
export type BasketInsert = (typeof baskets)["$inferInsert"];

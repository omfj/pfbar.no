import { boolean, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const products = pgTable(
  "product",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => nanoid()),
    name: text("name").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    isEmpty: boolean("is_empty").notNull().default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
  }),
);

export type Product = (typeof products)["$inferSelect"];
export type ProductInsert = (typeof products)["$inferInsert"];

import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const products = sqliteTable(
  "product",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => nanoid()),
    name: text("name").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url"),
    isEmpty: integer("is_empty", { mode: "boolean" }).notNull().default(false),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.id] }),
  })
);

export type Product = (typeof products)["$inferSelect"];
export type ProductInsert = (typeof products)["$inferInsert"];

import { pgTable, varchar, text, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { orders } from '.';

export const products = pgTable(
	'product',
	{
		id: varchar('id', { length: 21 }).notNull().$defaultFn(nanoid),
		name: varchar('name', { length: 255 }).notNull(),
		description: text('description').notNull(),
		inStock: boolean('in_stock').notNull().default(false),
		image: text('image')
	},
	(t) => ({
		pk: primaryKey({ columns: [t.id] })
	})
);

export const productsRelations = relations(products, ({ many }) => ({
	orders: many(orders)
}));

export type Product = (typeof products)['$inferSelect'];
export type ProductInsert = (typeof products)['$inferInsert'];

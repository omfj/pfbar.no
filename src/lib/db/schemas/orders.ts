import { pgTable, varchar, text, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { products, users } from '.';

export const orders = pgTable(
	'order',
	{
		id: varchar('id', { length: 21 }).notNull().$defaultFn(nanoid),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		productId: text('product_id')
			.notNull()
			.references(() => products.id),
		quantity: integer('quantity').notNull().default(1),
		createdAt: timestamp('created_at').notNull().defaultNow()
	},
	(t) => ({
		pk: primaryKey({ columns: [t.id] })
	})
);

export const ordersRelations = relations(orders, ({ one }) => ({
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
	product: one(products, {
		fields: [orders.productId],
		references: [products.id]
	})
}));

export type Order = (typeof orders)['$inferSelect'];
export type OrderInsert = (typeof orders)['$inferInsert'];

import { json, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db/drizzle';
import { orders, users } from '$lib/db/schemas';
import { desc, eq } from 'drizzle-orm';

const getOrders = db.query.orders
	.findMany({
		orderBy: [desc(orders.createdAt)],
		with: {
			product: true,
			user: true
		},
		limit: 10
	})
	.prepare('getOrders');

export const GET: RequestHandler = async ({ locals }) => {
	const userId = locals.user?.id;

	if (!userId) {
		return text('Du er ikke logget inn', {
			status: 401
		});
	}

	const user = await db.query.users.findFirst({
		where: () => eq(users.id, userId)
	});

	if (!user || user.role === 'user') {
		return text('Du har ikke tilgang til denne siden', {
			status: 403
		});
	}

	const allOrders = await getOrders.execute();

	return json(allOrders);
};

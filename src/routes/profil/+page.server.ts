import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { orders, users } from '$lib/db/schemas';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user?.id;

	if (!userId) {
		throw redirect(301, '/');
	}

	const userOrders = await db.query.orders.findMany({
		where: () => eq(orders.userId, userId),
		with: {
			product: true
		}
	});

	return {
		userOrders
	};
};

export const actions: Actions = {
	update: async ({ request, locals }) => {
		if (!locals.user?.id) {
			throw fail(401, {
				message: 'Du er ikke logget inn.'
			});
		}

		const formData = await request.formData();

		const name = formData.get('name') as string;

		await db
			.update(users)
			.set({
				name
			})
			.where(eq(users.id, locals.user.id));

		return {
			message: 'Profilen din er oppdatert.'
		};
	}
};

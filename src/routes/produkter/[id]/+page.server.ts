import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { orders, products } from '$lib/db/schemas';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const product = await db.query.products.findFirst({
		where: () => eq(products.id, params.id)
	});

	if (!product) {
		throw error(404, 'Fant ikke produktet');
	}

	return {
		product
	};
};

export const actions: Actions = {
	default: async ({ locals, params }) => {
		if (!locals.user) return fail(401);

		const product = await db.query.products.findFirst({
			where: () => eq(products.id, params.id)
		});

		if (!product) {
			throw fail(400, {
				message: 'Fant ikke produktet'
			});
		}

		await db.insert(orders).values({
			userId: locals.user.id,
			productId: product.id
		});

		return { success: true };
	}
};

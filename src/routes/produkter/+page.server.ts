import { db } from '$lib/db/drizzle';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const products = await db.query.products.findMany();

	return {
		products
	};
};

import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { products } from '$lib/db/schemas';

export const load: PageServerLoad = async ({ locals }) => {
	const userRole = locals.user?.role;

	if (!userRole || !['admin', 'super_admin'].includes(userRole)) {
		throw redirect(301, '/');
	}
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const userRole = locals.user?.role;

		if (!userRole || !['admin', 'super_admin'].includes(userRole)) {
			throw redirect(301, '/');
		}

		const formData = await request.formData();

		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		await db.insert(products).values({ name, description });

		return {
			success: true
		};
	}
};

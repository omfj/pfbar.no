import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { users } from '$lib/db/schemas';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user?.id;

	if (!userId) {
		throw redirect(301, '/');
	}

	const user = await db.query.users.findFirst({
		where: () => eq(users.id, userId)
	});

	if (!user || user.role === 'user') {
		throw redirect(301, '/');
	}
};

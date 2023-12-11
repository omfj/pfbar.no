import { lucia } from '$lib/auth/lucia';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies, locals }) => {
		const sessionId = cookies.get(lucia.sessionCookieName);

		if (!sessionId) return fail(401);

		await lucia.invalidateSession(sessionId);
		locals.user = null;

		throw redirect(302, '/');
	}
};

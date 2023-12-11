import { lucia } from '$lib/auth/lucia';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import type { Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}

	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}

	if (user?.id) {
		const u =
			(await db.query.users.findFirst({
				where: () => eq(users.id, user.id)
			})) ?? null;

		event.locals.user = u;
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};

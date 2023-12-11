import { lucia } from '$lib/auth/lucia';
import { GITHUB_PROVIDER_ID, getGithubUser, githubAuth } from '$lib/auth/providers/github';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { OAuth2RequestError } from 'arctic';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const stateCookie = cookies.get('oauth_state');

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!state || !stateCookie || !code || stateCookie !== state) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await githubAuth.validateAuthorizationCode(code);

		const githubUser = await getGithubUser(tokens.accessToken);

		const existingUser = await db.query.users.findFirst({
			where: (user) =>
				and(eq(user.providerId, githubUser.id.toString()), eq(user.provider, GITHUB_PROVIDER_ID))
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/',
					'Set-Cookie': sessionCookie.serialize()
				}
			});
		}

		const userId = generateId(15);
		await db.insert(users).values({
			id: userId,
			name: githubUser.name,
			email: githubUser.email,
			provider: GITHUB_PROVIDER_ID,
			providerId: githubUser.id.toString()
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/',
				'Set-Cookie': sessionCookie.serialize()
			}
		});
	} catch (e) {
		console.error(e);
		if (e instanceof OAuth2RequestError) {
			// bad verification code, invalid credentials, etc
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
};

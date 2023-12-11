import { googleAuth } from '$lib/auth/providers';
import { lucia } from '$lib/auth/lucia';
import { db } from '$lib/db/drizzle';
import { users } from '$lib/db/schemas';
import { OAuth2RequestError } from 'arctic';
import { and, eq } from 'drizzle-orm';
import { generateId } from 'lucia';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, url }) => {
	const stateCookie = cookies.get('oauth_state');
	const codeVerifier = cookies.get('code_verifier');

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!code || !state || !codeVerifier || state !== stateCookie) {
		console.error(
			[
				'Invalid state or code',
				`state: ${state}`,
				`stateCookie: ${stateCookie}`,
				`code: ${code}`,
				`codeVerifier: ${codeVerifier}`
			].join('\n')
		);
		return new Response('Invalid credentials', {
			status: 400
		});
	}

	try {
		const tokens = await googleAuth.validateAuthorizationCode(code, codeVerifier);

		const googleUser = await getGoogleUSer(tokens.accessToken);

		console.log(googleUser);

		const existingUser = await db.query.users.findFirst({
			where: (user) => and(eq(user.providerId, googleUser.sub), eq(user.provider, 'google'))
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
			name: googleUser.name,
			email: googleUser.email,
			provider: 'google',
			providerId: googleUser.sub
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
		console.log(e);
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

async function getGoogleUSer(accessToken: string) {
	return (await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => res.json())) as GoogleUser;
}

type GoogleUser = {
	sub: string;
	email: string;
	given_name: string;
	family_name: string;
	name: string;
	picture: string;
};

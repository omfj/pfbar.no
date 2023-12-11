import { dev } from '$app/environment';
import { githubAuth } from '$lib/auth/providers';
import { generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

export async function GET() {
	const state = generateState();
	const url = await githubAuth.createAuthorizationURL(state, {
		scopes: ['user']
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString(),
			'Set-Cookie': serializeCookie('oauth_state', state, {
				httpOnly: true,
				secure: dev,
				maxAge: 60 * 10,
				path: '/'
			})
		}
	});
}

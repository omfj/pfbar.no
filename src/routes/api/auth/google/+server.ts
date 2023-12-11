import { dev } from '$app/environment';
import { googleAuth } from '$lib/auth/providers';
import { generateCodeVerifier, generateState } from 'arctic';
import { serializeCookie } from 'oslo/cookie';

export async function GET() {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await googleAuth.createAuthorizationURL(codeVerifier);

	const headers = new Headers();

	headers.append(
		'Set-Cookie',
		serializeCookie('state', state, {
			httpOnly: true,
			secure: dev,
			maxAge: 60 * 10,
			path: '/'
		})
	);

	headers.append(
		'Set-Cookie',
		serializeCookie('code_verifier', codeVerifier, {
			httpOnly: true,
			secure: dev,
			maxAge: 60 * 10,
			path: '/'
		})
	);

	headers.append('Location', url.toString());

	return new Response(null, {
		status: 302,
		headers
	});
}

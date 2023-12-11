import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { baseURL } from '$lib/utils';
import { Google } from 'arctic';

type GoogleUser = {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
	locale: string;
};

export const GOOGLE_PROVIDER_ID = 'google';

export const googleAuth = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${baseURL}/api/auth/google/callback`
);

export async function getGoogleUSer(accessToken: string) {
	return (await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	}).then((res) => res.json())) as GoogleUser;
}

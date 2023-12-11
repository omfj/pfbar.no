import { lucia } from '$lib/auth/lucia';
import { githubAuth } from '$lib/auth/providers';
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
				and(eq(user.providerId, githubUser.id.toString()), eq(user.provider, 'github'))
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
			provider: 'github',
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
async function getGithubUser(accessToken: string) {
	return await fetch('https://api.github.com/user', {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${accessToken}`,
			'X-GitHub-Api-Version': '2022-11-28'
		}
	}).then((res) => res.json() as Promise<GithubUser>);
}

type GithubUser = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	name: string;
	email: string;
};

/**
 * {
 *  "login": "octocat",
 *  "id": 1,
 *  "node_id": "MDQ6VXNlcjE=",
 *  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
 *  "gravatar_id": "",
 *  "url": "https://api.github.com/users/octocat",
 *  "html_url": "https://github.com/octocat",
 *  "followers_url": "https://api.github.com/users/octocat/followers",
 *  "following_url": "https://api.github.com/users/octocat/following{/other_user}",
 *  "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
 *  "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
 *  "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
 *  "organizations_url": "https://api.github.com/users/octocat/orgs",
 *  "repos_url": "https://api.github.com/users/octocat/repos",
 *  "events_url": "https://api.github.com/users/octocat/events{/privacy}",
 *  "received_events_url": "https://api.github.com/users/octocat/received_events",
 *  "type": "User",
 *  "site_admin": false,
 *  "name": "monalisa octocat",
 *  "company": "GitHub",
 *  "blog": "https://github.com/blog",
 *  "location": "San Francisco",
 *  "email": "octocat@github.com",
 *  "hireable": false,
 *  "bio": "There once was...",
 *  "twitter_username": "monatheoctocat",
 *  "public_repos": 2,
 *  "public_gists": 1,
 *  "followers": 20,
 *  "following": 0,
 *  "created_at": "2008-01-14T04:33:35Z",
 *  "updated_at": "2008-01-14T04:33:35Z",
 *  "private_gists": 81,
 *  "total_private_repos": 100,
 *  "owned_private_repos": 100,
 *  "disk_usage": 10000,
 *  "collaborators": 8,
 *  "two_factor_authentication": true,
 *  "plan": {
 *    "name": "Medium",
 *    "space": 400,
 *    "private_repos": 20,
 *    "collaborators": 0
 *  }
 *}
 */

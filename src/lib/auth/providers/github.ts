import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { baseURL } from '$lib/utils';

type GithubUser = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	name: string;
	email: string;
};

export const GITHUB_PROVIDER_ID = 'github';

export const githubAuth = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, {
	redirectURI: `${baseURL}/api/auth/github/callback`
});

export async function getGithubUser(accessToken: string) {
	return (await fetch('https://api.github.com/user', {
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${accessToken}`,
			'X-GitHub-Api-Version': '2022-11-28'
		}
	}).then((res) => res.json())) as GithubUser;
}

<script lang="ts">
	import clsx from 'clsx';

	const socialLogins = [
		{
			name: 'GitHub',
			url: '/api/auth/github',
			color: 'bg-github-background text-github-foreground'
		},
		{
			name: 'Google',
			url: '/api/auth/google',
			color: 'bg-white border'
		}
	];
</script>

<main class="container space-y-8">
	<h1 class="text-center text-2xl font-semibold">Velg en måte å logge inn på</h1>

	<ul class="w-full max-w-sm mx-auto text-center space-y-4">
		{#each socialLogins as login}
			<li>
				<a
					href={login.url}
					class={clsx(
						'p-2 rounded-md w-full flex text-center hover:underline underline-offset-2',
						login.color
					)}
				>
					<span class="mx-auto">{login.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</main>

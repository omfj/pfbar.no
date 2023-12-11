<script lang="ts">
	import clsx from 'clsx';
	import Icon from '@iconify/svelte';

	const socialLogins = [
		{
			name: 'GitHub',
			url: '/api/auth/github',
			color: 'bg-github-background text-github-foreground',
			icon: 'mdi:github',
			iconColor: 'invert-0'
		},
		{
			name: 'Google',
			url: '/api/auth/google',
			color: 'bg-white border',
			icon: 'mdi:google',
			iconColor: ''
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
					<div class="flex items-center gap-2 mx-auto">
						<Icon class={clsx('w-6 h-6', login.iconColor)} icon={login.icon} />
						<span>{login.name}</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</main>

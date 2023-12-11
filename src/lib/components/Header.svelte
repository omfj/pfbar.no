<script lang="ts">
	import { enhance } from '$app/forms';
	import { createNavMenuStore } from '$lib/stores/nav-menu.svelte';
	import { userStore } from '$lib/stores/user';
	import { headerLinks } from '$lib/links';

	let navMenuStore = createNavMenuStore();

	$: linksToShow = headerLinks.filter((link) => {
		if (link.authed === Boolean($userStore) || link.authed === undefined) {
			return link;
		}
	});
</script>

<header
	class="flex sticky top-0 items-center justify-between p-5 mb-5 bg-pink-200 border-b-2 border-black"
>
	<div>
		<a href="/" class="text-3xl font-semibold tracking-tight">Pink Flamingo</a>
	</div>

	<div>
		<!-- Desktop -->
		<div class="hidden md:flex">
			<nav>
				<ul class="flex flex-row items-center">
					{#each linksToShow as link}
						<li>
							{#if link.type === 'link'}
								<a href={link.href} class="px-2 py-1 rounded-lg hover:bg-white font-medium"
									>{link.label}</a
								>
							{:else if link.type === 'button'}
								<form use:enhance method="post" action={link.action}>
									<button type="submit" class="px-2 py-1 rounded-lg hover:bg-white font-medium"
										>{link.label}</button
									>
								</form>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<!-- Mobile -->
		<div class="flex md:hidden items-center">
			<button onclick={navMenuStore.toggle}>
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
		</div>
	</div>
</header>

{#if navMenuStore.isOpen}
	<div class="bg-pink-100 fixed top-0 left-0 min-h-screen w-full p-5">
		<div>
			<div class="top-5 right-5 absolute">
				<button onclick={navMenuStore.toggle}>
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</button>
			</div>
			<ul class="text-center space-y-6 py-10">
				{#each linksToShow as link}
					<li>
						{#if link.type === 'link'}
							<a href={link.href} class="text-3xl hover:underline">{link.label}</a>
						{:else if link.type === 'button'}
							<form use:enhance method="post" action={link.action}>
								<button type="submit" class="text-3xl hover:underline">{link.label}</button>
							</form>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
{/if}

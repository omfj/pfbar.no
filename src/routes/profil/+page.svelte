<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Profil | {data.user!.id}</title>
</svelte:head>

<main class="container space-y-8 max-w-lg">
	<h1 class="text-2xl font-semibold">{data.user!.name ?? data.user!.id}</h1>

	<div class="space-y-4">
		<h2 class="text-xl font-medium">Din profil</h2>
		<form class="space-y-2" method="post" action="?/update" use:enhance>
			<div class="flex flex-col gap-1">
				<label for="name">Navn</label>
				<input
					class="border px-2 py-1 rounded"
					type="text"
					id="name"
					name="name"
					value={data.user?.name ?? ''}
				/>
			</div>
			<div class="flex flex-col gap-1">
				<label for="email">E-post</label>
				<input
					class="border px-2 py-1 rounded"
					type="email"
					id="email"
					name="email"
					value={data.user?.email ?? ''}
				/>
			</div>

			<button class="px-4 py-1 bg-pink-200 hover:bg-pink-300" type="submit">Lagre</button>
		</form>
	</div>

	{#if data.user && data.user.role !== 'user'}
		<div class="space-y-4">
			<h2 class="text-xl font-medium">Administrator</h2>

			<a href="/bestillinger" class="hover:underline">Se alle bestillinger</a>
		</div>
	{/if}

	<div class="space-y-4">
		<h2 class="text-xl font-medium">Bestillinger</h2>
		{#if data.userOrders.length < 1}
			<p>Du har ingen bestillinger.</p>
		{:else}
			<ul>
				{#each data.userOrders as order}
					<li>
						{order.product.name} ({order.quantity} stk.)
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</main>

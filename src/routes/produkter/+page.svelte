<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Produkter</title>
</svelte:head>

<main class="container">
	<h1 class="text-2xl font-bold">Produkter</h1>

	{#if data.products.length === 0}
		<p class="mt-4">Fant ingen produkter.</p>
	{:else}
		<div class="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.products as product}
				<a href="/produkter/{product.id}" class="flex flex-col p-4 bg-white rounded shadow group">
					{#if product.image}
						<img src={product.image} alt={product.name} class="w-32 h-32 object-contain" />
					{/if}
					<h2 class="mt-2 text-lg font-bold group-hover:underline">{product.name}</h2>
					<p class="mt-2 text-gray-600">{product.description}</p>
				</a>
			{/each}
		</div>
	{/if}
</main>

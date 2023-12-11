<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<svelte:head>
	<title>Produkt | {data.product.name}</title>
</svelte:head>

<main class="container grid grid-cols-1 md:grid-cols-2 gap-4">
	<div class="">
		{#if data.product.image}
			<img src={data.product.image} alt={data.product.name} class="w-full object-contain" />
		{/if}
	</div>

	<div class="space-y-8">
		{#if form?.success}
			<p class="text-green-500">Bestillingen er registrert!</p>
		{/if}

		<div class="space-y-2">
			<h1 class="text-2xl font-semibold">{data.product.name}</h1>

			<p class="text-gray-600">{data.product.description}</p>
		</div>

		<form method="post" use:enhance>
			<button
				type="submit"
				class="px-4 py-1 rounded bg-pink-200 text-lg font-medium hover:bg-pink-300 transition-colors"
				>Bestill</button
			>
		</form>
	</div>
</main>

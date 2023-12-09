<script lang="ts">
	import type { Product } from '$lib/types';
	import { authStore } from '$lib/stores/auth';
	import { addOrder } from '$lib/orders';
	import { getImageUrl } from '$lib/image';
	import toast from 'svelte-french-toast';

	let { ...product } = $props<Product>();

	async function handleOrder() {
		if ($authStore.currentUser?.uid) {
			await addOrder(product.id, $authStore.currentUser?.uid);
			toast.success('Bestillingen er registrert');
		} else {
			toast.error('Du må være logget inn for å bestille');
		}
	}
</script>

<div class="border bg-white rounded-md shadow-2xl overflow-hidden flex flex-col h-full">
	<div>
		<div class="w-full h-48 border-b relative flex items-center justify-center overflow-hidden">
			{#await getImageUrl(product.image)}
				<p>Laster...</p>
			{:then url}
				<img class="object-cover" src={url} alt={product.name} />
			{:catch error}
				<p class="text-3xl">🍺</p>
			{/await}
		</div>
	</div>

	<div class="p-4 flex flex-col gap-2 h-full">
		<div class="space-y-1">
			<h2 class="text-2xl font-medium">{product.name}</h2>
			<p class="text-slate-500">{product.description}</p>
		</div>

		<button
			onclick={handleOrder}
			class="mt-auto px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 transition-colors text-white"
			>Bestill</button
		>
	</div>
</div>

<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="container">
	<ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each data.products as product}
			<li>
				<Product {...product} />
			</li>
		{/each}
	</ul>
</main>

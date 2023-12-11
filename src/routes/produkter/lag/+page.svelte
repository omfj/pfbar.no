<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<main class="container space-y-8">
	<div>
		{#if form?.success}
			<p class="text-green-600">Produktet ble laget!</p>
		{/if}

		<h2 class="text-2xl font-semibold">Lag nytt produkt</h2>

		<form action="?/create" method="post" class="space-y-4" use:enhance>
			<div class="flex flex-col gap-1">
				<label for="name">Navn</label>
				<input class="border px-2 py-1 rounded" type="text" id="name" name="name" />
			</div>
			<div class="flex flex-col gap-1">
				<label for="description">Beskrivelse</label>
				<textarea class="border px-2 py-1 rounded" id="description" name="description" />
			</div>

			<button class="px-4 py-1 bg-pink-200 hover:bg-pink-300" type="submit">Lagre</button>
		</form>
	</div>
</main>

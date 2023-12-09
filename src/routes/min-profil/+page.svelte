<script lang="ts">
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/date';
	import { getOrdersByUser } from '$lib/orders';
	import { authStore } from '$lib/stores/auth';
	import type { Order } from '$lib/types';

	let isSignedIn = $derived($authStore.currentUser !== null);
	let orders = $state<Array<Order>>([]);

	$effect(() => {
		if (!isSignedIn && !$authStore.isLoading) {
			goto('/logg-inn');
		}
	});

	$effect(() => {
		if ($authStore.currentUser?.uid) {
			void setOrders($authStore.currentUser.uid);
		}
	});

	async function setOrders(uid: string) {
		orders = await getOrdersByUser(uid);
	}
</script>

<main class="container space-y-8">
	<div class="flex flex-col items-center justify-center">
		<h1 class="text-3xl font-bold">Min profil</h1>
		<p class="text-xl">Velkommen, {$authStore.currentUser?.displayName}</p>
	</div>

	<div class="text-center">
		{#if orders.length > 0}
			<ul class="space-y-2 max-w-lg mx-auto">
				{#each orders as order}
					<li>
						<div class="p-4 border rounded-lg bg-white shadow-lg">
							<p>{order.id}</p>
							<p>{formatDate(order.createdAt)}</p>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p>Du har ingen ordre</p>
		{/if}
	</div>
</main>

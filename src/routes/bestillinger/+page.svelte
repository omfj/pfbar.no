<script lang="ts">
	import type { Order, Product, User } from '$lib/db/schemas';

	let orders = $state<
		Array<
			Order & {
				product: Product;
				user: User;
			}
		>
	>([]);

	$effect(() => {
		const fetchOrders = async () => {
			fetch('/api/orders', {
				method: 'GET'
			})
				.then((res) => res.json())
				.then((data) => (orders = data));
		};

		fetchOrders();

		const interval = setInterval(fetchOrders, 5000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<main class="container space-y-8">
	<div class="space-y-4">
		<h2 class="text-2xl font-semibold">10 siste ordre</h2>

		<ul class="divide-y">
			{#each orders as order}
				<li>
					<div class="py-4">
						<p>{order.user.name}</p>
						<p>{order.product.name}</p>
						<p>{order.quantity}</p>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</main>

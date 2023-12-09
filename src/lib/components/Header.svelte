<script lang="ts">
	import { navigating } from '$app/stores';
	import { createNavState } from '$lib/states/mobile-nav.svelte';
	import { authHandlers, authStore } from '$lib/stores/auth';

	let isSignedIn = $derived($authStore.currentUser !== null);
	const navState = createNavState();

	$effect(() => {
		if ($navigating) {
			navState.isOpen = false;
		}
	});
</script>

<div class="flex items-center justify-between p-4 mb-10">
	<div>
		<a href="/">
			<h1 class="text-3xl font-bold">Pink Flamingo</h1>
		</a>
	</div>

	<div>
		<div class="block md:hidden">
			<button onclick={() => navState.toggle()}>Menu</button>
		</div>
		<nav class="hidden md:block">
			<ul class="items-center flex">
				<li>
					<a class="px-2 py-1 rounded font-medium hover:bg-slate-100" href="/">Hjem</a>
				</li>
				<li>
					<a class="px-2 py-1 rounded font-medium hover:bg-slate-100" href="/produkter">
						Produkter
					</a>
				</li>
				{#if isSignedIn}
					<li>
						<a class="px-2 py-1 rounded font-medium hover:bg-slate-100" href="/min-profil">
							Din profil
						</a>
					</li>
				{/if}
				{#if isSignedIn}
					<li>
						<button
							onclick={authHandlers.signOut}
							class="px-2 py-1 rounded font-medium hover:bg-slate-100"
						>
							Logg ut
						</button>
					</li>
				{/if}
				{#if !isSignedIn}
					<li>
						<button
							onclick={authHandlers.signIn}
							class="px-2 py-1 rounded font-medium hover:bg-slate-100"
						>
							Logg inn
						</button>
					</li>
				{/if}
			</ul>
		</nav>
	</div>
</div>

{#if navState.isOpen}
	<div class="fixed top-0 left-0 z-50 min-h-screen w-full bg-pink-200">
		<div class="absolute top-0 right-0 p-4">
			<button onclick={() => navState.toggle()}>Lukk</button>
		</div>
		<ul class="px-5 py-10 space-y-4">
			<li>
				<a href="/" class="text-3xl hover:underline">Hjem</a>
			</li>
			<li>
				<a href="/produkter" class="text-3xl hover:underline">Produkter</a>
			</li>
			{#if isSignedIn}
				<li>
					<a href="/min-profil" class="text-3xl hover:underline">Din profil</a>
				</li>
			{/if}
			{#if isSignedIn}
				<li>
					<button onclick={authHandlers.signOut} class="text-3xl hover:underline">Logg ut</button>
				</li>
			{/if}
			{#if !isSignedIn}
				<li>
					<button onclick={authHandlers.signIn} class="text-3xl hover:underline">Logg inn</button>
				</li>
			{/if}
		</ul>
	</div>
{/if}

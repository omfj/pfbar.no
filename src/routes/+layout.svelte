<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { userStore } from '$lib/stores/user';
	import Header from '$lib/components/Header.svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	export let data: LayoutData;

	$: userStore.set(data.user);
	$: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
	<title>Pink Flamingo</title>
	{@html webManifestLink}
</svelte:head>

<div class="min-h-screen flex flex-col">
	<Header />
	<slot />

	<div class="mt-auto">
		<footer class="mt-10 p-5 bg-gray-100 text-gray-500 border-t">
			<p class="text-center text-sm">&copy; 2021 Pink Flamingo</p>
		</footer>
	</div>
</div>

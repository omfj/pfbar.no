<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { auth } from '$lib/firebase';
	import { authStore } from '$lib/stores/auth';
	import { Toaster } from 'svelte-french-toast';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			authStore.update((curr) => {
				return { ...curr, currentUser: user, isLoading: false };
			});
		});

		return unsubscribe;
	});
</script>

<div class="mb-10">
	<Header />
	<slot />
</div>
<Toaster />

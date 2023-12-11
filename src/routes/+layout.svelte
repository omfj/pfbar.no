<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { userStore } from '$lib/stores/user';
	import Header from '$lib/components/Header.svelte';

	export let data: LayoutData;

	$: userStore.set(data.user);
</script>

<Header />
<slot />

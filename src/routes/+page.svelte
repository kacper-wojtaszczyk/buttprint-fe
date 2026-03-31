<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { env } from '$env/dynamic/public';
	import { fetchButtprint } from '$lib/api';

	const API_URL = env.PUBLIC_BUTTPRINT_API_URL ?? 'https://api.buttprint.eu';

	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			const result = await fetchButtprint(API_URL);

			const { lat, lon } = result.location;
			const locationPath = `${lat},${lon}`;

			await goto(resolve(`/${locationPath}`), {
				replaceState: true,
				state: { prefetched: result }
			});
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unexpected error occurred';
		}
	});
</script>

<svelte:head>
	<title>Buttprint</title>
	<meta name="description" content="How thicc does the air feel? The buttprint shows you." />
</svelte:head>

<div class="page">
	{#if error}
		<p class="status error">{error}</p>
	{:else}
		<p class="status">Finding your buttprint…</p>
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem 1rem;
	}

	.status {
		color: var(--text-muted);
	}

	.error {
		color: #c47272;
	}
</style>

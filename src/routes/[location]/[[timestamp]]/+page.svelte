<script lang="ts">
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { fetchButtprint } from '$lib/api';
	import type { ButtprintResponse } from '$lib/types';
	import type { PageProps } from './$types';
	import ButtDisplay from '$lib/components/ButtDisplay.svelte';
	import DataReadout from '$lib/components/DataReadout.svelte';

	let { data }: PageProps = $props();

	const API_URL = env.PUBLIC_BUTTPRINT_API_URL ?? 'https://api.buttprint.eu';

	const prefetched = page.state.prefetched;

	let buttprint = $state<ButtprintResponse | null>(prefetched ?? null);
	let loading = $state(!prefetched);
	let error = $state<string | null>(null);

	let skipNextFetch = !!prefetched;

	$effect(() => {
		const { lat, lon } = data.location;
		const timestamp = data.timestamp;

		if (skipNextFetch) {
			skipNextFetch = false;
			return;
		}

		let cancelled = false;

		loading = true;
		error = null;
		buttprint = null;

		fetchButtprint(API_URL, { lat, lon, timestamp })
			.then((result) => {
				if (cancelled) return;
				buttprint = result;
			})
			.catch((err) => {
				if (cancelled) return;
				error = err instanceof Error ? err.message : 'An unexpected error occurred';
			})
			.finally(() => {
				if (cancelled) return;
				loading = false;
			});

		return () => {
			cancelled = true;
		};
	});
</script>

<svelte:head>
	<title>Buttprint</title>
	<meta name="description" content="How thicc does the air feel? The buttprint shows you." />
</svelte:head>

<div class="page">
	<h1>Buttprint</h1>

	{#if loading}
		<p class="status">Loading your buttprint…</p>
	{:else if error}
		<p class="status error">{error}</p>
	{:else if buttprint}
		<ButtDisplay svg={buttprint.svg} />
		<DataReadout variables={buttprint.variables} />
	{/if}
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		padding: 2rem 1rem;
	}

	h1 {
		margin-top: 8vh;
		margin-bottom: 2rem;
		text-align: center;
		font-size: 3rem;
		font-weight: 300;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.status {
		color: var(--text-muted);
		margin-top: 4rem;
	}

	.error {
		color: #c47272;
	}
</style>

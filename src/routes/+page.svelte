<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { env } from '$env/dynamic/public';

	const API = env.PUBLIC_BUTTPRINT_API_URL ?? 'https://api.buttprint.eu';
	const INTERVAL_MS = 7_000;
	const FADE_MS = 400;

	// European bounds matching the pipeline's coverage area
	const LAT_MIN = 30.0;
	const LAT_MAX = 72.0;
	const LON_MIN = -25.0;
	const LON_MAX = 45.0;

	let svg = $state('');
	let visible = $state(false);
	let intervalId: ReturnType<typeof setInterval> | undefined;

	function randomCoord(): { lat: number; lon: number } {
		return {
			lat: LAT_MIN + Math.random() * (LAT_MAX - LAT_MIN),
			lon: LON_MIN + Math.random() * (LON_MAX - LON_MIN)
		};
	}

	async function fetchButtprint(): Promise<void> {
		try {
			const { lat, lon } = randomCoord();
			const now = new Date().toISOString();
			const url = `${API}/buttprint?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}&time=${encodeURIComponent(now)}`;

			const res = await fetch(url);
			if (!res.ok) return; // 404 no-data or other error — silently skip

			const data = await res.json();
			if (data.svg) {
				// Fade out, swap content, fade in
				if (svg) {
					visible = false;
					await new Promise((r) => setTimeout(r, FADE_MS));
				}
				svg = data.svg;
				requestAnimationFrame(() => {
					visible = true;
				});
			}
		} catch {
			// Network error — silently skip, try next cycle
		}
	}

	onMount(() => {
		fetchButtprint();
		intervalId = setInterval(fetchButtprint, INTERVAL_MS);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<svelte:head>
	<title>Buttprint</title>
	<meta name="description" content="Environmental scores for every moment, every place." />
</svelte:head>

<div class="page">
	<h1>Buttprint</h1>
	<div class="butt-container">
		{#if svg}
			<div class="butt" class:visible>
				{@html svg}
			</div>
		{/if}
	</div>
	<p>Coming soon.</p>
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

	.butt-container {
		display: grid;
		place-items: center;
		width: 100%;
		max-width: 400px;
		min-height: 400px;
	}

	.butt-container > * {
		grid-area: 1 / 1;
	}

	.butt {
		width: 100%;
		display: flex;
		justify-content: center;
		opacity: 0;
		transition: opacity 400ms ease;
	}

	.butt.visible {
		opacity: 1;
	}

	.butt :global(svg) {
		width: 100%;
		height: auto;
		max-width: 400px;
	}

	p {
		margin-top: 2rem;
		text-align: center;
		font-size: 1.25rem;
		color: var(--text-muted);
	}
</style>

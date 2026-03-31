<script lang="ts">
	import type { Variable } from '$lib/types';

	let { variables }: { variables: Variable[] } = $props();

	const labels: Record<string, string> = {
		pm2p5: 'PM2.5',
		pm10: 'PM10',
		temperature: 'Temperature',
		humidity: 'Humidity',
		dewpoint: 'Dew point'
	};

	function displayName(name: string): string {
		return labels[name] ?? name;
	}
</script>

<div class="readout">
	{#each variables as variable (variable.name)}
		<div class="variable">
			<span class="label">{displayName(variable.name)}:</span>
			<span class="value">{variable.value.toFixed(1)} {variable.unit}</span>
			{#if variable.lineage}
				<div class="lineage">↳ {variable.lineage.dataset}</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.readout {
		max-width: 400px;
		margin: 1.5rem auto 0;
		padding: 1rem;
		background: var(--bg-surface);
		border-radius: 4px;
	}

	.variable {
		padding: 0.4rem 0;
	}

	.variable + .variable {
		border-top: 1px solid color-mix(in srgb, var(--text-muted) 20%, transparent);
	}

	.label {
		color: var(--text-muted);
		margin-right: 0.4rem;
	}

	.value {
		color: var(--text);
	}

	.lineage {
		font-size: 0.8rem;
		color: var(--text-muted);
		padding-left: 1rem;
		margin-top: 0.15rem;
	}
</style>

<script lang="ts">
	import BackHome from './BackHome.svelte';

	let { message }: { message?: string } = $props();
</script>

<div class="error-state">
	<h1>Buttprint</h1>
	{#if message}
		<p class="detail">{message}</p>
	{/if}
	<BackHome />
</div>

<style>
	.error-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem 1rem;
		text-align: center;
	}

	h1 {
		margin-bottom: 1.5rem;
		font-size: 3rem;
		font-weight: 300;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.lead {
		margin: 0;
		font-size: 1.1rem;
		color: var(--text);
	}

	.detail {
		margin: 0.5rem 0 0;
		font-size: 0.9rem;
		color: var(--text-muted);
	}
</style>

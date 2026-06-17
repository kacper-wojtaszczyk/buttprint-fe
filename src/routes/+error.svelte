<script lang="ts">
	import { page } from '$app/state';
	import BackHome from '$lib/components/BackHome.svelte';
</script>

<svelte:head>
	<title>Buttprint — {page.status}</title>
</svelte:head>

<div class="page">
	<h1>{page.status}</h1>
	<p class="status error">{page.error?.message ?? 'Something went wrong.'}</p>
	<p class="hint">There's no buttprint for that spot in space and time.</p>
	<BackHome />
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem 1rem;
		text-align: center;
	}

	h1 {
		margin-bottom: 1rem;
		font-size: 4rem;
		font-weight: 300;
		letter-spacing: 0.05em;
	}

	.status {
		color: var(--text-muted);
		margin: 0;
	}

	.error {
		color: #c47272;
	}

	.hint {
		color: var(--text-muted);
		margin-top: 0.5rem;
	}
</style>

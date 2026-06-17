<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<a class="back-home" href={resolve('/')}>← back to here &amp; now</a>

<style>
	.back-home {
		display: inline-block;
		margin-top: 1.5rem;
		background: transparent;
		color: var(--text-muted);
		border: 1px solid var(--text-muted);
		padding: 0.5rem 0.9rem;
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.9rem;
		text-decoration: none;
		cursor: pointer;
	}

	.back-home:hover {
		color: var(--text);
		border-color: var(--text);
	}
</style>

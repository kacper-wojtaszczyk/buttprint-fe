<script lang="ts">
	let { svg }: { svg: string } = $props();
</script>

<div class="gallery-frame">
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- SVG from trusted buttprint-api -->
	{@html svg}
</div>

<style>
	.gallery-frame {
		display: flex;
		justify-content: center;
		width: 100%;
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem 0;
	}

	.gallery-frame :global(svg) {
		width: 100%;
		height: auto;
	}
</style>

<script lang="ts">
	import '../app.css';
	import GitHubLink from '$lib/components/GitHubLink.svelte';

	let { children } = $props();
</script>

<GitHubLink />

<main>
	{@render children()}
</main>

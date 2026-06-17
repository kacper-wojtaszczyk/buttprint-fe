<script lang="ts">
	import { page } from '$app/state';
	import ErrorState from '$lib/components/ErrorState.svelte';
</script>

<svelte:head>
	<title>Buttprint — not found</title>
</svelte:head>

<ErrorState message={page.error?.message} />

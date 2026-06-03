<script lang="ts">
	import { toRFC3339Local, toDatetimeLocalValue } from '$lib/time';

	let {
		timestamp,
		onSelect,
		onLive
	}: {
		timestamp: string | undefined;
		onSelect: (rfc3339: string) => void;
		onLive: () => void;
	} = $props();

	let isLive = $derived(timestamp === undefined);

	let inputValue = $derived(
		timestamp ? toDatetimeLocalValue(timestamp) : toDatetimeLocalValue(new Date().toISOString())
	);

	function handleChange(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		if (!value) return;
		onSelect(toRFC3339Local(value));
	}
</script>

<div class="time-picker">
	<input
		type="datetime-local"
		value={inputValue}
		onchange={handleChange}
		aria-label="Select date and time"
	/>
	<button type="button" class:active={isLive} disabled={isLive} onclick={onLive}>
		<span class="dot" aria-hidden="true">●</span> Live
	</button>
</div>

<style>
	.time-picker {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0.5rem 0 1rem;
	}

	input {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--text-muted);
		padding: 0.4rem 0.6rem;
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.9rem;
		color-scheme: dark;
	}

	input:focus {
		outline: 1px solid var(--text);
		outline-offset: 1px;
	}

	button {
		background: transparent;
		color: var(--text-muted);
		border: 1px solid var(--text-muted);
		padding: 0.4rem 0.7rem;
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.85rem;
		cursor: pointer;
	}

	button.active {
		color: var(--text);
		border-color: var(--text);
		cursor: default;
	}

	.dot {
		color: var(--text-muted);
	}

	button.active .dot {
		color: #e06666;
	}

	button:disabled {
		cursor: default;
	}
</style>

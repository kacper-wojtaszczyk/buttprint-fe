<script lang="ts">
	import { cities, findNearestCity } from '$lib/location';
	import type { City, ParsedLocation } from '$lib/location';

	let { location, onSelect }: { location: ParsedLocation; onSelect: (city: City) => void } =
		$props();

	const sortedCities = cities.toSorted((a, b) => a.name.localeCompare(b.name));

	let currentSlug = $derived(location.type === 'city' ? location.slug : '');

	let locationLabel = $derived.by(() => {
		if (location.type === 'city') return location.name;
		const nearest = findNearestCity(location.lat, location.lon);
		if (nearest) return `Near ${nearest.name}`;
		return `${location.lat.toFixed(2)}, ${location.lon.toFixed(2)}`;
	});

	function handleChange(event: Event) {
		const slug = (event.target as HTMLSelectElement).value;
		if (!slug) return;
		const city = sortedCities.find((c) => c.slug === slug);
		if (city) onSelect(city);
	}
</script>

<div class="city-picker">
	<span class="location-label">{locationLabel}</span>
	<select value={currentSlug} onchange={handleChange} aria-label="Select a city">
		<option value="" disabled>Select a city…</option>
		{#each sortedCities as city (city.slug)}
			<option value={city.slug}>{city.name}</option>
		{/each}
	</select>
</div>

<style>
	.city-picker {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	.location-label {
		color: var(--text);
		font-size: 1.1rem;
	}

	select {
		background: var(--bg-surface);
		color: var(--text);
		border: 1px solid var(--text-muted);
		padding: 0.4rem 0.6rem;
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.9rem;
		cursor: pointer;
	}

	select:focus {
		outline: 1px solid var(--text);
		outline-offset: 1px;
	}
</style>

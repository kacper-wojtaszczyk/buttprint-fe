import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { parseLocation } from '$lib/location';

const RFC3339_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;

export const load: PageLoad = ({ params }) => {
	const location = parseLocation(params.location);

	if (!location) {
		throw error(404, `Unknown location: ${params.location}`);
	}

	if (params.timestamp && !RFC3339_PATTERN.test(params.timestamp)) {
		throw error(404, `Invalid timestamp: ${params.timestamp}`);
	}

	return {
		location,
		timestamp: params.timestamp
	};
};

import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { parseLocation } from '$lib/location';

export const load: PageLoad = ({ params }) => {
	const location = parseLocation(params.location);

	if (!location) {
		throw error(404, `Unknown location: ${params.location}`);
	}

	return {
		location,
		timestamp: params.timestamp
	};
};

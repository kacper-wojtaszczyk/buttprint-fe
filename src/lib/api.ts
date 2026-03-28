import type { ButtprintResponse } from './types';

export interface ButtprintParams {
	lat?: number;
	lon?: number;
	timestamp?: string;
}

export async function fetchButtprint(
	apiUrl: string,
	params?: ButtprintParams
): Promise<ButtprintResponse> {
	const url = new URL('/buttprint', apiUrl);

	if (params?.lat != null) url.searchParams.set('lat', String(params.lat));
	if (params?.lon != null) url.searchParams.set('lon', String(params.lon));
	if (params?.timestamp) url.searchParams.set('timestamp', params.timestamp);

	const response = await fetch(url);

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		const message = body?.error ?? `API error: ${response.status}`;
		throw new Error(message);
	}

	return (await response.json()) as ButtprintResponse;
}

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchButtprint } from './api';
import type { ButtprintResponse } from './types';

const API_URL = 'https://api.buttprint.eu';

const mockResponse: ButtprintResponse = {
	svg: '<svg><circle r="10"/></svg>',
	location: { lat: 51.92, lon: 4.48 },
	requested_timestamp: '2026-03-08T14:55:00Z',
	variables: [
		{
			name: 'pm2p5',
			value: 12.34,
			unit: 'µg/m³',
			ref_timestamp: '2026-03-08T14:00:00Z',
			actual_lat: 51.9,
			actual_lon: 4.5,
			lineage: {
				source: 'ads',
				dataset: 'cams-europe-air-quality-forecast',
				raw_file_id: '01890c24-905b-7122-b170-b60814e6ee06'
			}
		},
		{
			name: 'temperature',
			value: 8.5,
			unit: '°C',
			ref_timestamp: '2026-03-08T14:00:00Z',
			actual_lat: 51.9,
			actual_lon: 4.5,
			lineage: null
		}
	],
	score: {
		thiccness: 0.71,
		sweatiness: 0.58,
		irritation: 0.42,
		warmth: 0.64
	}
};

function mockFetch(body: unknown, init: { ok?: boolean; status?: number } = {}) {
	const { ok = true, status = 200 } = init;
	return vi.fn().mockResolvedValue({
		ok,
		status,
		json: () => Promise.resolve(body)
	});
}

beforeEach(() => {
	vi.restoreAllMocks();
});

describe('fetchButtprint', () => {
	it('calls the correct endpoint with no params', async () => {
		const fetch = mockFetch(mockResponse);
		vi.stubGlobal('fetch', fetch);

		await fetchButtprint(API_URL);

		const calledUrl = fetch.mock.calls[0][0] as URL;
		expect(calledUrl.toString()).toBe('https://api.buttprint.eu/buttprint');
	});

	it('returns typed response on success', async () => {
		vi.stubGlobal('fetch', mockFetch(mockResponse));

		const result = await fetchButtprint(API_URL);

		expect(result).toEqual(mockResponse);
		expect(result.variables).toHaveLength(2);
		expect(result.variables[0].lineage).not.toBeNull();
		expect(result.variables[1].lineage).toBeNull();
	});

	it('appends lat/lon/timestamp as query params', async () => {
		const fetch = mockFetch(mockResponse);
		vi.stubGlobal('fetch', fetch);

		await fetchButtprint(API_URL, {
			lat: 52.52,
			lon: 13.4,
			timestamp: '2026-03-08T14:00:00Z'
		});

		const calledUrl = fetch.mock.calls[0][0] as URL;
		expect(calledUrl.searchParams.get('lat')).toBe('52.52');
		expect(calledUrl.searchParams.get('lon')).toBe('13.4');
		expect(calledUrl.searchParams.get('timestamp')).toBe('2026-03-08T14:00:00Z');
	});

	it('handles lat=0 and lon=0 correctly (does not skip them)', async () => {
		const fetch = mockFetch(mockResponse);
		vi.stubGlobal('fetch', fetch);

		await fetchButtprint(API_URL, { lat: 0, lon: 0 });

		const calledUrl = fetch.mock.calls[0][0] as URL;
		expect(calledUrl.searchParams.get('lat')).toBe('0');
		expect(calledUrl.searchParams.get('lon')).toBe('0');
	});

	it('omits undefined params from query string', async () => {
		const fetch = mockFetch(mockResponse);
		vi.stubGlobal('fetch', fetch);

		await fetchButtprint(API_URL, { lat: 52.52 });

		const calledUrl = fetch.mock.calls[0][0] as URL;
		expect(calledUrl.searchParams.has('lat')).toBe(true);
		expect(calledUrl.searchParams.has('lon')).toBe(false);
		expect(calledUrl.searchParams.has('timestamp')).toBe(false);
	});

	it('throws with API error message on non-ok response', async () => {
		vi.stubGlobal(
			'fetch',
			mockFetch({ error: 'No data available for this location' }, { ok: false, status: 404 })
		);

		await expect(fetchButtprint(API_URL)).rejects.toThrow('No data available for this location');
	});

	it('throws with status code when error body has no error field', async () => {
		vi.stubGlobal(
			'fetch',
			mockFetch({ detail: 'something unexpected' }, { ok: false, status: 502 })
		);

		await expect(fetchButtprint(API_URL)).rejects.toThrow('API error: 502');
	});

	it('throws with status code when error body is not valid JSON', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({
				ok: false,
				status: 500,
				json: () => Promise.reject(new SyntaxError('Unexpected token'))
			})
		);

		await expect(fetchButtprint(API_URL)).rejects.toThrow('API error: 500');
	});
});

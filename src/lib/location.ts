import citiesData from './cities.json';

export interface City {
	slug: string;
	name: string;
	lat: number;
	lon: number;
}

export type ParsedLocation =
	| { type: 'city'; slug: string; name: string; lat: number; lon: number }
	| { type: 'coords'; lat: number; lon: number };

export const cities: City[] = citiesData;

const COORD_PATTERN = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;

export function parseLocation(param: string): ParsedLocation | null {
	if (COORD_PATTERN.test(param)) {
		const [latStr, lonStr] = param.split(',');
		const lat = parseFloat(latStr);
		const lon = parseFloat(lonStr);

		if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
			return null;
		}

		return { type: 'coords', lat, lon };
	}

	const city = cities.find((c) => c.slug === param);
	if (city) {
		return { type: 'city', ...city };
	}

	return null;
}

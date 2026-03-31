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

export const NEAREST_CITY_THRESHOLD_KM = 50;

function approxDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const R = 6371;
	const toRad = Math.PI / 180;
	const dLat = (lat2 - lat1) * toRad;
	const dLon = (lon2 - lon1) * toRad;
	const avgLat = ((lat1 + lat2) / 2) * toRad;
	const x = dLon * Math.cos(avgLat);
	return R * Math.sqrt(x * x + dLat * dLat);
}

export function findNearestCity(lat: number, lon: number): City | null {
	let nearest: City | null = null;
	let minDistance = NEAREST_CITY_THRESHOLD_KM;

	for (const city of cities) {
		const d = approxDistanceKm(lat, lon, city.lat, city.lon);
		if (d < minDistance) {
			minDistance = d;
			nearest = city;
		}
	}

	return nearest;
}

import { describe, it, expect } from 'vitest';
import { parseLocation } from './location';

describe('parseLocation', () => {
	it('resolves a known city slug', () => {
		const result = parseLocation('rotterdam');
		expect(result).toEqual({
			type: 'city',
			slug: 'rotterdam',
			name: 'Rotterdam',
			lat: 51.92,
			lon: 4.48
		});
	});

	it('parses a coordinate pair', () => {
		const result = parseLocation('51.92,4.48');
		expect(result).toEqual({ type: 'coords', lat: 51.92, lon: 4.48 });
	});

	it('handles negative coordinates', () => {
		const result = parseLocation('-33.87,151.21');
		expect(result).toEqual({ type: 'coords', lat: -33.87, lon: 151.21 });
	});

	it('returns null for an unknown slug', () => {
		expect(parseLocation('atlantis')).toBeNull();
	});

	it('returns null for invalid format', () => {
		expect(parseLocation('abc,def')).toBeNull();
		expect(parseLocation('51.92')).toBeNull();
		expect(parseLocation('')).toBeNull();
		expect(parseLocation('51.92,4.48,0')).toBeNull();
	});

	it('returns null for out-of-range coords', () => {
		expect(parseLocation('91,0')).toBeNull();
		expect(parseLocation('0,181')).toBeNull();
		expect(parseLocation('-91,0')).toBeNull();
	});
});

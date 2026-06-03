import { describe, it, expect } from 'vitest';
import { toRFC3339Local, toDatetimeLocalValue } from './time';

const RFC3339_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;

describe('toRFC3339Local', () => {
	it('produces a string the route guard accepts', () => {
		expect(RFC3339_PATTERN.test(toRFC3339Local('2026-06-03T14:30'))).toBe(true);
	});

	it('adds seconds when the input omits them', () => {
		expect(toRFC3339Local('2026-06-03T14:30')).toContain('T14:30:00');
	});
});

describe('round-trip', () => {
	it('survives local → RFC 3339 → local', () => {
		const original = '2026-06-03T14:30';
		expect(toDatetimeLocalValue(toRFC3339Local(original))).toBe(original);
	});
});

import { describe, expect, it } from '@jest/globals';
import { capitalize } from './stringUtils.js';

describe('capitalize', () => {
	it('uppercases the first letter and lowercases the rest', () => {
		expect(capitalize('CONFIRMED')).toBe('Confirmed');
		expect(capitalize('pending')).toBe('Pending');
		expect(capitalize('sHiPpEd')).toBe('Shipped');
	});

	it('handles a single character', () => {
		expect(capitalize('a')).toBe('A');
	});

	it('handles an empty string', () => {
		expect(capitalize('')).toBe('');
	});
});

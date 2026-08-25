import { describe, expect, it } from '@jest/globals';
import { isValidUsState } from './shippingAddress.js';

describe('isValidUsState', () => {
	it('accepts a contiguous state code', () => {
		expect(isValidUsState('IL')).toBe(true);
		expect(isValidUsState('CA')).toBe(true);
	});

	it('accepts DC', () => {
		expect(isValidUsState('DC')).toBe(true);
	});

	it('rejects Alaska and Hawaii', () => {
		expect(isValidUsState('AK')).toBe(false);
		expect(isValidUsState('HI')).toBe(false);
	});

	it('rejects an unknown code', () => {
		expect(isValidUsState('PR')).toBe(false);
		expect(isValidUsState('ZZ')).toBe(false);
	});

	it('is case-insensitive and trims whitespace', () => {
		expect(isValidUsState('il')).toBe(true);
		expect(isValidUsState(' IL ')).toBe(true);
		expect(isValidUsState('ak')).toBe(false);
	});

	it('rejects an empty string', () => {
		expect(isValidUsState('')).toBe(false);
	});
});

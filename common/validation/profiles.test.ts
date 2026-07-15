import { describe, expect, it } from '@jest/globals';
import { ReturnPolicyType } from '../constants.js';
import {
	validateDayRange,
	validatePersonalizationProfileInput,
	validateProcessingProfileInput,
	validateProfileName,
	validateReturnProfileInput,
	validateShippingProfileInput,
} from './profiles.js';
import { ValidationField } from './shared.js';

describe('validateProfileName', () => {
	it('requires a name', () => {
		expect(validateProfileName('  ', [])?.field).toBe(ValidationField.Name);
	});
	it('rejects names over the max length', () => {
		expect(validateProfileName('a'.repeat(65), [])?.field).toBe(
			ValidationField.Name,
		);
	});
	it('rejects case-insensitive duplicates', () => {
		expect(
			validateProfileName('Standard', ['standard'])?.message,
		).toMatch(/already exists/);
	});
	it('accepts a valid unique name', () => {
		expect(validateProfileName('Standard', ['Express'])).toBeNull();
	});
});

describe('validateDayRange', () => {
	it('rejects non-numeric input', () => {
		expect(validateDayRange('', '5')).toBeNull();
		expect(validateDayRange('abc', '5')).toBeNull();
	});
	it('rejects min < 1', () => {
		expect(validateDayRange(0, 5)).toBeNull();
	});
	it('rejects max < min', () => {
		expect(validateDayRange(5, 2)).toBeNull();
	});
	it('accepts a valid range from strings', () => {
		expect(validateDayRange('2', '5')).toEqual({ min: 2, max: 5 });
	});
	it('accepts a valid range from numbers', () => {
		expect(validateDayRange(2, 5)).toEqual({ min: 2, max: 5 });
	});
});

describe('validateProcessingProfileInput', () => {
	it('flags an invalid day range', () => {
		const errors = validateProcessingProfileInput({
			name: 'Default',
			existingNames: [],
			minDays: 5,
			maxDays: 2,
		});
		expect(errors.some((e) => e.field === ValidationField.Days)).toBe(true);
	});
	it('accepts valid input', () => {
		expect(
			validateProcessingProfileInput({
				name: 'Default',
				existingNames: [],
				minDays: 1,
				maxDays: 3,
			}),
		).toHaveLength(0);
	});
});

describe('validateShippingProfileInput', () => {
	const base = {
		name: 'Standard',
		existingNames: [] as string[],
		originZip: '02134',
		isFlatRate: false,
		flatShippingRateCents: null,
		shippingDaysMin: 2,
		shippingDaysMax: 5,
	};

	it('accepts a valid free-shipping profile', () => {
		expect(validateShippingProfileInput(base)).toHaveLength(0);
	});

	it('rejects a zip code that is not exactly 5 digits', () => {
		const errors = validateShippingProfileInput({
			...base,
			originZip: '213',
		});
		expect(errors.some((e) => e.field === ValidationField.OriginZip)).toBe(true);
	});

	it('preserves leading zeros in the zip format check', () => {
		expect(
			validateShippingProfileInput({
				...base,
				originZip: '02134',
			}).some((e) => e.field === ValidationField.OriginZip),
		).toBe(false);
	});

	it('requires a positive flat rate when isFlatRate is true', () => {
		const errors = validateShippingProfileInput({
			...base,
			isFlatRate: true,
			flatShippingRateCents: null,
		});
		expect(errors.some((e) => e.field === ValidationField.FlatRate)).toBe(true);
	});

	it('does not require a flat rate when shipping is free', () => {
		const errors = validateShippingProfileInput({
			...base,
			isFlatRate: false,
			flatShippingRateCents: null,
		});
		expect(errors.some((e) => e.field === ValidationField.FlatRate)).toBe(false);
	});
});

describe('validateReturnProfileInput', () => {
	it('requires a return window unless NO_RETURNS', () => {
		const errors = validateReturnProfileInput({
			name: 'Standard',
			existingNames: [],
			policyType: ReturnPolicyType.STANDARD,
			returnWindowDays: null,
			policyDescrRichText: '',
		});
		expect(errors.some((e) => e.field === ValidationField.WindowDays)).toBe(true);
	});
	it('does not require a window for NO_RETURNS', () => {
		const errors = validateReturnProfileInput({
			name: 'No Returns',
			existingNames: [],
			policyType: ReturnPolicyType.NO_RETURNS,
			returnWindowDays: null,
			policyDescrRichText: '',
		});
		expect(errors.some((e) => e.field === ValidationField.WindowDays)).toBe(false);
	});
	it('requires custom text for CUSTOM policies', () => {
		const errors = validateReturnProfileInput({
			name: 'Custom',
			existingNames: [],
			policyType: ReturnPolicyType.CUSTOM,
			returnWindowDays: 30,
			policyDescrRichText: '<p></p>',
		});
		expect(errors.some((e) => e.field === ValidationField.CustomText)).toBe(true);
	});
});

describe('validatePersonalizationProfileInput', () => {
	it('requires a positive cost', () => {
		const errors = validatePersonalizationProfileInput({
			name: 'Engraving',
			existingNames: [],
			costCents: 0,
			helperText: null,
		});
		expect(errors.some((e) => e.field === ValidationField.Cost)).toBe(true);
	});
	it('rejects helper text over the max length', () => {
		const errors = validatePersonalizationProfileInput({
			name: 'Engraving',
			existingNames: [],
			costCents: 500,
			helperText: 'a'.repeat(257),
		});
		expect(errors.some((e) => e.field === ValidationField.HelperText)).toBe(true);
	});
	it('accepts valid input', () => {
		expect(
			validatePersonalizationProfileInput({
				name: 'Engraving',
				existingNames: [],
				costCents: 500,
				helperText: 'Up to 20 characters',
			}),
		).toHaveLength(0);
	});
});

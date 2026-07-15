import { describe, expect, it } from '@jest/globals';
import { ReturnPolicyType } from '../constants.js';
import {
	validateDayRange,
	validatePersonalizationProfileFields,
	validatePersonalizationProfileInput,
	validateProcessingProfileFields,
	validateProcessingProfileInput,
	validateProfileNameFields,
	validateProfileNameUniqueness,
	validateReturnProfileFields,
	validateReturnProfileInput,
	validateShippingProfileFields,
	validateShippingProfileInput,
} from './profiles.js';
import { ValidationField } from './shared.js';

describe('validateProfileNameFields', () => {
	it('requires a name', () => {
		expect(validateProfileNameFields('  ')?.field).toBe(
			ValidationField.Name,
		);
	});
	it('rejects names over the max length', () => {
		expect(validateProfileNameFields('a'.repeat(65))?.field).toBe(
			ValidationField.Name,
		);
	});
	it('accepts a valid name', () => {
		expect(validateProfileNameFields('Standard')).toBeNull();
	});
});

describe('validateProfileNameUniqueness', () => {
	it('rejects case-insensitive duplicates', () => {
		expect(
			validateProfileNameUniqueness('Standard', ['standard'])
				?.message,
		).toMatch(/already exists/);
	});
	it('accepts a unique name', () => {
		expect(
			validateProfileNameUniqueness('Standard', ['Express']),
		).toBeNull();
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

describe('validateProcessingProfileFields', () => {
	it('flags an invalid day range', () => {
		const errors = validateProcessingProfileFields({
			name: 'Default',
			minDays: 5,
			maxDays: 2,
		});
		expect(errors.some((e) => e.field === ValidationField.Days)).toBe(
			true,
		);
	});
	it('accepts valid input without needing existingNames', () => {
		expect(
			validateProcessingProfileFields({
				name: 'Default',
				minDays: 1,
				maxDays: 3,
			}),
		).toHaveLength(0);
	});
});

describe('validateProcessingProfileInput', () => {
	it('additionally rejects a duplicate name', () => {
		const errors = validateProcessingProfileInput({
			name: 'Default',
			existingNames: ['default'],
			minDays: 1,
			maxDays: 3,
		});
		expect(errors.some((e) => e.field === ValidationField.Name)).toBe(
			true,
		);
	});
	it('accepts valid, unique input', () => {
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

describe('validateShippingProfileFields', () => {
	const base = {
		name: 'Standard',
		originZip: '02134',
		isFlatRate: false,
		flatShippingRateCents: null,
		shippingDaysMin: 2,
		shippingDaysMax: 5,
	};

	it('accepts a valid free-shipping profile without needing existingNames', () => {
		expect(validateShippingProfileFields(base)).toHaveLength(0);
	});

	it('rejects a zip code that is not exactly 5 digits', () => {
		const errors = validateShippingProfileFields({
			...base,
			originZip: '213',
		});
		expect(
			errors.some((e) => e.field === ValidationField.OriginZip),
		).toBe(true);
	});

	it('preserves leading zeros in the zip format check', () => {
		expect(
			validateShippingProfileFields({
				...base,
				originZip: '02134',
			}).some((e) => e.field === ValidationField.OriginZip),
		).toBe(false);
	});

	it('requires a positive flat rate when isFlatRate is true', () => {
		const errors = validateShippingProfileFields({
			...base,
			isFlatRate: true,
			flatShippingRateCents: null,
		});
		expect(errors.some((e) => e.field === ValidationField.FlatRate)).toBe(
			true,
		);
	});

	it('does not require a flat rate when shipping is free', () => {
		const errors = validateShippingProfileFields({
			...base,
			isFlatRate: false,
			flatShippingRateCents: null,
		});
		expect(errors.some((e) => e.field === ValidationField.FlatRate)).toBe(
			false,
		);
	});
});

describe('validateShippingProfileInput', () => {
	it('additionally rejects a duplicate name', () => {
		const errors = validateShippingProfileInput({
			name: 'Standard',
			existingNames: ['standard'],
			originZip: '02134',
			isFlatRate: false,
			flatShippingRateCents: null,
			shippingDaysMin: 2,
			shippingDaysMax: 5,
		});
		expect(errors.some((e) => e.field === ValidationField.Name)).toBe(
			true,
		);
	});
});

describe('validateReturnProfileFields', () => {
	it('requires a return window unless NO_RETURNS', () => {
		const errors = validateReturnProfileFields({
			name: 'Standard',
			policyType: ReturnPolicyType.STANDARD,
			returnWindowDays: null,
			policyDescrRichText: '',
		});
		expect(
			errors.some((e) => e.field === ValidationField.WindowDays),
		).toBe(true);
	});
	it('does not require a window for NO_RETURNS', () => {
		const errors = validateReturnProfileFields({
			name: 'No Returns',
			policyType: ReturnPolicyType.NO_RETURNS,
			returnWindowDays: null,
			policyDescrRichText: '',
		});
		expect(
			errors.some((e) => e.field === ValidationField.WindowDays),
		).toBe(false);
	});
	it('requires custom text for CUSTOM policies', () => {
		const errors = validateReturnProfileFields({
			name: 'Custom',
			policyType: ReturnPolicyType.CUSTOM,
			returnWindowDays: 30,
			policyDescrRichText: '<p></p>',
		});
		expect(
			errors.some((e) => e.field === ValidationField.CustomText),
		).toBe(true);
	});
});

describe('validateReturnProfileInput', () => {
	it('additionally rejects a duplicate name', () => {
		const errors = validateReturnProfileInput({
			name: 'Standard',
			existingNames: ['standard'],
			policyType: ReturnPolicyType.STANDARD,
			returnWindowDays: 30,
			policyDescrRichText: '',
		});
		expect(errors.some((e) => e.field === ValidationField.Name)).toBe(
			true,
		);
	});
});

describe('validatePersonalizationProfileFields', () => {
	it('requires a positive cost', () => {
		const errors = validatePersonalizationProfileFields({
			name: 'Engraving',
			costCents: 0,
			helperText: null,
		});
		expect(errors.some((e) => e.field === ValidationField.Cost)).toBe(
			true,
		);
	});
	it('rejects helper text over the max length', () => {
		const errors = validatePersonalizationProfileFields({
			name: 'Engraving',
			costCents: 500,
			helperText: 'a'.repeat(257),
		});
		expect(
			errors.some((e) => e.field === ValidationField.HelperText),
		).toBe(true);
	});
	it('accepts valid input without needing existingNames', () => {
		expect(
			validatePersonalizationProfileFields({
				name: 'Engraving',
				costCents: 500,
				helperText: 'Up to 20 characters',
			}),
		).toHaveLength(0);
	});
});

describe('validatePersonalizationProfileInput', () => {
	it('additionally rejects a duplicate name', () => {
		const errors = validatePersonalizationProfileInput({
			name: 'Engraving',
			existingNames: ['engraving'],
			costCents: 500,
			helperText: null,
		});
		expect(errors.some((e) => e.field === ValidationField.Name)).toBe(
			true,
		);
	});
});

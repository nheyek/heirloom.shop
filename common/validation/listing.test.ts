import { describe, expect, it } from '@jest/globals';
import { LISTING_LIMITS } from '../constants.js';
import { Combinations, Variations } from '../domain/listing.js';
import {
	validateDescrSectionEntry,
	validateImageUuids,
	validateInventory,
	validateListingFields,
	validateSubtitle,
	validateTitle,
	validateOptionDeletion,
	validateVariationEntry,
	VariationEntryInput,
} from './listing.js';
import { ValidationField } from './shared.js';

const UUID_A = '11111111-1111-1111-1111-111111111111';
const UUID_B = '22222222-2222-2222-2222-222222222222';

describe('validateTitle', () => {
	it('rejects empty titles', () => {
		expect(validateTitle('   ')?.field).toBe(ValidationField.Title);
	});
	it('rejects titles over the max length', () => {
		expect(validateTitle('a'.repeat(129))?.field).toBe(ValidationField.Title);
	});
	it('accepts a valid title', () => {
		expect(validateTitle('Handmade Vase')).toBeNull();
	});
});

describe('validateSubtitle', () => {
	it('allows null/empty subtitle', () => {
		expect(validateSubtitle(null)).toBeNull();
		expect(validateSubtitle('')).toBeNull();
	});
	it('rejects subtitles over the max length', () => {
		expect(validateSubtitle('a'.repeat(257))?.field).toBe(ValidationField.Subtitle);
	});
});

describe('validateInventory', () => {
	it('allows any inventory value (including null) when not tracking', () => {
		expect(validateInventory(false, null)).toBeNull();
		expect(validateInventory(false, undefined)).toBeNull();
		expect(validateInventory(false, -5)).toBeNull();
	});

	it('requires a value when tracking is enabled', () => {
		expect(validateInventory(true, null)?.field).toBe(
			ValidationField.Inventory,
		);
		expect(validateInventory(true, undefined)?.field).toBe(
			ValidationField.Inventory,
		);
	});

	it('rejects negative inventory when tracking is enabled', () => {
		expect(validateInventory(true, -1)?.field).toBe(
			ValidationField.Inventory,
		);
	});

	it('rejects non-integer inventory when tracking is enabled', () => {
		expect(validateInventory(true, 1.5)?.field).toBe(
			ValidationField.Inventory,
		);
	});

	it('rejects inventory over the postgres integer max', () => {
		expect(
			validateInventory(true, LISTING_LIMITS.maxInventory + 1)?.field,
		).toBe(ValidationField.Inventory);
	});

	it('accepts zero and the postgres integer max when tracking is enabled', () => {
		expect(validateInventory(true, 0)).toBeNull();
		expect(
			validateInventory(true, LISTING_LIMITS.maxInventory),
		).toBeNull();
	});
});

describe('validateImageUuids', () => {
	it('allows no images', () => {
		expect(validateImageUuids([])).toBeNull();
	});
	it('rejects more than the max allowed images', () => {
		const many = Array.from({ length: 21 }, () => UUID_A);
		expect(validateImageUuids(many)?.message).toMatch(/at most/i);
	});
	it('rejects malformed uuids', () => {
		expect(validateImageUuids(['not-a-uuid'])?.message).toMatch(
			/invalid/i,
		);
	});
	it('accepts a valid list', () => {
		expect(validateImageUuids([UUID_A, UUID_B])).toBeNull();
	});
});

describe('validateVariationEntry', () => {
	const entry = (
		overrides: Partial<VariationEntryInput> = {},
	): VariationEntryInput => ({
		name: 'Size',
		options: [
			{ id: 'a', name: 'Small', priceCents: null },
			{ id: 'b', name: 'Large', priceCents: null },
		],
		defaultOption: 'a',
		...overrides,
	});

	it('requires a name', () => {
		const errors = validateVariationEntry(entry({ name: '' }), []);
		expect(errors.some((e) => e.field === ValidationField.VariationName)).toBe(
			true,
		);
	});
	it('rejects duplicate variation names (case-insensitive)', () => {
		const errors = validateVariationEntry(entry(), ['size']);
		expect(
			errors.some((e) => /already exists/.test(e.message)),
		).toBe(true);
	});
	it('requires at least two options', () => {
		const errors = validateVariationEntry(
			entry({ options: [{ id: 'a', name: 'Small', priceCents: null }] }),
			[],
		);
		expect(errors.some((e) => e.field === ValidationField.VariationOptions)).toBe(
			true,
		);
	});
	it('rejects duplicate option names', () => {
		const errors = validateVariationEntry(
			entry({
				options: [
					{ id: 'a', name: 'Small', priceCents: null },
					{ id: 'b', name: 'small', priceCents: null },
				],
			}),
			[],
		);
		expect(errors.some((e) => /unique/.test(e.message))).toBe(true);
	});
	it('rejects invalid option prices', () => {
		const errors = validateVariationEntry(
			entry({
				options: [
					{ id: 'a', name: 'Small', priceCents: -5 },
					{ id: 'b', name: 'Large', priceCents: null },
				],
			}),
			[],
		);
		expect(errors.some((e) => /prices must be valid/.test(e.message))).toBe(
			true,
		);
	});
	it('requires a default option', () => {
		const errors = validateVariationEntry(
			entry({ defaultOption: '' }),
			[],
		);
		expect(
			errors.some(
				(e) => e.field === ValidationField.VariationDefaultOption,
			),
		).toBe(true);
	});
	it('rejects a default option that is not one of the options', () => {
		const errors = validateVariationEntry(
			entry({ defaultOption: 'missing' }),
			[],
		);
		expect(
			errors.some(
				(e) =>
					e.field === ValidationField.VariationDefaultOption &&
					/one of the options/.test(e.message),
			),
		).toBe(true);
	});
	it('accepts any option as the default', () => {
		expect(
			validateVariationEntry(entry({ defaultOption: 'b' }), []),
		).toHaveLength(0);
	});
	it('accepts a valid variation', () => {
		expect(validateVariationEntry(entry(), [])).toHaveLength(0);
	});
});

describe('validateOptionDeletion', () => {
	it('blocks deleting the default option', () => {
		const error = validateOptionDeletion('a', 'a');
		expect(error?.field).toBe(ValidationField.VariationDefaultOption);
		expect(error?.message).toMatch(/default option cannot be deleted/i);
	});
	it('allows deleting any other option', () => {
		expect(validateOptionDeletion('b', 'a')).toBeNull();
	});
});

describe('validateDescrSectionEntry', () => {
	it('requires title and body', () => {
		const errors = validateDescrSectionEntry(
			{ title: '', richText: '' },
			[],
		);
		expect(errors.some((e) => e.field === ValidationField.DescrSectionTitle)).toBe(
			true,
		);
		expect(errors.some((e) => e.field === ValidationField.DescrSectionBody)).toBe(
			true,
		);
	});
	it('treats stripped HTML as empty', () => {
		const errors = validateDescrSectionEntry(
			{ title: 'Materials', richText: '<p></p>' },
			[],
		);
		expect(errors.some((e) => e.field === ValidationField.DescrSectionBody)).toBe(
			true,
		);
	});
	it('rejects duplicate titles (exact match)', () => {
		const errors = validateDescrSectionEntry(
			{ title: 'Materials', richText: '<p>Oak</p>' },
			['Materials'],
		);
		expect(
			errors.some((e) => /already exists/.test(e.message)),
		).toBe(true);
	});
});

describe('validateListingFields', () => {
	const baseInput = {
		title: 'A nice mug',
		subtitle: null,
		categoryId: 'CERAMICS',
		priceCents: 2500,
		imageUuids: [UUID_A],
		shippingProfileId: null,
		returnProfileId: null,
		processingProfileId: null,
		fullDescr: null,
		variations: {} as Variations,
		combinations: {} as Combinations,
		trackInventory: false,
	};

	it('accepts a minimal valid listing', () => {
		expect(
			validateListingFields(baseInput, { directFulfillment: false }),
		).toHaveLength(0);
	});

	it('does not require images', () => {
		const errors = validateListingFields(
			{ ...baseInput, imageUuids: [] },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Images)).toBe(false);
	});

	it('requires a price when no variation prices vary', () => {
		const errors = validateListingFields(
			{ ...baseInput, priceCents: null },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Price)).toBe(true);
	});

	it('requires fulfillment profiles when directFulfillment is true', () => {
		const errors = validateListingFields(baseInput, {
			directFulfillment: true,
		});
		expect(errors.some((e) => e.field === ValidationField.ShippingProfile)).toBe(
			true,
		);
		expect(errors.some((e) => e.field === ValidationField.ReturnProfile)).toBe(true);
		expect(
			errors.some((e) => e.field === ValidationField.ProcessingProfile),
		).toBe(true);
	});

	it('rejects more variations than the max allowed', () => {
		const variations: Variations = {};
		for (let i = 0; i < 4; i++) {
			variations[`v${i}`] = {
				name: `Var ${i}`,
				pricesVary: false,
				defaultOption: 'a',
				imagesVary: false,
				order: i,
				options: {
					a: { name: 'A', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'B', order: 1, priceCents: null, imageUuids: [] },
				},
			};
		}
		const errors = validateListingFields(
			{ ...baseInput, variations },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Variations)).toBe(true);
	});

	it('requires every variation to have a default option that exists', () => {
		const variationWith = (defaultOption: string): Variations => ({
			v1: {
				name: 'Size',
				pricesVary: false,
				defaultOption,
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		});
		const combinations: Combinations = {
			'v1:a': { priceCents: null, imageUuid: null, disabled: false },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false },
		};
		const hasDefaultError = (defaultOption: string) =>
			validateListingFields(
				{
					...baseInput,
					variations: variationWith(defaultOption),
					combinations,
				},
				{ directFulfillment: false },
			).some((e) => e.field === ValidationField.VariationDefaultOption);

		expect(hasDefaultError('')).toBe(true);
		expect(hasDefaultError('missing')).toBe(true);
		expect(hasDefaultError('b')).toBe(false);
	});

	it('requires at least one active combination', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: false,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: null, imageUuid: null, disabled: true },
			'v1:b': { priceCents: null, imageUuid: null, disabled: true },
		};
		const errors = validateListingFields(
			{ ...baseInput, variations, combinations },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Combinations)).toBe(true);
	});

	it('requires a price for every active combination when prices vary', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: true,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: 1000, imageUuid: null, disabled: false },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false },
		};
		const errors = validateListingFields(
			{ ...baseInput, priceCents: null, variations, combinations },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Combinations)).toBe(true);
	});

	it('requires a price for every active combination when prices vary, even if the listing has a base price', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: true,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: 1000, imageUuid: null, disabled: false },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false },
		};
		const errors = validateListingFields(
			{ ...baseInput, priceCents: 2500, variations, combinations },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Combinations)).toBe(true);
	});

	it('rejects too many description sections', () => {
		const fullDescr = Array.from({ length: 6 }, (_, i) => ({
			title: `Section ${i}`,
			richText: '<p>Body</p>',
		}));
		const errors = validateListingFields(
			{ ...baseInput, fullDescr },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.DescrSections)).toBe(true);
	});

	it('requires an inventory value when trackInventory is enabled', () => {
		const errors = validateListingFields(
			{ ...baseInput, trackInventory: true, inventory: null },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Inventory)).toBe(
			true,
		);
	});

	it('accepts a valid inventory value when trackInventory is enabled', () => {
		const errors = validateListingFields(
			{ ...baseInput, trackInventory: true, inventory: 10 },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Inventory)).toBe(
			false,
		);
	});

	it('ignores an invalid inventory value when trackInventory is disabled', () => {
		const errors = validateListingFields(
			{ ...baseInput, trackInventory: false, inventory: -1 },
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Inventory)).toBe(
			false,
		);
	});

	it('ignores the listing-level inventory value once variations exist', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: false,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: null, imageUuid: null, disabled: false, inventory: 3 },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false, inventory: 5 },
		};
		const errors = validateListingFields(
			{
				...baseInput,
				trackInventory: true,
				inventory: null,
				variations,
				combinations,
			},
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Inventory)).toBe(
			false,
		);
	});

	it('requires an inventory value on every active combination when trackInventory is enabled', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: false,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: null, imageUuid: null, disabled: false, inventory: 3 },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false },
		};
		const errors = validateListingFields(
			{
				...baseInput,
				trackInventory: true,
				variations,
				combinations,
			},
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Combinations)).toBe(
			true,
		);
	});

	it('does not require inventory on a disabled combination', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: false,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: null, imageUuid: null, disabled: false, inventory: 3 },
			'v1:b': { priceCents: null, imageUuid: null, disabled: true },
		};
		const errors = validateListingFields(
			{
				...baseInput,
				trackInventory: true,
				variations,
				combinations,
			},
			{ directFulfillment: false },
		);
		expect(errors.some((e) => e.field === ValidationField.Combinations)).toBe(
			false,
		);
	});

	it('accepts valid per-combination inventory values when trackInventory is enabled', () => {
		const variations: Variations = {
			v1: {
				name: 'Size',
				pricesVary: false,
				defaultOption: 'a',
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuids: [] },
					b: { name: 'Large', order: 1, priceCents: null, imageUuids: [] },
				},
			},
		};
		const combinations: Combinations = {
			'v1:a': { priceCents: null, imageUuid: null, disabled: false, inventory: 0 },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false, inventory: 10 },
		};
		const errors = validateListingFields(
			{
				...baseInput,
				trackInventory: true,
				variations,
				combinations,
			},
			{ directFulfillment: false },
		);
		expect(errors).toHaveLength(0);
	});
});

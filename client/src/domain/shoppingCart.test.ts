import { CartItemData } from '@heirloom/common/contract';
import { getCombinationKey } from '@heirloom/common/domain/listing';
import { calculateItemPrice, isCartItemValid } from './shoppingCart';

const baseListingData: CartItemData = {
	id: 1,
	shortId: 'abc123',
	title: 'Test Listing',
	subtitle: '',
	categoryId: 'cat1',
	priceCents: 1000,
	shopId: 1,
	shopShortId: 'shop1',
	shopTitle: 'Test Shop',
	imageUuids: [],
	available: true,
	variations: {},
	combinations: {},
	shippingPrice: 500,
	personalizationCostCents: null,
	personalizationName: null,
};

describe('calculateItemPrice', () => {
	// Combination/option/variation price-resolution branches are exercised
	// exhaustively against the shared resolver itself in
	// common/domain/listing.test.ts (getListingDisplayPrice). This test just
	// confirms calculateItemPrice wires its arguments into that resolver
	// correctly — it isn't trying to re-cover every branch.
	it('returns the base price when there are no selected options', () => {
		expect(calculateItemPrice(baseListingData, {})).toBe(1000);
	});

	it('returns the combination price when a matching combination exists', () => {
		const varId = 'var-uuid-1';
		const optId = 'opt-uuid-2';
		const key = getCombinationKey({ [varId]: optId });
		const listingData: CartItemData = {
			...baseListingData,
			combinations: {
				[key]: { priceCents: 1500, imageUuid: null, disabled: false },
			},
		};

		expect(calculateItemPrice(listingData, { [varId]: optId })).toBe(1500);
	});

	it('adds the personalization surcharge when personalization text is provided', () => {
		const listingData: CartItemData = {
			...baseListingData,
			personalizationCostCents: 250,
		};
		expect(
			calculateItemPrice(listingData, {}, 'Happy Birthday'),
		).toBe(1250);
	});

	it('does not add a surcharge when no personalization text is provided', () => {
		const listingData: CartItemData = {
			...baseListingData,
			personalizationCostCents: 250,
		};
		expect(calculateItemPrice(listingData, {})).toBe(1000);
	});
});

describe('isCartItemValid', () => {
	it('is invalid when the listing was not found', () => {
		expect(isCartItemValid({}, undefined)).toBe(false);
	});

	it('is invalid when the listing is no longer available', () => {
		const listingData: CartItemData = {
			...baseListingData,
			available: false,
		};
		expect(isCartItemValid({}, listingData)).toBe(false);
	});

	it('is valid when available with no variations to select', () => {
		expect(isCartItemValid({}, baseListingData)).toBe(true);
	});

	it('defers to the combination selection check when available', () => {
		const varId = 'var-uuid-1';
		const optId = 'opt-uuid-2';
		const listingData: CartItemData = {
			...baseListingData,
			variations: {
				[varId]: {
					name: 'Size',
					pricesVary: false,
					imagesVary: false,
					order: 0,
					options: {
						[optId]: {
							name: 'M',
							order: 0,
							priceCents: null,
							imageUuid: null,
						},
					},
				},
			},
			combinations: {},
		};

		expect(
			isCartItemValid(
				{ [varId]: optId },
				listingData,
			),
		).toBe(false);

		const key = getCombinationKey({ [varId]: optId });
		const validListingData: CartItemData = {
			...listingData,
			combinations: {
				[key]: { priceCents: null, imageUuid: null, disabled: false },
			},
		};
		expect(
			isCartItemValid(
				{ [varId]: optId },
				validListingData,
			),
		).toBe(true);
	});

	it('is invalid when personalization text is set but the listing no longer offers personalization', () => {
		expect(
			isCartItemValid({}, baseListingData, 'Happy Birthday'),
		).toBe(false);
	});

	it('is valid with personalization text when the listing offers personalization', () => {
		const listingData: CartItemData = {
			...baseListingData,
			personalizationName: 'Engraving',
			personalizationCostCents: 250,
		};
		expect(
			isCartItemValid({}, listingData, 'Happy Birthday'),
		).toBe(true);
	});

	it('is valid with no personalization text regardless of listing support', () => {
		expect(isCartItemValid({}, baseListingData, undefined)).toBe(
			true,
		);
	});
});

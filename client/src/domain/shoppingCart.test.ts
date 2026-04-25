import { CartItemData } from '@heirloom/common/contract';
import { calculateItemPrice } from './shoppingCart';

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
	variations: [],
	shippingPrice: 500,
};

describe('calculateItemPrice', () => {
	it('returns the base price when there are no variations', () => {
		expect(calculateItemPrice(baseListingData, {})).toBe(1000);
	});

	it('adds additional price for selected options when pricesVary is true', () => {
		const listingData: CartItemData = {
			...baseListingData,
			variations: [
				{
					id: 10,
					name: 'Size',
					pricesVary: true,
					options: [
						{ id: 1, name: 'Small', additionalPriceCents: 0 },
						{ id: 2, name: 'Large', additionalPriceCents: 500 },
					],
				},
			],
		};

		expect(calculateItemPrice(listingData, { 10: 2 })).toBe(1500);
	});

	it('does not add price for options when pricesVary is false', () => {
		const listingData: CartItemData = {
			...baseListingData,
			variations: [
				{
					id: 10,
					name: 'Color',
					pricesVary: false,
					options: [{ id: 1, name: 'Red', additionalPriceCents: 300 }],
				},
			],
		};

		expect(calculateItemPrice(listingData, { 10: 1 })).toBe(1000);
	});

	it('throws when a selected variation does not exist on the listing', () => {
		const listingData: CartItemData = {
			...baseListingData,
			variations: [
				{
					id: 10,
					name: 'Size',
					pricesVary: true,
					options: [{ id: 1, name: 'Small', additionalPriceCents: 0 }],
				},
			],
		};

		expect(() => calculateItemPrice(listingData, { 99: 1 })).toThrow(
			'Variation with ID 99 not found for listing abc123',
		);
	});

	it('throws when a selected option does not exist on the variation', () => {
		const listingData: CartItemData = {
			...baseListingData,
			variations: [
				{
					id: 10,
					name: 'Size',
					pricesVary: true,
					options: [{ id: 1, name: 'Small', additionalPriceCents: 0 }],
				},
			],
		};

		expect(() => calculateItemPrice(listingData, { 10: 99 })).toThrow(
			'Option with ID 99 not found for variation 10 in listing abc123',
		);
	});

	it('accumulates price across multiple variations', () => {
		const listingData: CartItemData = {
			...baseListingData,
			variations: [
				{
					id: 10,
					name: 'Size',
					pricesVary: true,
					options: [{ id: 1, name: 'Large', additionalPriceCents: 500 }],
				},
				{
					id: 20,
					name: 'Material',
					pricesVary: true,
					options: [{ id: 2, name: 'Gold', additionalPriceCents: 2000 }],
				},
			],
		};

		expect(calculateItemPrice(listingData, { 10: 1, 20: 2 })).toBe(3500);
	});
});

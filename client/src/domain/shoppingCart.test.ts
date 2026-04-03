import { calculateItemPrice } from './shoppingCart';
import { ShoppingCartItem } from '../types/ShoppingCartItem';

const baseItem: ShoppingCartItem = {
	listingData: {
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
	},
	selectedOptions: {},
	quantity: 1,
	addedAt: Date.now(),
};

describe('calculateItemPrice', () => {
	it('returns the base price when there are no variations', () => {
		expect(calculateItemPrice(baseItem)).toBe(1000);
	});

	it('adds additional price for selected options when pricesVary is true', () => {
		const item: ShoppingCartItem = {
			...baseItem,
			listingData: {
				...baseItem.listingData,
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
			},
			selectedOptions: { 10: 2 },
		};

		expect(calculateItemPrice(item)).toBe(1500);
	});

	it('does not add price for options when pricesVary is false', () => {
		const item: ShoppingCartItem = {
			...baseItem,
			listingData: {
				...baseItem.listingData,
				variations: [
					{
						id: 10,
						name: 'Color',
						pricesVary: false,
						options: [
							{ id: 1, name: 'Red', additionalPriceCents: 300 },
						],
					},
				],
			},
			selectedOptions: { 10: 1 },
		};

		expect(calculateItemPrice(item)).toBe(1000);
	});

	it('throws when a selected variation does not exist on the listing', () => {
		const item: ShoppingCartItem = {
			...baseItem,
			listingData: {
				...baseItem.listingData,
				variations: [
					{
						id: 10,
						name: 'Size',
						pricesVary: true,
						options: [{ id: 1, name: 'Small', additionalPriceCents: 0 }],
					},
				],
			},
			selectedOptions: { 99: 1 },
		};

		expect(() => calculateItemPrice(item)).toThrow(
			'Variation with ID 99 not found for listing abc123',
		);
	});

	it('throws when a selected option does not exist on the variation', () => {
		const item: ShoppingCartItem = {
			...baseItem,
			listingData: {
				...baseItem.listingData,
				variations: [
					{
						id: 10,
						name: 'Size',
						pricesVary: true,
						options: [{ id: 1, name: 'Small', additionalPriceCents: 0 }],
					},
				],
			},
			selectedOptions: { 10: 99 },
		};

		expect(() => calculateItemPrice(item)).toThrow(
			'Option with ID 99 not found for variation 10 in listing abc123',
		);
	});

	it('accumulates price across multiple variations', () => {
		const item: ShoppingCartItem = {
			...baseItem,
			listingData: {
				...baseItem.listingData,
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
			},
			selectedOptions: { 10: 1, 20: 2 },
		};

		expect(calculateItemPrice(item)).toBe(3500);
	});
});

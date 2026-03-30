import {
	calculateCheckoutTotals,
	createOrderItemSnapshots,
	CheckoutQueryData,
} from './checkout.domain';
import { Listing } from '../entities/generated/Listing';
import { ListingVariationOption } from '../entities/generated/ListingVariationOption';

const makeListing = (
	shortId: string,
	priceCents: number,
	overrides: Partial<{
		flatShippingRateCents: number;
		title: string;
		shopTitle: string;
		imageUuids: string[];
	}> = {},
) =>
	({
		shortId,
		priceCents,
		title: overrides.title ?? 'Test Listing',
		shop: { title: overrides.shopTitle ?? 'Test Shop' },
		imageUuids: overrides.imageUuids ?? [],
		shippingProfile: overrides.flatShippingRateCents !== undefined
			? { flatShippingRateCents: overrides.flatShippingRateCents }
			: undefined,
	}) as unknown as Listing;

const makeOption = (
	id: number,
	additionalPriceCents: number,
	variationName: string,
	optionName: string,
) =>
	({
		id,
		additionalPriceCents,
		optionName,
		listingVariation: { variationName },
	}) as unknown as ListingVariationOption;

describe('calculateCheckoutTotals', () => {
	it('returns zero totals for an empty cart', () => {
		const queryData: CheckoutQueryData = { listings: [], variationOptions: [] };
		expect(calculateCheckoutTotals([], queryData)).toEqual({
			subtotalCents: 0,
			shippingTotalCents: 0,
		});
	});

	it('calculates subtotal from listing base price', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1000);
	});

	it('multiplies unit price by quantity', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 500)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 3 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1500);
	});

	it('adds additional price from selected options', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [makeOption(10, 500, 'Size', 'Large')],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: { 1: 10 }, quantity: 1 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1500);
	});

	it('calculates shipping total from shipping profile', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000, { flatShippingRateCents: 400 })],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 2 }],
			queryData,
		);
		expect(result.shippingTotalCents).toBe(800);
	});

	it('treats missing shipping profile as zero shipping', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result.shippingTotalCents).toBe(0);
	});

	it('skips items whose listing is not found', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'unknown', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result).toEqual({ subtotalCents: 0, shippingTotalCents: 0 });
	});

	it('accumulates totals across multiple items', () => {
		const queryData: CheckoutQueryData = {
			listings: [
				makeListing('abc', 1000, { flatShippingRateCents: 300 }),
				makeListing('xyz', 2000, { flatShippingRateCents: 500 }),
			],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{ listingShortId: 'abc', selectedOptions: {}, quantity: 2 },
				{ listingShortId: 'xyz', selectedOptions: {}, quantity: 1 },
			],
			queryData,
		);
		expect(result.subtotalCents).toBe(4000);
		expect(result.shippingTotalCents).toBe(1100);
	});
});

describe('createOrderItemSnapshots', () => {
	it('returns an empty array for an empty cart', () => {
		const queryData: CheckoutQueryData = { listings: [], variationOptions: [] };
		expect(createOrderItemSnapshots([], queryData)).toEqual([]);
	});

	it('creates a snapshot with correct fields', () => {
		const queryData: CheckoutQueryData = {
			listings: [
				makeListing('abc', 1000, {
					title: 'Handmade Bowl',
					shopTitle: 'Clay Co',
					imageUuids: ['uuid-1', 'uuid-2'],
				}),
			],
			variationOptions: [],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 2 }],
			queryData,
		);
		expect(snapshot).toEqual({
			title: 'Handmade Bowl',
			shopName: 'Clay Co',
			imageUuid: 'uuid-1',
			unitPriceCents: 1000,
			quantity: 2,
			variations: [],
		});
	});

	it('uses null for imageUuid when listing has no images', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000, { imageUuids: [] })],
			variationOptions: [],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(snapshot.imageUuid).toBeNull();
	});

	it('includes variation name and value in snapshot', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [makeOption(10, 500, 'Size', 'Large')],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: { 1: 10 }, quantity: 1 }],
			queryData,
		);
		expect(snapshot.unitPriceCents).toBe(1500);
		expect(snapshot.variations).toEqual([{ name: 'Size', value: 'Large' }]);
	});

	it('skips items whose listing is not found', () => {
		const queryData: CheckoutQueryData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = createOrderItemSnapshots(
			[{ listingShortId: 'unknown', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result).toEqual([]);
	});
});

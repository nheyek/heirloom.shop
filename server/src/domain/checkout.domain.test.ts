import { Listing } from '@server/entities/generated/Listing';
import { ListingVariationOption } from '@server/entities/generated/ListingVariationOption';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import {
	calculateCheckoutTotals,
	createOrderItemSnapshots,
} from '@server/domain/checkout.domain';

const makeListing = (
	shortId: string,
	priceCents: number,
	overrides: Partial<{
		flatShippingRateCents: number;
		shippingDaysMin: number;
		shippingDaysMax: number;
		leadTimeDaysMin: number;
		leadTimeDaysMax: number;
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
		leadTimeDaysMin: overrides.leadTimeDaysMin ?? 0,
		leadTimeDaysMax: overrides.leadTimeDaysMax ?? 0,
		shippingProfile:
			overrides.flatShippingRateCents !== undefined
				? {
						flatShippingRateCents: overrides.flatShippingRateCents,
						shippingDaysMin: overrides.shippingDaysMin ?? 0,
						shippingDaysMax: overrides.shippingDaysMax ?? 0,
					}
				: undefined,
	}) as unknown as Listing;

const makeOption = (
	id: number,
	variationId: number,
	additionalPriceCents: number,
	variationName: string,
	optionName: string,
	pricesVary: boolean = true,
) =>
	({
		id,
		additionalPriceCents,
		optionName,
		listingVariation: {
			id: variationId,
			variationName,
			pricesVary,
		},
	}) as unknown as ListingVariationOption;

describe('calculateCheckoutTotals', () => {
	it('returns zero totals for an empty cart', () => {
		const queryData: CheckoutCartData = {
			listings: [],
			variationOptions: [],
		};
		expect(calculateCheckoutTotals([], queryData)).toEqual({
			subtotalCents: 0,
			shippingCents: 0,
		});
	});

	it('calculates subtotal from listing base price', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'abc',
					selectedOptions: {},
					quantity: 1,
				},
			],
			queryData,
		);
		expect(result.subtotalCents).toBe(1000);
	});

	it('multiplies unit price by quantity', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 500)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'abc',
					selectedOptions: {},
					quantity: 3,
				},
			],
			queryData,
		);
		expect(result.subtotalCents).toBe(1500);
	});

	it('adds additional price from selected options', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [
				makeOption(10, 1, 500, 'Size', 'Large'),
			],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'abc',
					selectedOptions: { 1: 10 },
					quantity: 1,
				},
			],
			queryData,
		);
		expect(result.subtotalCents).toBe(1500);
	});

	it('calculates shipping total from shipping profile', () => {
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, {
					flatShippingRateCents: 400,
				}),
			],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'abc',
					selectedOptions: {},
					quantity: 2,
				},
			],
			queryData,
		);
		expect(result.shippingCents).toBe(800);
	});

	it('treats missing shipping profile as zero shipping', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'abc',
					selectedOptions: {},
					quantity: 1,
				},
			],
			queryData,
		);
		expect(result.shippingCents).toBe(0);
	});

	it('skips items whose listing is not found', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'unknown',
					selectedOptions: {},
					quantity: 1,
				},
			],
			queryData,
		);
		expect(result).toEqual({
			subtotalCents: 0,
			shippingCents: 0,
		});
	});

	it('accumulates totals across multiple items', () => {
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, {
					flatShippingRateCents: 300,
				}),
				makeListing('xyz', 2000, {
					flatShippingRateCents: 500,
				}),
			],
			variationOptions: [],
		};
		const result = calculateCheckoutTotals(
			[
				{
					listingShortId: 'abc',
					selectedOptions: {},
					quantity: 2,
				},
				{
					listingShortId: 'xyz',
					selectedOptions: {},
					quantity: 1,
				},
			],
			queryData,
		);
		expect(result.subtotalCents).toBe(4000);
		expect(result.shippingCents).toBe(1100);
	});
});

describe('createOrderItemSnapshots', () => {
	it('returns an empty array for an empty cart', () => {
		const queryData: CheckoutCartData = {
			listings: [],
			variationOptions: [],
		};
		expect(createOrderItemSnapshots([], queryData)).toEqual([]);
	});

	it('creates a snapshot with correct fields', () => {
		const queryData: CheckoutCartData = {
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
			estimatedDelivery: null,
			variations: [],
		});
	});

	it('uses null for imageUuid when listing has no images', () => {
		const queryData: CheckoutCartData = {
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
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [makeOption(10, 1, 500, 'Size', 'Large')],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: { 1: 10 }, quantity: 1 }],
			queryData,
		);
		expect(snapshot.unitPriceCents).toBe(1500);
		expect(snapshot.variations).toEqual([{ name: 'Size', value: 'Large' }]);
	});

	it('populates estimatedDelivery from lead time and shipping days', () => {
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, {
					flatShippingRateCents: 500,
					leadTimeDaysMin: 3,
					leadTimeDaysMax: 5,
					shippingDaysMin: 2,
					shippingDaysMax: 4,
				}),
			],
			variationOptions: [],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(snapshot.estimatedDelivery).not.toBeNull();
	});

	it('sets estimatedDelivery to null when listing has no shipping profile', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
			variationOptions: [],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(snapshot.estimatedDelivery).toBeNull();
	});

	it('skips items whose listing is not found', () => {
		const queryData: CheckoutCartData = {
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

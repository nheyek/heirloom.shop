import { Listing } from '@server/entities/generated/Listing';
import { CheckoutCartData } from '@server/types/CheckoutCartData';
import {
	calculateCheckoutTotals,
	createOrderItemSnapshots,
} from '@server/domain/checkout.domain';
import { getCombinationKey } from '@heirloom/common/domain/listing';

const makeListing = (
	shortId: string,
	priceCents: number,
	overrides: Partial<{
		flatShippingRateCents: number;
		shippingDaysMin: number;
		shippingDaysMax: number;
		processingMinDays: number;
		processingMaxDays: number;
		title: string;
		shopTitle: string;
		shopShortId: string;
		imageUuids: string[];
		variations: Record<string, unknown>;
		combinations: Record<string, unknown>;
	}> = {},
) =>
	({
		shortId,
		priceCents,
		title: overrides.title ?? 'Test Listing',
		shop: { title: overrides.shopTitle ?? 'Test Shop', shortId: overrides.shopShortId ?? 'shop1' },
		imageUuids: overrides.imageUuids ?? [],
		variations: overrides.variations ?? {},
		combinations: overrides.combinations ?? {},
		processingProfile:
			overrides.processingMinDays !== undefined || overrides.processingMaxDays !== undefined
				? { minDays: overrides.processingMinDays ?? 0, maxDays: overrides.processingMaxDays ?? 0 }
				: undefined,
		shippingProfile:
			overrides.flatShippingRateCents !== undefined
				? {
						flatShippingRateCents: overrides.flatShippingRateCents,
						shippingDaysMin: overrides.shippingDaysMin ?? 0,
						shippingDaysMax: overrides.shippingDaysMax ?? 0,
					}
				: undefined,
	}) as unknown as Listing;

const VAR_ID = 'var-uuid-size';
const OPT_SMALL = 'opt-uuid-small';
const OPT_LARGE = 'opt-uuid-large';

const makeCombination = (priceCents: number) => ({
	priceCents,
	upc: '',
	imageUuid: null,
	disabled: false,
});

describe('calculateCheckoutTotals', () => {
	it('returns zero totals for an empty cart', () => {
		const queryData: CheckoutCartData = { listings: [] };
		expect(calculateCheckoutTotals([], queryData)).toEqual({
			subtotalCents: 0,
			shippingCents: 0,
		});
	});

	it('calculates subtotal from listing base price', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1000);
	});

	it('multiplies unit price by quantity', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 500)],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 3 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1500);
	});

	it('uses combination price when selected options match a combination', () => {
		const key = getCombinationKey({ [VAR_ID]: OPT_LARGE });
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, {
					combinations: { [key]: makeCombination(1500) },
				}),
			],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: { [VAR_ID]: OPT_LARGE }, quantity: 1 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1500);
	});

	it('falls back to base price when combination has null priceCents', () => {
		const key = getCombinationKey({ [VAR_ID]: OPT_SMALL });
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, {
					combinations: { [key]: { priceCents: null, upc: '', imageUuid: null, disabled: false } },
				}),
			],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: { [VAR_ID]: OPT_SMALL }, quantity: 1 }],
			queryData,
		);
		expect(result.subtotalCents).toBe(1000);
	});

	it('calculates shipping total from shipping profile', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000, { flatShippingRateCents: 400 })],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 2 }],
			queryData,
		);
		expect(result.shippingCents).toBe(800);
	});

	it('treats missing shipping profile as zero shipping', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result.shippingCents).toBe(0);
	});

	it('skips items whose listing is not found', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000)],
		};
		const result = calculateCheckoutTotals(
			[{ listingShortId: 'unknown', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result).toEqual({ subtotalCents: 0, shippingCents: 0 });
	});

	it('accumulates totals across multiple items', () => {
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, { flatShippingRateCents: 300 }),
				makeListing('xyz', 2000, { flatShippingRateCents: 500 }),
			],
		};
		const result = calculateCheckoutTotals(
			[
				{ listingShortId: 'abc', selectedOptions: {}, quantity: 2 },
				{ listingShortId: 'xyz', selectedOptions: {}, quantity: 1 },
			],
			queryData,
		);
		expect(result.subtotalCents).toBe(4000);
		expect(result.shippingCents).toBe(1100);
	});
});

describe('createOrderItemSnapshots', () => {
	it('returns an empty array for an empty cart', () => {
		const queryData: CheckoutCartData = { listings: [] };
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
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 2 }],
			queryData,
		);
		expect(snapshot).toMatchObject({
			title: 'Handmade Bowl',
			shopName: 'Clay Co',
			imageUuid: 'uuid-1',
			unitPriceCents: 1000,
			shippingPriceCents: 0,
			quantity: 2,
			estimatedDelivery: null,
			variations: [],
		});
	});

	it('uses null for imageUuid when listing has no images', () => {
		const queryData: CheckoutCartData = {
			listings: [makeListing('abc', 1000, { imageUuids: [] })],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(snapshot.imageUuid).toBeNull();
	});

	it('includes variation name and value in snapshot from combinations', () => {
		const key = getCombinationKey({ [VAR_ID]: OPT_LARGE });
		const queryData: CheckoutCartData = {
			listings: [
				makeListing('abc', 1000, {
					variations: {
						[VAR_ID]: {
							name: 'Size',
							pricesVary: true,
							order: 0,
							options: {
								[OPT_LARGE]: { name: 'Large', order: 1 },
							},
						},
					},
					combinations: { [key]: makeCombination(1500) },
				}),
			],
		};
		const [snapshot] = createOrderItemSnapshots(
			[{ listingShortId: 'abc', selectedOptions: { [VAR_ID]: OPT_LARGE }, quantity: 1 }],
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
					processingMinDays: 3,
					processingMaxDays: 5,
					shippingDaysMin: 2,
					shippingDaysMax: 4,
				}),
			],
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
		};
		const result = createOrderItemSnapshots(
			[{ listingShortId: 'unknown', selectedOptions: {}, quantity: 1 }],
			queryData,
		);
		expect(result).toEqual([]);
	});
});

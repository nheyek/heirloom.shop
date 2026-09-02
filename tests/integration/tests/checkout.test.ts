import { jest } from '@jest/globals';

// Must use unstable_mockModule in ESM mode — jest.mock() cannot be hoisted
// before static imports the way it can in CJS. The app is lazy-loaded inside
// beforeAll (via setupApp) so this mock is registered before payment.service loads.
jest.unstable_mockModule('@server/services/payment.service', () => ({
	createPaymentIntent: jest.fn<() => Promise<{ id: string; client_secret: string }>>().mockResolvedValue({
		id: 'pi_test_mock',
		client_secret: 'pi_test_mock_secret',
	}),
	retrievePaymentIntentCharge: jest.fn<() => Promise<null>>().mockResolvedValue(null),
	extractPaymentDetails: jest.fn<() => null>().mockReturnValue(null),
}));

import { ShippingAddress } from '@heirloom/common/contract';
import { OrderStatus } from '@heirloom/common/constants';
import { deriveOrderStatus } from '@heirloom/common/domain/order';
import { getCombinationKey } from '@heirloom/common/domain/listing';
import { getEm } from '@server/db';

import { AppOrder } from '@server/entities/generated/AppOrder';
import { Listing } from '@server/entities/generated/Listing';
import { ListingPersonalizationProfile } from '@server/entities/generated/ListingPersonalizationProfile';
import { ListingShippingProfile } from '@server/entities/generated/ListingShippingProfile';
import { Shop } from '@server/entities/generated/Shop';
import { getTaxTotal } from '@server/services/tax.service';
import request from 'supertest';
import { seedCategories } from '../helpers/seedData';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const expectedTotalCents = (
	subtotalCents: number,
	shippingCents: number,
	address: ShippingAddress,
) =>
	subtotalCents +
	shippingCents +
	getTaxTotal(subtotalCents + shippingCents, address);

const MUG_VAR_ID      = 'a1b2c3d4-0000-0000-0000-000000000001';
const MUG_OPT_SMALL   = 'a1b2c3d4-0000-0000-0000-000000000002';
const MUG_OPT_LARGE   = 'a1b2c3d4-0000-0000-0000-000000000003';
const MUG_OPT_JUMBO   = 'a1b2c3d4-0000-0000-0000-000000000004';

const VASE_VAR_ID     = 'a1b2c3d4-0000-0000-0000-000000000005';
const VASE_OPT_SMALL  = 'a1b2c3d4-0000-0000-0000-000000000006';
const VASE_OPT_LARGE  = 'a1b2c3d4-0000-0000-0000-000000000007';

const TUMBLER_VAR_ID     = 'a1b2c3d4-0000-0000-0000-000000000008';
const TUMBLER_OPT_SMALL  = 'a1b2c3d4-0000-0000-0000-000000000009';
const TUMBLER_OPT_LARGE  = 'a1b2c3d4-0000-0000-0000-00000000000a';

/**
 * Sample data (ids are DB-generated, not hardcoded, to avoid collisions
 * with other test files sharing the same database):
 * Shop "Checkout Artisan Workshop"
 *   - "Handmade Bowl" ($25, no shipping)  shortId="cbwl01"
 *   - "Ceramic Mug" ($15 base, $5 shipping) shortId="cmug01"
 *       Size variation: Small=$15, Large=$18
 * Shop "Wood Crafts"
 *   - "Cutting Board" ($45, $8 shipping)  shortId="cbrd01"
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const shop1 = em.create(Shop, {
		title: 'Checkout Artisan Workshop',
		shortId: 'shop30',
	});

	const shop2 = em.create(Shop, {
		title: 'Wood Crafts',
		shortId: 'shop31',
	});

	const bowl = em.create(Listing, {
		shortId: 'cbwl01',
		title: 'Handmade Bowl',
		priceCents: 2500,
		shop: shop1,
		category: 'CERAMICS',
		imageUuids: ['img-bowl-01'],
		available: true,
	});

	const outOfStockLamp = em.create(Listing, {
		shortId: 'clmp01',
		title: 'Brass Lamp',
		priceCents: 4000,
		shop: shop1,
		category: 'CERAMICS',
		imageUuids: ['img-lamp-01'],
		available: true,
		trackInventory: true,
		inventory: 0,
	});

	const inStockCandle = em.create(Listing, {
		shortId: 'ccnd01',
		title: 'Soy Candle',
		priceCents: 1800,
		shop: shop1,
		category: 'CERAMICS',
		imageUuids: ['img-candle-01'],
		available: true,
		trackInventory: true,
		inventory: 5,
	});

	const outOfStockVase = em.create(Listing, {
		shortId: 'cvse01',
		title: 'Glazed Stoneware Urn',
		priceCents: 3500,
		shop: shop1,
		category: 'CERAMICS',
		imageUuids: ['img-vase-01'],
		available: true,
		trackInventory: true,
		variations: {
			[VASE_VAR_ID]: {
				name: 'Size',
				pricesVary: false,
				order: 0,
				options: {
					[VASE_OPT_SMALL]: { name: 'Small', order: 0, priceCents: null, imageUuid: null },
					[VASE_OPT_LARGE]: { name: 'Large', order: 1, priceCents: null, imageUuid: null },
				},
			},
		},
		combinations: {
			[getCombinationKey({ [VASE_VAR_ID]: VASE_OPT_SMALL })]: { priceCents: null, imageUuid: null, disabled: false, inventory: 0 },
			[getCombinationKey({ [VASE_VAR_ID]: VASE_OPT_LARGE })]: { priceCents: null, imageUuid: null, disabled: false, inventory: 0 },
		},
	});

	const partiallyStockedTumblerSet = em.create(Listing, {
		shortId: 'ctum01',
		title: 'Stoneware Tumbler Set',
		priceCents: 2000,
		shop: shop1,
		category: 'CERAMICS',
		imageUuids: ['img-tumbler-01'],
		available: true,
		trackInventory: true,
		variations: {
			[TUMBLER_VAR_ID]: {
				name: 'Size',
				pricesVary: false,
				order: 0,
				options: {
					[TUMBLER_OPT_SMALL]: { name: 'Small', order: 0, priceCents: null, imageUuid: null },
					[TUMBLER_OPT_LARGE]: { name: 'Large', order: 1, priceCents: null, imageUuid: null },
				},
			},
		},
		combinations: {
			[getCombinationKey({ [TUMBLER_VAR_ID]: TUMBLER_OPT_SMALL })]: { priceCents: null, imageUuid: null, disabled: false, inventory: 5 },
			[getCombinationKey({ [TUMBLER_VAR_ID]: TUMBLER_OPT_LARGE })]: { priceCents: null, imageUuid: null, disabled: false, inventory: 0 },
		},
	});

	const mugShipping = em.create(ListingShippingProfile, {
		name: 'Standard Shipping',
		flatShippingRateCents: 500,
		shippingDaysMin: 3,
		shippingDaysMax: 7,
		originZip: '15201',
		shop: shop1,
	});

	const mug = em.create(Listing, {
		shortId: 'cmug01',
		title: 'Ceramic Mug',
		priceCents: 1500,
		shop: shop1,
		category: 'CERAMICS',
		shippingProfile: mugShipping,
		imageUuids: ['img-mug-01'],
		available: true,
		variations: {
			[MUG_VAR_ID]: {
				name: 'Size',
				pricesVary: true,
				order: 0,
				options: {
					[MUG_OPT_SMALL]: { name: 'Small', order: 0, priceCents: null, imageUuid: null },
					[MUG_OPT_LARGE]: { name: 'Large', order: 1, priceCents: null, imageUuid: null },
					[MUG_OPT_JUMBO]: { name: 'Jumbo', order: 2, priceCents: null, imageUuid: null },
				},
			},
		},
		combinations: {
			[getCombinationKey({ [MUG_VAR_ID]: MUG_OPT_SMALL })]: { priceCents: 1500, imageUuid: null, disabled: false },
			[getCombinationKey({ [MUG_VAR_ID]: MUG_OPT_LARGE })]: { priceCents: 1800, imageUuid: null, disabled: false },
			[getCombinationKey({ [MUG_VAR_ID]: MUG_OPT_JUMBO })]: { priceCents: 2200, imageUuid: null, disabled: true },
		},
	});

	const boardShipping = em.create(ListingShippingProfile, {
		name: 'Heavy Item Shipping',
		flatShippingRateCents: 800,
		shippingDaysMin: 5,
		shippingDaysMax: 10,
		originZip: '90210',
		shop: shop2,
	});

	const cuttingBoard = em.create(Listing, {
		shortId: 'cbrd01',
		title: 'Cutting Board',
		priceCents: 4500,
		shop: shop2,
		category: 'CERAMICS',
		shippingProfile: boardShipping,
		imageUuids: ['img-board-01'],
		available: true,
	});

	const braceletPersonalization = em.create(
		ListingPersonalizationProfile,
		{
			name: 'Engraving',
			costCents: 500,
			shop: shop1,
		},
	);

	const bracelet = em.create(Listing, {
		shortId: 'cbrc01',
		title: 'Engraved Bracelet',
		priceCents: 3000,
		shop: shop1,
		category: 'CERAMICS',
		personalizationProfile: braceletPersonalization,
		imageUuids: ['img-bracelet-01'],
		available: true,
	});

	// Flushed in stages rather than one batch: persisting a Listing
	// alongside other entity types it cross-references in the same
	// flush() call has been observed to silently drop relations (no
	// error — flush() just resolves as if it succeeded). Verified via a
	// minimal repro against a fresh DB; splitting the flushes is the
	// reliable workaround.
	await em.persist([shop1, shop2]).flush();
	await em
		.persist([
			bowl,
			outOfStockLamp,
			inStockCandle,
			outOfStockVase,
			partiallyStockedTumblerSet,
		])
		.flush();
	await em
		.persist([mugShipping, boardShipping, braceletPersonalization])
		.flush();
	await em.persist([mug, cuttingBoard, bracelet]).flush();
});

describe('POST /api/checkout/calculateTax', () => {
	const illinoisAddress = {
		firstName: 'John',
		lastName: 'Doe',
		line1: '123 Main St',
		line2: '',
		city: 'Chicago',
		state: 'IL',
		zip: '60601',
	};

	const nonIllinoisAddress = {
		...illinoisAddress,
		city: 'New York',
		state: 'NY',
		zip: '10001',
	};

	it('calculates tax for Illinois addresses and returns zero for non-Illinois', async () => {
		const requestBody = {
			items: [
				{
					listingShortId: 'cbwl01',
					selectedOptions: {},
					quantity: 1,
				},
			],
			shippingAddress: illinoisAddress,
		};

		const ilRes = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send(requestBody);

		expect(ilRes.status).toBe(200);
		expect(ilRes.body.TaxTotalCents).toBeGreaterThan(0);

		const nyRes = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				...requestBody,
				shippingAddress: nonIllinoisAddress,
			});

		expect(nyRes.status).toBe(200);
		expect(nyRes.body.TaxTotalCents).toBe(0);
	});

	it('includes shipping in tax calculation', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'cmug01',
						selectedOptions: { [MUG_VAR_ID]: MUG_OPT_SMALL },
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(200);
		// Tax on $15 (item) + $5 (shipping) = $20 at 6.25% = 125 cents
		expect(res.body.TaxTotalCents).toBeGreaterThanOrEqual(100);
		expect(res.body.TaxTotalCents).toBeLessThanOrEqual(200);
	});

	it('handles variation options, quantities, and multiple items', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 2,
					},
					{
						listingShortId: 'cmug01',
						selectedOptions: { [MUG_VAR_ID]: MUG_OPT_LARGE },
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(200);
		// Total: 2*$25 + $18 (Large mug) + $5 shipping = $73 at 6.25% = ~456 cents
		expect(res.body.TaxTotalCents).toBeGreaterThanOrEqual(400);
	});

	it('returns 400 when selectedOptions references an unknown variation ID', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { 'bad-var-id': MUG_OPT_SMALL }, quantity: 1 }],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/invalid variation id/i);
	});

	it('returns 400 when selectedOptions references an unknown option ID', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { [MUG_VAR_ID]: 'bad-opt-id' }, quantity: 1 }],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/invalid option id/i);
	});

	it('returns 400 when selectedOptions references a disabled combination', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { [MUG_VAR_ID]: MUG_OPT_JUMBO }, quantity: 1 }],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/unavailable/i);
	});

	it('returns zero tax for an empty cart', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({ items: [], shippingAddress: illinoisAddress });

		expect(res.status).toBe(200);
		expect(res.body.TaxTotalCents).toBe(0);
	});

	// Matches the other "item can't be resolved" cases above (unknown
	// variation/option ID, disabled combination) — an unknown listing
	// shortId is rejected with 400 rather than silently priced at zero.
	// In normal use the cart provider already filters out any listing it
	// couldn't find before calling this endpoint (see
	// ShoppingCartProvider.tsx), so this only matters for a client that
	// bypasses that filtering.
	it('returns 400 when the cart references an unknown listing', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'unknown',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/no longer available/i);
	});

	it('treats an out-of-stock listing the same as an unavailable one', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'clmp01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/no longer available/i);
	});

	it('treats a listing with all active combinations out of stock the same as an unavailable one', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'cvse01',
						selectedOptions: { [VASE_VAR_ID]: VASE_OPT_SMALL },
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/no longer available/i);
	});

	it('accepts an in-stock listing with no variations that tracks inventory', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'ccnd01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(200);
	});

	it('rejects a specific out-of-stock combination even when the listing overall is available', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'ctum01',
						selectedOptions: {
							[TUMBLER_VAR_ID]: TUMBLER_OPT_LARGE,
						},
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/unavailable/i);
	});

	it('accepts an in-stock combination on a listing that also has an out-of-stock combination', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'ctum01',
						selectedOptions: {
							[TUMBLER_VAR_ID]: TUMBLER_OPT_SMALL,
						},
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(200);
	});

	it('rejects Alaska and Hawaii shipping addresses', async () => {
		const requestBody = {
			items: [
				{
					listingShortId: 'cbwl01',
					selectedOptions: {},
					quantity: 1,
				},
			],
		};

		const alaskaRes = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				...requestBody,
				shippingAddress: { ...illinoisAddress, state: 'AK' },
			});
		expect(alaskaRes.status).toBe(400);
		expect(alaskaRes.body.error).toMatch(/contiguous/i);

		const hawaiiRes = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				...requestBody,
				shippingAddress: { ...illinoisAddress, state: 'HI' },
			});
		expect(hawaiiRes.status).toBe(400);
		expect(hawaiiRes.body.error).toMatch(/contiguous/i);
	});
});

describe('POST /api/checkout/submitOrder', () => {
	const address = {
		firstName: 'John',
		lastName: 'Doe',
		line1: '123 Main St',
		line2: 'Apt 4B',
		city: 'Chicago',
		state: 'IL',
		zip: '60601',
	};

	it('rejects empty cart with 400 error', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [],
				shippingAddress: address,
				email: 'test@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
	});

	it('creates order with correct totals, payment intent, status, and address', async () => {
		const totalCents = expectedTotalCents(2500, 0, address);
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents,
			});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('orderShortId');
		expect(res.body).toHaveProperty('clientSecret');
		expect(res.body.clientSecret).toContain('pi_');

		const em = getEm();
		const order = await em.findOne(AppOrder, {
			shortId: res.body.orderShortId,
		});

		expect(order!.subtotal).toBe(2500);
		expect(order!.shippingPrice).toBe(0);
		expect(order!.taxTotal).toBeGreaterThan(0);
		expect(deriveOrderStatus(order!.timeline)).toBe(
			OrderStatus.PENDING,
		);
		expect(order!.paymentIntentId).toContain('pi_');
		expect(order!.shippingAddress).toMatchObject(address);
		expect(order!.timeline).toEqual([]);
	});

	it('handles multiple items with variations and captures snapshots correctly', async () => {
		const totalCents = expectedTotalCents(6100, 1000, address);
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 1,
					},
					{
						listingShortId: 'cmug01',
						selectedOptions: { [MUG_VAR_ID]: MUG_OPT_LARGE },
						quantity: 2,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne(AppOrder, {
			shortId: res.body.orderShortId,
		}, { populate: ['appOrderItemCollection'] });

		expect(order!.subtotal).toBe(6100); // $25 + 2*$18
		expect(order!.shippingPrice).toBe(1000); // 2*$5

		const items = order!.appOrderItemCollection.getItems();
		expect(items).toHaveLength(2);
		expect(items[0].snapshot).toMatchObject({
			title: 'Handmade Bowl',
			shopName: 'Checkout Artisan Workshop',
			imageUuid: 'img-bowl-01',
			unitPriceCents: 2500,
			quantity: 1,
			variations: [],
		});
		expect(items[1].snapshot).toMatchObject({
			title: 'Ceramic Mug',
			unitPriceCents: 1800,
			quantity: 2,
			variations: [{ name: 'Size', value: 'Large' }],
		});
	});

	it('includes the personalization surcharge in the subtotal and snapshot when supported', async () => {
		const totalCents = expectedTotalCents(3500, 0, address);
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'cbrc01',
						selectedOptions: {},
						quantity: 1,
						personalizationText: 'Happy Birthday',
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne(AppOrder, {
			shortId: res.body.orderShortId,
		}, { populate: ['appOrderItemCollection'] });

		expect(order!.subtotal).toBe(3500); // $30 + $5 personalization

		const [item] = order!.appOrderItemCollection.getItems();
		expect(item.snapshot).toMatchObject({
			unitPriceCents: 3500,
			personalizationText: 'Happy Birthday',
			personalizationName: 'Engraving',
		});
	});

	it('returns 400 when personalization text is provided but the listing has no personalization profile', async () => {
		const totalCents = expectedTotalCents(2500, 0, address);
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 1,
						personalizationText: 'Happy Birthday',
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/personalization/i);
	});

	it('returns 409 when the submitted total no longer matches the calculated total', async () => {
		const totalCents = expectedTotalCents(2500, 0, address) + 100;
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents,
			});

		expect(res.status).toBe(409);
		expect(res.body.error).toMatch(/price/i);
	});

	it('returns 400 when selectedOptions references an unknown variation ID', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { 'bad-var-id': MUG_OPT_SMALL }, quantity: 1 }],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/invalid variation id/i);
	});

	it('returns 400 when selectedOptions references an unknown option ID', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { [MUG_VAR_ID]: 'bad-opt-id' }, quantity: 1 }],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/invalid option id/i);
	});

	it('returns 400 when selectedOptions references a disabled combination', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { [MUG_VAR_ID]: MUG_OPT_JUMBO }, quantity: 1 }],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/unavailable/i);
	});

	it('treats an out-of-stock listing the same as an unavailable one', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'clmp01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/no longer available/i);
	});

	it('treats a listing with all active combinations out of stock the same as an unavailable one', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'cvse01',
						selectedOptions: { [VASE_VAR_ID]: VASE_OPT_LARGE },
						quantity: 1,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/no longer available/i);
	});

	it('accepts an in-stock listing with no variations that tracks inventory', async () => {
		const totalCents = expectedTotalCents(1800, 0, address);
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'ccnd01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents,
			});

		expect(res.status).toBe(200);
	});

	it('rejects a specific out-of-stock combination even when the listing overall is available', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'ctum01',
						selectedOptions: {
							[TUMBLER_VAR_ID]: TUMBLER_OPT_LARGE,
						},
						quantity: 1,
					},
				],
				shippingAddress: address,
				email: 'buyer@example.com',
				totalCents: 0,
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/unavailable/i);
	});

	it('rejects Alaska and Hawaii shipping addresses', async () => {
		const requestBody = {
			items: [
				{
					listingShortId: 'cbwl01',
					selectedOptions: {},
					quantity: 1,
				},
			],
			email: 'buyer@example.com',
			totalCents: 0,
		};

		const alaskaRes = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				...requestBody,
				shippingAddress: { ...address, state: 'AK' },
			});
		expect(alaskaRes.status).toBe(400);
		expect(alaskaRes.body.error).toMatch(/contiguous/i);

		const hawaiiRes = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				...requestBody,
				shippingAddress: { ...address, state: 'HI' },
			});
		expect(hawaiiRes.status).toBe(400);
		expect(hawaiiRes.body.error).toMatch(/contiguous/i);
	});
});

describe('POST /api/listings/cartData', () => {
	it('excludes an out-of-stock listing the same way it excludes an unavailable one', async () => {
		const res = await request(getApp())
			.post('/api/listings/cartData')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 1,
					},
					{
						listingShortId: 'clmp01',
						selectedOptions: {},
						quantity: 1,
					},
				],
			});

		expect(res.status).toBe(200);
		const shortIds = res.body.map(
			(l: { shortId: string }) => l.shortId,
		);
		expect(shortIds).toContain('cbwl01');
		expect(shortIds).not.toContain('clmp01');
	});

	it('excludes a listing whose active combinations are all out of stock', async () => {
		const res = await request(getApp())
			.post('/api/listings/cartData')
			.send({
				items: [
					{
						listingShortId: 'cbwl01',
						selectedOptions: {},
						quantity: 1,
					},
					{
						listingShortId: 'cvse01',
						selectedOptions: { [VASE_VAR_ID]: VASE_OPT_SMALL },
						quantity: 1,
					},
				],
			});

		expect(res.status).toBe(200);
		const shortIds = res.body.map(
			(l: { shortId: string }) => l.shortId,
		);
		expect(shortIds).toContain('cbwl01');
		expect(shortIds).not.toContain('cvse01');
	});
});

import { jest } from '@jest/globals';

// Must use unstable_mockModule in ESM mode — jest.mock() cannot be hoisted
// before static imports the way it can in CJS. The app is lazy-loaded inside
// beforeAll (via setupApp) so this mock is registered before payment.service loads.
jest.unstable_mockModule('@server/services/payment.service', () => ({
	createPaymentIntent: jest.fn<() => Promise<{ id: string; client_secret: string }>>().mockResolvedValue({
		id: 'pi_test_mock',
		client_secret: 'pi_test_mock_secret',
	}),
}));

import { OrderStatus } from '@heirloom/common/constants';
import { getCombinationKey } from '@heirloom/common/domain/listing';
import { getEm } from '@server/db';

import { AppOrder } from '@server/entities/generated/AppOrder';
import { Listing } from '@server/entities/generated/Listing';
import { ShippingProfile } from '@server/entities/generated/ShippingProfile';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { seedCategories } from '../helpers/seedData';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const MUG_VAR_ID      = 'a1b2c3d4-0000-0000-0000-000000000001';
const MUG_OPT_SMALL   = 'a1b2c3d4-0000-0000-0000-000000000002';
const MUG_OPT_LARGE   = 'a1b2c3d4-0000-0000-0000-000000000003';
const MUG_OPT_JUMBO   = 'a1b2c3d4-0000-0000-0000-000000000004';

/**
 * Sample data (IDs in the 300s to avoid conflicts with other test files):
 * Shop 30: "Checkout Artisan Workshop"
 *   - "Handmade Bowl" ($25, no shipping)  shortId="cbwl01"
 *   - "Ceramic Mug" ($15 base, $5 shipping) shortId="cmug01"
 *       Size variation: Small=$15, Large=$18
 * Shop 31: "Wood Crafts"
 *   - "Cutting Board" ($45, $8 shipping)  shortId="cbrd01"
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const shop1 = em.create(Shop, {
		id: 30,
		title: 'Checkout Artisan Workshop',
		shortId: 'shop30',
	});

	const shop2 = em.create(Shop, {
		id: 31,
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
	});

	const mugShipping = em.create(ShippingProfile, {
		id: 30,
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

	const boardShipping = em.create(ShippingProfile, {
		id: 31,
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
	});

	await em.persist([
		shop1,
		shop2,
		bowl,
		mugShipping,
		mug,
		boardShipping,
		cuttingBoard,
	]).flush();
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

	it('handles empty cart and unknown items', async () => {
		const emptyRes = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({ items: [], shippingAddress: illinoisAddress });

		expect(emptyRes.status).toBe(200);
		expect(emptyRes.body.TaxTotalCents).toBe(0);

		const unknownRes = await request(getApp())
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

		expect(unknownRes.status).toBe(200);
		expect(unknownRes.body.TaxTotalCents).toBe(0);
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
			.send({ items: [], shippingAddress: address, email: 'test@example.com' });

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
	});

	it('creates order with correct totals, payment intent, status, and address', async () => {
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
		expect(order!.orderStatus).toBe(OrderStatus.PENDING);
		expect(order!.paymentIntentId).toContain('pi_');
		expect(order!.shippingAddress).toMatchObject(address);
	});

	it('handles multiple items with variations and captures snapshots correctly', async () => {
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

	it('returns 400 when selectedOptions references an unknown variation ID', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [{ listingShortId: 'cmug01', selectedOptions: { 'bad-var-id': MUG_OPT_SMALL }, quantity: 1 }],
				shippingAddress: address,
				email: 'buyer@example.com',
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
			});

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/unavailable/i);
	});
});

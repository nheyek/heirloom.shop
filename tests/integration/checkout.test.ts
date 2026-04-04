import { OrderStatus } from '@common/enums/OrderStatus';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { Listing } from '@server/entities/generated/Listing';
import { ListingVariation } from '@server/entities/generated/ListingVariation';
import { ListingVariationOption } from '@server/entities/generated/ListingVariationOption';
import { ShippingProfile } from '@server/entities/generated/ShippingProfile';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { seedCategories } from './helpers/seedData';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data (IDs in the 300s to avoid conflicts with other test files):
 * Shop 30: "Artisan Workshop"
 *   - "Handmade Bowl" ($25, no shipping)  shortId="cbwl01"
 *   - "Ceramic Mug" ($15, $5 shipping)    shortId="cmug01"  with Size variation (Small +$0, Large +$3)
 * Shop 31: "Wood Crafts"
 *   - "Cutting Board" ($45, $8 shipping)  shortId="cbrd01"
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const shop1 = em.create(Shop, {
		id: 30,
		title: 'Artisan Workshop',
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
		profileName: 'Standard Shipping',
		flatShippingRateCents: 500,
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
	});

	const sizeVariation = em.create(ListingVariation, {
		id: 1,
		variationName: 'Size',
		pricesVary: true,
		listing: mug,
	});

	const sizeSmall = em.create(ListingVariationOption, {
		id: 1,
		optionName: 'Small',
		additionalPriceCents: 0,
		listingVariation: sizeVariation,
	});

	const sizeLarge = em.create(ListingVariationOption, {
		id: 2,
		optionName: 'Large',
		additionalPriceCents: 300,
		listingVariation: sizeVariation,
	});

	const boardShipping = em.create(ShippingProfile, {
		id: 31,
		profileName: 'Heavy Item Shipping',
		flatShippingRateCents: 800,
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

	await em.persistAndFlush([
		shop1,
		shop2,
		bowl,
		mugShipping,
		mug,
		sizeVariation,
		sizeSmall,
		sizeLarge,
		boardShipping,
		cuttingBoard,
	]);
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
						selectedOptions: { 1: 1 },
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
						selectedOptions: { 1: 2 },
						quantity: 1,
					},
				],
				shippingAddress: illinoisAddress,
			});

		expect(res.status).toBe(200);
		// Total: 2*$25 + ($15+$3) + $5 shipping = $73 at 6.25% = 457 cents
		expect(res.body.TaxTotalCents).toBeGreaterThanOrEqual(400);
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
			.send({ items: [], shippingAddress: address });

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
						selectedOptions: { 1: 2 },
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
		});

		expect(order!.subtotal).toBe(6100); // $25 + 2*($15+$3)
		expect(order!.shippingPrice).toBe(1000); // 2*$5

		const items = order!.items;
		expect(items).toHaveLength(2);
		expect(items[0]).toMatchObject({
			title: 'Handmade Bowl',
			shopName: 'Artisan Workshop',
			imageUuid: 'img-bowl-01',
			unitPriceCents: 2500,
			quantity: 1,
			variations: [],
		});
		expect(items[1]).toMatchObject({
			title: 'Ceramic Mug',
			unitPriceCents: 1800,
			quantity: 2,
			variations: [{ name: 'Size', value: 'Large' }],
		});
	});
});

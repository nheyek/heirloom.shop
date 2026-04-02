import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingVariation } from '@server/entities/generated/ListingVariation';
import { ListingVariationOption } from '@server/entities/generated/ListingVariationOption';
import { ShippingProfile } from '@server/entities/generated/ShippingProfile';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data for checkout tests:
 * 
 * Shop 1: "Artisan Workshop"
 *   - "Handmade Bowl" ($25.00, no shipping)
 *   - "Ceramic Mug" ($15.00, $5.00 shipping)
 *     - Size variation: Small (+$0), Large (+$3.00)
 * 
 * Shop 2: "Wood Crafts"
 *   - "Cutting Board" ($45.00, $8.00 shipping)
 */
beforeAll(async () => {
	const em = getEm();

	const shop1 = em.create(Shop, {
		id: 1,
		title: 'Artisan Workshop',
		shortId: 'shop01',
	});

	const shop2 = em.create(Shop, {
		id: 2,
		title: 'Wood Crafts',
		shortId: 'shop02',
	});

	// Listing without shipping
	const bowl = em.create(Listing, {
		shortId: 'bowl01',
		title: 'Handmade Bowl',
		subtitle: 'Hand-thrown ceramic bowl',
		priceCents: 2500,
		shop: shop1,
		imageUuids: ['img-bowl-01'],
	});

	// Shipping profile for mug
	const mugShipping = em.create(ShippingProfile, {
		id: 1,
		profileName: 'Standard Shipping',
		flatShippingRateCents: 500,
		shippingDaysMin: 3,
		shippingDaysMax: 5,
		shop: shop1,
	});

	// Listing with shipping and variations
	const mug = em.create(Listing, {
		shortId: 'mug01',
		title: 'Ceramic Mug',
		subtitle: 'Handcrafted coffee mug',
		priceCents: 1500,
		shop: shop1,
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

	// Listing with higher shipping cost
	const boardShipping = em.create(ShippingProfile, {
		id: 2,
		profileName: 'Heavy Item Shipping',
		flatShippingRateCents: 800,
		shippingDaysMin: 5,
		shippingDaysMax: 10,
		shop: shop2,
	});

	const cuttingBoard = em.create(Listing, {
		shortId: 'board01',
		title: 'Cutting Board',
		subtitle: 'Handmade walnut cutting board',
		priceCents: 4500,
		shop: shop2,
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
	const validIllinoisAddress = {
		firstName: 'John',
		lastName: 'Doe',
		line1: '123 Main St',
		line2: '',
		city: 'Chicago',
		state: 'IL',
		zip: '60601',
	};

	const validNonIllinoisAddress = {
		firstName: 'Jane',
		lastName: 'Smith',
		line1: '456 Oak Ave',
		line2: '',
		city: 'New York',
		state: 'NY',
		zip: '10001',
	};

	it('calculates tax for a single item in Illinois', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('TaxTotalCents');
		expect(typeof res.body.TaxTotalCents).toBe('number');
		// Tax should be > 0 for Illinois
		expect(res.body.TaxTotalCents).toBeGreaterThan(0);
	});

	it('returns zero tax for non-Illinois addresses', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validNonIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body.TaxTotalCents).toBe(0);
	});

	it('calculates tax on subtotal + shipping', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'mug01',
						selectedOptions: { 1: 1 }, // Small size
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body.TaxTotalCents).toBeGreaterThan(0);
		// Tax should include both item ($15) and shipping ($5)
		// Approximate tax on $20 at ~10% = ~$2 = 200 cents
		expect(res.body.TaxTotalCents).toBeGreaterThanOrEqual(150);
		expect(res.body.TaxTotalCents).toBeLessThanOrEqual(250);
	});

	it('calculates tax for multiple items with quantities', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 2,
					},
					{
						listingShortId: 'mug01',
						selectedOptions: { 1: 2 }, // Large size (+$3)
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		// Total: 2 * $25 + ($15 + $3) + $5 shipping = $73
		// Tax at ~10% = ~$7.30 = 730 cents
		expect(res.body.TaxTotalCents).toBeGreaterThanOrEqual(600);
		expect(res.body.TaxTotalCents).toBeLessThanOrEqual(850);
	});

	it('handles items with variation options correctly', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [
					{
						listingShortId: 'mug01',
						selectedOptions: { 1: 2 }, // Large size
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		// Item: $15 + $3 (large) + $5 shipping = $23
		// Tax at ~10% = ~$2.30 = 230 cents
		expect(res.body.TaxTotalCents).toBeGreaterThanOrEqual(180);
		expect(res.body.TaxTotalCents).toBeLessThanOrEqual(280);
	});

	it('handles unknown listing shortIds gracefully', async () => {
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
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body.TaxTotalCents).toBe(0);
	});

	it('handles empty cart', async () => {
		const res = await request(getApp())
			.post('/api/checkout/calculateTax')
			.send({
				items: [],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body.TaxTotalCents).toBe(0);
	});
});

describe('POST /api/checkout/submitOrder', () => {
	const validIllinoisAddress = {
		firstName: 'John',
		lastName: 'Doe',
		line1: '123 Main St',
		line2: 'Apt 4B',
		city: 'Chicago',
		state: 'IL',
		zip: '60601',
	};

	it('creates an order and returns payment intent for valid request', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('orderShortId');
		expect(res.body).toHaveProperty('clientSecret');
		expect(typeof res.body.orderShortId).toBe('string');
		expect(typeof res.body.clientSecret).toBe('string');
		expect(res.body.orderShortId.length).toBeGreaterThan(0);
		expect(res.body.clientSecret).toContain('pi_'); // Stripe payment intent format
	});

	it('creates order with correct totals for single item', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('orderShortId');

		// Verify order was created by checking the order exists
		const em = getEm();
		const order = await em.findOne('Order' as any, { shortId: res.body.orderShortId });
		expect(order).toBeDefined();
		expect(order!.subtotalCents).toBe(2500); // $25.00
		expect(order!.shippingCents).toBe(0); // No shipping
		expect(order!.taxCents).toBeGreaterThan(0); // Illinois tax
	});

	it('creates order for multiple items with different shops', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
					{
						listingShortId: 'board01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('orderShortId');

		const em = getEm();
		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		}, { populate: ['orderItemCollection'] });
		
		expect(order).toBeDefined();
		expect(order!.subtotalCents).toBe(7000); // $25 + $45
		expect(order!.shippingCents).toBe(800); // $8 from board
		expect(order!.orderItemCollection.length).toBe(2);
	});

	it('creates order with variation options', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'mug01',
						selectedOptions: { 1: 2 }, // Large size
						quantity: 2,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		}, { populate: ['orderItemCollection'] });
		
		expect(order).toBeDefined();
		// 2 * ($15 + $3) = $36 = 3600 cents
		expect(order!.subtotalCents).toBe(3600);
		// 2 * $5 shipping = $10 = 1000 cents
		expect(order!.shippingCents).toBe(1000);
		
		const orderItem = order!.orderItemCollection[0];
		expect(orderItem.unitPriceCents).toBe(1800); // $15 + $3
		expect(orderItem.quantity).toBe(2);
		expect(orderItem.variations).toEqual([{ name: 'Size', value: 'Large' }]);
	});

	it('saves shipping address correctly', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		}, { populate: ['shippingAddress'] });
		
		expect(order).toBeDefined();
		expect(order!.shippingAddress).toMatchObject({
			firstName: 'John',
			lastName: 'Doe',
			line1: '123 Main St',
			line2: 'Apt 4B',
			city: 'Chicago',
			state: 'IL',
			zip: '60601',
		});
	});

	it('creates order items with correct snapshot data', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 3,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		}, { populate: ['orderItemCollection'] });
		
		const orderItem = order!.orderItemCollection[0];
		expect(orderItem).toMatchObject({
			title: 'Handmade Bowl',
			shopName: 'Artisan Workshop',
			imageUuid: 'img-bowl-01',
			unitPriceCents: 2500,
			quantity: 3,
			variations: [],
		});
	});

	it('handles missing imageUuid gracefully', async () => {
		// Create listing without images for this test
		const em = getEm();
		const shop = await em.findOne(Shop, { shortId: 'shop01' });
		const noImageListing = em.create(Listing, {
			shortId: 'noimg01',
			title: 'No Image Listing',
			priceCents: 1000,
			shop: shop!,
			imageUuids: [],
		});
		await em.persistAndFlush(noImageListing);

		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'noimg01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);

		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		}, { populate: ['orderItemCollection'] });
		
		expect(order!.orderItemCollection[0].imageUuid).toBeNull();
	});

	it('associates payment intent with order', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		});
		
		expect(order!.paymentIntentId).toBeDefined();
		expect(order!.paymentIntentId).toContain('pi_');
	});

	it('creates order with pending_payment status', async () => {
		const res = await request(getApp())
			.post('/api/checkout/submitOrder')
			.send({
				items: [
					{
						listingShortId: 'bowl01',
						selectedOptions: {},
						quantity: 1,
					},
				],
				shippingAddress: validIllinoisAddress,
			});

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne('Order' as any, { 
			shortId: res.body.orderShortId 
		});
		
		expect(order!.status).toBe('pending_payment');
	});
});

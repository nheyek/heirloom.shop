import { getEm } from '@server/db';
import { ListingProcessingProfile } from '@server/entities/generated/ListingProcessingProfile';
import { Shop } from '@server/entities/generated/Shop';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { findOrCreateUser } from '@server/services/user.service';
import request from 'supertest';
import { seedCategories } from '../helpers/seedData';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

const VALID_UUID = '11111111-1111-1111-1111-111111111111';

const validListingBody = () => ({
	title: 'A nice mug',
	subtitle: null,
	categoryId: 'CERAMICS',
	priceCents: 2500,
	imageUuids: [VALID_UUID],
	processingProfileId: null,
	shippingProfileId: null,
	returnProfileId: null,
	personalizationProfileId: null,
	fullDescr: null,
	variations: {},
	combinations: {},
});

/**
 * Seed data (shop id 80, to avoid conflicts with other test files):
 *
 * Shop 80: "Manager Validation Shop"  shortId="mgr80"  — directFulfillment
 * disabled so fulfillment-profile requiredness doesn't interfere with the
 * field-validation assertions below; test user is owner.
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const testUser = await findOrCreateUser(TEST_USER_EMAIL);

	const shop = em.create(Shop, {
		id: 80,
		shortId: 'mgr80',
		title: 'Manager Validation Shop',
		directFulfillment: false,
	});

	const ownerRole = em.create(ShopUserRole, {
		id: 800,
		shop,
		user: testUser,
		shopRole: 'owner',
	});

	await em.persist([shop, ownerRole]).flush();
});

describe('POST /api/shops/:shopId/manager/listings', () => {
	it('returns 200 for a valid listing', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send(validListingBody());
		expect(res.status).toBe(200);
		expect(res.body.title).toBe('A nice mug');
	});

	it('returns 400 for a title over the max length', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), title: 'a'.repeat(200) });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/title/i);
	});

	it('returns 400 for a non-positive price', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), priceCents: 0 });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/price/i);
	});

	it('returns 400 when no category is provided', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), categoryId: '' });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/category/i);
	});

	it('returns 400 for a category that does not exist', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), categoryId: 'NOT_A_REAL_CATEGORY' });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/category/i);
	});

	it('returns 400 for a shipping profile id that does not belong to the shop', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), shippingProfileId: 999999 });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/shipping/i);
	});

	it('returns 400 with no images', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), imageUuids: [] });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/image/i);
	});

	it('returns 400 for too many variations', async () => {
		const variations = Object.fromEntries(
			Array.from({ length: 4 }, (_, i) => [
				`v${i}`,
				{
					name: `Variation ${i}`,
					pricesVary: false,
					imagesVary: false,
					order: i,
					options: {
						a: { name: 'A', order: 0, priceCents: null, imageUuid: null },
						b: { name: 'B', order: 1, priceCents: null, imageUuid: null },
					},
				},
			]),
		);
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), variations });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/variations/i);
	});

	it('returns 400 when an active combination is missing a price', async () => {
		const variations = {
			v1: {
				name: 'Size',
				pricesVary: true,
				imagesVary: false,
				order: 0,
				options: {
					a: { name: 'Small', order: 0, priceCents: null, imageUuid: null },
					b: { name: 'Large', order: 1, priceCents: null, imageUuid: null },
				},
			},
		};
		const combinations = {
			'v1:a': { priceCents: 1000, imageUuid: null, disabled: false },
			'v1:b': { priceCents: null, imageUuid: null, disabled: false },
		};
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({
				...validListingBody(),
				priceCents: 0,
				variations,
				combinations,
			});
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/combination/i);
	});

	it('returns 403 for a user without a role on the shop', async () => {
		const em = getEm();
		const otherShop = em.create(Shop, {
			id: 81,
			shortId: 'mgr81',
			title: 'No Role Shop',
			directFulfillment: false,
		});
		await em.persist(otherShop).flush();

		const res = await request(getApp())
			.post('/api/shops/mgr81/manager/listings')
			.set(AUTH)
			.send(validListingBody());
		expect(res.status).toBe(403);
	});
});

describe('shop manager fulfillment profile creation', () => {
	it('POST .../profiles/processing returns 400 for an invalid day range', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/processing')
			.set(AUTH)
			.send({ name: 'Bad Range', minDays: 5, maxDays: 2 });
		expect(res.status).toBe(400);
	});

	it('POST .../profiles/processing returns 200 for valid input', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/processing')
			.set(AUTH)
			.send({ name: 'Standard Processing', minDays: 1, maxDays: 3 });
		expect(res.status).toBe(200);
	});

	it('POST .../profiles/processing returns 409 for a duplicate name', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/processing')
			.set(AUTH)
			.send({ name: 'Standard Processing', minDays: 1, maxDays: 3 });
		expect(res.status).toBe(409);
	});

	it('POST .../profiles/shipping returns 400 for an invalid zip code', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/shipping')
			.set(AUTH)
			.send({
				name: 'Bad Zip',
				originZip: '123',
				flatShippingRateCents: null,
				shippingDaysMin: 2,
				shippingDaysMax: 5,
			});
		expect(res.status).toBe(400);
	});

	it('POST .../profiles/shipping returns 200 for valid input and preserves a leading zero', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/shipping')
			.set(AUTH)
			.send({
				name: 'Standard Shipping',
				originZip: '02134',
				flatShippingRateCents: null,
				shippingDaysMin: 2,
				shippingDaysMax: 5,
			});
		expect(res.status).toBe(200);
		expect(res.body.originZip).toBe('02134');
	});

	it('POST .../profiles/shipping returns 409 for a duplicate name', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/shipping')
			.set(AUTH)
			.send({
				name: 'Standard Shipping',
				originZip: '90210',
				flatShippingRateCents: null,
				shippingDaysMin: 2,
				shippingDaysMax: 5,
			});
		expect(res.status).toBe(409);
	});

	it('POST .../profiles/returns returns 400 when a return window is missing', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/returns')
			.set(AUTH)
			.send({
				name: 'Bad Returns',
				policyType: 'standard',
				returnWindowDays: null,
				policyDescrRichText: null,
			});
		expect(res.status).toBe(400);
	});

	it('POST .../profiles/returns returns 200 for valid input', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/returns')
			.set(AUTH)
			.send({
				name: 'Standard Returns',
				policyType: 'standard',
				returnWindowDays: 30,
				policyDescrRichText: null,
			});
		expect(res.status).toBe(200);
	});

	it('POST .../profiles/returns returns 409 for a duplicate name', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/returns')
			.set(AUTH)
			.send({
				name: 'Standard Returns',
				policyType: 'no_returns',
				returnWindowDays: null,
				policyDescrRichText: null,
			});
		expect(res.status).toBe(409);
	});

	it('POST .../profiles/personalization returns 400 for a non-positive cost', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/personalization')
			.set(AUTH)
			.send({ name: 'Bad Engraving', costCents: 0, helperText: null });
		expect(res.status).toBe(400);
	});

	it('POST .../profiles/personalization returns 200 for valid input', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/personalization')
			.set(AUTH)
			.send({ name: 'Engraving', costCents: 500, helperText: null });
		expect(res.status).toBe(200);
	});

	it('POST .../profiles/personalization returns 409 for a duplicate name', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/profiles/personalization')
			.set(AUTH)
			.send({ name: 'Engraving', costCents: 750, helperText: null });
		expect(res.status).toBe(409);
	});
});

describe('PUT /api/shops/:shopId/manager/listings/:listingShortId', () => {
	it('returns 400 when updating with an invalid payload', async () => {
		const createRes = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send(validListingBody());
		expect(createRes.status).toBe(200);
		const listingShortId = createRes.body.shortId;

		const res = await request(getApp())
			.put(`/api/shops/mgr80/manager/listings/${listingShortId}`)
			.set(AUTH)
			.send({ ...validListingBody(), priceCents: -100 });
		expect(res.status).toBe(400);
	});
});

describe('using real database references not owned by another shop', () => {
	let processingProfileId: number;

	beforeAll(async () => {
		const em = getEm();
		const otherShop = em.create(Shop, {
			id: 82,
			shortId: 'mgr82',
			title: 'Foreign Profile Shop',
			directFulfillment: false,
		});
		const foreignProfile = em.create(ListingProcessingProfile, {
			shop: otherShop,
			name: 'Foreign Processing',
			minDays: 1,
			maxDays: 2,
		});
		await em.persist([otherShop, foreignProfile]).flush();
		processingProfileId = foreignProfile.id;
	});

	it('returns 400 for a profile id that belongs to a different shop', async () => {
		const res = await request(getApp())
			.post('/api/shops/mgr80/manager/listings')
			.set(AUTH)
			.send({ ...validListingBody(), processingProfileId });
		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/processing/i);
	});
});

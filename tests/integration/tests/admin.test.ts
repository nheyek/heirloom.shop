import { jest } from '@jest/globals';

// Must use unstable_mockModule in ESM mode — jest.mock() cannot be hoisted
// before static imports the way it can in CJS. The app is lazy-loaded inside
// useApp (via setupApp) so this mock is registered before storage.service loads.
jest.unstable_mockModule('@server/services/storage.service', () => ({
	generateShopImageUploadUrl: jest
		.fn<() => Promise<{ uuid: string; uploadUrl: string }>>()
		.mockResolvedValue({
			uuid: 'test-uuid-123',
			uploadUrl: 'https://example.com/upload',
		}),
	generateListingImageUploadUrl: jest
		.fn<() => Promise<{ uuid: string; uploadUrl: string }>>()
		.mockResolvedValue({
			uuid: 'test-uuid-456',
			uploadUrl: 'https://example.com/listing-upload',
		}),
	InvalidContentTypeError: class InvalidContentTypeError extends Error {},
}));

import {
	OrderStatus,
	ShippingProvider,
} from '@heirloom/common/constants';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { AppUser } from '@server/entities/generated/AppUser';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import request from 'supertest';
import { seedCountries } from '../helpers/seedData';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

beforeAll(async () => {
	const em = getEm();
	await seedCountries(em);
});

describe('GET /api/admin/shops', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/admin/shops');
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin authenticated user', async () => {
		// Ensure the test user exists in the DB (is_admin defaults to false)
		await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');

		const res = await request(getApp())
			.get('/api/admin/shops')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(403);
	});

	it('returns 200 for an admin user', async () => {
		// Promote the test user to admin
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = true;
		await em.flush();

		const res = await request(getApp())
			.get('/api/admin/shops')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);

		// Reset so other tests are not affected
		user.isAdmin = false;
		await em.flush();
	});
});

describe('POST /api/admin/shops', () => {
	const adminSetup = async () => {
		// Ensure test user exists and is admin
		await request(getApp()).get('/api/me').set(AUTH);
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = true;
		await em.flush();
		return user;
	};

	const adminTeardown = async () => {
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = false;
		await em.flush();
	};

	const baseBody = {
		title: 'Admin Created Shop',
		classification: 'Ceramics',
		location: 'Portland, OR',
		countryCode: 'US',
		directFulfillment: false,
	};

	it('returns 401 without auth', async () => {
		const res = await request(getApp())
			.post('/api/admin/shops')
			.send(baseBody);
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin user', async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const res = await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send(baseBody);
		expect(res.status).toBe(403);
	});

	it('returns 400 when directFulfillment is true but ownerEmail is missing', async () => {
		await adminSetup();
		const res = await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send({
				...baseBody,
				title: 'Admin DF No Email',
				directFulfillment: true,
			});
		expect(res.status).toBe(400);
		expect(res.body).toMatchObject({
			error: 'Owner email is required.',
		});
		await adminTeardown();
	});

	it('returns 400 when directFulfillment is true but ownerEmail is invalid', async () => {
		await adminSetup();
		const res = await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send({
				...baseBody,
				title: 'Admin DF Bad Email',
				directFulfillment: true,
				ownerEmail: 'not-an-email',
			});
		expect(res.status).toBe(400);
		expect(res.body).toMatchObject({
			error: 'Email format is invalid.',
		});
		await adminTeardown();
	});

	it('returns 409 when a shop with the same title already exists', async () => {
		await adminSetup();
		// Create the shop once
		await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send({ ...baseBody, title: 'Admin Duplicate Shop' });
		// Try to create it again
		const res = await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send({ ...baseBody, title: 'Admin Duplicate Shop' });
		expect(res.status).toBe(409);
		expect(res.body).toMatchObject({
			error: 'A shop with this name already exists.',
		});
		await adminTeardown();
	});

	it('returns 201 with correct shape for a non-direct-fulfillment shop', async () => {
		await adminSetup();
		const res = await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send({
				...baseBody,
				title: 'Admin Created Shop Standard',
			});
		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({
			title: 'Admin Created Shop Standard',
			listingCount: 0,
			directFulfillment: false,
		});
		expect(typeof res.body.id).toBe('number');
		expect(typeof res.body.shortId).toBe('string');
		await adminTeardown();
	});

	it('returns 201 with directFulfillment: true when ownerEmail is provided', async () => {
		await adminSetup();
		const res = await request(getApp())
			.post('/api/admin/shops')
			.set(AUTH)
			.send({
				...baseBody,
				title: 'Admin Created Direct Shop',
				directFulfillment: true,
				ownerEmail: 'shopowner@example.com',
			});
		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({
			title: 'Admin Created Direct Shop',
			directFulfillment: true,
			listingCount: 0,
		});
		await adminTeardown();
	});
});

/**
 * Sample data (ids are DB-generated, not hardcoded, to avoid collisions
 * with other test files sharing the same database):
 * - AppOrder: shortId="adm_ord01", status CONFIRMED, guest order (no user)
 * - AppOrder: shortId="adm_ord02", status PENDING, guest order (no user)
 */
describe('GET /api/admin/orders', () => {
	const adminSetup = async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = true;
		await em.flush();
		return user;
	};

	const adminTeardown = async () => {
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = false;
		await em.flush();
	};

	beforeAll(async () => {
		const em = getEm();

		const order = em.create(AppOrder, {
			shortId: 'adm_ord01',
			email: 'guest@example.com',
			shippingAddress: {
				firstName: 'Guest',
				lastName: 'Buyer',
				line1: '1 Guest St',
				line2: '',
				city: 'Austin',
				state: 'TX',
				zip: '73301',
			},
			subtotal: 1500,
			taxTotal: 100,
			shippingPrice: 500,
			accessKey: 'adm_test_key',
			orderStatus: OrderStatus.CONFIRMED,
			paymentIntentId: 'pi_admtest01',
		});

		const pendingOrder = em.create(AppOrder, {
			shortId: 'adm_ord02',
			email: 'guest@example.com',
			shippingAddress: {
				firstName: 'Guest',
				lastName: 'Buyer',
				line1: '1 Guest St',
				line2: '',
				city: 'Austin',
				state: 'TX',
				zip: '73301',
			},
			subtotal: 1500,
			taxTotal: 100,
			shippingPrice: 500,
			accessKey: 'adm_test_key_2',
			orderStatus: OrderStatus.PENDING,
			paymentIntentId: 'pi_admtest02',
		});

		await em.persist([order, pendingOrder]).flush();
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/admin/orders');
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin authenticated user', async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const res = await request(getApp())
			.get('/api/admin/orders')
			.set(AUTH);
		expect(res.status).toBe(403);
	});

	it('returns orders app-wide, including guest orders not owned by the admin', async () => {
		await adminSetup();
		const res = await request(getApp())
			.get('/api/admin/orders')
			.set(AUTH);
		expect(res.status).toBe(200);
		const order = res.body.find(
			(o: any) => o.shortId === 'adm_ord01',
		);
		expect(order).toMatchObject({
			shortId: 'adm_ord01',
			orderStatus: OrderStatus.CONFIRMED,
			subtotalCents: 1500,
			shippingCents: 500,
			taxCents: 100,
			shippingAddress: expect.objectContaining({
				city: 'Austin',
				state: 'TX',
			}),
		});
		await adminTeardown();
	});

	it('excludes pending orders', async () => {
		await adminSetup();
		const res = await request(getApp())
			.get('/api/admin/orders')
			.set(AUTH);
		const shortIds = res.body.map((o: any) => o.shortId);
		expect(shortIds).toContain('adm_ord01');
		expect(shortIds).not.toContain('adm_ord02');
		await adminTeardown();
	});
});

/**
 * Sample data (ids are DB-generated, not hardcoded, to avoid collisions
 * with other test files sharing the same database):
 * - AppOrder: shortId="adm_ord03", status CONFIRMED, guest order (no user)
 */
describe('GET /api/admin/orders/:shortId', () => {
	const adminSetup = async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = true;
		await em.flush();
		return user;
	};

	const adminTeardown = async () => {
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = false;
		await em.flush();
	};

	beforeAll(async () => {
		const em = getEm();

		const order = em.create(AppOrder, {
			shortId: 'adm_ord03',
			email: 'guest3@example.com',
			shippingAddress: {
				firstName: 'Guest',
				lastName: 'Three',
				line1: '3 Guest St',
				line2: '',
				city: 'Denver',
				state: 'CO',
				zip: '80202',
			},
			subtotal: 2000,
			taxTotal: 150,
			shippingPrice: 400,
			accessKey: 'adm_test_key_3',
			orderStatus: OrderStatus.CONFIRMED,
			paymentIntentId: 'pi_admtest03',
		});

		await em.persist(order).flush();
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get(
			'/api/admin/orders/adm_ord03',
		);
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin authenticated user', async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const res = await request(getApp())
			.get('/api/admin/orders/adm_ord03')
			.set(AUTH);
		expect(res.status).toBe(403);
	});

	it('returns 404 for an unknown shortId', async () => {
		await adminSetup();
		const res = await request(getApp())
			.get('/api/admin/orders/doesnotexist')
			.set(AUTH);
		expect(res.status).toBe(404);
		await adminTeardown();
	});

	it('returns the order for an admin without requiring ownership or an access key', async () => {
		await adminSetup();
		const res = await request(getApp())
			.get('/api/admin/orders/adm_ord03')
			.set(AUTH);
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			shortId: 'adm_ord03',
			orderStatus: OrderStatus.CONFIRMED,
			subtotalCents: 2000,
			shippingCents: 400,
			taxCents: 150,
			shippingAddress: expect.objectContaining({
				city: 'Denver',
				state: 'CO',
			}),
		});
		await adminTeardown();
	});
});

/**
 * Sample data (ids are DB-generated, not hardcoded, to avoid collisions
 * with other test files sharing the same database):
 * - AppOrder: shortId="adm_ord04", status CONFIRMED, guest order (no user)
 */
describe('PUT /api/admin/orders/:shortId/shipments', () => {
	const adminSetup = async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = true;
		await em.flush();
		return user;
	};

	const adminTeardown = async () => {
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = false;
		await em.flush();
	};

	const validBody = {
		shipments: [
			{ provider: ShippingProvider.UPS, tracking: '1Z999AA10123456784' },
		],
	};

	beforeAll(async () => {
		const em = getEm();

		const order = em.create(AppOrder, {
			shortId: 'adm_ord04',
			email: 'guest4@example.com',
			shippingAddress: {
				firstName: 'Guest',
				lastName: 'Four',
				line1: '4 Guest St',
				line2: '',
				city: 'Seattle',
				state: 'WA',
				zip: '98101',
			},
			subtotal: 2500,
			taxTotal: 175,
			shippingPrice: 450,
			accessKey: 'adm_test_key_4',
			orderStatus: OrderStatus.CONFIRMED,
			paymentIntentId: 'pi_admtest04',
		});

		await em.persist(order).flush();
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp())
			.put('/api/admin/orders/adm_ord04/shipments')
			.send(validBody);
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin authenticated user', async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const res = await request(getApp())
			.put('/api/admin/orders/adm_ord04/shipments')
			.set(AUTH)
			.send(validBody);
		expect(res.status).toBe(403);
	});

	it('returns 404 for an unknown shortId', async () => {
		await adminSetup();
		const res = await request(getApp())
			.put('/api/admin/orders/doesnotexist/shipments')
			.set(AUTH)
			.send(validBody);
		expect(res.status).toBe(404);
		await adminTeardown();
	});

	it('returns 400 for an invalid provider', async () => {
		await adminSetup();
		const res = await request(getApp())
			.put('/api/admin/orders/adm_ord04/shipments')
			.set(AUTH)
			.send({
				shipments: [{ provider: 'NotAProvider', tracking: '123' }],
			});
		expect(res.status).toBe(400);
		await adminTeardown();
	});

	it('returns 400 for an empty tracking number', async () => {
		await adminSetup();
		const res = await request(getApp())
			.put('/api/admin/orders/adm_ord04/shipments')
			.set(AUTH)
			.send({
				shipments: [
					{ provider: ShippingProvider.UPS, tracking: '' },
				],
			});
		expect(res.status).toBe(400);
		await adminTeardown();
	});

	it('sets the shipments and persists them', async () => {
		await adminSetup();
		const res = await request(getApp())
			.put('/api/admin/orders/adm_ord04/shipments')
			.set(AUTH)
			.send(validBody);
		expect(res.status).toBe(200);
		expect(res.body).toEqual(validBody);

		const getRes = await request(getApp())
			.get('/api/admin/orders/adm_ord04')
			.set(AUTH);
		expect(getRes.body.shipments).toEqual(validBody.shipments);
		await adminTeardown();
	});
});

describe('POST /api/admin/shop-image-upload-url', () => {
	const adminSetup = async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = true;
		await em.flush();
		return user;
	};

	const adminTeardown = async () => {
		const em = getEm();
		const user = await em.findOneOrFail(AppUser, {
			email: TEST_USER_EMAIL,
		});
		user.isAdmin = false;
		await em.flush();
	};

	it('returns 401 without auth', async () => {
		const res = await request(getApp())
			.post('/api/admin/shop-image-upload-url')
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(401);
	});

	it('returns 403 for a non-admin user', async () => {
		await request(getApp()).get('/api/me').set(AUTH);
		const res = await request(getApp())
			.post('/api/admin/shop-image-upload-url')
			.set(AUTH)
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(403);
	});

	it('returns 200 with uuid and uploadUrl', async () => {
		await adminSetup();
		const res = await request(getApp())
			.post('/api/admin/shop-image-upload-url')
			.set(AUTH)
			.send({ contentType: 'image/jpeg' });
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			uuid: 'test-uuid-123',
			uploadUrl: 'https://example.com/upload',
		});
		await adminTeardown();
	});
});

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
}));

import { getEm } from '@server/db';
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

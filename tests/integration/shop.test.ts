import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { Shop } from '@server/entities/generated/Shop';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { findOrCreateUser } from '@server/services/user.service';
import request from 'supertest';
import { seedCategories } from './helpers/seedData';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

/**
 * Sample data (IDs in the 200s to avoid conflicts with other test files):
 *
 * Shop 20: "The Woodworkers" — has location, classification, shortId="wood20"
 *   - "Oak Dining Table"    shortId="tbl001"
 *   - "Walnut Bookshelf"    shortId="bk0001"
 *
 * Shop 21: "The Glass Studio" — no optional fields, shortId="glas21"
 *   (no listings)
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const testUser = await findOrCreateUser(TEST_USER_EMAIL);

	const woodworkers = em.create(Shop, {
		id: 20,
		shortId: 'wood20',
		title: 'The Woodworkers',
		shopLocation: 'Portland, OR',
		classification: 'Furniture',
	});
	const glassStudio = em.create(Shop, {
		id: 21,
		shortId: 'glas21',
		title: 'The Glass Studio',
	});

	const table = em.create(Listing, {
		id: 201,
		shortId: 'tbl001',
		title: 'Oak Dining Table',
		priceCents: 120000,
		shop: woodworkers,
		category: 'CERAMICS',
	});
	const bookshelf = em.create(Listing, {
		id: 202,
		shortId: 'bk0001',
		title: 'Walnut Bookshelf',
		priceCents: 85000,
		shop: woodworkers,
		category: 'CERAMICS',
	});

	const ownerRole = em.create(ShopUserRole, {
		id: 1,
		shop: woodworkers,
		user: testUser,
		shopRole: 'owner',
	});

	await em.persist([woodworkers, glassStudio, table, bookshelf, ownerRole]).flush();
});

describe('GET /api/shops', () => {
	let res: any;

	beforeAll(async () => {
		res = await request(getApp()).get('/api/shops');
	});

	it('returns 200 with an array of shops', () => {
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it('returns shops with the expected shape', () => {
		const woodworkers = res.body.find((s: any) => s.shortId === 'wood20');
		expect(woodworkers).toMatchObject({
			id: 20,
			shortId: 'wood20',
			title: 'The Woodworkers',
			location: 'Portland, OR',
			classification: 'Furniture',
			countryCode: null,
			categoryIcon: null,
		});
	});

	it('returns null for unset optional fields', () => {
		const glassStudio = res.body.find((s: any) => s.shortId === 'glas21');
		expect(glassStudio.location).toBeNull();
		expect(glassStudio.classification).toBeNull();
		expect(glassStudio.countryCode).toBeNull();
		expect(glassStudio.categoryIcon).toBeNull();
	});
});

describe('GET /api/shops/:id', () => {
	it('returns 404 for an unknown shortId', async () => {
		const res = await request(getApp()).get('/api/shops/unknown');
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns the shop with the expected shape', async () => {
		const res = await request(getApp()).get('/api/shops/wood20');
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			id: 20,
			shortId: 'wood20',
			title: 'The Woodworkers',
			location: 'Portland, OR',
			classification: 'Furniture',
		});
	});
});

describe('GET /api/shops/:id/listings', () => {
	it('returns 404 for an unknown shop', async () => {
		const res = await request(getApp()).get('/api/shops/unknown/listings');
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns an empty array for a shop with no listings', async () => {
		const res = await request(getApp()).get('/api/shops/glas21/listings');
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});

	it('returns the listings for a shop', async () => {
		const res = await request(getApp()).get('/api/shops/wood20/listings');
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const shortIds = res.body.map((l: any) => l.shortId);
		expect(shortIds).toEqual(expect.arrayContaining(['tbl001', 'bk0001']));
	});

	it('only returns listings belonging to that shop', async () => {
		const res = await request(getApp()).get('/api/shops/wood20/listings');
		for (const listing of res.body) {
			expect(listing.shopId).toBe(20);
		}
	});
});

describe('POST /api/shops/:id/listings', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp())
			.post('/api/shops/wood20/listings')
			.send({ title: 'New Item', desc: '' });
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown shop', async () => {
		const res = await request(getApp())
			.post('/api/shops/unknown/listings')
			.set(AUTH)
			.send({ title: 'New Item', desc: '' });
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns 201 and the new listing id', async () => {
		const res = await request(getApp())
			.post('/api/shops/wood20/listings')
			.set(AUTH)
			.send({ title: 'Cedar Shelf', desc: 'Hand-crafted cedar shelf', categoryId: 'CERAMICS' });
		expect(res.status).toBe(201);
		expect(typeof res.body.id).toBe('number');
	});
});

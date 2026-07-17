import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { Shop } from '@server/entities/generated/Shop';
import { ShopUserRole } from '@server/entities/generated/ShopUserRole';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { findOrCreateUser } from '@server/services/user.service';
import request from 'supertest';
import { seedCategories, seedCountries } from '../helpers/seedData';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

/**
 * Sample data:
 *
 * Shop "The Woodworkers" — has location, classification, shortId="wood20"
 *   - "Oak Dining Table"    shortId="tbl001"
 *   - "Walnut Bookshelf"    shortId="bk0001"
 *
 * Shop "The Glass Studio" — no optional fields, shortId="glas21"
 *   (no listings)
 *
 * Shop "The Metalworks" — no optional fields, shortId="metl22"
 *   testUser has a non-owner ("staff") role assignment here
 *   (no listings)
 *
 * IDs are DB-generated (not hardcoded) to avoid collisions with other test
 * files sharing the same database; woodworkersId captures the generated id
 * for assertions below that check it.
 */
let woodworkersId: number;

beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const testUser = await findOrCreateUser(TEST_USER_EMAIL);

	const woodworkers = em.create(Shop, {
		shortId: 'wood20',
		title: 'The Woodworkers',
		shopLocation: 'Portland, OR',
		classification: 'Furniture',
	});
	const glassStudio = em.create(Shop, {
		shortId: 'glas21',
		title: 'The Glass Studio',
	});
	const metalworks = em.create(Shop, {
		shortId: 'metl22',
		title: 'The Metalworks',
	});

	const table = em.create(Listing, {
		shortId: 'tbl001',
		title: 'Oak Dining Table',
		priceCents: 120000,
		shop: woodworkers,
		category: 'CERAMICS',
	});
	const bookshelf = em.create(Listing, {
		shortId: 'bk0001',
		title: 'Walnut Bookshelf',
		priceCents: 85000,
		shop: woodworkers,
		category: 'CERAMICS',
	});

	const ownerRole = em.create(ShopUserRole, {
		shop: woodworkers,
		user: testUser,
		shopRole: 'owner',
	});
	const staffRole = em.create(ShopUserRole, {
		shop: metalworks,
		user: testUser,
		shopRole: 'staff',
	});

	await seedCountries(em);

	await em
		.persist([woodworkers, glassStudio, metalworks, table, bookshelf])
		.flush();
	await em.persist([ownerRole, staffRole]).flush();

	woodworkersId = woodworkers.id;
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
		const woodworkers = res.body.find(
			(s: any) => s.shortId === 'wood20',
		);
		expect(woodworkers).toMatchObject({
			id: woodworkersId,
			shortId: 'wood20',
			title: 'The Woodworkers',
			location: 'Portland, OR',
			classification: 'Furniture',
			countryCode: null,
		});
	});

	it('returns null for unset optional fields', () => {
		const glassStudio = res.body.find(
			(s: any) => s.shortId === 'glas21',
		);
		expect(glassStudio.location).toBeNull();
		expect(glassStudio.classification).toBeNull();
		expect(glassStudio.countryCode).toBeNull();
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
			id: woodworkersId,
			shortId: 'wood20',
			title: 'The Woodworkers',
			location: 'Portland, OR',
			classification: 'Furniture',
		});
	});
});

describe('GET /api/shops/:id/listings', () => {
	it('returns 404 for an unknown shop', async () => {
		const res = await request(getApp()).get(
			'/api/shops/unknown/listings',
		);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns an empty array for a shop with no listings', async () => {
		const res = await request(getApp()).get(
			'/api/shops/glas21/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});

	it('returns the listings for a shop', async () => {
		const res = await request(getApp()).get(
			'/api/shops/wood20/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const shortIds = res.body.map((l: any) => l.shortId);
		expect(shortIds).toEqual(
			expect.arrayContaining(['tbl001', 'bk0001']),
		);
	});

	it('only returns listings belonging to that shop', async () => {
		const res = await request(getApp()).get(
			'/api/shops/wood20/listings',
		);
		for (const listing of res.body) {
			expect(listing.shopId).toBe(woodworkersId);
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
			.send({
				title: 'Cedar Shelf',
				desc: 'Hand-crafted cedar shelf',
				categoryId: 'CERAMICS',
			});
		expect(res.status).toBe(201);
		expect(typeof res.body.id).toBe('number');
	});
});

describe('PATCH /api/shops/:id', () => {
	const validUpdate = {
		title: 'The Woodworkers Updated',
		classification: 'Woodworking',
		location: 'Seattle, WA',
		countryCode: 'US',
	};

	it('returns 401 without auth', async () => {
		const res = await request(getApp())
			.patch('/api/shops/wood20')
			.send(validUpdate);
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown shortId', async () => {
		const res = await request(getApp())
			.patch('/api/shops/unknown')
			.set(AUTH)
			.send(validUpdate);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns 403 for a user who does not own the shop', async () => {
		const res = await request(getApp())
			.patch('/api/shops/glas21')
			.set(AUTH)
			.send({ ...validUpdate, title: 'The Glass Studio' });
		expect(res.status).toBe(403);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.forbidden,
		});
	});

	it('returns 403 for a user with a non-owner role assignment on the shop', async () => {
		const res = await request(getApp())
			.patch('/api/shops/metl22')
			.set(AUTH)
			.send({ ...validUpdate, title: 'The Metalworks' });
		expect(res.status).toBe(403);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.forbidden,
		});
	});

	it('returns 409 when the new title conflicts with an existing shop', async () => {
		const res = await request(getApp())
			.patch('/api/shops/wood20')
			.set(AUTH)
			.send({ ...validUpdate, title: 'The Glass Studio' });
		expect(res.status).toBe(409);
	});

	it('returns 200 and the updated shop on success', async () => {
		const res = await request(getApp())
			.patch('/api/shops/wood20')
			.set(AUTH)
			.send(validUpdate);
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			shortId: 'wood20',
			title: 'The Woodworkers Updated',
			classification: 'Woodworking',
			location: 'Seattle, WA',
			countryCode: 'US',
		});
	});
});

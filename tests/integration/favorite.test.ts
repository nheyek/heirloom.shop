import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { seedCategories } from './helpers/seedData';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

/**
 * Sample data (IDs in the 100s to avoid conflicts with other test files):
 *
 * Shop 10: "Craft Co"
 *   - "Ceramic Bowl"  shortId="bowl01"
 *   - "Wool Scarf"    shortId="scrf01"
 *   - "Brass Lamp"    shortId="lamp01"
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	// Ensure the test user exists
	await request(getApp()).get('/api/me').set(AUTH);

	const shop = em.create(Shop, {
		id: 10,
		title: 'Craft Co',
		shortId: 'shop10',
	});
	const bowl = em.create(Listing, {
		id: 101,
		shortId: 'bowl01',
		title: 'Ceramic Bowl',
		priceCents: 3200,
		shop,
		category: 'CERAMICS',
	});
	const scarf = em.create(Listing, {
		id: 102,
		shortId: 'scrf01',
		title: 'Wool Scarf',
		priceCents: 5500,
		shop,
		category: 'CERAMICS',
	});
	const lamp = em.create(Listing, {
		id: 103,
		shortId: 'lamp01',
		title: 'Brass Lamp',
		priceCents: 18000,
		shop,
		category: 'CERAMICS',
	});

	await em.persistAndFlush([shop, bowl, scarf, lamp]);
});

describe('POST /api/listings/:id/favorite', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).post('/api/listings/bowl01/favorite');
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown listing', async () => {
		const res = await request(getApp())
			.post('/api/listings/unknown/favorite')
			.set(AUTH);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			message: ERROR_MESSAGES.listing.favoriteNotFound,
		});
	});

	it('returns 200 with favorited: true', async () => {
		const res = await request(getApp())
			.post('/api/listings/bowl01/favorite')
			.set(AUTH);
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: true });
	});

	it('is idempotent — favoriting again still returns 200', async () => {
		const res = await request(getApp())
			.post('/api/listings/bowl01/favorite')
			.set(AUTH);
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: true });
	});
});

describe('DELETE /api/listings/:id/favorite', () => {
	beforeAll(async () => {
		// Ensure scarf is favorited before testing removal
		await request(getApp()).post('/api/listings/scrf01/favorite').set(AUTH);
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).delete(
			'/api/listings/scrf01/favorite',
		);
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown listing', async () => {
		const res = await request(getApp())
			.delete('/api/listings/unknown/favorite')
			.set(AUTH);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			message: ERROR_MESSAGES.listing.favoriteNotFound,
		});
	});

	it('returns 200 with favorited: false', async () => {
		const res = await request(getApp())
			.delete('/api/listings/scrf01/favorite')
			.set(AUTH);
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: false });
	});

	it('is idempotent — unfavoriting again still returns 200', async () => {
		const res = await request(getApp())
			.delete('/api/listings/scrf01/favorite')
			.set(AUTH);
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: false });
	});
});

describe('GET /api/me/favorites', () => {
	beforeAll(async () => {
		// scrf01 was unfavorited above so its record is gone — favoriting it
		// here gives us two fresh records in a known order for the ordering test
		await request(getApp()).post('/api/listings/scrf01/favorite').set(AUTH);
		await request(getApp()).post('/api/listings/lamp01/favorite').set(AUTH);
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me/favorites');
		expect(res.status).toBe(401);
	});

	let res: any;

	beforeAll(async () => {
		res = await request(getApp()).get('/api/me/favorites').set(AUTH);
	});

	it('returns 200 with the favorited listings', () => {
		expect(res.status).toBe(200);
		const shortIds = res.body.map((l: any) => l.shortId);
		expect(shortIds).toContain('lamp01');
		expect(shortIds).toContain('scrf01');
		expect(shortIds).toContain('bowl01');
	});

	it('returns listings with the expected shape', () => {
		const lamp = res.body.find((l: any) => l.shortId === 'lamp01');
		expect(lamp).toMatchObject({
			shortId: 'lamp01',
			title: 'Brass Lamp',
			priceCents: 18000,
			shopId: 10,
			shopTitle: 'Craft Co',
		});
	});

	it('returns favorites in reverse-chronological order', () => {
		const shortIds = res.body.map((l: any) => l.shortId);
		// lamp01 was favorited after scrf01, so it should appear first
		expect(shortIds.indexOf('lamp01')).toBeLessThan(
			shortIds.indexOf('scrf01'),
		);
	});
});

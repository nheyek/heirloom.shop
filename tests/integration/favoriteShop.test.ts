import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

const AUTH = { Authorization: 'Bearer test' };

/**
 * Sample data (IDs in the 500s to avoid conflicts with other test files):
 *
 * Shop 50: "Favorite Test Shop"   shortId="fav_shop50"
 * Shop 51: "Favorite Test Shop 2" shortId="fav_shop51"
 */
beforeAll(async () => {
	const em = getEm();

	// Ensure the test user exists
	await request(getApp()).get('/api/me').set(AUTH);

	const shop50 = em.create(Shop, {
		id: 50,
		title: 'Favorite Test Shop',
		shortId: 'fav_shop50',
	});

	const shop51 = em.create(Shop, {
		id: 51,
		title: 'Favorite Test Shop 2',
		shortId: 'fav_shop51',
	});

	await em.persist([shop50, shop51]).flush();
});

describe('POST /api/shops/:id/favorite', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).post(
			'/api/shops/fav_shop50/favorite',
		);
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown shop', async () => {
		const res = await request(getApp())
			.post('/api/shops/unknown_shop/favorite')
			.set(AUTH)
			.send({});
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns 200 with favorited: true', async () => {
		const res = await request(getApp())
			.post('/api/shops/fav_shop50/favorite')
			.set(AUTH)
			.send({});
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: true });
	});

	it('is idempotent — favoriting again still returns 200', async () => {
		const res = await request(getApp())
			.post('/api/shops/fav_shop50/favorite')
			.set(AUTH)
			.send({});
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: true });
	});
});

describe('DELETE /api/shops/:id/favorite', () => {
	beforeAll(async () => {
		// Ensure shop51 is favorited before testing removal
		await request(getApp())
			.post('/api/shops/fav_shop51/favorite')
			.set(AUTH)
			.send({});
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).delete(
			'/api/shops/fav_shop51/favorite',
		);
		expect(res.status).toBe(401);
	});

	it('returns 404 for an unknown shop', async () => {
		const res = await request(getApp())
			.delete('/api/shops/unknown_shop/favorite')
			.set(AUTH)
			.send({});
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.shop.notFound,
		});
	});

	it('returns 200 with favorited: false', async () => {
		const res = await request(getApp())
			.delete('/api/shops/fav_shop51/favorite')
			.set(AUTH)
			.send({});
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: false });
	});

	it('is idempotent — unfavoriting again still returns 200', async () => {
		const res = await request(getApp())
			.delete('/api/shops/fav_shop51/favorite')
			.set(AUTH)
			.send({});
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ favorited: false });
	});
});

describe('GET /api/me/favorite-shops', () => {
	beforeAll(async () => {
		// Clear both favorites so we get fresh rows with known timestamps
		await request(getApp())
			.delete('/api/shops/fav_shop50/favorite')
			.set(AUTH)
			.send({});
		await request(getApp())
			.delete('/api/shops/fav_shop51/favorite')
			.set(AUTH)
			.send({});
		// Favorite shop51 first, then shop50 — shop50 will have the most recent
		// createdAt and should appear first in reverse-chronological order
		await request(getApp())
			.post('/api/shops/fav_shop51/favorite')
			.set(AUTH)
			.send({});
		await request(getApp())
			.post('/api/shops/fav_shop50/favorite')
			.set(AUTH)
			.send({});
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me/favorite-shops');
		expect(res.status).toBe(401);
	});

	let res: any;

	beforeAll(async () => {
		res = await request(getApp())
			.get('/api/me/favorite-shops')
			.set(AUTH);
	});

	it('returns 200 with the favorited shops', () => {
		expect(res.status).toBe(200);
		const shortIds = res.body.map((s: any) => s.shortId);
		expect(shortIds).toContain('fav_shop50');
		expect(shortIds).toContain('fav_shop51');
	});

	it('returns shops with the expected shape', () => {
		const shop = res.body.find((s: any) => s.shortId === 'fav_shop50');
		expect(shop).toMatchObject({
			shortId: 'fav_shop50',
			title: 'Favorite Test Shop',
		});
	});

	it('returns favorites in reverse-chronological order', () => {
		const shortIds = res.body.map((s: any) => s.shortId);
		// fav_shop50 was favorited after fav_shop51, so it should appear first
		expect(shortIds.indexOf('fav_shop50')).toBeLessThan(
			shortIds.indexOf('fav_shop51'),
		);
	});
});

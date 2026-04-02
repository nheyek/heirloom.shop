import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { seedCategories } from './helpers/seedData';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data:
 * Shops:
 *   - "Artisan Workshop"
 *   - "Woodcraft Studio"
 * 
 * Listings:
 *   - "Handmade Ceramic Bowl" (Artisan Workshop)
 *   - "Wooden Cutting Board" (Woodcraft Studio)
 *   - "Ceramic Vase" (Artisan Workshop)
 * 
 * Categories seeded via helper
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const artisanShop = em.create(Shop, {
		id: 1,
		title: 'Artisan Workshop',
		shortId: 'shop01',
	});

	const woodShop = em.create(Shop, {
		id: 2,
		title: 'Woodcraft Studio',
		shortId: 'shop02',
	});

	const ceramicBowl = em.create(Listing, {
		shortId: 'bowl01',
		title: 'Handmade Ceramic Bowl',
		priceCents: 2500,
		shop: artisanShop,
	});

	const cuttingBoard = em.create(Listing, {
		shortId: 'board01',
		title: 'Wooden Cutting Board',
		priceCents: 4500,
		shop: woodShop,
	});

	const vase = em.create(Listing, {
		shortId: 'vase01',
		title: 'Ceramic Vase',
		priceCents: 3500,
		shop: artisanShop,
	});

	await em.persistAndFlush([
		artisanShop,
		woodShop,
		ceramicBowl,
		cuttingBoard,
		vase,
	]);
});

describe('GET /api/search', () => {
	it('searches listings by title (case-insensitive)', async () => {
		const res = await request(getApp()).get('/api/search?q=ceramic');

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('listingResults');
		expect(res.body.listingResults).toHaveLength(2);
		
		const titles = res.body.listingResults.map((r: any) => r.label);
		expect(titles).toEqual(
			expect.arrayContaining([
				'Handmade Ceramic Bowl (Artisan Workshop)',
				'Ceramic Vase (Artisan Workshop)',
			]),
		);
	});

	it('searches shops by title', async () => {
		const res = await request(getApp()).get('/api/search?q=wood');

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('shopResults');
		expect(res.body.shopResults.length).toBeGreaterThan(0);
		expect(res.body.shopResults[0]).toMatchObject({
			id: 'shop02',
			label: 'Woodcraft Studio',
		});
	});

	it('searches categories by title', async () => {
		const res = await request(getApp()).get('/api/search?q=jewelry');

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('categoryResults');
		expect(res.body.categoryResults.length).toBeGreaterThan(0);
		
		const categoryIds = res.body.categoryResults.map((r: any) => r.id);
		expect(categoryIds).toContain('jewelry');
	});

	it('returns empty results for non-matching query', async () => {
		const res = await request(getApp()).get('/api/search?q=nonexistent');

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			listingResults: [],
			shopResults: [],
			categoryResults: [],
		});
	});

	it('returns 400 for missing query parameter', async () => {
		const res = await request(getApp()).get('/api/search');

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toContain('required');
	});

	it('returns 400 for query shorter than 3 characters', async () => {
		const res = await request(getApp()).get('/api/search?q=ab');

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toContain('at least 3 characters');
	});

	it('returns 400 for query longer than 48 characters', async () => {
		const longQuery = 'a'.repeat(49);
		const res = await request(getApp()).get(`/api/search?q=${longQuery}`);

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('message');
		expect(res.body.message).toContain('48 characters');
	});

	it('escapes special LIKE characters in query', async () => {
		const res = await request(getApp()).get('/api/search?q=test%');

		expect(res.status).toBe(200);
		// Should treat % as literal character, not wildcard
		expect(res.body).toEqual({
			listingResults: [],
			shopResults: [],
			categoryResults: [],
		});
	});
});

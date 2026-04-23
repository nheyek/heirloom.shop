import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { seedCategories } from './helpers/seedData';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data (IDs in the 400s to avoid conflicts with other test files):
 * Shops:
 *   - Shop 40: "Artisan Workshop"  shortId="shop40"
 *   - Shop 41: "Woodcraft Studio"  shortId="shop41"
 *
 * Listings:
 *   - "Handmade Ceramic Bowl" (Artisan Workshop)  shortId="src_bwl"
 *   - "Wooden Cutting Board" (Woodcraft Studio)   shortId="src_brd"
 *   - "Ceramic Vase" (Artisan Workshop)           shortId="src_vse"
 *
 * Categories seeded via helper
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const artisanShop = em.create(Shop, {
		id: 40,
		title: 'Artisan Workshop',
		shortId: 'shop40',
	});

	const woodShop = em.create(Shop, {
		id: 41,
		title: 'Woodcraft Studio',
		shortId: 'shop41',
	});

	const ceramicBowl = em.create(Listing, {
		shortId: 'src_bwl',
		title: 'Handmade Ceramic Bowl',
		priceCents: 2500,
		shop: artisanShop,
		category: 'CERAMICS',
	});

	const cuttingBoard = em.create(Listing, {
		shortId: 'src_brd',
		title: 'Wooden Cutting Board',
		priceCents: 4500,
		shop: woodShop,
		category: 'CERAMICS',
	});

	const vase = em.create(Listing, {
		shortId: 'src_vse',
		title: 'Ceramic Vase',
		priceCents: 3500,
		shop: artisanShop,
		category: 'CERAMICS',
	});

	await em.persist([
		artisanShop,
		woodShop,
		ceramicBowl,
		cuttingBoard,
		vase,
	]).flush();
});

describe('GET /api/search', () => {
	it('searches listings by title (case-insensitive)', async () => {
		const res = await request(getApp()).get('/api/search?q=ceramic');

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('listingResults');
		expect(res.body.listingResults.length).toBeGreaterThanOrEqual(2);

		const titles = res.body.listingResults.map((r: any) => r.label);
		expect(titles).toEqual(
			expect.arrayContaining([
				'Handmade Ceramic Bowl (Artisan Workshop)',
				'Ceramic Vase (Artisan Workshop)',
			]),
		);
	});

	it('searches shops by title', async () => {
		const res = await request(getApp()).get('/api/search?q=woodcraft');

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('shopResults');
		expect(res.body.shopResults.length).toBeGreaterThan(0);
		const shopIds = res.body.shopResults.map((s: any) => s.id);
		expect(shopIds).toContain('shop41');
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
		expect(res.body).toHaveProperty('error');
		expect(res.body.error).toContain('required');
	});

	it('returns 400 for query shorter than 3 characters', async () => {
		const res = await request(getApp()).get('/api/search?q=ab');

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
		expect(res.body.error).toContain('at least 3 characters');
	});

	it('returns 400 for query longer than 48 characters', async () => {
		const longQuery = 'a'.repeat(49);
		const res = await request(getApp()).get(`/api/search?q=${longQuery}`);

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
		expect(res.body.error).toContain('48 characters');
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

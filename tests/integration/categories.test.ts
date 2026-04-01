import request from 'supertest';
import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Category hierarchy used across all tests:
 *
 * CLOTHING       (top-level, has imageUuid)
 *   MENS         (child of CLOTHING)
 *     MENS_SHIRTS  (grandchild, no imageUuid)
 *   WOMENS       (child of CLOTHING, no imageUuid)
 *
 * JEWELRY        (top-level, no imageUuid)
 *   JEWELRY_VINTAGE  (child of JEWELRY)
 *
 * FURNITURE      (top-level, no children, has imageUuid)
 */
beforeAll(async () => {
	const em = getEm();

	const clothing = em.create(ListingCategory, {
		id: 'CLOTHING',
		title: 'Clothing',
		imageUuid: 'aaaaaaaa-0000-0000-0000-000000000001',
	});
	const mens = em.create(ListingCategory, {
		id: 'MENS',
		title: "Men's",
		parent: clothing,
	});
	const mensShirts = em.create(ListingCategory, {
		id: 'MENS_SHIRTS',
		title: "Men's Shirts",
		parent: mens,
	});
	const womens = em.create(ListingCategory, {
		id: 'WOMENS',
		title: "Women's",
		parent: clothing,
	});
	const jewelry = em.create(ListingCategory, {
		id: 'JEWELRY',
		title: 'Jewelry',
	});
	const jewelryVintage = em.create(ListingCategory, {
		id: 'JEWELRY_VINTAGE',
		title: 'Vintage Jewelry',
		parent: jewelry,
	});
	const furniture = em.create(ListingCategory, {
		id: 'FURNITURE',
		title: 'Furniture',
		imageUuid: 'aaaaaaaa-0000-0000-0000-000000000002',
	});

	await em.persistAndFlush([
		clothing,
		mens,
		mensShirts,
		womens,
		jewelry,
		jewelryVintage,
		furniture,
	]);
});

describe('GET /api/categories', () => {
	it('returns 200 with an array', async () => {
		const res = await request(getApp()).get('/api/categories');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it('returns all 7 categories', async () => {
		const res = await request(getApp()).get('/api/categories');
		expect(res.body).toHaveLength(7);
	});

	it('returns categories with the expected shape', async () => {
		const res = await request(getApp()).get('/api/categories');
		const clothing = res.body.find(
			(c: any) => c.id === 'CLOTHING',
		);
		expect(clothing).toMatchObject({
			id: 'CLOTHING',
			title: 'Clothing',
			imageUuid: 'aaaaaaaa-0000-0000-0000-000000000001',
		});
		expect(clothing.parentId).toBeUndefined();
	});
});

describe('GET /api/categories/:id', () => {
	it('returns 404 for a non-existent category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/DOES_NOT_EXIST',
		);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.category.notFound,
		});
	});

	it('returns a top-level category with no parentId', async () => {
		const res = await request(getApp()).get(
			'/api/categories/FURNITURE',
		);
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			id: 'FURNITURE',
			title: 'Furniture',
			imageUuid: 'aaaaaaaa-0000-0000-0000-000000000002',
		});
		expect(res.body.parentId).toBeUndefined();
	});

	it('returns a child category with its parentId', async () => {
		const res = await request(getApp()).get(
			'/api/categories/MENS',
		);
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			id: 'MENS',
			title: "Men's",
			parentId: 'CLOTHING',
		});
	});

	it('returns a grandchild category with its direct parentId', async () => {
		const res = await request(getApp()).get(
			'/api/categories/MENS_SHIRTS',
		);
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			id: 'MENS_SHIRTS',
			title: "Men's Shirts",
			parentId: 'MENS',
		});
		expect(res.body.imageUuid).toBeNull();
	});

	it('is case-insensitive for the id parameter', async () => {
		const res = await request(getApp()).get(
			'/api/categories/clothing',
		);
		expect(res.status).toBe(200);
		expect(res.body.id).toBe('CLOTHING');
	});
});

describe('GET /api/categories/:id/topLevel', () => {
	it('returns only the top-level categories', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/topLevel',
		);
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		const ids = res.body.map((c: any) => c.id);
		expect(ids).toEqual(
			expect.arrayContaining([
				'CLOTHING',
				'JEWELRY',
				'FURNITURE',
			]),
		);
		expect(ids).not.toContain('MENS');
		expect(ids).not.toContain('WOMENS');
		expect(ids).not.toContain('MENS_SHIRTS');
		expect(ids).not.toContain('JEWELRY_VINTAGE');
	});

	it('returns exactly 3 top-level categories', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/topLevel',
		);
		expect(res.body).toHaveLength(3);
	});

	it('top-level categories have no parentId', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/topLevel',
		);
		for (const category of res.body) {
			expect(category.parentId).toBeUndefined();
		}
	});
});

describe('GET /api/categories/:id/children', () => {
	it('returns the direct children of a category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/children',
		);
		expect(res.status).toBe(200);
		const ids = res.body.map((c: any) => c.id);
		expect(ids).toEqual(
			expect.arrayContaining(['MENS', 'WOMENS']),
		);
		expect(ids).not.toContain('MENS_SHIRTS');
	});

	it('returns exactly 2 children for CLOTHING', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/children',
		);
		expect(res.body).toHaveLength(2);
	});

	it('returns exactly 1 child for JEWELRY', async () => {
		const res = await request(getApp()).get(
			'/api/categories/JEWELRY/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0]).toMatchObject({
			id: 'JEWELRY_VINTAGE',
			parentId: 'JEWELRY',
		});
	});

	it('returns 1 child for MENS (the grandchild level)', async () => {
		const res = await request(getApp()).get(
			'/api/categories/MENS/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].id).toBe('MENS_SHIRTS');
	});

	it('returns an empty array for a leaf category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/FURNITURE/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});

	it('returns an empty array for an unknown category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/DOES_NOT_EXIST/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});

	it('children include their parentId in the response', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/children',
		);
		for (const child of res.body) {
			expect(child.parentId).toBe('CLOTHING');
		}
	});
});

describe('GET /api/categories/:id/listings', () => {
	it('returns an empty array when the category has no listings', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/listings',
		);
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body).toHaveLength(0);
	});

	it('returns an empty array for an unknown category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/DOES_NOT_EXIST/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});
});

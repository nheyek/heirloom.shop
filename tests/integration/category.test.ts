import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { ListingCategory } from '@server/entities/generated/ListingCategory';
import request from 'supertest';
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

describe('GET /api/categories/topLevel', () => {
	it('returns only the 3 top-level categories', async () => {
		const res = await request(getApp()).get(
			'/api/categories/topLevel',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(3);
		const ids = res.body.map((c: any) => c.id);
		expect(ids).toEqual(
			expect.arrayContaining([
				'CLOTHING',
				'JEWELRY',
				'FURNITURE',
			]),
		);
	});
});

describe('GET /api/categories/:id/children', () => {
	it('returns only the direct children with their parentId', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const ids = res.body.map((c: any) => c.id);
		expect(ids).toEqual(expect.arrayContaining(['MENS', 'WOMENS']));
		expect(ids).not.toContain('MENS_SHIRTS');
		for (const child of res.body) {
			expect(child.parentId).toBe('CLOTHING');
		}
	});

	it('works at the grandchild level', async () => {
		const res = await request(getApp()).get(
			'/api/categories/MENS/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0]).toMatchObject({
			id: 'MENS_SHIRTS',
			parentId: 'MENS',
		});
	});

	it('returns an empty array for a leaf category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/FURNITURE/children',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});

	it('returns 404 for an unknown category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/DOES_NOT_EXIST/children',
		);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.category.notFound,
		});
	});
});

describe('GET /api/categories/:id/listings', () => {
	it('returns an empty array when the category has no listings', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(0);
	});

	it('returns 404 for an unknown category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/DOES_NOT_EXIST/listings',
		);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			error: ERROR_MESSAGES.category.notFound,
		});
	});
});

import { ERROR_MESSAGES } from '@server/constants';
import { getEm } from '@server/db';
import { Listing } from '@server/entities/generated/Listing';
import { ReturnExchangeProfile } from '@server/entities/generated/ReturnExchangeProfile';
import { ShippingProfile } from '@server/entities/generated/ShippingProfile';
import { Shop } from '@server/entities/generated/Shop';
import request from 'supertest';
import { seedCategories } from './helpers/seedData';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data:
 *
 * Shop 1: "Artisan Workshop"
 *   - "Handmade Vase"       (no category)
 *   - "Men's Oxford Shirt"  (MENS_SHIRTS — grandchild of CLOTHING)
 *   - "Linen Blouse"        (WOMENS — child of CLOTHING)
 *
 * Shop 2: "Vintage Finds"
 *   - "Art Deco Brooch"    (JEWELRY_VINTAGE — child of JEWELRY)
 *   - "Mahogany Dresser"   (FURNITURE — top-level)
 *   - "Victorian Writing Desk" (FURNITURE — with shipping + return profiles)
 */
beforeAll(async () => {
	const em = getEm();
	await seedCategories(em);

	const shop1 = em.create(Shop, {
		id: 1,
		title: 'Artisan Workshop',
		shortId: 'shop01',
	});
	const shop2 = em.create(Shop, {
		id: 2,
		title: 'Vintage Finds',
		shortId: 'shop02',
	});

	const vase = em.create(Listing, {
		id: 1,
		shortId: 'vase01',
		title: 'Handmade Vase',
		subtitle: 'Hand-thrown stoneware',
		priceCents: 2500,
		shop: shop1,
	});
	const shirt = em.create(Listing, {
		id: 2,
		shortId: 'shrt01',
		title: "Men's Oxford Shirt",
		priceCents: 8900,
		shop: shop1,
		category: 'MENS_SHIRTS',
	});
	const blouse = em.create(Listing, {
		id: 3,
		shortId: 'blse01',
		title: 'Linen Blouse',
		priceCents: 7500,
		shop: shop1,
		category: 'WOMENS',
	});
	const brooch = em.create(Listing, {
		id: 4,
		shortId: 'brch01',
		title: 'Art Deco Brooch',
		priceCents: 12000,
		shop: shop2,
		category: 'JEWELRY_VINTAGE',
	});
	const dresser = em.create(Listing, {
		id: 5,
		shortId: 'drss01',
		title: 'Mahogany Dresser',
		priceCents: 145000,
		shop: shop2,
		category: 'FURNITURE',
	});

	const shippingProfile = em.create(ShippingProfile, {
		id: 1,
		profileName: 'Standard Shipping',
		flatShippingRateCents: 995,
		shippingDaysMin: 3,
		shippingDaysMax: 7,
		shop: shop2,
	});
	const returnProfile = em.create(ReturnExchangeProfile, {
		id: 1,
		profileName: 'Standard Returns',
		acceptReturns: true,
		acceptExchanges: true,
		returnWindowDays: 30,
	});
	const desk = em.create(Listing, {
		id: 6,
		shortId: 'desk01',
		title: 'Victorian Writing Desk',
		priceCents: 89500,
		shop: shop2,
		category: 'FURNITURE',
		shippingProfile,
		returnExchangeProfile: returnProfile,
	});

	await em.persistAndFlush([
		shop1,
		shop2,
		vase,
		shirt,
		blouse,
		brooch,
		dresser,
		shippingProfile,
		returnProfile,
		desk,
	]);
});

describe('GET /api/listings', () => {
	let res: any;

	beforeAll(async () => {
		res = await request(getApp()).get('/api/listings');
	});

	it('returns 200 with all 6 listings', () => {
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(6);
	});

	it('returns listings with the expected shape', () => {
		const vase = res.body.find(
			(l: any) => l.shortId === 'vase01',
		);
		expect(vase).toMatchObject({
			id: 1,
			shortId: 'vase01',
			title: 'Handmade Vase',
			subtitle: 'Hand-thrown stoneware',
			priceCents: 2500,
			shopId: 1,
			shopTitle: 'Artisan Workshop',
			shopShortId: 'shop01',
		});
		expect(Array.isArray(vase.imageUuids)).toBe(true);
	});

	it('includes listings from both shops', () => {
		const shopIds = new Set(res.body.map((l: any) => l.shopId));
		expect(shopIds).toContain(1);
		expect(shopIds).toContain(2);
	});

	it('returns empty string for subtitle when not set', () => {
		const shirt = res.body.find(
			(l: any) => l.shortId === 'shrt01',
		);
		expect(shirt.subtitle).toBe('');
	});

	it('returns the categoryId for listings that have one', () => {
		const brooch = res.body.find(
			(l: any) => l.shortId === 'brch01',
		);
		expect(brooch.categoryId).toBe('JEWELRY_VINTAGE');
	});

	it('returns empty string for categoryId when listing has no category', () => {
		const vase = res.body.find(
			(l: any) => l.shortId === 'vase01',
		);
		expect(vase.categoryId).toBe('');
	});
});

describe('GET /api/listings/:id', () => {
	it('returns 404 for an unknown shortId', async () => {
		const res = await request(getApp()).get(
			'/api/listings/unknown',
		);
		expect(res.status).toBe(404);
		expect(res.body).toMatchObject({
			message: ERROR_MESSAGES.listing.notFound,
		});
	});

	it('returns full listing page data for a known shortId', async () => {
		const res = await request(getApp()).get(
			'/api/listings/shrt01',
		);
		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			id: 2,
			shortId: 'shrt01',
			title: "Men's Oxford Shirt",
			priceCents: 8900,
			categoryId: 'MENS_SHIRTS',
			shopId: 1,
			shopTitle: 'Artisan Workshop',
			leadTimeDaysMin: 0,
			leadTimeDaysMax: 0,
			variations: [],
		});
	});

	it('returns undefined shippingDetails and returnExchangePolicy when not configured', async () => {
		const res = await request(getApp()).get('/api/listings/drss01');
		expect(res.status).toBe(200);
		expect(res.body.shippingDetails).toBeUndefined();
		expect(res.body.returnExchangePolicy).toBeUndefined();
	});

	it('returns shippingDetails and returnExchangePolicy when configured', async () => {
		const res = await request(getApp()).get('/api/listings/desk01');
		expect(res.status).toBe(200);
		expect(res.body.shippingDetails).toMatchObject({
			shippingRate: 995,
			shipTimeDaysMin: 3,
			shipTimeDaysMax: 7,
		});
		expect(res.body.returnExchangePolicy).toMatchObject({
			returnsAccepted: true,
			exchangesAccepted: true,
			returnWindowDays: 30,
		});
	});
});

describe('GET /api/categories/:id/listings', () => {
	it('returns listings directly in a category', async () => {
		const res = await request(getApp()).get(
			'/api/categories/FURNITURE/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const shortIds = res.body.map((l: any) => l.shortId);
		expect(shortIds).toEqual(expect.arrayContaining(['drss01', 'desk01']));
	});

	it('returns listings from all descendant categories recursively', async () => {
		const res = await request(getApp()).get(
			'/api/categories/CLOTHING/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		const shortIds = res.body.map((l: any) => l.shortId);
		expect(shortIds).toEqual(
			expect.arrayContaining(['shrt01', 'blse01']),
		);
	});

	it('does not include listings from unrelated categories', async () => {
		const res = await request(getApp()).get(
			'/api/categories/JEWELRY/listings',
		);
		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].shortId).toBe('brch01');
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

import { OrderStatus } from '@heirloom/common/enums/OrderStatus';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { AppUser } from '@server/entities/generated/AppUser';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import request from 'supertest';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

const AUTH_HEADER = { Authorization: 'Bearer test' };
const ACCESS_KEY = 'viewkey1';
const WRONG_KEY = 'wrongkey';

/**
 * Sample data (IDs in the 700s to avoid conflicts with other test files):
 * - Unowned order: shortId "view01", accessKey "viewkey1"
 * - Test-user-owned order: shortId "view02", accessKey "viewkey2"
 * - Other-user-owned order: shortId "view03", accessKey "viewkey3"
 */
beforeAll(async () => {
	const em = getEm();

	// Ensure the test user exists so ownership checks work
	await request(getApp()).get('/api/me').set(AUTH_HEADER);

	const testUser = await em.findOneOrFail(AppUser, {
		email: TEST_USER_EMAIL,
	});

	const otherUser = em.create(AppUser, {
		email: 'other@example.com',
		username: 'other',
	});

	const baseAddress = {
		firstName: 'John',
		lastName: 'Doe',
		line1: '1 Main St',
		line2: '',
		city: 'Chicago',
		state: 'IL',
		zip: '60601',
	};

	const unownedOrder = em.create(AppOrder, {
		shortId: 'view01',
		email: 'guest@example.com',
		shippingAddress: baseAddress,
		subtotal: 1000,
		taxTotal: 100,
		shippingPrice: 200,
		accessKey: ACCESS_KEY,
		orderStatus: OrderStatus.PAYMENT_SUCCEEDED,
	});

	const ownedOrder = em.create(AppOrder, {
		shortId: 'view02',
		email: TEST_USER_EMAIL,
		shippingAddress: baseAddress,
		subtotal: 2000,
		taxTotal: 200,
		shippingPrice: 300,
		accessKey: 'viewkey2',
		orderStatus: OrderStatus.PAYMENT_SUCCEEDED,
		user: testUser,
	});

	const otherUserOrder = em.create(AppOrder, {
		shortId: 'view03',
		email: 'other@example.com',
		shippingAddress: baseAddress,
		subtotal: 3000,
		taxTotal: 300,
		shippingPrice: 400,
		accessKey: 'viewkey3',
		orderStatus: OrderStatus.PAYMENT_SUCCEEDED,
		user: otherUser,
	});

	await em.persist([
		otherUser,
		unownedOrder,
		ownedOrder,
		otherUserOrder,
	]).flush();
});

describe('GET /api/orders/:shortId', () => {
	it('returns 404 for unknown shortId', async () => {
		const res = await request(getApp()).get(
			'/api/orders/nonexistent?key=anything',
		);
		expect(res.status).toBe(404);
	});

	it('returns 403 with no auth and wrong key', async () => {
		const res = await request(getApp()).get(
			`/api/orders/view01?key=${WRONG_KEY}`,
		);
		expect(res.status).toBe(403);
	});

	it('returns 401 with no auth and no key', async () => {
		const res = await request(getApp()).get('/api/orders/view01');
		expect(res.status).toBe(401);
	});

	it('returns order with correct access key (unauthenticated)', async () => {
		const res = await request(getApp()).get(
			`/api/orders/view01?key=${ACCESS_KEY}`,
		);
		expect(res.status).toBe(200);
		expect(res.body.shortId).toBe('view01');
		expect(res.body.subtotalCents).toBe(1000);
		expect(res.body.shippingCents).toBe(200);
		expect(res.body.taxCents).toBe(100);
		expect(Array.isArray(res.body.items)).toBe(true);
	});

	it('returns order when authenticated as owner (no key required)', async () => {
		const res = await request(getApp())
			.get('/api/orders/view02')
			.set(AUTH_HEADER);
		expect(res.status).toBe(200);
		expect(res.body.shortId).toBe('view02');
	});

	it('returns 403 when authenticated as non-owner with wrong key', async () => {
		const res = await request(getApp())
			.get(`/api/orders/view03?key=${WRONG_KEY}`)
			.set(AUTH_HEADER);
		expect(res.status).toBe(403);
	});

	it('returns order when authenticated as non-owner with correct key', async () => {
		const res = await request(getApp())
			.get('/api/orders/view03?key=viewkey3')
			.set(AUTH_HEADER);
		expect(res.status).toBe(200);
		expect(res.body.shortId).toBe('view03');
	});
});

describe('GET /api/me/orders', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me/orders');
		expect(res.status).toBe(401);
	});

	it("returns only the authenticated user's orders", async () => {
		const res = await request(getApp())
			.get('/api/me/orders')
			.set(AUTH_HEADER);
		expect(res.status).toBe(200);
		const shortIds = res.body.map(
			(o: { shortId: string }) => o.shortId,
		);
		expect(shortIds).toContain('view02');
		expect(shortIds).not.toContain('view01'); // unowned
		expect(shortIds).not.toContain('view03'); // other user
	});

	it('returns correct order shape', async () => {
		const res = await request(getApp())
			.get('/api/me/orders')
			.set(AUTH_HEADER);
		expect(res.status).toBe(200);
		const order = res.body.find(
			(o: { shortId: string }) => o.shortId === 'view02',
		);
		expect(order).toMatchObject({
			shortId: 'view02',
			subtotalCents: 2000,
			shippingCents: 300,
			taxCents: 200,
			orderStatus: OrderStatus.PAYMENT_SUCCEEDED,
		});
		expect(Array.isArray(order.items)).toBe(true);
	});
});

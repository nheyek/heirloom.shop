import { OrderStatus } from '@heirloom/common/enums/OrderStatus';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import { AppOrderItem } from '@server/entities/generated/AppOrderItem';
import { AppUser } from '@server/entities/generated/AppUser';
import { TEST_USER_EMAIL } from '@server/middleware/auth0.middleware';
import { findOrCreateUser, findUserByEmail } from '@server/services/user.service';
import request from 'supertest';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

describe('GET /api/me', () => {
	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me');
		expect(res.status).toBe(401);
	});

	it('returns user info for the test user', async () => {
		const res = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(res.body.email).toBe(TEST_USER_EMAIL);
		expect(typeof res.body.id).toBe('number');
	});

	it('creates a user record in the database on first call', async () => {
		const res = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		const user = await findUserByEmail(TEST_USER_EMAIL);
		expect(user).not.toBeNull();
		expect(user!.email).toBe(TEST_USER_EMAIL);
		expect(user!.id).toBe(res.body.id);
	});

	it('does not create a duplicate record on subsequent calls', async () => {
		const first = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		const second = await request(getApp())
			.get('/api/me')
			.set('Authorization', 'Bearer test');
		const count = await getEm().count(AppUser, { email: TEST_USER_EMAIL });
		expect(count).toBe(1);
		expect(second.body.id).toBe(first.body.id);
	});
});

/**
 * Seed data (IDs in the 600s to avoid conflicts with other test files):
 * - AppOrder 601: shortId="me_ord01", status PENDING, linked to test user
 *     - AppOrderItem 601 with a snapshot
 */
describe('GET /api/me/orders', () => {
	beforeAll(async () => {
		const em = getEm();
		const testUser = await findOrCreateUser(TEST_USER_EMAIL);

		const order = em.create(AppOrder, {
			id: 601,
			shortId: 'me_ord01',
			email: TEST_USER_EMAIL,
			user: testUser,
			shippingAddress: {
				firstName: 'Nick',
				lastName: 'Test',
				line1: '1 Test St',
				line2: '',
				city: 'Chicago',
				state: 'IL',
				zip: '60601',
			},
			subtotal: 2500,
			taxTotal: 156,
			shippingPrice: 0,
			accessKey: 'me_test_key',
			orderStatus: OrderStatus.PENDING,
			paymentIntentId: 'pi_metest01',
		});

		await em.persist(order).flush();

		const item = em.create(AppOrderItem, {
			id: 601,
			order,
			snapshot: {
				title: 'Handmade Mug',
				shopName: 'Me Test Shop',
				imageUuid: 'img-me-01',
				unitPriceCents: 2500,
				quantity: 1,
				variations: [],
			},
		});

		await em.persist(item).flush();
	});

	it('returns 401 without auth', async () => {
		const res = await request(getApp()).get('/api/me/orders');
		expect(res.status).toBe(401);
	});

	it('returns 200 with the seeded order', async () => {
		const res = await request(getApp())
			.get('/api/me/orders')
			.set('Authorization', 'Bearer test');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		const order = res.body.find((o: any) => o.shortId === 'me_ord01');
		expect(order).toBeDefined();
	});

	it('returns orders with the expected shape', async () => {
		const res = await request(getApp())
			.get('/api/me/orders')
			.set('Authorization', 'Bearer test');
		const order = res.body.find((o: any) => o.shortId === 'me_ord01');
		expect(order).toMatchObject({
			shortId: 'me_ord01',
			orderStatus: OrderStatus.PENDING,
			subtotalCents: 2500,
			shippingCents: 0,
			taxCents: 156,
			shippingAddress: expect.objectContaining({
				city: 'Chicago',
				state: 'IL',
			}),
		});
		expect(Array.isArray(order.items)).toBe(true);
		expect(order.items[0]).toMatchObject({
			title: 'Handmade Mug',
			shopName: 'Me Test Shop',
			unitPriceCents: 2500,
			quantity: 1,
		});
		expect(typeof order.createdAt).toBe('string');
	});
});

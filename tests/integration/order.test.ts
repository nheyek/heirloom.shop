import { OrderStatus } from '@common/enums/OrderStatus';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import request from 'supertest';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data:
 * - Order 1: shortId "ord123", status PENDING
 * - Order 2: shortId "ord456", status PAYMENT_SUCCEEDED
 */
beforeAll(async () => {
	const em = getEm();

	const order1 = em.create(AppOrder, {
		shortId: 'ord123',
		email: 'customer@example.com',
		items: [],
		shippingAddress: {
			firstName: 'John',
			lastName: 'Doe',
			line1: '123 Main St',
			line2: '',
			city: 'Chicago',
			state: 'IL',
			zip: '60601',
		},
		subtotal: 2500,
		taxTotal: 250,
		shippingPrice: 500,
		orderStatus: OrderStatus.PENDING,
	});

	const order2 = em.create(AppOrder, {
		shortId: 'ord456',
		email: 'another@example.com',
		items: [],
		shippingAddress: {
			firstName: 'Jane',
			lastName: 'Smith',
			line1: '456 Oak Ave',
			line2: '',
			city: 'New York',
			state: 'NY',
			zip: '10001',
		},
		subtotal: 5000,
		taxTotal: 0,
		shippingPrice: 800,
		orderStatus: OrderStatus.PAYMENT_SUCCEEDED,
	});

	await em.persistAndFlush([order1, order2]);
});

describe('GET /api/orders/:shortId/status', () => {
	it('returns order status for valid shortId', async () => {
		const res = await request(getApp()).get('/api/orders/ord123/status');

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			orderStatus: OrderStatus.PENDING,
		});
	});

	it('returns PAYMENT_SUCCEEDED status for completed order', async () => {
		const res = await request(getApp()).get('/api/orders/ord456/status');

		expect(res.status).toBe(200);
		expect(res.body).toEqual({
			orderStatus: OrderStatus.PAYMENT_SUCCEEDED,
		});
	});

	it('returns 404 for unknown shortId', async () => {
		const res = await request(getApp()).get('/api/orders/unknown/status');

		expect(res.status).toBe(404);
	});
});

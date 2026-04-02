import { OrderStatus } from '@common/enums/OrderStatus';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import request from 'supertest';
import { useApp } from './helpers/setupApp';

const getApp = useApp();

/**
 * Sample data:
 * - Order with ID 1, shortId "ord123", status PENDING
 * - Order with ID 2, shortId "ord456", status PENDING
 */
beforeAll(async () => {
	const em = getEm();

	const order1 = em.create(AppOrder, {
		id: 1,
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
		paymentIntentId: 'pi_test123',
	});

	const order2 = em.create(AppOrder, {
		id: 2,
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
		orderStatus: OrderStatus.PENDING,
		paymentIntentId: 'pi_test456',
	});

	await em.persistAndFlush([order1, order2]);
});

describe('POST /api/webhooks/stripe', () => {
	it('updates order status on payment_intent.succeeded event', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test123',
					metadata: {
						orderId: '1',
					},
				},
			},
		};

		const res = await request(getApp())
			.post('/api/webhooks/stripe')
			.send(webhookPayload);

		expect(res.status).toBe(200);
		expect(res.body).toEqual({ received: true });

		// Verify order status was updated
		const em = getEm();
		const order = await em.findOne(AppOrder, { id: 1 });
		expect(order!.orderStatus).toBe(OrderStatus.PAYMENT_SUCCEEDED);
	});

	it('handles multiple payment_intent.succeeded events', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test456',
					metadata: {
						orderId: '2',
					},
				},
			},
		};

		const res = await request(getApp())
			.post('/api/webhooks/stripe')
			.send(webhookPayload);

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne(AppOrder, { id: 2 });
		expect(order!.orderStatus).toBe(OrderStatus.PAYMENT_SUCCEEDED);
	});

	it('acknowledges non-payment_intent.succeeded events without processing', async () => {
		const webhookPayload = {
			type: 'charge.succeeded',
			data: {
				object: {
					id: 'ch_test123',
				},
			},
		};

		const res = await request(getApp())
			.post('/api/webhooks/stripe')
			.send(webhookPayload);

		expect(res.status).toBe(200);
		expect(res.body).toEqual({ received: true });
	});

	it('handles payment_intent.succeeded without orderId metadata', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test789',
					metadata: {},
				},
			},
		};

		const res = await request(getApp())
			.post('/api/webhooks/stripe')
			.send(webhookPayload);

		// Should still return success even if no orderId
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ received: true });
	});
});

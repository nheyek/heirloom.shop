import { OrderStatus } from '@heirloom/common/constants';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import request from 'supertest';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

/**
 * Sample data (explicit IDs in the 1000s to avoid conflicts with other test files):
 * - Order with ID 1001, shortId "whk001", status PENDING
 * - Order with ID 1002, shortId "whk002", status PENDING
 */
beforeAll(async () => {
	const em = getEm();

	const order1 = em.create(AppOrder, {
		id: 1001,
		shortId: 'whk001',
		email: 'customer@example.com',

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
		accessKey: 'testkey1',
		orderStatus: OrderStatus.PENDING,
		paymentIntentId: 'pi_test123',
	});

	const order2 = em.create(AppOrder, {
		id: 1002,
		shortId: 'whk002',
		email: 'another@example.com',

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
		accessKey: 'testkey2',
		orderStatus: OrderStatus.PENDING,
		paymentIntentId: 'pi_test456',
	});

	await em.persist([order1, order2]).flush();
});

describe('POST /webhooks/stripe', () => {
	it('updates order status on payment_intent.succeeded event', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test123',
					metadata: {
						orderId: '1001',
					},
				},
			},
		};

		const res = await request(getApp())
			.post('/webhooks/stripe')
			.send(webhookPayload);

		expect(res.status).toBe(200);
		expect(res.body).toEqual({ received: true });

		// Verify order status was updated
		const em = getEm();
		const order = await em.findOne(AppOrder, { shortId: 'whk001' });
		expect(order!.orderStatus).toBe(OrderStatus.PAYMENT_SUCCEEDED);
	});

	it('handles multiple payment_intent.succeeded events', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test456',
					metadata: {
						orderId: '1002',
					},
				},
			},
		};

		const res = await request(getApp())
			.post('/webhooks/stripe')
			.send(webhookPayload);

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne(AppOrder, { shortId: 'whk002' });
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
			.post('/webhooks/stripe')
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
			.post('/webhooks/stripe')
			.send(webhookPayload);

		// Should still return success even if no orderId
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ received: true });
	});
});

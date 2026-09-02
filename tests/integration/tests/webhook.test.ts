import { OrderStatus } from '@heirloom/common/constants';
import { deriveOrderStatus } from '@heirloom/common/domain/order';
import { getEm } from '@server/db';
import { AppOrder } from '@server/entities/generated/AppOrder';
import request from 'supertest';
import { useApp } from '../helpers/setupApp';

const getApp = useApp();

/**
 * Sample data (ids are DB-generated, not hardcoded, to avoid collisions
 * with other test files sharing the same database):
 * - Order shortId "whk001", status PENDING
 * - Order shortId "whk002", status PENDING
 * - Order shortId "whk003", status PENDING
 */
let order1Id: number;
let order2Id: number;
let order3Id: number;

beforeAll(async () => {
	const em = getEm();

	const order1 = em.create(AppOrder, {
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
		timeline: [],
		paymentIntentId: 'pi_test123',
	});

	const order2 = em.create(AppOrder, {
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
		timeline: [],
		paymentIntentId: 'pi_test456',
	});

	const order3 = em.create(AppOrder, {
		shortId: 'whk003',
		email: 'third@example.com',

		shippingAddress: {
			firstName: 'Sam',
			lastName: 'Lee',
			line1: '789 Pine Rd',
			line2: '',
			city: 'Austin',
			state: 'TX',
			zip: '73301',
		},
		subtotal: 3000,
		taxTotal: 200,
		shippingPrice: 600,
		accessKey: 'testkey3',
		timeline: [],
		paymentIntentId: 'pi_test999',
	});

	await em.persist([order1, order2, order3]).flush();

	order1Id = order1.id;
	order2Id = order2.id;
	order3Id = order3.id;
});

describe('POST /webhooks/stripe', () => {
	it('updates order status on payment_intent.succeeded event', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test123',
					metadata: {
						orderId: String(order1Id),
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
		expect(deriveOrderStatus(order!.timeline)).toBe(
			OrderStatus.CONFIRMED,
		);
		expect(order!.timeline).toHaveLength(1);
		expect(order!.timeline[0]).toMatchObject({
			status: OrderStatus.CONFIRMED,
			info: '',
		});
		expect(typeof order!.timeline[0].timestamp).toBe('string');
	});

	it('handles multiple payment_intent.succeeded events', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test456',
					metadata: {
						orderId: String(order2Id),
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
		expect(deriveOrderStatus(order!.timeline)).toBe(
			OrderStatus.CONFIRMED,
		);
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

	it('captures card and wallet details from an expanded charge', async () => {
		const webhookPayload = {
			type: 'payment_intent.succeeded',
			data: {
				object: {
					id: 'pi_test999',
					metadata: {
						orderId: String(order3Id),
					},
					latest_charge: {
						receipt_url: 'https://pay.stripe.com/receipts/test',
						payment_method_details: {
							card: {
								brand: 'visa',
								last4: '4242',
								wallet: { type: 'apple_pay' },
							},
						},
					},
				},
			},
		};

		const res = await request(getApp())
			.post('/webhooks/stripe')
			.send(webhookPayload);

		expect(res.status).toBe(200);

		const em = getEm();
		const order = await em.findOne(AppOrder, { shortId: 'whk003' });
		expect(order!.paymentDetails).toEqual({
			cardBrand: 'visa',
			cardLast4: '4242',
			walletType: 'apple_pay',
			receiptUrl: 'https://pay.stripe.com/receipts/test',
		});
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

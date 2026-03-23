import { OrderStatus } from '@common/enums/OrderStatus';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { updateOrderStatus } from '../services/order.service';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const stripe = new Stripe(webhookSecret);

export const handleStripeWebhook = async (
	request: Request,
	response: Response,
) => {
	const sig = request.headers['stripe-signature'];

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(
			request.body,
			sig!,
			webhookSecret,
		);
	} catch (err) {
		response
			.status(400)
			.send('Webhook signature verification failed');
		return;
	}

	if (event.type === 'payment_intent.succeeded') {
		const paymentIntent = event.data
			.object as Stripe.PaymentIntent;
		const orderId = Number(paymentIntent.metadata?.orderId);
		if (orderId) {
			await updateOrderStatus(
				orderId,
				OrderStatus.PAYMENT_SUCCEEDED,
			);
		}
	}

	response.json({ received: true });
};

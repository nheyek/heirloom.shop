import { OrderStatus } from '@common/enums/OrderStatus';
import { sendEmail } from '@server/services/emailer.service';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import {
	getOrderById,
	updateOrderStatus,
} from '../services/order.service';

export const handleStripeWebhook = async (
	request: Request,
	response: Response,
) => {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
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

		const order = await getOrderById(orderId);

		await sendEmail({
			to: order.shippingAddress.email,
			subject: 'Order Confirmation',
			html: `<p>Thank you for your order!</p>`,
		});
	}

	response.json({ received: true });
};

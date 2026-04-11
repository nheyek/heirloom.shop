import { OrderStatus } from '@common/enums/OrderStatus';
import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { orderConfirmation } from '@server/emailTemplates/orderConfirmation';
import { sendEmail } from '@server/services/emailer.service';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import {
	getOrderById,
	updateOrderStatus,
} from '@server/services/order.service';

export const handleStripeWebhook = async (
	request: Request,
	response: Response,
) => {
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
	const sig = request.headers['stripe-signature'];

	let event: Stripe.Event;
	if (process.env.NODE_ENV === 'testing') {
		const raw = Buffer.isBuffer(request.body)
			? request.body.toString()
			: JSON.stringify(request.body);
		event = JSON.parse(raw) as Stripe.Event;
	} else {
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

			const order = await getOrderById(orderId);

			const response = await sendEmail({
				to: order.email,
				subject: `Order Confirmed: ${order.shortId}`,
				text: orderConfirmation({
					name: order.shippingAddress?.firstName,
					orderId: order.shortId,
					accessKey: order.accessKey,
					items: order.items.getItems().map((item) => item.snapshot as OrderItemSnapshot),
				}),
			});
		}
	}

	response.json({ received: true });
};

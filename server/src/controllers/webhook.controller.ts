import { OrderItemDisplayData } from '@heirloom/common/contract';
import { OrderStatus } from '@heirloom/common/constants';
import { orderConfirmation } from '@server/emailTemplates/orderConfirmation';
import { sendEmail } from '@server/services/emailer.service';
import {
	getOrderById,
	updateOrderPaymentDetails,
	updateOrderStatus,
} from '@server/services/order.service';
import {
	extractPaymentDetails,
	retrievePaymentIntentCharge,
} from '@server/services/payment.service';
import { Request, Response } from 'express';
import Stripe from 'stripe';

export const handleStripeWebhook = async (
	request: Request,
	response: Response,
) => {
	const sig = request.headers['stripe-signature'];

	let event: Stripe.Event;
	if (process.env.NODE_ENV === 'testing') {
		const raw = Buffer.isBuffer(request.body)
			? request.body.toString()
			: JSON.stringify(request.body);
		event = JSON.parse(raw) as Stripe.Event;
	} else {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: Stripe.API_VERSION });
		const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
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
		const paymentIntent = event.data.object;
		const heirloomEnv = process.env.HEIRLOOM_ENV;
		// Stripe delivers this event to every registered webhook endpoint on
		// the account, including both a local `stripe listen` tunnel and the
		// dev server's own endpoint. Ignore events whose PaymentIntent wasn't
		// created by this environment.
		if (
			process.env.NODE_ENV !== 'testing' &&
			heirloomEnv &&
			paymentIntent.metadata?.sourceEnv !== heirloomEnv
		) {
			response.json({ received: true });
			return;
		}

		const orderId = Number(paymentIntent.metadata?.orderId);
		if (orderId) {
			await updateOrderStatus(orderId, OrderStatus.CONFIRMED);

			const charge =
				typeof paymentIntent.latest_charge === 'string'
					? await retrievePaymentIntentCharge(paymentIntent.id)
					: ((paymentIntent.latest_charge as Stripe.Charge | null) ??
						null);
			const paymentDetails = extractPaymentDetails(charge);
			if (paymentDetails) {
				await updateOrderPaymentDetails(orderId, paymentDetails);
			}

			const order = await getOrderById(orderId);

			sendEmail({
				to: order.email,
				subject: `Order Confirmed: ${order.shortId}`,
				text: orderConfirmation({
					name: order.shippingAddress?.firstName,
					orderId: order.shortId,
					accessKey: order.accessKey,
					shippingAddress: order.shippingAddress,
					items: order.appOrderItemCollection
						.getItems()
						.map(
							(item) =>
								item.snapshot as OrderItemDisplayData,
						),
					subtotalCents: order.subtotal,
					shippingCents: order.shippingPrice,
					taxCents: order.taxTotal,
				}),
			});
		}

	}

	response.json({ received: true });
};

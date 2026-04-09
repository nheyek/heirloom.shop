import { checkoutContract } from '@common/contract';
import { initServer } from '@ts-rest/express';
import {
	calculateCheckoutTotals,
	createOrderItemSnapshots,
} from '@server/domain/checkout.domain';
import { loadCheckoutData } from '@server/services/checkout.service';
import {
	createOrder,
	updateOrderPaymentIntent,
} from '@server/services/order.service';
import { createPaymentIntent } from '@server/services/payment.service';
import { getTaxTotal } from '@server/services/tax.service';

const s = initServer();

export const checkoutRouter = s.router(checkoutContract, {
	calculateTax: async ({ body }) => {
		const cartData = await loadCheckoutData(body.items);
		const { subtotalCents, shippingCents } =
			calculateCheckoutTotals(body.items, cartData);
		return {
			status: 200 as const,
			body: {
				TaxTotalCents: getTaxTotal(
					subtotalCents + shippingCents,
					body.shippingAddress,
				),
			},
		};
	},

	submitOrder: async ({ body }) => {
		if (!body.items || body.items.length === 0) {
			return {
				status: 400 as const,
				body: { error: 'Cart cannot be empty' },
			};
		}

		const cartData = await loadCheckoutData(body.items);
		const { subtotalCents, shippingCents } =
			calculateCheckoutTotals(body.items, cartData);
		const snapshots = createOrderItemSnapshots(body.items, cartData);

		const preTaxTotal = subtotalCents + shippingCents;
		const taxTotal = getTaxTotal(preTaxTotal, body.shippingAddress);

		const order = await createOrder(
			snapshots,
			body.shippingAddress,
			subtotalCents,
			shippingCents,
			taxTotal,
			body.email,
		);

		const paymentIntent = await createPaymentIntent(
			preTaxTotal + taxTotal,
			{ orderId: order.id },
		);
		await updateOrderPaymentIntent(order.id, paymentIntent.id);

		if (!paymentIntent.client_secret) {
			return {
				status: 500 as const,
				body: { error: 'Failed to create payment intent' },
			};
		}

		return {
			status: 200 as const,
			body: {
				orderShortId: order.shortId,
				clientSecret: paymentIntent.client_secret,
			},
		};
	},
});

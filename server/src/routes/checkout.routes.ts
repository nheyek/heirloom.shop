import { checkoutContract } from '@heirloom/common/contract';
import { initServer } from '@ts-rest/express';
import {
	calculateCheckoutTotals,
	createOrderItemSnapshots,
} from '@server/domain/checkout.domain';
import { optionalAuthAndSetUser } from '@server/middleware/auth0.middleware';
import { loadCheckoutData } from '@server/services/checkout.service';
import {
	createOrder,
	updateOrderPaymentIntent,
} from '@server/services/order.service';
import { createPaymentIntent } from '@server/services/payment.service';
import { getTaxTotal } from '@server/services/tax.service';
import { findOrCreateUser } from '@server/services/user.service';

const s = initServer();

export const checkoutRouter = s.router(checkoutContract, {
	calculateTax: async ({ body }) => {
		const cartData = await loadCheckoutData(body.items);
		const availableShortIds = new Set(cartData.listings.map((l) => l.shortId));
		if (body.items.some((item) => !availableShortIds.has(item.listingShortId))) {
			return {
				status: 400 as const,
				body: { error: 'One or more items in your cart are no longer available.' },
			};
		}
		let subtotalCents: number;
		let shippingCents: number;
		try {
			({ subtotalCents, shippingCents } = calculateCheckoutTotals(body.items, cartData));
		} catch (e) {
			return { status: 400 as const, body: { error: (e as Error).message } };
		}
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

	submitOrder: {
		middleware: [optionalAuthAndSetUser],
		handler: async ({ body, req }) => {
			if (!body.items || body.items.length === 0) {
				return {
					status: 400 as const,
					body: { error: 'Cart cannot be empty' },
				};
			}

			const cartData = await loadCheckoutData(body.items);
			const availableShortIds = new Set(cartData.listings.map((l) => l.shortId));
			if (body.items.some((item) => !availableShortIds.has(item.listingShortId))) {
				return {
					status: 400 as const,
					body: { error: 'One or more items in your cart are no longer available.' },
				};
			}

			let subtotalCents: number;
			let shippingCents: number;
			let snapshots: ReturnType<typeof createOrderItemSnapshots>;
			try {
				({ subtotalCents, shippingCents } = calculateCheckoutTotals(body.items, cartData));
				snapshots = createOrderItemSnapshots(body.items, cartData);
			} catch (e) {
				return { status: 400 as const, body: { error: (e as Error).message } };
			}

			const preTaxTotal = subtotalCents + shippingCents;
			const taxTotal = getTaxTotal(preTaxTotal, body.shippingAddress);

			const user = req.userClaims?.email
				? await findOrCreateUser(req.userClaims.email)
				: undefined;

			const order = await createOrder(
				snapshots,
				body.shippingAddress,
				subtotalCents,
				shippingCents,
				taxTotal,
				body.email,
				user,
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
					accessKey: order.accessKey,
					clientSecret: paymentIntent.client_secret,
				},
			};
		},
	},
});

import { ordersContract } from '@common/contract';
import { OrderItemSnapshot } from '@common/types/OrderItemSnapshot';
import { NotFoundError } from '@mikro-orm/core';
import { ERROR_MESSAGES } from '@server/constants';
import {
	getOrderByShortId,
	getOrderStatus,
} from '@server/services/order.service';
import { initServer } from '@ts-rest/express';

const s = initServer();

export const orderRouter = s.router(ordersContract, {
	getStatus: async ({ params: { shortId } }) => {
		try {
			const orderStatus = await getOrderStatus(shortId);
			return { status: 200 as const, body: { orderStatus } };
		} catch (err) {
			if (err instanceof NotFoundError) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.order.notFound },
				};
			}
			throw err;
		}
	},
	getByShortId: async ({ params: { shortId }, query: { key } }) => {
		try {
			const order = await getOrderByShortId(shortId);
			if (order.accessKey !== key) {
				return {
					status: 403 as const,
					body: { error: 'Forbidden' },
				};
			}
			return {
				status: 200 as const,
				body: {
					shortId: order.shortId,
					orderStatus: order.orderStatus,
					items: order.appOrderItemCollection
						.getItems()
						.map(
							(item) =>
								item.snapshot as OrderItemSnapshot,
						),
					subtotalCents: order.subtotal,
					shippingCents: order.shippingPrice,
					taxCents: order.taxTotal,
				},
			};
		} catch (err) {
			if (err instanceof NotFoundError) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.order.notFound },
				};
			}
			throw err;
		}
	},
});

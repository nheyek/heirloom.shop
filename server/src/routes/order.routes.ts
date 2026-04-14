import { ordersContract, OrderItemDisplayData } from '@common/contract';
import { NotFoundError } from '@mikro-orm/core';
import { ERROR_MESSAGES } from '@server/constants';
import { optionalAuthAndSetUser } from '@server/middleware/auth0.middleware';
import {
	getOrderByShortId,
	getOrderStatus,
} from '@server/services/order.service';
import { findUserByEmail } from '@server/services/user.service';
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
	getByShortId: {
		middleware: [optionalAuthAndSetUser],
		handler: async ({ params: { shortId }, query: { key }, req }) => {
			try {
				const order = await getOrderByShortId(shortId);

				const currentUser = req.userClaims?.email
					? await findUserByEmail(req.userClaims.email)
					: null;
				const isOwner = currentUser && order.user?.id === currentUser.id;

				if (!isOwner && order.accessKey !== key) {
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
	},
});

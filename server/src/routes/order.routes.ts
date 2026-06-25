import { ordersContract, OrderItemDisplayData } from '@heirloom/common/contract';
import { OrderStatus } from '@heirloom/common/constants';
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
					// No credentials at all → unauthenticated (401)
					// Credentials provided but insufficient → forbidden (403)
					const hasCredentials = currentUser || (key !== undefined && key !== '');
					if (!hasCredentials) {
						return { status: 401 as const, body: { error: 'Unauthorized' } };
					}
					return { status: 403 as const, body: { error: 'Forbidden' } };
				}
				return {
					status: 200 as const,
					body: {
						shortId: order.shortId,
						createdAt: order.createdAt?.toISOString() ?? null,
						orderStatus: order.orderStatus as OrderStatus,
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

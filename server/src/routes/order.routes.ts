import { ordersContract } from '@common/contract';
import { NotFoundError } from '@mikro-orm/core';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '../constants';
import { getOrderStatus } from '../services/order.service';

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
});

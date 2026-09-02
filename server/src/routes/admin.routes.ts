import { adminContract } from '@heirloom/common/contract';
import { isValidEmail } from '@heirloom/common/utils/validationUtils';
import { NotFoundError } from '@mikro-orm/core';
import { ERROR_MESSAGES } from '@server/constants';
import { mapOrderToApiResponseData } from '@server/mappers/order.mapper';
import { adminAuth } from '@server/middleware/auth0.middleware';
import {
	getOrderByShortId,
	getOrders,
	updateOrderShipments,
} from '@server/services/order.service';
import {
	createShop,
	DuplicateShopTitleError,
	findShopsForAdmin,
	getShopFulfillment,
	ShopValidationError,
	updateShopFulfillment,
} from '@server/services/shop.service';
import {
	generateShopImageUploadUrl,
	InvalidContentTypeError,
} from '@server/services/storage.service';
import { initServer } from '@ts-rest/express';

const s = initServer();

export const adminRouter = s.router(adminContract, {
	getShops: {
		middleware: [adminAuth],
		handler: async () => ({
			status: 200 as const,
			body: await findShopsForAdmin(),
		}),
	},
	createShop: {
		middleware: [adminAuth],
		handler: async ({ body }) => {
			if (body.directFulfillment) {
				if (!body.ownerEmail?.trim()) {
					return {
						status: 400 as const,
						body: { error: 'Owner email is required.' },
					};
				}
				if (!isValidEmail(body.ownerEmail)) {
					return {
						status: 400 as const,
						body: { error: 'Email format is invalid.' },
					};
				}
			}
			try {
				const shop = await createShop(body);
				return { status: 201 as const, body: shop };
			} catch (e) {
				if (e instanceof ShopValidationError) {
					return {
						status: 400 as const,
						body: { error: e.message },
					};
				}
				if (e instanceof DuplicateShopTitleError) {
					return {
						status: 409 as const,
						body: {
							error: 'A shop with this name already exists.',
						},
					};
				}
				throw e;
			}
		},
	},
	getShopImageUploadUrl: {
		middleware: [adminAuth],
		handler: async ({ body }) => {
			try {
				return {
					status: 200 as const,
					body: await generateShopImageUploadUrl(
						body.contentType,
					),
				};
			} catch (e) {
				if (e instanceof InvalidContentTypeError) {
					return {
						status: 400 as const,
						body: {
							error: ERROR_MESSAGES.image
								.invalidContentType,
						},
					};
				}
				throw e;
			}
		},
	},
	getShopFulfillment: {
		middleware: [adminAuth],
		handler: async ({ params: { shopId } }) => {
			const fulfillment = await getShopFulfillment(shopId);
			if (!fulfillment) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.shop.notFound },
				};
			}
			return { status: 200 as const, body: fulfillment };
		},
	},
	updateShopFulfillment: {
		middleware: [adminAuth],
		handler: async ({ params: { shopId }, body }) => {
			if (body.directFulfillment) {
				if (!body.ownerEmail?.trim()) {
					return {
						status: 400 as const,
						body: { error: 'Owner email is required.' },
					};
				}
				if (!isValidEmail(body.ownerEmail)) {
					return {
						status: 400 as const,
						body: { error: 'Email format is invalid.' },
					};
				}
			}
			const fulfillment = await updateShopFulfillment(
				shopId,
				body,
			);
			if (!fulfillment) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.shop.notFound },
				};
			}
			return { status: 200 as const, body: fulfillment };
		},
	},
	getOrders: {
		middleware: [adminAuth],
		handler: async () => {
			const orders = await getOrders(null);
			return {
				status: 200 as const,
				body: orders.map(mapOrderToApiResponseData),
			};
		},
	},
	getOrder: {
		middleware: [adminAuth],
		handler: async ({ params: { shortId } }) => {
			try {
				const order = await getOrderByShortId(shortId);
				return {
					status: 200 as const,
					body: mapOrderToApiResponseData(order),
				};
			} catch (e) {
				if (e instanceof NotFoundError) {
					return {
						status: 404 as const,
						body: { error: ERROR_MESSAGES.order.notFound },
					};
				}
				throw e;
			}
		},
	},
	updateOrderShipments: {
		middleware: [adminAuth],
		handler: async ({ params: { shortId }, body }) => {
			try {
				const order = await getOrderByShortId(shortId);
				await updateOrderShipments(order.id, body.shipments);
				return {
					status: 200 as const,
					body: { shipments: body.shipments },
				};
			} catch (e) {
				if (e instanceof NotFoundError) {
					return {
						status: 404 as const,
						body: { error: ERROR_MESSAGES.order.notFound },
					};
				}
				throw e;
			}
		},
	},
});

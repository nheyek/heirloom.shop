import { meContract, OrderItemDisplayData } from '@heirloom/common/contract';
import { OrderStatus } from '@heirloom/common/enums/OrderStatus';
import { ERROR_MESSAGES } from '@server/constants';
import { mapListingToApiResponseData } from '@server/mappers/listing.mapper';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import * as favoriteListingService from '@server/services/favoriteListing.service';
import { getOrdersForUser } from '@server/services/order.service';
import * as userService from '@server/services/user.service';
import { initServer } from '@ts-rest/express';

const s = initServer();

export const meRouter = s.router(meContract, {
	getMe: {
		middleware: [authAndSetUser],
		handler: async ({ req }) => {
			try {
				const currentUser =
					await userService.findOrCreateUser(
						req.userClaims!.email,
					);
				const shopId = await userService.getShopIdForUser(
					currentUser.id,
				);
				return {
					status: 200 as const,
					body: {
						id: currentUser.id,
						email: currentUser.email,
						shopId,
					},
				};
			} catch {
				return {
					status: 500 as const,
					body: {
						error: 'Failed to auto-create user record',
					},
				};
			}
		},
	},
	getFavorites: {
		middleware: [authAndSetUser],
		handler: async ({ req }) => {
			const user = await userService.findUserByEmail(
				req.userClaims!.email,
			);
			if (!user) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.user.notFound },
				};
			}
			const listings =
				await favoriteListingService.getFavoritedListingsForUser(
					user.id,
				);
			return {
				status: 200 as const,
				body: listings.map(mapListingToApiResponseData),
			};
		},
	},
	getOrders: {
		middleware: [authAndSetUser],
		handler: async ({ req }) => {
			const user = await userService.findUserByEmail(
				req.userClaims!.email,
			);
			if (!user) {
				return {
					status: 401 as const,
					body: { error: ERROR_MESSAGES.user.notFound },
				};
			}
			const orders = await getOrdersForUser(user.id);
			return {
				status: 200 as const,
				body: orders.map((order) => ({
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
				})),
			};
		},
	},
});

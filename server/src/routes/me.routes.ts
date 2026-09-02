import { meContract } from '@heirloom/common/contract';
import { ERROR_MESSAGES } from '@server/constants';
import { mapListingToApiResponseData } from '@server/mappers/listing.mapper';
import { mapOrderToApiResponseData } from '@server/mappers/order.mapper';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import * as favoriteListingService from '@server/services/favoriteListing.service';
import * as favoriteShopService from '@server/services/favoriteShop.service';
import { mapShopToApiResponseData } from '@server/mappers/shop.mapper';
import { getOrders } from '@server/services/order.service';
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
				const shopShortId =
					await userService.getShopShortIdForUser(
						currentUser.id,
					);
				return {
					status: 200 as const,
					body: {
						id: currentUser.id,
						email: currentUser.email,
						isAdmin: currentUser.isAdmin,
						shopShortId,
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
	getFavoriteShops: {
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
			const shops =
				await favoriteShopService.getFavoritedShopsForUser(
					user.id,
				);
			return {
				status: 200 as const,
				body: shops.map(mapShopToApiResponseData),
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
			const orders = await getOrders(user.id);
			return {
				status: 200 as const,
				body: orders.map(mapOrderToApiResponseData),
			};
		},
	},
});

import { meContract } from '@common/contract';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import { mapListingToApiResponseData } from '@server/mappers/listing.mapper';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import * as favoriteListingService from '@server/services/favoriteListing.service';
import * as userService from '@server/services/user.service';

const s = initServer();

export const meRouter = s.router(meContract, {
	getMe: {
		middleware: [authAndSetUser],
		handler: async ({ req }) => {
			try {
				const currentUser = await userService.findOrCreateUser(
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
					body: { error: 'Failed to auto-create user record' },
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
});

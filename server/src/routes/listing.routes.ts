import { listingsContract } from '@heirloom/common/contract';
import { calculateDeliveryEstimate } from '@heirloom/common/utils';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import * as favoriteListingService from '@server/services/favoriteListing.service';
import * as listingService from '@server/services/listing.service';
import * as userService from '@server/services/user.service';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import {
	mapListingToApiResponseData,
	mapListingToCompleteApiResponseData,
} from '@server/mappers/listing.mapper';

const s = initServer();

export const listingRouter = s.router(listingsContract, {
	getAll: async () => {
		const listings = await listingService.findListingsComplete();
		return {
			status: 200 as const,
			body: listings.map(mapListingToApiResponseData),
		};
	},
	getCartData: async ({ body }) => {
		const shortIds = [...new Set(body.items.map((i) => i.listingShortId))];
		const results = await Promise.all(
			shortIds.map(async (shortId) => {
				const listing = await listingService.findFullListingDataByShortId(shortId);
				if (!listing) return null;
				const variations = await listingService.findListingVariations(listing.id);
				const pageData = mapListingToCompleteApiResponseData(listing, variations);
				return {
					...mapListingToApiResponseData(listing),
					variations: pageData.variations,
					shippingPrice: Number(pageData.shippingDetails?.shippingRate || 0),
					deliveryEstimate: calculateDeliveryEstimate(
						pageData.leadTimeDaysMin,
						pageData.leadTimeDaysMax,
						pageData.shippingDetails,
					),
				};
			}),
		);
		return {
			status: 200 as const,
			body: results.filter((r) => r !== null),
		};
	},
	getById: async ({ params: { id } }) => {
		const listing =
			await listingService.findFullListingDataByShortId(id);
		if (!listing) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.listing.notFound },
			};
		}
		const variations = await listingService.findListingVariations(
			listing.id,
		);
		return {
			status: 200 as const,
			body: mapListingToCompleteApiResponseData(listing, variations),
		};
	},
	favorite: {
		middleware: [authAndSetUser],
		handler: async ({ params: { id }, req }) => {
			const listing =
				await listingService.findFullListingDataByShortId(id);
			if (!listing) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.listing.favoriteNotFound },
				};
			}
			const user = await userService.findUserByEmail(
				req.userClaims!.email,
			);
			if (!user) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.user.notFound },
				};
			}
			await favoriteListingService.favoriteListing(user.id, listing.id);
			return { status: 200 as const, body: { favorited: true } };
		},
	},
	unfavorite: {
		middleware: [authAndSetUser],
		handler: async ({ params: { id }, req }) => {
			const listing =
				await listingService.findFullListingDataByShortId(id);
			if (!listing) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.listing.favoriteNotFound },
				};
			}
			const user = await userService.findUserByEmail(
				req.userClaims!.email,
			);
			if (!user) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.user.notFound },
				};
			}
			await favoriteListingService.unfavoriteListing(
				user.id,
				listing.id,
			);
			return { status: 200 as const, body: { favorited: false } };
		},
	},
});

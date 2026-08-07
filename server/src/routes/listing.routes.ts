import { listingsContract } from '@heirloom/common/contract';
import { calculateDeliveryEstimate } from '@heirloom/common/utils/dateUtils';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import * as favoriteListingService from '@server/services/favoriteListing.service';
import * as listingService from '@server/services/listing.service';
import * as userService from '@server/services/user.service';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import {
	mapListingToApiResponseData,
	mapListingToCartItemData,
	mapListingToCompleteApiResponseData,
} from '@server/mappers/listing.mapper';

const s = initServer();

export const listingRouter = s.router(listingsContract, {
	getAll: async () => {
		const listings = await listingService.findFeaturedListings();
		return {
			status: 200 as const,
			body: listings.map(mapListingToApiResponseData),
		};
	},
	getCartData: async ({ body }) => {
		const itemsByShortId = new Map<string, Array<Record<string, string>>>();
		for (const item of body.items) {
			const existing = itemsByShortId.get(item.listingShortId) ?? [];
			existing.push(item.selectedOptions);
			itemsByShortId.set(item.listingShortId, existing);
		}
		const results = await Promise.all(
			[...itemsByShortId.entries()].map(async ([shortId, selectedOptionSets]) => {
				const listing = await listingService.findAvailableFullListingDataByShortId(shortId);
				if (!listing) return null;
				const shippingPrice = Number(listing.shippingProfile?.flatShippingRateCents || 0);
				const deliveryEstimate = listing.processingProfile && listing.shippingProfile
					? calculateDeliveryEstimate(
							listing.processingProfile,
							listing.shippingProfile,
						)
					: 'Delivery estimate unavailable';
				return mapListingToCartItemData(listing, selectedOptionSets, shippingPrice, deliveryEstimate);
			}),
		);
		return {
			status: 200 as const,
			body: results.filter((r) => r !== null),
		};
	},
	getById: async ({ params: { id } }) => {
		const listing = await listingService.findFullListingDataByShortId(id);
		if (!listing) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.listing.notFound },
			};
		}
		return {
			status: 200 as const,
			body: mapListingToCompleteApiResponseData(listing),
		};
	},
	favorite: {
		middleware: [authAndSetUser],
		handler: async ({ params: { id }, req }) => {
			const listing = await listingService.findFullListingDataByShortId(id);
			if (!listing) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.listing.favoriteNotFound },
				};
			}
			const user = await userService.findUserByEmail(req.userClaims!.email);
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
			const listing = await listingService.findFullListingDataByShortId(id);
			if (!listing) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.listing.favoriteNotFound },
				};
			}
			const user = await userService.findUserByEmail(req.userClaims!.email);
			if (!user) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.user.notFound },
				};
			}
			await favoriteListingService.unfavoriteListing(user.id, listing.id);
			return { status: 200 as const, body: { favorited: false } };
		},
	},
});

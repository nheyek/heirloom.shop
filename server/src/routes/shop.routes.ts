import { shopsContract } from '@common/contract';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import { mapListingToApiResponseData } from '@server/mappers/listing.mapper';
import { mapShopToApiResponseData } from '@server/mappers/shop.mapper';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import * as listingService from '@server/services/listing.service';
import * as shopService from '@server/services/shop.service';

const s = initServer();

export const shopRouter = s.router(shopsContract, {
	getAll: async () => {
		const shops = await shopService.findShops();
		return { status: 200 as const, body: shops.map(mapShopToApiResponseData) };
	},
	getById: async ({ params: { id } }) => {
		const shop = await shopService.findShopByShortId(id);
		if (!shop) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.shop.notFound },
			};
		}
		return { status: 200 as const, body: mapShopToApiResponseData(shop) };
	},
	getListings: async ({ params: { id } }) => {
		const shop = await shopService.findShopByShortId(id);
		if (!shop) {
			return {
				status: 404 as const,
				body: { error: ERROR_MESSAGES.shop.notFound },
			};
		}
		const listings = await listingService.findListingsByShop(shop.id);
		return {
			status: 200 as const,
			body: listings.map(mapListingToApiResponseData),
		};
	},
	addListing: {
		middleware: [authAndSetUser],
		handler: async ({ params: { id }, body, req }) => {
			const shop = await shopService.findShopByShortId(id);
			if (!shop) {
				return {
					status: 404 as const,
					body: { error: ERROR_MESSAGES.shop.notFound },
				};
			}

			try {
				await shopService.authorizeShopAction(
					shop.id,
					req.userClaims!.email,
				);
			} catch {
				return {
					status: 403 as const,
					body: { error: ERROR_MESSAGES.shop.forbidden },
				};
			}

			const listingId = await listingService.createListing(
				{ ...body, categoryId: body.categoryId ?? '' },
				shop.id,
			);
			return { status: 201 as const, body: { id: listingId } };
		},
	},
});

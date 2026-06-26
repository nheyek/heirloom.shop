import { shopManagerContract } from '@heirloom/common/contract';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import { authorizeShopAction, findShopByShortId } from '@server/services/shop.service';
import { findListingForEdit, findShopProfiles } from '@server/services/shopManager.service';

const s = initServer();

export const shopManagerRouter = s.router(shopManagerContract, {
	getProfiles: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId }, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			const profiles = await findShopProfiles(shop.id);
			return { status: 200 as const, body: profiles };
		},
	},

	getListing: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId, listingShortId }, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			const listing = await findListingForEdit(shop.id, listingShortId);
			if (!listing) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.listing.notFound } };
			}
			return { status: 200 as const, body: listing };
		},
	},
});

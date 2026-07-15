import { shopManagerContract } from '@heirloom/common/contract';
import { initServer } from '@ts-rest/express';
import { ERROR_MESSAGES } from '@server/constants';
import { authAndSetUser } from '@server/middleware/auth0.middleware';
import { authorizeShopAction, findShopByShortId } from '@server/services/shop.service';
import { createPersonalizationProfile, createListing, createProcessingProfile, createReturnProfile, createShippingProfile, deleteListing, DuplicateProfileNameError, findAllListingsForShop, findListingForEdit, findShopProfiles, ListingValidationError, setListingAvailable, updateListing } from '@server/services/shopManager.service';
import { mapListingToApiResponseData } from '@server/mappers/listing.mapper';

const s = initServer();

export const shopManagerRouter = s.router(shopManagerContract, {
	getListings: {
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
			const listings = await findAllListingsForShop(shop.id);
			return { status: 200 as const, body: listings.map(mapListingToApiResponseData) };
		},
	},

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
			const profiles = await findShopProfiles(shop.id, shop.directFulfillment);
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

	createListing: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			try {
				const listing = await createListing(shop.id, shop.directFulfillment, body);
				return { status: 200 as const, body: listing };
			} catch (e) {
				if (e instanceof ListingValidationError) {
					return { status: 400 as const, body: { error: e.message } };
				}
				throw e;
			}
		},
	},

	updateListing: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId, listingShortId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			try {
				const listing = await updateListing(shop.id, shop.directFulfillment, listingShortId, body);
				if (!listing) {
					return { status: 404 as const, body: { error: ERROR_MESSAGES.listing.notFound } };
				}
				return { status: 200 as const, body: listing };
			} catch (e) {
				if (e instanceof ListingValidationError) {
					return { status: 400 as const, body: { error: e.message } };
				}
				throw e;
			}
		},
	},

	setListingAvailable: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId, listingShortId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			const available = await setListingAvailable(shop.id, listingShortId, body.available);
			if (available === null) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.listing.notFound } };
			}
			return { status: 200 as const, body: { available } };
		},
	},

	createProcessingProfile: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			try {
				const profile = await createProcessingProfile(shop.id, body);
				return { status: 200 as const, body: profile };
			} catch (e) {
				if (e instanceof ListingValidationError) {
					return { status: 400 as const, body: { error: e.message } };
				}
				if (e instanceof DuplicateProfileNameError) {
					return { status: 409 as const, body: { error: 'A profile with this name already exists.' } };
				}
				throw e;
			}
		},
	},

	createShippingProfile: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			try {
				const profile = await createShippingProfile(shop.id, body);
				return { status: 200 as const, body: profile };
			} catch (e) {
				if (e instanceof ListingValidationError) {
					return { status: 400 as const, body: { error: e.message } };
				}
				if (e instanceof DuplicateProfileNameError) {
					return { status: 409 as const, body: { error: 'A profile with this name already exists.' } };
				}
				throw e;
			}
		},
	},

	createReturnProfile: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			try {
				const profile = await createReturnProfile(shop.id, body);
				return { status: 200 as const, body: profile };
			} catch (e) {
				if (e instanceof ListingValidationError) {
					return { status: 400 as const, body: { error: e.message } };
				}
				if (e instanceof DuplicateProfileNameError) {
					return { status: 409 as const, body: { error: 'A profile with this name already exists.' } };
				}
				throw e;
			}
		},
	},

	createPersonalizationProfile: {
		middleware: [authAndSetUser],
		handler: async ({ params: { shopId }, body, req }) => {
			const shop = await findShopByShortId(shopId);
			if (!shop) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.shop.notFound } };
			}
			try {
				await authorizeShopAction(shop.id, req.userClaims!.email);
			} catch {
				return { status: 403 as const, body: { error: ERROR_MESSAGES.shop.forbidden } };
			}
			try {
				const profile = await createPersonalizationProfile(shop.id, body);
				return { status: 200 as const, body: profile };
			} catch (e) {
				if (e instanceof ListingValidationError) {
					return { status: 400 as const, body: { error: e.message } };
				}
				if (e instanceof DuplicateProfileNameError) {
					return { status: 409 as const, body: { error: 'A profile with this name already exists.' } };
				}
				throw e;
			}
		},
	},

	deleteListing: {
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
			const deleted = await deleteListing(shop.id, listingShortId);
			if (!deleted) {
				return { status: 404 as const, body: { error: ERROR_MESSAGES.listing.notFound } };
			}
			return { status: 200 as const, body: { deleted } };
		},
	},
});

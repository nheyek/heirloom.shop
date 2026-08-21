import {
	getDeliveryEstimateDisplay,
	resolveEffectiveProfiles,
} from '@client/domain/listingPage';
import { CartItemData, ListingPageData } from '@heirloom/common/contract';

export const getListingDataForCart = (
	listing: ListingPageData,
): CartItemData => {
	const profiles = resolveEffectiveProfiles(listing);
	return {
		id: listing.id,
		shortId: listing.shortId,
		title: listing.title,
		subtitle: listing.subtitle,
		categoryId: listing.categoryId,
		priceCents: listing.priceCents,
		countryCode: listing.countryCode,
		shopId: listing.shopId,
		shopShortId: listing.shopShortId,
		shopTitle: listing.shopTitle,
		imageUuids: listing.imageUuids,
		available: listing.available,
		shippingPrice: Number(profiles?.shipping?.shippingRate || 0),
		deliveryEstimate: getDeliveryEstimateDisplay(profiles),
		// Not gated behind directFulfillment/HEIRLOOM_LISTING_PROFILES like
		// shipping/processing above — personalization is independent of
		// fulfillment, so it's read straight off the listing's own profiles.
		personalizationCostCents:
			listing.profiles?.personalization?.costCents ?? null,
		personalizationName:
			listing.profiles?.personalization?.name ?? null,
		variations: listing.variations,
		combinations: listing.combinations,
		trackInventory: listing.trackInventory,
	};
};

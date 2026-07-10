import { HEIRLOOM_LISTING_PROFILES } from '@client/constants/heirloomProfiles';
import { CartItemData, ListingPageData } from '@heirloom/common/contract';
import { calculateDeliveryEstimate } from '@heirloom/common/utils/dateUtils';

export const getListingDataForCart = (
	listing: ListingPageData,
): CartItemData => {
	const profiles =
		(listing.directFulfillment ? listing.profiles : null) ??
		HEIRLOOM_LISTING_PROFILES;
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
		shippingPrice: Number(profiles.shipping?.shippingRate || 0),
		deliveryEstimate: profiles.processing && profiles.shipping
			? calculateDeliveryEstimate(profiles.processing, profiles.shipping)
			: 'Delivery estimate unavailable',
		// Not gated behind directFulfillment/HEIRLOOM_LISTING_PROFILES like
		// shipping/processing above — personalization is independent of
		// fulfillment, so it's read straight off the listing's own profiles.
		personalizationCostCents:
			listing.profiles?.personalization?.costCents ?? null,
		variations: listing.variations,
		combinations: listing.combinations,
	};
};

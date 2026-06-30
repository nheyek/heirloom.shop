import { HEIRLOOM_LISTING_PROFILES } from '@client/constants/heirloomProfiles';
import { CartItemData, ListingPageData } from '@heirloom/common/contract';
import { calculateDeliveryEstimate } from '@heirloom/common/utils';

export const getListingDataForCart = (
	listing: ListingPageData,
): CartItemData => {
	const profiles = listing.profiles ?? HEIRLOOM_LISTING_PROFILES;
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
		deliveryEstimate: calculateDeliveryEstimate(
			profiles.processing?.minDays ?? 0,
			profiles.processing?.maxDays ?? 0,
			profiles.shipping,
		),
		variations: listing.variations,
		combinations: listing.combinations,
	};
};

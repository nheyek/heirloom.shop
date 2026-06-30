import { CartItemData, ListingPageData } from '@heirloom/common/contract';
import { calculateDeliveryEstimate } from '@heirloom/common/utils';

export const getListingDataForCart = (
	listing: ListingPageData,
): CartItemData => ({
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
	shippingPrice: Number(listing.shippingDetails?.shippingRate || 0),
	deliveryEstimate: calculateDeliveryEstimate(
		listing.processingProfile?.minDays ?? 0,
		listing.processingProfile?.maxDays ?? 0,
		listing.shippingDetails,
	),
	variations: listing.variations,
	combinations: listing.combinations,
});

import { CartItemData, ListingPageData } from '@common/contract';
import { calculateDeliveryEstimate } from '@common/utils';

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
	variations: listing.variations,
	shippingPrice: Number(listing.shippingDetails?.shippingRate || 0),
	deliveryEstimate: calculateDeliveryEstimate(
		listing.leadTimeDaysMin,
		listing.leadTimeDaysMax,
		listing.shippingDetails,
	),
});

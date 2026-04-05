import { ListingDataForCart } from '@common/types/ListingDataForCart';
import { ListingPageData } from '@common/contract';

export const getListingDataForCart = (
	listing: ListingPageData,
): ListingDataForCart => ({
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
});

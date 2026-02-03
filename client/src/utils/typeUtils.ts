import { CartListingData } from '@common/types/CartListingData';
import { ListingPageData } from '@common/types/ListingPageData';

export const getListingDataForCart = (
	listing: ListingPageData,
): CartListingData => ({
	id: listing.id,
	shortId: listing.shortId,
	title: listing.title,
	subtitle: listing.subtitle,
	categoryId: listing.categoryId,
	priceDollars: listing.priceDollars,
	countryCode: listing.countryCode,
	shopId: listing.shopId,
	shopShortId: listing.shopShortId,
	shopTitle: listing.shopTitle,
	imageUuids: listing.imageUuids,
	variations: listing.variations,
});

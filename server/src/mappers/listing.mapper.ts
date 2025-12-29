import { ListingCardData } from '@common/types/ListingCardData';
import { Listing } from '../entities/Listing';

export const mapListingToListingCardData = (listing: Listing): ListingCardData => ({
	id: listing.id,
	title: listing.title,
	subtitle: listing.subtitle || '',
	categoryId: listing.category ? listing.category.id.toString() : '',
	priceDollars: listing.priceDollars || 0,
	countryCode: listing.country?.code,
	primaryImageUuid: listing.primaryImageUuid || '',
	shopTitle: listing.shop.title,
	imageUuids: listing.imageUuids,
});

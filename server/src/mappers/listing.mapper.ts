import { ListingCardData } from '@common/types/ListingCardData';
import { ListingPageData } from '@common/types/ListingPageData';
import { Listing } from '../entities/generated/Listing';

export const mapListingToListingCardData = (listing: Listing): ListingCardData => ({
	id: listing.id,
	title: listing.title,
	subtitle: listing.subtitle || '',
	categoryId: listing.category ? listing.category.id.toString() : '',
	priceDollars: listing.priceDollars || 0,
	countryCode: listing.country?.code,
	shopTitle: listing.shop.title,
	imageUuids: listing.imageUuids,
});

export const mapListingToListingPageData = (listing: Listing): ListingPageData => ({
	...mapListingToListingCardData(listing),
	leadTimeDaysMin: listing.leadTimeDaysMin,
	leadTimeDaysMax: listing.leadTimeDaysMax,
	originZip: listing.shippingOrigin?.originZip,
	shippingDetails: listing.shippingProfile
		? {
				shipTimeDaysMin: listing.shippingProfile.shippingDaysMin || 0,
				shipTimeDaysMax: listing.shippingProfile.shippingDaysMax || 0,
				shippingRate: Number(listing.shippingProfile.flatShippingRateUsDollars)
					? `$${listing.shippingProfile.flatShippingRateUsDollars}`
					: 'FREE',
		  }
		: undefined,
	returnExchangePolicy: listing.returnExchangeProfile
		? {
				returnsAccepted: listing.returnExchangeProfile.acceptReturns,
				exchangesAccepted: listing.returnExchangeProfile.acceptExchanges,
				returnWindowDays: listing.returnExchangeProfile.returnWindowDays,
		  }
		: undefined,
});

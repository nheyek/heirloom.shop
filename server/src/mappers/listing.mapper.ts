import { ListingCardData } from '@common/types/ListingCardData';
import { ListingPageData } from '@common/types/ListingPageData';
import { ListingVariationData } from '@common/types/ListingVariationData';
import { Listing } from '../entities/generated/Listing';
import { ListingVariation } from '../entities/generated/ListingVariation';
import { ListingVariationOption } from '../entities/generated/ListingVariationOption';

export const mapListingToListingCardData = (listing: Listing): ListingCardData => ({
	id: listing.id,
	title: listing.title,
	subtitle: listing.subtitle || '',
	categoryId: listing.category ? listing.category.id.toString() : '',
	priceDollars: listing.priceDollars || 0,
	countryCode: listing.country?.code,
	shopId: listing.shop.id,
	shopTitle: listing.shop.title,
	imageUuids: listing.imageUuids,
});

export const mapListingToListingPageData = (
	listing: Listing,
	variations: ListingVariation[],
): ListingPageData => ({
	...mapListingToListingCardData(listing),
	fullDescr: listing.fullDescr,
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
	variations: variations.map(mapVariationToVariationData),
});

export const mapVariationToVariationData = (variation: ListingVariation): ListingVariationData => ({
	id: variation.id,
	name: variation.variationName,
	pricesVary: variation.pricesVary,
	options: variation.listingVariationOptionCollection
		.getItems()
		.map((option: ListingVariationOption) => ({
			id: option.id,
			name: option.optionName,
			additionalPriceDollars: Number(option.additionalPriceUsDollars),
		})),
});
